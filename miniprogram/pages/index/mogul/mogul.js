// pages/index/mogul/mogul.js
// var app = getApp()
// var util = require('../../utils/user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moguls: [{
      image: 'http://static.runoob.com/images/demo/demo2.jpg',
      text: "姓名",
      openid:1,
      Information:{
        name:"",//姓名
        sex:"",//性别
        grade:"",//年级
        speciality:"",//专业
        college:"",//学院
        honor:[],//荣誉
        image:[],//图片
        text:[],//文本
      }
    }]
  },
  bind(e) {
console.log(e.currentTarget.id)
wx.navigateTo({
  url: './detailedInformation/detailedInformation',
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