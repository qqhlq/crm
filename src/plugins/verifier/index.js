import Vue from 'vue'

let plugin = {}
plugin.install = Vue => {

  /**
   * 校验当前字符串是不是 url
   * @param {String} str 待校验字符串
   * @returns {Boolean} true: 当前字符串是url，false: 当前字符串不是url
   */
  Vue.prototype.$wVerifyUrl = str => {
    let regexp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    return regexp.test(str)
  }

  /**
   * 校验当前字符串是不是邮箱
   * @param {String} str 待校验字符串
   * @returns {Boolean} true: 当前字符串是邮箱，false: 当前字符串不是邮箱
   */
  Vue.prototype.$wVerifyEmail = str => {
    let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi
    return regexp.test(str)
  }

  /**
   * 校验当前字符串是不是手机
   * @param {String} str 待校验字符串
   * @returns {Boolean} true: 当前字符串是手机，false: 当前字符串不是手机
   */
  Vue.prototype.$wVerifyPhone = str => {
    let regexp = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9]|)[0-9]{8}$/gi
    return regexp.test(str)
  }

  /**
   * 校验当前字符串是不是银行账号
   * @param {String} str 待校验字符串
   * @returns {Boolean} true: 当前字符串是银行账号，false: 当前字符串不是银行账号
   */
  Vue.prototype.$wVerifyBankNum = str => {
    let regexp = /^\d{16}|\d{19}$/gi
    return regexp.test(str)
  }

  /**
   * 校验当前是不是浮点数
   * @param {String} str 待校验数字
   * @returns {Boolean} true: 当前字符串是浮点数，false: 当前字符串不是浮点数
   */
  Vue.prototype.$wVerifyDeci = num => {
    let regexp = !/\d+(\.\d+)?$/gi
    return regexp.test(num)
  }

  Vue.wVerifyUrl = Vue.prototype.$wVerifyUrl
  Vue.wVerifyEmail = Vue.prototype.$wVerifyEmail
  Vue.wVerifyPhone = Vue.prototype.$wVerifyPhone
  Vue.wVerifyBankNum = Vue.prototype.$wVerifyBankNum
  Vue.wVerifyDeci = Vue.prototype.$wVerifyDeci
}

export default plugin
