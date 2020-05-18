/**
 * Created by qin on 2018/8/8.
 * 该工具类是错误代码提示工具类
 */
//自定义全局错误代码提示(详情参照后台提供的错误代码文档：http://wiki.antiantech.com/pages/viewpage.action?pageId=10584561)
//PS：标注有改动的，是将后台的提示语修改成 前台合适给用户展现的提示语
const STATIC_ERRORCDDE = {
  RTN_000000: "成功",
  RTN_999999: "系统错误",
  EXCEPTION:"网络错误",
  RTN_201017: "办卡时的手机号格式不正确",
  RTN_201018: "手机号格式不正确",
  PWDINPUTERROR:"密码为6-12位数字+字母的组合",
  RTN_000010: "验证码输入错误,请重新输入",
  RTN_201019: "邮箱格式不正确",
  RTN_201020: "银行卡号格式不正确",
  RTN_201021: "身份证号码格式不正确",
  RTN_201022: "护照格式不正确",
  RTN_201023: "港澳通行证格式不正确",
  RTN_201024: "统一社会信用代码格式不正确",
  RTN_201025: "组织机构代码格式不正确",
  CHECKBOXSTU_REGISTER_ERROR: '请勾选阅读并同意签署《中农网用户注册协议》',
  CHECKBOXSTU_IDENTITY_ERROR: '请勾选阅读并同意签署《免责说明》',
  /*RTN_000000: "成功",
  RTN_000001: "签名无效",
  RTN_000002: "登陆已失效，请重新登陆",//有改动
  RTN_000003: "该客户未绑定",
  RTN_000004: "微信登陆失败",
  RTN_000005: "非法渠道",
  RTN_100007: "手机号不能为空",//有改动
  RTN_000010: "验证码输入错误,请重新输入",//有改动
  RTN_000437: "新商盟账号不能为空",//有改动
  RTN_000438: "新商盟密码不能为空",//有改动
  RTN_000439: "手机验证码不能为空",//有改动
  RTN_000440: "账号密码不匹配",
  RTN_000441: "该客户暂无商户信息",
  RTN_000442: "新商盟账号密码不匹配,请重新输入",
  RTN_100001: "openId为空",
  RTN_100002: "微信登陆失败",


  RTN_200002: "新商盟账号不能为空",
  RTN_200003: "烟草许可证号不能为空",//有改动值
  RTN_200004: "法人姓名不能为空",//有改动值
  RTN_200005: "身份证号不能为空",
  RTN_200006: "申请金额不能为空",
  RTN_200007: "还款方式不能为空",
  RTN_200008: "产品编号不能为空",
  RTN_200009: "客户电话不能为空",
  RTN_200010: "客户电话、新商盟账号、身份证号不能同时为空",
  RTN_200011: "渠道验证失败",
  RTN_200012: "借据号不能为空",
  RTN_200013: "期数不能为空",
  RTN_200014: "新商盟账号、身份证号不能同时为空",


  RTN_201001: "请求数据不能为空",
  RTN_201002: "手机号不能为空",//有改动
  RTN_201003: "请选择紧急联系人关系",//有改动
  RTN_201004: "紧急联系人姓名不能为空",//有改动
  RTN_201005: "紧急联系人电话不能为空",//有改动
  RTN_201006: "商户门店地址不能为空",
  RTN_201007: "商户门店地址不能为空",
  RTN_201008: "商户门店地址不能为空",
  RTN_201009: "详细地址不能为空",//有改动
  RTN_201010: "验证码不能为空",//有改动
  RTN_201011: "商户名称不能为空",//有改动
  RTN_201012: "营业执照号不能为空",//有改动
  RTN_201013: "新商盟账号密码不能为空",
  RTN_201014: "座机区号不能为空",
  RTN_201015: "商户座机不能为空",
  RTN_201016: "起始记录位置不能为空",
  RTN_201017: "返回记录条数不能为空",
  RTN_201018: "手机号格式不正确",

  RTN_300022: "填写信息有误，无法验证，请核对信息填写正确后点击验证",//新加
  RTN_300016: "您手机号码暂未注册，点击注册即可登录查询",//新加


  RTN_300001: "没有查询到匹配的数据仓库的客户信息",
  RTN_300002: "重复进件",
  RTN_300003: "查询到的还款计划为空",
  RTN_300004: "验证码校验失败",
  RTN_300005: "新商盟账号和密码不匹配,请重新输入",
  RTN_300006: "上传图片为空",
  RTN_300007: "申请金额必须大于0",
  RTN_300008: "数据格式错误",
  RTN_300009: "照片上传失败，请重新上传",//有改动
  RTN_300010: "30秒内同一个微信号不能重复请求进件",

  RTN_800000: "",
  RTN_999999: "系统错误",

  RTN_0001: "非常抱歉！目前网络查询拥堵，请稍后申请授信。",//新加，查询异常
  RTN_0002: "非常抱歉！目前网络查询拥堵，请稍后申请授信。",//新加，请求地址不在白名单内
  RTN_0003: "非常抱歉！目前网络查询拥堵，请稍后申请授信。",//新加，有改动,签名错误
  RTN_0004: "填写信息有误，无法验证，请核对信息填写正确后点击验证",//新加
  RTN_1001: "非常抱歉！目前网络查询拥堵，请稍后申请授信。",//新加,查询无记录
  RTN_2001: "非常抱歉！目前网络查询拥堵，请稍后申请授信。",//新加，请求参数不能为空
  RTN_300033: "新商盟账号已存在有效进件",//新加
  RTN_300036: "非常抱歉！您暂无资格申请授信，后期如有变动将及时通知您。",//新加，客户的额度为0
  RTN_300037: "非常抱歉！您所在的区域暂未开展此项业务,请关注我的-业务开展区域来进行申请授信。",//新加客户的地区未开展该业务


  ERROR_COMMON_000000: "SUCCESS",
  ERROR_COMMON_000003: "该客户未绑定",
  ERROR_COMMON_000005: "查询数据为空",
  ERROR_COMMON_100007: "手机号不能为空",
  ERROR_COMMON_000436: "小程序ID不能为空",
  ERROR_COMMON_000437: "新商盟账号不能为空",
  ERROR_COMMON_000438: "新商盟密码不能为空",
  ERROR_COMMON_000439: "手机验证码不能为空",
  ERROR_COMMON_000440: "账号密码不匹配",
  ERROR_COMMON_000441: "该客户暂无商户信息",
  ERROR_COMMON_800000: "",
  ERROR_COMMON_999999: "系统错误",

  RTN_ERROROPIDEMPTY: "查询数据为空",
  RTN_NOOPID: "该客户未绑定",
  RTN_ERRORRUN: "失败",
  RTN_SUCC_CODE: "成功",
  RTN_APPLYID_NULL: "申请编号不能为空",

  OPENID_ISNULL: "openId为空",
  WECHAT_LOGIN_FAIL: "微信登陆失败",
  NO_SUCH_ACCOUNT: "未查询到历史进件",
  INVALID_ACCOUNT: "密码已过期",

  REQUEST_DATA_IS_EMPTY: "请求数据不能为空",
  APPLYAMT_IS_EMPTY: "申请金额不能为空",
  AMT_IS_EMPTY: "额度信息为空",
  IDCARD_IS_ERROR: "身份证号码格式错误，请重新输入",//有改动
  BANKDATA_IS_NULL: "数仓返回客户信息为空",
  SUBSERVICE_IS_UNVILIABLE: "注册服务不可用",
  OPENID_IS_NULL: "小程序ID不能为空",

  LAWNAMEERROR: "法人姓名由2-6位汉字组成",
  URGENTNAM_EERROR: "紧急联系人姓名由2-6位汉字组成",
  PWDINPUTERROR:"密码为6-12位数字+字母的组合",
  LICENERROR: '营业执照为13-18位非汉字及非特殊符号组成',
  YANCAOERROR: '烟草许可证为12-16位非汉字及非特殊符号组成',
  QUHAOERROR: '请输入正确格式的区号',
  PHONEERROR: '请输入正确格式的固话号码',
  CHECKBOXSTUERROR: '请勾选阅读并同意签署《安田数据个人信息声明》后点击下一步',
  CHECKBOXSTU_REGISTER_ERROR: '请勾选阅读并同意签署《安田用户注册协议》后点击下一步',
  LOGIN_PWD_ERROR_5: '密码输入错误5次，用户已锁定。您可24小时后重新输入登录或者通过忘记密码重新设置密码。',

  REGISTER_PHONE_NULL: '注册手机号为空，请重新注册',
  ACCOUNTSTOREADDRR_NULL: '商户门店地址为空，请重新输入',
  ACCOUNTSTORE_NULL: '商户门店名称不能为空',
  URGENTPHONE_ERROR:"紧急联系人电话格式有误",
  YANCODE_NULL:"验证码不能为空",
  ACCOUNTSHOP_PRONULL: "商户门店地址省份不能为空",
  ACCOUNTSHOP_CITYNULL: "商户门店城市不能为空",
  ACCOUNTSHOP_AREANULL: "商户门店地区(县)不能为空",

  UPLOAD_IMG_SUCCESS:'照片上传成功',
  IMG_SIZE_LARGE_ERROR:'文件太大，上传失败，请重新上传',
  NET_ERROR:'网络故障，上传失败，请重新上传',
  ALREADY_LOGIN:"该账户已在另一台设备登录，请重新登录",
  ZUOJIERROR: '请输入正确格式的座机号码'*/

};

