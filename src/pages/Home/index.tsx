/*
 * @Description:主页
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-11-02 22:42:41
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-08 16:33:21
 */
import React, {useState, useMemo, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme, SearchBar} from '@rneui/themed';
import {View, StatusBar, StyleSheet} from 'react-native';
import VideoList from '../../components/VideoList/index';

export default function Home({navigation}) {
  const {theme} = useTheme();
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
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight,
        },
        listCt: {
          width: '100%',
          height: '100%',
          paddingBottom: 130,
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
    <View>
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
      <VideoList navigation={navigation} />
    </View>
  );
}
