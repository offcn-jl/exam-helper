Page({
    data: {
        title:"助力-2022国考模拟试卷",// 标题
    },
    onLoad: async function (options) {
        wx.setNavigationBarTitle({
          title:this.data.title
        })
    }
});