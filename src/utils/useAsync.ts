/*
 * @Description: 异步state
 * @Autor: GuluGuluu
 * @Date: 2022-10-18 16:45:38
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-03 16:25:01
 */
import {useCallback, useReducer, useState} from 'react';
import {useMountedRef} from '.';

interface State<D> {
  error: Error | null;
  data: D | null;
  // 未触发 | 加载中 | 错误 | 成功
  stat: 'idle' | 'loading' | 'error' | 'success';
}

// 默认初始状态
const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
};

// 默认配置
const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : undefined),
    [dispatch, mountedRef],
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig,
) => {
  // 所有的配置，用传入的覆盖默认的（不传则是用默认）
  const config = {...defaultConfig, ...initialConfig};
  const [state, dispatch] = useReducer(
    (stateParam: State<D>, action: Partial<State<D>>) => ({
      ...stateParam,
      ...action,
    }),
    {
      ...defaultInitialState,
      ...initialState,
    },
  );
  const safeDispatch = useSafeDispatch(dispatch);
  // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => {});

  // 如果是setData，说明已经获取数据成功，那就设置data和success状态
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null,
      }),
    [safeDispatch],
  );

  // 设置error状态
  const setError = useCallback(
    (error: Error | null) =>
      safeDispatch({
        error,
        stat: 'error',
        data: null,
      }),
    [safeDispatch],
  );

  // run 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
      if (!promise || !promise.then) {
        throw new Error('请传入 Promise 类型数据');
      }
      // 重试，先保存此次run的参数，以便后面执行重试
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      safeDispatch({stat: 'loading'});
      return promise
        .then(data => {
          setData(data);
          return data;
        })
        .catch(error => {
          // catch会消化异常，如果不主动抛出，外面是接收不到异常的
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch],
  );

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    // retry 被调用时重新跑一遍run，让state刷新一遍
    retry,
    ...state,
  };
};
