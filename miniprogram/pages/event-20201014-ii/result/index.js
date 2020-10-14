const app = getApp()

Page({
  data: {
    showIcon: true,
    bgcolor: '',
    result: [],
    showId: -1
  },

  onLoad: function (options) {
    // 获取职位列表
    this.setData({
      result: wx.getStorageSync('PositionList2020GK')
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
  }
})