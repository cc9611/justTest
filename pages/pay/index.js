// pages/cart/index.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncAddress.js"
Page({
  data: {
    address: {},
    cart: [],
    totalNum: 0,
    totalPrice: 0,
    allChecked: false
  },
  onShow() {
    /* 渲染购物车页面 */
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync('cart') || [];
    this.setCart(cart);
    this.setData({ address });
  },

  /* 获取收货地址 */
  async handleChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress == false) {
        await openSetting()
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error);
    }
  },

  /* 点击复选框，改变商品状态 */
  handleItemChange(e) {
    const goodsId = e.currentTarget.dataset.id;
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id == goodsId);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },

  /* 点击复选框的时候设置购物车的状态 */
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;
    wx.setStorageSync("cart", cart);
    this.setData({
      cart,
      totalNum,
      totalPrice,
      allChecked
    })
  },

  /* 全选复选框 */
  handleItemAllChecked() {
    let { allChecked, cart } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },


  /* 点击加减改变数量，商品删除 */
  async handleItemNumEdit(e) {
    const { id, operation } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex(v => v.goods_id == id);
    if (cart[index].num == 1 && operation == -1) {
      /* 删除商品 */
      const res = await showModal({ content: '是否删除商品' });
      if (res.confirm) {
        console.log('删除商品成功');
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },

  /* 商品结算按钮 */
  async handlePay() {
    const { address, totalNum } = this.data;
    if (!address.userName) {
      await showToast({ title: '请选择收货地址' });
      return
    }
    if (totalNum === 0) {
      await showToast({ title: '请选择商品' })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }

})