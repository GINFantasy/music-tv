/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-12-04 14:29:48
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 17:07:06
 */
// @ts-nocheck

import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import UserService from '../service/user.service';
import * as userStore from '../features/User/user.slice';
import * as dialogStore from '../features/Dialog/dialog.slice';

const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const setUser = useCallback(
    data => dispatch(userStore.setUser(data)),
    [dispatch],
  );
  const login = useCallback(
    data => UserService.login(data).then(setUser),
    [setUser],
  );
  const register = data => UserService.register(data);
  const logout = useCallback(() => {
    UserService.logout();
    dispatch(userStore.logout());
  }, [dispatch]);
  return {
    user,
    login,
    register,
    logout,
    setUser,
  };
};
const useDialog = () => {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(state => state.dialog);
  const open = useCallback(
    (text: string, loading?: boolean = false, title?: string = '提示') =>
      dispatch(dialogStore.open({text, loading, title})),
    [dispatch],
  );
  const shut = () => dispatch(dialogStore.shut());
  return {
    dialog,
    open,
    shut,
  };
};
export {useUser, useDialog};
