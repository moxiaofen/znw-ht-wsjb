/**
 * Created by qin on 2018/8/8.
 * 该工具类是自定义工具类
 */
//校验密码必须由6-12位数字加字母组成

function checkPwd(pwd) {
  if (pwd == null || pwd == '') {
    return false
  }
  let tempPwd = /^[0-9A-Za-z]{6,12}$/;
  if (!tempPwd.test(pwd)) {
    return false//输入内容有误
  }

  return true

}
//校验2-6位的法人姓名
function checkName(name) {
  if (name != null && name != '') {
    let tempName = /^[\u4e00-\u9fa5]{2,6}$/;
    if (!tempName.test(name)) {
      return false//输入内容有误
    }
  }
  return true

}
//校验11位手机号码
function checkPhone(phone) {
  if (phone == null || phone == '') {
    return false
  }
  // var tempPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  var tempPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
  if (!tempPhone.test(phone)) {
    return false//输入内容有误
  }
  return true
}

//校验18位身份证号---换为15与18位
function checkIdcard(idcard) {
  if (idcard != null && idcard != '') {
    //let tempIdcard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    let tempIdcard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!tempIdcard.test(idcard)) {
      return false//输入内容有误
    }
    return true
  }

}
//校验营业执照号码
function checkLicense(licen) {
  if (licen != null && licen != '') {
    let tempCheinese = /^[^\u4e00-\u9fa5]{0,}$/;
    let tempSpecial = /[`~-￥&=|!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im;//这个都没有起作用
    if (!tempCheinese.test(licen) || tempSpecial.test(licen)) {
      return false//输入内容有误
    }
    return true
  }
}
//校验邮箱
function checkEmail(email){
  if (email == null || email == '') {
    return false
  }
  var tempEmail = /^\w+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  if (!tempEmail.test(email)) {
    return false//输入内容有误
  }
  return true
}
//验证银行卡号
function checkBankCardNo(bankCardNo){
  if (bankCardNo == null || bankCardNo == '') {
    return false
  }
  var tempBankCardNo = /^([1-9]{1})(\d{11,18})$/;
  if (!tempBankCardNo.test(bankCardNo)) {
    return false//输入内容有误
  }
  return true
}
//校验护照
function checkPassportNo(passportNo){
  if (passportNo == null || passportNo == '') {
    return false
  }
  var tempPassportNo = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
  if (!tempPassportNo.test(passportNo)) {
    return false//输入内容有误
  }
  return true
}
//校验港澳通行证  
function checkHKMPassNo(HKMPassNo){
  if (HKMPassNo == null || HKMPassNo == '') {
    return false
  }
  var tempHKMPassNo = /^[CW]\d{8}$/;
  if (!tempHKMPassNo.test(HKMPassNo)) {
    return false//输入内容有误
  }
  return true
}
//校验统一社会信用代码
function checkUSCC(USCC){
  if (USCC == null || USCC == '') {
    return false
  }
  var tempUSCC = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;
  if (!tempUSCC.test(USCC)) {
    return false//输入内容有误
  }
  return true
}
//校验企业组织机构代码
function checkCOC(COC){
  if (COC == null || COC == '') {
    return false
  }
  var tempCOC = /[A-Z0-9]{8}-[A-Z0-9]$|[A-Z0-9]{8}-[A-Z0-9]-[0-9]{2}$/;
  if (!tempCOC.test(COC)) {
    return false//输入内容有误
  }
  return true
}

//格式日期
function formatDay(num){
  if(num){
      //var fnum = ''+num.slice(0,4)+'-'+num.slice(4,6)+'-'+num.slice(6,8)
      return `${num.slice(0,4)}-${num.slice(4,6)}-${num.slice(6,8)}`;
  }
}

/**
 * 自动生成校验参数，md5加密等工具方法
 */
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 1.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Code also contributed by Greg Holt
 * See http://pajhome.org.uk/site/legal.html for details.
 */

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */

function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF)
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
  return (msw << 16) | (lsw & 0xFFFF)
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt))
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function cmn(q, a, b, x, s, t) {
  return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
}
function ff(a, b, c, d, x, s, t) {
  return cmn((b & c) | ((~b) & d), a, b, x, s, t)
}
function gg(a, b, c, d, x, s, t) {
  return cmn((b & d) | (c & (~d)), a, b, x, s, t)
}
function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t)
}
function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | (~d)), a, b, x, s, t)
}

/*
 * Calculate the MD5 of an array of little-endian words, producing an array
 * of little-endian words.
 */
function coreMD5(x) {
  var a = 1732584193
  var b = -271733879
  var c = -1732584194
  var d = 271733878

  for (var i = 0; i < x.length; i += 16) {
    var olda = a
    var oldb = b
    var oldc = c
    var oldd = d

    a = ff(a, b, c, d, x[i + 0], 7, -680876936)
    d = ff(d, a, b, c, x[i + 1], 12, -389564586)
    c = ff(c, d, a, b, x[i + 2], 17, 606105819)
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330)
    a = ff(a, b, c, d, x[i + 4], 7, -176418897)
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426)
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341)
    b = ff(b, c, d, a, x[i + 7], 22, -45705983)
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416)
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417)
    c = ff(c, d, a, b, x[i + 10], 17, -42063)
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162)
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682)
    d = ff(d, a, b, c, x[i + 13], 12, -40341101)
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290)
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329)

    a = gg(a, b, c, d, x[i + 1], 5, -165796510)
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632)
    c = gg(c, d, a, b, x[i + 11], 14, 643717713)
    b = gg(b, c, d, a, x[i + 0], 20, -373897302)
    a = gg(a, b, c, d, x[i + 5], 5, -701558691)
    d = gg(d, a, b, c, x[i + 10], 9, 38016083)
    c = gg(c, d, a, b, x[i + 15], 14, -660478335)
    b = gg(b, c, d, a, x[i + 4], 20, -405537848)
    a = gg(a, b, c, d, x[i + 9], 5, 568446438)
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690)
    c = gg(c, d, a, b, x[i + 3], 14, -187363961)
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501)
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467)
    d = gg(d, a, b, c, x[i + 2], 9, -51403784)
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473)
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734)

    a = hh(a, b, c, d, x[i + 5], 4, -378558)
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463)
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562)
    b = hh(b, c, d, a, x[i + 14], 23, -35309556)
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060)
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353)
    c = hh(c, d, a, b, x[i + 7], 16, -155497632)
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640)
    a = hh(a, b, c, d, x[i + 13], 4, 681279174)
    d = hh(d, a, b, c, x[i + 0], 11, -358537222)
    c = hh(c, d, a, b, x[i + 3], 16, -722521979)
    b = hh(b, c, d, a, x[i + 6], 23, 76029189)
    a = hh(a, b, c, d, x[i + 9], 4, -640364487)
    d = hh(d, a, b, c, x[i + 12], 11, -421815835)
    c = hh(c, d, a, b, x[i + 15], 16, 530742520)
    b = hh(b, c, d, a, x[i + 2], 23, -995338651)

    a = ii(a, b, c, d, x[i + 0], 6, -198630844)
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415)
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905)
    b = ii(b, c, d, a, x[i + 5], 21, -57434055)
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571)
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606)
    c = ii(c, d, a, b, x[i + 10], 15, -1051523)
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799)
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359)
    d = ii(d, a, b, c, x[i + 15], 10, -30611744)
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380)
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649)
    a = ii(a, b, c, d, x[i + 4], 6, -145523070)
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379)
    c = ii(c, d, a, b, x[i + 2], 15, 718787259)
    b = ii(b, c, d, a, x[i + 9], 21, -343485551)

    a = safe_add(a, olda)
    b = safe_add(b, oldb)
    c = safe_add(c, oldc)
    d = safe_add(d, oldd)
  }
  return [a, b, c, d]
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
  var hex_tab = "0123456789abcdef"
  var str = ""
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
      hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF)
  }
  return str
}

/*
 * Convert an array of little-endian words to a base64 encoded string.
 */
function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  var str = ""
  for (var i = 0; i < binarray.length * 32; i += 6) {
    str += tab.charAt(((binarray[i >> 5] << (i % 32)) & 0x3F) |
      ((binarray[i >> 5 + 1] >> (32 - i % 32)) & 0x3F))
  }
  return str
}

/*
 * Convert an 8-bit character string to a sequence of 16-word blocks, stored
 * as an array, and append appropriate padding for MD4/5 calculation.
 * If any of the characters are >255, the high byte is silently ignored.
 */
function str2binl(str) {
  var nblk = ((str.length + 8) >> 6) + 1 // number of 16-word blocks
  var blks = new Array(nblk * 16)
  for (var i = 0; i < nblk * 16; i++) blks[i] = 0
  for (var i = 0; i < str.length; i++)
    blks[i >> 2] |= (str.charCodeAt(i) & 0xFF) << ((i % 4) * 8)
  blks[i >> 2] |= 0x80 << ((i % 4) * 8)
  blks[nblk * 16 - 2] = str.length * 8
  return blks
}

/*
 * Convert a wide-character string to a sequence of 16-word blocks, stored as
 * an array, and append appropriate padding for MD4/5 calculation.
 */
function strw2binl(str) {
  var nblk = ((str.length + 4) >> 5) + 1 // number of 16-word blocks
  var blks = new Array(nblk * 16)
  for (var i = 0; i < nblk * 16; i++) blks[i] = 0
  for (var i = 0; i < str.length; i++)
    blks[i >> 1] |= str.charCodeAt(i) << ((i % 2) * 16)
  blks[i >> 1] |= 0x80 << ((i % 2) * 16)
  blks[nblk * 16 - 2] = str.length * 16
  return blks
}

/*
 * External interface
 */
function hexMD5(str) {
  return binl2hex(coreMD5(str2binl(str)))
}
function hexMD5w(str) {
  return binl2hex(coreMD5(strw2binl(str)))
}
function b64MD5(str) {
  return binl2b64(coreMD5(str2binl(str)))
}
function b64MD5w(str) {
  return binl2b64(coreMD5(strw2binl(str)))
}
/* Backward compatibility */
function calcMD5(str) {
  return binl2hex(coreMD5(str2binl(str)))
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//自动生成时间戳
function generateSignTime() {
  var date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day, hour, minute, second].map(formatNumber).join('')
}

//自动生成sign值
function generateSign(reqId, timestamp) {
  var strSign = joinSign(reqId, timestamp);
  return hexMD5(strSign);
}


function joinSign(reqId, timestamp) {
  var MD5_KEY = '123456';
  var appId = window.appId;
  // var reqId = generateSignTime();
  // var timestamp = generateSignTime(new Date());
  var signBuffer = 'appId=' + appId + '&reqId=' + reqId + '&timestamp=' + timestamp + "&" + MD5_KEY;
  return signBuffer;

}
//支持自定义字符长度和特征字符集合
function randomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}
//隐藏数字的指定位数
function hidePhoneStr(num) {

  if (num != null && num != '') {
    if (num.length == 11) {
      return num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
    if (num.length == 12) {
      // return num.replace(/(\d{3})\d{6}(\d{3})/,"$1******$2");

      return num.substring(0, 3) + '****' + num.substring(num.length - 4, num.length);
    }

    if (num.length == 16) {
      return num.replace(/(\d{3})\d{10}(\d{3})/, "$1********$2");
    }

    if (num.length > 12 && num.length < 16) {
      return num.substring(0, 4) + '****' + num.substring(num.length - 4, num.length);
    }


  }


}


/**
 * UI 界面隐藏字符串
 * 长度=>12 ,前4位****后四位
 6<长度<12 ,****后四位
 长度<6 ,全部明文显示
 */

function hideFewStr(str) {
  var strLength = str.length;
  var newStr = '';
  if (strLength >= 12) {
    newStr = str.substring(0, 4) + '****' + str.substring(str.length - 4, str.length);
  }
  if (strLength > 6 && strLength < 12) {
    newStr = '****' + str.substring(str.length - 4, str.length);
  }
  if (strLength <= 6) {
    newStr = str;
  }
  return newStr;
}


//将base64获取它的大小
function showSize(base64url) {
  //获取base64图片大小，返回MB数字
  var str = base64url.replace('data:image/*;base64,', '');
  var equalIndex = str.indexOf('=');
  if (str.indexOf('=') > 0) {
    str = str.substring(0, equalIndex);
  }
  var strLength = str.length;
  var fileLength = parseInt(strLength - (strLength / 8) * 2);
  // 由字节转换为MB
  var size = "";
  size = (fileLength / (1024 * 1024)).toFixed(2);
  var sizeStr = size + "";                        //转成字符串
  var index = sizeStr.indexOf(".");                    //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
  if (dou == "00") {                                //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return parseFloat(size);
}


function calBase64(path) {
  // 去掉base64编码中的前缀 data:image/png;base64,
  // var baseStr=document.getElementById("imgcase").getAttribute("src"),tag="base64,";
  // baseStr=baseStr.substring(baseStr.indexOf(tag)+tag.length);
  var eqTagIndex = path.indexOf("=");
  path = eqTagIndex != -1 ? path.substring(0, eqTagIndex) : path;
  var strLen = path.length;
  var fileSize = strLen - (strLen / 8) * 2
  alert("文件大小:" + fileSize);
}
//数字每3位加一个逗号隔开
function addComma(num) {
  var num = (num || 0).toString();
  var result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}

//新商盟密码的公钥
const PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCQQgiDWCLyY0p+cALvDc4qtc4mqQXfTuVdxu1UY8fqGH/V8H2gpThe3FktWfGbCpy5+darX3u1Sr4jlGKLSDuhzlzTeKW7czXHHbXdqfXnHB6LdJQ+BLJUKYJdXQ2AjbObDAWicx5g6d3BF1ESPo+lJa1KxAuNP9Ay9kGCpuWhGQIDAQAB-----END PUBLIC KEY-----";
//登录密码的公钥
const PUBLIC_KEY2 = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+ZchPgdmE1azfZ6oRzYg85FcnU0IGDZqncCoKS814b/fjxKaSpA6grHqZuAZcZaABfWrxcaEYbALewErV9byO5Bxpmfddom2fyxYIBpgm6WJHVXrBwwgxMcJ+YJMB30wCS+74Dbj4llK9dFHg3k5QETkx5tksP1EBRX4mKDvq6QIDAQAB-----END PUBLIC KEY-----"

//暴露方法
export default {
  addComma,
  checkName,
  checkIdcard,
  checkPhone,
  generateSign,
  generateSignTime,
  checkLicense,
  checkPwd,
  checkEmail, //新增
  checkBankCardNo,
  checkPassportNo,
  checkHKMPassNo,
  checkUSCC,
  checkCOC,
  formatDay,//格式化时间


  randomString,
  hidePhoneStr,
  showSize,
  calBase64,
  PUBLIC_KEY,
  PUBLIC_KEY2
}
