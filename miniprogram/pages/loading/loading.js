// pages/loading/loading.js
var tools = require('../../utils/tools');
var util = require('../../utils/user');
var load = require('../../utils/load');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const updateManager = wx.getUpdateManager()
    const that = this
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        showUpdateModal() // 如果有新版本，则弹出更新提示框
      } else {
        wx.setStorageSync('popupShown', false);
        that.initialization()
      }
    })
    function showUpdateModal() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate() // 用户确认更新后，应用新版本并重启
          }
        }
      })
    }

  },
  async getAdminInfo() {
    const op = app.globalData.openid
    await tools.getAdminInfo(op)
  },

  async initialization() {

    var op = await util.getUserOpenid()
    this.ck(op)
  },
  async ck(op) {
    app.globalData.ck = await util.getUserInformation(op)
    if (!app.globalData.ck) {
      if (!app.globalData.ck) { //未注册，跳转注册页面
        this.showPopup()
      }
    } else { //注册过，加载战队信息
      let set = ['users', 'admin_info', 'moguls', 'photoAlbums','teams']
      await load.downloadDataSet(set).then(()=>{
        wx.switchTab({
          url: '../index/index',
        })
      })

      
    }
  },
  showPopup: function () {

    // 检查标志位是否已设置为 true
    if (wx.getStorageSync('popupShown')) {
      return;
    } else {
      wx.setStorageSync('popupShown', true)
    }
    // 如果标志位为 false，执行弹窗代码
    wx.showModal({
      title: '提示',
      content: '您还未注册，请先注册',
      confirmText: '注册',
      complete: (res) => {
        console.log(res)
        //取消则退出小程序
        if (res.cancel) {
          wx.exitMiniProgram()
        }
        //确定则跳转注册页面
        if (res.confirm) {
          wx.navigateTo({
            url: '../userPrivacyAgreement/userPrivacyAgreement',
          })

        }
      }
    })
  },
  previewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: this.data.swiperList,
      current: e.target.id
    })
  },
  navigate(e) {
    const url = e.currentTarget.id
    wx.navigateTo({
      url: url,
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