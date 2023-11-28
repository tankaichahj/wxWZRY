	/**
	 * 1:判断数组对象是否为空[{},{[]}]
	 * 2:输出时间
	 * 3:去除字符串的符号
	 */

	 /**
		* 1:判断数组对象是否为空  可判断[{},{[]}]
		* @param  data 
		*/
	function objecAtrtIsEmpty(data) {
		// 如果是数组，遍历数组里面的
		if (Array.isArray(data)) {
			if (data.length == 0) return false;
			return data.every(el => {
				return objecAtrtIsEmpty(el);
			});
			// 非空数组
		} else if (Object.prototype.toString.call(data) === "[object Object]" && JSON.stringify(data) !== '{}') {

			//对象or对象数组
			return Object.keys(data).every(key => {
				// 如果对象子元素为数组
				if (Array.isArray(data[key])) {
					if (data[key].length == 0) return false;
					return data[key].every(el => {
						return objecAtrtIsEmpty(el);
					});
				} else if (Object.prototype.toString.call(data) === "[object Object]") {
					// 如果0表示不为空的话可以直接用!data
					// 直接用!data,非运算符的话有些值为0的话会被过滤掉
					return data[key] != "" && data[key] != null && data[key] != undefined;
				} else {
					return key != "" && key != null && key != undefined;
				}
			});
		} else if (Object.prototype.toString.call(data) === "[object Object]" && JSON.stringify(data) === '{}') {
			return false;
		} else {
			// 处理单个值
			return data != "" && data != null && data != undefined;
		}
	}
/**
 * 
 * @param {*} date  获取时间   new Date()
 */
	function formatTime(date) {
		var year = date.getFullYear()
		var month = date.getMonth() + 1
		var day = date.getDate()
		var hour = date.getHours()
		var minute = date.getMinutes()
		var second = date.getSeconds()

		return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
	}

	function formatNumber(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}
/**
 * 去除符号 [\/: ]，[]里的相匹配的都会被“”里的所替代
 * @param {String} str 
 */
	function stringStripSymbol(str) {
		const dateTimeString = formatTime(new Date())
		const strippedString = dateTimeString.replace(/[\/: ]/g, "");
		return strippedString
	}

	module.exports = {
		objecAtrtIsEmpty: objecAtrtIsEmpty,
		formatTime: formatTime,
		stringStripSymbol:stringStripSymbol
	}