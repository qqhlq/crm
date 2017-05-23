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
  if (response.code === 200) {
    return true
  }
  switch (response.code) {
    case -100:
      location.href = '/login'
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
