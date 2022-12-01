/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-11-30 15:31:03
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-11-30 16:42:59
 */

import Home from '../pages/Home';
import User from '../pages/User';
const router = [
  {
    path: '/',
    element: Home,
    name: 'Home',
  },
  {
    path: '/user',
    element: User,
    name: 'User',
  },
];
export default router;
