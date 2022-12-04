/*
 * @Description:底部导航
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-11-02 22:33:01
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 21:46:58
 */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import router from '../../routes';
import {ColorValue} from 'react-native';
import {useTheme} from '@rneui/themed';

const Tab = createBottomTabNavigator();

type TabBarIconParam = {
  focused: boolean;
  color: number | ColorValue | undefined;
  size: number;
};

export default function BottomTab() {
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}: any) => ({
        tabBarIcon: ({color, size}: TabBarIconParam) => {
          let iconName = '';
          switch (route.name) {
            case '探索':
              iconName = 'planet-outline';
              break;
            case '我的':
              iconName = 'person-circle-outline';
              break;
            case '动态':
              iconName = 'chatbubble-ellipses-outline';
              break;
            case '创作':
              iconName = 'create-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
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
