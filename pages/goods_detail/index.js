import {request} from '../../request/index.js';
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:[]
  },
  goodsInfo:{

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
  /* 请求商品详情接口 */
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:'/goods/detail',data:{goods_id}});
    this.goodsInfo = goodsObj;
    this.setData({
      goodsObj:{
        /* 优化处理数据 */
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce,
        // 利用正则表达式转换图片格式，解决iOS不能浏览的问题
        // goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'jpg'),
        pics: goodsObj.pics
      }
    })
  },
  /* 点击图片查看大图 */
  handlePreviewImage(e){
    // 获取url
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls
    })
  },
  /* 点击加入购物车
  1.绑定点击事件
  2，获取缓存中的购物车数据
  3，判断购物车有没有商品
  */
  handleCartAdd() {
    let cart = wx.getStorageSync('cart')||[];
    /* findIndex方法里面放 查找的方法，如果没有找到合适的 返回-1， 如果找到了返回当前元素在数组中的索引 */
    let index = cart.findIndex(v => v.goods_id===this.goodsInfo.goods_id);
    console.log(index);
    if (index == -1) {
      /* 购物车中不存在此商品 */
      this.goodsInfo.checked = true;
      this.goodsInfo.num = 1;
      cart.push(this.goodsInfo)
    } else {
      // 存在
      cart[index].num++;
    }
    /* 添加新的购物车缓存 */
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加购成功',
      icon: 'success',
      mask: true,
    })
  }
})