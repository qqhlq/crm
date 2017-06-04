import Vue from 'vue'

let plugin = {}
plugin.install = Vue => {

  /**
   * 将整数格式化成每 3 位添加一个逗号
   * @param {Number} num 待格式化的数字
   * @returns {String} 返回格式化后的数字
   */
  Vue.prototype.$wFormatInt = num => {
    let numPrefix = ''
    let numArr = ''
    let numDist = ''

    // 处理负数情况
    if (num < 0) {
      numPrefix = '-'
      numArr = String(num).slice(1).split('').reverse()
    } else {
      numArr = String(num).split('').reverse()
    }

    for (let i = 0; i < numArr.length; i++) {
      numDist += numArr[i]
      if ((i + 1) % 3 === 0 && (i + 1) < numArr.length) {
        numDist += ','
      }
    }

    return numPrefix + numDist.split('').reverse().join('')
  }

  /**
   * 将格式化后的整数转换成正常的整数
   * @param {String} str 格式化后的字符串
   * @returns {Number} num 整数
   */
  Vue.prototype.$wRFromatInt = str => {
    return Number(str.replace(/\,/g, ''))
  }

  /**
   * 将浮点数格式化成每 3 位添加一个逗号
   * @param {Number} money 待格式化的金额
   * @returns {String} 返回格式化后的数字
   */
  Vue.prototype.$wFormatDeci = num => {
    let numDeci = String(num).slice(-3)
    let numInt = String(num).slice(0, -3)
    let numDist = Vue.prototype.$wFormatInt(numInt)
    return numDist + numDeci
  }

  /**
   * 将格式化后的浮点数转换成正常的浮点数
   * @param {String} str 格式化后的字符串
   * @returns {Number} num 浮点数
   */
  Vue.prototype.$wRFormatDeci = str => {
    return Number(str.replace(/\,/g, ''))
  }

  Vue.wFormatInt = Vue.prototype.$wFormatInt
  Vue.wRFormatInt = Vue.prototype.$wRFormatInt
  Vue.wFormatDeci = Vue.prototype.$wFormatDeci
  Vue.wRFormatDeci = Vue.prototype.$wRFormatDeci
}

export default plugin
