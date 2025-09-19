// pages/shop/test.js
// 购物功能测试页面

const cloudUtils = require('../../utils/cloud.js')
const initUtils = require('../../utils/initCloudData.js')
const autoInit = require('../../utils/autoInitCloud.js')

Page({
  data: {
    testResults: [],
    cloudStatus: '检查中...'
  },

  onLoad() {
    console.log('购物功能测试页面加载')
    this.checkCloudStatus()
  },

  // 测试云数据库连接
  testCloudConnection() {
    this.addTestResult('开始测试云数据库连接...')
    
    initUtils.checkCloudConnection()
      .then(() => {
        this.addTestResult('✅ 云数据库连接正常')
      })
      .catch(err => {
        this.addTestResult('❌ 云数据库连接失败: ' + err.message)
      })
  },

  // 测试商品数据加载
  testLoadProducts() {
    this.addTestResult('开始测试商品数据加载...')
    
    cloudUtils.getProducts()
      .then(products => {
        this.addTestResult(`✅ 成功加载 ${products.length} 个商品`)
        products.forEach(product => {
          this.addTestResult(`  - ${product.name}: ¥${product.price} (库存: ${product.stock})`)
        })
      })
      .catch(err => {
        this.addTestResult('❌ 商品数据加载失败: ' + err.message)
      })
  },

  // 初始化测试数据
  initTestData() {
    this.addTestResult('开始初始化测试数据...')
    
    initUtils.initCloudDatabase()
      .then(() => {
        this.addTestResult('✅ 测试数据初始化完成')
      })
      .catch(err => {
        this.addTestResult('❌ 测试数据初始化失败: ' + err.message)
      })
  },

  // 检查云数据库状态
  checkCloudStatus() {
    autoInit.checkCloudStatus()
      .then(status => {
        this.setData({ 
          cloudStatus: status.connected ? '✅ 连接正常' : '❌ 连接失败'
        })
        this.addTestResult(status.message)
      })
      .catch(err => {
        this.setData({ 
          cloudStatus: '❌ 未配置'
        })
        this.addTestResult('云开发未配置: ' + err.message)
      })
  },

  // 一键初始化云数据库
  oneClickInit() {
    this.addTestResult('开始一键初始化云数据库...')
    autoInit.oneClickInit()
  },

  // 清空测试结果
  clearResults() {
    this.setData({ testResults: [] })
  },

  // 添加测试结果
  addTestResult(message) {
    const testResults = [...this.data.testResults, {
      id: Date.now(),
      message: message,
      time: new Date().toLocaleTimeString()
    }]
    this.setData({ testResults })
  }
})
