//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: {
          // 默认环境配置，传入字符串形式的环境 ID 可以指定所有服务的默认环境，传入对象可以分别指定各个服务的默认环境
          // 为了便于开发和调试, 此处选择了对象形式
          // 但是原则上不应该在开发的过程中混用环境
          database: this.globalData.configs.cloudEnvironment,
          storage: this.globalData.configs.cloudEnvironment,
          functions: this.globalData.configs.cloudEnvironment
        },
        traceUser: true,
      })
    }
  },
  globalData: {
    configs: {
      ...require("./config")
    }
  },
  methods: {
    /**
     * 处理错误
     * @param {Object} err 错误内容
     * @param {String} [ title = "出错啦" ] 标题
     * @param {String} [ content = "请您稍候再试～" ] 提示语
     * @param {String} [ confirmText = "我知道了" ] 确认按钮文字
     * @param {Boolean} [ reLaunch = false ] 是否重启
     */
    handleError: function({err, title = "出错啦", content = "请您稍候再试～", confirmText = "我知道了", reLaunch=false}={}) {
      console.error(err)
      wx.showModal({
        title: title,
        content: content,
        confirmText: confirmText,
        showCancel: false,
        success(res) {
          if (reLaunch) {
            wx.reLaunch({
              url: 'pages/index/index'
            })
          }
        }
      })
    }
  }
})
