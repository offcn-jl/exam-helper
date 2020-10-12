Page({
  /**
   * 页面的初始数据
   */
  data: {
    Suffix: "", //后缀
    bgImage: "http://jl.offcn.com/zg/ty/images/exam-helper/photo-processing/2020-gk-index.jpg", // 首页背景图
    Name: "2021 国考", // 公告 ( 考试 ) 名称
    CRMSID: "59c2a22904f67bedc8ad6f2eb15db2f2", // HD202010121468 网站专题页-2021国考新职位检索系统
    Width: "300", // 裁剪框宽度
    Height: "420", // 裁剪框高度
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
    let imageUrl = "http://jl.offcn.com/zg/ty/images/exam-helper/photo-processing/2020-gk-share.jpg"
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
    return {title, imageUrl }
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