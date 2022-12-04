/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-11-30 15:31:03
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 21:27:05
 */

import Home from '../pages/Home';
import User from '../pages/User';
const router = [
  {
    path: '/',
    element: Home,
    name: '探索',
  },
  {
    path: '/creation',
    element: User,
    name: '创作',
  },
  {
    path: '/dynamic',
    element: User,
    name: '动态',
  },
  {
    path: '/user',
    element: User,
    name: '我的',
  },
];
export default router;
