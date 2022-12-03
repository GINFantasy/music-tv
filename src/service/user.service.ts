/*
 * @Description: 用户接口封装
 * @Autor: GuluGuluu
 * @Date: 2022-12-02 17:35:33
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 00:47:43
 */
import Request from '../request/index';
import {AuthForm} from '../pages/Login';
import store from '../utils/store';
export const TOKEN_KEY = 'musictv-token';

const prefix = '/user/';
const UserService = {
  getInfo: (token: string) =>
    Request.post(`${prefix}check`, {token}).then(res => res.data),
  login: (param: AuthForm) =>
    Request.post(`${prefix}login`, {
      userName: param.userName,
      password: param.password,
    })
      .then(res => {
        const {code, data} = res;
        if (code !== 200) {
          throw data;
        }
        store.setItem(TOKEN_KEY, data.token);
        return data;
      })
      .catch(err => {
        console.log('err', err);
      }),
  register: (param: AuthForm) =>
    Request.post(`${prefix}register`, {
      userName: param.userName,
      password: param.password,
    }).then(res => res.data),
  logout: async () => {
    await store.remove(TOKEN_KEY);
  },
};
export default UserService;
