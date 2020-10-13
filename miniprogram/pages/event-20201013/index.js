// pages/event-20201013/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Suffix: "", // 后缀
    SinglePageMode: false, // 单页模式打开
    OCCList: [] // 直播课程列表
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
    // 判断是否是单页模式
    if (wx.getLaunchOptionsSync().scene === 1154) {
      this.setData({
        SinglePageMode: true
      })
    }
    // 获取直播列表 
    wx.cloud.database().collection('OCCList2020GK').where({Disabled:false}).get({
      success: res => {
        res.data.forEach((value, index)=>{
          res.data[index].TimeString = value.Time.getDate() + '日' + value.Time.getHours() + ":" + value.Time.getMinutes()
        })
        this.setData({
          OCCList: res.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询直播列表失败'
        })
      }
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
      title: '2021国考备考指南',
      imageUrl: 'http://jl.offcn.com/zg/ty/images/exam-helper/event/2020/1013/share.jpg'
    }
  },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: '2021国考备考指南汇总'
    }
  }
})