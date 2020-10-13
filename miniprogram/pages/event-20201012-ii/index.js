// pages/zyseach/zyseach.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true,
    bgcolor:'',
    xueliList: [{
      "id": "3_1",
      "text": "研究生"
    }, {
      "id": "3_2",
      "text": "本科"
    }, {
      "id": "3_3",
      "text": "专科"
    }],
    xuelivalue: '',
    majorvalue: '',
    inputactive:false,
    result:[],
    noresult:true,
    isLogin: false, // 是否登陆
    Suffix: "", // 后缀
    SinglePageMode: false, // 单页模式打开
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
  },

  // 输入专业
  zysearchInput(e){
    if(e.detail.value!=''){
      this.setData({
        majorvalue:e.detail.value,
        inputactive:true
      })
    }else{
      this.setData({
        majorvalue:e.detail.value,
        inputactive:false
      })
    }
  },

  // 复制按钮
  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              icon:"none",
              title: '所属专业大类已复制'
            })
          }
        })
      }
    })
  },

  // 登陆
  buttonStart: function (e) {
    // 判断是否授权使用手机号
    if (e.detail.errMsg !== 'getPhoneNumber:ok') {
      app.methods.handleError({
        err: e.detail.errMsg,
        title: "出错啦",
        content: "需要您使用手机号码进行登陆后才可进行领取～"
      })
      return
    }

    // 弹出 Loading
    wx.showLoading({
      title: '登陆中...',
      mask: true
    })

    // 提交数据
    wx.cloud.callFunction({
      name: 'event-20201012-ii-sign-up',
      data: {
        Environment: app.globalData.configs.environment,
        Suffix: this.data.Suffix,
        cloudID: wx.cloud.CloudID(e.detail.cloudID)
      },
      success: res => {
        if (res.errMsg === "cloud.callFunction:ok" && res.result.code === 0) {
          // 执行查询
          this.seach_result()
          // 保存登陆状态
          this.setData({
            isLogin: true
          })
        } else {
          app.methods.handleError({
            err: res.result.error,
            title: "出错啦",
            content: res.result.error
          })
        }
        wx.hideLoading() // 隐藏 loading
      },
      fail: err => {
        app.methods.handleError({
          err: err,
          title: "出错啦",
          content: "调用云函数出错"
        })
        wx.hideLoading() // 隐藏 loading
      }
    })
  },

  // 搜索
  async seach_result(){
    if (this.data.xuelivalue == "") {
      wx.showToast({
        title: '先选择学历',
        icon: 'none'
      })
      return;
    }
    if (this.data.majorvalue == "") {
      wx.showToast({
        title: '先请填写专业',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({ title: '查询中' })
    const clound_result = await wx.cloud.callFunction({
      name: 'event-20201012-ii-search',
      data: {
        data_xueli: this.data.xuelivalue,
        data_major: this.data.majorvalue
      }
    })
    if(clound_result.result.data.length>0){
       wx.hideLoading()
       this.setData({
        result:clound_result.result.data
      })
    }else{
       wx.hideLoading()
       this.setData({
        noresult:false
      })
    }
  },

  // 选择学历
  m_select_touch(e) {
    let that = this;
    let selectIndex = e.detail.selIndex;
    let stype = e.detail.stype;
    if (stype == "3") {
      let value3 = that.data.xueliList[selectIndex];
      that.setData({
        xuelivalue: value3.text
      })
    } 
  },

  // 在页面发生滚动时，计算是否需要切换标题栏样式
  onPageScroll: function (t) {
    if (t.scrollTop >= app.globalData.titleBarHeight) {
      this.setData({ bgcolor: "#d32423" })
    } else {
      this.setData({ bgcolor: "" })
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
      title: '国考专业分类查询',
    }
  },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: '2021国考专业分类查询'
    }
  }
})