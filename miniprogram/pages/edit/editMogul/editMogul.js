// pages/edit/editMogul/editMogul.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '../../../images/TuPian/sctp.png',
    honorID: [1]
  },
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
  delHonor() {
    const honorID = this.data.honorID
    if (honorID.length > 0) {
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