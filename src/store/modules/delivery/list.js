import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  loading: false,
  queryForm: {
    export: false,
    startDate: '',
    endDate: '',
    date: '',
    page: 1
  },
  pickerOptions: {
    shortcuts: [{
      text: '昨天',
      onClick(picker) {
        let end = new Date()
        let start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '今天',
      onClick(picker) {
        let end = new Date()
        let start = new Date()
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近7天',
      onClick(picker) {
        let end = new Date()
        let start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    }]
  },
  table: [],
  tableCount: 0
}

let getters = {
  loading: state => state.loading,
  queryForm: state => state.queryForm,
  pickerOptions: state => state.pickerOptions,
  table: state => state.table,
  tableCount: state => state.tableCount
}

let mutations = {

  /**
   * 更改loading状态
   * @param {Object} payload {
   *  loading: true/false
   * }
   */
  [types.DELIVERY_LIST_LOADING](state, payload) {
    state.loading = payload.loading
  },

  /**
   * 根据传递进来的对象替换 queryFrom 字段值
   * @param {Object} payload 搜索对象，字段名跟 queryForm 一样
   */
  [types.DELIVERY_LIST_QUERYFORM](state, payload) {
    for (let item in payload) {
      state.queryForm[item] = payload[item]
    }
  },

  /**
   * 更改表格数据和数据总数
   * @param {Object} payload {
   *  data: 日期,
   *  count: 纪录总数
   * }
   */
  [types.DELIVERY_LIST_TABLE](state, payload) {
    state.table = payload.data
    state.tableCount = payload.count
  }
}

let actions = {

  /**
   * 更改搜索条件
   * @param {payload} 搜索条件
   */
  async changeSearchQuery({ commit }, payload) {
    commit(types.DELIVERY_LIST_QUERYFORM, payload)
  },

  /**
   * 获取表格数据
   * @param {Object} payload 搜索对象
   */
  async getTable({ commit }, payload) {
    let data = await Vue.wGet('/manage/deal/listAllCustoms.do', payload)

    for (let item of data.data.records) {
      item.balance = Vue.wFormatDeci((item.balance / 100).toFixed(2))
      item.quota = Vue.wFormatDeci((item.quota / 100).toFixed(2))
      item.rtConsume = Vue.wFormatDeci((item.rtConsume / 100).toFixed(2))
      item.consume = Vue.wFormatDeci((item.consume / 100).toFixed(2))
    }

    commit(types.DELIVERY_LIST_TABLE, {
      data: data.data.records,
      count: data.data.count
    })

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
