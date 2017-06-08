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
  Vue.prototype.$wGet = (uri, params, prev = data => data) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(uri, { params: params }, {
        emulateJSON: true
      }).then(response => {
        if (typeof response.body === 'string') {
          response.body = JSON.parse(response.body)
        }
        response.body = prev(response.body)
        if (verify(response.body)) {
          resolve(response.body)
        }
      }, response => {
        error(response)
        reject(response)
      })
    })
  }

  /**
   * http POST
   * @param {String} uri 请求链接
   * @param {Object} param 请求参数
   * @param {Function} prev 返回数据预处理函数
   */
  Vue.prototype.$wPost = (uri, params, prev = data => data) => {
    return new Promise((resolve, reject) => {
      Vue.http.post(uri, params, {
        emulateJSON: true,
        emulateHTTP: true
      }).then(response => {
        if (typeof response.body === 'string') {
          response.body = JSON.parse(response.body)
        }
        response.body = prev(response.body)
        if (verify(response.body)) {
          resolve(response.body)
        }
      }, response => {
        error(response)
        reject(response)
      })
    })
  }

  Vue.wGet = Vue.prototype.$wGet
  Vue.wPost = Vue.prototype.$wPost
}


/**
 * 统一处理接口返回的字段
 * @param {Object} response 服务器的返回值
 * @returns {Boolean} true：通过处理，执行回调，false：没通过处理，执行特定步骤，不执行回调
 */
function verify(response) {
  if (response.code === 200) {
    return true
  }
  switch (response.code) {
    case -100:
      location.href = '/boss/user/login'
      break
    default:
      ElementUI.Message(response.message)
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