// new一个键值对的对象
var errorCodeMap = new Map();
errorCodeMap.set("000000",STATIC_ERRORCDDE.RTN_000000);
errorCodeMap.set("999999",STATIC_ERRORCDDE.RTN_999999);
/*

errorCodeMap.set("0001", STATIC_ERRORCDDE.RTN_0001);//新加
errorCodeMap.set("0002", STATIC_ERRORCDDE.RTN_0002);//新加
errorCodeMap.set("0003", STATIC_ERRORCDDE.RTN_0003);//新加
errorCodeMap.set("0004", STATIC_ERRORCDDE.RTN_0004);//新加
errorCodeMap.set("1001", STATIC_ERRORCDDE.RTN_1001);//新加
errorCodeMap.set("2001", STATIC_ERRORCDDE.RTN_2001);//新加
errorCodeMap.set("300022", STATIC_ERRORCDDE.RTN_300022);//新加
errorCodeMap.set("300016", STATIC_ERRORCDDE.RTN_300016);//新加

errorCodeMap.set("300033", STATIC_ERRORCDDE.RTN_300033);//新加

errorCodeMap.set("0", STATIC_ERRORCDDE.RTN_000000);
errorCodeMap.set("000001", STATIC_ERRORCDDE.RTN_000001);//？？？这个也有问题啊，后台提供的错误代码，怎么那么多个000001的
errorCodeMap.set("000002", STATIC_ERRORCDDE.RTN_000002);//？？？这个也有问题啊，后台提供的错误代码，怎么那么多个000002的
errorCodeMap.set("000003", STATIC_ERRORCDDE.RTN_000003);
errorCodeMap.set("000004", STATIC_ERRORCDDE.RTN_000004);
errorCodeMap.set("000005", STATIC_ERRORCDDE.RTN_000005);
errorCodeMap.set("000007", STATIC_ERRORCDDE.RTN_100007);
errorCodeMap.set("000010", STATIC_ERRORCDDE.RTN_000010);

errorCodeMap.set("000437", STATIC_ERRORCDDE.RTN_000437);
errorCodeMap.set("000438", STATIC_ERRORCDDE.RTN_000438);
errorCodeMap.set("000439", STATIC_ERRORCDDE.RTN_000439);//？？？后台提供的错误代码又多了几个000439
errorCodeMap.set("000440", STATIC_ERRORCDDE.RTN_000440);
errorCodeMap.set("000441", STATIC_ERRORCDDE.RTN_000441);
errorCodeMap.set("000442", STATIC_ERRORCDDE.RTN_000442);
errorCodeMap.set("100001", STATIC_ERRORCDDE.RTN_100001);
errorCodeMap.set("100002", STATIC_ERRORCDDE.RTN_100002);//100002？？？后台提供的错误代码又多几个100002
errorCodeMap.set("200002", STATIC_ERRORCDDE.RTN_200002);
errorCodeMap.set("200003", STATIC_ERRORCDDE.RTN_200003);
errorCodeMap.set("200004", STATIC_ERRORCDDE.RTN_200004);
errorCodeMap.set("200005", STATIC_ERRORCDDE.RTN_200005);
errorCodeMap.set("200006", STATIC_ERRORCDDE.RTN_200006);
errorCodeMap.set("200007", STATIC_ERRORCDDE.RTN_200007);
errorCodeMap.set("200008", STATIC_ERRORCDDE.RTN_200008);

errorCodeMap.set("200009", STATIC_ERRORCDDE.RTN_200009);
errorCodeMap.set("200010", STATIC_ERRORCDDE.RTN_200010);
errorCodeMap.set("200011", STATIC_ERRORCDDE.RTN_200011);
errorCodeMap.set("200012", STATIC_ERRORCDDE.RTN_200012);
errorCodeMap.set("200013", STATIC_ERRORCDDE.RTN_200013);
errorCodeMap.set("200014", STATIC_ERRORCDDE.RTN_200014);
errorCodeMap.set("201001", STATIC_ERRORCDDE.RTN_201001);
errorCodeMap.set("201002", STATIC_ERRORCDDE.RTN_201002);
errorCodeMap.set("201003", STATIC_ERRORCDDE.RTN_201003);
errorCodeMap.set("201004", STATIC_ERRORCDDE.RTN_201004);
errorCodeMap.set("201005", STATIC_ERRORCDDE.RTN_201005);
errorCodeMap.set("201006", STATIC_ERRORCDDE.RTN_201006);
errorCodeMap.set("201007", STATIC_ERRORCDDE.RTN_201007);
errorCodeMap.set("201008", STATIC_ERRORCDDE.RTN_201008);

errorCodeMap.set("201009", STATIC_ERRORCDDE.RTN_201009);
errorCodeMap.set("201010", STATIC_ERRORCDDE.RTN_201010);
errorCodeMap.set("201011", STATIC_ERRORCDDE.RTN_201011);
errorCodeMap.set("201012", STATIC_ERRORCDDE.RTN_201012);
errorCodeMap.set("201013", STATIC_ERRORCDDE.RTN_201013);
errorCodeMap.set("201014", STATIC_ERRORCDDE.RTN_201014);
errorCodeMap.set("201015", STATIC_ERRORCDDE.RTN_201015);
errorCodeMap.set("201016", STATIC_ERRORCDDE.RTN_201016);
errorCodeMap.set("201017", STATIC_ERRORCDDE.RTN_201017);
errorCodeMap.set("201018", STATIC_ERRORCDDE.RTN_201018);
errorCodeMap.set("300001", STATIC_ERRORCDDE.RTN_300001);
errorCodeMap.set("300002", STATIC_ERRORCDDE.RTN_300002);
errorCodeMap.set("300003", STATIC_ERRORCDDE.RTN_300003);
errorCodeMap.set("300004", STATIC_ERRORCDDE.RTN_300004);

errorCodeMap.set("300005", STATIC_ERRORCDDE.RTN_300005);
errorCodeMap.set("300006", STATIC_ERRORCDDE.RTN_300006);
errorCodeMap.set("300007", STATIC_ERRORCDDE.RTN_300007);
errorCodeMap.set("300008", STATIC_ERRORCDDE.RTN_300008);
errorCodeMap.set("800000", STATIC_ERRORCDDE.RTN_800000);//这个不知道什么鬼，后台提供的错误代码
errorCodeMap.set("999999", STATIC_ERRORCDDE.RTN_999999);//系统错误
errorCodeMap.set("201015", STATIC_ERRORCDDE.RTN_201015);
errorCodeMap.set("201016", STATIC_ERRORCDDE.RTN_201016);
errorCodeMap.set("201017", STATIC_ERRORCDDE.RTN_201017);
errorCodeMap.set("201018", STATIC_ERRORCDDE.RTN_201018);
errorCodeMap.set("300001", STATIC_ERRORCDDE.RTN_300001);
errorCodeMap.set("300002", STATIC_ERRORCDDE.RTN_300002);
errorCodeMap.set("300003", STATIC_ERRORCDDE.RTN_300003);
errorCodeMap.set("300004", STATIC_ERRORCDDE.RTN_300004);


errorCodeMap.set("000003", STATIC_ERRORCDDE.ERROR_COMMON_000003);
errorCodeMap.set("000005", STATIC_ERRORCDDE.ERROR_COMMON_000005);//???这个后台提供的错误代码怎么有好几个的？有问题啊
errorCodeMap.set("266662", STATIC_ERRORCDDE.RTN_NOOPID);
errorCodeMap.set("266663", STATIC_ERRORCDDE.RTN_ERRORRUN);
errorCodeMap.set("00", STATIC_ERRORCDDE.RTN_SUCC_CODE);
errorCodeMap.set("266664", STATIC_ERRORCDDE.RTN_APPLYID_NULL);
errorCodeMap.set("100000", STATIC_ERRORCDDE.NO_SUCH_ACCOUNT);
errorCodeMap.set("000006", STATIC_ERRORCDDE.APPLYAMT_IS_EMPTY);

errorCodeMap.set("000011", STATIC_ERRORCDDE.AMT_IS_EMPTY);
errorCodeMap.set("000012", STATIC_ERRORCDDE.IDCARD_IS_ERROR);
errorCodeMap.set("000013", STATIC_ERRORCDDE.BANKDATA_IS_NULL);
errorCodeMap.set("000014", STATIC_ERRORCDDE.SUBSERVICE_IS_UNVILIABLE);
errorCodeMap.set("000015", STATIC_ERRORCDDE.OPENID_IS_NULL);
*/

//根据后台返回的错误代码，提示对应的 提示语
function getErrorCode(error) {
  if (error != null && error != '') {
    return errorCodeMap.get(error)//调用常量map方法，
  }
}

//暴露方法
export default {
  getErrorCode,
  STATIC_ERRORCDDE
}
