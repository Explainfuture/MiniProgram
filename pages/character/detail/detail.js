// pages/character/detail/detail.js
const { ASSETS } = require('../../../utils/assets.js')

Page({
  data: {
    character: null,
    characterId: null
  },

  onLoad(options) {
    console.log('角色详情页加载', options)
    
    const characterId = parseInt(options.characterId)
    if (!characterId) {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
      return
    }

    this.setData({ characterId })
    this.loadCharacterDetail(characterId)
  },

  onShow() {
    // 页面显示时的逻辑
  },

  onReady() {
    // 页面渲染完成
  },

  // 加载角色详情
  loadCharacterDetail(characterId) {
    const characters = [
      {
        id: 1,
        name: '罗小黑',
        title: '主角',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/xiaohei.png",
        detailImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaohei1.png",
        backgroundImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/background.png",
        shortDescription: '一只黑色的小猫妖，拥有强大的能力，性格善良纯真。',
        fullDescription: '罗小黑是一只黑色的小猫妖，拥有强大的空间系能力。他原本生活在森林中，因为家园被破坏而开始流浪。小黑性格善良纯真，对人类世界充满好奇，在旅途中遇到了许多朋友，也逐渐成长起来。\n\n小黑拥有独特的空间系能力，可以瞬间移动和创造空间。虽然力量强大，但他总是用这份力量来帮助别人，保护自己珍视的朋友。他的成长历程充满了温暖和感动，是故事中最受欢迎的角色之一。',
        tags: ['主角', '妖精/猫', '空间系', '善良'],
        isMain: true,
        abilities: ['空间系-传送', '御灵系-金'],
        relationships: ['山新']
      },
      {
        id: 2,
        name: '小白',
        title: '人类女孩',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/xiaobai.png",
        detailImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaobai1.png",
        backgroundImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/backgroundone.png",
        shortDescription: '善良的人类女孩，小黑的第一个人类朋友。',
        fullDescription: '小白是一个善良可爱的人类女孩，她成为了小黑在人类世界中的第一个朋友。小白对小黑非常关心，经常帮助他适应人类世界的生活。她性格开朗，喜欢照顾小动物。\n\n小白虽然只是一个普通的人类女孩，但她拥有最纯真的心灵。她教会了小黑什么是友情，什么是爱，是小黑成长路上最重要的伙伴。她的存在让小黑明白了人类世界的温暖。',
        tags: ['人类', '善良', '朋友'],
        isMain: true,
        abilities: ['无特殊能力'],
        relationships: ['山新']
      },
      {
        id: 3,
        name: '无限',
        title: '执行者',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/wuxian.png",
        detailImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/wuxian1.png",
        backgroundImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/background.png",
        shortDescription: '强大的执行者，拥有金属系能力，是小黑的师父。',
        fullDescription: '无限是妖精会馆的执行者，拥有强大的金属系能力。他性格冷静理性，但内心善良。无限成为了小黑的师父，教导他如何控制自己的力量，并帮助他成长。\n\n无限虽然表面冷酷，但实际上非常关心小黑。他用自己的方式教导小黑，帮助他理解自己的力量，学会如何在这个复杂的世界中生存。无限的存在让小黑变得更加坚强和成熟。',
        tags: ['执行者', '空间系', '师父'],
        isMain: true,
        abilities: ['空间系-吞噬', '御灵系-金'],
        relationships: ['刘明月']
      },
      {
        id: 4,
        name: '阿根',
        title: '人类',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/ageng.png",
        detailImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/ageng1.png",
        backgroundImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/backgroundone.png",
        shortDescription: '小白的乡下堂哥，却又被众妖认作上古神兽玄离',
        fullDescription: '小白的乡下堂哥，却又被众妖认作上古神兽玄离(在番外篇《初遇》中，有阿根的爷爷云飞救下玄离的场面，虽然目前玄离与阿根的关系尚不明确，但根据大电影结尾的彩蛋玄离与阿根应当是共存状态)。\n\n由于嘲讽体质，寻常动物靠近他都会不自觉地咬他，可以吸收火焰、控制水的形态并凝结成冰(能力、特性与玄离相同)，灵质空间据说是有足球场那么大的极寒地狱，可放置有独立意识的分身，妖力强大。',
        tags: ['御灵系', '温和', '朋友'],
        isMain: false,
        abilities: ['御灵系-冰'],
        relationships: ['山新']
      },
      {
        id: 5,
        name: '风息',
        title: '妖精/长鬃豹',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/fengxi.png",
        detailImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/fengxi1.png",
        backgroundImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/background.png",
        shortDescription: '离岛组的领导人，罗小黑大电影1主角之一。',
        fullDescription: '他性格复杂，有自己的理念和坚持。风息与小黑有着复杂的关系，既是敌人也是某种意义上的对手。\n\n风息拥有强大的木系能力，他虽然是小黑的敌人，但也有自己的苦衷和坚持。他的存在让小黑明白了世界的复杂性，也让故事更加精彩。',
        tags: [ '离岛组', '复杂', '妖精'],
        isMain: false,
        abilities: ['御灵系-木', '生灵系-豪夺'],
        relationships: ['郝祥海']
      },
      {
        id: 6,
        name: '老君',
        title: '会馆创始人',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/laojun.png",
        detailImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/laojun1.png",
        backgroundImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/backgroundone.png",
        shortDescription: '实力强悍，因誓言不能离开老君府且不能插手外界之事。',
        fullDescription: '气质慵懒，略带玩世不恭的形象出现，内心重情重义且背负着过往伤痛。实力强悍，因誓言不能离开老君府且不能插手外界之事。\n\n在解决小黑窃得天明珠问题后暂未出场。也是会馆创始人之一，据说在众生之门篇章里决定打破誓言重新出山。',
        tags: ['馆长', '神秘', '强大'],
        isMain: false,
        abilities: ['生灵系-洞察','锁御系','心灵系','生灵系'],
        relationships: ['笑谈']
      },
      {
        id: 7,
        name: '鹿野',
        title: '执行者',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/luye.png",
        detailImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/luye1.png",
        backgroundImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/background.png",
        shortDescription: '执行者之一，无限的关门弟子',
        fullDescription: '无限的关门弟子，罗小黑的师姐。武力值高强，御灵系和生灵系双重能力。\n\n初见像坏人其实是很好的师姐，又美又飒，擅长养狗。',
        tags: ['执行者', '妖精','师姐'],
        isMain: false,
        abilities: ['生灵系-追毫', '御灵系-金'],
        relationships: ['朱婧']
      },
      {
        id: 8,
        name: '池年',
        title: '会馆长老',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/chinian.png",
        detailImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/chinian1.png",
        backgroundImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/backgroundone.png",
        shortDescription: '妖灵会馆长老之一。',
        fullDescription: '妖灵会馆长老之一，实力非凡，第一千届比武大赛冠军，仅用常规土元素打败其他人。\n\n性格较为激进，与无限不对付。但又有容乃大，膝下有四位徒弟,分别为甲、乙、芷清、丁。',
        tags: ['妖精/虎', '激进'],
        isMain: false,
        abilities: ['御灵系-土'],
        relationships: ['傅晨阳']
      },
      {
        id: 9,
        name: '哪吒',
        title: '特殊角色',
        avatar: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/nezha.png",
        detailImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/nezha1.png",
        backgroundImage: "https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/background.png",
        shortDescription: '传说中的哪吒，拥有强大的神力。',
        fullDescription: '三系大佬，暴躁性格，从总部会馆来的，脚踩风火轮，混天绫应该是胳膊上的袖带，冲天揪居然可以摘掉。\n\n哪吒作为神话人物，拥有强大的神力。他性格直率，总是直言不讳。他的出现给故事带来了新的元素，也让剧情更加精彩。',
        tags: ['神话', '神力', '直率', '强大'],
        isMain: false,
        abilities: ['御灵系-火', '锁御系-灵御', '生灵系-幻化'],
        relationships: ['山新']
      }
    ]

    const character = characters.find(char => char.id === characterId)
    if (!character) {
      wx.showToast({
        title: '角色不存在',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
      return
    }

    this.setData({ character })
    
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: character.name
    })
    
    // 设置页面背景
    this.setPageBackground(character.backgroundImage)
  },

  // 设置页面背景
  setPageBackground(backgroundImage) {
    // 动态设置页面背景
    const query = wx.createSelectorQuery()
    query.select('.container').boundingClientRect()
    query.exec((res) => {
      if (res[0]) {
        // 通过CSS变量设置背景图片
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#2c3e50'
        })
      }
    })
  },

  // 人际关系点击
  onRelationshipTap(e) {
    const name = e.currentTarget.dataset.name
    console.log('点击了关系:', name)
    
    // 根据角色名称查找对应的角色ID
    const characterMap = {
      '罗小黑': 1,
      '小白': 2,
      '无限': 3,
      '阿根': 4,
      '风息': 5,
      '老君': 6,
      '鹿野': 7,
      '池年': 8,
      '哪吒': 9
    }
    
    const targetCharacterId = characterMap[name]
    if (targetCharacterId && targetCharacterId !== this.data.characterId) {
      // 跳转到对应角色的详情页
      wx.navigateTo({
        url: `/pages/character/detail/detail?characterId=${targetCharacterId}`,
        success: () => {
          console.log(`跳转到${name}的详情页成功`)
        },
        fail: (err) => {
          console.error('跳转失败:', err)
          wx.showToast({
            title: '跳转失败',
            icon: 'none'
          })
        }
      })
    } else if (targetCharacterId === this.data.characterId) {
      wx.showToast({
        title: '这就是当前角色',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: `暂无${name}的详情`,
        icon: 'none'
      })
    }
  },

  // 预览图片
  previewImage(e) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({
      current: src,
      urls: [src]
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 分享功能
  onShareAppMessage() {
    const character = this.data.character
    return {
      title: `${character.name} - 罗小黑战记角色介绍`,
      path: `/pages/character/detail/detail?characterId=${character.id}`,
      imageUrl: character.avatar
    }
  },

  onShareTimeline() {
    const character = this.data.character
    return {
      title: `${character.name} - 罗小黑战记角色介绍`,
      imageUrl: character.avatar
    }
  }
})
