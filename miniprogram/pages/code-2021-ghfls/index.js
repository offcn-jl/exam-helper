// pages/code-2021-ghfls/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"行测申论干货福利社",// 标题
    banner_bk:"http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/2021-code-ghfls-index.jpg",// 背景图片
    imageUrl:"http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/2021-code-ghfls-share.jpg",// 分享时显示的图片

    suffix:'cBlzJ8', //后缀  通过后缀不同，变化不同二维码咨询
    // （初步设置没有对应二维码的后缀放置省级二维码）
    imgalist:[
      "http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/2021code/cBlzJ8.jpg"
    ],
    // 判断后缀与列表中后缀一致，才有二维码，其余后缀显示省级二维码（宣传方面只有这几个地市后缀，添加此功能是为了预防突发状况）
    codelist:["cBlzJ8","9796eU","b2ieZX","bpnm3","ck7M6r","cuAqQy","diBhaY","diGS6l","div7rM","dj42Px","djmVpr","dkIirz","dkjX8p","dkqacJ","dllDKK","dmx5Wy","eBbq26","eFPq6C","eGjREK","eynAg3","eyUz7F","ezbVb2","ezy7Tp","fE534Q","fEEFDi","fnVYBH","gWw8tb","gX25cd","h17IWN","hO0ywi","hsQVxb","ht54zE","htGlHB","hvEtbX","lX5VoC"]
  },

 /** 
  * 预览图片 
  */
 previewImage: function (e) { 
  var current=e.target.dataset.src; 
  wx.previewImage({ 
   current: current, // 当前显示图片的http链接 
   urls: this.data.imgalist // 需要预览的图片http链接列表 
  }) 
 } ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取后缀
    if (typeof options.scene !== "undefined") {
      // 判断后缀是否对应（宣传方面只有这几个地市后缀，添加此功能是为了预防突发状况）
      // 如果后缀不对应(即后缀在表里位置为负数)，显示省级后缀
      if(this.data.codelist.indexOf(options.scene)<0){
        options.scene = "cBlzJ8"
      }
      this.setData({
        suffix: options.scene,
        "imgalist[0]":"http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/2021code/"+options.scene+".jpg"
      })
    }
    // 动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: this.data.title
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