export default{
  isPhone: function (phone) {
    return /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)
  },
  /**
   * 判断是否是中文
   * @param str
   * @returns {Boolean}
   */
  isChinese: function (str) {
    var reg = /[^\u4e00-\u9fa5]/;
    if (reg.test(str)) {
      return false;
    }
    return true;
  },
}
