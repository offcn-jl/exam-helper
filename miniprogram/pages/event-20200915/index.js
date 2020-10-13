// pages/event-20200902/index.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Suffix: "", // 后缀
    SinglePageMode: false, // 单页模式打开
    Step: 0, // 当前页面
    ADClass: "", // 19课堂课程ID 
    ADPictureURL: "", // 广告图

    SearchYear: [ 2018, 2019 ], // 检索选项 年份
    SearchYearIndex: -1, // 检索选项 年份 被选中的选项下标
    SearchArea: [], // 检索选项 地区
    SearchAreaIndex: -1, // 检索选项 地区 被选中的选项下标

    picList: []
  },

  /**
   * 按钮 开始使用
   */
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
      name: 'event-20200915-sign-up',
      data: {
        Environment: app.globalData.configs.environment,
        Suffix: this.data.Suffix,
        cloudID: wx.cloud.CloudID(e.detail.cloudID)
      },
      success: res => {
        if (res.errMsg === "cloud.callFunction:ok" && res.result.code === 0) {
          // 切换页面
          this.setData({
            Step: 1
          })
          // 获取广告设置
          wx.request({
            url: 'https://tsf.tencent.jilinoffcn.com/release/app/version-control/get/20200831',
            success: (res) => {
              if (res.statusCode === 200) {
                // 保存广告设置
                this.setData({
                  ADClass: res.data.Description,
                  ADPictureURL: res.data.Download,
                })
              } else {
                // 请求失败
                // 由于获取广告配置不是关键操作，为保障用户体验，不阻止后续跳转操作，不弹出错误提示
              }
            }
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

  /**
   * 监听 年份
   */
  bindSearchYearPickerChange: function (e) {
    let areaList = [
      ["长春地区","辽源地区","四平地区","松原地区","通化地区","白山地区"],
      ["省直机关","松原地区","通化地区"]
    ]
    this.setData({
      SearchYearIndex: e.detail.value,
      SearchArea: areaList[e.detail.value],
      SearchAreaIndex: -1
    })
  },

  /**
   * 监听 地区
   */
  bindSearchAreaPickerChange: function (e) {
    this.setData({
      SearchAreaIndex: e.detail.value
    })
  },

  /**
   * 监听 按钮 检索
   */
  buttonSearchStart: function () {
    if (this.data.SearchYearIndex === -1) {
      // 未选择年份
      app.methods.handleError({
        err: null,
        title: "出错啦",
        content: "请您先选择年份再进行检索"
      })
      return
    }
    if (this.data.SearchAreaIndex === -1) {
      // 未选择地区
      app.methods.handleError({
        err: null,
        title: "出错啦",
        content: "请您先选择地区再进行检索"
      })
      return
    }

    // 按照年份地区填充图片
    if (this.data.SearchYearIndex == 0) {
      // 2018 年
      if (this.data.SearchAreaIndex == 0) {
        // 长春地区
        this.setData({
          picList: ["0915-2018-cc-01.jpg","0915-2018-cc-02.jpg","0915-2018-cc-03.jpg","0915-2018-cc-04.jpg","0915-2018-cc-05.jpg","0915-2018-cc-06.jpg","0915-2018-cc-07.jpg","0915-2018-cc-08.jpg","0915-2018-cc-09.jpg","0915-2018-cc-10.jpg","0915-2018-cc-11.jpg","0915-2018-cc-12.jpg","0915-2018-cc-13.jpg","0915-2018-cc-14.jpg","0915-2018-cc-15.jpg","0915-2018-cc-16.jpg","0915-2018-cc-17.jpg","0915-2018-cc-18.jpg","0915-2018-cc-19.jpg","0915-2018-cc-20.jpg","0915-2018-cc-21.jpg","0915-2018-cc-22.jpg","0915-2018-cc-23.jpg","0915-2018-cc-24.jpg","0915-2018-cc-25.jpg","0915-2018-cc-26.jpg","0915-2018-cc-27.jpg","0915-2018-cc-28.jpg","0915-2018-cc-29.jpg","0915-2018-cc-30.jpg","0915-2018-cc-31.jpg"]
        })
      } else if (this.data.SearchAreaIndex == 1) {
        // 辽源地区
        this.setData({
          picList: ["0915-2018-ly-01.png","0915-2018-ly-02.png","0915-2018-ly-03.png","0915-2018-ly-04.png","0915-2018-ly-05.png","0915-2018-ly-06.png","0915-2018-ly-07.png"]
        })
      }  else if (this.data.SearchAreaIndex == 2) {
        // 四平地区
        this.setData({
          picList: ["0915-2018-sp-01.jpg","0915-2018-sp-02.jpg","0915-2018-sp-03.jpg","0915-2018-sp-04.jpg","0915-2018-sp-05.jpg","0915-2018-sp-06.jpg","0915-2018-sp-07.jpg","0915-2018-sp-08.jpg","0915-2018-sp-09.jpg","0915-2018-sp-10.jpg","0915-2018-sp-11.jpg","0915-2018-sp-12.jpg","0915-2018-sp-13.jpg","0915-2018-sp-14.jpg","0915-2018-sp-15.jpg","0915-2018-sp-16.jpg","0915-2018-sp-17.jpg","0915-2018-sp-18.jpg"]
        })
      }  else if (this.data.SearchAreaIndex == 3) {
        // 松原地区
        this.setData({
          picList: ["0915-2018-sy-01.jpg","0915-2018-sy-02.jpg","0915-2018-sy-03.jpg","0915-2018-sy-04.jpg","0915-2018-sy-05.jpg","0915-2018-sy-06.jpg","0915-2018-sy-07.jpg","0915-2018-sy-08.jpg","0915-2018-sy-09.jpg","0915-2018-sy-10.jpg","0915-2018-sy-11.jpg"]
        })
      }  else if (this.data.SearchAreaIndex == 4) {
        // 通化地区
        this.setData({
          picList: ["0915-2018-th-01.jpg","0915-2018-th-02.jpg","0915-2018-th-03.jpg","0915-2018-th-04.jpg","0915-2018-th-05.jpg","0915-2018-th-06.jpg","0915-2018-th-07.jpg","0915-2018-th-08.jpg","0915-2018-th-09.jpg","0915-2018-th-10.jpg","0915-2018-th-11.jpg","0915-2018-th-12.jpg","0915-2018-th-13.jpg","0915-2018-th-14.jpg","0915-2018-th-15.jpg","0915-2018-th-16.jpg","0915-2018-th-17.jpg","0915-2018-th-18.jpg","0915-2018-th-19.jpg"]
        })
      }  else if (this.data.SearchAreaIndex == 5) {
        // 白山地区
        this.setData({
          picList: ["0915-2018-bs-01.jpg","0915-2018-bs-02.jpg","0915-2018-bs-03.jpg","0915-2018-bs-04.jpg","0915-2018-bs-05.jpg","0915-2018-bs-06.jpg","0915-2018-bs-07.jpg","0915-2018-bs-08.jpg","0915-2018-bs-09.jpg","0915-2018-bs-10.jpg","0915-2018-bs-11.jpg","0915-2018-bs-12.jpg","0915-2018-bs-13.jpg"]
        })
      } else {
        // 选择错误
        this.setData({
          picList: []
        })
        app.methods.handleError({
          err: null,
          title: "出错啦",
          content: "您的检索条件有误"
        })
      }
    } else if (this.data.SearchYearIndex == 1) {
      // 2019 年
      if (this.data.SearchAreaIndex == 0) {
        // 省直机关
        this.setData({
          picList: ["0915-2019-sz-01.png","0915-2019-sz-02.png","0915-2019-sz-03.png","0915-2019-sz-04.png","0915-2019-sz-05.png","0915-2019-sz-06.png","0915-2019-sz-07.png","0915-2019-sz-08.png","0915-2019-sz-09.png","0915-2019-sz-10.png","0915-2019-sz-11.png","0915-2019-sz-12.png","0915-2019-sz-13.png","0915-2019-sz-14.png","0915-2019-sz-15.png","0915-2019-sz-16.png"]
        })
      } else if (this.data.SearchAreaIndex == 1) {
        // 松原地区
        this.setData({
          picList: ["0915-2019-sy-01.png","0915-2019-sy-02.png","0915-2019-sy-03.png","0915-2019-sy-04.png","0915-2019-sy-05.png"]
        })
      } else if (this.data.SearchAreaIndex == 2) {
        // 通化地区
        this.setData({
          picList: ["0915-2019-th-01.jpg","0915-2019-th-02.jpg","0915-2019-th-03.jpg","0915-2019-th-04.jpg","0915-2019-th-05.jpg","0915-2019-th-06.jpg","0915-2019-th-07.jpg","0915-2019-th-08.jpg"]
        })
      } else {
        // 选择错误
        this.setData({
          picList: []
        })
        app.methods.handleError({
          err: null,
          title: "出错啦",
          content: "您的检索条件有误"
        })
      }
    } else {
      // 选择错误
      this.setData({
        picList: []
      })
      app.methods.handleError({
        err: null,
        title: "出错啦",
        content: "您的检索条件有误"
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '省面历年分数',
      imageUrl: 'http://jl.offcn.com/zg/ty/images/exam-helper/event/2020/0915-share.jpg'
    }
  },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: '吉林省考历年面试分数查询'
    }
  }
})