import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  vetUsers: [],
}
let getters = {
  vetUsers: state => state.vetUsers,

}
let mutations = {

  /**
   * 处理人员数据（添加已选和默选）
   * @param {Object} payload {
   * }
   */

  [types.GROUP_COMPLEXDROP_DATA_PREP](state, payload) {
    state.vetUsers = payload.data.data.records
  },
}
let actions = {

  /**
   * 获取人员数据
   * @param {Object} payload
   * @param {el} payload.adEl - 添加事件标签
   * @param {function} payload.behavior - 行为
   */

  async getVetusers({ commit }, payload) {
    let _data=  await Vue.wGet('/admin/workflow/vet_users.do', payload.param)
    commit(types.GROUP_COMPLEXDROP_DATA_PREP, {data:_data})
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
