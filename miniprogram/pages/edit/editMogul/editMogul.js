// pages/edit/editMogul/editMogul.js
//判断数组对象是否为空

var util = require('../../../utils/user');
var tools = require('../../../utils/tools');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '../../../images/TuPian/sctp.png',
    tagBoxID: "",
    honorID: [1],
    honorText: [],
    inforimage: null,
    school: "",
    informationID: [{
      id: 1,
      textID: [""],
      imageID: []
    }],
  },
  infoImage() {
    wx.navigateTo({
      url: '../../upFace/upFaceMogulImager/upFaceMogulImager',
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  previewImage(e) {
    wx.previewImage({
      urls: [e.target.id],
      current: e.target.id
    })
  },
  //数据打包
  async dataPacking() {
    const taht = this.data
    const mogulImage = taht.inforimage
    const name = taht.name
    const sex = taht.sex
    const grade = taht.grade
    const college = taht.college
    const speciality = taht.speciality
    const school = taht.school
    const honor = taht.honorText
    const informationID = taht.informationID
    var time = tools.stringStripSymbol(tools.formatTime(new Date()))
    if (!mogulImage || !name || !sex || !grade || !college || !speciality || !honor) {
      return false
    } else {
      const getmogulImage = async function (mogulImage) {
        const mogulImageSrc = await util.getFileSystemManager(mogulImage)
        const mogulImagePath = 'mogul'
        const mogulImageName = name + 'image' + time
        const mogulImageFileID = await util.uploadPhoto(mogulImageSrc, mogulImage, mogulImagePath, mogulImageName)
        const mogulImageHttps = await util.getCloudImage([mogulImageFileID.fileID])
        const data = {
          mogulImageFileID: await mogulImageFileID.fileID,
          mogulImageHttps: await mogulImageHttps[0].tempFileURL,
        }
        return data
      }
      const {
        mogulImageFileID,
        mogulImageHttps
      } = await getmogulImage(mogulImage)
      const information = {
        mogulImageFileID: await mogulImageFileID,
        mogulImageHttps: await mogulImageHttps,
        name: name,
        sex: sex,
        grade: grade,
        college: college,
        speciality: speciality,
        honor: honor
      }
      if (school) {
        information.school = school
      }
      const a = tools.objecAtrtIsEmpty(informationID) //判断是否有空值
      if (a) {
        //先上传图片
        //先转码
        console.log(1)
        const zhuanma = async function (arr) {
          //遍历informationID里所有的图片，
          const ima = []
          for (let i = 0; i < arr.length; i++) {
            const obj = {
              image: []
            };
            for (let j = 0; j < arr[i].imageID.length; j++) {
              const imageData = await util.getFileSystemManager(arr[i].imageID[j])
              obj.image.push(imageData)
            }
            ima.push(obj)
          }
          return ima
        }
        console.log()
        const imageSrc = await zhuanma(informationID)
        const imagePath = 'mogul'

        const imageName = name + time
        const box = []
        for (let i = 0; i < informationID.length; i++) {
          const a = imageSrc[i].image
          const image = []
          for (let j = 0; j < a.length; j++) {
            const name = imageName + i + j
            const F = await util.uploadPhoto(a[j], informationID[i].imageID[j], imagePath, name)

            const H = await util.getCloudImage([F.fileID])
            const I = {
              imageFileID: F.fileID,
              imageHttps: H[0].tempFileURL //可以优化
            }
            image.push(I)

          }
          box.push(image)
        }
        const data = {
          information: information,
          box: box
        }
        return data
      } else {
        return false
      }
    }

  },
  //数据上传
  async buttonBind() {
    wx.showLoading({
      title: '上传中...',
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
        }, 500)
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