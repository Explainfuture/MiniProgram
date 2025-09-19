// utils/assets.js - 素材配置文件
// 请将下面的本地路径替换为您的阿里云OSS URL

const ASSETS = {
  // 底部导航栏图标
  tabBar: {
    home: 'Sucai/downbar/one-min.png', 
    homeSelected: 'Sucai/downbar/one-min.png', 
    character: 'Sucai/downbar/two-min.png', 
    characterSelected: 'Sucai/downbar/two-min.png',
    share: 'Sucai/downbar/three-min.png',
    shareSelected: 'Sucai/downbar/three-min.png', 
    profile: 'Sucai/downbar/four-min.png',
    profileSelected: 'Sucai/downbar/four-min.png'
  },

  // 首页素材
  index: {
    background: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/background.png',
    backgroundOne: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/backgroundone.png',
    goodnightCat: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/goodnightcat.mp3',
    videos: {
      bigFilm1: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/luoxiaoheivideo/luoxiaoheibigfilm1.mp4',
      bigFilm2: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/luoxiaoheivideo/luoxiaoheibigfilm2.mp4',
      tv: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/luoxiaoheivideo/luoxiaoheiTV.mp4'
    },
    images: {
      one: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/one.png',
      two: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/two.png',
      three: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/three.png',
      four: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/index/four.png'
    }
  },

  // 人物素材
  characters: {
    ageng: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/ageng.png',
    chinian: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/chinian.png', 
    fengxi: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/fengxi.png', 
    laojun: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/laojun.png',
    luye: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/luye.png',
    nezha: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/nezha.png',
    wuxian: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/wuxian.png',
    xiaobai: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/xiaobai.png', 
    xiaohei: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/xiaohei.png'
  },

  // 人物详情大图
  characterDetails: {
    ageng: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/ageng1.png',
    chinian: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/chinian1.png',
    fengxi: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/fengxi1.png',
    laojun: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/laojun1.png',
    luye: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/luyue1.png',
    nezha: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/nezha1.png',
    wuxian: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/wuxian1.png',
    xiaobai: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaobai1.png',
    xiaohei: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/person/MainShow/xiaohei1.png'
  },

  share: {
    shareOne: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/share/shareone.jpg',
    shareTwo: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/share/sharetwo.jpg',
    shareThree: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/share/sharethree.jpg',
    shareFour: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/share/sharefour.jpg',
    shareFive: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/share/sharefive.jpg',
    shareSix: 'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/share/sharesix.jpg',
    userone:'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/userone.png' ,
    usertwo:'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/usertwo.png' ,
    userthree:'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/userthree.png' ,
    userfour:'https://miniprogramforlusin.oss-cn-hangzhou.aliyuncs.com/Sucai/userfour.png'
  }
}

const getAssetUrl = (category, key, subKey = null) => {
  if (subKey) {
    return ASSETS[category][key][subKey]
  }
  return ASSETS[category][key]
}

module.exports = {
  ASSETS,
  getAssetUrl
}
