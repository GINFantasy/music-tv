/*
 * @Description: RTK hooks
 * @Autor: GuluGuluu
 * @Date: 2022-10-17 08:46:35
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 14:28:20
 */
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
