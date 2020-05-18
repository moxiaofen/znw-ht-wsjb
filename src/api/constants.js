
//登录
const APP_LOGIN = 'app/appLogin';
//注册
const APP_REGISTER = 'app/appRegister';
//手机验证码
const APP_SENDCODE = 'app/sendCode'; 
//校验验证码
const APP_CHECKCODE = 'app/checkCode'
//忘记密码第一步（确认帐号）
const APP_FORGETPSWA = 'app/forgetPasswordA'; 
//忘记密码第二步（安全认证）
const APP_FORGETPSWB = 'app/forgetPasswordB'; 
//忘记密码第三步（重置密码）
const APP_FORGETPSWC = 'app/forgetPasswordC'; 
//身份认证
const APP_IDCHECKAPPLY = 'app/appIdCheckApply'
//身份认证查询
const QUERY_AUTHENTY_RESULT = 'app/authenticationResult2'

//产品列表查询----返回的projectType是什么字段？？融资申请页面的融资比例数据从哪返回？？
const QUERY_PRODUCT_LIST = 'app/queryProductList';
//资产信息列表  
const QUERY_BROKER_LIST = 'app/findBrokerByPage';
//资产信息详情 
const QUERY_BROKER_DETAIL = "app/findBrokerById";
//再保理信息列表  
const QUERY_REFACTORING_LIST = 'app/fildRefactoringPage';
//再保理信息详情  
const QUERY_REFACTORING_DETAIL = 'app/fildRefactoringById';
//融资进度列表
const QUERY_FINANCING_LIST = 'app/getFactoringApplyList';
//融资进度详情 
const QUERY_FINANCING_DETAIL = 'app/financingApplyDetail';
//还款测算列表----没数据，未完成-----keep-alive刷新列表，待办
const QUERY_CALCULATE_LIST = 'app/getRepaymentCalList';
//还款测算详情----没数据，未完成 
const QUERY_CALCULATE_DETAIL = 'app/findRepaymentDetail';
//台账管理列表
const QUERY_LEDGER_LIST = 'app/getLedgerList';
//台账管理详情 
const QUERY_LEDGER_DETAIL = 'app/findLedgerDetail';
//台账对账
const LEDGER_CONFIRM = 'app/ledgerConfirm';

//合同管理列表----没数据，未完成, 接口不明   getContractList
const GET_CONTRACT_LIST = 'app/getContractList';
//应收账款列表----没数据，status应传什么
const QUERY_RECEIVABLES_LIST = 'app/findAccountByPage';
//应收账款详情---没数据---造假数据，数据回填
const QUERY_RECEIVABLES_DETAIL = 'app/findAccountByAcctCode';
//应收账款转让列表---没数据
const QUERY_RECEIVESAPPLY_LIST = 'app/findAccountTransferByPage';
//应收账款转让详情---没数据---造假数据，数据回填
const QUERY_RECEIVESAPPLY_DETAIL = 'app/findAccountTransferByApplyNo';
//应收账款转让申请
const ADD_RECEIVABLES_APPLY = 'app/submitTransfer';   
//融资意向申请
const APP_FINANCING_EOI = 'app/fncInttApply';
//融资申请
const APP_FINANCING_APPLY = 'app/financingApply';
//授信合同列表查询
const QUERY_CONTRACT_LIST = 'app/queryContractList';
//申请授权码
const APPLY_AUTHORIZE_CODE = 'app/applyAuthorizeCode';
//验证授权码
const COMFIRM_AUTHORIZE_CODE = 'app/confirmAuthorizeCode';
//人脸识别1
const FACE_IDENTIFY = 'app/faceIdAuthentication'
//人脸识别2
const GET_AUTH_RESULT = 'app/getAuthResult'
//企业信息查询
const GET_COMPANY_INFO = 'app/getCompanyInfoByCustNo'
//企业信息修改
const UPDATE_COMPANY_INFO = 'app/updateCompanyInfo'
//个人信息修改
const CHANGE_USERNAME = 'app/changeUsername'
const CHANGE_PSW = 'app/changePass'
const CHANGE_EMAIL = 'app/changeMail'
const CHANGE_PHONE = 'app/changePhone'
const CHANGE_HEADERIMG = 'app/headerimgsave'



