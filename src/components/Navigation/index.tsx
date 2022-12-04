/*
 * @Description: 导航容器
 * @Autor: GuluGuluu
 * @Date: 2022-12-03 20:39:21
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-04 22:45:17
 */
import React, {useCallback, useMemo, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from '../BottomTab';
import {useTheme, SearchBar} from '@rneui/themed';
import {View, StyleSheet} from 'react-native';

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
  const [search, setSearch] = useState('');
  const {background, primary} = theme.colors;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          width: '100%',
          backgroundColor: background,
        },
        searchBarCt: {
          backgroundColor: background,
          borderBottomColor: background,
        },
      }),
    [background],
  );
  const updateSearch = useCallback(search => setSearch(search), [setSearch]);

  const handleSearch = useCallback(() => {
    // TODU:搜索
    console.log(search);
  }, [search]);

  return (
    // @ts-ignore
    <NavigationContainer theme={naviTheme}>
      <View style={styles.header}>
        <SearchBar
          containerStyle={styles.searchBarCt}
          placeholder="搜索"
          onChangeText={updateSearch}
          value={search}
          clearIcon={
            <Ionicons
              onPress={() => setSearch('')}
              name="close-outline"
              size={20}
              color={primary}
            />
          }
          searchIcon={
            <Ionicons
              onPress={handleSearch}
              name="search-outline"
              size={20}
              color={primary}
            />
          }
          cancelIcon={
            <Ionicons name="arrow-back-outline" size={20} color={primary} />
          }
        />
      </View>
      <BottomTab />
    </NavigationContainer>
  );
}
