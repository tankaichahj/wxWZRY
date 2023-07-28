const WeCropper = require('../../../we_cropper/we-cropper')

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const system = device.system;
let height = device.windowHeight/1.4



Page({

  /**
   * 页面的初始数据
   */
  data: {
    rotateI: 0, //旋转默认角度
    cropperOpt: {//头像
      id: 'cropper',
      rotateI: 0,//旋转默认角度
      tranlateX: width / 2,    //定义canvas 的原点
      tranlateY: height / 2,  //定义canvas 的原点
      width,  // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数,
      cut: {
        x: (width-300) / 2,  // 裁剪框的坐标
        y: (height - (width / 1.4)) / 2, // 裁剪框的坐标
        width: 300, //裁剪框的大小
        height: 400
      }
    },
    
    chooseImg: false,
    imgSrc: '',
    marTop: 40
  },


  onLoad: function (options) {
    this.setData({
      cuttype:options.cuttype
    })
    const self = this;
    //兼容可不写
    const system = device.system;
    if (system.indexOf('iOS') != -1) {
      this.setData({
        ios: true
      })
    };
    if (system.indexOf('iOS') != -1) {
      this.setData({
        marTop: 45
      })
    } else {
      this.setData({
        marTop: 45
      })
    };
    if (device.model.indexOf("iPhone X") != -1) {
      this.setData({
        height: wx.getStorageSync('height') * 2 + 50,
        marTop: 80
      })
    };
    // 判断来自哪个图片的裁剪  身份证、荣誉证书、营业证书等
    this.setData({
      cuttype: options.cuttype
    })
    //裁剪 插件配置
    
    const { cropperOpt } = this.data;
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        self.wecropper.updateCanvas(this.data.rotateI)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
    this.chooseImg()

  },

 

  chooseImg() {
    const self = this;
    wx.chooseMedia({
      count: 1,
      sizeType: ['compressed'],
      mediaType: ['image'],
      sourceType: ['album'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        const src =res.tempFiles[0].tempFilePath
        console.log(res)
        if (src) {
        // 将图片参数传递给插件
          self.wecropper.pushOrign(src)
          self.setData({
            chooseImg: true,
            imgSrc: src,
            rotateI: 0
          })
        };
        wx.hideToast()
      },
      fail(res) {
        wx.hideToast();
        wx.navigateBack()
      }
    })
  },

  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  // 获取裁剪后的图片
  getCropperImage() {
    let that = this;
    if (this.data.chooseImg) {
      this.wecropper.getCropperImage((src) => {
        //获取上个页面的参数
        let pages = getCurrentPages();
        //prevPage 相当于上个页面的this，可以通过setData修改上个页面参数执行上个页面的方法等
        let prevPage = pages[pages.length - 2]
        if (src) {
          //下面是上传照片，根据上传页面给过来的值，判断上传什么照片（头像、战绩、自拍等等），需要修改
          // 头像
          prevPage.setData({
            imageSrc: src,
            cuttype: this.data.cuttype
          })
         
          wx.navigateBack()
        } else {
          wx.hideToast()
          wx.showToast({
            title: '获取图片地址失败，请稍后再试！',
          })
        }
      })
    } else {
      wx.showToast({
        title: '您还没选择图片！',
        icon: 'none'
      })
    }
  },
  cancleCropper() {
    wx.hideToast()
    wx.navigateBack()
  },

  // 图片旋转
  // rotateImg() {
  //   const self = this;
  //   let rotateI = this.data.rotateI + 1;
  //   this.setData({
  //     rotateI: rotateI
  //   })
  //   // 将旋转的角度传递给插件
  //   self.wecropper.updateCanvas(rotateI)
  // }
})