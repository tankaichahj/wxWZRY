var util = require('./user')
var app = getApp()
async function downloadDataSet(sets) {
  const promises = sets.map(async set => {
		let data = await util.getUsersInfo(set);
		//存到全局变量中
		app.globalData[set] = data;
		//输出
    return { [set]: data };
  });
  return Promise.all(promises);
}

module.exports = {
	downloadDataSet: downloadDataSet
}