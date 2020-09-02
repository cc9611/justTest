// pages/category/index.js
import {request} from '../../request/index.js';

Page({
  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },
  /* 存放接口数据 */
  Cates:[],
  
  onLoad: function (options) {
    /* 使用缓存技术
    1、先判断有没有缓存，有则使用，无则加载调用接口
    {time:Date.now(),data:[...]}
    2、有则使用，判断是否过期， 过期则加载 ，未过期则使用
    */
   /* 获取本地存储数据 */
    const Cates = wx.getStorageSync('cates');
    // 判断数据是否存在
    if (!Cates) {
      this.getCateList();
    } else {
      // 判断数据是否过期
      if (Date.now() - Cates.time > 1000*10) {
        this.getCateList();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  /* 获取商品分类接口 */
  async getCateList() {
    const res =  await request({ url: '/categories' });
      this.Cates=res;
      /* 设置本地存储 */
      const Cates = wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
      // 构造左侧大菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      // 构造右侧商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  /* 左侧边栏商品项目的点击事件 */
  handleItemTap(e) {
    /* 获取当前点击序号
      将序号赋给currentindex
    */
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    })
    console.log(index);
  }
})