// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group: [{
        name: "家人",
        member: [{
            name: "张三",
            nickname: "小三",
            gender: "男",
            rank: "长子",
            team: "家庭",
            position: "成员",
            avatar: "https://example.com/avatar1.jpg"
          },
          {
            name: "李四",
            nickname: "小四",
            gender: "男",
            rank: "次子",
            team: "家庭",
            position: "成员",
            avatar: "https://example.com/avatar2.jpg"
          },
          {
            name: "王五",
            nickname: "小五",
            gender: "女",
            rank: "造人",
            team: "家庭",
            position: "成员",
            avatar: "https://example.com/avatar3.jpg"
          }
        ]
      },
      {
        name: "朋友",
        member: [{
            name: "小红",
            nickname: "红姐",
            gender: "女",
            rank: "闺蜜",
            team: "贴心",
            position: "CEO",
            avatar: "https://example.com/avatar4.jpg"
          },
          {
            name: "小明",
            nickname: "明哥",
            gender: "男",
            rank: "兄弟",
            team: "捧心",
            position: "COO",
            avatar: "https://example.com/avatar5.jpg"
          },
          {
            name: "小丽",
            nickname: "丽姐",
            gender: "女",
            rank: "闺蜜",
            team: "护心",
            position: "CTO",
            avatar: "https://example.com/avatar6.jpg"
          }
        ]
      },
      {
        name: "同事",
        member: [{
            name: "小李",
            nickname: "李哥",
            gender: "男",
            rank: "经理",
            team: "销售",
            position: "成员",
            avatar: "https://example.com/avatar7.jpg"
          },
          {
            name: "小王",
            nickname: "王总",
            gender: "男",
            rank: "总监",
            team: "市场",
            position: "成员",
            avatar: "https://example.com/avatar8.jpg"
          },
          {
            name: "小张",
            nickname: "张姐",
            gender: "女",
            rank: "主管",
            team: "技术",
            position: "成员",
            avatar: "https://example.com/avatar9.jpg"
          }
        ]
      }
    ]
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