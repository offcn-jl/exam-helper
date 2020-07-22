Page({
  /**
   * 页面的初始数据
   */
  data: {
    Suffix: "", //后缀
    bgImage: "http://jl.offcn.com/zg/ty/images/exam-helper/photo-processing/2020-szyf-bg.jpg", // 首页背景图
    Name: "2020 三支一扶", // 公告 ( 考试 ) 名称
    CRMSID: "a93931cafc460564bd1368b7550769e5", // HD202006161574 网站专题页-三支一扶照片处理系统
    Width: "340", // 裁剪框宽度
    Height: "450", // 裁剪框高度
    SaveQuality: 1, // 保存品质 ( 0 ~ 1 )
    DisableZoom: true, // 禁止缩放 ( 放大, 放大后可以提升图片清晰度 )
    Beauty: false, // 开启美颜
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
    // 设置页面的标题
    if (this.data.Name !== "") {
      wx.setNavigationBarTitle({
        title: this.data.Name + "照片处理系统"
      })
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
    let title = "中公教育照片处理系统"
    // 判断是否存在公告名称
    if (this.data.Name !== "") {
      // 向标题中添加公告名称
      title = "中公教育 " + this.data.Name + " 照片处理系统"
    }
    // 判断是否存在后缀
    if (this.data.Suffix !== "") {
      // 向标题中添加后缀
      title += " [ " + this.data.Suffix + " ]"
    }
    return {
      title
    }
  }
})