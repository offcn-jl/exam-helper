// pages/position-2020-jr/index

Page({
  data: {
    CRMEFSID: "bd3a4d9c250415359cd2ad1c460cc4b6 ",       // CRM 活动表单 ID
    CRMRemark: "活动编码:HD202109020466,活动表单ID:98281", // CRM 注释 小程序-2022国考试题自测小考堂  

    title:"试题自测小考堂-2022国家公务员考试",       // 标题 
    imageUrl:"http://jl.offcn.com/zg/ty/images/exam-helper/photo-processing/2022-gk-mock-share.jpg",     // 分享时显示的图片
    time:"00:20:00",  // 倒计时，文本时间
    hours:0,          // 倒计时，单位时
    minute:20,        // 倒计时，单位分
    count:0,          // 倒计时，单位是秒
    mark:10,           // 每题分数
    
    topiclist:[       // 题目列表
      {
        "problem": "1、异称词是指不同的社会群体、不同的地区或不同的时代对同一事物的不同称呼。根据上述定义，下列不属于异称词的是：",
        "right": "B",
        "A": "老一辈的人仍习惯把火柴称作“洋火”",
        "B": "现在售货员很多时候会称女顾客为“美女”",
        "C": "明代时人们一般把蛤蟆称为癞施或田鸡",
        "D": "四川人说的红苕其实就是河南人说的红薯",
        "jiexi": "答案解析：异称词的定义要点为：①不同的社会群体、不同的地域或不同的时代；②对同一事物不同的称呼。A项老一辈属于不同的时代，C项明代也属于不同的时代，D项四川人和河南人属于不同的地域，均符合定义；B项未体现不同的称呼，不符合定义。故答案选B。"
      },
      {
        "problem": "2、房地产经纪是以提取佣金为经济特征，为促成他人房地产交易，而从事房地产买卖交换、租赁、置换等信息提供、信托劳务、居间代理等业务的经济活动。根据上述定义，下列属于房地产经纪的是：",
        "right": "C",
        "A": "作为社区工作者，张大妈经常为小区内买卖房屋的人牵线搭桥",
        "B": "某网站设置房产专栏，免费为发布租房卖房信息的会员提供服务",
        "C": "某中介公司接受一房地产开发商的委托，销售其新开发的商品房",
        "D": "物业顾问小李通过自己的房产人脉关系买到一套性价比较高的房子",
        "jiexi": "答案解析：房地产经纪定义的关键信息为：以提取佣金为经济特征。A项牵线搭桥、B项免费、D项自己买房，均不符合定义的关键信息。C项中介公司接受委托销售新房符合定义。故答案选C。"
      },
      {
        "problem": "3、手术刀：外科医生",
        "right": "A",
        "A": "渔网：渔民",
        "B": "讲台：教师",
        "C": "打火机：抽烟者",
        "D": "望远镜：科学家",
        "jiexi": "答案解析：手术刀是外科医生的工作用具；A项渔网是渔民的工作用具。讲台是教师的工作地点。故答案选A。"
      },
      {
        "problem": "4、五位同学对毕业去向进行讨论。小张说：“小王去了百度，小李去了顺丰。”小王说：“小李去了阿里，小赵去了浦发。”小李说：“小赵去了顺丰，小周去了浦发。”小赵说：“小周去了腾讯，小李去了阿里。”小周说：“小张去了阿里，小李去了腾讯。”已知每个人所去的单位不同，而且每个人的去向都有人说对。那么，每个人的毕业去向为：",
        "right": "C",
        "A": "小李去了阿里，小王去了百度，小赵去了腾讯，小张去了顺丰，小周去了浦发",
        "B": "小周去了阿里，小王去了百度，小赵去了腾讯，小张去了顺丰，小李去了浦发",
        "C": "小张去了阿里，小王去了百度，小李去了腾讯，小赵去了顺丰，小周去了浦发",
        "D": "小赵去了阿里，小李去了百度，小周去了腾讯，小张去了顺丰，小王去了浦发",
        "jiexi": "答案解析：每个人的去向都有人说对，其中小张只被提及了一次，故小张去了阿里，排除A、B、D三项。故答案选C。"
      },
      {
        "problem": "5、一个没有普通话一级甲等证书的人不可能成为一个主持人，因为主持人不能发音不标准。上述论证还需基于以下哪一前提？",
        "right": "A",
        "A": "没有一级甲等证书的人都会发音不标准",
        "B": "发音不标准的主持人可能没有一级甲等证书",
        "C": "一个发音不标准的人有可能获得一级甲等证书",
        "D": "一个发音不标准的主持人不可能成为一个受人欢迎的主持人",
        "jiexi": "答案解析：题干前提为：主持人发音要标准，结论为：主持人必然有普通话一级甲等证书。需要在“发音标准”和“有普通话一级甲等证书”之间建立联系。故答案选A。"
      },
      {
        "problem": "6、钢笔：墨水",
        "right": "D",
        "A": "血管：血液",
        "B": "煤炉：煤灰",
        "C": "电钻：钻头",
        "D": "手枪：子弹",
        "jiexi": "答案解析：钢笔需要墨水才能发挥功能，手枪需要子弹才能发挥功能。且墨水和子弹都是消耗品。"
      },
      {
        "problem": "7、初级群体指的是由面对面互动所形成的、具有亲密的人际关系和浓厚的感情色彩的社会群体；次级群体指的是其成员为了某种特定的目标集合在一起，通过明确的规章制度结成正规关系的社会群体。根据上述定义，下列涉及次级群体的是：",
        "right": "C",
        "A": "亲友团来到比赛现场为小李助威",
        "B": "小赵要到大城市上学了，山里的乡亲们都到村口为他送行",
        "C": "小王考上了研究生，公司的同事一起为他庆贺",
        "D": "20年之后，小张儿时的玩伴建立了一个微信群",
        "jiexi": "答案解析：次级群体定义的关键信息为：通过明确的规章制度结成正规关系。A项的亲友团、B项的乡亲、D项的儿时玩伴，均不符合定义的关键信息。C项公司的同事是因为共同的工作目标，通过明确的公司规章制度结成的正规关系的社会群体，符合定义。故答案选C。"
      },
      {
        "problem": "8、渗透调节是指干旱、低温、高温、盐渍等多种逆境都会直接或间接地对植物形成水分胁迫，在水分胁迫下，某些植物体内可主动积累各种有机或无机物质来提高细胞液浓度，降低渗透势，提高细胞吸水或保水能力，从而适应水分胁迫环境。根据上述定义，下列选项不属于渗透调节的是：",
        "right": "A",
        "A": "饮水不足时细胞外液渗透压升高刺激下丘脑渗透压感受器而产生渴觉",
        "B": "滨黎属植物遇盐胁迫叶细胞体积增大，吸收更多的水分降低盐分浓度",
        "C": "盐胁迫下的翅碱蓬可以吸取外界的盐分并积累在液泡中从而吸收水分",
        "D": "玉米植株对干旱胁迫第一响应通过气孔关闭避开低水势减少光能捕获",
        "jiexi": "答案解析：渗透调节的主体是某些植物体。A项饮水明显不符合定义。故答案选A。"
      },
      {
        "problem": "9、下列对供给侧结构性改革的认识正确的是：",
        "right": "D",
        "A": "供给侧改革就是政府调结构",
        "B": "供给侧改革就是西方供给学派理论",
        "C": "供给侧改革的目标仅是“三去一降一补”",
        "D": "供给侧改革要让市场在资源配置中起决定作用",
        "jiexi": "答案解析：2016 年国家行政学院主办的“供给侧结构性改革”座谈会在京举行。国家行政学院党委委员、常务副院长马建堂指出，供给侧结构性改革关键是要解决生产要素的合理配置问题，核心就是要使市场在资源配置中起决定性作用。供给侧结构性改革的根本目的是提高供给质量满足需要。C 说法错误。AB 说法错误。故本题答案选 D。"
      },
      {
        "problem": "10、党的十八大以来，一些标志性话语深刻反映了中央治国理政新理念。下列标志性话语与治国理政新理念对应错误的是： ",
        "right": "B",
        "A": "“凝聚共识，合作共赢”——发展大国外交",
        "B": "“踏石留印，抓铁有痕”——推动国防军队改革",
        "C": "“刮骨疗毒，壮士断腕”——加强党风廉政建设",
        "D": "“一个都不能少”——全面建成小康社会",
        "jiexi": "答案解析：“踏石留印、抓铁有痕”，强调的是针对困难任务， 要动真格、见成效。习近平总书记提及这一关键词的场合，主要是针对两项 工作：一是全面从严治党，二是全面深化改革。正是在这一要求下，全面从 严治党举措不断，党风政风为之一新；全面深化改革持续推进，走进了“全 面推进结构性改革的攻坚之年”。B 项搭配错误，故本题答案选 B"
      }
    ],

    page:-1,          // 页面 -1为首页，0以后为答题页,-2为考试成绩页
    grade:"4d",       //成绩评分
    choice:"",        // 选中的选项
    selects:[],       // 所有选择
    score:0,          // 成绩
    userInfo: {       // 用户信息
      avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/2pjg57ic8bz0QRlaUnGCIZH9m5HXhBGlHJHx3pWVmurEib5JZYsRhRFnzo5ZsS8uJTOasoxiaqia5jFKuQstLDHSLg/132",
      nickName:"未知用户"
    },
    pic:"http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/mock-2021-zsb/",  // 基本图片路径
    progress:0,       // 进程百分比
    parse:false,      //答案解析开启按钮
    parselist:0,      //答案解析列表

    suffix: "",       // 后缀
    phone: "",        // 用户手机号码
  },

  // 注册（录入crm数据）
  buttonStart: function (e) {
    getApp().methods.register(e, this.data.suffix, this.data.CRMEFSID, this.data.CRMRemark, phone => {
      this.setData({ phone })
      this.getUserProfile()
    })
  },
  // 点击进入，授权微信名和头像
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          page:0,
        })
      }
    })
  },
  // 点击选择
  choice(e){
    var page = this.data.page
    // 发生第一次点击时，开始倒计时
    if(page==0){
      this.daojishi()
    }
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
      wx.showToast({
        title: '请先选择你的答案~',
        icon: 'none'
      })
    }
  },
  // 提交答案
  submit(){
    // 进度条百分百，倒计时不弹窗停止
    this.setData({
      progress: 100,     // 百分比 
      page:-2,           // 打开成绩页面
      time:false,        // 倒计时为假值，倒计时停止，不弹窗    
    })
    // 计算分数
    for(var i=0;i<=this.data.selects.length-1;i++){
      if(this.data.selects[i]==this.data.topiclist[i].right){
        this.setData({score:this.data.mark+this.data.score})
      }
    }
    // 在本页，根据分数，展示不同的样式
    if(this.data.score>=80){        // A级成绩1a
      this.setData({
        grade:'1a'
      })
    }else if(this.data.score>=60){  // B级成绩2b
      this.setData({
        grade:'2b'
      })
    }else if(this.data.score>=30){  // C级成绩3c
      this.setData({
        grade:'3c'
      })
    }else{                          // D级成绩4d
      this.setData({
        grade:'4d'
      })
      return
    }
    // 跳转到页面-2
    // this.setData({
    //   page:-2,           // 打开成绩页面
    //   time:false,        // 倒计时为假值，倒计时停止，不弹窗    
    // })
  },
  // 倒计时
  daojishi(){
    let countDown = setInterval(() => {
      // 时间为假值，不弹窗式停止倒计时
      if(!this.data.time){
        clearInterval(countDown)
      }
      // 时间读取完，答题结束
      if(this.data.time == "00:00:00"){
        clearInterval(countDown)
        // 弹出提示，答题时间到
        wx.showModal({
          title: '提示',
          content: '答题时间到',
        })
        // 提交成绩
        this.submit()
        this.setData({
          page:-2,           // 打开成绩页面
        })
        return
      }
      this.data.count --
      if (this.data.count < 0) {
        --this.data.minute;
        this.data.count = 59;
      }
      if (this.data.minute < 0) {
        --this.data.hours;
        this.data.minute = 59
      }
      if (this.data.hours < 0) {
        this.data.count = 0;
        this.data.minute = 0;
      }
      let h=this.data.hours
      let m=this.data.minute
      let s=this.data.count
      if(this.data.hours.toString().length==1){
        h="0"+this.data.hours
      }
      if(this.data.minute.toString().length==1){
        m="0"+this.data.minute
      }
      if(this.data.count.toString().length==1){
        s="0"+this.data.count
      }
      this.setData({
        time: h+":"+m+":"+s,
      })
    },1000);
  },
  // 答案解析
  ckjx(){
    this.setData({
      parse:true
    })
  },
  // 解析答案下一题
  parsenext(){
    let num = ++this.data.parselist
    if(num >= this.data.topiclist.length-1){
      this.setData({
        parselist:this.data.topiclist.length-1
      })
      wx.showToast({
        title: '已经是最后一题啦哦~',
        icon: 'none'
      })
    }else(
      this.setData({
        parselist:num
      })
    )
  },
  // 解析答案上一题
  parseprev(){
    let num = --this.data.parselist
    if(num <= 0){
      this.setData({
        parselist:0
      })
      wx.showToast({
        title: '已经是第一题啦哦~',
        icon: 'none'
      })
    }else(
      this.setData({
        parselist:num
      })
    )
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
    // 如果考分等级为空，表示未答题或页面错误，返回首页重新开始
    if(this.data.grade == ""){
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
