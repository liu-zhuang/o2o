//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    logo:'http://static01.yiguo.com/www/images/header/logo.png',
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
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
    }
  },
  enterHomepage() {
    wx.navigateTo({
      url: '/pages/homepage/homepage',
    })
  },
})
