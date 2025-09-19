// utils/autoInitCloud.js
// 自动初始化云数据库集合和数据

const db = wx.cloud.database()

/**
 * 自动创建所有需要的集合和数据
 * 这个函数会一次性创建所有集合并插入初始数据
 */
const autoInitAll = () => {
  console.log('🚀 开始自动初始化云数据库...')
  
  return new Promise((resolve, reject) => {
    // 1. 先创建商品数据
    createProductsCollection()
      .then(() => {
        console.log('✅ 商品集合创建完成')
        return createCartCollection()
      })
      .then(() => {
        console.log('✅ 购物车集合创建完成')
        return createOrdersCollection()
      })
      .then(() => {
        console.log('✅ 订单集合创建完成')
        console.log('🎉 所有集合创建完成！')
        resolve()
      })
      .catch(err => {
        console.error('❌ 初始化失败:', err)
        reject(err)
      })
  })
}

/**
 * 创建商品集合并插入数据
 */
const createProductsCollection = () => {
  const products = [
    {
      name: '罗小黑徽章',
      price: 10,
      model: '白毛小黑款',
      stock: 10,
      image: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaohei1.png',
      description: '精美的罗小黑徽章，白毛小黑款式，收藏必备',
      category: '徽章',
      status: 'active',
      createTime: new Date(),
      updateTime: new Date()
    },
    {
      name: '罗小黑盲盒',
      price: 69,
      model: '盲选',
      stock: 100,
      image: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaohei1.png',
      description: '神秘盲盒，内含多种罗小黑周边，每次都有惊喜',
      category: '盲盒',
      status: 'active',
      createTime: new Date(),
      updateTime: new Date()
    },
    {
      name: '罗小黑挂件',
      price: 35,
      model: '呆滞款',
      stock: 50,
      image: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaohei1.png',
      description: '可爱的罗小黑挂件，呆滞表情萌翻全场',
      category: '挂件',
      status: 'active',
      createTime: new Date(),
      updateTime: new Date()
    }
  ]

  return new Promise((resolve, reject) => {
    // 先清空现有数据（如果有的话）
    db.collection('products').get()
      .then(res => {
        if (res.data.length > 0) {
          console.log('发现现有商品数据，正在清空...')
          const deletePromises = res.data.map(item => 
            db.collection('products').doc(item._id).remove()
          )
          return Promise.all(deletePromises)
        }
        return Promise.resolve()
      })
      .then(() => {
        // 添加新数据
        console.log('正在添加商品数据...')
        const addPromises = products.map(product => 
          db.collection('products').add({ data: product })
        )
        return Promise.all(addPromises)
      })
      .then(res => {
        console.log('商品数据添加成功:', res.length, '个商品')
        resolve(res)
      })
      .catch(err => {
        console.error('创建商品集合失败:', err)
        reject(err)
      })
  })
}

/**
 * 创建购物车集合（空集合，不需要初始数据）
 */
const createCartCollection = () => {
  return new Promise((resolve, reject) => {
    // 尝试获取集合，如果不存在会自动创建
    db.collection('cart').limit(1).get()
      .then(() => {
        console.log('购物车集合已存在或创建成功')
        resolve()
      })
      .catch(err => {
        console.error('创建购物车集合失败:', err)
        reject(err)
      })
  })
}

/**
 * 创建订单集合（空集合，不需要初始数据）
 */
const createOrdersCollection = () => {
  return new Promise((resolve, reject) => {
    // 尝试获取集合，如果不存在会自动创建
    db.collection('orders').limit(1).get()
      .then(() => {
        console.log('订单集合已存在或创建成功')
        resolve()
      })
      .catch(err => {
        console.error('创建订单集合失败:', err)
        reject(err)
      })
  })
}

/**
 * 检查云数据库状态
 */
const checkCloudStatus = () => {
  return new Promise((resolve, reject) => {
    if (!wx.cloud) {
      reject(new Error('当前环境不支持云开发'))
      return
    }

    // 检查云环境是否初始化
    try {
      db.collection('products').limit(1).get()
        .then(() => {
          resolve({ connected: true, message: '云数据库连接正常' })
        })
        .catch(err => {
          resolve({ connected: false, message: '云数据库连接失败: ' + err.message })
        })
    } catch (error) {
      reject(new Error('云开发未正确初始化'))
    }
  })
}

/**
 * 一键初始化（推荐使用这个）
 */
const oneClickInit = () => {
  wx.showModal({
    title: '一键初始化云数据库',
    content: '这将自动创建所有需要的集合和数据，确定继续吗？',
    success: (res) => {
      if (res.confirm) {
        wx.showLoading({
          title: '正在初始化...',
          mask: true
        })

        autoInitAll()
          .then(() => {
            wx.hideLoading()
            wx.showModal({
              title: '初始化成功！',
              content: '云数据库已准备就绪，可以开始使用购物功能了！',
              showCancel: false,
              success: () => {
                // 可以跳转到购物页面
                wx.navigateTo({
                  url: '/pages/shop/shop'
                })
              }
            })
          })
          .catch(err => {
            wx.hideLoading()
            wx.showModal({
              title: '初始化失败',
              content: '请检查云开发配置是否正确：\n1. 是否开通了云开发\n2. 环境ID是否正确\n3. 网络连接是否正常',
              showCancel: false
            })
            console.error('初始化失败:', err)
          })
      }
    }
  })
}

module.exports = {
  autoInitAll,
  createProductsCollection,
  createCartCollection,
  createOrdersCollection,
  checkCloudStatus,
  oneClickInit
}
