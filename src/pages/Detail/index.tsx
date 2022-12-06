/*
 * @Description: 视频详情
 * @Autor: GuluGuluu
 * @Date: 2022-12-06 16:15:04
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-06 23:25:34
 */
import React, {useState, useRef} from 'react';
import Video from 'react-native-video';
import {View, StyleSheet, Text} from 'react-native';

export default function Detail({route}) {
  const [paused, setPaused] = useState(false);
  const video = useRef();
  const item = route.params;
  const {videoUrl} = item;
  console.log(item);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={{uri: videoUrl}}
        poster={'url'}
        paused={paused}
        onProgress={({currentTime}) => {}}
        onLoad={({duration}) => {}}
        onError={e => {
          console.log(e);
        }}
        onEnd={() => {}}
        resizeMode="cover"
        posterResizeMode="cover"
        style={styles.backgroundVideo}
      />
      <View>
        <Text>123</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  backgroundVideo: {
    minWidth: '100%',
    height: 200,
  },
});
