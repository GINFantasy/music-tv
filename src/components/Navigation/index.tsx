/*
 * @Description: 导航容器
 * @Autor: GuluGuluu
 * @Date: 2022-12-03 20:39:21
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-03 21:46:11
 */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from '../BottomTab';
import {useTheme} from '@rneui/themed';

const getNavigationThemeFromRenui = theme => {
  const {mode, colors} = theme;
  const {primary, background, grey0} = colors;
  return {
    dark: mode === 'dark' ? true : false,
    colors: {
      primary,
      background,
      card: background,
      text: grey0,
    },
  };
};

export default function Navigation() {
  const {theme} = useTheme();
  const naviTheme = getNavigationThemeFromRenui(theme);
  return (
    // @ts-ignore
    <NavigationContainer theme={naviTheme}>
      <BottomTab />
    </NavigationContainer>
  );
}
