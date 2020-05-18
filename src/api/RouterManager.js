//帮助中心
const HelpCenter = '/Owner/HelpCenter';
//我的信息
//const PersonInfo = '/Owner/PersonInfo';
//授权区域查询
const QueryBusinessArea = '/Owner/QueryBusinessArea';
//反馈成功
const FeedSuccess = '/Owner/FeedSuccess';
//意见反馈
const FeedBack = '/Owner/FeedBack';
//新商盟授权页面
const BusinessAccess = '/Owner/BusinessAccess';
//授权信息界面
const AccessInfo = '/Owner/AccessInfo';
//消息中心
const MessageCenter = '/Owner/MessageCenter';
//消息详情
const MessageDetail = '/Owner/MessageDetail';
//授权成功
const AccessSuccess = '/Owner/AccessSuccess';
//授权的协议
const BusinessService = '/Owner/BusinessService';

const Main = '/main';
const Register = '/login/register'; //用户注册
const SetPwd = '/login/setpwd'; //设置密码
const Login = '/login'; //用户登陆
const ForgetPwd = '/login/forgetpwd'; //用户忘记密码
const WriteOne = '/apply/writeone'; //进件申请第一步
const WriteTwo = '/apply/writetwo'; //进件申请第二步
const Protocol = '/apply/protocol';
const Operation = '/apply/operation';
const Repay = '/repay';
const RepaySkip = '/repay/repayskip';
const RepayLoading = '/repay/repayloading';

//安全设置
const SecuritySetting = '/security/securitySetting';
//修改原密码
const ChangePwd = '/security/changePwd';
//身份验证
const SecurityCheck = '/security/securityCheck';
//解锁手势
const FingerLockView = '/security/fingerLockView';
//重新绘制手势
const ChangerFingerView = '/security/changerFingerView';

//断网的路由
const Netbroken = '/netbroken'; //断网页面

//借款首页
const Index = '/index';
//进件成功页面
const successFul = '/success';

//快捷进件页面1
const quickwriteone = '/apply/quickwriteone';
//快捷进件页面2
const quickwritetwo = '/apply/quickwritetwo';
//快捷进件页面3
const quickwritethree = '/apply/quickwritethree';

const check = '/check';

//安田注册协议文本
//const ReGisterProtocol = '/apply/registerProtocol';
//安田个人信息须知协议文本
const PersonProtocol = '/apply/personProtocol';

////////////////////////////////////
const HomePage = '/home/Home';
const MinePage = '/mine/Mine';
const LoginPage = '/login/LoginPage';
const RegisterPage = '/register/Register';
const ForgetPwdPage = '/forget/ForgetPwd';
const SettingPage = '/setting/Setting';
const ReGisterProtocol = '/setting/ReGisterProtocol';
const FinancingProgress = '/financing/FinancingProgress';
const ContractPage = '/contract/Contract';
const ContractPdf = '/contract/ContractPdf';
const Receivables = '/receivables/Receivables';
const BusinessApply = '/receivables/BusinessApply'//业务申请

const ReceivablesList = '/receivables/ReceivablesList';

const AuthenticateId =  '/authenticate/identity';
const IdentityQuery = '/authenticate/identityQuery'
const IdentityAct = '/authenticate/identityAct'

const IdentityProtocol = '/setting/IdentityProtocol';//身份认证的免责说明


const AboutPage = '/setting/About';
const Navigation = '/';
const ReceivablesDetail = '/receivables/ReceivablesDetail';
const FinancingProgressDetail = '/financing/FinancingProgressDetail';
const ReceivesApplyList = '/receivables/ReceivesApplyList';
const ReceivablesApplyDetail = '/receivables/ReceivablesApplyDetail';
const AddReceivablesApply = '/receivables/AddReceivablesApply';
const CalculateList = '/calculate/CalculateList';
const CalculateDetail = '/calculate/CalculateDetail';
const FianancingApply = '/financing/FianancingApply';
const AddReceivables = '/receivables/AddReceivables';
const LedgerList = '/ledger/LedgerList';
const LedgerDetail = '/ledger/LedgerDetail';
const LedgerPayment = '/ledger/LedgerPayment';
const LedgerRepayment = '/ledger/LedgerRepayment';

const BrokerProgress = '/broker/BrokerProgress'
const BrokerProgressDetail = '/broker/BrokerProgressDetail'
const BrokerDetail = '/broker/BrokerDetail'
const RefactoringProgress = '/refactoring/RefactoringProgress'
const RefactoringProgressDetail = '/refactoring/RefactoringProgressDetail'
const RefactoringDetail = '/refactoring/RefactoringDetail'
//融资意向申请
const FianancingEOI = '/financing/FianancingEOI';
const CompanyInfo = '/setting/CompanyInfo'
const CompanyInfoUpdata = '/setting/CompanyInfoUpdata'
const PersonInfo = '/setting/PersonInfo'
const PersonInfoUpdata = '/setting/PersonInfoUpdata'
const PersonInfoName = '/setting/PersonInfoName'
const PersonInfoPsw = '/setting/PersonInfoPsw'
const PersonInfoEmail = '/setting/PersonInfoEmail'
const PersonInfoPhone = '/setting/PersonInfoPhone'



export default {
  LedgerList,
  HomePage,
  MinePage,
  LoginPage,
  Navigation,
  RegisterPage,
  ForgetPwdPage,
  ContractPage,
  ContractPdf,
  FinancingProgress,
  SettingPage,
  Receivables,
  BusinessApply,//业务申请
  AuthenticateId,
  IdentityQuery,
  IdentityAct,
  IdentityProtocol,
  AboutPage,
  ReceivablesList,
  ReceivablesDetail,
  FinancingProgressDetail,
  ReceivesApplyList,
  ReceivablesApplyDetail,
  AddReceivablesApply,
  CalculateList,
  CalculateDetail,
  FianancingApply,
  AddReceivables,
  LedgerDetail,
  LedgerPayment,
  LedgerRepayment,
  BrokerProgress,
  BrokerProgressDetail,
  BrokerDetail,
  RefactoringProgress,
  RefactoringProgressDetail,
  RefactoringDetail,
  FianancingEOI,
  
  CompanyInfo ,
  CompanyInfoUpdata ,
  PersonInfo ,
  PersonInfoUpdata ,  
  PersonInfoName ,
  PersonInfoPsw,
  PersonInfoEmail,
  PersonInfoPhone ,



  ////////////////////////////////////

  PersonProtocol,
  ReGisterProtocol,
  quickwriteone,
  quickwritetwo,
  quickwritethree,
  successFul,
  Index,
  Netbroken,
  HelpCenter,
  //PersonInfo,
  FeedSuccess,
  FeedBack,
  BusinessAccess,
  AccessInfo,
  MessageCenter,
  MessageDetail,
  AccessSuccess,
  QueryBusinessArea,
  Main,
  Register,
  SetPwd,
  Login,
  ForgetPwd,
  WriteOne,
  WriteTwo,
  Protocol,
  Operation,
  Repay,
  RepaySkip,
  RepayLoading,
  SecuritySetting,
  ChangePwd,
  SecurityCheck,
  FingerLockView,
  ChangerFingerView,
  BusinessService
}
