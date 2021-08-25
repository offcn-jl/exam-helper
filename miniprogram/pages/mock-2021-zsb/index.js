// pages/position-2020-jr/index

Page({
  data: {
    CRMEFSID: "bdd73e8726fbba466f2738d59997429d ",       // CRM 活动表单 ID
    CRMRemark: "活动编码:HD202108241198,活动表单ID:97460", // CRM 注释 公共英语能力测试

    title:"公共英语能力测试",       // 标题 
    imageUrl:"http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/2021-zsb-share.jpg",     // 分享时显示的图片
    ercode:[                      // 点击识别二维码（一定要数组，哪怕只有一个）
      "http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/mock-2021-zsb/code1.png",   // 吉林中公统招专升本公众号
      "http://jl.offcn.com/zg/ty/images/exam-helper-mini-program/position/2021/mock-2021-zsb/code2.png",   // 吉林专升本备考QQ群
    ],
    time:"00:20:00",  // 倒计时，文本时间
    hours:0,          // 倒计时，单位时
    minute:20,        // 倒计时，单位分
    count:0,          // 倒计时，单位是秒
    mark:5,           // 每题分数
    topiclist:[       // 题目列表
        {
          "problem": "1. —Excuse me, where is Mr. Brown’s office?\n—Sorry, I don’t know. I ________ here for only a few days.",
          "right": "C",
          "jiexi": "【解析】考查动词时态。句意：—打扰一下，布朗先生的办公室在哪里？—抱歉，我不知道，我才来这儿工作几天。for加一段时间与完成时连用，故选C。",
          "A": "work",
          "B": "worked",
          "C": "have worked",
          "D": "will work"
        },
        {
          "problem": "2. John has really got the job because he showed me the official letter ________ him on it.",
          "right": "B",
          "jiexi": "【解析】考查非谓语动词。句意：约翰真的得到了这份工作，因为他给我看了一封正式的信，上面写着他。此处非谓语动词offer的逻辑主语为空格前名词letter，根据句意，两者语态为主动关系，且表伴随，故选B。",
          "A": "offered",
          "B": "offering",
          "C": "to offer",
          "D": "to be offered"
        },
        {
          "problem": "3. —She looks very happy. She ________ have passed the exam.\n—I guess so. It’s not difficult after all.",
          "right": "C",
          "jiexi": "【解析】考查情态动词表推测。句意：—她看上去很高兴，一定是通过了考试。—我猜也是。考试一点也不难。情态动词表推测must have done一定干了什么，由前一句她看起来很高兴可推测她通过考试的可能性很大，故选C。",
          "A": "should",
          "B": "could",
          "C": "must",
          "D": "might"
        },
        {
          "problem": "4. She had golden hair when she was a child, but ________ she got older and older, her hair went darker and darker.",
          "right": "D",
          "jiexi": "【解析】考查时间状语从句。句意：当她还是个孩子的时候，她有一头金色的头发。但是随着年龄的增长，她的头发越长越黑了。As引导的时间状语从句更突出强调“随着……”“一边……边……”，如用when或while则无此效果。故选D。",
          "A": "while",
          "B": "when",
          "C": "after",
          "D": "as"
        },
        {
          "problem": "5. It has always been the ________ of our firm to encourage workers to take part in social activities.",
          "right": "D",
          "jiexi": "【解析】考查名词辨析。句意：本公司的一贯政策是鼓励工人参加社会活动。A选项plan表示“计划”；B选项campaign表示“战役，战争，运动”；C选项procedure表示“过程，进程”；D选项policy表示“政策”，故选D。",
          "A": "plan",
          "B": "campaign",
          "C": "procedure",
          "D": "policy"
        },
        {
          "problem": "6. Mathematics ________ the language of science.",
          "right": "C",
          "jiexi": "【解析】考查主谓一致。句意：数学是一门科学的语言。此处mathematics为学科名词，作主语时谓语动词要用第三人称单数形式，故选C。",
          "A": "are",
          "B": "was",
          "C": "is",
          "D": "is to be"
        },
        {
          "problem": "7. I went to the school ________ my father once worked.",
          "right": "C",
          "jiexi": "【解析】考查定语从句关系词。句意：我去了父亲曾经工作过的那所学校。此句先行词the school，定语从句my father once worked，二者构成的完整句为my father once worked in the school. “in the school”是一个地点状语，故选C。",
          "A": "that",
          "B": "which",
          "C": "where",
          "D": "on which"
        },
        {
          "problem": "8. —I wonder ________.\n—Shandong Province.",
          "right": "B",
          "jiexi": "【解析】考查宾语从句的陈述语序。句意：—我在想彭丽媛是来自哪里。—山东省。根据下文“山东省”可知上文提问的是地点，又因为她来自哪里指的是客观性的动作，用一般现在时态，故选B。",
          "A": "when will Peng Liyuan come",
          "B": "where Peng Liyuan is from",
          "C": "where Peng Liyuan came from",
          "D": "how Peng Liyuan will come"
        },
        {
          "problem": "9. —I believe that the world is ________ you think it is．\n—So smile at the world and it will smile back．",
          "right": "A",
          "jiexi": "【解析】考查表语从句关系词。句意：—我相信世界是你所认为的那样。—所以微笑着面对世界，那么世界也会对你微笑。题干空格后面是be动词后面的表语从句，表语从句中插入了插入语you think，去掉you think发现从句中缺少表语。名词性从句中，what在从句中可以充当表语，故选A。",
          "A": "what",
          "B": "how",
          "C": "that",
          "D": "which"
        },
        {
          "problem": "10. With your help, there is no doubt ________ our plan is meant for will work out successfully．",
          "right": "C",
          "jiexi": "【解析】考查同位语从句。句意：在你的帮助下，毫无疑问，我们的计划是成功的。there is no doubt之后是一个同位语从句，doubt用在否定句中，从句用that引导；________ our plan is meant for是同位语从句中的主语从句，缺少for的宾语，用what引导，故选C。",
          "A": "what that",
          "B": "whether that",
          "C": "that what",
          "D": "that whether"
        },
        {
          "problem": "11. Those ________ finished doing it put up your hands.",
          "right": "A",
          "jiexi": "【解析】考查定语从句关系词。句意：那些已经做完的人举起你的手。此句中，those为定语从句的先行词，相当于those students/clerks，finished dong it为定语从句成分，从句缺主语以及谓语动词的完成时态助动词。主语指人，一般用引导词who，引导词数量与先行词一致为复数，故选A。",
          "A": "who have",
          "B": "who has",
          "C": "which have",
          "D": "have"
        },
        {
          "problem": "12. It was not until 1920 ________ regular radio broadcasts began.",
          "right": "C",
          "jiexi": "【解析】考查强调句式。句意：直到1920年，定期的无线广播才开始。强调句式由“It is/was+...+that/who…”构成，当被强调部分指人时，用who/that，当被强调部分指物时，只能用that，故选C。",
          "A": "which",
          "B": "when",
          "C": "that",
          "D": "since"
        },
        {
          "problem": "13. No one failed in the exam, ________?",
          "right": "C",
          "jiexi": "【解析】考查反义疑问句。句意：没有人没通过这次考试，对吗？当主句主语是one, everybody, anyone, somebody, nobody, no one等不定代词时，疑问部分常用复数they或者单数he。前面是否定，后面用肯定，排除D，故选C。",
          "A": "was he",
          "B": "did one",
          "C": "did they",
          "D": "didn’t he"
        },
        {
          "problem": "14. It was announced that only when the fire was under control ________ to return to their homes.",
          "right": "C",
          "jiexi": "【解析】考查倒装句。句意：据称，只有当火势得到控制的时候，居民们才可以返回家中。Only+when从句放在句首时，用部分倒装，时态用过去将来时，故选C。",
          "A": "the residents would be permitted",
          "B": "had the residents been permitted",
          "C": "would the residents be permitted",
          "D": "the residents had been permitted"
        },
        {
          "problem": "15. International Big Data Expo（国际数据博览会）was held in Guiyang on May 26th.\n—________ exciting news it was!",
          "right": "C",
          "jiexi": "【解析】考查感叹句。句意：国际数据博览会是于五月二十六日在贵阳举办的。—多么振奋人心的消息。感叹句句子结构为what+形容词+不可数名词或可数名词复数+主语+谓语！中心词是news名词且不可数，故选C。",
          "A": "What an",
          "B": "What a",
          "C": "What",
          "D": "How"
        },
        {
          "problem": "16. One can’t be too modest, can ________?",
          "right": "B",
          "jiexi": "【解析】考查反义疑问句。句意：一个人不能太谦虚，不是吗？当主句主语是one, everybody, anyone, somebody, nobody, no one等不定代词时，疑问部分常用复数they或者单数he。故选B。",
          "A": "one",
          "B": "he",
          "C": "it",
          "D": "we"
        },
        {
          "problem": "17. —________ excellent work you have done! \n—It ’s very kind of you to say so.",
          "right": "A",
          "jiexi": "【解析】考查感叹句。句意：—你做了多么出色的工作！—你这么说真是太好了。感叹句结构what+形容词+不可数名词或可数名词复数+主语+谓语！中心词是work名词且不可数，故选A。",
          "A": "What",
          "B": "How",
          "C": "What an",
          "D": "How an"
        },
        {
          "problem": "18. He is a good leader, but he hasn’t ________ in teaching.",
          "right": "B",
          "jiexi": "【解析】考查名词辨析。句意：他是个好老师，但是对教学没有太多经验。experience作“经验”讲时是不可数名词，作“经历”讲时是可数名词。本句中应理解为“经验”，因此是不可数名词，排除AC。又因固定搭配为a lot of或lots of排除D，故选B。",
          "A": "many experiences",
          "B": "much experience",
          "C": "an experience",
          "D": "a lot experience"
        },
        {
          "problem": "19. ________ usually go to church every Sunday.",
          "right": "D",
          "jiexi": "【解析】考查名词辨析。句意：布朗先生一家每个周日通常去教堂。由谓语动词是复数可知主语也是复数的，选项D指的是布朗一家人，选项B指的是一个叫布朗的人。根据题意，故选D。",
          "A": "The Brown",
          "B": "A Brown",
          "C": "Browns",
          "D": "The Browns"
        },
        {
          "problem": "20. ________ of the land in that district ________ covered with trees and grass.",
          "right": "A",
          "jiexi": "【解析】考查分数。句意：这个地区五分之二的土地覆盖着树和草。当分子大于一时，分母用复数形式，这样可排除B和C。land是不可数名词，谓语动词用单数形式，故选A。句意是“那个地区五分之二的陆地被树和草覆盖，故选A。",
          "A": "Two fifths; is",
          "B": "Two fifth; are",
          "C": "Two fifth; is",
          "D": "Two fifths; are"
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
      time:false,        // 倒计时为假值，倒计时停止，不弹窗    
    })
    // 计算分数
    for(var i=0;i<=this.data.selects.length-1;i++){
      if(this.data.selects[i]==this.data.topiclist[i].right){
        this.setData({score:this.data.mark+this.data.score})
      }
    }
    // 在本页，根据分数，展示不同的样式
    if(this.data.score>=90){        // A级成绩1a
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
    this.setData({
      page:-2,           // 打开成绩页面
    })
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
  // 点击识别二维码
  previewImage: function (e) { 
    console.log(e)
    let current=this.data.pic+e.target.dataset.src+".png"; 
    wx.previewImage({ 
     current: current, // 当前显示图片的http链接 
     urls: this.data.ercode // 需要预览的图片http链接列表 
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
