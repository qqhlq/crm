import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  data: {}
}
let getters = {
  data: state => state.data
}
let mutations = {


}
let actions = {

   /**
   * 获取导航栏内容
   * @param {Object} payload {
   * }
   */

  async getMenusList({ commit }, param) {
    state.data =  await Vue.wGet('/admin/user/list_menus.do', param)
  },

  /**
   * 获取公司所有员工列表
   * @param {Object} payload {
   * }
   */

  async getAllSaffList({ commit }, param) {
    state.data =  await Vue.wGet('/admin/user/list_menus.do', param)
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
