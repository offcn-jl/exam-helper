const CONFIG = require('../bargain');   // 调取zg99表中数据的链接
Page({
  data: {
    CRMEFSID: "6718b04c16c0961ef5148761b514a3ac ",       // CRM 活动表单 ID
    CRMRemark: "活动编码:HD202109011712,活动表单ID:98241", // CRM 注释 小程序-国考模拟卷测评助力
    
    title:"助力-2022国考模拟试卷",// 标题
    suffix: "", // 后缀
    phone: "", // 用户手机号码
    spid:1, // 商品id
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
        wx.navigateTo({
          url: "../bargain/index?scene=" + this.data.suffix + "&phone=" + this.data.phone + "&spid=" + this.data.spid
        })
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
