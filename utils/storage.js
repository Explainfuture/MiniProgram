// utils/storage.js - 本地存储工具类

/**
 * 本地存储工具类
 */
class Storage {
  /**
   * 设置存储数据
   * @param {string} key 键名
   * @param {any} data 数据
   * @param {number} expire 过期时间（毫秒）
   */
  static set(key, data, expire = null) {
    try {
      const storageData = {
        data: data,
        timestamp: Date.now(),
        expire: expire
      }
      wx.setStorageSync(key, storageData)
    } catch (error) {
      console.error('存储数据失败:', error)
    }
  }

  /**
   * 获取存储数据
   * @param {string} key 键名
   * @param {any} defaultValue 默认值
   * @returns {any} 存储的数据
   */
  static get(key, defaultValue = null) {
    try {
      const storageData = wx.getStorageSync(key)
      if (!storageData) {
        return defaultValue
      }

      // 检查是否过期
      if (storageData.expire && Date.now() - storageData.timestamp > storageData.expire) {
        this.remove(key)
        return defaultValue
      }

      return storageData.data
    } catch (error) {
      console.error('获取存储数据失败:', error)
      return defaultValue
    }
  }

  /**
   * 删除存储数据
   * @param {string} key 键名
   */
  static remove(key) {
    try {
      wx.removeStorageSync(key)
    } catch (error) {
      console.error('删除存储数据失败:', error)
    }
  }

  /**
   * 清空所有存储数据
   */
  static clear() {
    try {
      wx.clearStorageSync()
    } catch (error) {
      console.error('清空存储数据失败:', error)
    }
  }

  /**
   * 获取存储信息
   * @returns {object} 存储信息
   */
  static getInfo() {
    try {
      return wx.getStorageInfoSync()
    } catch (error) {
      console.error('获取存储信息失败:', error)
      return null
    }
  }

  /**
   * 设置用户数据
   * @param {object} userData 用户数据
   */
  static setUserData(userData) {
    this.set('userData', userData)
  }

  /**
   * 获取用户数据
   * @returns {object} 用户数据
   */
  static getUserData() {
    return this.get('userData', {})
  }

  /**
   * 设置分享数据
   * @param {Array} shares 分享数据
   */
  static setShares(shares) {
    this.set('shares', shares)
  }

  /**
   * 获取分享数据
   * @returns {Array} 分享数据
   */
  static getShares() {
    return this.get('shares', [])
  }

  /**
   * 添加分享
   * @param {object} share 分享数据
   */
  static addShare(share) {
    const shares = this.getShares()
    share.id = Date.now() // 简单的ID生成
    share.publishTime = new Date().toISOString()
    shares.unshift(share)
    
    // 限制数量
    if (shares.length > 100) {
      shares.splice(100)
    }
    
    this.setShares(shares)
    return share
  }

  /**
   * 设置收藏数据
   * @param {Array} favorites 收藏数据
   */
  static setFavorites(favorites) {
    this.set('favorites', favorites)
  }

  /**
   * 获取收藏数据
   * @returns {Array} 收藏数据
   */
  static getFavorites() {
    return this.get('favorites', [])
  }

  /**
   * 添加收藏
   * @param {object} item 收藏项
   */
  static addFavorite(item) {
    const favorites = this.getFavorites()
    const exists = favorites.find(fav => fav.id === item.id)
    
    if (!exists) {
      favorites.unshift(item)
      this.setFavorites(favorites)
      return true
    }
    return false
  }

  /**
   * 移除收藏
   * @param {string|number} id 收藏项ID
   */
  static removeFavorite(id) {
    const favorites = this.getFavorites()
    const filtered = favorites.filter(fav => fav.id !== id)
    this.setFavorites(filtered)
  }

  /**
   * 检查是否已收藏
   * @param {string|number} id 收藏项ID
   * @returns {boolean} 是否已收藏
   */
  static isFavorite(id) {
    const favorites = this.getFavorites()
    return favorites.some(fav => fav.id === id)
  }

  /**
   * 设置设置数据
   * @param {object} settings 设置数据
   */
  static setSettings(settings) {
    this.set('settings', settings)
  }

  /**
   * 获取设置数据
   * @returns {object} 设置数据
   */
  static getSettings() {
    return this.get('settings', {
      theme: 'light',
      language: 'zh',
      notifications: true,
      autoPlay: true
    })
  }

  /**
   * 更新设置
   * @param {object} newSettings 新的设置
   */
  static updateSettings(newSettings) {
    const settings = this.getSettings()
    const updatedSettings = { ...settings, ...newSettings }
    this.setSettings(updatedSettings)
  }
}

module.exports = Storage
