
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const fileList = event.fileids
  const result = await cloud.getTempFileURL({
    fileList: fileList,
  })
  return result.fileList
}