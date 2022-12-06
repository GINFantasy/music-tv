/*
 * @Description:
 * @Autor: GuluGuluu
 * @Date: 2022-12-05 15:47:05
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-06 16:03:52
 */
import {useTheme, Avatar, Image} from '@rneui/themed';
import {VideoItem} from '../../types';
import React, {useMemo} from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
export default function VideoList(props: {data: VideoItem[]}) {
  const {theme} = useTheme();
  const {data} = props;
  const {primary, black, grey2, searchBg} = theme.colors;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingBottom: 80,
        },
        videoItem: {
          height: 300,
          borderRadius: 16,
          backgroundColor: searchBg,
          marginVertical: 8,
          marginHorizontal: 16,
          justifyContent: 'space-between',
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

  const Item = useMemo(
    () => (props: {item: VideoItem}) => {
      const {item} = props;
      const {id, videoCoverUrl, videoViews, videoTitle, createTime} = item;
      return (
        <View style={styles.videoItem}>
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
    [primary, styles],
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      renderItem={Item}
      keyExtractor={item => `${item.id}`}
    />
  );
}
