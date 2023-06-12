/*
该js功能：
1：获取用户openid 
2：获取用户个人信息  
3：获取某个集合的信息 
4：将图片转换成能上传的格式
5：查询某个集合某个字段的值
6: 上传文件到云存储
7: 上传数据到数据库
8：更新数据库集合某个数据
9: 更新数据库集合某个数据的字段值（待写）
10：通过fileID从云存储下载东西
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
//2 查询用户信息函数(是否注册)
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
        //存在用户
        if (res.result.data.length === 1) {
          app.globalData.user = res.result.data[0]
          app.globalData.ck = true
          resolve(true)
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
/**
 * 
 * @param {*} set 所查的数据集合 
 */
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
      success: (res) => {

        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })

}
/**
 * 
 * @param {*} set 所查的数据库
 * @param {*} field 所查的字段
 * @param {*} value 所查的值
 */
//5 数据库查询操作
function getUserFiled(set, field, value) {
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
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// 6 上传头像到云存储
/**
 * 
 * @param {*} data 转码后的图片
 * @param {*} imageSrc 转码前的图片
 * @param {*} upPath 上传路径
 */
function uploadPhoto(data, imageSrc, upPath) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'uploadPhoto',
      data: {
        file: data, // 转码后的照片
        F: imageSrc, //原图片路径，用于获取图片格式
        openid: app.globalData.openid, //用户
        upPath: upPath //上传路径

      },
      success: (res) => { //返回图片的 、fileID、openid ，便于上传云数据库
        let data = {
          fileID: res.result.fileID,
          openid: app.globalData.openid
        }

        resolve(data)
      },
      fail: (err) => {
        reject("上传失败:" + err)
      }
    })
  })
}
/**
 * 
 * @param {*} set 集合名字
 * @param {*} data 所上传的数据
 */
// 7 上传数据到数据库
function insertData(set, data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'getDatabaseUser',
      data: {
        jihe: set,
        action: 'insert', // 操作类型为插入        
        value: data, // 要更新的数据
      },
      success: (res) => {
        app.globalData.ck = true
        resolve(true)
      },
      fail: (err) => {
        reject(false)
      }
    })
  })
}
//8 更新数据库集合某个数据
/**
 * @param {string} set - 所更新的数据所在集合
 * @param data - 所更新的数据
 * @param id - 所更新数据的id
 */
function upData(set, data, id) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'getDatabaseUser',
      data: {
        jihe: set,
        action: 'update', // 操作类型为更新
        id: id,
        data: data, // 要更新的数据
      },
      success: (res) => {
        resolve(true, res)
      },
      fail: (err) => {
        reject(false, err)
      }
    })
  })
}
// 9: 更新数据库集合某个数据的字段值（待写）
// 10：通过fileID从云存储下载东西
function getCloudImage(filedIDs) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'downloadFiles',
      data: {
        fileids: filedIDs
      },
      success: (res) => {
        const imageHttp = res.result
        
        // for (let i = 0; i < res.result.length; i++) {
        //   const res = this.getImageInfoPromisified(res.result[i].tempFileURL)
        //   image.push(res)
        // }
        console.log(imageHttp)
        resolve(imageHttp)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
//11 把图片网络连接变成本地链接
function getImageInfoPromisified(src) {
  return Promise((resolve, reject) => {
    wx.getImageInfo({
      src: src,
      success: resolve,
      fail: reject
    })
  })
}
//必须在这里暴露接口，以便被外界访问，不然就不能访问
module.exports = {
  getUserOpenid: getUserOpenid,
  getUserInformation: getUserInformation,
  getUsersInfo: getUsersInfo,
  getFileSystemManager: getFileSystemManager,
  getUserFiled: getUserFiled,
  uploadPhoto: uploadPhoto,
  insertData: insertData,
  upData: upData,
  getCloudImage: getCloudImage,
  getImageInfoPromisified: getImageInfoPromisified
}