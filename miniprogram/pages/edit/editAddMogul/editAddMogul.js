
var util = require('../../../utils/user');
var tools = require('../../../utils/tools');
var time = tools.stringStripSymbol(tools.formatTime(new Date()))
var num1 = 0
var num2 = 0
var num11 = 1
var num22 = 0
var jindu = 0


Page({

  /**
   * 页面的初始数据
   */
  data: {
    percent: false, //进度条
    image: '../../../images/TuPian/sctp.png',
    tagBoxID: "",
    honorID: [1],
    honorText: [],
    mogulImage: null,
    school: "",
    informationID: [{
      id: 1,
      textID: [""],
      imageID: []
    }],
  },
  infoImage() {
    wx.navigateTo({
      url: '../../upFace/upFaceMogulImager/upFaceMogulImager?field=mogulImage',
    })
  },
  // 添加一条荣誉
  addHonor() {
    const honorID = this.data.honorID
    if (honorID.length + 1 > 4) {
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
    const honorText = this.data.honorText
    if (honorID.length > 1) {
      honorID.pop(); // 删除数组最后一个元素
      honorText.pop();
      this.setData({
        honorID: honorID
      })
    }
  },
  ins: function (e) {
    const id = e.currentTarget.id
    const value = e.detail.value
    if (id == 1 || id == 2 || id == 3) {
      const honorText = this.data.honorText
      const key = e.currentTarget.id

      honorText[key - 1] = value

    } else {
      this.setData({
        [`${id}`]: value
      })
    }

  },
  textins(e) {

    const F_id = this.data.tagBoxID - 1
    const id = e.currentTarget.id
    const informationID = this.data.informationID
    informationID[F_id].textID[id] = e.detail.value

  },
  texttap(e) {
    this.data.tagBoxID = e.mark.id


  },
  addText(e) {
    const informationID = this.data.informationID
    const textID = informationID[e.target.id - 1].textID

    if (textID.length < 5) {
      textID.push("")
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
    if (informationID.length > 1) {
      informationID.pop()
      this.setData({
        informationID: informationID
      })
    }
  },

  previewImage(e) {
    wx.previewImage({
      urls: [e.target.id],
      current: e.target.id
    })
  },
  // 上传头像
  getmogulImage: async function (mogulImage) {
    const mogulImagePath = 'mogul'
    const mogulImageName = this.data.name + 'image' + time
    const mogulImageFileID = await util.upimage(mogulImage, mogulImagePath, mogulImageName)
    const mogulImageHttps = await util.getCloudImage([mogulImageFileID])
    const data = {
      mogulImageFileID: await mogulImageFileID,
      mogulImageHttps: await mogulImageHttps[0].tempFileURL,
    }
    return data
  },

  //上传图片
  upimage: async function () {
    const informationID = this.data.informationID
    // const imageSrc = await this.zhuanma(informationID)
    const imagePath = 'mogul'
    const imageName = this.data.name + time
    const box = []
    let bz1 = false
    let bz2 = false
    this.setData({
      percent: true
    })
    for (let i = 0; i < informationID.length; i++) {
      const a = informationID[i].imageID
      const image = []
      if (!bz1) {
        num1 = informationID.length
        bz1 = true
      }
      num11 = num11 + 1
      for (let j = 0; j < a.length; j++) {
        if (!bz2) {
          num2 = a.length
          bz1 = true
          num22 = 0
        }
        const name = imageName + i + j
        const F = await util.upimage(a[j], imagePath, name)
        jindu = jindu + Math.floor((100 / num1) / num2)
        this.setData({
          jindu: jindu
        })
        image.push(F)
      }
      bz2 = false

      const H = await util.getCloudImage(image)
      const I = []
      for (let k = 0; k < H.length; k++) {
        I.push({
          imageFileID: image[k],
          imageHttps: H[k].tempFileURL
        })
      }
      box.push({
        text: informationID[i].textID,
        image: I
      })
    }
    return box
  },
  //数据打包
  async dataPacking() {
    const {
      mogulImage,
      name,
      sex,
      grade,
      college,
      speciality,
      school,
      honorText,
      informationID
    } = this.data
    //判断是否有没填项
    if (mogulImage && tools.objecAtrtIsEmpty(informationID) && tools.objecAtrtIsEmpty([mogulImage,
        name,
        sex,
        grade,
        college,
        speciality,
        honorText,
      ])) {
      const {
        mogulImageFileID,
        mogulImageHttps
      } = await this.getmogulImage(mogulImage)
      const information = {
        mogulImageFileID: await mogulImageFileID,
        mogulImageHttps: await mogulImageHttps,
        name: name,
        sex: sex,
        grade: grade,
        college: college,
        speciality: speciality,
        honor: honorText
      }
      if (school) {
        information.school = school
      }

      const box = await this.upimage()
      const data = {
        information: information,
        box: box
      }
      return data

    } else {
      return false
    }
  },

  //数据上传
  async buttonBind() {


    wx.showLoading({
      title: '上传中',
      mask: true
    })
    
    const data = await this.dataPacking()
    if (data) {
      
      console.log(data)
      const set = 'moguls'
      const res = await util.insertData(set, data)
      if (await res) {
        setTimeout(() => {
          wx.hideLoading()
          this.setData({
            percent:false
          })
          wx.showModal({
            title: '提示',
            content: '恭喜您，上传成功',
            complete: (res) => {
              if (res.cancel) {
                wx.navigateBack()
              }
              if (res.confirm) {
                wx.navigateBack()
              }
            }
          })
        }, 0.5);
      } else {
        wx.showModal({
          title: '提示',
          content: '上传失败，请联系管理员',
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