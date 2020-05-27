// 获取运行环境
// envVersion 在低版本的基础库中不兼容
// 兼容的最低版本是 2.10.0
// 综合用户占比等情况, 本项目选择 2.10.4 作为基础库最低版本设置
// 不过为了避免踩坑, 还是在此处做了 envVersion 是否存在的判断, 如果 envVersion 不存在则默认为 release
const environment = wx.getAccountInfoSync().miniProgram.envVersion ? wx.getAccountInfoSync().miniProgram.envVersion : "release"

// 非保密配置项
module.exports = {
  // 运行环境
  environment,
  // 云开发运行环境
  cloudEnvironment: environment === "release" ? "release-opb6d" : "test-trti4",
  // 接口路径
  apis: environment === "release" ? {
    // 生产环境
    tke: "https://api.chaos.jilinoffcn.com/release",
    scf: "https://scf.tencent.jilinoffcn.com/release",
    tsf: "https://tsf.tencent.jilinoffcn.com/release"
  } : {
    // 测试环境
    tke: "https://api.chaos.jilinoffcn.com/test",
    scf: "https://scf.tencent.jilinoffcn.com/test",
    tsf: "https://service-13mae2rr-1258962498.bj.apigw.tencentcs.com"
  },
  // 引入保密配置项
  ...(environment === "release" ? require("./config.secrets").release : require("./config.secrets").test)
}