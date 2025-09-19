// pages/character/character.js
const { ASSETS } = require('../../utils/assets.js')

Page({
  data: {
    searchKeyword: '',
    loading: false,
    characters: [
      {
        id: 1,
        name: '罗小黑',
        title: '主角',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/xiaohei.png",
        shortDescription: '一只黑色的小猫妖，拥有强大的能力，性格善良纯真。',
        fullDescription: '罗小黑是一只黑色的小猫妖，拥有强大的空间系能力。他原本生活在森林中，因为家园被破坏而开始流浪。小黑性格善良纯真，对人类世界充满好奇，在旅途中遇到了许多朋友，也逐渐成长起来。',
        tags: ['主角', '猫妖', '空间系'],
        isMain: true,
        abilities: ['空间系-传送', '御灵系-金'],
        relationships: ['小白', '无限', '阿根']
      },
      {
        id: 2,
        name: '小白',
        title: '人类女孩',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/xiaobai.png",
        shortDescription: '善良的人类女孩，小黑的第一个人类朋友。',
        fullDescription: '小白是一个善良可爱的人类女孩，她成为了小黑在人类世界中的第一个朋友。小白对小黑非常关心，经常帮助他适应人类世界的生活。她性格开朗，喜欢照顾小动物。',
        tags: ['人类', '善良', '朋友'],
        isMain: true,
        abilities: ['无特殊能力'],
        relationships: ['罗小黑', '阿根']
      },
      {
        id: 3,
        name: '无限',
        title: '执行者',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/wuxian.png",
        shortDescription: '强大的执行者，拥有金属系能力，是小黑的师父。',
        fullDescription: '无限是妖精会馆的执行者，拥有强大的金属系能力。他性格冷静理性，但内心善良。无限成为了小黑的师父，教导他如何控制自己的力量，并帮助他成长。',
        tags: ['执行者', '空间系', '师父'],
        isMain: true,
        abilities: ['金属控制', '飞行', '战斗技巧'],
        relationships: ['罗小黑', '老君']
      },
      {
        id: 4,
        name: '阿根',
        title: '人类',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/ageng.png",
        shortDescription: '小白的乡下堂哥，却又被众妖认作上古神兽玄离。',
        fullDescription: '阿根是妖精会馆的执行者，拥有木系能力。他性格温和友善，经常帮助其他妖精。阿根是小黑的好朋友，经常和他一起执行任务，两人关系很好。',
        tags: ['御灵系', '温和', '朋友'],
        isMain: false,
        abilities: ['植物控制', '治疗', '感知'],
        relationships: ['罗小黑', '小白', '无限']
      },
      {
        id: 5,
        name: '风息',
        title: '妖精/长鬃豹',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/fengxi.png",
        shortDescription: '离岛组的领导人，罗小黑大电影1主角之一。',
        fullDescription: '风息是一个强大的反派角色，拥有风系能力。他性格复杂，有自己的理念和坚持。风息与小黑有着复杂的关系，既是敌人也是某种意义上的对手。',
        tags: ['离岛组', '御灵系', '复杂'],
        isMain: false,
        abilities: ['风控制', '飞行', '战斗'],
        relationships: ['罗小黑', '赤年']
      },
      {
        id: 6,
        name: '老君',
        title: '会馆创始人',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/laojun.png",
        shortDescription: '实力强悍，因誓言不能离开老君府且不能插手外界之事。',
        fullDescription: '老君是妖精会馆的馆长，拥有强大的能力。他性格神秘，经常给其他角色提供帮助和指导。老君是无限的朋友，两人关系很好。',
        tags: ['蓝溪镇', '神秘', '强大'],
        isMain: false,
        abilities: ['未知', '预知', '空间'],
        relationships: ['无限', '阿根']
      },
      {
        id: 7,
        name: '鹿野',
        title: '执行者',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/luye.png",
        shortDescription: '无限的关门弟子，罗小黑的师姐。',
        fullDescription: '鹿野是妖精会馆的执行者之一，拥有特殊的能力。他性格活泼开朗，经常给团队带来欢乐。鹿野在执行任务时非常认真，是团队中的重要成员。',
        tags: ['执行者', '师姐','生灵系'],
        isMain: false,
        abilities: ['未知', '感知', '辅助'],
        relationships: ['阿根', '无限']
      },
      {
        id: 8,
        name: '池年',
        title: '会馆长老',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/chinian.png",
        shortDescription: '妖灵会馆长老之一。',
        fullDescription: '赤年是反派角色之一，经常与风息一起行动。他性格冷酷，拥有强大的战斗能力。赤年对风息非常忠诚，两人关系密切。',
        tags: ['妖精/虎', '激进'],
        isMain: false,
        abilities: ['战斗', '火焰', '速度'],
        relationships: ['风息']
      },
      {
        id: 9,
        name: '哪吒',
        title: '妖精',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/nezha.png",
        shortDescription: '三系大佬，暴躁性格。',
        fullDescription: '哪吒是传说中的神话人物，拥有强大的神力。他在故事中以特殊的方式出现，给剧情带来了新的转折。哪吒性格直率，拥有强大的战斗能力。',
        tags: ['强大', '识别度', '直率'],
        isMain: false,
        abilities: ['神力', '飞行', '战斗'],
        relationships: ['罗小黑']
      }
    ],
    filteredCharacters: []
  },

  onLoad() {
    console.log('人物页面加载完成')
    this.setData({
      filteredCharacters: this.data.characters
    })
  },

  onShow() {
    // 页面显示时的逻辑
  },

  onReady() {
    // 页面渲染完成
  },

  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({ searchKeyword: keyword })
    this.filterCharacters(keyword)
  },

  // 搜索确认
  onSearchConfirm(e) {
    const keyword = e.detail.value
    this.setData({ searchKeyword: keyword })
    this.filterCharacters(keyword)
  },

  // 过滤角色
  filterCharacters(keyword) {
    if (!keyword.trim()) {
      this.setData({ filteredCharacters: this.data.characters })
      return
    }

    const filtered = this.data.characters.filter(character => {
      return character.name.includes(keyword) ||
             character.title.includes(keyword) ||
             character.tags.some(tag => tag.includes(keyword)) ||
             character.shortDescription.includes(keyword)
    })

    this.setData({ filteredCharacters: filtered })
  },

  // 角色点击
  onCharacterTap(e) {
    const character = e.currentTarget.dataset.character
    console.log('点击了角色:', character.name)
    
    // 跳转到角色详情页
    wx.navigateTo({
      url: `/pages/character/detail/detail?characterId=${character.id}`,
      success: () => {
        console.log('跳转到角色详情页成功')
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

  // 分享功能
  onShareAppMessage() {
    return {
      title: '罗小黑战记 - 角色介绍',
      path: '/pages/character/character',
      imageUrl: ASSETS.share.shareTwo
    }
  },

  onShareTimeline() {
    return {
      title: '罗小黑战记 - 角色介绍',
      imageUrl: ASSETS.share.shareTwo
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    
    // 模拟刷新数据
    setTimeout(() => {
      this.setData({
        filteredCharacters: this.data.characters,
        searchKeyword: ''
      })
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
