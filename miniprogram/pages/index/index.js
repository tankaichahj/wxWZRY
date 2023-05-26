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
      },
      {
        icon: '../../images/index/ry.png',
        text: '往届比赛',
      },
      {
        icon: '../../images/index/dl.png',
        text: '大佬展示',
      },
      {
        icon: '../../images/index/hd.png',
        text: '活动中心',
      },
    ],
  },
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

});