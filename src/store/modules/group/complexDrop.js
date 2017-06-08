import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  allvetUsers: [],
  noPoolAndGroup: [],
  groupMembers: []
}
let getters = {
  allvetUsers: state => state.allvetUsers,
  noPoolAndGroup: state => state.noPoolAndGroup,
  groupMembers: state => state.groupMembers
}
let mutations = {

  /**
   * 处理人员数据（添加已选和默选）
   * @param {Object} payload {
   * }
   */

  [types.GROUP_COMPLEXDROP_ALLVETUSERS_PREP](state, payload) {
    state.allvetUsers = payload.data.data.records
  },

  /**
   * 处理人员数据（添加已选和默选）
   * @param {Object} payload {
   * }
   */

  [types.GROUP_COMPLEXDROP_NOPOLLANDGROUP_PREP](state, payload) {
    state.noPoolAndGroup = payload.data.data
  },

  /**
   * 处理人员数据（添加已选和默选）
   * @param {Object} payload {
   * }
   */

  [types.GROUP_COMPLEXDROP_GROUPMEMBERS_PREP](state, payload) {
    state.groupMembers = payload.data.data
  },
}
let actions = {

  /**
   * 获取全部人员数据
   * @param {Object} payload
   */

  async getallVetusers({ commit }, payload) {
    let _data=  await Vue.wGet('/admin/workflow/vet_users.do', payload.param)
    commit(types.GROUP_COMPLEXDROP_ALLVETUSERS_PREP, {data:_data})
  },

  /**
   * 获取全部人员数据
   * @param {Object} payload
   */

  async getNoPoolAndGroup({ commit }, payload) {
    let _data=  await Vue.wGet('/crm/custom_pool/user_tree.do', payload.param)
    commit(types.GROUP_COMPLEXDROP_NOPOLLANDGROUP_PREP, {data:_data})
  },

  /**
   * 获取全部人员数据
   * @param {Object} payload
   */

  async getGroupMembers({ commit }, payload) {
    let _data=  await Vue.wGet('/crm/custom_pool/member_tree.do', payload.param)
    commit(types.GROUP_COMPLEXDROP_GROUPMEMBERS_PREP, {data:_data})
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
