// pages/info/info.js
var app = getApp()
var util = require('../../utils/user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '../../images/TuPian/sctp.png',
    UserInfoSrc: '',
    register: false,
    nextStep: "下一页",
    showContainer: true,
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
  nextStep() {
    const k = this.data.nextStep
    if (k == "下一页") {
      this.setData({
        nextStep:"上一页",
        showContainer:false
      })
    } else {
      this.setData({
        nextStep:"下一页",
        showContainer:true
      })
    }
    if(!this.data.register){
      this.setData({
        register:true
      })
    }
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
  // 去选择图片
  previewImage() {
    wx.navigateTo({
      url: '../upFace/upFaceUserImager/upFaceUserImager',
    })
  },
  //提交注册
  async buttonBind() {
    wx.showLoading({
      title: '上传中...',
      mask: true
    })
    const data = await this.dataPacking()
    if (data) {

      const set = 'user'
      const res = await util.insertData(set, data)
      if (await res) {
        app.globalData.user = data
        setTimeout(() => {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '恭喜您，注册成功',
            complete: (res) => {
              if (res.cancel) {
                wx.switchTab({
                  url: '../index/index',
                })
              }
              if (res.confirm) {
                wx.switchTab({
                  url: '../index/index',
                })
              }
            }
          })
        }, 500);
      } else {
        wx.showModal({
          title: '提示',
          content: '注册失败，请联系管理员',
        })
      }
    } else {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '请完善所有信息',
      })
    }
  },
  //数据打包
  async dataPacking() {
    const mima = this.data.mima
    if (mima != "队长最帅") {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '邀请码错误',
        complete: (res) => {
          if (res.cancel) {}
          if (res.confirm) {}
        }
      })
      return
    }
    const {
      name,
      nickname,
      qq,
      year,
      college,
      major,
      signature,
      education,
      hero
    } = this.data
    const sex = this.data.genderArray[this.data.genderIndex]; //性别
    const best = this.data.bestPositionArray[this.data.bestPositionIndex]; //最擅长的位置
    const other = this.data.otherPositionArray[this.data.otherPositionIndex]; //其他位置
    var position = {}
    if (best == "全能") {
      position = { //游戏位置
        best: best,
        other: ""
      }
    } else {
      position = { //游戏位置
        best: best,
        other: other
      }
    }
    const rank = `${this.data.rankArray[0][this.data.rankIndex[0]]}　${this.data.rankArray[1][this.data.rankIndex[1]]}${this.data.rankArray[0][this.data.rankIndex[0]]=='王者'?'星':''}`; //游戏段位
    const openid = app.globalData.openid
    const avatar = this.data.UserInfoSrc //本地路径
    if (!name || !nickname || !avatar || !qq || !sex || !rank || !position) {

      return false
    } else { //无空值
      const avatarSrc = await util.getFileSystemManager(avatar)
      const avatarPath = 'avatar'
      const FileName = app.globalData.openid //文件名为openid
      const avatatFileID = await util.uploadPhoto(avatarSrc, avatar, avatarPath, FileName)
      const avatatHttps = await util.getCloudImage([avatatFileID.fileID])
      const data = {
        name: name,
        avatarFileID: await avatatFileID.fileID,
        avatatHttps: await avatatHttps[0].tempFileURL,
        qq: qq,
        sex: sex,
        nickname: nickname,
        rank: rank,
        position: position,
        _openid: openid,
        year:year,
        college,
        major,
        signature,
        education,
        hero
      }
      console.log(data)
      return data
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