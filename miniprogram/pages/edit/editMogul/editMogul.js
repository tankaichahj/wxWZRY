// pages/index/mogul/mogul.js
var app = getApp()

var util = require('../../../utils/user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    administrators:true,
    moguls:[],
    needMoguls:false,
    editMogul:'编辑',
    circle_flag: false,
    inner_circle_flag: []
  },
  editMogul() {
    const circle_flag = this.data.circle_flag

    this.setData({
      circle_flag: !circle_flag
    })

    if (circle_flag) {
      const inner_circle_flag = this.data.inner_circle_flag
      inner_circle_flag.splice(0, inner_circle_flag.length)
      this.setData({
        inner_circle_flag: inner_circle_flag,
        editMogul: '编辑'
      })
    } else {
      this.setData({
        editMogul: '完成'
      })
    }
  },
  bind(e) {
    const id = e.currentTarget.id 
    if(!this.data.circle_flag){
      wx.navigateTo({
        url: `./detailedInformation/detailedInformation?id=${id}`,
      })
    }else{
      const inner_circle_flag = this.data.inner_circle_flag
      if (inner_circle_flag[id] == true) {
        inner_circle_flag[id] = false
        this.setData({
          inner_circle_flag: inner_circle_flag
        })
      } else {
        inner_circle_flag[id] = true
        this.setData({
          inner_circle_flag: inner_circle_flag
        })
      }
    }
    

  },
  buttonBind(){
    wx.navigateTo({
      url: '../../edit/editAddMogul/editAddMogul',
    })
  },
  /**
   * 获取大佬信息
   * 
   */
  async getMoguls(){
    const set = 'moguls'
    const moguls = await util.getUsersInfo(set)
    this.setData({
      moguls:moguls
    })
    app.globalData.moguls = await moguls
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.moguls)
    this.setData({
      moguls: app.globalData.moguls,
      needMoguls:true
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
    let needMoguls=this.data.needMoguls
    if (needMoguls) {
      this.getMoguls()
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