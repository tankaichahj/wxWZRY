// pages/index/mogul/detailedInformation/detailedInformation.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // information: {
    //   info: "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG_20210601_134645.jpg?sign=2760390c79036007434c264872cc6d9a&t=1686708496",
    //   name: "谈凯", //姓名
    //   sex: "男", //性别
    //   grade: "2017级", //年级
    //   speciality: "信息与计算科学", //专业
    //   college: "理学院", //学院
    //   school: "安徽农业大学",
    //   honor: ["安徽农业大学跳高校记录保持者", "安徽省跳高冠军", "全国大学生田径锦标赛跳高第四名", "安农大跳高队队长"], //荣誉
    //   box: [{
    //     image: ["https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/QQ%E5%9B%BE%E7%89%8720221010231835.jpg?sign=94362d1b2605eeb56a2b73da3b31b968&t=1686708079", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG20220331121119.jpg?sign=e3c63807dfeb50420ec6cba9b21951e3&t=1686708093", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG20220331120644.jpg?sign=6ab7bfba8f073d4c4fe00cd5db53265a&t=1686708119", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG20220331120713.jpg?sign=495c591037b42ebdc04a79febab93787&t=1686708197", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG20220331120656.jpg?sign=88980a548d6afe42970049487e79c25d&t=1686708261", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG20220331120629.jpg?sign=388c6160b6075417383a2050d5c0c0a7&t=1686708421"], //图片
    //     text: ["大学苦练跳高，打破校记录，成为国家跳高二级运动员，获得安徽省甲组跳高冠军，在全国大学生田径锦标赛赛中获得第四名，全国农业高校田径比赛跳高第二名。", "副项跳远，获得安徽省甲组跳远第三。"], //文本
    //   }, {
    //     image: ["http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo2.jpg", "http://static.runoob.com/images/demo/demo3.jpg", ], //图片
    //     text: ["大学开始接触现代折纸，", "大叔大婶大所大所大所大所打算 阿萨德阿萨德阿萨德阿萨德A式"], //文本
    //   }, {
    //     image: ["http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo2.jpg", "http://static.runoob.com/images/demo/demo3.jpg", ], //图片
    //     text: ["33大叔大婶大所大所大所大所打算 阿萨德阿萨德阿萨德阿萨德A式", "大叔大婶大所大所大所大所打算 阿萨德阿萨德阿萨德阿萨德A式"], //文本
    //   }]
    // }
  },
  previewImage(e) {
    console.log(e)
    const information=this.data.information
    for(let i=0;i<information.box.length;i++){
      for(let j=0;j<information.box[i].image.length;j++){
        if(information.box[i].image[j]== e.target.id){
          var urls = information.box[i].image
        }
      }
    }
    wx.previewImage({
      urls: urls,
      current: e.target.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var information =app.globalData.moguls[options.id].Information
    console.log(app.globalData.moguls)
    this.setData({
      information:information
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})