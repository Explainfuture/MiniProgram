// pages/shop/shop.js
const app = getApp()
const cloudUtils = require('../../utils/cloud.js')

Page({
  data: {
    products: [],
    cart: [],
    totalPrice: 0,
    showCart: false,
    loading: true,
    useCloud: false // 是否使用云数据库
  },

  onLoad() {
    console.log('购物页面加载完成')
    this.loadProducts()
    this.loadCartFromStorage()
  },

  onShow() {
    this.loadCartFromStorage()
  },

  // 加载商品数据
  loadProducts() {
    this.setData({ loading: true })
    
    // 检查是否支持云开发
    if (wx.cloud) {
      this.loadProductsFromCloud()
    } else {
      this.loadProductsFromLocal()
    }
  },

  // 从云数据库加载商品
  loadProductsFromCloud() {
    cloudUtils.getProducts()
      .then(products => {
        console.log('从云数据库加载商品成功', products)
        this.setData({ 
          products: products,
          loading: false,
          useCloud: true
        })
      })
      .catch(err => {
        console.error('从云数据库加载商品失败', err)
        // 如果云数据库失败，回退到本地数据
        this.loadProductsFromLocal()
      })
  },

  // 从本地加载商品（备用方案）//没有用这个了，用的是数据库
  loadProductsFromLocal() {
    const localProducts = [
      {
        _id: '1',
        name: '罗小黑徽章',
        price: 10,
        model: '白毛小黑款',
        stock: 10,
        image: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaohei1.png',
        description: '精美的罗小黑徽章，白毛小黑款式，收藏必备'
      },
      {
        _id: '2',
        name: '罗小黑盲盒',
        price: 69,
        model: '盲选',
        stock: 100,
        image: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaohei1.png',
        description: '神秘盲盒，内含多种罗小黑周边，每次都有惊喜'
      },
      {
        _id: '3',
        name: '罗小黑挂件',
        price: 35,
        model: '呆滞款',
        stock: 50,
        image: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaohei1.png',
        description: '可爱的罗小黑挂件，呆滞表情萌翻全场'
      }
    ]
    
    this.setData({ 
      products: localProducts,
      loading: false,
      useCloud: false
    })
  },

  // 从本地存储加载购物车
  loadCartFromStorage() {
    const cart = wx.getStorageSync('cart') || []
    this.setData({ cart })
    this.calculateTotalPrice()
  },

  // 保存购物车到本地存储
  saveCartToStorage() {
    wx.setStorageSync('cart', this.data.cart)
  },

  // 添加到购物车
  addToCart(e) {
    console.log('添加到购物车被点击')
    const productId = e.currentTarget.dataset.id
    console.log('商品ID:', productId)
    
    const product = this.data.products.find(p => p._id === productId)
    console.log('找到商品:', product)
    
    if (!product) {
      console.log('商品不存在')
      wx.showToast({
        title: '商品不存在',
        icon: 'none'
      })
      return
    }

    if (product.stock <= 0) {
      console.log('商品库存不足')
      wx.showToast({
        title: '商品库存不足',
        icon: 'none'
      })
      return
    }

    const cart = [...this.data.cart]
    const existingItem = cart.find(item => item._id === productId)

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        wx.showToast({
          title: '库存不足',
          icon: 'none'
        })
        return
      }
      existingItem.quantity += 1
      console.log('增加商品数量:', existingItem.quantity)
    } else {
      cart.push({
        ...product,
        quantity: 1
      })
      console.log('添加新商品到购物车')
    }

    this.setData({ cart })
    this.saveCartToStorage()
    this.calculateTotalPrice()

    // 如果使用云数据库，更新库存
    if (this.data.useCloud) {
      this.updateStockInCloud(productId, product.stock - 1)
    }

    console.log('购物车更新后:', this.data.cart)
    
    wx.showToast({
      title: '已添加到购物车',
      icon: 'success'
    })
  },

  // 更新云数据库中的库存
  updateStockInCloud(productId, newStock) {
    cloudUtils.updateProductStock(productId, newStock)
      .then(() => {
        // 更新本地商品数据
        const products = this.data.products.map(p => {
          if (p._id === productId) {
            return { ...p, stock: newStock }
          }
          return p
        })
        this.setData({ products })
      })
      .catch(err => {
        console.error('更新库存失败', err)
      })
  },

  // 从购物车移除
  removeFromCart(e) {
    const productId = e.currentTarget.dataset.id
    const cart = this.data.cart.filter(item => item._id !== productId)
    
    this.setData({ cart })
    this.saveCartToStorage()
    this.calculateTotalPrice()

    wx.showToast({
      title: '已从购物车移除',
      icon: 'success'
    })
  },

  // 更新商品数量
  updateQuantity(e) {
    const { id, type } = e.currentTarget.dataset
    const cart = [...this.data.cart]
    const item = cart.find(item => item._id === id)
    
    if (!item) return

    if (type === 'increase') {
      const product = this.data.products.find(p => p._id === id)
      if (item.quantity >= product.stock) {
        wx.showToast({
          title: '库存不足',
          icon: 'none'
        })
        return
      }
      item.quantity += 1
    } else if (type === 'decrease') {
      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        // 数量为1时，直接移除
        this.removeFromCart({ currentTarget: { dataset: { id } } })
        return
      }
    }

    this.setData({ cart })
    this.saveCartToStorage()
    this.calculateTotalPrice()
  },

  // 计算总价
  calculateTotalPrice() {
    const totalPrice = this.data.cart.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
    this.setData({ totalPrice })
  },

  // 切换购物车显示
  toggleCart() {
    this.setData({
      showCart: !this.data.showCart
    })
  },

  // 清空购物车
  clearCart() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ cart: [], totalPrice: 0 })
          this.saveCartToStorage()
          wx.showToast({
            title: '购物车已清空',
            icon: 'success'
          })
        }
      }
    })
  },

  // 结算
  checkout() {
    if (this.data.cart.length === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '确认购买',
      content: `总金额：¥${this.data.totalPrice}`,
      success: (res) => {
        if (res.confirm) {
          this.processOrder()
        }
      }
    })
  },

  // 处理订单
  processOrder() {
    wx.showLoading({
      title: '正在处理订单...',
      mask: true
    })

    // 创建订单数据
    const orderData = {
      userId: 'user_' + Date.now(), // 临时用户ID
      items: this.data.cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity
      })),
      totalPrice: this.data.totalPrice,
      status: 'paid'
    }

    // 如果使用云数据库，更新库存并创建订单
    if (this.data.useCloud) {
      this.processOrderWithCloud(orderData)
    } else {
      this.processOrderLocal(orderData)
    }
  },

  // 使用云数据库处理订单
  processOrderWithCloud(orderData) {
    const updatePromises = this.data.cart.map(item => {
      return cloudUtils.updateProductStock(item._id, item.stock - item.quantity)
    })

    Promise.all(updatePromises)
      .then(() => {
        // 创建订单
        return cloudUtils.createOrder(orderData)
      })
      .then(() => {
        this.handleOrderSuccess()
      })
      .catch(err => {
        console.error('订单处理失败:', err)
        this.handleOrderError(err)
      })
  },

  // 本地处理订单
  processOrderLocal(orderData) {
    // 更新本地商品库存
    const products = this.data.products.map(product => {
      const cartItem = this.data.cart.find(item => item._id === product._id)
      if (cartItem) {
        return {
          ...product,
          stock: product.stock - cartItem.quantity
        }
      }
      return product
    })

    this.setData({ products })
    this.handleOrderSuccess()
  },

  // 订单处理成功
  handleOrderSuccess() {
    wx.hideLoading()
    
    // 清空购物车
    this.setData({ 
      cart: [], 
      totalPrice: 0 
    })
    this.saveCartToStorage()

    wx.showModal({
      title: '购买成功！',
      content: '订单已提交，感谢您的购买！',
      showCancel: false,
      success: () => {
        // 可以跳转到订单页面或其他页面
        console.log('订单处理完成')
      }
    })
  },

  // 订单处理失败
  handleOrderError(err) {
    wx.hideLoading()
    
    wx.showModal({
      title: '购买失败',
      content: '订单处理失败，请重试。错误信息：' + (err.message || '未知错误'),
      showCancel: false
    })
  },

  // 查看商品详情
  viewProductDetail(e) {
    const productId = e.currentTarget.dataset.id
    const product = this.data.products.find(p => p._id === productId)
    
    if (product) {
      wx.showModal({
        title: product.name,
        content: `${product.description}\n\n价格：¥${product.price}\n型号：${product.model}\n库存：${product.stock}`,
        showCancel: false
      })
    }
  }
})
