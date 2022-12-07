/*
 * @Description: 视频详情
 * @Autor: GuluGuluu
 * @Date: 2022-12-06 16:15:04
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-07 22:01:33
 */
import React, {useState, useRef} from 'react';
import VideoPlayer, {
  defaultVideoHeight,
  isSystemIOS,
  statusBarHeight,
} from '../../components/VideoPlayer';
import Orientation from 'react-native-orientation';
import {Text} from '@rneui/themed';
import {View, StyleSheet, BackHandler} from 'react-native';
import {useMount} from '../../utils';

export default function Detail({route, navigation}) {
  const {setOptions} = navigation;
  const videoPlayer = useRef(null);
  const item = route.params;
  const {videoUrl, videoTitle} = item;
  const [videoTopHeight, setVideoTopHeight] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [statusBarView, setStatusBarView] = useState(null);
  const [videoHeight, setVideoHeight] = useState(defaultVideoHeight);

  useMount(() => {
    setOptions({title: videoTitle, headerShown: false});
    if (isSystemIOS) {
      setStatusBarView(
        <View
          style={[
            {backgroundColor: '#000'},
            isFullScreen ? {height: 0} : {height: statusBarHeight},
          ]}
        />,
      );
      setVideoTopHeight(isFullScreen ? 0 : statusBarHeight);
    }
    // 监听控制器
    BackHandler.addEventListener('hardwareBackPress', _backButtonPress);
    Orientation.addOrientationListener(_orientationDidChange);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', _backButtonPress);
      Orientation.removeOrientationListener(_orientationDidChange);
    };
  });
  // 处理安卓物理返回键，横屏时点击返回键回到竖屏，再次点击回到上个界面
  const _backButtonPress = () => {
    if (isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      navigation.goBack();
    }
    return true;
  };

  const _onOrientationChanged = isFullScreen => {
    if (isFullScreen) {
      //Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscapeRight();
    }
  };

  const _onClickBackButton = () => {
    navigation.goBack();
  };

  const _onLayoutChange = event => {
    let {width, height} = event.nativeEvent.layout;
    let isLandscape = width > height;
    if (isLandscape) {
      setIsFullScreen(true);
      setVideoHeight(height);
      videoPlayer.current.updateLayout(width, height, true);
    } else {
      setIsFullScreen(false);
      setVideoHeight((width * 9) / 16);
      videoPlayer.current.updateLayout(width, (width * 9) / 16, false);
    }
    Orientation.unlockAllOrientations();
  };

  const _orientationDidChange = orientation => {
    if (orientation === 'PORTRAIT') {
    } else {
    }
  };
  return (
    <View style={[styles.container]} onLayout={_onLayoutChange}>
      {statusBarView}
      <VideoPlayer
        ref={ref => (videoPlayer.current = ref)}
        style={{position: 'absolute', left: 0, top: videoTopHeight}}
        videoURL={videoUrl}
        videoTitle={videoTitle}
        onChangeOrientation={_onOrientationChanged}
        onTapBackButton={_onClickBackButton}
        navigation={navigation}
      />
      <View style={[styles.detailCt, {marginTop: videoHeight}]}>
        <Text style={styles.title}>{videoTitle}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailCt: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
  },
});
