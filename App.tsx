/*
 * @Description:首页
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-10-17 00:50:45
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 00:43:43
 */
import * as React from 'react';
import Navigation from './src/components/Navigation';
import {ThemeProvider, createTheme} from '@rneui/themed';
// @ts-ignore
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
const theme = createTheme({
  lightColors: {
    primary: '#71c9ce',
    background: '#fff',
  },
  darkColors: {
    primary: '#71c9ce',
    background: '#282c34',
  },
  mode: 'dark',
});
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  );
}
