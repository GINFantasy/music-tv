/*
 * @Description:首页
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-10-17 00:50:45
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-06 22:04:56
 */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useTheme} from '@rneui/themed';
import Dialog from './src/components/Dialog';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Layout from './src/pages/Layout';
import Detail from './src/pages/Detail';
const Stack = createNativeStackNavigator();

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
export default function App() {
  const {theme} = useTheme();
  const naviTheme = getNavigationThemeFromRenui(theme);
  return (
    // @ts-ignore
    <NavigationContainer theme={naviTheme}>
      <Dialog />
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen component={Layout} name="Index" />
        <Stack.Screen component={Detail} name="Detail" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
