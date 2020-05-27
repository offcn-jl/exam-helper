module.exports = {
  save: (imagePath) => {
    if (imagePath === "") {
      console.log("尚未生成，跳过保存");
      app.methods.handleError({
        err,
        title: "出错啦",
        content: "尚未生成照片"
      })
      return
    }
    wx.showActionSheet({
      itemList: ['保存到手机相册'],
      success(res) {
        if (res.tapIndex === 0) {
          // 内部临时函数 保存图片到相册函数
          let saveImage = () => {
            wx.saveImageToPhotosAlbum({
              filePath: imagePath,
              success() {
                wx.showToast({
                  title: '保存成功'
                })
              },
              fail() {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
              }
            })
          }

          // 内部临时函数 跳转到授权页面函数
          let openConfig = () => {
            wx.showModal({
              title: '提示',
              content: '该功能需要您同意授权保存图片到相册 ( 仅包含保存权限 ) ！',
              cancelText: "我知道了",
              confirmText: "去授权",
              success(res) {
                if (res.confirm) {
                  // 用户点击了去授权按钮
                  // 打开授权页面
                  wx.openSetting({
                    success(res) {
                      // 从授权页返回当前页面
                      //console.log(res.authSetting)
                      // res.authSetting = {
                      //   "scope.userInfo": true,
                      //   "scope.userLocation": true
                      // }
                      if (!res.authSetting['scope.writePhotosAlbum']) {
                        // 用户没有同意授权，再次弹出提示
                        openConfig()
                      } else {
                        // 用户同意了写入相册授权则直接保存
                        saveImage()
                      }
                    }
                  })
                } else if (res.cancel) {
                  // 用户点击了取消按钮
                  //console.log('用户点击取消')
                }
              }
            })
          }

          // 弹出 loading
          wx.showLoading({
            title: '请稍候...',
          })

          // 获取用户是否开启用户授权相册
          wx.getSetting({
            success(res) {
              // 如果没有则获取授权
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                    // 用户同意授权，直接进行保存
                    saveImage()
                    wx.hideLoading()
                  },
                  fail() {
                    // 如果用户拒绝过或没有授权，打开提示窗口
                    openConfig()
                    wx.hideLoading()
                  }
                })
              } else {
                // 已有授权则直接保存
                saveImage()
                wx.hideLoading()
              }
            }
          })
        }
      },
      fail(err) {
        app.methods.handleError({
          err,
          title: "保存到手机相册失败",
          content: res.errMsg
        })
      }
    })
  }
}