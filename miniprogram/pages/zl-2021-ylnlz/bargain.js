const BASE_URL = 'https://zg99.offcn.com/index';
const getSesionkeyAPI = `${BASE_URL}/wechat/getsesionkey?actid=42321&callback=?`; // 获取 sesionkey
const getUserPhoneAPI = `${BASE_URL}/wechat/getphone?actid=42321&callback=?`; // 手机号解密(这里不需要)
const registAPI = `${BASE_URL}/kanjia/register?actid=42321&callback=?`; // 注册
const getsplistAPI = `${BASE_URL}/kanjia/getsplist?actid=42321&callback=?`; //获取课程列表(这里不需要)
const writeyqAPI = `${BASE_URL}/kanjia/writeyq?actid=42321&callback=?`; //写入邀请列表
const getyqlistAPI = `${BASE_URL}/kanjia/getyqlist?actid=42321&callback=?`; //获取邀请列表
const writexzAPI = `${BASE_URL}/kanjia/writexz?actid=42321&callback=?`; //写入协助列表
const getxzlistAPI = `${BASE_URL}/kanjia/getxzlist?actid=42321&callback=?`; //获取协助列表
const getspinfoAPI = `${BASE_URL}/kanjia/getspinfo?actid=42321&callback=?`; //获取课程信息

module.exports = {
  getSesionkeyAPI,
  getUserPhoneAPI,
  registAPI,
  getsplistAPI,
  writeyqAPI,
  getyqlistAPI,
  writexzAPI,
  getxzlistAPI,
  getspinfoAPI
};