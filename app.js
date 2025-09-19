// app.js
App({
  onLaunch() {
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: 'cloud1-0g3w1k0mfc8e948a', // 替换为你的云环境ID
        traceUser: true
      })
      console.log('云开发初始化成功')
    } else {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功', res.code)
      }
    })

    // 初始化全局数据
    this.initGlobalData()
  },

  // 初始化全局数据
  initGlobalData() {
    this.globalData = {
      userInfo: null,
      userPosts: [] // 用户发布的帖子
    }
  },

  // 获取用户信息
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.globalData.userInfo) {
        resolve(this.globalData.userInfo)
      } else {
        wx.getUserProfile({
          desc: '用于完善用户资料',
          success: (res) => {
            this.globalData.userInfo = res.userInfo
            resolve(res.userInfo)
          },
          fail: reject
        })
      }
    })
  },

  // 保存用户帖子到本地存储
  saveUserPost(post) {
    const posts = wx.getStorageSync('userPosts') || []
    posts.unshift({
      id: Date.now(),
      ...post,
      createTime: new Date().toISOString()
    })
    wx.setStorageSync('userPosts', posts)
    this.globalData.userPosts = posts
  },

  // 获取用户帖子
  getUserPosts() {
    const posts = wx.getStorageSync('userPosts') || []
    this.globalData.userPosts = posts
    return posts
  },

  globalData: {
    userInfo: null,
    userPosts: []
  }
})
