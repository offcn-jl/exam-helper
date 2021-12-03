// pages/position-2020-jr/index

Page({
  data: {
    CRMEFSID: "179cb55e731046b9350f2a4bd5d6ba0b ",       // CRM 活动表单 ID
    CRMRemark: "活动编码:HD202108270756,活动表单ID:97781", // CRM 注释 小程序-测测你未来会成为怎样的老师？

    title:"测测你未来会成为怎样的老师",       // 标题 
    imageUrl:"http://jl.offcn.com/zg/ty/images/exam-helper/2021-jscs/share.jpg",     // 分享时显示的图片
    pic:"http://jl.offcn.com/zg/ty/images/exam-helper/2021-jscs/",  // 基本图片路径
    
    popup:false,      // 弹窗开关
    form:"",          // 最终老师类型
    teacherlist:[     // 老师类型列表
      {
        "tyle":"最受欢迎型老师",
        "con":"　　你喜欢与人交往、不断结交新的朋友、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用。寻求广泛的人际关系，比较看重社会义务和社会道德。\n　　你通常喜欢周围有别人存在，对学生的事很有兴趣，乐于帮助学生解决难题。你助人为乐、有责任心、热情、善于合作、富于理想、友好、善良、慷慨、耐心。\n　　是最受学生欢迎的明星老师没错啦！",
        "url":""
      },
      {
        "tyle":"最正派老师",
        "con":"　　你喜欢追求权力、权威和物质财富，具有领导才能。喜欢竞争、敢冒风险、有野心、抱负。为人务实，做事有较强的目的性，能迅速解决班级内部矛盾，并每天为班级争得荣誉费劲头脑。具有领导才能和口才，对金钱和权利感兴趣，喜欢影响、教导学生。你爱交际与冒险、精力充沛、乐观、细心、抱负心强。\n　　严师出高徒！这句话和你更配哦！",
        "url":""
      },
      {
        "tyle":"默默付出型老师",
        "con":"　　你尊重权威和规章制度，喜欢按计划办事，细心、有条理。喜欢关注实际和细节情况，通常较为谨慎和保守，缺乏创造性，不喜欢冒险和竞争，但富有自我牺牲精神。\n　　你乐于整理、安排事务。往往喜欢同文字、数字打交道，比较顺从、务实、细心、节俭、做事利索、很有条理性。可以非常耐心的对待同学犯下的错误和屡次出现的问题，不慌张不急躁。\n　　看来同学们最喜欢找你解决学习中的问题哦！",
        "url":""
      },
      {
        "tyle":"最浪漫老师",
        "con":"　　你喜欢文学、音乐、语言甚至是舞蹈。这种取向类型的人往往具有某些艺术上的技能，喜欢创造性的工作，富于想象力。因为较开放、好想象、有创造性的特点，你时常能为学生带来不一样的小惊喜，在教导学生时有自己的独到见解和特殊方式，学生们在上课时总能和你一起大开脑洞。\n　　浪漫、惊喜是你的代言词，独特是你在学生心中的特点哦！",
        "url":""
      }
    ],
    topiclist:[       // 题目列表
      {
        "problem": "1.和他人的关系丰富了我的生命并使它有意义。",
        "A": "是",
        "B": "否"
      },
      {
        "problem": "2.我喜欢竞争。",
        "A": "是",
        "B": "否"
      },
      {
        "problem": "3.我做事必须有清楚的指引。",
        "A": "是",
        "B": "否"
      },
      {
        "problem": "4.我重视美丽的环境。",
        "A": "是",
        "B": "否"
      },
      {
        "problem": "5.我认为能把自己的焦虑和别人分担是很重要的。",
        "A": "是",
        "B": "否"
      },
      {
        "problem": "6.成为群体中的关键任务执行者，对我很重要。",
        "A": "是",
        "B": "否"
      },
      {
        "problem": "7.我在开始一个计划前会花很多时间去计划。",
        "A": "是",
        "B": "否"
      },
      {
        "problem": "8.我喜欢非正式的穿着，尝试新颜色和款式。",
        "A": "是",
        "B": "否"
      },
      {
        "problem": "9.我常能体会到某人想要和他人沟通的需要。",
        "A": "是",
        "B": "否"
      },
      {
        "problem": "10.我喜欢帮助别人不断改进。",
        "A": "是",
        "B": "否"
      },
      {
        "problem": "11.我在决策时，通常不愿冒险。",
        "A": "是",
        "B": "否"
      },
      {
        "problem": "12.我的心情受音乐、色彩和美丽事物的影响极大。",
        "A": "是",
        "B": "否"
      }
    ],

    page:-1,          // 页面 -1为首页，0以后为答题页,-2为考试成绩页
    choice:"",        // 选中的选项
    selects:[],       // 所有选择
    progress:0,       // 进程百分比

    suffix: "",       // 后缀
    phone: "",        // 用户手机号码
  },
  // 注册（录入crm数据）
  buttonStart: function (e) {
    getApp().methods.register(e, this.data.suffix, this.data.CRMEFSID, this.data.CRMRemark, phone => {
      this.setData({ phone })
      this.open()
    })
  },
  // 开始测试
  open() {this.setData({page:0})},
  // 关闭弹窗
  popup(){this.setData({popup:false})},
  // 点击选择
  choice(e){
    var page = this.data.page
    // 获取用户选择的答案
    this.data.selects[page]=e.currentTarget.dataset.index;
    // data赋值给choice 点击选择变色
    this.setData({
      selects:this.data.selects,
      choice:e.currentTarget.dataset.index
    })
  },
  // 下一题
  next(){
    var num = this.data.topiclist.length
    var base = parseInt(100/num)
    // 如果choice是空，代表没有进行选择，提示；如果不是空，表示已经做出了选择，进入下一页
    if(this.data.choice!=""){
      this.setData({
        page:this.data.page+1,
        choice:"",
        progress: this.data.progress+base,     //百分比 （100/题目个数，之后取整，与原数相加，获取近似值）
      })
    }else{
      this.setData({
        popup:true
      })
    }
  },
  // 提交答案
  submit(){
    // 在本页，根据答案不同，展示不同的样式
    // 答案对应表（录入答题情况，1-5-9录入[0],2-6-10录入[1],3-7-11录入[2],4-8-12录入[3]）
    let table = [0,0,0,0]       
    let summary = []  // 汇总列表，录入满足条件的老师类型
    // 遍历，如果选择的答案是A，在答案对应表table里录入对应数据个数
    for(let i=0;i<=this.data.selects.length-1;i++){
      if(this.data.selects[i]=='A'){
        if(i==0||i==4||i==8){
          table[0] = table[0]+1
        }else if(i==1||i==5||i==9){
          table[1] = table[1]+1
        }else if(i==2||i==6||i==10){
          table[2] = table[2]+1
        }else if(i==3||i==7||i==11){
          table[3] = table[3]+1
        }
      }
    }
    // 获取数组中最大值
    function myFunction(x){
      var max = x[0];
      if (x.length<2) {return max;}
      for (var i = 0; i<x.length; i++) {
        if(x[i]>max){max=x[i];}
      }
      return max;
    }
    let max = myFunction(table)
    // 添加汇总列表的数据(如果table数组里对应数等于最大值，录入summary)
    if(table[0]==max){
      let num = summary.length
      summary[num]="最受欢迎型老师"
    }
    if(table[1]==max){
      let num = summary.length
      summary[num]="最正派老师"
    }
    if(table[2]==max){
      let num = summary.length
      summary[num]="默默付出型老师"
    }
    if(table[3]==max){
      let num = summary.length
      summary[num]="最浪漫老师"
    }
    // 获取随机数  进而在数组中随机选择老师类型
    let x = summary.length-1
    let y = 0
    let num = parseInt(Math.random()*(x-y+1)+y);
    this.setData({
      form : summary[num]
    })
    // 跳转到页面-2
    this.setData({
      progress: 100,     // 百分比 
      page:-2,           // 打开成绩页面
      // time:false,        // 倒计时为假值，倒计时停止，不弹窗    
    })
  },
  // 微信小程序跳转到H5网页
  out(e){
    wx.navigateTo({
      url:'out/out?url='+e.currentTarget.dataset.url+'&scode'+this.data.suffix
    })
  },
  /**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
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
    // 如果老师类型为空，表示未答题或页面错误，返回首页重新开始
    if(this.data.form == ""){
      this.setData({
        page:-1
      })
    }
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
      imageUrl:  this.data.imageUrl
    }
  },

  /**
   * 用户点击右上角分享 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title:  this.data.title
    }
  }
})
