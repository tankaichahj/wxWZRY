// pages/index/mogul/detailedInformation/detailedInformation.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  previewImage(e) {
    if (e.target.id) {
      const url =e.target.id
      const information = this.data.information
      for (let i = 0; i < information.box.length; i++) {
        for (let j = 0; j < information.box[i].image.length; j++) {
          if (information.box[i].image[j] == e.target.id) {
            var urls = information.box[i].image
          }
        }
      }
    }else{
      var urls = [e.mark.id]
      var url =e.mark.id
    }
    wx.previewImage({
      urls: urls,
      current: url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var information = app.globalData.moguls[options.id].information
    console.log(app.globalData.moguls)
    this.setData({
      information: information
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