// pages/edit/editAddAlbum/editAddAlbum.js

var util = require('../../../utils/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  buttonBind() {
    wx.showLoading({
      title: '创建中...',
      mask: true
    })
    const name =this.data.name
    if(name){
      const Album = {
        name: name,
        content:[],
        cover:{}
      }
      const set="Album"
      const b= util.insertData(set,Album)
      if(b){
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '创建成功',
          complete: (res) => {
            if (res.cancel) {
              wx.navigateBack()
            }
        
            if (res.confirm) {
              wx.navigateBack()
            }
          }
        })
      }else{
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '创建失败，请联系管理员',
          complete: (res) => {
            if (res.cancel) {
              wx.navigateBack()
            }
        
            if (res.confirm) {
              wx.navigateBack()
            }
          }
        })
      }
    }else{
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '请填写相册名称',
        complete: (res) => {
          if (res.cancel) {
            
          }
      
          if (res.confirm) {
            
          }
        }
      })
    }
    
  },
  ins: function (e) {
    const key = e.currentTarget.id
    const value = e.detail.value
    this.setData({
      [`${key}`]: value
    })

  },
  back(){
    wx.navigateBack()
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