Page({
    data: {
        longitude: '',
        latitude: '',
        hasLocation: false,
        height: '',
        showPopup: false,
        markers: [], // 地图标点
        markersinfo: {}, // 标点信息
        controls: [], // 地图控件
        polyline: [], // 路线
        oldMarkerID: null,
        currentMarkersLong: 0,
        currentMarkersLati: 0,
        currentMarkerName: '',
        currentMarkerAddr: '',
    },
    onLoad: function (options) {
        // 获取系统信息
        my.getSystemInfo({
            success: (res) => {
                console.log(res, 23)
                this.setData({
                    height: res.windowHeight
                })
            },
        });
    },

    onReady(e) {
        my.setNavigationBar({
            title: 'myMap'
        });

        // 使用my.creatMapContext 获取map上下文
        this.mapCtx = my.createMapContext('myMap');
        this.getLocation();
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


})