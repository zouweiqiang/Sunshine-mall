//Page Object
import { request } from "../../request/index"
Page({
  data: {
    //轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    //楼层数据
    floorList: []
  },
  //页面加载就会触发
  onLoad: function(options){
    //异步请求
    //promise解决回调地狱
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  // 获取轮播图数据
  getSwiperList(){
    request ({url: "/home/swiperdata"})
    .then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  // 获取分类导航数据
  getCateList(){
    request ({url: "/home/catitems"})
    .then(result => {
      this.setData({
        catesList: result.data.message
      })
    })
  },
  //获取楼层数据
  getFloorList(){
    request ({url: "/home/floordata"})
    .then(result => {
      this.setData({
        floorList: result.data.message
      })
    })
  },
});
