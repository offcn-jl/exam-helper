// pages/code-2021-ghfls/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"央行万事通",// 标题
    banner_bk:"http://jl.offcn.com/zg/ty/images/exam-helper/pic/2022-code-skbkzlz-index.jpg?1",// 背景图片
    imageUrl:"http://jl.offcn.com/zg/ty/images/exam-helper/pic/2022-code-skbkzlz-share.jpg",// 分享时显示的图片

    CRMEFSID: "09c2f406db856be69911d1dbdf7d3bc8", // CRM 活动表单 ID
    CRMRemark: "活动编码:HD202110080245,活动表单ID:101198", // CRM 注释  网站专题页-2022人民银行报名专题

    suffix:'', //后缀
    pupop: false, //控制弹窗隐现
    imgalist:[
      "http://jl.offcn.com/zt/ty/2021images/exam-helper/2021-yhwst-code.png"//二维码
    ],
  },
  // 注册（录入crm数据）
  buttonStart: function (e) {
    getApp().methods.register(e, this.data.suffix, this.data.CRMEFSID, this.data.CRMRemark, phone => {
      this.setData({ phone })
    })
  },
  // 点击扫码进群，弹窗
  consult(){this.setData({pupop: true})},
  close(){this.setData({pupop: false})},
  keep(){
    wx.previewImage({ 
      current: this.data.imgalist[0], // 当前显示图片的http链接 
      urls: this.data.imgalist, // 需要预览的图片http链接列表 
    }) 
  },
  // 复制
  copy(){
    wx.setClipboardData({
      data: 'jlyhoffcn001',
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断是否是单页模式 toto 这里要结合登陆使用
    if (wx.getLaunchOptionsSync().scene !== 1154) {
      getApp().methods.login(this.data.CRMEFSID, this.data.suffix, this.data.CRMRemark, phone => this.setData({ phone })) // 登录
    }
    console.log(options)
    this.setData({
      suffix:options.scene
    })
    // 动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      imageUrl: this.data.imageUrl,
    }
  },
  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: this.data.title,
    }
  }
})