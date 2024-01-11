// pages/edit/editPhotoAlbum/editAlbum/editAlbum.js
var app =getApp()

var util = require('../../../../utils/user')
var i = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editAlbum:'编辑照片',
    circle_flag: false,
    inner_circle_flag: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var photoAlbum = app.globalData.photoAlbums[options.id]
    this.setData({
      photoAlbum: photoAlbum,
      id: options.id
    })
  },
  addPhoto(e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: `../../../index/photoAlbum/album/addAlbum/addAlbum?id=${id}`,
    })
  },
  editAlbum(){
    const circle_flag = this.data.circle_flag

    this.setData({
      circle_flag: !circle_flag
    })

    if (circle_flag) {
      const inner_circle_flag = this.data.inner_circle_flag
      inner_circle_flag.splice(0, inner_circle_flag.length)
      this.setData({
        inner_circle_flag: inner_circle_flag,
        editPhoto: '编辑'
      })
    } else {
      this.setData({
        editPhoto: '完成'
      })
    }
  },
  async getAlbum() {
    const set = 'photoAlbums'
    const photoAlbums = await util.getUsersInfo(set)
    this.setData({
      photoAlbum: photoAlbums[this.data.id]
    })
    app.globalData.photoAlbums = await photoAlbums

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