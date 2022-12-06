/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-10-17 00:50:45
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-06 20:56:07
 */
/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {Provider} from 'react-redux';
import store from './src/app/store';
const rootTheme = createTheme({
  lightColors: {
    primary: '#6d9886',
    secondary: 'F2E7D5',
    background: '#fff',
    black: '#393e46',
    white: '#f7f7f7',
  },
  darkColors: {
    primary: '#6d9886',
    secondary: 'F2E7D5',
    background: '#393e46',
    black: '#f7f7f7',
    white: '#393e46',
  },
  mode: 'dark',
});
// @ts-ignore
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
const Main = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={rootTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
