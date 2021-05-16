import { request } from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧菜单数据
    rightContent:[],
    //被点击的左侧菜单
    currentIndex:0,
    //右侧内容滚动条距离
    scrollTop
  },
  // 接口返回的数据
  Cates:[],
  
  onLoad: function (options) {
  // 1先判断一下本地存储中有没有旧的数据
  // {item:Date.new().fata:[...]}
  // 2没有旧数据直接发送新请求
  // 3有旧的数据同时旧的数据也没有过期就使用本地存储中的旧数据即可
    const Cates=wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      if(Date.new()-Cates.time>1000*10){
        this.getCates();
      }else{
        this.Cates=Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
        leftMenuList,
        rightContent
      })
      }
    }
  },
  // 获取分类数据
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(res=>{
      
    // })

    const {res} = await request({url:"/categories"});
    this.Cates = res.data.message;
      //把接口数据存储到接口中
      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
      // 构造左侧的大菜单数据
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      // 构造右侧的大菜单数据
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  //左侧菜单点击事件
  handleItemTab(e){
    const {index} = e.currentTarget.dataset;

  //   this.setData({
  //     leftMenuList,
  // })
    let rightContent=this.Cates[index].children;
    //重新设置右侧内容的scroll-view标签的距离顶部的距离
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop: 0
    })
  }
})