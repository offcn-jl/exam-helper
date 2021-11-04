const app = getApp()

Page({
  data: {
    bgcolor: '',
    result: [],
    showId: -1,
    Suffix: "", // 后缀
  },

  onLoad: function (options) {
    // 获取职位列表
    this.setData({
      result: wx.getStorageSync('PositionList2020JL')
    })
    console.log(this.data.result)
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
  onPageScroll: function (t) {
    if (t.scrollTop >= app.globalData.titleBarHeight) {
      this.setData({ bgcolor: "#f45b31" })
    } else {
      this.setData({ bgcolor: "" })
    }
  },

  more: function (event) {
    this.setData({
      showId: event.currentTarget.dataset.index
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '2022省考历年分数线查询',
      path: "/pages/sk-2022-lnfs/index?scene="+this.data.Suffix,
      imageUrl: 'http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/sk-2022-lnfs-share.jpg'
    }
  },
})