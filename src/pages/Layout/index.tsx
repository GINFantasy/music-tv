/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-12-06 20:34:57
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-06 22:18:26
 */
import React from 'react';
import Navigation from '../../components/Navigation';

import Login from '../../pages/Login';
import UserService from '../../service/user.service';
import {useUser} from '../../utils/reduxHooks';
import {useMount} from '../../utils';
import {useAsync} from '../../utils/useAsync';

export default function Layout({navigation}) {
  const {setOptions} = navigation;
  const {user, setUser} = useUser();
  const {run} = useAsync(undefined, {throwOnError: false});

  useMount(() => {
    setOptions({headerShown: false});
  });

  useMount(() => {
    try {
      run(UserService.getInfo()).then(setUser);
    } catch (error) {
      console.log('error', error);
    }
  });
  return <>{user ? <Navigation /> : <Login />}</>;
}
