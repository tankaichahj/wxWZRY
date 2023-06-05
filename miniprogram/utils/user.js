/*
该js功能：
1：获取用户openid 
2：获取用户个人信息  
3：获取一个集合的信息 
4：将图片转换成能上传的格式
5：查询set集合某个字段的值
6: 检测用户是否注册
**/


var app = getApp();
//1 获取openid函数
function getUserOpenid() {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'getOpenid',
      config: {
        env: 'wzry-7g7trrdib0f75ba2'
      },
      success: (res) => {
        //保存到全局变量中
        app.globalData.openid = res.result.OPENID;
        resolve(res.result.OPENID);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
//2 查询用户信息函数
function getUserInformation(op) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'getDatabaseUser',
      data: {
        jihe: 'user',
        action: 'query', // 操作类型为查询
        field: '_openid', // 要查询的字段
        value: op // 要查询的数据
      },
      success: (res) => {
        console.log(res, op)

        //存在用户
        if (res.result.data.length === 1) {
          app.globalData.user = res.result.data[0]
          app.globalData.ck = true
          resolve(res.result.data[0])
        } else {
          //不存在用户
          app.globalData.ck = false
          resolve(false)
        }
      },
      fail: err => {
        reject(err);
      }
    })
  })
}
//3 查询set集合的所有数据
function getUsersInfo(set) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'getDatabaseUser',
      data: {
        jihe: set,
        action: 'get' // 操作类型为获取
      },
      success: (res) => {
        resolve(res.result.data)
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
//4 将图片转换成能上传的格式
function getFileSystemManager(FilePath) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: FilePath,
      encoding: 'base64',
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      }
    })
  })

}
//5 数据库查询操作
function getUserFiled(set,field,value) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'getDatabaseUser',
      data: {
        jihe: set,
        action: 'query', // 操作类型为查询
        field: field, // 要查询的字段
        value: value // 要查询的数据
      },
      success: (res) => {
        console.log(res)
        resolve(res)
      },
      fail :(err)=>{
        reject(err)
      }
    })
  })
}
// 6 用户是否注册
function userCK(){
  return new  Promise((resolve, reject)=>{
if(app.globalData.ck){
  resolve(true)
}else{
  
  reject(false)
}
  })
}
//必须在这里暴露接口，以便被外界访问，不然就不能访问
module.exports = {
  getUserOpenid: getUserOpenid,
  getUserInformation: getUserInformation,
  getUsersInfo: getUsersInfo,
  getFileSystemManager: getFileSystemManager,
  getUserFiled: getUserFiled,
  userCK:userCK
}