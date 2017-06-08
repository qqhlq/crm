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

  //获取分组列表返回数据
  [types.VIEWS_CRMGROUP_GET_GROUPLIST](state, param) {
    state.groupListData = param
  },


  //获取当前分组管理员返回数据
  [types.VIEWS_CRMGROUP_GET_GROUPADMINS](state, param) {
    state.groupAdminsData = param
  },

  //获取当前分组成员返回数据
  [types.VIEWS_CRMGROUP_GET_GROUPMEMBERS](state, param) {
    state.groupMembersData = param
  },


  //获取新建分组返回数据
  [types.VIEWS_CRMGROUP_ADD_NEWGROUP](state, param) {
    state.addnewGroupData = param
  },


  //获取修改分组管理员返回数据
  [types.VIEWS_CRMGROUP_CHANGE_ADMINS](state, param) {
    state.changeGroupAdminsData = param
  },


  //获取修改分组成员返回数据
  [types.VIEWS_CRMGROUP_CHANGE_MEMBERS](state, param) {
    state.changeGroupMembersData = param
  },


  //获取修改分组名返回数据
  [types.VIEWS_CRMGROUP_CHANGE_NAME](state, param) {
    state.changeGroupNameData = param
  },

  //获取删除分组返回数据
  [types.VIEWS_CRMGROUP_DEL_GROUP](state, param) {
    state.delGroupData = param
  },
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
    commit(types.VIEWS_CRMGROUP_GET_GROUPLIST, await Vue.wGet('/crm/custom_pool/list.do', param))
  },

  /**
   * 获取分组管理员
   * @param {Object} payload {
   * }
   */

  async getGroupAdmins({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CRMGROUP_GET_GROUPADMINS, await Vue.wGet('/crm/custom_pool/list_manager.do', param))
  },

  /**
   * 获取分组成员
   * @param {Object} payload {
   * }
   */

  async getGroupMembers({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CRMGROUP_GET_GROUPMEMBERS, await Vue.wGet('/crm/custom_pool/list_member.do', param))
  },

  /**
   * 新建分组
   * @param {Object} payload {
   * }
   */

  async addNewGroup({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CRMGROUP_ADD_NEWGROUP, await Vue.wGet('/crm/custom_pool/add.do', param))
  },

  /**
   * 修改分组管理员
   * @param {Object} payload {
   * }
   */

  async changeGroupAdmins({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CRMGROUP_CHANGE_ADMINS, await Vue.wGet('/crm/custom_pool/update_manager.do', param))
  },

  /**
   * 修改分组成员
   * @param {Object} payload {
   * }
   */

  async changeGroupMembers({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CRMGROUP_CHANGE_MEMBERS, await Vue.wGet('/crm/custom_pool/update_member.do', param))
  },

  /**
   * 修改分组名
   * @param {Object} payload {
   * }
   */

  async changeGroupName({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CRMGROUP_CHANGE_NAME, await Vue.wGet('/crm/custom_pool/update_name.do', param))
  },

  /**
   * 删除分组
   * @param {Object} payload {
   * }
   */

  async delGroup({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CRMGROUP_DEL_GROUP, await Vue.wGet('/crm/custom_pool/delete.do', param))
  },


}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
