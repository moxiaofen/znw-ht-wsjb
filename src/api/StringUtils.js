/***********************************************************************
 *                           字符串操作工具类                          *
 *                     注：调用方式，strUtil.方法名                   *
 * ********************************************************************/
import utils from './utils';
import store from '../store';

// 导入vue对象进来
import _this from '../main.js';
export default{
  // 强制跳转登陆页面
  loginOut () {
    if (!this.isEmpty(this.getFingerLockPwd()) && this.getFingerLockType() == "2") {
      _this.$router.replace({path: '/security/fingerLockView'});
    } else {
      _this.$router.replace(_this.$RM.Login);
    }
  },
  /**
   * 去除空格
   * @param  {str}
   * @param  {type}
   *       type:  1-所有空格  2-前后空格  3-前空格 4-后空格
   * @return {String}
   */
  trim: function (str, type) {
    type = type || 1
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  },
  /*
   * 判断字符串是否为空
   * @param str 传入的字符串
   * @returns {}
   */
  isEmpty: function (str) {
    if (str == undefined || str == null || str.length <= 0 || str == 'null' || str == 'undefined') {
      return true;
    } else {
      return false;
    }
  },
  /*
   * 判断两个字符串子否相同
   * @param str1
   * @param str2
   * @returns {Boolean}
   */
  isEquals: function (str1, str2) {
    if (str1 == str2) {
      return true;
    } else {
      return false;
    }
  },
  /*
   * 忽略大小写判断字符串是否相同
   * @param str1
   * @param str2
   * @returns {Boolean}
   */
  isEqualsIgnorecase: function (str1, str2) {
    if (str1.toUpperCase() == str2.toUpperCase()) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 判断是否是数字
   * @param value
   * @returns {Boolean}
   */
  isNum: function (value) {
    if (value != null && value.length > 0 && isNaN(value) == false) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 获取接口得openId
   * @returns {String}
   */
  getOpenId(){
    let openId = sessionStorage.getItem('loginSession');
    return this.isEmpty(openId) ? '' : openId
  },

  /**
   * 获取接口得eqId
   * @returns {String}
   */
  getReqId(){
    return utils.generateSignTime()
  },

  /**
   * 判断是否登录
   * @returns {Boolean}
   */
  isLogin(){
    let openId = store.fetchSession();
    return !this.isEmpty(openId) && !this.isEmpty(sessionStorage.getItem('loginSession'))
  },

  /**
   * 获取新商盟账号
   * @returns {String}
   */
  getBusinessAccount(){
    let newBusinessAccount = sessionStorage.getItem('newBusinessAccount');
    return newBusinessAccount == 'undefined' || newBusinessAccount == null || newBusinessAccount == 'null' ? '' : newBusinessAccount
  },
  /**
   * 获取法人姓名
   * @returns {String}
   */
  getLawName(){
    let lawName = sessionStorage.getItem('cacheLawName');
    return this.isEmpty(lawName) ? '' : lawName
  },

  /**
   * 获取手机号码
   * @returns {String}
   */
  getPhone(){

    return this.isEmpty(sessionStorage.getItem('cachePhone')) ? '' : sessionStorage.getItem('cachePhone')

  },
  /**
   * 设置手机号码
   * @returns {String}
   */
  setPhone(phone){
    return sessionStorage.setItem('cachePhone', phone)

  },
  /**
   * 获取手势密码开启或者关闭的状态
   * @returns {String}
   */
  getFingerLockType(){
    let phone = this.getPhone();
    let fingerKey = phone + "fingerLockType";
    return this.isEmpty(localStorage.getItem(fingerKey)) ? '' : localStorage.getItem(fingerKey)

  },
  /**
   * 设置手势密码开启或者关闭的状态
   * @returns {String}
   */
  setFingerLockType(type){
    let phone = this.getPhone();
    let fingerKey = phone + "fingerLockType";
    localStorage.setItem(fingerKey, type)

  },
  /**
   * 删除手势密码开启或者关闭的状态
   * @returns {String}
   */
  removeFingerLockType(){
    let phone = this.getPhone()
    let fingerKey = phone + "fingerLockType"
    localStorage.removeItem(fingerKey)
  },
  /**
   * 获取手势密码
   * @returns {String}
   */
  getFingerLockPwd(){
    let phone = this.getPhone();
    if (this.isEmpty(phone)) {
      return ''
    }
    return this.isEmpty(localStorage.getItem(phone)) ? '' : localStorage.getItem(phone)


  },
  /**
   * 设置手势密码
   * @returns {String}
   */
  setFingerLockPwd(fingerPwd){
    let phone = this.getPhone()
    localStorage.setItem(phone, fingerPwd)

  },

  /**
   * 删除手势密码
   * @returns {String}
   */
  removeFingerLockPwd(){
    let phone = this.getPhone()
    localStorage.removeItem(phone)

  },
  /**
   * 1. 长度>=12,前四位*****后四位
   * 2. 6<长度<12,****后四位
   * 3. 长度<6,明文显示
   * @param text
   * @returns {XML|void|string}
   */
  encryptText(text){
    if (typeof(text) !== 'string' || this.isEmpty(text)) {
      return ''
    }
    if (text.length >= 12) {
      return text.replace(/([\w\W]{4})[\w\W]+([\w\W]{4})/, "$1****$2");
    } else if (text.length >= 6) {
      return text.replace(/[\w\W]+([\w\W]{4})/, "****$1");
    } else {
      return text
    }
  },

  /**
   *  身份证加密：长度>=12,前八位*****后四位
   * @param idNumber
   * @returns {XML|void|string}
   */
  encryptIdNumber(idNumber){
    if (typeof(idNumber) !== 'string' || this.isEmpty(idNumber)) {
      return ''
    }
    return idNumber.replace(/(\d{8})\d+(\d{4})/, "$1*******$2");
  },

  /**
   *  手机号加密：长度>=12,前八位*****后四位
   * @param phone
   * @returns {XML|void|string}
   */
  encryptPhone(phone){
    if (typeof(phone) !== 'string' || this.isEmpty(phone)) {
      return ''
    }
    return phone.replace(/(\d{3})\d+(\d{4})/, "$1****$2");
  }
}

