/*
 * @Description: modal的切片
 * @Autor: GuluGuluu
 * @Date: 2022-10-17 08:08:45
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 16:58:18
 */
import {createSlice} from '@reduxjs/toolkit';
import {Reducers} from '../../types';
// dialog的props类型
export interface DialogProps {
  // 内容
  text: any;
  // 标题
  title: string;
  // 是否打开
  visible: boolean;
  // 是否加载
  loading: boolean;
}
const initialState: DialogProps = {
  text: '',
  visible: false,
  title: '提示',
  loading: false,
};

const reducers: Reducers = {
  // 打开
  open: (state, action) => {
    const {payload} = action;
    const {text, title = '提示', loading} = payload;
    state.visible = true;
    state.text = text;
    state.title = title;
    state.loading = loading;
  },
  // 关闭
  shut: state => {
    state.visible = false;
  },
};

const slice = createSlice({
  name: 'dialog',
  initialState,
  reducers,
});

export const {open, shut} = slice.actions;

export default slice.reducer;
