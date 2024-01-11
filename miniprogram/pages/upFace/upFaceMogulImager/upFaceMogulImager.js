var app = getApp()

Page({
  data: {
    imageSrc: '', //照片上传连接
    cuttype: '',
    field:''


  },
  onLoad(option) {
  let field= option.field
  this.setData({
    field:field
  })

  },

  //跳转裁剪页面，选择头像
  chooseImage() {

    wx.navigateTo({
      url: '../../cutFace/cutFaceMogulImager/cutFaceMogulImager'
    })
  },

  previewImage() {
    wx.previewImage({
      urls: [this.data.imageSrc],
      current: this.data.imageSrc
    })
  },
  //清除照片
  cancelImage() {
    this.setData({
      imageSrc: ''
    })
  },
  
  back() {
    let pages = getCurrentPages();
    //prevPage 相当于上个页面的this，可以通过setData修改上个页面参数执行上个页面的方法等
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      [this.data.field]: this.data.imageSrc
    })
    wx.navigateBack()
  },
 
  onShow() {


  },
})