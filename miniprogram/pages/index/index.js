// pages/index/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true, //加载动画
    swiperList: [], // 存放轮播图列表
    buttons: [{
        icon: '../../images/index/bsbm.png',
        text: '比赛报名',
      },
      {
        icon: '../../images/index/zdfz.png',
        text: '战队分组',
      },
      {
        icon: '../../images/index/grxx.png',
        text: '个人信息',
      },
      {
        icon: '../../images/index/tczd.png',
        text: '退出战队',
      },
    ],
    imgUrls: [
      '../../images/index/1.jpg',
      '../../images/index/2.jpg',
      '../../images/index/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    duration: 1000,
    interval: 5000,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //轮播图下载，待修改
    

  },

  //检查数据库是否存在用户的openid
  //存在则取消加载动画；不存在则跳转注册页面
  checkOpenidExist(op) {
    wx.cloud.callFunction({
      name: 'getDatabaseUser',
      data: {
        jihe: 'user',
        action: 'query', // 操作类型为查询
        field: '_openid', // 要查询的字段
        value: op // 要查询的数据
      },
      success: (res) => {
        if (res.result.data.length === 1) {
          app.globalData.user = res.result.data[0]
          app.globalData.ck = true
          this.setData({
            loading: false
          })
        } else {
          this.showPopup()
        }

      },
      fail: err => {
        console.error(err);
      }
    })
  },

  //注册弹窗函数
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
            url: '../info/info',
          })
          this.setData({
            loading: false
          })
        }
      }
    })
  },
  //上传头像弹窗函数
  avatarShowPopup: function () {
    if (wx.getStorageSync('popupShownAvatar')) {
      return
    } else {
      wx.setStorageSync('popupShownAvatar', true)
    }
    wx.showModal({
      title: '提示',
      content: '你还未上传头像，请上传',
      complete: (res) => {
        if (res.cancel) {
          this.setData({
            loading: false
          })
        }

        if (res.confirm) {
          this.setData({
            loading: false
          })
          wx.navigateTo({
            url: '../upImage/upImage?cuttype=1',
            //头像宽高为200，cuttype=1表示上传的是头像
          })
        }
      }
    })
  },

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setStorageSync('popupShown', false);
    wx.setStorageSync('popupShownAvatar', false);
    if(app.globalData.ck){
      this.setData({
        loading:false
      })
    }
    if (app.globalData.ck && !app.globalData.user.avatar) { //头像未上传，提醒用户上传
      this.avatarShowPopup()
    }
    if (!app.globalData.ck) {
      if (!app.globalData.openid) {
        wx.cloud.callFunction({
          name: 'getOpenid',
          config: {
            env: 'wzry-7g7trrdib0f75ba2'
          },
          success: (res) => {
            app.globalData.openid = res.result.OPENID;
            this.checkOpenidExist(res.result.OPENID) // 传递 OPENID 参数
          }
        })
      } else {
        this.checkOpenidExist(app.globalData.openid)

      }
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

  },



})