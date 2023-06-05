// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderIndex: 0, // 默认性别为男性
    genderArray: ['男', '女'], // 可供选择的性别数组
    rankArray: [
      ['钻石', '星耀', '王者'],
      ['Ⅴ', 'Ⅳ', 'Ⅲ', 'Ⅱ', 'Ⅰ']
    ],
    rankIndex: [0, 0],
    positionBool: false,
    bestPositionIndex: 5,
    bestPositionArray: ['对抗路', '中路', '打野', '游走', '发育路', '全能'],
    otherPositionIndex: 0,
    OtherPositionArray: ['对抗路', '中路', '打野', '游走', '发育路'],
    otherPositionArray: ['对抗路', '中路', '打野', '游走', '发育路'],
  },
  bindChange: function (e) {
    console.log(e)
    const value = e.detail.value; // 获取选项的下标
    const key = e.target.id;
    this.setData({

      [`${key}Index`]: value,
    });
  },
  //性别选择器
  bindGenderColumnChange: function (e) {
    console.log(e)
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      rankIndex: e.detail.value
    })
  },
  // 段位列改变时触发
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      rankArray: this.data.rankArray,
      rankIndex: this.data.rankIndex
    };
    data.rankIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.rankIndex[0]) {
          case 0:
            ; //钻石
          case 1:
            data.rankArray[1] = ['Ⅴ', 'Ⅳ', 'Ⅲ', 'Ⅱ', 'Ⅰ'];
            break; //星耀           
          case 2: //王者
            const a1 = []
            for (let i = 0; i <= 99; i++) {
              a1.push(i.toString());
            };
            data.rankArray[1] = a1;
            break;
        }
    }
    console.log(data.rankIndex);
    this.setData(data);
  },
  bestbindChange: function (e) {
    var v1 = [];
    v1 = JSON.parse(JSON.stringify(this.data.OtherPositionArray))
    const bestPositionIndex = e.detail.value;
    console.log(bestPositionIndex)
    if (bestPositionIndex < 5) {
      v1.splice(bestPositionIndex, 1)
      console.log(v1)
      //
      if (this.data.bestPositionArray[this.data.bestPositionIndex] == this.data.otherPositionArray[this.data.otherPositionIndex]) {
        this.setData({
          positionBool: true,
          bestPositionIndex: bestPositionIndex,
          otherPositionArray: v1,
          otherPositionIndex: 0
        })
      } else {
        this.setData({
          positionBool: true,
          bestPositionIndex: bestPositionIndex,
          otherPositionArray: v1,
        })
      }
    } else {
      this.setData({
        positionBool: false, //隐藏其他游戏位置的选择器
        bestPositionIndex: bestPositionIndex,
      })
    }

  },
  otherbindChange: function (e) {
    this.setData({
      otherPositionIndex: e.detail.value
    })
  },
  //提交注册
  buttonBind(){},
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