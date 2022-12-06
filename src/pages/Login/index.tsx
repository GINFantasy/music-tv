/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-11-30 14:16:20
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-06 18:25:21
 */
import React, {useCallback, useState, useMemo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Tab, TabView, useTheme} from '@rneui/themed';
import {useDialog, useUser} from '../../utils/reduxHooks';
import {useAsync} from '../../utils/useAsync';

export interface AuthForm {
  userName: string;
  password: string;
  userNickname?: string;
}

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [reUserName, setReUserName] = useState('');
  const [nickName, setNickName] = useState('');
  const [rePassword1, setRePassword1] = useState('');
  const [rePassword2, setRePassword2] = useState('');
  const {run, isLoading} = useAsync(undefined, {throwOnError: true});
  const {theme} = useTheme();
  const {primary, background} = theme.colors;
  const [index, setIndex] = React.useState(0);
  const {login, register} = useUser();
  const {open} = useDialog();
  const handleLogin = useCallback(async () => {
    const param = {
      userName,
      password,
    };
    try {
      await run(login(param));
    } catch (e) {
      open(`登录失败！${e}`);
    }
  }, [userName, password, login, run, open]);

  const checkInput = (userName, nickName, password1, password2) => {
    if (!userName || !nickName || !password1 || !password2) {
      open('请填写完整信息！');
      return false;
    }
    if (password1 !== password2) {
      open('两次密码不一致！');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!checkInput(reUserName, nickName, rePassword1, rePassword2)) {
      return;
    }
    const param = {
      userName: reUserName,
      userNickname: nickName,
      password: rePassword2,
    };
    try {
      await run(register(param));
      open('注册成功！');
      setUserName(reUserName);
      setPassword(rePassword1);
      setIndex(0);
    } catch (e) {
      open(`注册失败！${e}`);
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '100%',
          height: '100%',
          backgroundColor: background,
        },
        button: {
          height: 40,
          width: 200,
          alignSelf: 'center',
        },
        tab: {
          height: 3,
          backgroundColor: 'white',
        },
        itemFont: {fontSize: 12},
      }),
    [background],
  );

  return (
    <>
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={styles.tab}
        variant="primary">
        <Tab.Item
          title="登录"
          titleStyle={styles.itemFont}
          icon={{name: 'log-in-outline', type: 'ionicon', color: 'white'}}
        />
        <Tab.Item
          title="注册"
          titleStyle={styles.itemFont}
          icon={{name: 'person-add-outline', type: 'ionicon', color: 'white'}}
        />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.container}>
          <View style={styles.container}>
            <Input
              value={userName}
              onChangeText={setUserName}
              placeholder="用户名"
              leftIcon={
                <Ionicons name="person-outline" size={20} color={primary} />
              }
            />
            <Input
              value={password}
              onChangeText={setPassword}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={primary}
                />
              }
              placeholder="密码"
              secureTextEntry={true}
            />
            <Button
              size="md"
              loading={isLoading}
              containerStyle={styles.button}
              onPress={handleLogin}>
              登录
            </Button>
          </View>
        </TabView.Item>
        <TabView.Item style={styles.container}>
          <View style={styles.container}>
            <Input
              value={reUserName}
              onChangeText={setReUserName}
              placeholder="用户名"
              leftIcon={
                <Ionicons name="person-outline" size={20} color={primary} />
              }
            />
            <Input
              value={nickName}
              onChangeText={setNickName}
              placeholder="昵称"
              leftIcon={
                <Ionicons name="pencil-outline" size={20} color={primary} />
              }
            />
            <Input
              value={rePassword1}
              onChangeText={setRePassword1}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={primary}
                />
              }
              placeholder="密码"
              secureTextEntry={true}
            />
            <Input
              value={rePassword2}
              onChangeText={setRePassword2}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={primary}
                />
              }
              placeholder="再次输入密码"
              secureTextEntry={true}
            />
            <Button
              size="md"
              containerStyle={styles.button}
              onPress={handleRegister}>
              注册
            </Button>
          </View>
        </TabView.Item>
      </TabView>
    </>
  );
}
