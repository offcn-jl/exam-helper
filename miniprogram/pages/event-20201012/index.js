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

    books: [
      {
        poster: "http://jl.offcn.com/zg/ty/images/exam-helper/event/2020/1012/book-1-poster.jpg",
        name: "国考应试指南"
      },
      {
        poster: "http://jl.offcn.com/zg/ty/images/exam-helper/event/2020/1012/book-2-poster.jpg",
        name: "高频易错习题集"
      },
      {
        poster: "http://jl.offcn.com/zg/ty/images/exam-helper/event/2020/1012/book-3-poster.jpg",
        name: "行测五年国考三年模拟"
      },
      {
        poster: "http://jl.offcn.com/zg/ty/images/exam-helper/event/2020/1012/book-4-poster.jpg",
        name: "申论三年国考五年模拟"
      }
    ]
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
      name: 'event-20201012-sign-up',
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
            url: 'https://tsf.tencent.jilinoffcn.com/release/app/version-control/get/20201012',
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
   * 按钮 打开资料
   */
  bindShowTap (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.index)

    // wx.downloadFile({
    //   url: 'http://jl.offcn.com/zg/ty/images/exam-helper/event/2020/0918/book-'+(e.currentTarget.dataset.index+1)+'.pdf',
    //   success: function (res) {
    //     const filePath = res.tempFilePath
    //     wx.openDocument({
    //       filePath: filePath,
    //       success: function (res) {
    //         console.log('打开文档成功')
    //       }
    //     })
    //   }
    // })

    // 弹出 Loading
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    wx.cloud.downloadFile({
      fileID: 'cloud://release-opb6d.7265-release-opb6d-1302221531/event/2020/1012/book-'+(e.currentTarget.dataset.index+1)+'.pdf', // 文件 ID
      success: res => {
        wx.hideLoading() // 隐藏 loading
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      fail: res => {
        wx.hideLoading() // 隐藏 loading
        app.methods.handleError({
          err: res,
          title: "出错啦",
          content: "打开失败, 请您稍后再试"
        })
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
      title: '2021国考备考资料领取',
      imageUrl: 'http://jl.offcn.com/zg/ty/images/exam-helper/event/2020/1012/share.jpg'
    }
  },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: '2021国考备考资料领取'
    }
  }
})