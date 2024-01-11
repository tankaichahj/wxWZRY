// pages/index/civilWar/civilWar.js
var util = require('../../../utils/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async a() {
    let op =await util.getUserOpenid()
    this.setData({
      openid: op
    })
  },
  async b() {
    let user =await util.getUserFiled('users','_openid',this.data.openid)
    this.setData({
      user: user.result.data[0]
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