var app = getApp()

Page({
  data: {
    imageSrc: '', //照片上传连接
    cuttype: '',


  },
  onLoad(option) {
    this.setData({
      cuttype: option.cuttype
    })

  },

  //跳转裁剪页面，选择头像
  chooseImage() {
    let that = this
    const cuttype = that.data.cuttype
    const path = `../cutFace/cutFace?cuttype=${cuttype}`
    wx.navigateTo({
      url: path
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

  up() {
    const upPath = this.data.upPath
    wx.showLoading({
      title: '上传中...',
      mask: true
    })
    wx.getFileSystemManager().readFile({
      filePath: this.data.imageSrc, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => {
        console.log(res)
        wx.cloud.callFunction({
          name: 'uploadPhoto',
          data: {
            file: res.data, // 待上传的照片
            F: this.data.imageSrc,
            openid: app.globalData.openid, //用户
            upPath: upPath //上传路径

          },
          success: res => {
            const fileID = res.result.fileID // 上传成功后返回的 fileID
            console.log('上传成功，fileID: ', res.result.fileID)
            const data = {
              class: '头像',
              fileID: fileID,
              _openid: app.globalData.openid
            }
            wx.cloud.callFunction({
              name: 'getDatabaseUser',
              data: {
                jihe: 'file',
                action: 'query', // 操作类型为查询
                field: '_openid', // 要查询的字段
                value: data._openid // 要查询的数据
              },
              success: (res) => {

                if (res.result.data.length === 1) { //已有头像，更新数据

                  wx.cloud.callFunction({
                    name: 'getDatabaseUser',
                    data: {
                      jihe: 'file',
                      action: 'update', // 操作类型为更新
                      id: res.result.data[0]._id,
                      data: data, // 要更新的数据

                    },
                    success: (res) => {
                      console.log('更新成功', res)
                      wx.hideLoading()
                      wx.showModal({
                        title: '提示',
                        content: '恭喜您，上传成功',
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
                    }
                  })
                } else  {
                  wx.cloud.callFunction({
                    name: 'getDatabaseUser',
                    data: {
                      jihe: 'file',
                      action: 'insert', // 操作类型为插入    
                      value: data // 要插入的数据
                    },
                    success: (res) => {
                      console.log(res)
                      //更新user集合
                      wx.hideLoading()
                     this.upUserData()
                      wx.hideLoading()
                      wx.showModal({
                        title: '提示',
                        content: '恭喜您，上传成功',
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

                    },
                    fail: err => {
                      console.log('上传失败：', err)
                    }
                  })
                }
              },
              fail: err => {
                console.log('查询用户信息失败：', err)
              }
            })

          },
          fail: err => {
            console.log('图片上传失败：', err)
          }
        })
      }
    })


  },
  //更新上传头像的用户数据
  upUserData() {
    const item =app.globalData.user
    const UserData = {
      _openid: item._openid,
      group: item.group,
      group_leader: item.group_leader,
      name: item.name,
      nickname: item.nickname,
      position: item.position,
      qq: item.qq,
      rank: item.rank,
      sex: item.sex,
      avatar: true
    }
    console.log(UserData)
    const id = app.globalData.user._id
    wx.cloud.callFunction({
      name: 'getDatabaseUser',
      data: {
        jihe: 'user',
        action: 'update', // 操作类型为更新
        id: id,
        data: UserData, // 要更新的数据
      },
      success:(res)=>{
        console.log(res)
        app.globalData.user={
          ...UserData,
          _id:item._id
        }
      }
    })
  },
  onShow() {
    if (this.data.cuttype == 1) {
      this.setData({
        upPath: 'avatar' //头像上传路径
      })
    };

  },
})