/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-11-30 14:16:20
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 00:44:24
 */
import React, {useCallback, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet} from 'react-native';
import {Input, Button, useTheme} from '@rneui/themed';
import UserService from '../../service/user.service';

export interface AuthForm {
  userName: string;
  password: string;
}
export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {theme} = useTheme();
  const login = useCallback(() => {
    const param = {
      userName,
      password,
    };
    console.log(UserService.login(param));
  }, [userName, password]);

  return (
    <View style={styles.container}>
      <Input
        onChangeText={setUserName}
        placeholder="用户名"
        leftIcon={
          <Ionicons
            name="person-outline"
            size={20}
            color={theme.colors.primary}
          />
        }
      />
      <Input
        onChangeText={setPassword}
        leftIcon={
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={theme.colors.primary}
          />
        }
        placeholder="密码"
        secureTextEntry={true}
      />
      <Button size="md" containerStyle={styles.button} onPress={login}>
        登录
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  button: {
    height: 40,
    width: 200,
    alignSelf: 'center',
  },
});
