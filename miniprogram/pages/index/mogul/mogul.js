// pages/index/mogul/mogul.js
var app = getApp()
// var util = require('../../utils/user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    administrators:true,
    moguls: [{
      image: 'https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG_20210601_134645.jpg?sign=2760390c79036007434c264872cc6d9a&t=1686708496',
      text: "谈凯",
      openid: 1,
      Information: {
        info: "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG_20210601_134645.jpg?sign=2760390c79036007434c264872cc6d9a&t=1686708496",
        name: "谈凯", //姓名
        sex: "男", //性别
        grade: "2017级", //年级
        speciality: "信息与计算科学", //专业
        college: "理学院", //学院
        school: "安徽农业大学",
        honor: ["安徽农业大学跳高校记录保持者", "安徽省跳高冠军", "全国大学生田径锦标赛跳高第四名", "安农大跳高队队长"], //荣誉
        box: [{
          image: ["https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/QQ%E5%9B%BE%E7%89%8720221010231835.jpg?sign=94362d1b2605eeb56a2b73da3b31b968&t=1686708079", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG20220331121119.jpg?sign=e3c63807dfeb50420ec6cba9b21951e3&t=1686708093", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG20220331120644.jpg?sign=6ab7bfba8f073d4c4fe00cd5db53265a&t=1686708119", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG20220331120713.jpg?sign=495c591037b42ebdc04a79febab93787&t=1686708197", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG20220331120656.jpg?sign=88980a548d6afe42970049487e79c25d&t=1686708261", "https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/IMG20220331120629.jpg?sign=388c6160b6075417383a2050d5c0c0a7&t=1686708421"], //图片
          text: ["大学苦练跳高，打破校记录，成为国家跳高二级运动员，获得安徽省甲组跳高冠军，在全国大学生田径锦标赛赛中获得第四名，全国农业高校田径比赛跳高第二名。", "副项跳远，获得安徽省甲组跳远第三。"], //文本
        }, {
          image: ["http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo2.jpg", "http://static.runoob.com/images/demo/demo3.jpg"], //图片
          text: ["大学开始接触现代折纸，", "大叔大婶大所大所大所大所打算 阿萨德阿萨德阿萨德阿萨德A式"], //文本
        }, {
          image: ["http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo1.jpg", "http://static.runoob.com/images/demo/demo2.jpg", "http://static.runoob.com/images/demo/demo3.jpg"], //图片
          text: ["33大叔大婶大所大所大所大所打算 阿萨德阿萨德阿萨德阿萨德A式", "大叔大婶大所大所大所大所打算 阿萨德阿萨德阿萨德阿萨德A式"], //文本
        }]
      }
    }, {
      image: 'https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/QQ%E5%9B%BE%E7%89%8720230614103121.jpg?sign=9755ffabc3acdb88e55ecd2540f9862e&t=1686709916',
      text: "康子龙",
      openid: 2,
      Information: {
        info:'https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/QQ%E5%9B%BE%E7%89%8720230614103121.jpg?sign=9755ffabc3acdb88e55ecd2540f9862e&t=1686709916',
        name: "康子龙", //姓名
        sex: "男", //性别
        grade: "2019", //年级
        speciality: "林学", //专业
        college: "林学与园林学院", //学院
        school: "哈尔滨体育学院",
        honor: ["大学生网球联赛合肥站男单第三名", "安徽省运会网球比赛体育道德风尚奖", "考研初试总分424", "安农网球校队队长"], //荣誉
     box:[{
       image:["https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/193041E8EBC94D3D84F9FEF3E7FB2B79.jpg?sign=095ea39b7cae851fbd6e20f25601a823&t=1686725003","https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/968D8EE4EB1A03E67BB2AA8D6FCD6E35.jpg?sign=1d55518ffa4692d0f34222ff09ecc3b8&t=1686724989","https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/495BA9072A16C7F3AB4BBE10601C79CD.jpg?sign=84226de90552b590894c83834f365726&t=1686724969","https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/8D44FE991C6B19CF1D14511D47BCC830.jpg?sign=699bec0e94d6fab858e8fb37859ad3aa&t=1686724951","https://777a-wzry-7g7trrdib0f75ba2-1316380780.tcb.qcloud.la/mogul/2F5FD6AB5F258F242F87662DCDF63349.jpg?sign=3dac4d32ccf83b365298eaa0564923b5&t=1686724936"],
       text:["个人评价:","康康为人善良，待人真诚，话少人好，十分容易相处，被公认为安农大佬队的大王。","情感状态:","单身未婚"]
     }]
      }
    }]
  },
  bind(e) {
    app.globalData.moguls=this.data.moguls
    const key = e.currentTarget.id 
    const moguls =this.data.moguls
    for(let i=0;i<moguls.length;i++){
      if(moguls[i].openid == key){
       var id =i
       
      }
    }
    wx.navigateTo({
      url: `./detailedInformation/detailedInformation?id=${id}`,
    })

  },
  buttonBind(){
    wx.navigateTo({
      url: '../../edit/editMogul/editMogul',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoaD(options) {
    

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