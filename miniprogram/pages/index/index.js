var util = require('../../utils/user');
var app = getApp();
Page({
  data: {
    loading: true, //加载动画
    swiperList: ['../../images/index/1.jpg', '../../images/index/2.jpg', '../../images/index/3.jpg', ], // 存放轮播图列表
    indicatorDots: true, //是否显示面板指示点
    vertical: false, //滑动方向是否为纵向
    autoplay: true, //是否自动切换
    interval: 2000, //自动切换时间间隔
    duration: 500, //滑动动画时长
    //buttons_1、buttons_2的图片要上传到云存储
    buttons_1: [{
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
    buttons_2: [{
        icon: '../../images/index/xc.png',
        text: '相册',
        url:'./photoAlbum/photoAlbum'
      },
      {
        icon: '../../images/index/ry.png',
        text: '往届比赛',
      },
      {
        icon: '../../images/index/dl.png',
        text: '大佬展示',
        url:'./mogul/mogul'
      },
      {
        icon: '../../images/index/hd.png',
        text: '活动中心',
      },
    ],
  },
  async onLoad(options) {


  },
  async initialization() {

    var op = await util.getUserOpenid()


    this.ck(op)

  },
  async ck(op) {
    if (!app.globalData.ck) {
      const ck = await util.getUserInformation(op)
      if (!ck) { //未注册，跳转注册页面
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
      await util.getUsersInfo('user')
      const userInfo = []
      for (let i = 1; i < app.globalData.users.length; i++) {
        userInfo.push(app.globalData.users[i].avatarFileID)
      }
      
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

        }
      }
    })
  },
  previewImage(e) {
    console.log(e)
    wx.previewImage({
      urls: [e.target.id],
      current: e.target.id
    })
  },
  navigate(e){
    const url =e.currentTarget.id
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
  onShow: function () {
    wx.setStorageSync('popupShown', false);
    this.initialization()
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