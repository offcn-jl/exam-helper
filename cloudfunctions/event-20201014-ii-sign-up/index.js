// 云函数入口文件
const releaseApis = {
  tke: "https://api.chaos.jilinoffcn.com/release",
  scf: "https://scf.tencent.jilinoffcn.com/release",
  tsf: "https://tsf.tencent.jilinoffcn.com/release"
}
const testApis = {
  tke: "https://api.chaos.jilinoffcn.com/test",
  scf: "https://scf.tencent.jilinoffcn.com/test",
  tsf: "https://service-13mae2rr-1258962498.bj.apigw.tencentcs.com"
}
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  // 判断手机号是否合规
  if (event.cloudID.data.phoneNumber.length !== 11 || event.cloudID.data.purePhoneNumber.length !== 11) {
    return { code: -1, error: "您提交的手机号码有误！" }
  }

  // 根据函数参数中传来的环境字段, 选择对应环境的接口
  let apis = testApis
  if (event.Environment === "release") {
    apis = releaseApis
  }

  // 推送 CRM 记录
  return rp({
    url: apis.scf + "/sso/v2/crm/push",
    // 自动格式化 body 为 json
    json: true,
    body: {
      "CRMSID": "f5ea1aafc5a586ebed7ab9102fd82427", // HD202010141571 小程序-2021国考新职位检索系统
      "Suffix": event.Suffix,
      "Phone": event.cloudID.data.phoneNumber,
      "Remark": "职位检索小程序"
    },
    method: 'POST'
  }).then((res) => {
    if (res.Code === 0) {
      // 推送成功, 返回成功
      return { code: 0, Phone: event.cloudID.data.phoneNumber, res }
    } else {
      // 推送出错
      return { code: -1, error: res }
    }
  }).catch(err => {
    // 捕获异常
    // 主要是捕获发起请求失败等情况
    return { code: -1, error: err }
  })
}
