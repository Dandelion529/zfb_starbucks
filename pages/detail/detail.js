// 获取应用实例
const app = getApp();

Page({

  data: {
    image1: '/images/detail_photo1.png',
    image2: '/images/detail_photo2.png',
    image3: '/images/detail_photo3.png',
    image4: '/images/detail_photo4.png',
    image5: '/images/detail_photo5.png',
    image6: '/images/detail_photo6.png',

    hasList: false,
    totalPrice: 0,
    totalNum: 0,

    carts: [
      { id: 1, title: '当季特饮', num: 0, price: 39, selected: true },
      { id: 2, title: '抹茶星冰乐', num: 0, price: 34, selected: true },
      { id: 3, title: '冷萃冰咖啡', num: 0, price: 36, selected: true },
      { id: 4, title: '拿铁', num: 0, price: 31, selected: true },
      { id: 5, title: '焦糖玛奇朵', num: 0, price: 35, selected: true },
      { id: 6, title: '轻甜冷萃', num: 0, price: 39, selected: true },
      { id: 7, title: '摩卡', num: 0, price: 34, selected: true },
      { id: 8, title: '馥芮白', num: 0, price: 36, selected: true },
      { id: 9, title: '卡布奇诺', num: 0, price: 31, selected: true },
      { id: 10, title: '星礼卡', num: 0, price: 100, selected: true },
      { id: 11, title: '星礼卡', num: 0, price: 50, selected: true },
      { id: 12, title: '高度券', num: 0, price: 3, selected: true },
      { id: 13, title: '深度券', num: 0, price: 4, selected: true },
    ],
  },

  onLoad(query) {
    // 页面加载
    this.setData({
      poster: '/images/detail_poster1.png',
    })
  },

  btn_change1: function () {
    this.setData({
      poster: '/images/detail_poster1.png',
      image1: '/images/detail_photo1_active.png',
      image2: '/images/detail_photo2.png',
      image3: '/images/detail_photo3.png',
      image4: '/images/detail_photo4.png',
      image5: '/images/detail_photo5.png',
      image6: '/images/detail_photo6.png',
    })
  },
  btn_change2: function () {
    this.setData({
      poster: '/images/detail_poster2.png',
      image1: '/images/detail_photo1.png',
      image2: '/images/detail_photo2_active.png',
      image3: '/images/detail_photo3.png',
      image4: '/images/detail_photo4.png',
      image5: '/images/detail_photo5.png',
      image6: '/images/detail_photo6.png',
    })
  },
  btn_change3: function () {
    this.setData({
      poster: '/images/detail_poster3.png',
      image1: '/images/detail_photo1.png',
      image2: '/images/detail_photo2.png',
      image3: '/images/detail_photo3_active.png',
      image4: '/images/detail_photo4.png',
      image5: '/images/detail_photo5.png',
      image6: '/images/detail_photo6.png',
    })
  },
  btn_change4: function () {
    this.setData({
      poster: '/images/detail_poster4.png',
      image1: '/images/detail_photo1.png',
      image2: '/images/detail_photo2.png',
      image3: '/images/detail_photo3.png',
      image4: '/images/detail_photo4_active.png',
      image5: '/images/detail_photo5.png',
      image6: '/images/detail_photo6.png',
    })
  },
  btn_change5: function () {
    this.setData({
      poster: '/images/detail_poster5.png',
      image1: '/images/detail_photo1.png',
      image2: '/images/detail_photo2.png',
      image3: '/images/detail_photo3.png',
      image4: '/images/detail_photo4.png',
      image5: '/images/detail_photo5_active.png',
      image6: '/images/detail_photo6.png',
    })
  },
  btn_change6: function () {
    this.setData({
      poster: '/images/detail_poster6.png',
      image1: '/images/detail_photo1.png',
      image2: '/images/detail_photo2.png',
      image3: '/images/detail_photo3.png',
      image4: '/images/detail_photo4.png',
      image5: '/images/detail_photo5.png',
      image6: '/images/detail_photo6_active.png',
    })
  },

  onReady(){
   my.setNavigationBar({
     title: '@all 我想对你们说'
   }); 
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow(){
    this.setData({
      hasList: true
    })
  },

  // 价格
  getTotalPrice() {
    let carts = this.data.carts;
    let total = 0;
    for(let i = 0; i < carts.length; i ++) {
      if(carts[i].selected) {
        total += carts[i].num * carts[i].price;
      }
    }

    this.setData({
      carts: carts,
      totalPrice: total.toFixed(2)
    })
  },

  // 数量
  getTotalNum() {
    let carts = this.data.carts;
    let total = 0;
    for(let i = 0; i < carts.length; i++){
      if(carts[i].selected){
        total += carts[i].num
      }
    }
    this.setData({
      carts: carts,
      totalNum: total
    })
  },

  // 增加
  addCount(e){
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      catrs: carts
    })

    this.getTotalNum();
    this.getTotalPrice();
  },

  // 减少
  minusCount(e){
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num <= 0) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    })
    
    this.getTotalNum();
    this.getTotalPrice();
  },
  
  getPay(){
    console.log('pay')
      let totalAmount = Object.assign({ totalAmount: '0.01' });
      console.log(totalAmount,191)
      my.httpRequest({
        url: 'http://test.yoodex.net/zfb/member/getOrderStr', // 目标服务器url
        method: 'POST',
        data: totalAmount,
        success: (res) => {
          console.log(res,res.data,192)
          my.tradePay({
            orderStr: res.data, // 完整的支付参数拼接成的字符串，从服务端获取
            success: (res) => {
              console.log(res,200)
            },
            fail:(res)=>{
              console.log(res,207)
            }
          });
        },
        fail:(res)=>{
          console.log(res,213)
        }
      });
  },

  // 支付
  // pay(){
  //   my.tradePay({
  //     orderStr: 'myOrderStr', // 完整的支付参数拼接成的字符串，从服务端获取
  //     success: (res) => {
  //       console.log(res,res.resultCode,192)
  //       my.alert({
  //         content: JSON.stringify(res)
  //       });
  //     },
  //     fail:(res)=>{
  //        my.alert({
  //         content: JSON.stringify(res)
  //       });
  //     }
  //   });
  // },
});
