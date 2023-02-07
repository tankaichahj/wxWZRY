// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'wzry-7g7trrdib0f75ba2',
        traceUser: true,
      });
    };
    //拉去本地数据
    const Cates = wx.getStorageSync('openid')
    console.log(Cates)
    //本地无openid则调用云函数获取用户openid，并存入缓存
    if (!Cates) {
      wx.cloud.callFunction({
        name: 'getOpenid', // 云函数
        config: {
          env: 'wzry-7g7trrdib0f75ba2'
        },
        success(res) {
          console.log(res.result.OPENID)
          var op = res.result.OPENID
          getApp().globalData.openid = res.result.OPENID
          wx.setStorage({
            key: 'openid',
            data: res.result.OPENID
          })
        }
      });
    } //若存在openid，判断云数据库中是否存在此openid
    setTimeout(() => {
      const db = wx.cloud.database()
      const op = wx.getStorageSync('openid')
      db.collection('user').where({
        _openid: op
      }).get({
        success: res => {
          console.log(res)
          //index页面来判断cookid值，是否需要用户注册
          //数据库无用户openid，cookid为false
          if (res.data.length === 0) {
            wx.setStorage({
              key: 'cookid',
              data: false
            })
          } else { //用户存在，更新cookid，并将用户信息更新到本地缓存
            wx.setStorage({
              key: 'cookid',
              data: true
            })
            var {
              _id,
              _openid,
              name,
              qq,
              sex,
              position,
              group,
              group_leader
            } = res.data[0]
            wx.setStorage({
              key: 'user',
              data: {
                _id,
                _openid,
                name,
                qq,
                sex,
                position,
                group,
                group_leader
              }
            })
            //用户信息保存到全局变量中
            getApp().globalData.user = {
              _id,
              _openid,
              name,
              qq,
              sex,
              position,
              group,
              group_leader
            }
          }
        }
      })
    }, 1000);
    this.globalData = {
      openid: '',
      //本地是否有用户信息缓存
      cookie: '',
      user: [{
        _id: '',
        _openid: '',
        name: '',
        qq: '',
        sex: '',
        position: {
          best: '',
          other: []
        },
        group: '',
        group_leader: false
      }]
    };
  }
});