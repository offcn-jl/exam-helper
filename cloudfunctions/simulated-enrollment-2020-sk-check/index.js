// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "test-trti4"//cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  // 查询是否存在记录, 如果已经存在记录则直接返回手机号码
  return db.collection("SimulatedEnrollment2020SK").where({
    OpenID: wxContext.OPENID,
  }).get().then(res => {
    if (res.errMsg == 'collection.get:ok') {
      if (res.data.length != 0) {
        return { code: 0, Phone: res.data[res.data.length - 1].PhoneNumber }
      } else {
        // 不存在记录，继续执行后续操作
        return { code: 0, Phone: -1 }
      }
    } else {
      return { code: -1, error: '查询失败 [ ' + response.errCode + ' ] ( ' + response.errMsg + ' )', response }
    }
  }).catch(err => {
    console.error(err)
    return { code: -1, error: '查询失败 [ ' + err.errCode + ' ] ( ' + err.errMsg + ' )', err }
  })
}