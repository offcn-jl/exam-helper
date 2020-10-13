// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const MAX_LIMIT=100

// 云函数入口函数
exports.main = async (event, context) => {
  let data_xueli = event.data_xueli
  let data_major = event.data_major
  let xueli_reg = eval("/" + data_xueli + "/")
  let major_reg = eval("/" + data_major + "/")
  let countResul=''
  countResult = await db.collection('Major2020GK').where({
    item01: major_reg,
    item02: xueli_reg,
  }).get()
  if(countResult){
    return countResult
  }else{
    return []
  }
  
}