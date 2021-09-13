Page({
    data: {
        title: "2021吉林医疗卫生“医”动能量站",// 标题
        list: [ //列表
            {
                name: '公共基础知识',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/ggjczs.pdf'
            },
            {
                name: '护理学',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/hlx.pdf'
            },
            {
                name: '检验学',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/jyx.pdf'
            },
            {
                name: '临床医学',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/lcyx.pdf'
            },
            {
                name: '药学',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/yx.pdf'
            },
            {
                name: '医学基础知识',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/yxjczs.pdf'
            },
            {
                name: '康复医学',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/kfyx.pdf'
            },
            {
                name: '影像医学',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/yxyx.pdf'
            },
            {
                name: '职业能力测试',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/zynlcs.pdf'
            },
            {
                name: '中西医结合',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/zxyjh.pdf'
            },
            {
                name: '中药学',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/zyx.pdf'
            },
            {
                name: '中医学',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/zyx.pdf'
            },
            {
                name: '卫生政策法律法规',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/wszcflfg.pdf'
            },
            {
                name: '医学常识',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/yxcs.pdf'
            },
            {
                name: '预防医学',
                url: 'http://jl.offcn.com/zg/ty/images/exam-helper/zl-2021-ylnlz/yfyx.pdf'
            },
        ]
    },
    onLoad: async function (options) {
        wx.setNavigationBarTitle({
          title:this.data.title
        })
    },
    setClipboard(res){
        console.log(res.currentTarget.dataset.url)
        wx.setClipboardData({
            data: res.currentTarget.dataset.url,
            success (res) {
                wx.showModal({
                    title: '提示',
                    content: '链接已经复制成功，请在浏览器中下载文件',
                })
            }
        })
    },
});