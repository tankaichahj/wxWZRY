// pages/index/photoAlbum/photoAlbum.js
var app = getApp()
var util = require('../../../utils/user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '../../../images/TuPian/Album.png',
    needAlbum:false
  },
  bind(e) {
    const id = e.currentTarget.id

    wx.navigateTo({
      url: `./album/album?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      photoAlbums: app.globalData.photoAlbums,
      needAlbum:true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  async getAlbum() {
    const set = 'photoAlbums'
    const photoAlbums = await util.getUsersInfo(set)
    this.setData({
      photoAlbums: photoAlbums
    })
    app.globalData.photoAlbums = await photoAlbums

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let needAlbum=this.data.needAlbum
    if (needAlbum) {
      this.getAlbum()
    }

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
  onPullDownRefresh: function () {
    this.getAlbum()
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