/*
 * @Description:底部导航
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-11-02 22:33:01
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-11-30 16:43:14
 */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import router from '../../routes';
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
      {router.map((route: any) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.element}
        />
      ))}
    </Tab.Navigator>
  );
}
