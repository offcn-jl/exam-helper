// pages/code-2021-ghfls/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"行测申论干货福利社",// 标题
    imageUrl:"http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/2021-gwjz-rmyh-share.jpg",// 分享时显示的图片

    QRcode:false,  //二维码是否弹窗   真-现  假-隐
    suffix:'' //后缀  通过后缀不同，变化不同二维码咨询
  },
  //点击弹出二维码部分内容
  QRcode() {  
    this.setData({
      QRcode: true
    })
  },
  // 关闭二维码部分内容
  close(){
    this.setData({
      QRcode: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 获取后缀
    if (typeof options.scene !== "undefined") {
      this.setData({
        suffix: options.scene
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