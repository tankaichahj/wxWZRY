// pages/information/information.js
var util = require('../../utils/user')
var tools = require('../../utils/tools')
var load = require('../../utils/load')
var crud = require('../../utils/crud')
var time = tools.stringStripSymbol(tools.formatTime(new Date()))
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    op: '',
    users: [],
    showTeam: false,
    showPopup: false,
    showApply: false,
    currentTab: true,
    positionArray: ['对抗路', '中路', '发育路', '游走', '打野'],
    positionIndex: 1,
    position: {
      对抗路: 'topLane',
      中路: 'midLane',
      发育路: 'adc',
      游走: 'roam',
      打野: 'jungle'
    },
    position1: [
      'topLane',
      'midLane',
      'adc',
      'roam',
      'jungle'
    ],
    position2: [
      'TopLane',
      'MidLane',
      'Adc',
      'Roam',
      'Jungle'
    ],
    po: {
      'topLane': '对抗路',
      'midLane': '中路',
      'adc': '发育路',
      'roam': '游走',
      'jungle': '打野'
    },
    needTeams: false,
    needTeam: false,
    team: null
  },
  ins: function (e) {
    const key = e.currentTarget.id
    const value = e.detail.value
    this.setData({
      [`${key}`]: value
    })
  },
  switchTab(e) {
    const currentTab = this.data.currentTab
    const id = e.currentTarget.id
    if (id == "1") {
      if (currentTab) {
        this.setData({
          currentTab: false
        })
      }
    } else {
      if (!currentTab) {
        this.setData({
          currentTab: true
        })
      }
    }
  },
  hideDetail() {
    this.setData({
      showPopup: false
    })
  },
  hideDetail1() {
    this.setData({
      showTeam: false
    })
  },
  hideDetail2() {
    this.setData({
      showApply: false
    })
  },
  select(e) {
    const id = e.currentTarget.id

    for (let i = 0; i < 5; i++) {
      if (this.data.position1[i] == id) {
        this.setData({
          [id]: true
        })
      } else {
        this.setData({
          [this.data.position1[i]]: false
        })
      }
    }

  },
  bindChange(e) {
    this.setData({
      positionIndex: e.detail.value
    })
  },
  newAvatat() {
    wx.navigateTo({
      url: '../upFace/upFaceUserImager/upFaceUserImager?field=newTeamAvatar',
    })
  },
  //离开小队
  async btn1() {
    let set = ['teams']
    let data = await load.downloadDataSet(set)
    let op = this.data.op
    let teams = data[0].teams

    const Team = teams.filter(item => {
      const positions = this.data.position1;
      for (const position of positions) {
        if (item[position] !== null && item[position]._openid === op) {
          return true;
        }
      }
      return false;
    });
    let team = Team[0]
    let team_id = team._id
    wx.showModal({
      title: '提示',
      content: '确定离开小队么？',
      complete: async (res) => {
        if (res.cancel) {}
        if (res.confirm) {
          //是否为队长
          if (team.teamLeader._openid == app.globalData.openid) {
            wx.showModal({
              title: '提示',
              content: '你是队长，退出小队后将解散该小队',
              complete: async (res) => {
                if (res.cancel) {
                  return
                }
                if (res.confirm) {
                  //解散小队
                  //先删头像
                  wx.showLoading({
                    title: '离开中',
                  })
                  let res = await crud.deletePhoto([team.teamAvatarFileID])
                  if (res) {
                    let set = 'teams'
                    let r = await crud.deleteData(set, team._id)
                    if (r) {
                      wx.hideLoading()
                      wx.showModal({
                        title: '提示',
                        content: '解散小队成功',
                        complete: (res) => {
                          if (res.cancel) {
                            this.setData({
                              team: null
                            })
                            this.getTeams()
                          }

                          if (res.confirm) {
                            this.setData({
                              team: null
                            })
                            this.getTeams()
                          }
                        }
                      })

                    }
                  } else {
                    wx.hideLoading()
                    wx.showModal({
                      title: '提示',
                      content: '解散失败，请联系管理员',
                      complete: (res) => {
                        if (res.cancel) {

                        }

                        if (res.confirm) {

                        }
                      }
                    })
                    console.log(res + '失败')
                  }
                }
              }
            })
          } else {
            for (let i = 0; i < 5; i++) {
              if (team[this.data.position1[i]] !== null && team[this.data.position1[i]]._openid == app.globalData.openid) {
                let a = {}
                team[this.data.position1[i]] = null
                delete team._id
                let S = 'teams'
                let b = await util.upData(S, team, team_id)
                if (b) {
                  wx.showModal({
                    title: '提示',
                    content: '已成功退出小队',
                    complete: (res) => {
                      if (res.cancel) {
                        this.getTeams()
                        this.setData({
                          currentTab: true
                        })
                      }

                      if (res.confirm) {
                        this.getTeams()
                        this.setData({
                          currentTab: true
                        })
                      }
                    }
                  })
                }
              }

            }
          }
        }
      }
    })
  },
  //创建小队
  btn2() {

    this.setData({
      showPopup: !this.data.showPopup
    })
  },
  btn3() {

    this.setData({
      showApply: !this.data.showApply
    })
  },
  //申请小队
  async btn4() {

    let aaa = true
    let users = this.data.users
    let user = users.find(item => item._openid == this.data.op)
    for (let i = 0; i < 5; i++) {
      if (this.data[this.data.position1[i]] == true) {

        wx.showLoading({
          title: '查询中',
          mask: true
        })
        aaa = false
        //重新获取小队信息
        let set = ['teams']
        let data = await load.downloadDataSet(set)
        let teams = data[0].teams
        //重新检测用户是否有小队
        let op = this.data.op
        const result = teams.filter(item => {
          const positions = this.data.position1;
          for (const position of positions) {
            if (item[position] !== null && item[position]._openid === op) {
              return true;
            }
          }
          return false;
        });
        if (result.length > 0) {
          this.getTeams().then(() => {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '你已经加入了小队',
              complete: (res) => {
                if (res.cancel) {
                  this.setData({
                    showTeam: false
                  })
                }
                if (res.confirm) {
                  this.setData({
                    showTeam: false
                  })
                }
              }
            })
            return
          })
        } else {
          let T = teams.filter(item => item._id == this.data.applyTeam._id)
          let team = T[0]
          let teamApplication = team.teamApplication
          const aa = teamApplication.filter(item => item.user._openid == op)
          if (aa.length > 0) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '你已经申请过该小队了',
              complete: (res) => {
                if (res.cancel) {

                }

                if (res.confirm) {

                }
              }
            })
          } else {
            wx.hideLoading()
            wx.showLoading({
              title: '查询中',
              mask: true
            })
            team.teamApplication.push({
              position: this.data.position1[i],
              user: user
            })
            delete team._id
            // console.log(teamApplication)
            let field = 'teamApplication'
            // const res = await util.updateObjectFieldValueInDatabase(set[0], this.data.applyTeam._id,field,teamApplication )
            const res = await util.upData(set[0], team, this.data.applyTeam._id)
            if (res) {
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: '申请成功',
                complete: (res) => {
                  if (res.cancel) {
                    this.setData({
                      showTeam: false
                    })
                  }

                  if (res.confirm) {
                    this.setData({
                      showTeam: false
                    })
                  }
                }
              })
            } else {
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: '申请失败,请联系管理员',
                complete: (res) => {
                  if (res.cancel) {
                    this.setData({
                      showTeam: false
                    })
                  }

                  if (res.confirm) {
                    this.setData({
                      showTeam: false
                    })
                  }
                }
              })
            }
          }

        }
      } else {
        if (aaa && i == 4) {
          wx.showModal({
            title: '提示',
            content: '请选择你的小队游戏位置',
          })
          aaa = false
        }

      }
    }

  },
  async ty(e) {
    console.log(e)
    let position = e.mark.id
    let openid = e.target.id
    let set = ['teams']
    let data = await load.downloadDataSet(set)
    let teams = data[0].teams
    let Team = teams.filter(item => item.teamLeader._openid == app.globalData.openid)
    let team = Team[0]
    let team_id = team._id
    let ApplyUser = team.teamApplication.filter(item => item.user._openid == openid)
    let applyUser = ApplyUser[0]

    const result = teams.filter(item => {
      const positions = this.data.position1;
      for (const position of positions) {
        if (item[position] !== null && item[position]._openid === openid) {
          return true;
        }
      }
      return false;
    });
    if (result.length > 0) {
      let D = {
        teamApplication: team.teamApplication.filter(item => item.user._openid !== openid)
      }
      let b = await util.upDatas(set, D, team_id)
      if (b) {
        wx.showModal({
          title: '提示',
          content: '该玩家已经有小队了',
          complete: (res) => {
            if (res.cancel) {
              this.getTeams()
            }

            if (res.confirm) {
              this.getTeams()
            }
          }
        })
      }

    } else {
      if (!team[position]) {
        team[position] = applyUser.user
        let newTeamApplication = team.teamApplication.filter(item => item.position !== position)
        team.teamApplication = newTeamApplication

        delete team._id
        let set = 'teams'
        let b = await util.upDatas(set, team, team_id)
        if (b) {
          wx.showToast({
            title: applyUser.user.name + '成功加入本小队',
          })
          this.getTeams()
        }
      }
    }


  },
  async jj(e) {
    console.log(e)
  },
  async dataPacking() {
    let team = {}
    let op = this.data.op
    console.log(users)
    let users = this.data.users
    let user = users.find(item => item._openid == op)

    let {
      newTeamName,
      newTeamAvatar,
      newTeamIntroduce,
      positionArray,
      positionIndex,
      position

    } = this.data
    team = {
      teamName: newTeamName,
      teamAvatar: newTeamAvatar,
      teamIntroduce: newTeamIntroduce,
    }

    if (tools.objecAtrtIsEmpty(team)) {
      wx.showLoading({
        title: '上传中',
      })
      let teamAvatarField = 'teamAvatar'
      let teamAvatarPath = 'teamsAvatar'
      let teamAvatarName = team.teamName + time
      const {
        teamAvatarFileID,
        teamAvatarHttps
      } = await util.getImageHttpsAndFiledID(teamAvatarField, team.teamAvatar, teamAvatarPath, teamAvatarName)
      let data = {
        teamName: team.teamName,
        teamLeader: user,
        teamAvatarFileID: teamAvatarFileID,
        teamAvatarHttps: teamAvatarHttps,
        teamIntroduce: team.teamIntroduce,
        teamApplication: [],
        topLane: null,
        midLane: null,
        jungle: null,
        roam: null,
        adc: null
      }
      const field = position[positionArray[positionIndex]]
      data[field] = user
      return data
    } else {
      return false
    }
  },
  async upNewTeam() {
    const data = await this.dataPacking()
    if (data) {
      const set = 'teams'
      const res = await util.insertData(set, data)
      if (await res) {
        wx.hideLoading()

        wx.showModal({
          title: '提示',
          content: '恭喜您，创建成功',
          complete: (res) => {
            if (res.cancel) {
              this.setData({
                showPopup: !this.data.showPopup,
                needTeam: false
              })

              this.getTeams()
            }

            if (res.confirm) {
              this.setData({
                showPopup: !this.data.showPopup,
                needTeam: false
              })
              this.getTeams()
            }
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '创建失败，请联系管理员',
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
  showTeam(e) {

    const id = e.currentTarget.id
    const D = this.data.teams.filter(item => item._id !== null && item._id == id)
    const data = D[0]
    this.setData({
      applyTeam: data
    })
    console.log(data)
    for (let i = 0; i < 5; i++) {

      if (data[this.data.position1[i]] === null) {
        this.setData({
          [this.data.position2[i]]: true
        });
      }
      this.setData({
        [this.data.position1[i]]: false
      });
    }

    this.setData({
      showTeam: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      teams: app.globalData.teams,
      needTeams: true
    })
  },
  previewImage(e) {
    // console.log(e)
    wx.previewImage({
      urls: [e.target.id],
      current: e.target.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    let needTeams = this.data.needTeams
    if (needTeams) {
      this.getTeams()
    }

  },
  needTeam(data) {
    let that = this
    let op = that.data.op
    console.log(op)
    const result = data.filter(item => {
      const positions = this.data.position1;
      for (const position of positions) {
        if (item[position] !== null && item[position]._openid === op) {
          return true;
        }
      }
      return false;
    });
    const needLeader = data.filter(item => item.teamLeader._openid == op)
    // console.log(result, op)
    if (result.length > 0) {
      this.setData({
        needTeam: false,
        team: result[0]
      })
    } else {
      this.setData({
        needTeam: true,

      })
    }
    if (needLeader.length > 0) {
      this.setData({
        needLeader: true,
      })
    } else {
      this.setData({
        needLeader: false,
      })
    }
  },
  async getTeams() {
    let set = ['teams']
    let data = await load.downloadDataSet(set)
    // console.log(data)
    this.setData({
      teams: data[0].teams
    })
    let op = await util.getUserOpenid()
    let users = await util.getUsersInfo('users')
    this.setData({
      op: await op,
      users: await users
    })
    this.needTeam(data[0].teams)

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