Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPop: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    wx.showLoading({
      title: "查询授权信息",
      icon: "success",
    });
    const privacySettingRes = await this.getPrivacySetting();
    console.log("privacySettingRes :>> ", privacySettingRes);
    this.setData({
      showPop: privacySettingRes.needAuthorization,
    });
    if(!privacySettingRes.needAuthorization){
      setTimeout(() => {
        wx.showToast({
          title: "同意过授权",
          icon: "success",
        });
        setTimeout(function() {
          wx.navigateTo({
            url: '../info/info',
          })
        }, 1000);
      }, 1000);
      
    }
  },

  /**
   * 按钮点击回调
   */
  popBtnTap(res) {
    console.log("授权结果返回数据 :>> ", res);
    console.log("授权结果 :>> ", res.detail);
    if (res.detail.result) {
      wx.showToast({
        title: "同意授权",
        icon: "success",
      });
      setTimeout(function() {
        wx.navigateTo({
          url: '../info/info',
        })
      }, 1000);
      
    } else {
      wx.showToast({
        title: "拒绝授权",
        icon: "error",
      });
      setTimeout(() => {
        wx.exitMiniProgram()
      }, 1000);
    }
  },

  /**
   * 获取隐私协议授权信息
   * @returns {object} {needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》'}
   */
  getPrivacySetting() {
    const res = {
      needAuthorization: false,
      privacyContractName: "基础库过低，不需要授权",
    };
    if (!wx.getPrivacySetting) return res;
    return new Promise((resolve, reject) => {
      wx.getPrivacySetting({
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },
});
