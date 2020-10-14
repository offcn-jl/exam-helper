// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  traceUser: true,
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;
const MAX_LIMIT = 100;

// 云函数入口函数
exports.main = async (event, context) => {
  let data_year = event.data_year;
  let data_address = event.data_address;
  let data_xueli = event.data_xueli;
  let data_zzmm = event.data_zzmm;
  let data_major = event.data_major;

  let zzmm_reg = '';
  let address_reg = '';
  let xueli_reg = '';
  let year_reg = [];
  let major_reg = eval("/" + data_major + "|不限/");

  if (data_year == '不限') {
    year_reg = [2019, 2020, 2021];
  } else {
    year_reg.push(parseInt(data_year));
  }

  if (data_xueli == '专科') {
    xueli_reg = /大专|专科/;
  } else if (data_xueli == '本科') {
    xueli_reg = /大专|专科|本科|学士/;
  } else if (data_xueli == '研究生') {
    xueli_reg = /|/;
  }

  if (data_address == '不限') {
    address_reg = /|/;
  } else {
    address_reg = eval("/" + data_address + "/");
  }

  if (data_zzmm == '中共党员') {
    zzmm_reg = /党员|/
  } else if (data_zzmm == '预备党员') {
    zzmm_reg = /党员|/
  } else if (data_zzmm == '群众') {
    zzmm_reg = /群众|九三|共青团员|民盟|民进农工党|/
  }
  let countResult
  countResult = await db.collection('PositionList2020GK').where({
    item01: _.in(year_reg),
    item03: address_reg,
    item11: major_reg,
    item12: xueli_reg,
    item14: zzmm_reg
  }).count();
  const total = countResult.total;
  if (total == 0) {
    let allMsg = {
      data: '',
      errMsg: '',
    }
    return allMsg;
  }
  const batchTimes = Math.ceil(total / 100);
  const tasks = [];
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('PositionList2020GK').where({
      item01: _.in(year_reg),
      item03: address_reg,
      item11: major_reg,
      item12: xueli_reg,
      item14: zzmm_reg
    }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
    tasks.push(promise);
  };
  let allMsg = (await Promise.all(tasks)).reduce((acc, cur) => ({
    data: acc.data.concat(cur.data),
    errMsg: acc.errMsg,
  })).data
  return allMsg;
}