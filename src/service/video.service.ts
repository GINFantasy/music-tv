/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-12-08 10:00:00
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-08 10:05:32
 */
import Request from '../request/index';
const prefix = '/video/';

const VideoService = {
  getVideoList: (param: {pageSize: number; pageNum: number}) =>
    Request.post(`${prefix}getVideoList`, param)
      .then(res => {
        const {data, msg} = res;
        if (data) {
          return data;
        }
        throw msg;
      })
      .catch(err => Promise.reject(err)),
};

export default VideoService;
