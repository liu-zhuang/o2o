// homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [
      'http://img11.yiguoimg.com/e/items/2017/170623/9288709448606423_1000x647.jpg',
      'http://img12.yiguoimg.com/e/items/2017/170619/9288709276476115_1000x500.jpg',
      'http://img14.yiguoimg.com/e/items/2017/170630/9288709729264350_1000x500.jpg',

    ],
    adPic: 'http://img09.yiguoimg.com/e/items/2017/170626/9288709536031450_1000x500.jpg',
    currentAddress: wx.getStorageSync('currentAddress'),

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    if (!this.data.currentAddress) {
      wx.getLocation({
        success: function (res) {
          let lat = res.latitude;
          let lng = res.longitude;
          let queryUrl = `http://api.map.baidu.com/geocoder/v2/?location=${lat},${lng}&output=json&pois=0&ak=0almdQVSsD5RLH6cQuP8lBs4agSYYdsp`;
          self.setData({
            currentLocation: res,
            mapMakers: [{ id: 1, latitude: res.latitude, longitude: res.longitude, title: '当前位置' }]
          });
          wx.request({
            url: queryUrl,
            success(res) {
              wx.setStorage({
                key: 'currentAddress',
                data: {
                  name: res.data.result.formatted_address,
                  location: res.data.result.location
                }
              });
              self.setData({
                currentAddress: wx.getStorageSync('currentAddress')
              });
            }
          })
        },
      });
    } else {
      self.setData({
        currentAddress: wx.getStorageSync('currentAddress')
      });
    }

    console.log(this.data.currentAddress);
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
  pickAddress() {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  }
})