//意见反馈
const FEED_BACK = '/credit/feedBack.htm';
//获取我的信息
const GET_USER_INFO = '/common/queryMerchantInfo.htm';
//更新联系人
const UPDATE_CONTACT = '/credit/modifyHomeRe.htm';
//授权状态查询
const IS_ACCESS = '/customer/verifyAccount.htm';
//消息中心列表
const GET_MESSAGE_LIST = '/credit/queryMessageDetail.htm';
//修改密码
const UPDATE_PASSWORD = '/app/operate.htm';
//验证客户所在区域是否已开展业务
const IS_AREA_OPEN = '/customer/checkBusinessIsOpen.htm';
//新商盟授权短信验证码
const BUSINESS_SEND_SMS = '/common/sendAuthCode.htm';
//新商盟激活授权
const BUSINESS_ACCESS = '/credit/creditAlive.htm';
//获取帮助列表
const GET_HELP_LIST = '/credit/helpListQuery.htm';
//消息修改已读状态
const MODIFY_MESSAGE_STATUS = '/credit/modifyMessageStatus.htm';

//校验验证码
const CHECK_VERIFICATION = '/credit/verification.htm';

//获取验证码
const GET_VERIFICATION = '/common/sendCode.htm';

//上传图片接口
const UPLOAD_IMG = '/common/uploadPhoto64.htm';

//常规进件接口
const APPLYLOANDATA = '/credit/applyLoanData.htm';

//查询新商盟账号信息
const QUERYNEWBUSINESSACCOUNT = '/customer/queryCustInfoByNewBusinessAccount.htm';

//登陆注册接口
const OPERATE ="/app/operate.htm";

//查询状态接口

const QUERYCREDITSTATUS = '/credit/queryCreditStatus.htm';

