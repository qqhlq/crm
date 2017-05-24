import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  authority: 0,
  tableType: 0,
  tableState: 0,
  tableOptions: [
    {
      value: 0,
      label: '全部'
    },
    {
      value: 1,
      label: '销售组'
    },
    {
      value: 2,
      label: '渠道组'
    },
    {
      value: 3,
      label: '商务组'
    }
  ],
  tableValue: 0

}

let getters = {
  authority: state => state.authority,
  tableType: state => state.tableType,
  tableState: state => state.tableState,
  tableOptions: state => state.tableOptions,
  tableValue: state => state.tableValue,
}

let mutations = {

  /**
   * 设置更改表格类型 0未公有池 1为私有池
   * @param {Object} payload 表格类型
   */
  [types.OPEN_TABLE_LIST_SELECT_CHANGE](state, payload) {
    state.tableValue = payload
  }
}

let actions = {

  /**
   * 更新分组下拉框状态
   * @param {Object} payload {
   * }
   */
  async tableSelectChange({ commit }, payload) {
    commit(types.OPEN_TABLE_LIST_SELECT_CHANGE, payload)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
