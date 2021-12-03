// pages/simulated-enrollment-2021-sk/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Suffix: "", // 后缀
    Step: 0, // 当前步骤 0, 欢迎页
    NowYear: 2021, // 接口参数 当前年份
    SearchArea: [], // 检索选项 地区
    SearchAreaIndex: -1, // 检索选项 地区 被选中的选项下标
    SearchDepartmentAttribute: [], // 检索选项 部门属性
    SearchDepartmentAttributeIndex: -1, // 检索选项 部门属性 被选中的选项下标
    SearchDepartmentName: "", // 检索选项 部门名称
    SearchPositionName: "",// 检索选项 职位名称
    SearchData: {}, // 检索条件 对象 点击检索按钮后缓存 用于后续上拉刷新使用 避免切换条件后上拉刷新造成数据不一致的问题
    PositionData: {}, // 职位列表数据
    DetailData: {}, // 预约详情数据
    Phone: -1, // 用户手机号码
  },

  /**
   * 按钮 开始使用
   */
  buttonStart: function () {
    let that = this
    wx.showModal({
      title: "提示",
      content: "若无特殊标注，本系统中所显示的报名人数、竞争比等数据仅代表使用本系统参加模拟报名的情况。",
      confirmText: "我了解",
      showCancel: false,
      success(res) {
        if (res.confirm) {
          // 弹出 Loading
          wx.showLoading({
            title: '登陆中...',
            mask: true
          })
          // 获取用户手机号码 检查用户是否已经登陆
          wx.cloud.callFunction({
            name: 'simulated-enrollment-2021-sk-check',
            success: res => {
              if (res.errMsg === "cloud.callFunction:ok" && res.result.code === 0) {
                // 保存登陆状态
                that.setData({
                  Phone: res.result.Phone
                })
                // 获取检索条件
                wx.request({
                  url: 'https://app.offcn.com/zwsk/wechat/zhiwei/index',
                  data: {
                    zwcode: "jl",
                    zwyear: that.data.NowYear
                  },
                  success: (res) => {
                    if (res.statusCode === 200) {
                      // 解码检索条件
                      // 部门属性 
                      let departmentAttribute = []
                      for (let key in res.data.zwtjarr) {
                        if (res.data.zwtjarr[key].name[0] === "xitong") {
                          departmentAttribute = res.data.zwtjarr[key].xiala[0]
                        }
                      }
                      // 配置检索条件并切换页面
                      that.setData({
                        Step: 1,
                        SearchArea: Object.keys(res.data.areaarr),
                        SearchDepartmentAttribute: departmentAttribute
                      })
                      // 切换导航栏
                      // wx.setNavigationBarColor({
                      //   frontColor: '#000000',
                      //   backgroundColor: '#ffffff',
                      //   animation: {
                      //     duration: 400,
                      //     timingFunc: 'easeIn'
                      //   }
                      // })
                    } else {
                      app.methods.handleError({
                        err: res,
                        title: "出错啦",
                        content: "获取检索条件失败, 请您稍后再试"
                      })
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
        }
      }
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
   * 监听 部门属性
   */
  bindSearchDepartmentAttributePickerChange: function (e) {
    this.setData({
      SearchDepartmentAttributeIndex: e.detail.value
    })
  },

  /**
   * 监听 部门名称
   */
  bindSearchDepartmentNameInput: function (e) {
    this.setData({
      SearchDepartmentName: e.detail.value
    })
  },

  /**
   * 监听 职位名称
   */
  bindSearchPositionNameInput: function (e) {
    this.setData({
      SearchPositionName: e.detail.value
    })
  },

  /**
   * 按钮 职位检索 检索 未登录状态
   */
  buttonSearchStartWhitoutSignUp: function (e) {
    // 判断是否授权使用手机号
    if (e.detail.errMsg !== 'getPhoneNumber:ok') {
      app.methods.handleError({
        err: e.detail.errMsg,
        title: "出错啦",
        content: "需要您使用手机号码进行登陆后才可进行检索～"
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
      name: 'simulated-enrollment-2021-sk-sign-up',
      data: {
        Environment: app.globalData.configs.environment,
        Suffix: this.data.Suffix,
        cloudID: wx.cloud.CloudID(e.detail.cloudID)
      },
      success: res => {
        if (res.errMsg === "cloud.callFunction:ok" && res.result.code === 0) {
          // 保存登陆状态
          this.setData({
            Phone: res.result.Phone
          })
          // 调用检索功能
          this.buttonSearchStart()
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
   * 按钮 职位检索 检索
   */
  buttonSearchStart: function () {
    // 检索职位
    wx.request({
      url: 'https://app.offcn.com/zwsk/wechat/zhiwei/search',
      data: {
        zwcode: "jl",
        zwyear: this.data.NowYear,
        areaname: this.data.SearchAreaIndex === -1 ? "" : this.data.SearchArea[this.data.SearchAreaIndex],
        xitong: this.data.SearchDepartmentAttributeIndex === -1 ? "" : this.data.SearchDepartmentAttribute[this.data.SearchDepartmentAttributeIndex],
        danwei_name: this.data.SearchDepartmentName,
        zhiwei_name: this.data.SearchPositionName
      },
      success: (res) => {
        // 缓存搜索条件 用于后续上拉刷新使用 避免切换条件后上拉刷新造成数据不一致的问题
        this.setData({
          SearchData: {
            zwcode: "jl",
            zwyear: this.data.NowYear,
            areaname: this.data.SearchAreaIndex === -1 ? "" : this.data.SearchArea[this.data.SearchAreaIndex],
            xitong: this.data.SearchDepartmentAttributeIndex === -1 ? "" : this.data.SearchDepartmentAttribute[this.data.SearchDepartmentAttributeIndex],
            danwei_name: this.data.SearchDepartmentName,
            zhiwei_name: this.data.SearchPositionName
          }
        })
        if (res.statusCode === 200) {
          this.setData({
            PositionData: res.data
          })
        } else {
          app.methods.handleError({
            err: res,
            title: "出错啦",
            content: "检索失败, 请您稍后再试"
          })
        }
      }
    })
  },

  /**
   * 监听 页面滚动
   * 当滚动出一定距离后 显示回到顶部按钮
   */
  onPageScroll: function (e) {
    this.setData({
      backTopValue: e.scrollTop > 500 ? true : false
    })
  },

  /**
   * 滚动到顶部
   * https://www.cnblogs.com/wesky/p/9067069.html
   */
  backTop: function () {
    // 控制滚动
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  /**
   * 监听 显示详情
   */
  bindShowDetailTap: async function (e) {
    // 弹出 Loading
    wx.showLoading({
      title: '努力加载中...',
      mask: true
    })

    const db = wx.cloud.database()

    // 获取同岗位报名人数
    let enrollmentCount = await db.collection('SimulatedEnrollment2021SKPosition').where({
      Department: this.data.PositionData.lists[e.currentTarget.dataset.index].danwei_code,
      Position: this.data.PositionData.lists[e.currentTarget.dataset.index].zhiwei_code,
    })
      .count()
    if (enrollmentCount.errMsg !== "collection.count:ok") {
      app.methods.handleError({
        err: res.errMsg,
        title: "出错啦",
        content: "提交出错, 请您稍后再试～ (" + res.errMsg + ")"
      })
      wx.hideLoading() // 隐藏 loading
      return
    }

    // 获取当前用户报名的岗位
    let enrollmentMyPosition = await db.collection("SimulatedEnrollment2021SKPosition").where({
      Phone: this.data.Phone
    }).get()
    if (enrollmentMyPosition.errMsg !== "collection.get:ok") {
      app.methods.handleError({
        err: res.errMsg,
        title: "出错啦",
        content: "提交出错, 请您稍后再试～ (" + res.errMsg + ")"
      })
      wx.hideLoading() // 隐藏 loading
      return
    }

    if (enrollmentMyPosition.data.length !== 0) {
      this.setData({
        "DetailData.Enrollment": { // 报名数据
          total: enrollmentCount.total,
          myPosition: {
            Department: enrollmentMyPosition.data[enrollmentMyPosition.data.length - 1].Department,
            Position: enrollmentMyPosition.data[enrollmentMyPosition.data.length - 1].Position,
          },
        },
      })
    } else {
      this.setData({
        "DetailData.Enrollment": { // 报名数据
          total: enrollmentCount.total,
          myPosition: null,
        },
      })
    }

    // 获取官方数据
    let offical = await db.collection("SimulatedEnrollment2021SKOfficial").where({
      Department: this.data.PositionData.lists[e.currentTarget.dataset.index].danwei_code,
      Position: this.data.PositionData.lists[e.currentTarget.dataset.index].zhiwei_code,
    }).get()
    if (offical.errMsg !== "collection.get:ok") {
      app.methods.handleError({
        err: res.errMsg,
        title: "出错啦",
        content: "提交出错, 请您稍后再试～ (" + res.errMsg + ")"
      })
      wx.hideLoading() // 隐藏 loading
      return
    }

    if (offical.data.length !== 0) {
      this.setData({
        "DetailData.Official": offical.data[offical.data.length - 1], // 官方数据
      })
    } else {
      this.setData({
        "DetailData.Official": null, // 官方数据
      })
    }

    this.setData({
      "DetailData.Position": this.data.PositionData.lists[e.currentTarget.dataset.index] // 职位详情 同时作为前台的加载完成标志使用
    })

    wx.hideLoading() // 隐藏 loading
  },

  /**
   * 监听 隐藏详情
   */
  bindHideDetailCloseTap: function () {
    this.setData({
      DetailData: {}
    })
  },

  /**
   * 监听 按钮 报名本岗位
   */
  buttonPositionSignUp: function () {
    // 判断是否已经报名过其他职位 fixme 测试
    if (this.data.DetailData.Enrollment.myPosition !== null) {
      if (this.data.DetailData.Enrollment.myPosition.Department === this.data.DetailData.Position.danwei_code && this.data.DetailData.Enrollment.myPosition.Position === this.data.DetailData.Position.zhiwei_code ) {
        wx.showModal({
          title: "提示",
          content: "您已经报名本岗位",
          confirmText: "我知道了",
          showCancel: false
        })
      } else {
      let that = this
      wx.showModal({
        title: "提示",
        content: "您已经报名了部门 " + this.data.DetailData.Enrollment.myPosition.Department + " ( 部门代码 ) 的职位 " + this.data.DetailData.Enrollment.myPosition.Position + " ( 职位代码 ), 确认要修改为 " + this.data.DetailData.Position.danwei_code + " ( 部门代码 ) 的职位 " + this.data.DetailData.Position.zhiwei_code + " ( 职位代码 )吗？",
        confirmText: "修改",
        success(res) {
          if (res.confirm) {
            const db = wx.cloud.database()
            db.collection("SimulatedEnrollment2021SKPosition").where({ Phone: that.data.Phone }).remove()
              .then(res => {
                console.log(res)
                if (res.errMsg !== "collection.remove:ok") {
                  app.methods.handleError({
                    err: res.errMsg,
                    title: "出错啦",
                    content: "提交出错, 请您稍后再试～ (" + res.errMsg + ")"
                  })
                } else {
                  that.positionSignUp()
                }
              })
              .catch(err => {
                app.methods.handleError({
                  err,
                  title: "出错啦",
                  content: "提交出错, 请您稍后再试～ (" + err + ")"
                })
              })
          }
        }
      })}
    } else {
      this.positionSignUp()
    }
  },

  /**
   * 辅助函数 按钮 报名本岗位
   */
  positionSignUp: function () {
    // 弹出 Loading
    wx.showLoading({
      title: '正在提交...',
      mask: true
    })
    // 提交报名信息
    const db = wx.cloud.database()
    db.collection('SimulatedEnrollment2021SKPosition').add({
      data: {
        Phone: this.data.Phone,
        Department: this.data.DetailData.Position.danwei_code,
        Position: this.data.DetailData.Position.zhiwei_code,
      }
    })
      .then(res => {
        if (res.errMsg !== "collection.add:ok") {
          app.methods.handleError({
            err: res.errMsg,
            title: "出错啦",
            content: "提交出错, 请您稍后再试～ (" + res.errMsg + ")"
          })
        } else {
          // 重新获取报名状态
          db.collection('SimulatedEnrollment2021SKPosition').where({
            Department: this.data.DetailData.Position.danwei_code,
            Position: this.data.DetailData.Position.zhiwei_code,
          })
            .count().then(res => {
              if (res.errMsg !== "collection.count:ok") {
                app.methods.handleError({
                  err: res.errMsg,
                  title: "出错啦",
                  content: "提交出错, 请您稍后再试～ (" + res.errMsg + ")"
                })
              } else {
                this.setData({
                  "DetailData.Enrollment": { // 报名数据
                    total: res.total,
                    myPosition: {
                      Department: this.data.DetailData.Position.danwei_code,
                      Position: this.data.DetailData.Position.zhiwei_code,
                    },
                  },
                })
                wx.showToast({
                  title: '模拟报名成功',
                  icon: 'success',
                  duration: 1000
                })
              }
              wx.hideLoading() // 隐藏 loading
            })
            .catch(err => {
              app.methods.handleError({
                err,
                title: "出错啦",
                content: "提交出错, 请您稍后再试～ (" + err + ")"
              })
              wx.hideLoading() // 隐藏 loading
            })


        }
      })
      .catch(err => {
        app.methods.handleError({
          err,
          title: "出错啦",
          content: "提交出错, 请您稍后再试～ (" + err + ")"
        })
        wx.hideLoading() // 隐藏 loading
      })
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
   * 上拉刷新
   */
  onReachBottom: function () {
    // 没有配置搜索条件
    if (!this.data.SearchData.hasOwnProperty("zwcode")) {
      return
    }
    // 已经加载全部数据
    if (this.data.PositionData.total < this.data.PositionData.page * 15) {
      return
    }
    // 弹出 Loading
    wx.showLoading({
      title: '努力检索中...',
      mask: true
    })
    wx.request({
      url: 'https://app.offcn.com/zwsk/wechat/zhiwei/search',
      data: {
        ...this.data.SearchData,
        page: Number(this.data.PositionData.page) + 1
      },
      success: (res) => {
        if (res.statusCode === 200) {
          res.data.lists = this.data.PositionData.lists.concat(res.data.lists),
            this.setData({
              PositionData: res.data
            })
        } else {
          app.methods.handleError({
            err: res,
            title: "出错啦",
            content: "检索失败, 请您稍后再试"
          })
        }
        wx.hideLoading() // 隐藏 loading
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '2021省考同岗位报名人数及竞争比查询',
      imageUrl: 'http://jl.offcn.com/zg/ty/images/exam-helper/simulated-enrollment/2021-sk-share.jpg'
    }
  },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: '2021省考同岗位报名人数及竞争比查询'
    }
  }
})