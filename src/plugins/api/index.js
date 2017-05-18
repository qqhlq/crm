/**
 * usage：
 * 1. 引用插件 import api from 'path/to/api'
 * 2. 注册插件 Vue.use(api)
 * 3. 在组件中使用 this.$wGet/this.$wPost
 * 4. 在非组件区域使用 Vue.wGet/Vue.wPost
 */

import Vue from 'vue'
import router from '../../router'
import ElementUI from 'element-ui'

let plugin = {}
plugin.install = Vue => {

  /**
   * http GET
   * @param {String} uri 请求链接
   * @param {Object} query 请求参数
   * @param {Function} prev 返回数据预处理函数
   */
  Vue.prototype.$wGet = async (uri, params, prev = data => data) => {
    try {
      let response = await Vue.http.get(uri, { params }, {
        emulateJSON: true
      })

      // 如果接口返回的是 String 类型的数据，则进行转换
      if (typeof response.body === 'string') {
        response.body = JSON.parse(response.body)
      }
      response.body = prev(response.body)
      if (verify(response.body)) {
        return new Promise(resolve => resolve(response.body))
      }
    } catch(e) {
      error(e)
    }
  }

  /**
   * http POST
   * @param {String} uri 请求链接
   * @param {Object} param 请求参数
   * @param {Function} prev 返回数据预处理函数
   */
  Vue.prototype.$wPost = async (uri, params, prev = data => data) => {
    try {
      let response = await Vue.http.post(uri, params, {
        emulateJSON: true,
        emulateHTTP: true
      })

      // 如果接口返回的是 String 类型的数据，则进行转换
      if (typeof response.body === 'string') {
        response.body = JSON.parse(response.body)
      }
      response.body = prev(response.body)
      if (verify(response.body)) {
        return new Promise(resolve => resolve(response.body))
      }
    } catch(e) {
      error(e)
    }
  }

  Vue.wGet = Vue.prototype.$wGet
  Vue.wPost = Vue.prototype.$wPost
}


/**
 * 统一处理接口返回的字段
 * @param {Object} response 服务器的返回值
 * @returns {Boolean} true：通过处理，执行回调，false：没通过处理，执行特定步骤，不执行回调
 */
async function verify(response) {
  if (response.code >= 200 && response.code <= 299) {
    return true
  }
  switch (response.code) {
    case 100:
      location.href = '/wdsp/website/index'
      break
    case 101:
      ElementUI.Message('当前无权限访问该页面')
      break
    case 300:
      location.href = response.data
      break
    case 301:
      let action = await ElementUI.MessageBox.alert(response.message, '系统提示', {
        confirmButtonText: '确定'
      })
      if (action === 'confirm') {
        location.href = response.data
      }
      break
    case 400:
      ElementUI.Message(response.message)
      break
    case 500:
      ElementUI.Message('服务器异常')
      break
    case 501:
      ElementUI.Message('服务器停机维护')
      break
    default:
      ElementUI.Message('当前服务器返回了一个未定义的状态码')
      break
  }
  return false
}

/**
 * 统一处理接口请求异常
 */
function error(e) {
  ElementUI.Message('接口请求异常')
  console.error(e)
}

export default plugin
