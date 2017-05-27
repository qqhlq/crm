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
  async stationMailIn({ commit }, payload) {
    commit(types.STATIONMAIL_IS_OUT, {'isStationMailOut': true})
  }
}
