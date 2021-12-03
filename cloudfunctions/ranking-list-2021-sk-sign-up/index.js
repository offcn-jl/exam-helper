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
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  // 查询是否存在记录, 如果已经存在记录则直接返回手机号码
  return db.collection("RankingList2021SK").where({
    OpenID: wxContext.OPENID,
  }).get().then(res => {
    if (res.errMsg == 'collection.get:ok') {
      if (res.data.length != 0) {
        return { code: 0, Phone: res.data[res.data.length - 1].PhoneNumber }
      } else {
        // 不存在记录，继续执行后续操作
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
            "CRMSID": "9f631328e94bf66aed516b03f682d241", // HD202104020292 小程序-2021吉林省考面试晒分系统
            "Suffix": event.Suffix,
            "Phone": event.cloudID.data.phoneNumber,
            "Remark": "同岗位晒分,活动表单ID:79906,活动编码:HD202104020292"
          },
          method: 'POST'
        }).then((res) => {
          if (res.Code === 0) {
            // 推送成功, 进行后续操作
            // 插入数据
            return db.collection("RankingList2021SK").add({
              data: {
                OpenID: wxContext.OPENID,
                PurePhoneNumber: event.cloudID.data.purePhoneNumber,
                PhoneNumber: event.cloudID.data.phoneNumber,
                CountryCode: event.cloudID.data.countryCode,
                WatermarkTimestamp: event.cloudID.data.watermark.timestamp,
                Time: new Date()
              }
            }).then(res => {
              if (res.errMsg == 'collection.add:ok') {
                return { code: 0, Phone: event.cloudID.data.phoneNumber, res }
              } else {
                return { code: -1, error: '提交失败 [ ' + res.errCode + ' ] ( ' + res.errMsg + ' )', res }
              }
            }).catch(err => {
              console.error(err)
              return { code: -1, error: '提交失败 [ ' + err.errCode + ' ] ( ' + err.errMsg + ' )', err }
            })
          } else {
            // 推送出错
            return {
              code: -1,
              error: res
            }
          }
        }).catch(err => {
          // 捕获异常
          // 主要是捕获发起请求失败等情况
          console.log(err)
          return {
            code: -1,
            error: err
          }
        })
      }
    } else {
      return { code: -1, error: '提交失败 [ ' + response.errCode + ' ] ( ' + response.errMsg + ' )', response }
    }
  }).catch(err => {
    console.error(err)
    return { code: -1, error: '提交失败 [ ' + err.errCode + ' ] ( ' + err.errMsg + ' )', err }
  })
}
