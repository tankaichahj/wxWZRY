// pages/edit/editAlbum/editAlbum.js
var util = require('../../../utils/user')
var tools = require('../../../utils/tools');
const user = require('../../../utils/user');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    editPhoto: '编辑',
    circle_flag: false,
    inner_circle_flag: []
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {


  },
  addAlbum() {
    wx.navigateTo({
      url: '../editAddAlbum/editAddAlbum',
    })
  },
  async getAlbum() {
    const set = 'photoAlbums'
    const photoAlbums = await util.getUsersInfo(set)
    this.setData({
      photoAlbums: photoAlbums
    })
    app.globalData.photoAlbums = await photoAlbums

  },
  editAlbum() {
    const circle_flag = this.data.circle_flag

    this.setData({
      circle_flag: !circle_flag
    })

    if (circle_flag) {
      const inner_circle_flag = this.data.inner_circle_flag
      inner_circle_flag.splice(0, inner_circle_flag.length)
      this.setData({
        inner_circle_flag: inner_circle_flag,
        editPhoto: '编辑'
      })
    } else {
      this.setData({
        editPhoto: '完成'
      })
    }
  },
  async delAlbum() {
    wx.showLoading({
      title: '删除中...',
      mask: true
    })
    const inner_circle_flag = this.data.inner_circle_flag
    const delListFileID = []
    const delListDataID = []
    const photoAlbums = this.data.photoAlbums
    //遍历所需删除的相册
    for (let i = 0; i < inner_circle_flag.length; i++) {
      if (inner_circle_flag[i] == true) {
        delListDataID.push(photoAlbums[i]._id)
        let list = []
        if (photoAlbums[i].content.length > 0) {}
        for (let j = 0; j < photoAlbums[i].content.length; j++) {
          list.push(photoAlbums[i].content[j].imageFileID)
        }
        delListFileID.push(list)
      }
    }
    //再次判断是不是管理员
    const op = app.globalData.openid
    const admin = await tools.getAdminInfo(op)
    if (await admin) {
      for (let i = 0; i < delListDataID.length; i++) {
        let a
        if (delListFileID[i].length > 0) {
          a = user.batchDeleteFiles(delListFileID[i])
        }
        let aa = await a
        if (delListFileID[i].length == 0 || await aa.errMsg == "cloud.deleteFile:ok") {
          let set = 'photoAlbums'
          let id = delListDataID[i]
          let b = user.delSetData(set, id)
          let bb = await b
          console.log(bb)
          if (await bb.errMsg == "cloud.callFunction:ok") {

          } else {
            this.getAlbum()
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '删除失败，请联系管理员',
              complete: (res) => {
                if (res.cancel) {}
                if (res.confirm) {}
              }
            })
          }
        } else {
          this.getAlbum()
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '删除失败，请联系管理员1',
            complete: (res) => {
              if (res.cancel) {}
              if (res.confirm) {}
            }
          })
        }
      }
      this.getAlbum()
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '删除成功',
        complete: (res) => {
          if (res.cancel) {}
          if (res.confirm) {}
        }
      })
    }

  },
  bind(e) {
    const id = e.currentTarget.id
    if (!this.data.circle_flag) {
      wx.navigateTo({
        url: `./editAlbum/editAlbum?id=${id}`,
      })
    } else {
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getAlbum()
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