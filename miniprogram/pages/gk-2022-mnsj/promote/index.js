const CONFIG = require('../bargain');
Page({
    data: {
        CRMEFSID: "6718b04c16c0961ef5148761b514a3ac ",       // CRM 活动表单 ID
        CRMRemark: "活动编码:HD202109011712,活动表单ID:98241", // CRM 注释 小程序-国考模拟卷测评助力
        
        title:"助力-2022国考模拟试卷",// 标题
        spid:1, // 商品id
        imageUrl:"http://jl.offcn.com/zg/ty/images/exam-helper/zl-2022gk-mnsj/2022gk-mnsj-share.jpg",// 分享时显示的图片
        suffix: "", // 后缀
        yqphone: "", // 邀请人手机号
        phone:"", // 协助人手机
        success:false, // 成功
    },
    // 注册
    buttonStart: function (e) {
        getApp().methods.register(e, this.data.suffix, this.data.CRMEFSID, this.data.CRMRemark, phone => {
            this.setData({ phone })
            this.showq()
        })
    },
    /**
	 * 生命周期函数--监听页面加载
	 */
    onLoad: function(options) {
        this.setData({
            yqphone:options.yqphone,
            spid:options.spid,
            suffix:options.scene,
        })
        // 判断是否是单页模式 toto 这里要结合登陆使用
        if (wx.getLaunchOptionsSync().scene !== 1154) {
            getApp().methods.login(this.data.CRMEFSID, this.data.suffix, this.data.CRMRemark, phone => this.setData({ phone })) // 登录
        }
        wx.setNavigationBarTitle({
            title:this.data.title
        })
    },
    // 点击助力
    showq: function() {
        wx.request({
            url: CONFIG.writexzAPI,
            data: {
              phone: this.data.yqphone,   //发起邀请人手机号
              xzphone: this.data.phone,     //协助人手机号（本）
              spid: this.data.spid,
              sstime: Math.round(new Date() / 1000)
            },
            success: res => {
                let text = res.data;
                let result_text = text.substring(1, text.length - 1);
                let result = JSON.parse(result_text);
                if(result.status==1){
                    wx.showToast({
                        title: result.msg,
                        icon: 'none',
                        duration: 1000
                    })
                    this.setData({
                        success:true
                    })
                }else{
                    wx.showToast({
                        title: result.msg,
                        icon: 'none',
                        duration: 1000
                    })
                }
            }
        });
    },
    // 点击我也要
    receive(){
        wx.navigateTo({
            url: "../bargain/index" + this.data.suffix + "&phone=" + this.data.phone+"&spid=" + this.data.spid
        });
    }
});