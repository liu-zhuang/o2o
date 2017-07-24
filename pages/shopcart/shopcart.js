// shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shipToAddress: ''
  },
  onLoad() {
    let currentAddress = wx.getStorageSync('currentAddress');
    this.setData({
      shipToAddress: currentAddress
    });
  }

})