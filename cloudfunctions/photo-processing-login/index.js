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
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // 根据函数参数中传来的环境字段, 选择对应环境的接口
  let apis = testApis
  if (event.environment === "release") {
    apis = releaseApis
  }

  // 推送 CRM 记录
  return rp({
    url: apis.scf + "/sso/v2/crm/push",
    // 设置请求头
    // todo 接口只验证 origin , 没有验证 token 之类的鉴权逻辑, 后续进行优化
    headers: {
      "origin": "http://jl.offcn.com"
    },
    // 自动格式化 body 为 json
    json: true,
    body: {
      "CRMSID": event.CRMSID,
      "Suffix": event.suffix+"",
      "Phone": event.cloudID.data.phoneNumber,
      "Remark": "照片处理系统"
    },
    method: 'POST'
  }).then((res) => {
    console.log(res)
    if (res.Code === 0) {
      // 推送成功, 注册活动
      return rp({
        url: apis.tsf + "/2020/05/03/add",
        // 设置请求头
        // todo 接口只验证 origin , 没有验证 token 之类的鉴权逻辑, 后续进行优化
        headers: {
          "origin": "http://jl.offcn.com"
        },
        json: true,
        body: {
          "Event": event.CRMSID,
          "Phone": event.cloudID.data.phoneNumber
        },
        method: 'POST'
      }).then((res) => {
        console.log(res)
        // 这个接口没有返回错误代码的逻辑
        // 所以请求没有异常就视为成功
        return {
          code: 0,
          result: res
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