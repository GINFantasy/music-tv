/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-12-02 17:12:07
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 18:40:59
 */
import {useRef, useEffect, EffectCallback} from 'react';

const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

const useMount = (callback: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, []);
};

export {useMountedRef, useMount};
