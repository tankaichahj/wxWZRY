// pages/squads/squads.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [], // 存储用户信息，
    UserList: [], // 获取的用户信息
    user: [],
    loading: true, //加载动画
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (!this.data.aaa) {
      this.getUserInfo();
    }

  },
  //更新有头像

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //加载过数据后，重新到此页面才开始刷新数据
    if (this.data.aaa) {
      this.getUserInfo();
    }
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
  getUserInfo: function () {
    const self = this
    //用户列表获取
    wx.cloud.callFunction({
      name: 'getDatabaseUser',
      data: {
        jihe: 'user',
        action: 'get' // 操作类型为获取
      },
      success: (res) => {
        this.data.UserList = res.result.data

      },
      fail: (err) => {
        console.log(err);
      }
    })
    //用户头像获取
    wx.cloud.callFunction({
      name: 'getDatabaseUser',
      data: {
        jihe: 'file',
        action: 'get' // 操作类型为获取
      },
      success: res => {
        if (res.result.data.length > 0) {
          const fileIDs = res.result.data.map(item => item.fileID);
          const idAndFileIDs = res.result.data.map(item => ({
            _openid: item._openid,
            fileID: item.fileID
          }));

          wx.cloud.callFunction({
            name: 'downloadFiles',
            data: {
              fileids: fileIDs,

            },
            success: res => {
              console.log(res)
              const self = this
              const T = res.result

              const arr = [];
              const I = res.result.length

              function getImageInfoPromisified(src) {
                return new Promise((resolve, reject) => {
                  wx.getImageInfo({
                    src: src,
                    success: resolve,
                    fail: reject
                  });
                });
              }

              async function loadImageUrls() {

                for (let i = 0; i < I; i++) {
                  const res = await getImageInfoPromisified(T[i].tempFileURL);
                  const a = {
                    path: res.path,
                    _openid: idAndFileIDs[i]._openid
                  };
                  arr.push(a);
                }
                const result = self.data.UserList.map(obj => ({
                  ...obj,
                  path: arr.find(o => o._openid === obj._openid)?.path
                }));
               
                //数据不一致再更新数据
                if (self.data.UserList != self.data.userList){
                  self.setData({
                    userList: result,
                    loading:false
                  })
                  app.globalData.userList=result
                  console.log(app.globalData.userList)

                }
                  
              }
              loadImageUrls();

            }
          })
        } else {
          //数据不一致再更新数据
          if (self.data.UserList != self.data.userList){
            self.setData({
              userList: self.data.UserList,
              loading:false
            })
          }


        }

      }
    })

  },

})