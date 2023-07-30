// pages/xty/xty.js
var app = getApp();
Page({
  data: {
    backgroundImage: '', // 用于保存选择的图片路径
    user:[],
  },

  // 选择图片的方法
  selectImage() {
    wx.chooseMedia({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(1,res)
        if (res.tempFiles && res.tempFiles.length > 0) { // 添加判断
          const tempFiles = res.tempFiles[0].tempFilePath;
          wx.compressImage({
            src: tempFiles,
            quality: 80,
            success: (res) => {
              console.log(2,res)
              const compressedFilePath = res.tempFilePath;
              wx.getImageInfo({
                src: compressedFilePath,
                success: (res) => {
                  console.log('压缩后参数',res);
                  if (res.type === 'jpg' || res.type === 'jpeg') {
                    this.setData({
                      backgroundImage: compressedFilePath
                    });
                    wx.setStorageSync('backgroundImage', compressedFilePath)
                  } else {
                    wx.compressImage({
                      src: compressedFilePath,
                      quality: 80,
                      fileType: 'jpg',
                      success: (res) => {
                        this.setData({
                          backgroundImage: res.tempFilePath
                        });
                        wx.setStorageSync('backgroundImage', compressedFilePath)
                      }
                    });
                  }
                },
                fail: (err)=>{
                  console.log(1,err)
                }
              });
            }
          });
        }
      }
    });
  },
  //获取头像
  onChooseAvatar: function (e) {
    console.log(e.detail.avatarUrl);
    var pic = e.detail.avatarUrl;
    this.setData({
      pic,
    })
  },

  /**
   * 页面的初始数据
   */

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
    const user =app.globalData.user
    const backgroundImage= wx.getStorageSync('backgroundImage')
    this.setData({
      user:user,
      backgroundImage:backgroundImage
    }) 
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