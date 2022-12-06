/*
 * @Description: 视频详情
 * @Autor: GuluGuluu
 * @Date: 2022-12-06 16:15:04
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-06 16:29:33
 */
import React, {useState} from 'react';
import {Video} from 'react-native-video';
import {View, StyleSheet} from 'react-native';
import {VideoItem} from '../../types';

export default function Detail(props: {item: VideoItem}) {
  const {item} = props;
  const [paused, setPaused] = useState(true);
  const {videoUrl} = item;
  return (
    <View>
      <Video
        ref={ref => (this.Video = ref)}
        source={{uri: videoUrl}}
        poster={'url'}
        paused={paused}
        onProgress={({currentTime}) => {}}
        onLoad={({duration}) => {}}
        onEnd={() => {}}
        resizeMode="cover"
        posterResizeMode="cover"
        style={styles.backgroundVideo}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
