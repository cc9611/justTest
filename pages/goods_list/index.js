// pages/goods_list/index.js
/* 引入发送请求的方法 */
import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    goodsList:[]
  },
  QueryParams: {
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  /* 获取商品列表数据 */
  async getGoodsList() {
    const res = await request({url:'/goods/search',data:this.QueryParams});
    // 获取总条数
    const total = res.total;
    this.totalPages = Math.ceil(total/this.QueryParams.pagenum);
    this.setData({
      goodsList: [...this.data.goodsList,...res.goods]
    });
    /* 请求完成后关闭下拉 */
    wx.stopPullDownRefresh()
  },
  /* 遍历tabs 添加当前点击 */
  handleTabsItemChange(e) {
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => index === i?v.isActive=true:v.isActive=false); 
    this.setData({
      tabs
    })
  },
  onReachBottom(){
    if (this.QueryParams.pagenum>=this.totalPages) {
      //没有下一页数据
      wx.showToast(
        {
          title:'我也是有底线的ヾ|≧_≦|〃'
        }
      )
    } else {
      //还有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodsList:0,
    });
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  }
})