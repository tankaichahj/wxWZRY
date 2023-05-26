//获取用户openid
var app = getApp();
function getUserOpenid(){
	wx.cloud.callFunction({
		name: 'getOpenid',
		config: {
			env: 'wzry-7g7trrdib0f75ba2'
		},
		success: (res) => {
			app.globalData.openid = res.result.OPENID;
			this.checkOpenidExist(res.result.OPENID) // 传递 OPENID 参数
		}
	})
}
//获取用户信息，无此用户ck为flase
function getUserInformation(){
wx.cloud.callFunction({
      name: 'getDatabaseUser',
      data: {
        jihe: 'user',
        action: 'query', // 操作类型为查询
        field: '_openid', // 要查询的字段
        value: op // 要查询的数据
      },
      success: (res) => {
        if (res.result.data.length === 1) {
          app.globalData.user = res.result.data[0]
					//这里要改
          this.setData({
            loading: false
          })
        } else {//这里要改
          this.showPopup()
        }

      },
      fail: err => {
        console.error(err);
      }
    })
}

//必须在这里暴露接口，以便被外界访问，不然就不能访问
module.exports = {
	getUserOpenid:getUserOpenid,
	getUserInformation:getUserInformation
} 
