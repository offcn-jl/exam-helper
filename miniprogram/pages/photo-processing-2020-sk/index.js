// pages/photo-processing/index.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Suffix: '', //后缀
    bgImage:'http://jl.offcn.com/zg/ty/images/exam-helper/photo-processing/2020-sk-bg.jpg', // 首页背景图
    Name: "2020 吉林省考",
    CRMSID:'6edbf791cfbaaa68442dd75bfd10ae5b', 
    Width:'264', // 裁剪框宽度
    Height:'340',  // 裁剪框高度
    Compress: true, // 开启压缩
    BackgroundColor: "#166c9f", // 照片背景色
    MaxTimes: 10 // 最大使用次数
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

  onShareAppMessage: function () {
    return {
      title: "中公教育 " + this.data.Name + " 照片处理系统 [ " + this.data.Suffix + " ]"
    }
  }
})