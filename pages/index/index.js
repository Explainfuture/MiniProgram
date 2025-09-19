// pages/index/index.js
const app = getApp()
const { ASSETS } = require('../../utils/assets.js')

Page({
  data: {
    // 轮播图数据
    carouselImages: [
      'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/five.png',
      'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/one.png',
      'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/two.png',
      'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/three.png',
      'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/four.png'
    ],
    

    
    // 音乐播放状态
    isPlaying: false,
    audioContext: null,
    progress: 0,
    currentTime: '0:00',
    totalTime: '2:00',
    musicUrl: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/goodnightcat.mp3',
    isAudioReady: false,
    isAudioEnded: false,
    lastPlayTime: 0,
    

  },

  onLoad() {
    console.log('首页加载完成')
    this.initAudio()
  },

  onShow() {
    // 页面显示时的逻辑
  },

  onReady() {
    // 页面渲染完成
  },

  /*onHide() {
    // 页面隐藏时暂停音乐
    if (this.data.audioContext) {
      this.data.audioContext.pause()
    }
  },*/

  onHide() {
    // 页面隐藏时暂停音乐
    if (this.data.audioContext && this.data.isPlaying) {
      this.data.audioContext.pause()
    }
  },

  onShow() {
    // 页面显示时检查音频状态，防止异常播放
    if (this.data.audioContext && this.data.isAudioEnded) {
      console.log('页面显示时发现音频已结束，清理状态');
      this.setData({
        isPlaying: false,
        isAudioEnded: true
      });
    }
  },

  onUnload() {
    const { audioContext } = this.data;
    if (audioContext) {
      audioContext.stop(); // 先停止播放
      audioContext.destroy(); // 再销毁实例
    }
    // 重置所有音频状态
    this.setData({ 
      audioContext: null,
      isPlaying: false,
      isAudioReady: false,
      isAudioEnded: false,
      progress: 0,
      currentTime: '0:00'
    });
  },

  initAudio() {
    try {
      if (this.data.audioContext) return;
  
      console.log('初始化音频播放器');
      const audioContext = wx.createInnerAudioContext();
      audioContext.src = this.data.musicUrl;
      audioContext.loop = false;
      audioContext.volume = 0.5;
      audioContext.autoplay = false;
      audioContext.obeyMuteSwitch = true;
  
      // 监听资源加载完成事件
      audioContext.onCanplay(() => {
        console.log('音频资源加载完成，可播放');
        this.setData({ isAudioReady: true });
        const totalTime = this.formatTime(audioContext.duration);
        this.setData({ totalTime });
      });
  
      // 播放开始事件
      audioContext.onPlay(() => {
        console.log('音乐开始播放');
        this.setData({ isPlaying: true });
      });
  
      // 播放暂停事件
      audioContext.onPause(() => {
        console.log('音乐暂停');
        this.setData({ isPlaying: false });
      });
  
      // 播放错误事件
      audioContext.onError((res) => {
        console.error('音乐播放错误：', res.errMsg, '错误码：', res.errCode);
        this.setData({ isPlaying: false, isAudioReady: false });
        wx.showToast({
          title: `播放失败（错误码：${res.errCode}）`,
          icon: 'none'
        });
      });
  
      // 播放结束事件 - 简化处理
      audioContext.onEnded(() => {
        console.log('音乐播放结束');
        this.setData({ 
          isPlaying: false,
          isAudioEnded: true
        });
      });
  
      this.setData({ audioContext });
  
    } catch (error) {
      console.error('初始化音频失败：', error);
      this.setData({ isAudioReady: false });
      wx.showToast({
        title: '音频初始化失败',
        icon: 'none'
      });
    }
  },

  toggleMusic() {
    try {
      const { audioContext, isPlaying, isAudioReady, isAudioEnded } = this.data;
  
      // 1. 未初始化音频：先初始化
      if (!audioContext) {
        this.initAudio();
        return;
      }
  
      // 2. 资源未加载完成：提示等待
      if (!isAudioReady) {
        wx.showToast({
          title: '音频正在加载中，请稍候',
          icon: 'none'
        });
        return;
      }
  
      // 3. 如果音频已播放结束，重新开始播放
      if (isAudioEnded) {
        console.log('音频已结束，重新开始播放');
        audioContext.seek(0);
        this.setData({ isAudioEnded: false });
        audioContext.play();
        return;
      }
  
      // 4. 正常切换播放/暂停
      if (isPlaying) {
        audioContext.pause();
      } else {
        audioContext.play();
      }
  
    } catch (error) {
      console.error('切换播放状态错误：', error);
      wx.showToast({
        title: '操作失败，请重试',
        icon: 'none'
      });
    }
  },

  // 上一首音乐
  prevMusic() {
    wx.showToast({
      title: '暂无上一首',
      icon: 'none'
    })
  },

  // 下一首音乐
  nextMusic() {
    wx.showToast({
      title: '暂无下一首',
      icon: 'none'
    })
  },

  // 格式化时间
  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  },

  // 视频全屏状态变化
  onVideoFullscreenChange(e) {
    console.log('视频全屏状态变化:', e.detail)
    if (e.detail.fullScreen) {
      // 进入全屏
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#000000'
      })
    } else {
      // 退出全屏
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#2c3e50'
      })
    }
  },

  // 进度条点击（暂时禁用，避免真机调试问题）
  onProgressTap(e) {
    // 暂时禁用进度条点击功能，避免真机调试卡死
    console.log('进度条点击功能暂时禁用')
    wx.showToast({
      title: '进度条功能暂时禁用',
      icon: 'none',
      duration: 1000
    })
  },

  // 跳转到关系网页面
  goToRelationship() {
    wx.navigateTo({
      url: '/pages/relationship/relationship'
    });
  },

  // 跳转到剧集介绍页面
  goToEpisodes() {
    wx.navigateTo({
      url: '/pages/episodes/episodes'
    });
  },

  // 跳转到购物页面
  goToShop() {
    wx.navigateTo({
      url: '/pages/shop/shop'
    });
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '罗小黑战记 - 精彩动画世界',
      path: '/pages/index/index',
      imageUrl: ASSETS.share.shareOne
    }
  },

  onShareTimeline() {
    return {
      title: '罗小黑战记 - 精彩动画世界',
      imageUrl: ASSETS.share.shareOne
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    
    // 模拟刷新数据
    setTimeout(() => {
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '刷新完成',
        icon: 'success'
      })
    }, 1000)
  },

  // 页面滚动
  onPageScroll(e) {
    // 可以根据滚动位置做一些动画效果
    const scrollTop = e.scrollTop
    console.log('页面滚动位置:', scrollTop)
  },


})
