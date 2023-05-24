// pages/info/info.js
var app = getApp();
Page({


  /**
   * 页面的初始数据
   */
  data: {
    
    positions: [{
        label: '全能',
        value: '全能'
      },
      {
        label: '对抗路',
        value: '对抗路'
      },
      {
        label: '打野',
        value: '打野'
      },
      {
        label: '中路',
        value: '中路'
      },
      {
        label: '游走',
        value: '游走'
      },
      {
        label: '发育路',
        value: '发育路'
      }
    ],
    ranks: [{
        label: '铂金',
        value: '铂金'
      },
      {
        label: '钻石',
        value: '钻石'
      },
      {
        label: '星耀',
        value: '星耀'
      },
      {
        label: '王者',
        value: '王者'
      }
    ],
    num: [{
      label: 'Ⅰ',
      value: 'Ⅰ'
    }, {
      label: 'Ⅱ',
      value: 'Ⅱ'
    }, {
      label: 'Ⅲ',
      value: 'Ⅲ'
    }, {
      label: 'Ⅳ',
      value: 'Ⅳ'
    }, {
      label: 'Ⅴ',
      value: 'Ⅴ'
    }],
    num_1: [{
      label: 'Ⅰ',
      value: 'Ⅰ'
    }, {
      label: 'Ⅱ',
      value: 'Ⅱ'
    }, {
      label: 'Ⅲ',
      value: 'Ⅲ'
    }, {
      label: 'Ⅳ',
      value: 'Ⅳ'
    }],
    sex: [{
      label: '男',
      value: '男'
    }, {
      label: '女',
      value: '女'
    }],
    TK: false
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

  },
  //选择器选择内容时触发事件，每选择一次都触发
  onColumnChange(e) {

  },
  //点击选择器“确认”触发事件
  onPickerChange(e) {
    const {
      key
    } = e.currentTarget.dataset;
    const {
      value,
      label
    } = e.detail;

    this.setData({
      [`${key}Visible`]: false,
      [`${key}Value`]: value,
      [`${key}Text`]: label.join(''),
    });

    //游戏位置全能时，取消其他位置选项
    if (this.data.positionText == '全能') {
      this.setData({
        TK: false,
        PositionVisible: false,
        otherPositionText: '',
        otherPositionValue: ''
      })
      //不是全能时，则出现其他位置选项
    } else {
      if (this.data.positionText) {
        this.setData({
          TK: true,
        })
      }
      let positionText = this.data.positionText
      //游戏位置有值时，更新其他位置选择器内容，确保其他位置与游戏位置不会重复
      if (positionText) {
        let position = this.data.positions
        let otherposition = ''
        otherposition = JSON.parse(JSON.stringify(position))
        let index = otherposition.findIndex((item) => {
          return item.label === positionText
        })
        otherposition.splice(index, 1)
        otherposition.splice(0, 1)
        this.setData({
          otherPosition: otherposition
        })
      }
      //当其他位置有值，判断和游戏位置是否一样，一样则置空其他位置内容
      if (this.data.positionText) {
        if (this.data.positionText == this.data.otherPositionText) {
          this.setData({
            otherPositionValue: '',
            otherPositionText: ''
          })
        }
      }
    }

  },
  //点击选择器“取消”事件
  onPickerCancel(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this.setData({
      [`${key}Visible`]: false,
    });
  },
  //点击“游戏位置”事件
  onPositionPicker() {
    this.setData({
      positionVisible: true,
    });
  },
  //点击"其他位置"事件,
  onOtherPositionPicker() {
    this.setData({
      otherPositionVisible: true,
    });
  },
  //点击性别事件
  onSexPicker() {
    this.setData({
      sexVisible: true,
    });
  },
  //点击段位触发事件
  onRankPicker() {
    let nums = this.data.num_1
    this.setData({
      rankVisible: true,
      Num: nums

    });

  },
  //段位选择器逻辑
  onRankColumnChange(e) {
    const {
      column,
      index
    } = e.detail
    let num1 = ''
    num1 = JSON.parse(JSON.stringify(this.data.num))
    let num3 = this.data.num_1

    const num2 = Array.from({
      length: 100
    }, (_, i) => ({
      label: i,
      value: i
    }))

    if (column === 0) {
      if (index == 0) {

        let Num = num3
        this.setData({
          Num
        })
      }
      if (index > 0) {
        if (index < 3) {
          this.setData({
            Num: num1
          })
        } else {
          this.setData({
            Num: num2
          })
        }
      }
    }
  },
  
  btnsub(event) {
    const openid = app.globalData.openid
    const {
      name,
      qq,
      nickname
    } = event.detail.value
    const sex = this.data.sexText
    const best = this.data.positionText
    const other = this.data.otherPositionText
    const rank = this.data.rankText
    const position = {
      best: best,
      other: other
    }
    if (!openid || !name || !nickname || !qq || !sex || !best || !rank) {
      wx.showModal({
        title: '提示',
        content: '请完善所有信息',
      })
    } else {
      if (best != '全能' && !other) {
        wx.showModal({
          title: '提示',
          content: '请完善‘其他位置’的信息',
        })

      } else {

        const op = openid
        const data = {
          _openid: op,
          name: name, //姓名
          nickname: nickname, //游戏昵称
          sex: sex, //性别
          qq: qq,
          position: position, //游戏位置
          rank: rank, //段位
          group: '', //所在小队
          group_leader: false //是否为队长
        }
        console.log(data)
        //判断数据库中是否存在此id，防止用户多次注册
        wx.cloud.callFunction({
          name: 'getDatabaseUser', // 云函数名称
          data: {
            jihe:'user',
            action: 'query', // 操作类型为查询
            field: '_openid', // 要查询的字段
            value: op // 要查询的数据
          },
          success: function (res) {
            //已有用户
            if (res.result.data.length === 1) {
              wx.showModal({
                title: '提示',
                content: '你已经注册过了！',
                //跳转首页
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
            } else {

              wx.cloud.callFunction({
                name: 'getDatabaseUser', // 云函数名称
                data: {
                  jihe:'user',
                  action: 'insert', // 操作类型为插入
                  field: '', // 要查询的字段
                  value: data // 要插入的数据
                },
                success: function (res) {
                  wx.setStorage({
                    key: 'user',
                    data: {
                      data
                    }
                  })
                  setTimeout(() => {
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

                },
                fail: function (err) {
                  console.log(err);
                }
              })
            }
          },
          fail: function (err) {
            console.log(err);
          }
        });

      }
    }
  }
})