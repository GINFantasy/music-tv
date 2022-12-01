/*
 * @Description:首页
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-10-17 00:50:45
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-11-30 16:41:00
 */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './src/components/BottomTab';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}
