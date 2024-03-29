const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    title:"2021特岗教师报名人数查询",// 标题  
    imageUrl:"http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/enroll-2021-szyf-share.jpg",// 分享时显示的图片
    superiorLink:"/pages/enroll-2021-szyf/index", //上级链接
    actid:"39954", //zg99id

    suffix: "", // 后缀
    showId: 0, // 当前显示的元素的 ID
    query: {},  // 查询条件
     
    zcounts: 0,//最大数据量
    recruits:0,//招聘人数
    result: 0, // 查询结果（报名人数）
  },

  // 在页面发生滚动时，计算是否需要切换标题栏样式
  onPageScroll: function (e) {
    this.selectComponent('#navigation').swtichNavigation(e)
  },

  //可收放数据样式
  // more: function (event) {
  //   this.setData({
  //     showId: event.currentTarget.dataset.index
  //   })
  // },

  // 上拉刷新
  onReachBottom() {
    if (this.data.result.length >= this.data.zcounts) {
      wx.showToast({ title: '没有更多数据啦', icon: 'none' })
      return
    }
    this.search()
  },

  //查询
  search(){
    let _this = this //作用域 
    wx.showLoading({ title: '查询中...', mask: true })
    // 查找所有数据总个数
    db.collection("enroll-2021-szyf").where(_this.data.query).count({
      success: res =>{
        console.log(res)
        _this.setData({
          result:res.total
        })
      }
    }),
    wx.request({
      url: "https://zg99.offcn.com/index/chaxun/getfylist?actid="+_this.data.actid+"&callback=?",
      data: _this.data.query,
      success(res) {
        wx.hideLoading() // 隐藏 loading
        try {
          let list = JSON.parse(res.data.substring(1, res.data.length - 1))//去头尾（）,转为json对象
          console.log("list:",list)
          if (list.status !== 1) {//如果status不等于1，弹出错误提示
            wx.showToast({ title: list.msg, icon: 'none' })
            return  
          }
          if (list.lists.length <= 0) {//如果内容长度小于等于0，弹出无数据提示
            wx.showToast({ title: '没有更多数据啦', icon: 'none' })
            return
          }
          //数据导入data.result
          _this.setData({
            recruits:list.lists[0].recruits
          })
        } catch (err) {//捕获错误并报错
          getApp().methods.handleError({ err, title: "出错啦", content: '查询失败', reLaunch: true })
        }
      }
    })
  },

  onLoad: function (options) {
    // 获取后缀
    if (typeof options.scene !== "undefined") this.setData({ suffix: options.scene })
    // 配置查询条件
    if (typeof options.city !== "undefined" && options.city !== "不限") this.setData({ "query.city": options.city })
    if (typeof options.county !== "undefined" && options.county !== "不限") this.setData({ "query.county": options.county })
    if (typeof options.company !== "undefined" && options.company !== "不限") this.setData({ "query.company": options.company })
    this.search();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: this.data.superiorLink+"?scene=" + this.data.suffix,
      imageUrl: this.data.imageUrl
    }
  },
})