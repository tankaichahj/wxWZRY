// pages/index/photoAlbum/album/album.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoAlbum:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  previewImage(e){
    const url = e.target.id
    const urls =this.data.photoAlbum
    
    wx.previewImage({
      urls: urls.content,
      current: url
    })
  },
  onLoad(options) {
    var photoAlbum = app.globalData.photoAlbums[options.id]
    this.setData({
      photoAlbum: photoAlbum
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