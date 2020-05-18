//let ROOT = 'https://wechatapp.antiantech.com/iccs-pre';//根路径//测试环境


//let ROOT = 'https://iccs-pre.antiantech.com/iccs-pre';//根路径//生产环境

let ROOT = 'http://113.105.121.204:8108/topiscf-bas/';

let axios = require('axios');
import constants from './constants'
//import {Toast} from 'mint-ui';
import _this from '../main.js';

// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

// 设置超时时间为10秒
axios.defaults.timeout = 10000;
//axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
/*
 接口处理函数
 这个函数每个项目都是不一样的，我现在调整的是适用于
 https://cnodejs.org/api/v1 的接口，如果是其他接口
 需要根据接口的参数进行调整。参考说明文档地址：
 https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
 主要是，不同的接口的成功标识和失败提示是不一致的。
 另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
 */
axios.interceptors.response.use(data => {
   // console.log(JSON.stringify(data.data));
    console.log("111111");
    return data;
  },
  err => {
    return Promise.resolve(err);
  }
)

//添加请求拦截拦截
axios.interceptors.request.use(config => {
  //在发送请求之前
  config.headers = {
    'Content-Type': 'application/json' //  注意：设置很关键
  }
  console.log(JSON.stringify(config.data));
  return config;
}, error => {
  //请求错误时做些些
  console.log(error);
  return error;
});

function apiAxios(method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: ROOT,
    withCredentials: false
  })
    .then(function (res) {
      if (res && res.status === 200) {
        if (success) {
          success(res.data)
        }
      } else {
        if (failure && res) {
          failure(res)
          console.log('error: ' + JSON.stringify(res));
        } else {
          console.log('error: ' + JSON.stringify(res));
        }
      }
    })
    .catch(function (err) {
      if (failure && err) {
        failure('error: ' + JSON.stringify(err))
        console.log(err);
      }
    })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  //暴露域名
  ROOT,

}
