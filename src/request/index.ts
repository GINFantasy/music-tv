/*
 * @Description: 请求封装
 * @Autor: GuluGuluu
 * @Date: 2022-08-14 01:33:01
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 21:11:00
 */
import axios from 'axios';
import serverConfig from './config';
import Store from '../utils/store';
import {TOKEN_KEY} from '../service/user.service';
declare module 'axios' {
  interface AxiosResponse<T = any> {
    code: number;
    msg: string;
    data: T;
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

// 创建 axios 请求实例
const Request = axios.create({
  baseURL: serverConfig.baseURL, // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
});

// 创建请求拦截
Request.interceptors.request.use(
  async (config: any) => {
    // 如果开启 token 认证
    const token = await Store.getItem(TOKEN_KEY);
    config.headers.Authorization = `Bearer ${token || ''}`;
    // 设置请求头
    if (!config.headers['content-type']) {
      // 如果没有设置请求头
      // if(config.method === 'post') {
      //   config.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
      //   config.data = qs.stringify(config.data); // 序列化,比如表单数据
      // } else {
      //
      // }
      config.headers['content-type'] = 'application/json'; // 默认类型
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

// 创建响应拦截
Request.interceptors.response.use(
  res => {
    const {data} = res;
    // 处理自己的业务逻辑，比如判断 token 是否过期等等
    // 代码块
    return data;
  },
  (error: any) => {
    let message = '';
    if (error && error.response) {
      switch (error.response.status) {
        case 302:
          message = '接口重定向了！';
          break;
        case 400:
          message = '参数不正确！';
          break;
        case 401:
          message = '您未登录，或者登录已经超时，请先登录！';
          break;
        case 403:
          message = '您没有权限操作！';
          break;
        case 404:
          message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          message = '请求超时！';
          break;
        case 409:
          message = '系统已存在相同数据！';
          break;
        case 500:
          message = '服务器内部错误！';
          break;
        case 501:
          message = '服务未实现！';
          break;
        case 502:
          message = '网关错误！';
          break;
        case 503:
          message = '服务不可用！';
          break;
        case 504:
          message = '服务暂时无法访问，请稍后再试！';
          break;
        case 505:
          message = 'HTTP 版本不受支持！';
          break;
        default:
          message = '异常问题，请联系管理员！';
          break;
      }
    }
    console.log('axios-error', error);
    return Promise.reject(message);
  },
);
export default Request;
