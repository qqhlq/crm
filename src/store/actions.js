import * as types from './mutation-types'
import Vue from 'vue'

export default {


  /**
   * 开关站内信
   * @param {Object} payload {
   * }
   */
  async switchStationMail({ commit, state }, payload) {
    commit(types.IS_STATIONMAIL_OUT, {'isStationMailOut': !(state.isStationMailOut)})
  },

  /**
   * 打开站内信
   * @param {Object} payload {
   * }
   */
  async stationMailOut({ commit, state }, payload) {
    commit(types.IS_STATIONMAIL_OUT, {'isStationMailOut': false})
  },

  /**
   * 关闭站内信
   * @param {Object} payload {
   * }
   */
  async stationMailIn({ commit }, payload) {
    commit(types.IS_STATIONMAIL_OUT, {'isStationMailOut': true})
  },


  /**
   * 获取导航栏内容
   * @param {Object} payload {
   * }
   */

  async getMenusList({ commit }, param) {
    let _data
    Vue.wGet('/admin/user/list_menus.do', param).then(body =>{
      _data = body
    })
    return _data
  },

  /**
   * 获取公司所有员工列表
   * @param {Object} payload {
   * }
   */

  async getAllSaffList({ commit }, param) {
    return await Vue.wGet('/admin/workflow/vet_users.do', param)
  },
}
