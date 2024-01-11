var tools = require('../../utils/tools');
var util = require('../../utils/user');
var load = require('../../utils/load');
var app = getApp();
Page({
  data: {
    showPrivacy: true,
    swiperList: ["https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/许天意2023072812382000.jpg", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/夏满2023072620295700.jpg", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/夏满2023072620295701.jpg"], // 存放轮播图列表
    indicatorDots: true, //是否显示面板指示点
    vertical: false, //滑动方向是否为纵向
    autoplay: true, //是否自动切换
    interval: 2000, //自动切换时间间隔
    duration: 500, //滑动动画时长
    showPop: true,
    //buttons_1、buttons_2的图片要上传到云存储
    buttons_1: [{
        icon: '../../images/index/bsbm.png',
        text: '比赛报名',
        url:false
      },
      {
        icon: '../../images/index/zdfz.png',
        text: '战队分组',
        url:false
      },
      {
        icon: '../../images/index/grxx.png',
        text: '个人信息',
        url:'../personal/personal'
      },
      {
        icon: '../../images/index/tczd.png',
        text: '退出战队',
        url:'退出'
      },
    ],
    buttons_2: [{
        icon: '../../images/index/xc.png',
        text: '相册',
        url: './photoAlbum/photoAlbum'
      },
      {
        icon: '../../images/index/ry.png',
        text: '战队内战',
        url: './civilWar/civilWar'
      },
      {
        icon: '../../images/index/dl.png',
        text: '大佬展示',
        url: './mogul/mogul'
      },
      {
        icon: '../../images/index/hd.png',
        text: '活动中心',
        url: './activities/activities'
      },
    ],
  },
  async onLoad(options) {
    this.setData({
      user:app.globalData.user
    })


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
      } else {
        this.setData({ //加载动画取消
          loading: false,
          user: app.globalData.user
        })
      }
    } else { //注册过，加载战队信息
      this.setData({ //更新页面用户个人数据、加载动画取消
        loading: false,
        user: app.globalData.user
      })
      //预加载战队所有人员信息
      if (!app.globalData.users) {
        const users = await util.getUsersInfo('users')
        app.globalData.users = users
      }
      //加载管理员身份信息
      this.getAdminInfo()
      //加载轮播图
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
        // console.log(res)
        //取消则退出小程序
        if (res.cancel) {
          wx.exitMiniProgram()
        }
        //确定则跳转注册页面
        if (res.confirm) {
          wx.navigateTo({
            url: '../info/info',
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
    console.log(e.currentTarget)
    if(url !='false'){
      console.log(url)
      if(url=='../personal/personal'){
        wx.switchTab({
          url: '../personal/personal',
        })
      }else if(url=='退出'){
        wx.showModal({
          title: '提示',
          content: '是否退出小程序',
          complete: (res) => {
            
            if (res.confirm) {
              wx.exitMiniProgram()
            }
          }
        })
        
      }else{
        wx.navigateTo({
          url: url,
        })
      }
    }else{
      console.log(url)
      wx.showModal({
        title: '提示',
        content: '还未开放',
        
      })
    }
    

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res)
      if (res.hasUpdate) {
        showUpdateModal() // 如果有新版本，则弹出更新提示框
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

});