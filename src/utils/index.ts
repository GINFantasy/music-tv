/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-12-02 17:12:07
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-03 16:39:21
 */
import {useRef, useEffect} from 'react';

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

export {useMountedRef};
