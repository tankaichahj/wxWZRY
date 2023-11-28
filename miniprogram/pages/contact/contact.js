// pages/contact/contact.js
var app = getApp();
var util = require('../../utils/user');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPopup:false,
    user:{}
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
  previewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: [e.target.id],
      current: e.target.id
    })
  },
  async getUsers() {
    const users = await util.getUsersInfo('user')
    if (this.data.users != await users) {
      this.setData({
        users: users
      })
      app.globalData.users = users
    } else if (!this.data.users) {
      this.setData({
        users: users
      })
    }

  },
  showDetail(e){
    const user=e.mark.id
    this.setData({
      showPopup:!this.data.showPopup,
      user:user
    })
    console.log(e)
  },
  hideDetail(){
    this.setData({
      showPopup:!this.data.showPopup
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
 onShow() {

  this.setData({
    showPopup:false
  })
    this.getUsers()
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