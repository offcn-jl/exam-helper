Page({
  data: {
    title:"2021吉林中烟工业职位匹配查询",// 标题
    banner_bk:"http://jl.offcn.com/zt/ty/2021images/exam-helper/2021-zwpp-jlzy-index.jpg",// 背景图片
    imageUrl:"http://jl.offcn.com/zt/ty/2021images/exam-helper/2021-zwpp-jlzy-share.jpg",// 分享时显示的图片
    CRMEFSID: "93e338733ee77819e89212e24ecb7cad", // CRM 活动表单 ID
    CRMRemark: "活动编码:HD202110220350,活动表单ID:103285", // CRM 注释  网站专题页-2021吉林中烟工业职位匹配查询
    actid:"43629", //zg99id  2021吉林中烟工业职位匹配查询

    bumenList:["公司技术研发中心","公司审计部","延吉卷烟厂","长春卷烟厂"], //部门
    majorList: ["安全工程","财务管理","电气工程及自动化","电气信息工程","电子信息工程","法律","工商管理","公共安全管理等","国际经济与贸易","国际贸易","会计","会计学","机电一体化工程","机械电子工程","机械工程","机械工程及自动化","机械设计制造及自动化","计算机科学等","建筑学","金融","金融学","经济学","暖通等","企业管理","人力资源管理","统计","文秘","物流工程","香料香精技术与工程","新闻","造价工程","中文"],//专业类别
    xueliList:["本科","专科"], //学历

    bumenValue:'', //部门
    majorValue: '', //专业类别
    xueliValue:'', //学历

    suffix: "", // 后缀
    phone: "", // 用户手机号码
    tipsToSubscribeMessaged: true, // 是否提示过进行消息订阅
  },

  // 监听筛选条件切换
  m_select_touch(e) {
    switch (e.detail.type) {
      case "bumen": // 部门
        this.setData({ bumenValue: this.data.bumenList[e.detail.index] })
        break
      case "xueli": // 学历
        this.setData({ xueliValue: this.data.xueliList[e.detail.index] })
        break
    }
  },
  m_selectSearch_touch(e) {
    this.setData({
      majorValue: e.detail.text
    })
  },

  // 搜索
  async seach_result() {
    let url = "result/index?scene=" + this.data.suffix
    if (this.data.bumenValue !== "") url += "&bumen=" + this.data.bumenValue
    if (this.data.xueliValue !== "") url += "&xueli=" + this.data.xueliValue
    if (this.data.majorValue !== "") url += "&major=" + this.data.majorValue
    console.log(url)
    wx.reLaunch({ url })
  },

  // 注册（录入crm数据）
  buttonStart: function (e) {
    getApp().methods.register(e, this.data.suffix, this.data.CRMEFSID, this.data.CRMRemark, phone => {
      this.setData({ phone })
      wx.showModal({ title: '提示', content: '注册成功，请您点击“点击查询”按钮进行查询～', showCancel: false, confirmText: "我知道啦" })
    })
  },

  // 提示订阅消息推送
  tipsToSubscribeMessage() {
    let _this = this
    if (!_this.data.tipsToSubscribeMessaged) {
      _this.setData({ tipsToSubscribeMessaged: true })
      wx.showModal({
        title: '提示',
        content: '您是否需要订阅“事业单位”考试公告？订阅成功后您可以在公告发布时免费获得推送提示～',
        confirmText: "免费订阅",
        success(res) {
          if (res.confirm) {
            getApp().methods.subscribeSingleExam(_this.data.suffix, "事业单位", undefined, () => {
              _this.seach_result() // 订阅成功后执行查询
            })
          } else if (res.cancel) {
            _this.seach_result() // 执行查询
          }
        }
      })
    } else {
      _this.seach_result() // 执行查询
    }
  },

  /**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    // 获取后缀
    if (typeof options.scene !== "undefined") {
      this.setData({
        suffix: options.scene
      })
    }
    // 判断是否是单页模式 toto 这里要结合登陆使用
    if (wx.getLaunchOptionsSync().scene !== 1154) {
      getApp().methods.login(this.data.CRMEFSID, this.data.suffix, this.data.CRMRemark, phone => this.setData({ phone })) // 登陆
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
  onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
  onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
  onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
  onReachBottom: function () {},

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
