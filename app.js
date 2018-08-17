App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    
    // 获取缓存token
    let token = my.getStorageSync({ key: 'authToken' })
    console.log(token, 14)
    if (token && token.data!= undefined) {
      console.log(token,16)
      my.httpRequest({
        url: 'http://test.yoodex.net/zfb/member/getUserInfo', // 获取用户信息
        data: token,
        method: 'POST',
        success: (res) => {
          console.log(res, res.data.userId, 52)
        }
      })
      this.getUserInfo()
    }else{
        my.getAuthCode({
          scopes: 'auth_user',
          success: (authcode) => {
            console.log(authcode,74)
            const {authCode} = authcode;
            my.alert({
              content: authcode.authCode
            })
            let _params = Object.assign({ authCode: authCode });
            my.httpRequest({
              url: 'http://test.yoodex.net/zfb/member/getAuthToken', // 获取token
              data: _params,
              method: 'POST',
              success: (res) => {
                console.log(res,res.data, 79)
                 let authToken = Object.assign({
                  authToken: res.data
                })
                
                my.setStorageSync({
                  key:'authToken',
                  data: res.data
                })
                // this.getUserInfo()
                my.httpRequest({
                  url: 'http://test.yoodex.net/zfb/member/getUserInfo', // 获取用户信息
                  data: authToken,
                  method: 'POST',
                  success: (res) => {
                    console.log(res, res.data.userId,56)
                  }
                })
              }
            })
          }
        })
      }
  },
  
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },

  getUserInfo(cb){
    let token = my.getStorageSync({ key: 'authToken' })
    let data = token.data
    let authToken = Object.assign({ authToken: data });
    my.httpRequest({
        url: 'http://test.yoodex.net/zfb/member/getUserInfo', // 获取用户信息
        data: authToken,
        method: 'POST',
        success: (res) => {
          console.log(res, res.data.userId, 52)
        }
      })
  },
  globalData:{
    userInfo: null
  }
});
