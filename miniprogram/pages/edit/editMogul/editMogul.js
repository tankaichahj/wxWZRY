// pages/edit/editMogul/editMogul.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '../../../images/TuPian/sctp.png',
    honorID: [1],
    informationID: [{
      id: 1,
      textID: [1],
      imageID: []
    }],
  },
  // 添加一条荣誉
  addHonor() {
    const honorID = this.data.honorID
    if (honorID.length + 1 > 3) {
      return
    } else {
      const newID = this.data.honorID.length + 1;
      honorID.push(newID)
      this.setData({
        honorID: honorID
      })
    }
  },
  // 删除一条荣誉
  delHonor() {
    const honorID = this.data.honorID
    if (honorID.length > 1) {
      honorID.pop(); // 删除数组最后一个元素
      this.setData({
        honorID: honorID
      })
    }
  },
  ins: function (e) {
    const key = e.currentTarget.id
    const value = e.detail.value
    this.setData({
      [`${key}`]: value
    })
  },
  addText(e) {
    const informationID = this.data.informationID
    const textID = informationID[e.target.id - 1].textID
    const newID = textID.length + 1
    if (textID.length < 5) {
      textID.push(newID)
      this.setData({
        informationID: informationID
      })
    }
  },
  delText(e) {
    const informationID = this.data.informationID
    const textID = informationID[e.target.id - 1].textID
    if (textID.length > 1) {
      textID.pop();
      this.setData({
        informationID: informationID
      })
    }
  },
  addImage(e) { //最多塞10个照片
    const that = this
    const id = e.target.id
    const information = this.data.informationID[id - 1]
    const length = information.imageID
    const count = 10 - length
    wx.chooseMedia({
      count: count,
      mediaType: ['image'],
      sourceType: ['album'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        for (let i = 0; i < res.tempFiles.length; i++) {
          information.imageID.push(res.tempFiles[i].tempFilePath)
        }
        that.setData({
          informationID: that.data.informationID
        })
      }
    })
  },
  delImage(e) {
    const id = e.target.id
    const imageID = this.data.informationID[id - 1].imageID
    if (imageID.length > 0) {
      imageID.pop();
      this.setData({
        informationID: this.data.informationID
      })
    }

  },
  addBox() {
    const informationID = this.data.informationID
    const newID = informationID.length
    if (newID < 5) {
      const newInformation = {
        id: newID + 1,
        textID: [1],
        imageID: []
      }
      informationID.push(newInformation)
      this.setData({
        informationID: informationID
      })
    }
  },
  delBox() {
    const informationID = this.data.informationID
    if(informationID.length>1){
      informationID.pop()
      this.setData({
        informationID:informationID
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  previewImage(e) {
    wx.previewImage({
      urls: [e.target.id],
      current: e.target.id
    })
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
})