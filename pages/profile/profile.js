// pages/profile/profile.js
const app = getApp()
const { ASSETS } = require('../../utils/assets.js')

Page({
  data: {
    userInfo: null,
    myShares: [],
    favorites: [],
    likeCount: 0,
    viewCount: 0
  },

  onLoad() {
    console.log('我的页面加载完成')
    this.loadUserData()
  },

  onShow() {
    // 页面显示时刷新数据
    this.loadUserData()
  },

  onReady() {
    // 页面渲染完成
  },

  // 加载用户数据
  loadUserData() {
    // 获取用户信息
    const userInfo = app.globalData.userInfo
    if (userInfo) {
      this.setData({ userInfo })
      this.loadMyShares()
      this.loadFavorites()
      this.calculateStats()
    } else {
      this.setData({ userInfo: null })
    }
  },

  // 加载我的发布
  loadMyShares() {
    try {
      const shares = wx.getStorageSync('shares') || []
      const userInfo = this.data.userInfo
      
      if (userInfo) {
        // 过滤出当前用户的发布
        const myShares = shares.filter(share => 
          share.userName === userInfo.nickName
        )
        this.setData({ myShares })
      }
    } catch (error) {
      console.error('加载我的发布失败:', error)
    }
  },

  // 加载收藏
  loadFavorites() {
    try {
      const favorites = wx.getStorageSync('favorites') || []
      this.setData({ favorites })
    } catch (error) {
      console.error('加载收藏失败:', error)
    }
  },

  // 计算统计数据
  calculateStats() {
    const myShares = this.data.myShares
    const likeCount = myShares.reduce((total, share) => total + share.likeCount, 0)
    const viewCount = myShares.length * 10 // 模拟浏览数
    
    this.setData({
      likeCount,
      viewCount
    })
  },

  // 登录
  login() {
    wx.showLoading({
      title: '登录中...'
    })

    app.getUserInfo().then(userInfo => {
      app.globalData.userInfo = userInfo
      this.setData({ userInfo })
      this.loadMyShares()
      this.loadFavorites()
      this.calculateStats()
      
      wx.hideLoading()
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
    }).catch(err => {
      console.error('登录失败:', err)
      wx.hideLoading()
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
    })
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.globalData.userInfo = null
          this.setData({
            userInfo: null,
            myShares: [],
            favorites: [],
            likeCount: 0,
            viewCount: 0
          })
          
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  },

  // 跳转到我的发布
  goToMyShares() {
    if (!this.data.userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/profile/my-shares/my-shares',
      success: () => {
        console.log('跳转到我的发布成功')
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

  // 跳转到我的收藏
  goToFavorites() {
    if (!this.data.userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/profile/favorites/favorites',
      success: () => {
        console.log('跳转到我的收藏成功')
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

  // 跳转到设置
  goToSettings() {
    wx.navigateTo({
      url: '/pages/profile/settings/settings',
      success: () => {
        console.log('跳转到设置成功')
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

  // 跳转到关于我们
  goToAbout() {
    wx.navigateTo({
      url: '/pages/profile/about/about',
      success: () => {
        console.log('跳转到关于我们成功')
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

  // 分享功能
  onShareAppMessage() {
    return {
      title: '罗小黑战记 - 我的主页',
      path: '/pages/profile/profile',
      imageUrl: ASSETS.share.shareOne
    }
  },

  onShareTimeline() {
    return {
      title: '罗小黑战记 - 我的主页',
      imageUrl: ASSETS.share.shareOne
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    
    this.loadUserData()
    
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
