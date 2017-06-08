import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  groupListData: {},
  groupAdminsData: {},
  groupMembersData: {},
  addnewGroupData: {},
  changeGroupAdminsData: {},
  changeGroupMembersData: {},
  changeGroupNameData: {},
  delGroupData: {},

}
let getters = {
  groupListData: state => state.groupListData,
  groupAdminsData: state => state.groupAdminsData,
  groupMembersData: state => state.groupMembersData,
  addnewGroupData: state => state.addnewGroupData,
  changeGroupAdminsData: state => state.changeGroupAdminsData,
  changeGroupMembersData: state => state.changeGroupMembersData,
  changeGroupNameData: state => state.changeGroupNameData,
  delGroupData: state => state.delGroupData,
}
let mutations = {

}
let actions = {

  /**
   * 判断参数是否为空
   * @param {Object} payload
   */

  async isParamUndefind({ dispatch, commit }, payload) {
    let param = {}
    if(payload) {
      if(payload.param) {
        param = payload.param
      }
    }
    return param
  },

  /**
   * 获取分组列表
   * @param {Object} payload {
   * }
   */

  async getGroupList({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.groupListData =  await Vue.wGet('/crm/custom_pool/list.do', param)
  },

  /**
   * 获取分组管理员
   * @param {Object} payload {
   * }
   */

  async getGroupAdmins({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.groupAdminsData =  await Vue.wGet('/crm/custom_pool/list_manager.do', param)
  },

  /**
   * 获取分组管理员
   * @param {Object} payload {
   * }
   */

  async getGroupMembers({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.groupMembersData =  await Vue.wGet('/crm/custom_pool/list_member.do', param)
  },

  /**
   * 新建分组
   * @param {Object} payload {
   * }
   */

  async addNewGroup({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.addnewGroupData =  await Vue.wGet('/crm/custom_pool/add.do', param)
  },

  /**
   * 修改分组管理员
   * @param {Object} payload {
   * }
   */

  async changeGroupAdmins({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.changeGroupAdminsData =  await Vue.wGet('/crm/custom_pool/update_manager.do', param)
  },

  /**
   * 修改分组成员
   * @param {Object} payload {
   * }
   */

  async changeGroupMembers({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.changeGroupMembersData =  await Vue.wGet('/crm/custom_pool/update_member.do', param)
  },

  /**
   * 修改分组成员
   * @param {Object} payload {
   * }
   */

  async changeGroupName({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.changeGroupNameData =  await Vue.wGet('/crm/custom_pool/update_name.do', param)
  },

  /**
   * 删除分组
   * @param {Object} payload {
   * }
   */

  async delGroup({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.delGroupData =  await Vue.wGet('/crm/custom_pool/delete.do', param)
  },


}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
