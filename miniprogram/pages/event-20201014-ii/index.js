// pages/search/search.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    showIcon: true,
    isShowAuth: false,
    is2020: false,
    addressList: [
      {
        "id": "2_1",
        "text": "吉林"
      },
      {
        "id": "2_1",
        "text": "陕西"
      },
      {
        "id": "2_1",
        "text": "北京市"
      },
      {
        "id": "2_1",
        "text": "江苏"
      },
      {
        "id": "2_1",
        "text": "上海市"
      },
      {
        "id": "2_1",
        "text": "江西"
      },
      {
        "id": "2_1",
        "text": "广东"
      },
      {
        "id": "2_1",
        "text": "内蒙古自治区"
      },
      {
        "id": "2_1",
        "text": "黑龙江"
      },
      {
        "id": "2_1",
        "text": "新疆维吾尔自治区"
      },
      {
        "id": "2_1",
        "text": "天津市"
      },
      {
        "id": "2_1",
        "text": "山西"
      },
      {
        "id": "2_1",
        "text": "浙江"
      },
      {
        "id": "2_1",
        "text": "山东"
      },
      {
        "id": "2_1",
        "text": "湖北"
      },
      {
        "id": "2_1",
        "text": "湖南"
      },
      {
        "id": "2_1",
        "text": "广西壮族自治区"
      },
      {
        "id": "2_1",
        "text": "海南"
      },
      {
        "id": "2_1",
        "text": "西藏自治区"
      },
      {
        "id": "2_1",
        "text": "辽宁"
      },
      {
        "id": "2_1",
        "text": "河北"
      },
      {
        "id": "2_1",
        "text": "河南"
      },
      {
        "id": "2_1",
        "text": "安徽"
      },
      {
        "id": "2_1",
        "text": "福建"
      },
      {
        "id": "2_1",
        "text": "四川"
      },
      {
        "id": "2_1",
        "text": "重庆市"
      },
      {
        "id": "2_1",
        "text": "贵州"
      },
      {
        "id": "2_1",
        "text": "云南"
      },
      {
        "id": "2_1",
        "text": "甘肃"
      },
      {
        "id": "2_1",
        "text": "宁夏回族自治区"
      },
      {
        "id": "2_1",
        "text": "青海"
      },
      {
        "id": "2_1",
        "text": "不限"
      }
    ],
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
    zzmmList: [
      {
        "id": "4_1",
        "text": "中共党员"
      },
      {
        "id": "4_2",
        "text": "预备党员"
      },
      {
        "id": "4_9",
        "text": "群众"
      }],
    addressvalue: '',
    xuelivalue: '',
    zzmmvalue: '',
    majorvalue: '',
    changeindex: false,
    hdlx: '职位查询',

    isLogin: false, // 是否登陆
    Suffix: "", // 后缀
    SinglePageMode: false, // 单页模式打开
  },

  // ？？？
  changez(e) {
    this.setData({
      changeindex: !e.detail.isIndexs
    })
  },

  // ???
  m_select_touch(e) {
    let that = this;
    let selectIndex = e.detail.selIndex;
    let stype = e.detail.stype;
    if (stype == "2") {
      let value2 = that.data.addressList[selectIndex];
      that.setData({
        addressvalue: value2.text
      })
    }
    else if (stype == "3") {
      let value3 = that.data.xueliList[selectIndex];
      that.setData({
        xuelivalue: value3.text
      })
    }
    else if (stype == "4") {
      let value4 = that.data.zzmmList[selectIndex];
      that.setData({
        zzmmvalue: value4.text
      })
    }
  },

  // ???
  m_selectSearch_touch(e) {
    let that = this;
    let selectText = e.detail.selText;
    that.setData({
      majorvalue: selectText
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
      name: 'event-20201014-ii-sign-up',
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
  async seach_result() {
    if (this.data.addressvalue == "") {
      wx.showToast({
        title: '先选择省份',
        icon: 'none'
      })
      return;
    }
    if (this.data.xuelivalue == "") {
      wx.showToast({
        title: '先选择学历',
        icon: 'none'
      })
      return;
    }
    if (this.data.zzmmvalue == "") {
      wx.showToast({
        title: '先选择政治面貌',
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
      name: 'event-20201014-ii-search',
      data: {
        data_address: this.data.addressvalue,
        data_xueli: this.data.xuelivalue,
        data_zzmm: this.data.zzmmvalue,
        data_major: this.data.majorvalue
      }
    })
    if (clound_result.result.data == '') {
      wx.setStorageSync('PositionList2020GK', []);
      wx.hideLoading()
      wx.showToast({
        title: '无匹配职位，请重新填写条件后查询',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {
      wx.hideLoading()
      wx.setStorageSync('PositionList2020GK', clound_result.result);
      wx.navigateTo({
        url: '/pages/event-20201014-ii/result/index'
      })
    }
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
  
  onPageScroll: function (t) {
    if (t.scrollTop >= 180) {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff'
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ffffff'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '2021国考职位检索',
      imageUrl: 'http://jl.offcn.com/zg/ty/images/exam-helper/event/2020/1014-ii/share.jpg'
    }
  },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: '2021国考职位检索'
    }
  }
})
