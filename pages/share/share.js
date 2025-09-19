// pages/share/share.js
const app = getApp()
const { ASSETS } = require('../../utils/assets.js')

Page({
  data: {
    loading: false,
    shares: []
  },

  onLoad() {
    console.log('分享页面加载完成')
    this.loadShares()
  },

  onShow() {
    // 页面显示时刷新数据
    this.loadShares()
  },

  onReady() {
    // 页面渲染完成
  },

  // 加载分享数据
  loadShares() {
    this.setData({ loading: true })
    
    try {
      // 从本地存储加载用户发布的分享
      const userShares = wx.getStorageSync('shares') || []
      
      // 添加一些示例分享数据（使用素材配置）
      const defaultShares = [
        {
          id: 1,
          userName: '风息重度依赖',
          userAvatar: ASSETS.share.userone,
          content: '今天又重温了一遍罗小黑战记，每次看都有新的感受。风息真的太帅了！',
          images: [ASSETS.share.shareOne],
          tags: ['风息', '重温', '罗小黑大电影1'],
          publishTime: '2小时前',
          likeCount: 15,
          isLiked: false
        },
        {
          id: 2,
          userName: '动画爱好者',
          userAvatar: ASSETS.share.usertwo,
          content: '罗小黑战记的动画制作真的太精良了，每一帧都是艺术品！',
          images: [ASSETS.share.shareTwo, ASSETS.share.shareThree],
          tags: ['动画', '制作', '精良'],
          publishTime: '5小时前',
          likeCount: 23,
          isLiked: true
        },
        {
          id: 3,
          userName: '无限求拜师',
          userAvatar: ASSETS.share.userthree,
          content: '无限师父真的太帅了！空间系能力简直无敌！',
          images: [ASSETS.share.shareFour],
          tags: ['无限', '师父'],
          publishTime: '1天前',
          likeCount: 8,
          isLiked: false
        },
        {
          id: 4,
          userName: '剧情分析',
          userAvatar: ASSETS.share.userfour,
          content: '罗小黑战记的剧情设计真的很巧妙，每个角色都有自己的故事线，环环相扣。',
          images: [ASSETS.share.shareFive, ASSETS.share.shareSix],
          tags: ['剧情', '分析', '角色'],
          publishTime: '2天前',
          likeCount: 31,
          isLiked: false
        }
      ]
      
      // 合并用户分享和默认分享
      const allShares = [...userShares, ...defaultShares]
      
      this.setData({ 
        shares: allShares,
        loading: false 
      })
    } catch (error) {
      console.error('加载分享数据失败:', error)
      this.setData({ loading: false })
    }
  },

  // 跳转到发布页面
  goToPublish() {
    wx.navigateTo({
      url: '/pages/share/publish/publish',
      success: () => {
        console.log('跳转到发布页面成功')
      },
      fail: (err) => {
        console.error('跳转失败:', err)
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },

  // 分享项点击
  onShareTap(e) {
    const share = e.currentTarget.dataset.share
    console.log('点击了分享:', share.id)
    
    // 可以跳转到分享详情页
    // wx.navigateTo({
    //   url: `/pages/share/detail/detail?shareId=${share.id}`
    // })
  },

  // 点赞功能
  onLike(e) {
    const shareId = e.currentTarget.dataset.id
    const shares = this.data.shares.map(share => {
      if (share.id === shareId) {
        return {
          ...share,
          isLiked: !share.isLiked,
          likeCount: share.isLiked ? share.likeCount - 1 : share.likeCount + 1
        }
      }
      return share
    })
    
    this.setData({ shares })
    
    // 显示反馈
    const share = shares.find(s => s.id === shareId)
    wx.showToast({
      title: share.isLiked ? '已点赞' : '已取消点赞',
      icon: 'none',
      duration: 1000
    })
  },

  // 预览图片
  previewImages(e) {
    const current = e.currentTarget.dataset.current
    const urls = e.currentTarget.dataset.urls
    
    wx.previewImage({
      current: current,
      urls: urls
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '罗小黑战记 - 分享动态',
      path: '/pages/share/share',
      imageUrl: ASSETS.share.shareOne
    }
  },

  onShareTimeline() {
    return {
      title: '罗小黑战记 - 分享动态',
      imageUrl: ASSETS.share.shareOne
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    
    this.loadShares()
    
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
    const scrollTop = e.scrollTop
    console.log('页面滚动位置:', scrollTop)
  }
})
