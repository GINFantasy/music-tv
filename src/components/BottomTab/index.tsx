/*
 * @Description:底部导航
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-11-02 22:33:01
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-11-03 01:24:26
 */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../../pages/Home';
import User from '../../pages/User';
import React from 'react';
import {ColorValue} from 'react-native';

const Tab = createBottomTabNavigator();

type TabBarIconParam = {
  focused: boolean;
  color: number | ColorValue | undefined;
  size: number;
};

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}: any) => ({
        tabBarIcon: ({color, size}: TabBarIconParam) => {
          let iconName = '';
          switch (route.name) {
            case 'Home':
              iconName = 'planet-outline';
              break;
            case 'User':
              iconName = 'person-circle-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
}
