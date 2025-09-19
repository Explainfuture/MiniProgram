# 罗小黑战记微信小程序

一个基于微信小程序的《罗小黑战记》主题应用，包含角色介绍、分享功能、用户系统等完整功能。

## 功能特性

### 🏠 首页
- **可拖拽缩放的关系网图**：支持手势缩放和移动的角色关系展示
- **剧集介绍区域**：包含罗小黑大电影1、大电影2、TV版的视频和文字介绍
- **背景音乐播放**：支持背景音乐播放控制
- **响应式设计**：适配不同屏幕尺寸

### 👥 人物页面
- **搜索功能**：支持按名字、标签等模糊搜索角色
- **角色卡片展示**：九个人物卡片的网格布局
- **角色详情页**：点击进入详情，显示大图、能力、人际关系等
- **动画效果**：流畅的页面切换和加载动画

### 📝 分享页面
- **图片上传**：支持多图片上传到阿里云OSS
- **内容发布**：文字内容、图片、标签的发布功能
- **动态展示**：用户分享的动态列表
- **点赞功能**：支持点赞和取消点赞

### 👤 我的页面
- **微信登录**：一键微信登录功能
- **个人统计**：发布数、获赞数、浏览数统计
- **我的发布**：查看和管理个人发布内容
- **功能菜单**：收藏、设置、关于等功能入口

## 技术架构

### 前端技术
- **微信小程序原生开发**：使用WXML、WXSS、JavaScript
- **分包加载**：优化小程序包大小，避免超出1.5MB限制
- **云开发集成**：使用阿里云OSS存储图片资源
- **响应式设计**：适配不同设备屏幕

### 文件结构
```
├── app.js                 # 小程序入口文件
├── app.json              # 全局配置
├── app.wxss              # 全局样式
├── sitemap.json          # 站点地图
├── project.config.json   # 项目配置
├── pages/                # 页面目录
│   ├── index/            # 首页
│   ├── character/        # 人物页面
│   │   └── detail/       # 角色详情页（分包）
│   ├── share/            # 分享页面
│   │   └── publish/      # 发布页面（分包）
│   └── profile/          # 我的页面
├── utils/                # 工具类
│   ├── oss.js           # 阿里云OSS工具
│   ├── storage.js       # 本地存储工具
│   └── util.js          # 通用工具函数
└── Sucai/               # 资源文件
    ├── background.png   # 背景图片
    ├── person/          # 角色图片
    ├── index/           # 首页资源
    ├── downbar/         # 底部导航图标
    └── share/           # 分享图片
```

## 配置说明

### 1. 小程序配置
在 `project.config.json` 中配置你的小程序AppID：
```json
{
  "appid": "your-app-id"
}
```

### 2. 阿里云OSS配置
在 `app.js` 中配置阿里云OSS信息：
```javascript
ossConfig: {
  region: 'oss-cn-hangzhou',
  bucket: 'miniprogramforlusin',
  accessKeyId: 'your-access-key-id',
  accessKeySecret: 'your-access-key-secret',
  baseUrl: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/'
}
```

### 3. 后端接口配置
在 `utils/oss.js` 中配置后端签名接口：
```javascript
url: 'https://your-backend.com/api/oss/signature'
```

## 安装使用

### 1. 环境准备
- 安装微信开发者工具
- 注册微信小程序账号
- 配置阿里云OSS服务

### 2. 项目导入
1. 下载项目代码
2. 用微信开发者工具打开项目
3. 配置AppID和项目信息
4. 上传代码到微信后台

### 3. 功能测试
- 测试页面跳转和导航
- 测试图片上传功能
- 测试用户登录功能
- 测试分享和发布功能

## 主要功能实现

### 关系网图实现
```javascript
// 触摸事件处理
onTouchStart(e) {
  const touch = e.touches[0]
  this.setData({
    startX: touch.clientX,
    startY: touch.clientY,
    isMoving: false
  })
}

onTouchMove(e) {
  // 处理拖拽和缩放逻辑
  const deltaX = touch.clientX - this.data.lastX
  const deltaY = touch.clientY - this.data.lastY
  // 更新位置和缩放
}
```

### 图片上传实现
```javascript
// 上传到阿里云OSS
async uploadToOSS(filePath, fileName) {
  const signature = await this.getSignature(fileName)
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: signature.host,
      filePath: filePath,
      name: 'file',
      formData: signature.formData,
      success: (res) => {
        resolve(`${signature.host}/${signature.key}`)
      }
    })
  })
}
```

### 搜索功能实现
```javascript
// 角色搜索
filterCharacters(keyword) {
  const filtered = this.data.characters.filter(character => {
    return character.name.includes(keyword) ||
           character.tags.some(tag => tag.includes(keyword))
  })
  this.setData({ filteredCharacters: filtered })
}
```

## 注意事项

### 1. 分包配置
- 角色详情页和发布页面使用分包加载
- 避免主包超出1.5MB限制
- 合理分配资源文件

### 2. 图片资源
- 使用阿里云OSS存储图片
- 实现图片压缩和懒加载
- 支持多种图片格式

### 3. 用户体验
- 添加加载状态和错误处理
- 实现下拉刷新和上拉加载
- 优化页面切换动画

### 4. 数据安全
- 用户数据本地存储
- 图片上传使用签名验证
- 敏感信息加密处理

## 扩展功能

### 可扩展的功能
- 用户评论系统
- 消息通知功能
- 数据统计分析
- 社交分享功能
- 离线缓存机制

### 性能优化
- 图片懒加载
- 数据分页加载
- 缓存策略优化
- 代码分包优化

## 技术支持

如有问题，请参考：
- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [阿里云OSS文档](https://help.aliyun.com/product/31815.html)
- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## 许可证

本项目仅供学习和参考使用，请勿用于商业用途。
