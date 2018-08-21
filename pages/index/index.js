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
    currentMarkerName: '', // 获取当前的气泡名称
    currentMarkerAddr: '',// 获取当前的气泡地址
  },

  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);

      this.mapCtx = my.createMapContext('myMap'); 
      // this.getLocation();
  },
  // 获取当前地理位置
  getLocation:function(){
      var that = this;
        my.getLocation({
            success(res){
                console.log(res,1)
                my.openLocation({
                  longitude: res.longitude,
                  latitude: res.latitude,
                  name: '地图',
                  address: '南京'
                })
                that.setData({
                    hasLocation: true,
                    longitude: res.longitude,
                    latitude: res.latitude
                })
            },
            fail(){
                my.alert({title:'定位失败'})
            }
        })
  },

  // 选择地理位置
  chooseLocation:function(){
    my.chooseLocation({
      success: (res) => {
        console.log(res,111)
        my.openLocation({
            longitude: res.longitude,
            latitude: res.latitude,
            name: res.address,
            address: res.name
        })
        that.setData({
            hasLocation: true,
            longitude: res.longitude,
            latitude: res.latitude
        })
      },
    });
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

  // 扫码功能
  scanCode(){
    console.log('222')
    my.scan({
      type: 'qr',
      success:(res)=>{
        console.log(res,54)
      }
    })
  },
});
