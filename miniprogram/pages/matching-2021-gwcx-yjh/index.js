// pages/position-2020-jr/index

Page({
  data: {
    title:"2022国考银保监会职位查询",// 标题
    CRMEFSID: "69f633c94d32c6bbbf4cc198e9851a6e ", // CRM 活动表单 ID
    CRMRemark: "活动编码:HD202110111645,活动表单ID:101641", // CRM 注释 网站专题页-2022国考银保监会职位查询

    yearList: ["2021","2020","2019","2018"], // 年份
    cityList: ["北京","天津","上海","重庆","河北","山西","内蒙古","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆"], // 省份
    xlList:["不限","本科","研究生"], //学历
    zmList:["不限","共青团员","中共党员"], //政治面貌
    majorList:     // 专业
    ["经济金融","会计","法律","计算机","理工科","统计","英语","中文","印地语","尼泊尔语","管理","安全保卫","会计或审计学相关专业","人力资源管理或劳动与社会保障专业","土木类或能源动力类相关专业","经济金融专业","人力资源管理","会计学","财务管理","教育学","经济金融及相关专业","新闻及相关专业","市场营销及相关专业","法学/马克思主义理论/政治学/历史学/哲学","动画/平面设计/视觉传达及相关专业","计算机科学与技术","软件工程","电子信息","人工智能","大数据与区块链","电子通信","自动化","信息管理","信息安全","管理科学与工程等计算机相关专业","统计学","数理统计等数据挖掘与统计分析相关专业","管理学专业","信息安全专业","计算机专业","历史","教育技术及相关专业","教育学及相关专业","计算机相关","财务会计","大数据管理","行政管理","档案管理","公共管理专业","会计专业","电子信息工程","信息管理与信息系统","自动化相关专业","经济","金融相关专业","管理学相关专业","印刷工程","制浆造纸工程专业","哲学","新闻等相关专业","公共管理","市场营销","工商管理相关专业。","工程造价","工程管理及管理科学与工程相关专业","设计","中文相关专业","会计学专业","广告学","公共关系学","市场营销学","工商管理专业","金融","管理相关专业","法学相关专业","法律相关","审计专业","计算机相关专业","信息管理专业","审计及社会学相关专业","越南语","考古（历史）","建筑学相关专业","新闻专业","市场营销专业","马克思主义理论类专业","法律专业","会计学相关专业","密码学","微电子","经济法","网络通信相关专业","印刷学相关专业","经济法专业","中文专业","法律相关专业","财务管理或金融相关专业","机械制造及自动化","机械电子工程相关专业","金融学相关专业","企业管理","材料学相关专业","财务管理或会计","财务相关专业","新闻","新媒体设计相关专业","经济金融或管理类专业","管理科学与工程相关专业（工业工程","运营管理","供应链管理等方向）","传播","传媒或广告专业","电子工程","通信工程等相关专业","财务会计或审计专业","计算机技术或信息安全","密码学相关专业","集成电路设计","半导体相关专业","市场营销相关专业","新闻学及相关专业","蒙古语","俄语","韩语","财务","马克思主义理论专业","思想政治教育学","广播电视编导","管理科学与工程","数学相关专业","数理统计等数据挖掘相关专业","新闻学专业","经济学专业","历史相关专业","教育学专业","计量经济学","中文及法律相关专业","数学","信息管理或软件工程相关专业","印刷技术","印刷机械相关专业","印刷","造纸","高分子","化工","材料科学与工程相关专业","工商管理","企业管理相关专业","英语相关专业","财务管理专业","环境工程","环境科学相关专业","审计及经济相关专业","新闻传播学相关专业","政治学及马克思主义理论相关专业","管理学","经济学","新闻学","审计或财务等相关专业","计算机技术相关专业","人力资源管理类专业","审计"],

    yearValue: '', // 年份
    cityValue: '', // 省份
    xlValue: '', // 学历
    zmValue: '', // 政貌
    majorValue: '', // 专业

    suffix: "", // 后缀
    phone: "", // 用户手机号码
    tipsToSubscribeMessaged: true, // 是否提示过进行消息订阅
  },

  // 监听筛选条件切换
  m_select_touch(e) {
    switch (e.detail.type) {
      case "year": // 年份
        this.setData({ yearValue: this.data.yearList[e.detail.index] })
        break
      case "city": // 省份
        this.setData({ cityValue: this.data.cityList[e.detail.index] })
        break
      case "xl": // 学历
        this.setData({ xlValue: this.data.xlList[e.detail.index] })
        break
      case "zm": // 政貌
        this.setData({ zmValue: this.data.zmList[e.detail.index] })
        break
    }
  },
  // 监听筛选条件切换
  m_selectSearch_touch(e) {
    this.setData({
      majorValue: e.detail.text
    })
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
        content: '您是否需要订阅“银行考试”考试公告？订阅成功后您可以在公告发布时免费获得推送提示～',
        confirmText: "免费订阅",
        success(res) {
          if (res.confirm) {
            getApp().methods.subscribeSingleExam(_this.data.suffix, "银行考试", undefined, () => {
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

  // 搜索
  async seach_result() {
    let url = "result/index?scene=" + this.data.suffix
    if (this.data.yearValue !== "") url += "&year=" + this.data.yearValue
    if (this.data.cityValue !== "") url += "&city=" + this.data.cityValue
    if (this.data.xlValue !== "") url += "&xl=" + this.data.xlValue
    if (this.data.zmValue !== "") url += "&zm=" + this.data.zmValue
    if (this.data.majorValue !== "") url += "&major=" + this.data.majorValue
    wx.reLaunch({ url })
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
      imageUrl: 'http://jl.offcn.com/zg/ty/images/exam-helper/event/2021rmyh/2021-gwcx-yjh-share.jpg'
    }
  },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: this.data.title
    }
  }
})
