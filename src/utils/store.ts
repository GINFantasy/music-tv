/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-12-03 16:24:53
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 00:07:10
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const Store = {
  getItem: async (key: string) => {
    const res = await AsyncStorage.getItem(key);
    if (res) {
      return JSON.parse(res);
    }

    return null;
  },
  setItem: async (key: string, data: object) => {
    AsyncStorage.setItem(key, JSON.stringify(data));
  },
  remove: (key: string) => {
    AsyncStorage.removeItem(key);
  },
};

export default Store;
