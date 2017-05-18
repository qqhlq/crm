import Vue from 'vue'

let plugin = {}
plugin.install = Vue => {

  /**
   * 将多个对象合并到目标对象
   * @param {Object} target 合并的目标对象
   * @param {Object} sources 待合并的对象
   * @returns {Object} 返回合并后的对象
   */
  Vue.prototype.$wMerge = (target, ...sources) => {
    return Object.assign(target, ...sources)
  }

  /**
   * 根据 prop 找到 target 中的特定对象，并将 source 传递的值赋值给找到的对象
   * @param {Array} target 被查找的数组，数组内由对象组成，如，[{a:1}, {b:2}]
   * @param {Object} source 属性值将会被替换到 target 中找到的对象
   * @param {*} prop target 值是唯一的属性名
   * @returns {Object} 返回更新完成的目标数组
   */
  Vue.prototype.$wMergeObjArr = (target, source, prop) => {
    for (let item of target) {
      for (let prop in source) {
        if (item[prop] === source[prop]) {
          item[prop] = source[prop]
        }
      }
    }
    return target
  }

  Vue.wMerge = Vue.prototype.$wMerge
  Vue.wMergeObjArr = Vue.prototype.$wMergeObjArr
}

export default plugin
