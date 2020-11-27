// pages/event-20201023/view/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Suffix: "", // 后缀
    detail: null, // 图片列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取后缀
    if (typeof options.scene !== "undefined") {
      this.setData({
        Suffix: options.scene
      })
    }

    const _this = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('pushDetail', function(detail) {
      _this.setData({
        detail: detail
      })
      wx.setNavigationBarTitle({
        title: detail.Title
      })
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
      title: '资料补给站',
      path: "/pages/event-20201023/index?scene="+this.data.Suffix,
      imageUrl: 'http://jl.offcn.com/zg/ty/images/exam-helper/event/2020/1023/share.jpg'
    }
  }
})