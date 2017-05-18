import * as types from '../../mutation-types'
import Vue from 'vue'
import moment from 'moment'

let state = {
  loading: false,
  queryForm: {
    page: 1,
    startDate: '',
    endDate: '',
    platformId: '',
    bidModeId: '',
    rtconsumeStatus: '',
    status: '',
    consumeSort: '',
    orderKeywork: '',
    customKeywork: ''
  },
  statusOptions: [
    {
      value: '',
      name: '全部'
    },
    {
      value: '0',
      name: '未送审'
    },
    {
      value: '1',
      name: '审核中'
    },
    {
      value: '2',
      name: '审核不通过'
    },
    {
      value: '3',
      name: '启用'
    },
    {
      value: '4',
      name: '停用'
    },
    {
      value: '5',
      name: '投放结束'
    },
    {
      value: '-1',
      name: '创建未完成'
    }
  ],
  table: [],
  count: 0
}

let getters = {
  loading: state => state.loading,
  queryForm: state => state.queryForm,
  table: state => state.table,
  count: state => state.count,
  statusOptions: state => state.statusOptions
}

let mutations = {

  /**
   * 设置loading
   * @param {Object} payload {
   *  loading: true/false
   * }
   */
  [types.ORDER_LIST_LOADING](state, payload) {
    state.loading = payload.loading
  },

  /**
   * 设置表单搜索条件
   * @param {Object} payload {
   *  page: 页码
   *  date: 日期
   *  startDate: 开始日期
   *  endDate: 结束日期
   *  bidModeId: 出价模式
   *  orderKeywork: 订单名称
   *  customKeywork: 客户名称
   *  status: 订单状态
   *  consumeSort: 消耗排序
   * }
   */
  [types.ORDER_LIST_QUERYFORM](state, payload) {
    for (let prop in payload) {
      state.queryForm[prop] = payload[prop]
    }
  },

  /**
   * 设置表格信息
   * @param {Object} payload {
   *  table: 服务器返回的表格数据
   *  count: 表格记录数
   * }
   */
  [types.ORDER_LIST_TABLE](state, payload) {
    state.table = payload.table
    state.count = payload.count
  }
}

let actions = {

  /**
   * 更新loading状态
   * @param {Object} payload {
   *  loading: true/false
   * }
   */
  async updateLoading({ commit }, payload) {
    commit(types.ORDER_LIST_LOADING, payload)
  },

  /**
   * 更新表单搜索条件
   * @param {Object} payload {
   *  page: 页码
   *  date: 日期
   *  startDate: 开始日期
   *  endDate: 结束日期
   *  bidModeId: 出价模式
   *  orderKeywork: 订单名称
   *  customKeywork: 客户名称
   *  status: 订单状态
   *  consumeSort: 消耗排序
   * }
   */
  async updateQueryForm({ commit }, payload) {
    commit(types.ORDER_LIST_QUERYFORM, payload)
  },


  /**
   * 获取订单数据
   */
  async getList({ dispatch, commit, state }) {
    dispatch('updateLoading', {
      loading: true
    })

    let data = await Vue.wGet('/manage/order/get.do', state.queryForm)

    for (let item of data.data.records) {
      switch (String(item.status)) {
        case '':
          item.status = '全部'
          break
        case '0':
          item.status = '未送审'
          break
        case '1':
          item.status = '审核中'
          break
        case '2':
          item.status = '审核不通过'
          break
        case '3':
          item.status = '启用'
          break
        case '4':
          item.status = '停用'
          break
        case '5':
          item.status = '投放结束'
          break
        default:
          item.status = '创建未完成'
          break
      }

      if (item.lastBidTime === null) {
        item.lastBidTime = '-'
      } else {
        item.lastBidTime = moment(item.lastBidTime).format('YYYY-MM-DD HH:mm')
      }
    }

    commit(types.ORDER_LIST_TABLE, {
      table: data.data.records,
      count: data.data.count
    })

    dispatch('updateLoading', {
      loading: false
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
