const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

exports.main = async (event, context) => {
  try {
    const { file, upPath,F ,name} = event // 解构赋值简化代码
    const fileSuffix = getFileSuffix(F) // 获取文件后缀名

    let fileID
    if (fileSuffix === 'png') {
      // 如果是 png 格式，调用 uploadPNGFile 方法上传
      fileID = await uploadPNGFile(cloud, file, upPath,name)
    } else if (fileSuffix === 'jpg' || fileSuffix === 'jpeg') {
      // 如果是 jpg/jpeg 格式，调用 uploadJPGFile 方法上传
      fileID = await uploadJPGFile(cloud, file, upPath, name)
    } else {
      throw new Error('不支持的文件格式') // 抛出异常
    }

    // 将 fileID 存储到数据库
    return { fileID }
  } catch (err) {
    console.log(err)
    return { err: err }
  }
}

/**
 * 获取文件后缀名
 * @param {string} fileName - 文件名
 * @returns {string} 文件后缀名
 */
function getFileSuffix(fileName) {
  return fileName.split('.').pop()
}

/**
 * 上传 png 文件
 * @param {object} cloud - wx-server-sdk 实例
 * @param {string} file - 上传的文件内容
 * @param {string} upPath - 上传到云存储的路径
 * @param {string} name - 用户 openid
 * @returns {string} 文件 ID
 */
async function uploadPNGFile(cloud, file, upPath,name) {
  const res = await cloud.uploadFile({
    cloudPath: `${upPath}/${name}.png`, // 上传到云存储的路径和文件名
    fileContent: Buffer.from(file, 'base64'), // 文件内容
  })
  return res.fileID // 上传成功后返回的文件 ID
}

/**
 * 上传 jpg/jpeg 文件
 * @param {object} cloud - wx-server-sdk 实例
 * @param {string} file - 上传的文件内容
 * @param {string} upPath - 上传到云存储的路径
 * @param {string} name - 文件名
 * @returns {string} 文件 ID
 */
async function uploadJPGFile(cloud, file, upPath, name) {
  const res = await cloud.uploadFile({
    cloudPath: `${upPath}/${name}.jpg`, // 上传到云存储的路径和文件名
    fileContent:Buffer.from(file, 'base64'), // 文件内容
  })
  return res.fileID // 上传成功后返回的文件 ID
}
