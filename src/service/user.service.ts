/*
 * @Description: 用户接口封装
 * @Autor: GuluGuluu
 * @Date: 2022-12-02 17:35:33
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 21:32:20
 */
import Request from '../request/index';
import {AuthForm} from '../pages/Login';
import store from '../utils/store';
export const TOKEN_KEY = 'musictv-token';

const prefix = '/user/';
const UserService = {
  getInfo: async () => {
    const token = await store.getItem(TOKEN_KEY);
    if (token) {
      const {data} = await Request.post(`${prefix}check`, {token});
      if (data) {
        return data;
      }
      return Promise.reject(null);
    }
    return Promise.reject(null);
  },
  login: (param: AuthForm) =>
    Request.post(`${prefix}login`, {
      userName: param.userName,
      password: param.password,
    })
      .then(res => {
        const {data, msg} = res;
        if (data) {
          store.setItem(TOKEN_KEY, data.token);
          return data;
        }
        throw msg;
      })
      .catch(err => Promise.reject(err)),
  register: (param: AuthForm) => {
    const {userName, password, userNickname} = param;
    return Request.post(`${prefix}register`, {
      userName,
      password,
      userNickname,
    })
      .then(res => {
        const {data, msg} = res;
        if (data) {
          return data;
        }
        throw msg;
      })
      .catch(err => Promise.reject(err));
  },
  logout: async () => {
    await store.remove(TOKEN_KEY);
  },
};
export default UserService;
