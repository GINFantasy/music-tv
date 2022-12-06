/*
 * @Description:类型定义
 * @Autor: GuluGuluu
 * @Date: 2022-12-03 16:58:08
 * @LastEditors: GuluGuluu
 * @LastEditTime: 2022-12-05 16:45:05
 */
interface User {
  id: number;
  userName: string;
  userNickName: string;
  userRole: string;
}
type Reducers = {
  [key: string]: Reducer;
};

/**
 * @description: 视频数据
 * @return {*}
 */
interface VideoItem {
  id: number;
  userId: number;
  videoCoverUrl: string;
  videoUrl: string;
  videoTitle: string;
  videoIntro: string;
  videoLikeNum: number;
  videoCollectNum: number;
  videoTags: string[];
  videoType: string;
  videoAuditStat: boolean;
  videoViews: number;
  videoDuration: number;
  createTime: string;
}

/**
 * @description: 通知
 * @return {*}
 */
interface Notice {
  id: number;
  noticeContent: string;
  noticeType: string;
}
/**
 * @description: 收藏
 * @return {*}
 */
interface Collect {
  id: number;
  collectVideoId: string;
  collectUserId: string;
}

/**
 * @description: 历史
 * @return {*}
 */
interface History {
  id: number;
  historyVideoId: number;
  historyUserId: number;
  historyProgress: number;
}

/**
 * @description: 评论
 * @return {*}
 */
interface Comment {
  id: number;
  videoId: number;
  commentId: number;
  commentAuthor: string;
  commentContent: string;
  commentLikeNum: number;
  commentCollectNum: number;
  commentAuditStat: string;
  commentType: number;
}

export type {User, Reducers, Collect, Notice, History, VideoItem, Comment};
