// pages/share/publish/publish.js
const app = getApp()
const { ASSETS } = require('../../../utils/assets.js')

Page({
  data: {
    userInfo: {},
    content: '',
    images: [],
    imageUrl: '',
    tags: [],
    tagInput: '',
    publishing: false,
    canPublish: false
  },

  onLoad() {
    console.log('发布页面加载完成')
    this.getUserInfo()
  },

  onShow() {
    // 页面显示时的逻辑
  },

  onReady() {
    // 页面渲染完成
  },

  // 获取用户信息
  getUserInfo() {
    app.getUserInfo().then(userInfo => {
      this.setData({ userInfo })
    }).catch(err => {
      console.error('获取用户信息失败:', err)
      // 使用默认用户信息
      this.setData({
        userInfo: {
          nickName: '匿名用户',
          avatarUrl: ASSETS.characterDetails.xiaohei
        }
      })
    })
  },

  // 内容输入
  onContentInput(e) {
    const content = e.detail.value
    this.setData({ content })
    this.checkCanPublish()
  },

  // 标签输入
  onTagInput(e) {
    this.setData({ tagInput: e.detail.value })
  },

  // 添加标签
  addTag() {
    const tagInput = this.data.tagInput.trim()
    if (!tagInput) {
      wx.showToast({
        title: '请输入标签',
        icon: 'none'
      })
      return
    }

    const tags = this.data.tags
    if (tags.includes(tagInput)) {
      wx.showToast({
        title: '标签已存在',
        icon: 'none'
      })
      return
    }

    if (tags.length >= 5) {
      wx.showToast({
        title: '最多添加5个标签',
        icon: 'none'
      })
      return
    }

    tags.push(tagInput)
    this.setData({
      tags: tags,
      tagInput: ''
    })
    this.checkCanPublish()
  },

  // 删除标签
  removeTag(e) {
    const tag = e.currentTarget.dataset.tag
    const tags = this.data.tags.filter(t => t !== tag)
    this.setData({ tags })
    this.checkCanPublish()
  },

  // 选择图片
  chooseImage() {
    const maxCount = 9 - this.data.images.length
    wx.chooseMedia({
      count: maxCount,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: (res) => {
        const tempFiles = res.tempFiles
        const newImages = tempFiles.map(file => file.tempFilePath)
        const images = [...this.data.images, ...newImages]
        this.setData({ images })
        this.checkCanPublish()
      },
      fail: (err) => {
        console.error('选择图片失败:', err)
        wx.showToast({
          title: '选择图片失败',
          icon: 'none'
        })
      }
    })
  },

  // 预览图片
  previewImage(e) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({
      current: src,
      urls: this.data.images
    })
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.images.filter((_, i) => i !== index)
    this.setData({ images })
    this.checkCanPublish()
  },

  // URL输入
  onUrlInput(e) {
    this.setData({
      imageUrl: e.detail.value
    })
  },

  // 从URL添加图片
  addImageFromUrl() {
    const url = this.data.imageUrl.trim()
    if (!url) {
      wx.showToast({
        title: '请输入图片链接',
        icon: 'none'
      })
      return
    }

    // 简单的URL验证
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      wx.showToast({
        title: '请输入有效的图片链接',
        icon: 'none'
      })
      return
    }

    if (this.data.images.length >= 9) {
      wx.showToast({
        title: '最多只能添加9张图片',
        icon: 'none'
      })
      return
    }

    const images = [...this.data.images, url]
    this.setData({
      images: images,
      imageUrl: ''
    })
    this.checkCanPublish()

    wx.showToast({
      title: '图片添加成功',
      icon: 'success'
    })
  },

  // 检查是否可以发布
  checkCanPublish() {
    const canPublish = this.data.content.trim().length > 0 || this.data.images.length > 0
    this.setData({ canPublish })
  },

  // 发布分享
  async publishShare() {
    if (!this.data.canPublish) {
      wx.showToast({
        title: '请填写内容或添加图片',
        icon: 'none'
      })
      return
    }

    this.setData({ publishing: true })

    try {
      // 创建分享数据（直接使用本地图片路径）
      const shareData = {
        content: this.data.content.trim(),
        images: this.data.images, // 直接使用本地路径
        tags: this.data.tags,
        userName: this.data.userInfo.nickName || '匿名用户',
        userAvatar: this.data.userInfo.avatarUrl || ASSETS.characterDetails.xiaohei,
        publishTime: this.formatTime(new Date()),
        likeCount: 0,
        isLiked: false
      }

      // 保存到本地存储和全局数据
      this.saveShareToLocal(shareData)
      app.saveUserPost(shareData)

      wx.showToast({
        title: '发布成功',
        icon: 'success'
      })

      // 延迟返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)

    } catch (error) {
      console.error('发布失败:', error)
      wx.showToast({
        title: '发布失败，请重试',
        icon: 'none'
      })
    } finally {
      this.setData({ publishing: false })
    }
  },

  // 保存分享到本地存储
  saveShareToLocal(shareData) {
    try {
      const shares = wx.getStorageSync('shares') || []
      shareData.id = Date.now() // 简单的ID生成
      shares.unshift(shareData)
      
      // 限制本地存储的分享数量
      if (shares.length > 100) {
        shares.splice(100)
      }
      
      wx.setStorageSync('shares', shares)
      console.log('分享保存成功')
    } catch (error) {
      console.error('保存分享失败:', error)
    }
  },

  // 格式化时间
  formatTime(date) {
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) {
      return '刚刚'
    } else if (minutes < 60) {
      return `${minutes}分钟前`
    } else if (hours < 24) {
      return `${hours}小时前`
    } else if (days < 7) {
      return `${days}天前`
    } else {
      return date.toLocaleDateString()
    }
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '罗小黑战记 - 发布分享',
      path: '/pages/share/publish/publish'
    }
  }
})
