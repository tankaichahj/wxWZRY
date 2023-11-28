// pages/index/photoAlbum/album/album.js
var app = getApp()
var util = require('../../../../utils/user')
var i = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoAlbum: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  previewImage(e) {
    const url = e.target.id
    const urls = this.data.photoAlbum.content
    const Urls = []
    for (let i = 0; i < urls.length;i++) {
      Urls.push(urls[i].imageHttps)
    }

    wx.previewImage({
      urls: Urls,
      current: url
    })
  },
  addPhoto(e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: `./addAlbum/addAlbum?id=${id}`,
    })
  },
  async getAlbum() {
    const set = 'Album'
    const photoAlbums = await util.getUsersInfo(set)
    this.setData({
      photoAlbum: photoAlbums[this.data.id]
    })
    app.globalData.photoAlbums = await photoAlbums
    console.log(photoAlbums, this.data.id)

  },
  onLoad(options) {
    var photoAlbum = app.globalData.photoAlbums[options.id]

    this.setData({
      photoAlbum: photoAlbum,
      id: options.id
    })
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
    if (i > 0) {
      this.getAlbum()
    }
    console.log(i)
    i++
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