import olop from '../template/onelineonepic/onelineonepic';
import jsonData from '../../data/data.js';

let app = getApp();
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
    imgUrls: jsonData.imgUrls,
    adPic: jsonData.adPic,
    currentLocation: {},// 当前定位坐标和地址名称
    onelineoneshop: jsonData.onelineoneshop, // 一行一商品
    navigateBar: jsonData.navigateBar, // 单行导航
    selectedCategory: '', //默认选中的导航是导航组件的第一个项目,
    toView: '',
    onelinetwoshop: jsonData.onelinetwoshop,
    previewShop: {},
    isPreviewHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    // 如果当期地址是地址页选择的，则会保存在全局变量中
    // 也就是如果全局变量中有值，则直接读取全局变量的值
    if (app.globalData.currentLocation != null) {
      // 直接使用全局变量的地址  
      self.setData({
        currentLocation: self.getAddressName(app.globalData.currentLocation)
      });

    } else {
      // 重新定位
      // 通过API获取经纬度
      wx.getLocation({
        success(res) {
          let lat = res.latitude;
          let lng = res.longitude;
          // 拼接百度api查询地址
          let queryUrl = `https://api.map.baidu.com/geocoder/v2/?location=${lat},${lng}&output=json&pois=0&ak=0almdQVSsD5RLH6cQuP8lBs4agSYYdsp`;
          // 调用百度api，根据经纬度获取地址信息
          wx.request({
            url: queryUrl,
            success(res) {
              // 把获取到的经纬度及地址名称放入data中
              self.setData({
                currentLocation: {
                  location: res.data.result.location,
                  name: res.data.result.formatted_address
                }
              });
            },
            fail(err) {
              console.log(err);
              wx.showToast({
                title: '失败',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
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
    if (app.globalData.currentLocation != null) {
      // 直接使用全局变量的地址  
      this.setData({
        currentLocation: this.getAddressName(app.globalData.currentLocation)
      });
    }
    this.setData({
      selectedCategory: this.data.navigateBar[0].id
    });
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
  },
  clickPic: olop.clickPic,
  getAddressName(origin) {
    if (origin.name.length > 15) {
      origin.name = origin.name.substring(0, 15) + "...";
      return origin;
    } else {
      return origin;
    }
  },
  addCart(event) {
    let shopId = event.currentTarget.dataset.id;
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1000
    });

    let orginCnt = wx.getStorageSync('cart:' + shopId);

    wx.setStorageSync('cart:' + shopId, (orginCnt ? orginCnt : 0) + 1);
  },
  selectCategory(event) {
    let categoryId = event.currentTarget.dataset.category;
    this.setData({
      selectedCategory: categoryId,
      toView: categoryId
    });
  },
  showDetail(event) {
    this.setData({
      previewShop: event.currentTarget.dataset.shopinfo,
      isPreviewHidden: false
    });
  },
  closeDetail() {
    this.setData({
      isPreviewHidden: true
    });
  }
})