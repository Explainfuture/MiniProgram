// pages/relationship/relationship.js
Page({
  data: {
    // 关系网缩放和移动
    scale: 1,
    translateX: 0,
    translateY: 0,
    
    // 触摸相关
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    isMoving: false,
  },

  onLoad() {
    console.log('关系网页面加载完成');
  },

  // 返回首页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 触摸开始
  onTouchStart(e) {
    const touch = e.touches[0];
    this.setData({
      startX: touch.clientX,
      startY: touch.clientY,
      lastX: this.data.translateX,
      lastY: this.data.translateY,
      isMoving: false
    });
  },

  // 触摸移动
  onTouchMove(e) {
    const touch = e.touches[0];
    const deltaX = touch.clientX - this.data.startX;
    const deltaY = touch.clientY - this.data.startY;
    
    // 判断是否开始移动
    if (!this.data.isMoving && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
      this.setData({ isMoving: true });
    }
    
    if (this.data.isMoving) {
      this.setData({
        translateX: this.data.lastX + deltaX,
        translateY: this.data.lastY + deltaY
      });
    }
  },

  // 触摸结束
  onTouchEnd(e) {
    this.setData({ isMoving: false });
  },

  // 放大
  zoomIn() {
    const newScale = Math.min(this.data.scale * 1.2, 3);
    this.setData({ scale: newScale });
  },

  // 缩小
  zoomOut() {
    const newScale = Math.max(this.data.scale / 1.2, 0.5);
    this.setData({ scale: newScale });
  },

  // 重置缩放
  resetZoom() {
    this.setData({
      scale: 1,
      translateX: 0,
      translateY: 0
    });
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '罗小黑战记 - 角色关系网',
      path: '/pages/relationship/relationship',
      imageUrl: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/share/shareone.jpg'
    }
  },

  onShareTimeline() {
    return {
      title: '罗小黑战记 - 角色关系网',
      imageUrl: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/share/shareone.jpg'
    }
  }
});
