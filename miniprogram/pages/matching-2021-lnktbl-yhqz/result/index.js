const app = getApp()

Page({
  data: {
    title:"2022人民银行试题比例查询",// 标题
    imageUrl:"http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/2021-lnktbl-yhqz-share.jpg",// 分享时显示的图片
    superiorLink:"/pages/matching-2021-lnktbl-yhqz/index", //上级链接

    suffix: "", // 后缀
    showId: 0, // 当前显示的元素的 ID
    query:'', // 查询条件
     
    zcounts: 0,//最大数据量
    result: [], // 查询结果
  },

  // 在页面发生滚动时，计算是否需要切换标题栏样式
  onPageScroll: function (e) {
    this.selectComponent('#navigation').swtichNavigation(e)
  },

  // // 可收放数据样式
  // more: function (event) {
  //   this.setData({
  //     showId: event.currentTarget.dataset.index
  //   })
  // },

  // 上拉刷新
  onReachBottom() {
    if (this.data.result.length >= this.data.zcounts) {
      wx.showToast({ title: '没有更多数据啦', icon: 'none' })
      return
    }
    this.search()
  },

  onLoad: function (options) {
    console.log(options)
    // 获取后缀
    if (typeof options.scene !== "undefined") this.setData({ suffix: options.scene })
    // 配置查询条件
    this.setData({ query:options.bank })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: this.data.superiorLink+"?scene=" + this.data.suffix,
      imageUrl: this.data.imageUrl
    }
  },
})