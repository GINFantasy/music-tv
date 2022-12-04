/*
 * @Description:类型定义
 * @Autor: GuluGuluu
 * @Date: 2022-12-03 16:58:08
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 14:27:30
 */
interface User {
  id: number;
  userName: string;
  userNickName: string;
  userRole: string;
}
type Reducers = {
  [key: string]: Reducer;
};

export type {User, Reducers};
