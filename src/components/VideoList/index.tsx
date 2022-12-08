/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-12-05 15:47:05
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-08 23:17:07
 */
import {useTheme, Avatar, Image} from '@rneui/themed';
import {VideoItem} from '../../types';
import React, {useCallback, useMemo, useState} from 'react';
import VideoService from '../../service/video.service';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {useMount} from '../../utils';

const dataProvider = new DataProvider((r1, r2) => {
  return r1 !== r2;
});
const ViewTypes = {
  FULL: 0,
};
const layoutProvider = new LayoutProvider(
  () => {
    return ViewTypes.FULL;
  },
  (type, dim) => {
    let {width} = Dimensions.get('window');
    dim.width = width;
    dim.height = 320;
  },
);
const PAGESIZE: number = 10;

const testData = [
  {
    id: 1,
    userId: 1,
    videoCoverUrl:
      'https://i0.hdslb.com/bfs/archive/eb5cb137f7784d39becce74557e98e9bae0e1ef8.jpg',
    videoUrl: 'https://www.runoob.com/try/demo_source/movie.mp4',
    videoTitle: '独门绝技中单AP鼠！一个英雄一',
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
    userId: 1,
    videoCoverUrl:
      'https://i0.hdslb.com/bfs/archive/eb5cb137f7784d39becce74557e98e9bae0e1ef8.jpg',
    videoUrl: 'https://www.runoob.com/try/demo_source/movie.mp4',
    videoTitle: '独门绝技中单AP鼠！一个英雄一',
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
    userId: 1,
    videoCoverUrl:
      'https://i0.hdslb.com/bfs/archive/eb5cb137f7784d39becce74557e98e9bae0e1ef8.jpg',
    videoUrl: 'https://www.runoob.com/try/demo_source/movie.mp4',
    videoTitle: '独门绝技中单AP鼠！一个英雄一',
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
    userId: 1,
    videoCoverUrl:
      'https://i0.hdslb.com/bfs/archive/eb5cb137f7784d39becce74557e98e9bae0e1ef8.jpg',
    videoUrl: 'https://www.runoob.com/try/demo_source/movie.mp4',
    videoTitle: '独门绝技中单AP鼠！一个英雄一',
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

export default function VideoList({navigation}) {
  const {theme} = useTheme();
  const [pageNum, setPageNum] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const {primary, black, grey2, searchBg} = theme.colors;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '100%',
          height: '100%',
        },
        videoItem: {
          height: 320,
          borderRadius: 16,
          backgroundColor: searchBg,
          justifyContent: 'space-between',
          // alignItems: "center",
          flex: 1,
          marginVertical: 10,
          marginHorizontal: 8,
        },
        imageWrapper: {
          width: '100%',
          height: '66%',
          alignSelf: 'center',
          borderRadius: 16,
        },
        imageContainer: {width: '100%', height: '100%'},
        image: {
          aspectRatio: 1,
          alignSelf: 'center',
          flex: 1,
          width: '100%',
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        },
        introContainer: {
          height: '30%',
          justifyContent: 'space-between',
          flexDirection: 'row',
        },
        title: {
          color: black,
          fontSize: 16,
          fontWeight: 'bold',
        },
        mainText: {
          color: grey2,
          fontSize: 16,
        },
        tips: {
          fontSize: 14,
          color: grey2,
        },
        avatar: {
          width: '16%',
          marginTop: 4,
          alignItems: 'center',
        },
        textContainer: {
          width: '83%',
        },
      }),
    [grey2, black, searchBg],
  );

  const getInfo = useCallback(
    (isRefresh: boolean) => {
      // VideoService.getVideoList({
      //   pageSize: PAGESIZE,
      //   pageNum,
      // }).then(res => {
      //   if (res) {
      //     let loadMore = false;
      //     if (res.length > PAGESIZE) {
      //       loadMore = true;
      //     }
      //     setIsLoadMore(loadMore);
      //     setData([...data, ...res]);
      //   }
      // });
      const newData = testData.map(v => {
        const newItem = JSON.parse(JSON.stringify(v));
        newItem.videoTitle = new Date().getSeconds();
        return newItem;
      });
      if (isRefresh) {
        setData(v => [...newData, ...v]);
      } else {
        setData(v => [...v, ...newData]);
      }
    },
    [pageNum, setData],
  );

  const onLoadMore = useCallback(() => {
    if (isLoadMore) {
      return;
    }
    setPageNum(v => v + 1);
    getInfo(false);
  }, [isLoadMore, getInfo, setPageNum]);

  useMount(() => {
    setPageNum(v => v + 1);
    getInfo(true);
  });

  const Item = useCallback(
    (type: string, item: VideoItem) => {
      const {id, videoCoverUrl, videoViews, videoTitle, createTime} = item;
      return (
        <View
          onTouchEnd={() => {
            navigation.navigate('Detail', item);
          }}
          style={styles.videoItem}>
          <View style={styles.imageWrapper}>
            <Image
              containerStyle={styles.imageContainer}
              resizeMode="cover"
              style={styles.image}
              source={{uri: videoCoverUrl}}
              PlaceholderContent={<ActivityIndicator color={primary} />}
            />
          </View>
          <View style={styles.introContainer}>
            <View style={styles.avatar}>
              <Avatar
                size={40}
                rounded
                source={{
                  uri: 'https://himg.bdimg.com/sys/portrait/item/wise.1.a0…oPsxurJCVg.jpg?time=2797&tieba_portrait_time=2797',
                }}
                key={`${id}-avatar`}
              />
            </View>
            <View style={styles.textContainer}>
              <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={styles.title}>
                {videoTitle}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.mainText}>
                {'这个是用户'}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={
                  styles.tips
                }>{`${videoViews} 观看 · ${createTime}`}</Text>
            </View>
          </View>
        </View>
      );
    },
    [primary, styles, navigation],
  );

  return (
    <RecyclerListView
      style={styles.container}
      layoutProvider={layoutProvider}
      dataProvider={dataProvider.cloneWithRows(data)}
      rowRenderer={Item}
      extendedState={{}}
      onEndReachedThreshold={0.2}
      onEndReached={onLoadMore}
      renderFooter={() => <View style={{height: 60}} />}
      scrollViewProps={{
        refreshControl: (
          <RefreshControl
            refreshing={loading}
            onRefresh={async () => {
              setLoading(true);
              await getInfo(true);
              setLoading(false);
            }}
          />
        ),
      }}
    />
  );
}
