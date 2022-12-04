/*
 * @Description: 用户系统
 * @Autor: GuluGuluu
 * @Date: 2022-10-18 01:36:15
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 14:27:34
 */
import {createSlice} from '@reduxjs/toolkit';
import {Reducers, User} from '../../types';

export type AuthType = User | null;

const initialState: AuthType = null;

const reducers: Reducers = {
  setUser: (state, action) => action.payload,
  logout: () => null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const {setUser, logout} = slice.actions;

export default slice.reducer;
