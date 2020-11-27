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
  // 判断是否可以正确解码 cloudID
  // 使用电脑微信打开时会出现这种情况
  if (typeof event.cloudID.data === "undefined") {
    return { code: -1, error: "登陆失败 ! ( 请勿使用电脑微信打开本小程序 )" }
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
      CRMSID: event.CRMSID,
      Suffix: event.Suffix,
      Phone: event.cloudID.data.phoneNumber,
      Remark: event.Remark
    },
    method: 'POST'
  }).then((res) => {
    if (res.Code === 0) {
      // 返回成功
      return { code: 0, Phone: event.cloudID.data.phoneNumber, res }
      // 推送成功, 保存用户信息到用户表
      const wxContext = cloud.getWXContext()
      const db = cloud.database();
      // 插入数据
      return db.collection('User').add({
        data: {
          OpenID: wxContext.OPENID,
          PurePhoneNumber: event.cloudID.data.purePhoneNumber,
          PhoneNumber: event.cloudID.data.phoneNumber,
          CountryCode: event.cloudID.data.countryCode,
          WatermarkTimestamp: event.cloudID.data.watermark.timestamp,
          Time: new Date(),
          CRMSID: event.CRMSID,
          Suffix: event.Suffix,
          Remark: event.Remark
        }
      }).then(res => {
        if (res.errMsg == 'collection.add:ok') {
          // 返回成功
          return { code: 0, Phone: event.cloudID.data.phoneNumber, res }
        } else {
          return { code: -1, error: '创建用户失败 [ ' + res.errCode + ' ] ( ' + res.errMsg + ' )', res }
        }
      }).catch(err => {
        console.error(err)
        return { code: -1, error: '创建用户失败 [ ' + err.errCode + ' ] ( ' + err.errMsg + ' )', err }
      })
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
