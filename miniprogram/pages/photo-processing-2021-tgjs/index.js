Page({
  /**
   * 页面的初始数据
   */
  data: {
    Suffix: "", //后缀
    bgImage: "http://jl.offcn.com/zg/ty/images/exam-helper/photo-processing/2021-tgjs-index.jpg", // 首页背景图
    shareImage: "http://jl.offcn.com/zg/ty/images/exam-helper/photo-processing/2021-tgjs-share.jpg", // 分享好友的小程序卡片图片
    Name: "2021吉林省特岗教师报名", // 公告 ( 考试 ) 名称
    CRMSID: "fe244d19fef84bb6edc0e46fc39627dc", // HD202104121816    网站专题页-2021年吉林特岗教师笔试六大系统
    Width: "120", // 裁剪框宽度
    Height: "150", // 裁剪框高度
    SaveQuality: 1, // 保存品质 ( 0 ~ 1 )
    DisableZoom: true, // 禁止缩放 ( 放大, 放大后可以提升图片清晰度 )
    Beauty: false, // 开启美颜
    BackgroundColor: "#ffffff", // 照片背景色
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
      title,
      imageUrl: this.data.shareImage
    }
  },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
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