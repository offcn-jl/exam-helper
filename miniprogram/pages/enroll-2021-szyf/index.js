const db = wx.cloud.database()
Page({
  data: {
    title:"晒出你心仪的三支一部职位",// 标题
    banner_bk:"http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/enroll-2021-szyf-index.jpg",// 背景图片
    imageUrl:"http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/enroll-2021-szyf-share.jpg",// 分享时显示的图片
    CRMEFSID: "fa82bddac596e8718955b7433eb9275e", // CRM 活动表单 ID
    CRMRemark: "活动编码:HD202107050758,活动表单ID:92228", // CRM 注释  三支一扶晒岗位小程序
    actid:"39954", //zg99id  2021特岗教师职位筛选

    cityList: [],//市州
    countyList: [ ],//县市区
    companyList: [],//服务单位名称
    cityValue: '', //市州
    countyValue: '', //县市区
    companyValue: '', //服务单位名称

    suffix: "", // 后缀
    phone: "", // 用户手机号码
    openid:"",  //openid
    result:"",  //返回值
  },

  // 监听筛选条件切换(市州做出选择以后，报考职位发生变化)
  m_select_touch(e) {
    var _this=this
    switch (e.detail.type) {
      case "city": //县市区
        _this.setData({ cityValue: _this.data.cityList[e.detail.index] })
        // zg99二级联动
        wx.request({
          url: "https://zg99.offcn.com/index/chaxun/getlevel?actid="+_this.data.actid+"&callback=?",  //路径
          data: {level: '2', grfiled:'city',grtext:_this.data.cityValue,sstime: new Date().valueOf()},  //二级联动，上级联动字段名，上级联动参数值
          success(res) {
            let county_list = JSON.parse(res.data.substring(1, res.data.length - 1));  //去头尾（）,转为json对象
            // 现将之前市州选项中报考职位内容清空
            _this.setData({
              countyList:  [],
              companyList:  []
            });
            // 将数据添加到已清空的报考职位中
            for( var i=0; i<county_list.lists.length; i++ ){
              _this.setData({
                countyList:  _this.data.countyList.concat(county_list.lists[i].county)
              });
            };
          },
          fail: err => {//获取失败后提示
            wx.hideLoading() // 隐藏 loading
            getApp().methods.handleError({ err: err, title: "出错啦", content: '查询失败', reLaunch: true })
          }
        })
        break
      case "county": //县市区
        _this.setData({ countyValue: _this.data.countyList[e.detail.index] })
        // zg99三级联动
        wx.request({
          url: "https://zg99.offcn.com/index/chaxun/getlevel?actid="+_this.data.actid+"&callback=?",  //路径
          data: {level: '3', grfiled:'county',grtext:_this.data.countyValue,sstime: new Date().valueOf()},  //二级联动，上级联动字段名，上级联动参数值
          success(res) {
            let company_list = JSON.parse(res.data.substring(1, res.data.length - 1));  //去头尾（）,转为json对象
            // 现将之前市州选项中报考职位内容清空
            _this.setData({
              companyList:  []
            });
            // 将数据添加到已清空的报考职位中
            for( var i=0; i<company_list.lists.length; i++ ){
              _this.setData({
                companyList:  _this.data.companyList.concat(company_list.lists[i].company)
              });
            };
          },
          fail: err => {//获取失败后提示
            wx.hideLoading() // 隐藏 loading
            getApp().methods.handleError({ err: err, title: "出错啦", content: '查询失败', reLaunch: true })
          }
        })
        break
      case "company": //县市区
        _this.setData({ companyValue: _this.data.companyList[e.detail.index] })
        break
    }
  },

  // 搜索
  async seach_result() {
    let url = "result/index?scene=" + this.data.suffix
    if (this.data.cityValue !== "") url += "&city=" + this.data.cityValue
    if (this.data.countyValue !== "") url += "&county=" + this.data.countyValue
    if (this.data.companyValue !== "") url += "&company=" + this.data.companyValue
    wx.reLaunch({ url })
  },

  // 注册（录入crm数据）(user未有数据)
  buttonStart: function (e) {
    console.log(this.data)
    // 相应岗位数据
    if (this.data.cityValue==""||this.data.countyValue==""||this.data.companyValue=="") {
      wx.showToast({ title: '请选择相应岗位', icon: 'none' })
    }else{
      // 将数据录入user 导出电话号  运行“报名”函数
      getApp().methods.register(e, this.data.suffix, this.data.CRMEFSID, this.data.CRMRemark, phone => {
        var _this=this
        this.setData({ phone })
        wx.cloud.database().collection('user')
        .field({ _openid: true,phone:true })
        .where({ createdTime: wx.cloud.database().command.gte(new Date((new Date()).getTime() - 30 * 24 * 60 * 60 * 1000)) })
        .get({
          success:res=>{
            console.log("注册期间，判断user里数据内容",res)
            // 如果数据长度大于0，表示有数据，提取其中一个，录入data即可；同时在enroll-2021-szyf中判断是否有相同openid的数据
            if(res.data.length > 0){
              _this.setData({
                openid:res.data[0]._openid
              })
              console.log("注册期间，获取openid",_this.data.openid)
              db.collection("enroll-2021-szyf").where({_openid:_this.data.openid}).count({
                success: res =>{
                  console.log(res)
                  _this.setData({
                    result:res.total
                  })
                  console.log("注册期间，判断szyf里是否有对应数据",_this.data.result)
                  if(_this.data.result == ""){ //如果result是空，表示openid没有在enroll-2021-szyf里
                    db.collection("enroll-2021-szyf").add({ //将新用户的手机号录入enroll-2021-szyf
                      data:{
                        phone:_this.data.phone, //手机号码
                        city:_this.data.cityValue,
                        county:_this.data.countyValue,
                        company:_this.data.companyValue,
                      },
                    }).then(res=>{
                      _this.seach_result() // 执行查询
                    }).catch(err =>{
                      console.error(err);
                      wx.showToast({
                        title: '数据库调取失败',
                      })
                    })
                  }else{    //如果result有值，或为1，表示enroll-2021-szyf里有这个openid
                    // 对原来数据进行修改
                    db.collection("enroll-2021-szyf").where({_openid:_this.data.openid}) .update({
                      data: {
                        city:_this.data.cityValue,
                        county:_this.data.countyValue,
                        company:_this.data.companyValue,
                      }
                    }).then(res=>{
                      _this.seach_result() // 执行查询
                    }).catch(err =>{
                      console.error(err);
                      getApp().methods.handleError({
                        err: err,
                        title: "出错啦",
                        content: "创建用户失败"
                      })
                    })
                  }
                },
                fail: res => {
                  console.log('失败',res);
                }
              })
            }
          }
        })
      })
    }
  },

  // 报名函数运行
  tipsToSubscribeMessage() {
    let _this = this
    // 再次判断相应岗位数据（上面部分因判断会有隐藏的情况）
    if (_this.data.cityValue==""||_this.data.countyValue==""||_this.data.companyValue=="") {
      wx.showToast({ title: '请选择相应岗位', icon: 'none' })
    }else{
      if(_this.data.result == ""){ //如果result是空，表示openid没有在enroll-2021-szyf里
        db.collection("enroll-2021-szyf").add({ //将新用户的手机号录入enroll-2021-szyf
          data:{
            phone:_this.data.phone, //手机号码
            city:_this.data.cityValue,
            county:_this.data.countyValue,
            company:_this.data.companyValue,
          },
        }).then(res=>{
          _this.seach_result() // 执行查询
        }).catch(err =>{
          console.error(err);
          getApp().methods.handleError({
            err: err,
            title: "出错啦",
            content: "创建用户失败"
          })
        })
      }else{    //如果result有值，或为1，表示enroll-2021-szyf里有这个openid
        // 对原来数据进行修改
        db.collection("enroll-2021-szyf").where({_openid:_this.data.openid}) .update({
          data: {
            city:_this.data.cityValue,
            county:_this.data.countyValue,
            company:_this.data.companyValue,
          }
        }).then(res=>{
          _this.seach_result() // 执行查询
        }).catch(err =>{
          console.error(err);
          getApp().methods.handleError({
            err: err,
            title: "出错啦",
            content: "创建用户失败"
          })
        })
      }
    }
  },

  /**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: async function (options) {
    let _this=this
    // 判断是否录入过user表中
    wx.cloud.database().collection('user')
    .field({ _openid: true,phone:true })
    .where({ createdTime: wx.cloud.database().command.gte(new Date((new Date()).getTime() - 30 * 24 * 60 * 60 * 1000)) })
    .get({
      success:res=>{
        console.log("监听页面期间，判断user里数据内容",res)
        // 如果数据长度大于0，表示有数据，提取其中一个，录入data即可；同时在enroll-2021-szyf中判断是否有相同openid的数据
        if(res.data.length > 0){
          _this.setData({
            openid:res.data[0]._openid,
            phone:res.data[0].phone
          })
          db.collection("enroll-2021-szyf").where({_openid:_this.data.openid}).count({
            success: res =>{
              _this.setData({
                result:res.total
              })
              console.log("监听页面期间，判断szyf里是否有对应数据",_this.data.result)
            },
            fail:err =>{
              getApp().methods.handleError({
                err: err,
                title: "出错啦",
                content: "创建用户失败"
              })
            }
          })
        }
      }
    })
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
    // 获取数据
    wx.request({
      url: "https://zg99.offcn.com/index/chaxun/getlevel?actid="+_this.data.actid+"&callback=?",
      data: {level:"1", grfiled:'',grtext:'',sstime: new Date().valueOf()},
      success(res) {
        console.log(res)
        try {
          let list = JSON.parse(res.data.substring(1, res.data.length - 1)); //去头尾（）,转为json对象
          // console.log(list)
          if (list.status !== 1) {//如果status不等于1，弹出错误提示
            wx.showToast({ title: list.msg, icon: 'none' })
            return  
          }
          if (list.lists.length <= 0) {//如果内容长度小于等于0，弹出无数据提示
            wx.showToast({ title: '没有更多数据啦', icon: 'none' })
            return
          }
          // 录入市州里的单位，不用提前清空，因为只进行一次获取
          for(var i=0; i<list.lists.length; i++ ){
            _this.setData({
              cityList:  _this.data.cityList.concat(list.lists[i].city)
            });
          };
        } catch (err) {//捕获错误并报错
          getApp().methods.handleError({ err, title: "出错啦", content: '查询失败', reLaunch: true })
        }
      },
      fail: err => {//获取失败后提示
        wx.hideLoading() // 隐藏 loading
        getApp().methods.handleError({ err: err, title: "出错啦", content: '查询失败', reLaunch: true })
      }
    })
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
      imageUrl: this.data.imageUrl,
    }
  },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: this.data.title,
    }
  }
})
