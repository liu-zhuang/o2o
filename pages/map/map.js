let app = getApp();
// map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentAddress: wx.getStorageSync('currentAddress'),
    currentLocation: {},
    addressList: [],
    mapMakers: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let self = this;
    if (!this.data.currentAddress) {
      // 如果缓存中没有当前地址则重新获取
      wx.getLocation({
        success: function (res) {
          let lat = res.latitude;
          let lng = res.longitude;
          let queryUrl = `http://api.map.baidu.com/geocoder/v2/?location=${lat},${lng}&output=json&pois=0&ak=0almdQVSsD5RLH6cQuP8lBs4agSYYdsp`;
          self.setData({
            currentLocation: res,
            // mapMakers: [{ id: 1, latitude: res.latitude, longitude: res.longitude, title: '当前位置' }]
          });
          wx.request({
            url: queryUrl,
            success(res) {
              wx.setStorage({
                key: 'currentAddress',
                data: res.data.result
              });
            }
          })
        },
      })
    }
    self.setData({
      mapMakers: [{ id: 1, latitude: this.data.currentAddress.location.lat, longitude: this.data.currentAddress.location.lng, title: '当前位置' }]
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  searchAddress(event) {
    let self = this;
    let searchKey = event.detail.value;
    let searchUrl = `http://api.map.baidu.com/place/v2/search?q=${searchKey}&region=全国&output=json&ak=0almdQVSsD5RLH6cQuP8lBs4agSYYdsp`;
    wx.request({
      url: searchUrl,
      success: function (res) {
        self.setData({
          addressList: res.data.results
        });
      },
    })
  },
  selectAddress(event) {
    let selectedAddress = event.currentTarget.dataset.addressinfo;
    // 将选择的地址存入全局变量
    app.globalData.currentLocation = {
      name: selectedAddress.name,
      location: selectedAddress.location
    };
    
    wx.switchTab({
      url: '/pages/homepage/homepage',
    });
  }
})