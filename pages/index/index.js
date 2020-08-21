/* 引入发送请求的方法 */
import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    catesList:[],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  getSwiperList(){
    /* 
    普通请求方法
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result)=>{
        this.setData({
          swiperList:result.data.message
        })
        console.log(result);
        
      },
      fail: ()=>{},s
      complete: ()=>{}
    }); */
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
  getCatesList(){
    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          catesList: result
        })
      })
  },
  getFloorList(){
    request({ url: '/home/floordata' })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  }
})