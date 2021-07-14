// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // env: cloud.DYNAMIC_CURRENT_ENV
  env:"test-trti4"//当前环境ID
})
// 云函数入口函数
exports.main =  async (event, context) => {
  // 数量应该不能超出100个，故暂时不设置每次调用10条
  const db = cloud.database()
  let len = event.len//获取页面传递的event内的len值
  // let list = await db.collection('score-2021-tgjs')
  // .where({
  //   city:event.city,
  //   county:event.county,
  //   post:event.post,
  //   subject:event.subject,
  // })
  // .get()
  console.log(event)
  let list = await db.collection(event.id).aggregate().match({ 
    city:event.list.city,
    county:event.list.county,
    post:event.list.post,
    subject:event.list.subject,
  }).sort({
    grade:-1
  }).skip(len).limit(10).end()
  
  //如果查询出错， 返回错误
  if (list.errMsg !== "cloud.callFunction:ok") {
    return { Msg: "list查询出错", Detail: list }
  }

  return {//全部结束，页面返回值
    Msg: "成功",
    Data: {
      list,
    }
  }

}
