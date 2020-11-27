// pages/event-20201023/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Suffix: "", // 后缀
    SinglePageMode: false, // 单页模式打开
    isLogin: false, // 是否登陆
    Phone: "", // 用户手机号码
    Configs: [
      {
        CRMSID: "43d8c9684524fb41c987a77a9186d824",
        CRMID: "HD202010231700",
        CRMName: "小程序-省考资料补给站",
      },
      {
        CRMSID: "c1ba2c53b4524795ec2c0e82ad36ec8e",
        CRMID: "HD202010231704",
        CRMName: "小程序-国考资料补给站",
      },
      {
        CRMSID: "c53265e2b062f845fb2a35005817f2f2",
        CRMID: "HD202010231707",
        CRMName: "小程序-事业单位资料补给站",
      },
      {
        CRMSID: "687c49b8d81fce54546653889e335f4f",
        CRMID: "HD202010231716",
        CRMName: "小程序-教师招聘资料补给站",
      },
      {
        CRMSID: "64560196077b6dc4d66f8a190f8f2061",
        CRMID: "HD202010231719",
        CRMName: "小程序-医疗招聘资料补给站",
      },
      {
        CRMSID: "f303e42e8b992f1caaa86fe748041473",
        CRMID: "HD202010231720",
        CRMName: "小程序-特岗教师资料补给站",
      }
    ] // 项目配置
  },

  /**
   * 注册
   */
  register(e) {
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
      title: '注册中...',
      mask: true
    })

    // 提交 cloudID, 换取手机号并推送 CRM
    wx.cloud.callFunction({
      name: 'event-register',
      data: {
        Environment: app.globalData.configs.environment,
        Suffix: this.data.Suffix,
        CRMSID: this.data.Configs[e.currentTarget.dataset.index].CRMSID,
        Remark: '[ ' + this.data.Configs[e.currentTarget.dataset.index].CRMID + ' ] ' + this.data.Configs[e.currentTarget.dataset.index].CRMName,
        cloudID: wx.cloud.CloudID(e.detail.cloudID)
      },
      success: callFunctionRes => {
        if (callFunctionRes.errMsg === "cloud.callFunction:ok" && callFunctionRes.result.code === 0) {
          // 保存注册记录到数据库
          wx.cloud.database().collection('User').add({
            data: {
              Phone: callFunctionRes.result.Phone,
              Time: new Date(),
              CRMSID: this.data.Configs[e.currentTarget.dataset.index].CRMSID,
              Suffix: this.data.Suffix,
              Remark: '[ ' + this.data.Configs[e.currentTarget.dataset.index].CRMID + ' ] ' + this.data.Configs[e.currentTarget.dataset.index].CRMName
            }
          }).then(collectionAddRes => {
            if (collectionAddRes.errMsg == 'collection.add:ok') {
              // 保存登陆状态
              this.setData({
                isLogin: true,
                Phone: callFunctionRes.result.Phone,
              })
              // 切换页面
              this.view(e.currentTarget.dataset.index)
              wx.hideLoading() // 隐藏 loading
            } else {
              app.methods.handleError({
                err: collectionAddRes,
                title: "出错啦",
                content: collectionAddRes.errMsg
              })
              wx.hideLoading() // 隐藏 loading
            }
          }).catch(err => {
            app.methods.handleError({
              err: err,
              title: "出错啦",
              content: "创建用户失败"
            })
            wx.hideLoading() // 隐藏 loading
          })
        } else {
          app.methods.handleError({
            err: callFunctionRes.result.error,
            title: "出错啦",
            content: callFunctionRes.result.error
          })
          wx.hideLoading() // 隐藏 loading
        }
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
   * 登陆
   */
  login(e) {
    // 弹出 Loading
    wx.showLoading({
      title: '登陆中...',
      mask: true
    })

    wx.request({
      url: app.globalData.configs.apis.scf + "/sso/v2/crm/push",
      method: 'POST',
      header: {
        'Origin': 'null'
      },
      data: {
        CRMSID: this.data.Configs[e.currentTarget.dataset.index].CRMSID,
        Suffix: this.data.Suffix,
        Phone: this.data.Phone,
        Remark: '[ ' + this.data.Configs[e.currentTarget.dataset.index].CRMID + ' ] ' + this.data.Configs[e.currentTarget.dataset.index].CRMName
      },
      success: (res) => {
        if (res.data.Code !== 0) {
          app.methods.handleError({
            err: res.data.Error,
            title: "出错啦",
            content: res.data.Error
          })
        } else {
          // 切换页面
          this.view(e.currentTarget.dataset.index)
        }
        wx.hideLoading() // 隐藏 loading
      },
      fail: (err) => {
        app.methods.handleError({
          err: err,
          title: "出错啦",
          content: "提交出错，请您稍后再试~"
        })
        wx.hideLoading() // 隐藏 loading
      }
    })
  },

  /**
   * 查看内容
   */
  view(id) {
    let detail = {
      Title: "加载错误, 请重试",
      Code: "",
      List: []
    };
    if (id === 0) {
      detail = {
        Title: "院长手写笔记",
        Code: "sk",
        List: Array.from({length:135}, (v,k) => k)
      }
    } else if (id === 1) {
      detail = {
        Title: "笔试行测核心知识点+申论重难点",
        Code: "gk",
        List: Array.from({length:127}, (v,k) => k)
      }
    } else if (id === 2) {
      detail = {
        Title: "事业单位资料包",
        Code: "sydw",
        List: Array.from({length:66}, (v,k) => k)
      }
    } else if (id === 3) {
      detail = {
        Title: "教师招聘考点精粹",
        Code: "jszp",
        List: Array.from({length:17}, (v,k) => k)
      }
    } else if (id === 4) {
      detail = {
        Title: "特岗教师考点精粹",
        Code: "tgjs",
        List: Array.from({length:15}, (v,k) => k)
      }
    } else if (id === 5) {
      detail = {
        Title: "医疗卫生笔试备考1200题",
        Code: "ylws",
        List: Array.from({length:175}, (v,k) => k)
      }
    } else {
      // ID 出错
      app.methods.handleError({
        err: null,
        title: "出错啦",
        content: "ID 有误"
      })
      return
    }
    wx.navigateTo({
      url: '../event-20201023/view/index?scene='+this.data.Suffix,
      success: function(res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('pushDetail', detail)
      }
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

    // 判断是否是单页模式
    if (wx.getLaunchOptionsSync().scene === 1154) {
      this.setData({
        SinglePageMode: true
      })
      // 单页模式中，阻止后续操作
      return
    }

    // 查询注册状态
    // 弹出 Loading
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    // 查询数据库
    // 查询注册时间为近30天的数据，仅查询手机号码
    wx.cloud.database().collection('User').field({Phone:true}).where({Time: wx.cloud.database().command.gte(new Date((new Date()).getTime() - 30*24*60*60*1000))}).get({
      success: res => {
        // 判断是否查询成功
        if (res.errMsg === "collection.get:ok") {
          // 判断是否存在数据
          if (res.data.length > 0) {
            this.setData({
              isLogin: true,
              Phone: res.data[0].Phone
            })
          }
          wx.hideLoading() // 隐藏 loading
        } else {
          app.methods.handleError({
            err: res,
            title: "出错啦",
            content: res.errMsg
          })
          wx.hideLoading() // 隐藏 loading
        }
      },
      fail: err => {
        app.methods.handleError({
          err: err,
          title: "出错啦",
          content: '查询注册状态失败'
        })
        wx.hideLoading() // 隐藏 loading
      }
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
      title: '资料补给站',
      imageUrl: 'http://jl.offcn.com/zg/ty/images/exam-helper/event/2020/1023/share.jpg'
    }
  },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: '2021 吉林省公职类考试 资料补给站'
    }
  }
})