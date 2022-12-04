/*
 * @Description:首页
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-10-17 00:50:45
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 21:18:41
 */
import React from 'react';
import Navigation from './src/components/Navigation';
import {ThemeProvider, createTheme} from '@rneui/themed';
import Login from './src/pages/Login';
import Dialog from './src/components/Dialog';
import UserService from './src/service/user.service';
import {useUser} from './src/utils/reduxHooks';
import {useMount} from './src/utils';
import {useAsync} from './src/utils/useAsync';

const theme = createTheme({
  lightColors: {
    primary: '#6d9886',
    background: '#fff',
    black: '#393e46',
    white: '#f7f7f7',
  },
  darkColors: {
    primary: '#6d9886',
    background: '#393e46',
    black: '#f7f7f7',
    white: '#393e46',
  },
  mode: 'dark',
});
export default function App() {
  const {user, setUser} = useUser();
  const {run} = useAsync(undefined, {throwOnError: false});
  //
  useMount(() => {
    try {
      run(UserService.getInfo()).then(setUser);
    } catch (error) {
      console.log('error', error);
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <Dialog />
      {user ? <Navigation /> : <Login />}
    </ThemeProvider>
  );
}
