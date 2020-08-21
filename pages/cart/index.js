// pages/cart/index.js
import { getSetting, chooseAddress, openSetting } from "../../utils/asyncAddress.js"
Page({
  data:{
    address:{}
  },
  onShow(){
    const address = wx.getStorageSync("address");
    this.setData({
      address
    })
  },

  /* 获取收货地址 */
  async handleChooseAddress(){
    // wx.getSetting({
    //   success: (result)=>{
    //     const scopeAddress = result.authSetting["scope.address"]
    //     if (scopeAddress === true || scopeAddress===undefined) {
    //       wx.chooseAddress({
    //         success: (result1)=>{
    //           console.log(result1);
    //         }
    //       })
    //     } else {
    //       wx.openSetting({
    //         success: (result2)=>{
    //           wx.chooseAddress({
    //             success: (result3)=>{
    //               console.log(result3);
    //             }
    //           })
    //         }
    //       });
    //     }
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress == false) {
        await openSetting()
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      console.log(address);
      wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error);
    }

  }
})