/**
 * Created by ying on 2018/8/20.
 */
import _this from './main.js'
import _StringUtils from './api/StringUtils.js'
const KEY_SESSION = 'session'//session Key
const EXP_SESSION = 15 * 60 * 1000;//session 15分钟失效\

const PRE_SESSION = 5 * 60 * 1000;// 5分钟,请求1次后台接口刷新缓存

const PREFIX_CACHE = 'iccs_credit:';//缓存前缀

export default {

  setSession (sessionValue) {
    let curTime = new Date().getTime();
    localStorage.setItem(PREFIX_CACHE + KEY_SESSION,JSON.stringify({data:sessionValue,time:curTime}));
  },
  fetchSession () {

    let data = localStorage.getItem(PREFIX_CACHE + KEY_SESSION);
    let dataObj = JSON.parse(data);
    let nowDate = new Date().getTime();
    let loginSession=sessionStorage.getItem("loginSession");


    if ((dataObj !== null) && dataObj.hasOwnProperty('time') && dataObj.hasOwnProperty('data') && !(_StringUtils.isEmpty(loginSession))) {
    //有登陆的session信息，具体判断时间差是否超时

      if (nowDate - dataObj.time > EXP_SESSION) {
        //超过15分钟了，需要强制登陆跳转,登陆的页面
        _this.$dialog.alert("    ","登陆超时，请重新登陆");
        //判断是密码登陆还是 手势登陆
        if( !_StringUtils.isEmpty(_StringUtils.getFingerLockPwd())  && _StringUtils.getFingerLockType()==="2"){
          _this.$router.replace({path: '/security/fingerLockView'});
        }else{
          _this.$router.replace(_this.$RM.Login);
        }
        // x>15
        console.log('信息已过期');
        return ''
      }
      // 5<x<15
      else if ((nowDate - dataObj.time) < EXP_SESSION && (nowDate - dataObj.time) > PRE_SESSION) {
        //没有超过15分钟，但是超过了5分钟了，那就请求一次后台接口，刷新时间的缓存，再刷新前端的时间缓存
        let timestamp = _this.$utils.generateSignTime();
        let reqId = _this.$utils.generateSignTime();
        let sign = _this.$utils.generateSign(reqId, timestamp);

        const url =_this.$api.ROOT +_this.$Constants.DELAY;
        _this.$http.post(url, {
          reqId: reqId,
          appId: window.appId,
          sign: sign,
          timestamp: timestamp,
          openId: sessionStorage.getItem("loginSession")
        })
          .then(function (res) {
            console.log(res);
            if (res.data.ret === '0') {
              //刷新前端时间缓存
              _this.$storeData.resetTimeSession();
            }
          });

        console.log("store=" + dataObj.data + dataObj.time);
        let sessionValue = dataObj.data;
        return sessionValue;
      }
      else {
        //  x<5，没有超过5分钟，只刷新前端的时间缓存
        _this.$storeData.resetTimeSession();
        console.log("store=" + dataObj.data + dataObj.time);
        let sessionValue = dataObj.data;
        return sessionValue;
      }
    }

  },
  /**
   *
   *  重新设置session时间，以保证每到一个登录界面都刷新一次时间
   */
  resetTimeSession(){
    let token = sessionStorage.getItem("loginSession");
    this.setSession(token)
  },

  /**
   *
   *  remove session
   */
  romveTimeSession(){
    sessionStorage.removeItem("loginSession")

  },

  set (key, value) {
    localStorage.setItem(PREFIX_CACHE + key,JSON.stringify(value));
  },
  fetch (key) {
    let data = localStorage.getItem(PREFIX_CACHE + key);
    let dataObj = JSON.parse(data);
    //console.log("data="+dataObj);
    return dataObj;
  }
}

