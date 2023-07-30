// pages/index/photoAlbum/photoAlbum.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoAlbums: [{
        cover: '../../../images/index/1.jpg',
        name: "人物",
        content:['https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/夏满2023072620295700.jpg','https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/夏满2023072620295700.jpg','https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/夏满2023072620295700.jpg','https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/夏满2023072620295700.jpg','https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/夏满2023072620295700.jpg','https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/夏满2023072620295700.jpg','https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/夏满2023072620295700.jpg']
      },
      {
        cover: '../../../images/index/2.jpg',
        name: "人物",
        content:[]
      },
      {
        cover: '../../../images/index/3.jpg',
        name: "人物",
        content:[]
      }
    ]
  },
  bind(e){
    const id = e.currentTarget.id 
    
    wx.navigateTo({
      url: `./album/album?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    app.globalData.photoAlbums=this.data.photoAlbums
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