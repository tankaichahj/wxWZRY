// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const jihe = event.jihe
  const collection = db.collection(jihe);
  // 获取操作类型和参数
  const action = event.action;//操作类型
  const field = event.field;//字段
  const value = event.value;//值
  
  let result;

  try {
    if (action === 'query') {
      // 查询数据
      result = await collection.where({
        [field]: value
      }).get();
    } else if (action === 'insert') {
      // 插入数据
      result = await collection.add({
         data:[value]
      });
    } else if (action === 'update') {
      // 更新数据
      result = await collection.doc(event.id).update({
        data: event.data
      });
    } else if (action === 'delete') {
      // 删除数据
      result = await collection.doc(event.id).remove();
    } else if (action === 'get'){
      //获取所有数据
      result =await collection.get()
    }
  } catch (e) {
    console.error(e);
  }

  return result;
};