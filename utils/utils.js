import page from './page.js'
const api = require('../common/api.js');
// 封装支付宝小程序请求
export default {
	apiRequest(method, url, params, header = {}, defaultLoading = true){
		return new Promise((resolve, reject) => {
			if (defaultLoading) {
		      	my.showLoading({
		        	title: 'loading',
		        	mask:true,
		     	});
		    }
			my.httpRequest({
				url:url,
				method: method,
				data: params,
				header: {
					'authToken': my.getStorageSync('authToken'),
				},
				success: res =>{
					console.log(res,21)
					my.hideLoading()
					// 判断返回的code状态
				},
				fail:({data}) =>{
					console.log(data,26)
					my.hideLoading()
					my.alert({
						title: '错误提示',
						content: data.msg + '' + data.status,
						buttonText: '我知道了',
						success: ()=>{

						}
					})
				},
			})
		})
	},

	get(url, params = {}, header = {}) {
      return this.apiRequest('GET', url, params, header)
    },

    post(url, params = {}, header = {}) {
      return this.apiRequest('POST', url, params, header)
    },

    put(url, params = {}, header = {}) {
      return this.apiRequest('PUT', url, params, header)
    },

    delete(url, params = {}, header = {}) {
      return this.apiRequest('DELETE', url, params, header)
    },

    // 毫秒转换成时分秒
    formatDuring (mss) {
      // var days = parseInt(mss / (1000 * 60 * 60 * 24));
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = parseInt((mss % (1000 * 60)) / 1000);
      // return days + " : " + hours + " : " + minutes + " : " + seconds;
      return  (hours < 10 ? '0' + hours : hours) + " : " + (minutes < 10 ? '0' + minutes : minutes) + " : " + (seconds < 10 ? '0' + seconds : seconds);
    },

    // 时间戳转换时间
    formatDate (date, fmt) {
      if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
      };
      for (let k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
              let str = o[k] + '';
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
          }
      }
      return fmt;
    },

    // 不足10，前加零
    padLeftZero (str) {
      return ('00' + str).substr(str.length);
    },

    // 金额默认以分为单位，若为整数后面自动补零
    // str 分单位金额
    fotmatMoney(str) {
      let _money = (str/100).toFixed(2)
      return _money
    },
    
    // 小时转换毫秒
    // 1时(h)=3600000毫秒(ms)
    // 1分(min)=60000毫秒(ms)
    // 1秒(s)=1000毫秒(ms)
    formatMs(time) {
      return time * 3600000
    }
}