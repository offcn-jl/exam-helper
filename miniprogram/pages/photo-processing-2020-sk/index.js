// pages/photo-processing/index.js
const CRMSID = "6edbf791cfbaaa68442dd75bfd10ae5b"; // CRM 活动表单 ID
const app = getApp();
const device = wx.getSystemInfoSync(); // 获取设备信息
const width = device.windowWidth; // 示例为一个与屏幕等宽的正方形裁剪框
// device.pixelRatio = 20; // 人为增大设备像素比, 测试超大图片
const height = width;
let fileArrayBuffer; // 保存图片 ArrayBuffer 的临时变量
import WeCropper from '../../template/we-cropper/we-cropper.min';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 后缀
    Suffix: "",
    // 控制页面显示
    isLogin: false,
    step: 0,
    disabled: false,
    // 首页背景
    bgImage: "./images/bg.jpg",
    // 样图
    samplePhoto: "../../images/photo-example.jpg",
    // 拖拽提示图路径
    dropImg: '../../images/drop.png',
    // 是否开启美颜
    beautyCheck: false,
    // 最大使用次数
    maxTimes: 10,
    // 当前使用情况
    count: 0,
    total: 0,
    // base64返回后
    userPhoto: '',
    resPhoto: '',
    // 最终合成
    userPhotoUrl: '',
    // cropper初始化
    cropperOpt: {
      id: 'cropper', // 用于手势操作的canvas组件标识符
      targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
      pixelRatio: device.pixelRatio, // 传入设备像素比
      width, // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: (width - 264) / 2, // 裁剪框x轴起点
        y: (width - 340) / 2, // 裁剪框y轴期起点
        width: 264, // 裁剪框宽度
        height: 340 // 裁剪框高度
      },
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载 we-cropper
    const {
      cropperOpt
    } = this.data
    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper 加载成功 ( is ready for work ) !`)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })

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
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "中公教育 2020 吉林省考照片处理系统 [ " + this.data.Suffix + " ]"
    }
  },

  /**
   * 登陆
   */
  login: function (e) {
    const _this = this
    wx.cloud.callFunction({
      name: 'photo-processing-login',
      data: {
        environment: app.globalData.configs.environment,
        CRMSID: CRMSID,
        suffix: _this.data.Suffix,
        cloudID: wx.cloud.CloudID(e.detail.cloudID)
      },
      success: res => {
        if (res.errMsg === 'cloud.callFunction:ok') {
          if (res.result.code === 0) {
            _this.setData({
              isLogin: true,
              step: 1,
              count: res.result.result.Count,
              total: res.result.result.Total
            })
            // 超过限制则禁用拍摄按钮
            if (res.result.result.Count > _this.data.maxTimes) {
              this.setData({
                disabled: true
              })
            } else {
              this.setData({
                disabled: false
              })
            }
          } else {
            app.methods.handleError({
              err: res.result.error,
              title: "登陆失败"
            })
          }
        }
        wx.hideLoading()
      },
      fail: err => {
        // 处理错误
        wx.hideLoading() // 隐藏 loading
        app.methods.handleError({
          err,
          title: "调用登陆云函数失败"
        })
      }
    })
  },

  /**
   * we-cropper 点击上传
   */
  uploadTap() {
    // 样图页跳转
    if (this.data.step === 1) {
      this.setData({
        step: 2
      })
    }
    const _this = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        _this.setData({
          resPhoto: res.tempFilePaths[0]
        })
        _this.cropper.pushOrign(src)
      }
    })
  },

  /**
   * 是否美颜按钮
   * @param {*} e 
   */
  checkboxChange: function (e) {
    this.setData({
      beautyCheck: this.data.beautyCheck ? false : true
    })
  },

  /**
   * 裁剪图片
   */
  getCropperImage() {
    wx.showLoading({
      title: '生成中...',
    })
    let _this = this
    let {
      imgLeft,
      imgTop,
      scaleWidth,
      scaleHeight
    } = this.wecropper // 获取图片在原画布坐标位置及宽高
    let {
      x,
      y,
      width,
      height
    } = this.wecropper.cut // 获取裁剪框位置及大小
    // 所有参数乘设备像素比
    // imgLeft = imgLeft * device.pixelRatio
    // imgTop = imgTop * device.pixelRatio
    // scaleWidth = scaleWidth * device.pixelRatio
    // scaleHeight = scaleHeight * device.pixelRatio
    // x = x * device.pixelRatio
    // y = y * device.pixelRatio
    // width = width * device.pixelRatio
    // height = height * device.pixelRatio
    const targetCtx = wx.createCanvasContext('tempCanvas') // 这里是目标canvas画布的id值
    targetCtx.drawImage(this.data.resPhoto, imgLeft, imgTop, scaleWidth, scaleHeight) // 按照放大后的比例裁剪图片，绘制到新 canvas
    targetCtx.draw(false, function () {
      wx.canvasToTempFilePath({
        canvasId: 'tempCanvas',
        x: x,
        y: y,
        width: width,
        height: height,
        destWidth: width,
        destHeight: width,
        fileType: "jpg",
        quality: 1,
        success(res) {
          // 裁剪后图片存入变量
          _this.setData({
            userPhoto: res.tempFilePath,
          })
          let arrayBuffer = wx.getFileSystemManager().readFileSync(res.tempFilePath)
          wx.request({
            url: app.globalData.configs.apis.tsf + '/photo/' + (_this.data.beautyCheck ? "true" : "false"),
            method: "POST",
            header: {
              'Token': app.globalData.configs.token
            },
            data: arrayBuffer,
            responseType: "arraybuffer",
            success(res) {
              if (res.statusCode !== 200) {
                // 出错
                try {
                  // 将 arrayBuffer 解码为 UTF-8 字符串后进行 JSON 反序列化
                  // https://stackoverflow.com/questions/17191945/conversion-between-utf-8-arraybuffer-and-string
                  let encodedString = String.fromCharCode.apply(null, new Uint8Array(res.data)),
                    decodedString = decodeURIComponent(escape(encodedString)),
                    response = JSON.parse(decodedString);
                  if (typeof response.Error.Message === "string") {
                    // 已知错误 ( 腾讯云侧 )
                    app.methods.handleError({
                      err: response.Error.Message,
                      title: "出错啦",
                      content: response.Error.Message
                    })
                  } else if (typeof response.Code === "number") {
                    // 已知错误 ( 后端 )
                    app.methods.handleError({
                      err: response,
                      title: "出错啦",
                      content: response.Error
                    })
                  } else {
                    // 未知错误
                    app.methods.handleError({
                      err: decodedString,
                      title: "照片处理接口未知错误",
                      content: decodedString
                    })
                  }
                } catch (err) {
                  // 捕捉错误
                  // 防止 arrayBuffer 解码出错
                  // 防止 JSON 反序列化出错
                  app.methods.handleError({
                    err,
                    title: "照片处理接口未知错误"
                  })
                }
              } else {
                // 处理成功
                fileArrayBuffer = res.data
                _this.setData({
                  isLogin: true,
                  step: 3,
                })
                _this.createPhoto()
              }
              wx.hideLoading()
            },
            fail(err) {
              app.methods.handleError({
                err,
                title: "调用照片处理接口失败"
              })
            }
          })
        }
      })
    })
  },

  /**
   * 生成照片
   */
  createPhoto: function () {
    // 保存当前到 this 指针
    let _this = this

    wx.showLoading({
      title: '生成中...',
    })

    // 保存图片到临时文件
    const tempFilePath = `${wx.env.USER_DATA_PATH}/chaos-temp-` + (new Date().getTime()) + `.png`;
    wx.getFileSystemManager().writeFile({
      filePath: tempFilePath,
      data: fileArrayBuffer,
      encoding: 'binary',
      success: () => {
        // 保存成功
        const width = _this.data.cropperOpt.cut.width * device.pixelRatio
        const height = _this.data.cropperOpt.cut.height * device.pixelRatio
        // 获取 Canvas 上下文
        const ctx = wx.createCanvasContext('photoCanvas')

        // 绘制背景色
        ctx.setFillStyle("#166c9f")
        ctx.fillRect(0, 0, width, height)

        // 绘制人像 这个filePath就是canvas能绘制的路径
        ctx.drawImage(tempFilePath, 0, 0,width, height)

        // 将上下文绘制到 Canvas 实例
        ctx.draw(false, function () {
          // 从 Canvas 实例中获取临时图片链接
          wx.canvasToTempFilePath({
            canvasId: 'photoCanvas',
            // destWidth: 132,
            // destHeight: 170,
            fileType: "jpg",
            quality: 0.8,
            success(res) {
              _this.setData({
                userPhotoUrl: res.tempFilePath
              })
              // 隐藏 loading
              wx.hideLoading()
              // 删除临时文件
              wx.getFileSystemManager().unlink({
                filePath: tempFilePath,
                success: res => {
                  console.log('临时文件删除成功, 路径: ', tempFilePath);
                  console.log(res);
                },
                fail: err => {
                  console.log('临时文件删除失败：', err);
                  console.log(err);
                }
              })
            }
          })
        })
      },
      fail: err => {
        // 保存失败
        app.methods.handleError({
          err,
          title: "生成照片失败"
        })
      }
    });
  },

  /**
   * 保存照片
   */
  savePhoto: function () {
    require("../../utils/photo").save(this.data.userPhotoUrl)
  },
})