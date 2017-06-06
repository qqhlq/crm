import * as types from './mutation-types'
import Vue from 'vue'

export default {


  /**
   * 开关站内信
   * @param {Object} payload {
   * }
   */
  async switchStationMail({ commit, state }, payload) {
    commit(types.STATIONMAIL_IS_OUT, {'isStationMailOut': !(state.isStationMailOut)})
  },

  /**
   * 打开站内信
   * @param {Object} payload {
   * }
   */
  async stationMailOut({ commit, state }, payload) {
    commit(types.STATIONMAIL_IS_OUT, {'isStationMailOut': false})
  },

  /**
   * 关闭站内信
   * @param {Object} payload {
   * }
   */
  async stationMailIn({ commit }, ) {
    commit(types.STATIONMAIL_IS_OUT, {'isStationMailOut': true})
  },

  /**
   * 点击某个标签外任意地方实现某行为
   * @param {Object} payload - 参数
   * @param {el} payload.el - 屏蔽的标签
   * @param {el} payload.adEl - 添加事件标签
   * @param {function} payload.behavior - 行为
   */
  on({ commit }, payload) {
    if(payload.adEl.addEventListener) {
      payload.adEl.addEventListener('click', (e) => {
        if (!payload.el.contains(e.target)){
          payload.behavior()
        }
      }, false)
    } else {
      attachEvent('onclick', (e) => {
        if (!payload.el.contains(e.target)){
          payload.behavior()
        }
      })
    }
  },





}
