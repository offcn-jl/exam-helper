const CONFIG = require('../bargain');   // 调取zg99表中数据的链接
Page({
  data: {
    CRMEFSID: "6718b04c16c0961ef5148761b514a3ac ",       // CRM 活动表单 ID
    CRMRemark: "活动编码:HD202109011712,活动表单ID:98241", // CRM 注释 小程序-国考模拟卷测评助力
    
    title:"助力-2022国考模拟试卷",// 标题
    suffix: "", // 后缀
    phone: "", // 用户手机号码
    spid:2, // 商品id
  },
  // 注册
  buttonStart: function (e) {
    getApp().methods.register(e, this.data.suffix, this.data.CRMEFSID, this.data.CRMRemark, phone => {
      this.setData({ phone })
      this.getUserProfile()
    })
  },
  // 点击领取
  getUserProfile(res) {
    // 点击时录入zg99表单中，成功后跳转到邀请页面
    wx.request({
      url: CONFIG.registAPI,
      data: {
        phone: this.data.phone,
      },
      success: res => {
        this.writeyqAPI()
      }
    });
  },
  // 录入邀请表 writeyqAPI
  writeyqAPI(){
    wx.request({                                      // 网络请求
      url: CONFIG.writeyqAPI,                         // 写入邀请列表
      data: {
        phone: this.data.phone,                       // 手机号
        spid: this.data.spid,                         // 获取spid
        sstime: Math.round(new Date() / 1000),        // 时间
      },
      success: res => {
        let text = res.data;
        let result_text = text.substring(1, text.length - 1);
        let result = JSON.parse(result_text);          // json转换为字符串数组
        console.log(result)
        if (result.status == 1 || result.status == 2) {
          wx.navigateTo({
            url: "../bargain/index?scene=" + this.data.suffix + "&phone=" + this.data.phone + "&spid=" + this.data.spid
          })
        } else {
          wx.showToast({
            title: result.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    });
  },
  /**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: async function (options) {
    // 获取后缀
    if (typeof options.scene !== "undefined") {
      this.setData({
        suffix: options.scene
      })
    }
    // 判断是否是单页模式 toto 这里要结合登陆使用
    if (wx.getLaunchOptionsSync().scene !== 1154) {
      getApp().methods.login(this.data.CRMEFSID, this.data.suffix, this.data.CRMRemark, phone => this.setData({ phone })) // 登录
    }
  },

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
  onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
  onShow: function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
  onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
  onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
  onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
  onReachBottom: function () {},

  // 第一页，禁止分享
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //   return {
  //     title: this.data.title,
  //     imageUrl: this.data.imageUrl,
  //   }
  // },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  // onShareTimeline: function () {
  //   return {
  //     title: this.data.title,
  //   }
  // }
})
