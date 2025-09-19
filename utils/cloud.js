// utils/cloud.js
// 云数据库工具类

const db = wx.cloud.database()

// 商品集合
const productsCollection = db.collection('products')

// 购物车集合
const cartCollection = db.collection('cart')

// 订单集合
const ordersCollection = db.collection('orders')

/**
 * 获取商品列表
 */
const getProducts = () => {
  return new Promise((resolve, reject) => {
    productsCollection.get()
      .then(res => {
        console.log('获取商品列表成功', res.data)
        resolve(res.data)
      })
      .catch(err => {
        console.error('获取商品列表失败', err)
        reject(err)
      })
  })
}

/**
 * 根据ID获取商品
 */
const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    productsCollection.doc(id).get()
      .then(res => {
        console.log('获取商品详情成功', res.data)
        resolve(res.data)
      })
      .catch(err => {
        console.error('获取商品详情失败', err)
        reject(err)
      })
  })
}

/**
 * 更新商品库存
 */
const updateProductStock = (id, newStock) => {
  return new Promise((resolve, reject) => {
    productsCollection.doc(id).update({
      data: {
        stock: newStock
      }
    })
    .then(res => {
      console.log('更新商品库存成功', res)
      resolve(res)
    })
    .catch(err => {
      console.error('更新商品库存失败', err)
      reject(err)
    })
  })
}

/**
 * 保存购物车到云数据库
 */
const saveCartToCloud = (userId, cartItems) => {
  return new Promise((resolve, reject) => {
    cartCollection.add({
      data: {
        userId: userId,
        items: cartItems,
        createTime: new Date(),
        updateTime: new Date()
      }
    })
    .then(res => {
      console.log('保存购物车到云数据库成功', res)
      resolve(res)
    })
    .catch(err => {
      console.error('保存购物车到云数据库失败', err)
      reject(err)
    })
  })
}

/**
 * 从云数据库获取购物车
 */
const getCartFromCloud = (userId) => {
  return new Promise((resolve, reject) => {
    cartCollection.where({
      userId: userId
    }).orderBy('updateTime', 'desc').limit(1).get()
    .then(res => {
      console.log('从云数据库获取购物车成功', res.data)
      resolve(res.data.length > 0 ? res.data[0] : null)
    })
    .catch(err => {
      console.error('从云数据库获取购物车失败', err)
      reject(err)
    })
  })
}

/**
 * 创建订单
 */
const createOrder = (orderData) => {
  return new Promise((resolve, reject) => {
    ordersCollection.add({
      data: {
        ...orderData,
        createTime: new Date(),
        status: 'pending' // pending, paid, shipped, delivered, cancelled
      }
    })
    .then(res => {
      console.log('创建订单成功', res)
      resolve(res)
    })
    .catch(err => {
      console.error('创建订单失败', err)
      reject(err)
    })
  })
}

/**
 * 获取用户订单列表
 */
const getUserOrders = (userId) => {
  return new Promise((resolve, reject) => {
    ordersCollection.where({
      userId: userId
    }).orderBy('createTime', 'desc').get()
    .then(res => {
      console.log('获取用户订单列表成功', res.data)
      resolve(res.data)
    })
    .catch(err => {
      console.error('获取用户订单列表失败', err)
      reject(err)
    })
  })
}

/**
 * 初始化商品数据（仅开发环境使用）
 */
const initProducts = () => {
  const products = [
    {
      name: '罗小黑徽章',
      price: 10,
      model: '白毛小黑款',
      stock: 10,
      image: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaohei1.png',
      description: '精美的罗小黑徽章，白毛小黑款式，收藏必备',
      category: '徽章',
      status: 'active'
    },
    {
      name: '罗小黑盲盒',
      price: 69,
      model: '盲选',
      stock: 100,
      image: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaohei1.png',
      description: '神秘盲盒，内含多种罗小黑周边，每次都有惊喜',
      category: '盲盒',
      status: 'active'
    },
    {
      name: '罗小黑挂件',
      price: 35,
      model: '呆滞款',
      stock: 50,
      image: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaohei1.png',
      description: '可爱的罗小黑挂件，呆滞表情萌翻全场',
      category: '挂件',
      status: 'active'
    }
  ]

  return new Promise((resolve, reject) => {
    // 先清空现有数据
    productsCollection.get().then(res => {
      const deletePromises = res.data.map(item => 
        productsCollection.doc(item._id).remove()
      )
      return Promise.all(deletePromises)
    })
    .then(() => {
      // 添加新数据
      const addPromises = products.map(product => 
        productsCollection.add({ data: product })
      )
      return Promise.all(addPromises)
    })
    .then(res => {
      console.log('初始化商品数据成功', res)
      resolve(res)
    })
    .catch(err => {
      console.error('初始化商品数据失败', err)
      reject(err)
    })
  })
}

module.exports = {
  getProducts,
  getProductById,
  updateProductStock,
  saveCartToCloud,
  getCartFromCloud,
  createOrder,
  getUserOrders,
  initProducts
}
