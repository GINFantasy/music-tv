/*
 * @Description:主页
 * @Version: 2.0
 * @Autor: GuluGuluu
 * @Date: 2022-11-02 22:42:41
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-06 21:31:26
 */
import React, {useState, useMemo, useCallback} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme, SearchBar} from '@rneui/themed';
import {View, StatusBar, StyleSheet} from 'react-native';
import VideoList from '../../components/VideoList';
import {VideoItem} from '../../types';
import {useMount} from '../../utils';

const testData = [
  {
    id: 1,
    userId: 1,
    videoCoverUrl:
      'https://i0.hdslb.com/bfs/archive/eb5cb137f7784d39becce74557e98e9bae0e1ef8.jpg',
    videoUrl: 'https://www.runoob.com/try/demo_source/movie.mp4',
    videoTitle: '独门绝技中单AP鼠！一个英雄一个套路上600分！韩服第一AP老鼠',
    videoIntro:
      '<video> 标签定义视频，比如电影片段或其他视频流。目前，<video> 元素支持三种视频格式：MP4、WebM、Ogg。',
    videoLikeNum: 0,
    videoCollectNum: 0,
    videoTags: ['技术', '前端'],
    videoType: '技术',
    videoAuditStat: false,
    videoViews: 0,
    videoDuration: 60,
    createTime: '2022-12-04 20:55:21',
  },
  {
    id: 2,
    userId: 2,
    videoCoverUrl:
      'https://i2.hdslb.com/bfs/archive/c917037a733af3bebf18a95bd19671660248927c.jpg',
    videoUrl: 'https://www.runoob.com/try/demo_source/movie.mp4',
    videoTitle: '独门绝技中单AP鼠！一个英雄一个套路上600分！韩服第一AP老鼠',
    videoIntro:
      '<video> 标签定义视频，比如电影片段或其他视频流。目前，<video> 元素支持三种视频格式：MP4、WebM、Ogg。',
    videoLikeNum: 0,
    videoCollectNum: 0,
    videoTags: ['技术', '前端'],
    videoType: '技术',
    videoAuditStat: false,
    videoViews: 0,
    videoDuration: 60,
    createTime: '2022-12-04 20:55:21',
  },
  {
    id: 3,
    userId: 2,
    videoCoverUrl:
      'https://i1.hdslb.com/bfs/archive/ed778a71cc47b81177eeac6bbb2d64ac928a0403.jpg',
    videoUrl: 'https://www.runoob.com/try/demo_source/movie.mp4',
    videoTitle: '独门绝技中单AP鼠！一个英雄一个套路上600分！韩服第一AP老鼠',
    videoIntro:
      '<video> 标签定义视频，比如电影片段或其他视频流。目前，<video> 元素支持三种视频格式：MP4、WebM、Ogg。',
    videoLikeNum: 0,
    videoCollectNum: 0,
    videoTags: ['技术', '前端'],
    videoType: '技术',
    videoAuditStat: false,
    videoViews: 0,
    videoDuration: 60,
    createTime: '2022-12-04 20:55:21',
  },
  {
    id: 4,
    userId: 2,
    videoCoverUrl:
      'https://i1.hdslb.com/bfs/archive/39aecb0610814f5a3885e74b2e9159280ac224b6.jpg',
    videoUrl: 'https://www.runoob.com/try/demo_source/movie.mp4',
    videoTitle: '独门绝技中单AP鼠！一个英雄一个套路上600分！韩服第一AP老鼠',
    videoIntro:
      '<video> 标签定义视频，比如电影片段或其他视频流。目前，<video> 元素支持三种视频格式：MP4、WebM、Ogg。',
    videoLikeNum: 0,
    videoCollectNum: 0,
    videoTags: ['技术', '前端'],
    videoType: '技术',
    videoAuditStat: false,
    videoViews: 0,
    videoDuration: 60,
    createTime: '2022-12-04 20:55:21',
  },
];
export default function Home({navigation}) {
  const {theme} = useTheme();
  const [search, setSearch] = useState('');
  const [data, setData] = useState<VideoItem[]>(testData);

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
      }),
    [background],
  );

  useMount(() => setData(testData));

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
      <VideoList data={data} navigation={navigation} />
    </View>
  );
}