//查询刷新缓存接口
const DELAY ='/app/delay.htm';
//埋点url
const ROOTMAI = 'https://countly.antiantech.com';
//埋点APPkey
const APPKEY = 'fac364a78f023a9e1d95e7a3d9be08a53144831b';
//埋点key
const toRegisterClick = 'toRegisterClick';
const LoginClick = 'LoginClick';
const queryAreaClick = 'queryAreaClick';
const queryAreaOpenClick = 'queryAreaOpenClick';
const confirmClick = 'confirmClick';
const signButton = 'signButton';
const drawingClick = 'drawingClick';
const confirmButton = 'confirmButton';
const AccessClick = 'AccessClick';
const QuickFirstNext = 'QuickFirstNext';
const QuickWrong = 'QuickWrong';
const QuickDevelop = 'QuickDevelop';
const QuickQualified  = 'QuickQualified ';
const QuickWriteTwo = 'QuickWriteTwo';
const QuickNoNetwork = 'QuickNoNetwork';
const QuickWriteThree = 'QuickWriteThree';
const QuickZuoji = 'QuickZuoji';
const QuickPushHouse = 'QuickPushHouse';
const QuickStream = 'QuickStream';
const QuickPushCar = 'QuickPushCar'
const QuickBankClick = 'QuickBankClick'
const WriteTwo = 'WriteTwo'
const PushHouse = 'PushHouse';
const PushCar = 'PushCar';
const PushStream = 'PushStream';
const WrongClick = 'WrongClick';
const Develop = 'Develop';
const Qualified  = 'Qualified ';
const NoNetwork = 'NoNetwork';
const BankClick = 'BankClick';
const RepayClick = 'RepayClick';
const confirmButton_two = 'confirmButton_two';
const SaveClick = 'SaveClick';
const inform = 'inform';
const Service = 'Service';
const SedPwdClick = 'SedPwdClick';
const SetPwdClick_two = 'SetPwdClick_two';
const ClosePwdClick = 'ClosePwdClick';
const ChangePwdClick = 'ChangePwdClick';
const ForgetClick = 'ForgetClick';
const inquiryClick = 'ClosePwdClick';
const FailClick = 'FailClick';
const OvertimeClick = 'OvertimeClick';
const expireClick = 'expireClick';
const QuickhandleClick = 'QuickhandleClick';
const agreementClick = 'agreementClick';
const handleClick = 'handleClick';
const dataClick = 'dataClick';
const HelpClick = 'HelpClick';
const FeedClick = 'FeedClick';
const telephoneClick= 'telephoneClick';
const MessageClick = 'MessageClick';
const RepayClick_two = 'RepayClick_two';
const ZuoJiHao = 'ZuoJiHao';
export default {

  APP_LOGIN,
  APP_REGISTER,
  APP_SENDCODE,
  APP_CHECKCODE,
  APP_FORGETPSWA,
  APP_FORGETPSWB,
  APP_FORGETPSWC,
  APP_IDCHECKAPPLY,
  QUERY_AUTHENTY_RESULT,
  QUERY_PRODUCT_LIST,
  GET_CONTRACT_LIST,
  QUERY_BROKER_LIST,
  QUERY_BROKER_DETAIL,
  QUERY_REFACTORING_LIST,
  QUERY_REFACTORING_DETAIL,
  QUERY_FINANCING_LIST,
  QUERY_FINANCING_DETAIL,
  QUERY_CALCULATE_LIST,
  QUERY_CALCULATE_DETAIL,
  QUERY_LEDGER_LIST,
  QUERY_LEDGER_DETAIL,
  LEDGER_CONFIRM,
  QUERY_RECEIVABLES_LIST,
  QUERY_RECEIVABLES_DETAIL,
  QUERY_RECEIVESAPPLY_LIST,
  QUERY_RECEIVESAPPLY_DETAIL,
  ADD_RECEIVABLES_APPLY,
  APP_FINANCING_EOI,
  APP_FINANCING_APPLY,
  QUERY_CONTRACT_LIST,
  APPLY_AUTHORIZE_CODE,
  COMFIRM_AUTHORIZE_CODE,
  FACE_IDENTIFY,
  GET_AUTH_RESULT,
  GET_COMPANY_INFO,
  UPDATE_COMPANY_INFO,
  CHANGE_USERNAME,
  CHANGE_PSW,
  CHANGE_EMAIL,
  CHANGE_PHONE,
  CHANGE_HEADERIMG,




  RepayClick_two,
  MessageClick,
  telephoneClick,
  FeedClick,
  HelpClick,
  handleClick,
  dataClick,
  agreementClick,
  expireClick,
  QuickhandleClick,
  OvertimeClick,
  ForgetClick,
  FailClick,
  inquiryClick,
  ChangePwdClick,
  ClosePwdClick,
  SetPwdClick_two,
  SedPwdClick,
  inform,
  Service,
  SaveClick,
  confirmButton_two,
  RepayClick,
  BankClick,
  NoNetwork,
  Develop,
  Qualified,
  WrongClick,
  PushStream,
  PushCar,
  PushHouse,
  ZuoJiHao,
  WriteTwo,
  QuickBankClick,
  QuickPushCar,
  QuickStream,
  QuickWriteThree,
  QuickPushHouse,
  QuickZuoji,
  QuickNoNetwork,
  QuickWriteTwo,
  QuickQualified,
  QuickDevelop,
  QuickWrong,
  QuickFirstNext,
  AccessClick,
  confirmButton,
  drawingClick,
  signButton,
  confirmClick,
  queryAreaOpenClick,
  queryAreaClick,
  LoginClick,
  toRegisterClick,
  APPKEY,
  ROOTMAI,
  QUERYNEWBUSINESSACCOUNT,
  APPLYLOANDATA,
  UPLOAD_IMG,
  GET_VERIFICATION,
  CHECK_VERIFICATION,
  FEED_BACK,
  GET_USER_INFO,
  UPDATE_CONTACT,
  IS_ACCESS,
  GET_MESSAGE_LIST,
  IS_AREA_OPEN,
  BUSINESS_SEND_SMS,
  BUSINESS_ACCESS,
  GET_HELP_LIST,
  UPDATE_PASSWORD,
  OPERATE,
  QUERYCREDITSTATUS,
  DELAY,
  MODIFY_MESSAGE_STATUS
}
