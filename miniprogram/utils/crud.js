// 增删改查
/**
 * 1:图片删除
 * 2:删除集合某个数据
 */

//1、删除照片的函数
/**
@param {Array} fileIDs - 需要删除的照片的fileID数组
@returns {Promise} 返回一个Promise对象，成功时resolve为true，失败时reject为错误原因。 */
function deletePhoto(fileIDs) {
	// 调用微信小程序API，删除指定fileID的照片
	return new Promise((resolve, reject) => {
		wx.cloud.deleteFile({
			fileList: fileIDs,
			success: function () {
				// 删除成功，返回true
				resolve(true)
			},
			fail: function (err) {
				// 删除失败，返回原因
				console.error('Failed to delete photo with fileID ' + fileID + ': ' + err);
				reject(err);
			}
		});
	})
}
//2、删除集合某个数据
/**
 * 删除数据函数
 * @param {string} set - 集合名称
 * @param {string} id - 要删除的数据的ID
 * @returns {Promise<boolean>} - 返回一个Promise对象，成功时解析为true，失败时解析为false
 */
function deleteData(set, id) {
	return new Promise((resolve, reject) => {
		wx.cloud.callFunction({
			name: 'getDatabaseUser',
      data: {
        jihe: set,
        action: 'delete', // 操作类型为更新
        id: id,      
			},
			success: (res) => {
        resolve(true)
			},
			fail: (err) => {
        reject(err)
      }
		})
	})
}
module.exports = {
	deletePhoto: deletePhoto,
	deleteData:deleteData

}