// 获取应用实例
const app = getApp();

const { windowWidth } = my.getSystemInfoSync();

Page({

  data:{
    
    imgUrls:[
      {
        id:0,
        img:'../../images/home.jpg'
      },
      {
        id: 1,
        img:'../../images/home.jpg'
      }
    ],

    indicatorDots: true,
    autoplay: true,
    interval: 3000,

    animation: true,
    windowWidth,
  },

  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },

  bindViewTap(){
    my.navigateTo({
      url: '/pages/detail/detail'
    })
  },

  onShareAppMessage() {
    console.log('aaa')
    // my.canIUse('button.open-type.share') 
    return {
      title: '小程序分享',
      desc: '小程序官方示例Demo，展示已支持的接口能力及组件。',
      path: 'pages/detail/detail'
    };
  },
});
