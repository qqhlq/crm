import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  report: {
    form: {
      customName: '',
      productName: '',
      deviceNo: '',
      os: '0',
      url: '',
      customId: ''
    }
  },
  list: {
    form: {
      page: 1,
      customId: '',
      url: '',
      export: false
    },
    loading: false,
    table: [],
    count: 0
  }
}

let getters = {
  reportForm: state => state.report.form,
  listForm: state => state.list.form,
  listLoading: state => state.list.loading,
  listTable: state => state.list.table,
  listCount: state => state.list.count
}

let mutations = {

  /**
   * 设置表单信息
   * @param {Object} payload {
   *  deviceNo: idfa/imei 码
   *  os: 系统
   *  url: 监控链接
   *  customId: 客户ID
   * }
   */
  [types.DELIVERY_TEST_REPORT_FORM](state, payload) {
    for (let prop in payload) {
      state.report.form[prop] = payload[prop]
    }
  },

  /**
   * 设置loading
   * @param {Object} payload {
   *  loading: true/false
   * }
   */
  [types.DELIVERY_TEST_LIST_LOADING](state, payload) {
    state.list.loading = payload.loading
  },

  /**
   * 设置表格
   * @param {Object} payload {
   *  table: 表格数据
   *  count: 记录数
   * }
   */
  [types.DELIVERY_TEST_LIST_TABLE](state, payload) {
    state.list.table = payload.table
    state.list.count = payload.count
  },

  /**
   * 设置测试列表查询条件
   * @param {Object} payload {
   *  page: 分页,
   *  customId: 客户ID
   *  url: 监控链接
   *  export: 是否导出
   * }
   */
  [types.DELIVERY_TEST_LIST_FORM](state, payload) {
    for (let prop in payload) {
      state.list.form[prop] = payload[prop]
    }
  }
}

let actions = {

  /**
   * 更新表单字段值
   * @param {Object} payload {
   *  customName: 客户名称
   *  productName: 产品名称
   *  deviceNo: idfa/imei 码
   *  os: 系统
   *  url: 监控链接
   *  customId: 客户ID
   * }
   */
  async updateForm({ commit }, payload) {
    commit(types.DELIVERY_TEST_REPORT_FORM, payload)
  },

  /**
   * 添加测试记录
   * @param {Object} payload {
   *  deviceNo: idfa/imei 码
   *  os: 系统
   *  url: 监控链接
   *  customId: 客户ID
   * }
   * @returns {Object} 服务器返回的数据
   */
  async addTest({ commit }, payload) {
    return await Vue.wPost('/manage/deal/callbackTest.do', payload)
  },

  /**
   * 设置查询参数
   * @param {Object} payload {
   *  page: 当前页数
   *  customId: 客户ID
   *  url: 监控链接
   *  export: 导出
   * }
   */
  async setListQuery({ commit }, payload) {
    commit(types.DELIVERY_TEST_LIST_FORM, payload)
  },

  /**
   * 设置loading
   * @param {Object} payload {
   *  loading: true/false
   * }
   */
  async updateLoading({ commit }, payload) {
    commit(types.DELIVERY_TEST_LIST_LOADING, payload)
  },

  /**
   * 获取测试列表
   */
  async getList({ dispatch, commit, state }) {
    dispatch('updateLoading', {
      loading: true
    })
    let data = await Vue.wGet('/manage/deal/listCallback.do', state.list.form)
    commit(types.DELIVERY_TEST_LIST_TABLE, {
      table: data.data.records,
      count: data.data.count
    })
    dispatch('updateLoading', {
      loading: false
    })
  },

  /**
   * 删除测试记录
   * @param {Object} payload {
   *  id: 记录ID
   * }
   * @returns {Object} 返回服务器返回的数据
   */
  async removeListItem({ dispatch, commit }, payload) {
    let data = await Vue.wPost('/manage/deal/deleteCallback.do', payload)
    if (data.data === true) {
      dispatch('getList')
    }
    return data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
