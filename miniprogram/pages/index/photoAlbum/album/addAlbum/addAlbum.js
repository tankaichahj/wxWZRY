// pages/index/photoAlbum/album/addAlbum/addAlbum.js
var app = getApp()
var util = require('../../../../../utils/user');
var tools = require('../../../../../utils/tools');
var time = tools.stringStripSymbol(tools.formatTime(new Date()))

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [], //待上传的图片
    photoAlbum: [], //原相册
    percent: false
  },
  addImage() {
    console.log(1)
    const that = this
    const images = this.data.images

    wx.chooseMedia({
      count: 10,
      mediaType: ['image'],
      sourceType: ['album'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        for (let i = 0; i < res.tempFiles.length; i++) {
          images.push(res.tempFiles[i].tempFilePath)
        }
        that.setData({
          images: images
        })
      }
    })
  },
  previewImage(e) {
    wx.previewImage({
      urls: this.data.images,
      current: e.target.id
    })
  },
  back() {
    wx.navigateBack()
  },
  up: async function () {
    wx.showLoading({
      title: '上传中...',
      mask: true
    })
    if (!this.data.percent) {
      this.setData({
        percent: true
      }) 
    }
    const content = this.data.images
    const imagePath = "photoAlbum"
    const imageName = this.data.photoAlbum.name + time
    const image = this.data.photoAlbum
    var jindu = 0
    for (let i = 0; i < content.length; i++) {
      const name = imageName + i
      const F = await util.upimage(content[i], imagePath, name)
      const H = await util.getCloudImage([F])
      const I = {
        imageHttps: H[0].tempFileURL,
        imageFileID: F
      }

      if (i == 0 && image.content.length == 0) {
        image.cover = I
      }
      image.content.push(I)

      jindu += Math.floor(100 / content.length)

      this.setData({
        jindu: jindu
      })

    }
    const id = image._id
    delete image._id;
    const b = util.upData("photoAlbums", image, id)
    if (b) {
      if (this.data.percent) {
        this.setData({
          percent: false
        }) 
      }
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '上传成功',
        complete: (res) => {
          if (res.cancel) {
            wx.navigateBack()
          }

          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    } else {
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

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var photoAlbum = app.globalData.photoAlbums[options.id]
    this.setData({
      photoAlbum: photoAlbum
    })
    // console.log(photoAlbum)
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