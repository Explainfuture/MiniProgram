// pages/episodes/episodes.js
Page({
  data: {
    // 页面数据
  },

  onLoad() {
    console.log('剧集介绍页面加载完成');
  },

  // 返回首页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 视频全屏状态改变
  onVideoFullscreenChange(e) {
    console.log('视频全屏状态改变:', e.detail);
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '罗小黑战记 - 剧集介绍',
      path: '/pages/episodes/episodes',
      imageUrl: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/share/shareone.jpg'
    }
  },

  onShareTimeline() {
    return {
      title: '罗小黑战记 - 剧集介绍',
      imageUrl: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/share/shareone.jpg'
    }
  }
});
