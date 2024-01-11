// pages/personal/install/install.js
var tools = require('../../../utils/tools')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin: false
  },
  goToAccount() {
    wx.navigateTo({
      url: './account/account',
    })
  },
  goToProfile() {
    wx.navigateTo({
      url: './profile/profile',
    })
  },
  goToBug() {
    wx.navigateTo({
      url: './bug/bug',
    })
  },
  goBack() {
    wx.navigateBack()
  },
  goManage() {
wx.navigateTo({
  url: '../../edit/edit',
})
  },
  async getAdmin() {
    const op = app.globalData.openid
    const admin = await tools.getAdminInfo(op)
    this.setData({
      admin: await admin
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getAdmin()
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

  }
})