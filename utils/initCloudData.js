// utils/initCloudData.js
// 云数据库初始化脚本

const cloudUtils = require('./cloud.js')

/**
 * 初始化云数据库数据
 * 这个函数需要在云开发控制台中运行，或者在小程序中调用
 */
const initCloudDatabase = () => {
  console.log('开始初始化云数据库...')
  
  // 初始化商品数据
  cloudUtils.initProducts()
    .then(() => {
      console.log('商品数据初始化完成')
      wx.showToast({
        title: '云数据库初始化完成',
        icon: 'success'
      })
    })
    .catch(err => {
      console.error('云数据库初始化失败', err)
      wx.showToast({
        title: '云数据库初始化失败',
        icon: 'none'
      })
    })
}

/**
 * 检查云数据库连接状态
 */
const checkCloudConnection = () => {
  return new Promise((resolve, reject) => {
    if (!wx.cloud) {
      reject(new Error('当前环境不支持云开发'))
      return
    }

    // 尝试获取商品数据来测试连接
    cloudUtils.getProducts()
      .then(products => {
        console.log('云数据库连接正常', products.length, '个商品')
        resolve(true)
      })
      .catch(err => {
        console.error('云数据库连接失败', err)
        reject(err)
      })
  })
}

module.exports = {
  initCloudDatabase,
  checkCloudConnection
}
