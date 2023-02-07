// pages/index/index.js
var app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cookid: true,
    buttons: [{
        icon: '../../images/index/bsbm.png',
        text: '比赛报名',
      },
      {
        icon: '../../images/index/zdfz.png',
        text: '战队分组',
      },
      {
        icon: '../../images/index/grxx.png',
        text: '个人信息',
      },
      {
        icon: '../../images/index/tczd.png',
        text: '退出战队',
      },
    ],
    imgUrls: [
      '../../images/index/1.jpg',
      '../../images/index/2.jpg',
      '../../images/index/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    duration: 1000,
    interval: 5000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    setTimeout(() => {
      const cd = wx.getStorageSync('cookid')
      if (cd) {
        wx.showModal({
          title: '提示',
          content: '您还未注册，请先注册',
          confirmText: '注册',
          complete: (res) => {
            console.log(res)
            if (res.cancel) {
              wx.exitMiniProgram()
            }
            if (res.confirm) {
              wx.navigateTo({
                url: '../info/info'
              })
            }
          }
        })
      }
    }, 1200);
  },

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },


})