import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  vetUsers: []
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
    let _data = payload.data
    let _records = payload.data.data.records
    // let _checkedNoChanged = payload.checkedNoChanged
    // let _checkedCanChanged = payload.checkedCanChanged

    // for(let i=0; i<_checkedNoChanged.length; i++) {
    //   // _records = addCheckedNoChanged(_records, checkedNoChanged[i], false)
    //   // _records = addCheckedCanChanged(_records, checkedNoChanged[i], false)
    // }
    // console.log(_records[0].name)

    state.vetUsers = _records


  },
}
let actions = {

  /**
   * 获取人员数据
   * @param {Object} payload {
   * }
   */

  async getVetusers({ commit }, payload) {
    let _data=  await Vue.wGet('/admin/workflow/vet_users.do', payload.param)
    // let _checkedNoChanged = payload.checkedNoChanged ? payload.checkedNoChanged : []
    // let _checkedCanChanged = payload.checkedCanChanged ? payload.checkedCanChanged: []
    commit(types.GROUP_COMPLEXDROP_DATA_PREP, {data:_data})
    // , checkedNoChanged: _checkedNoChanged, checkedCanChanged: _checkedCanChanged
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
