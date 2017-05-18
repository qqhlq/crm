import * as types from '../../mutation-types'
import Vue from 'vue'
import moment from 'moment'

let state = {
  users: {},
  loading: false,
  customTableModal: {
    visiable: false,
    base: {
      balance: true,
      operators: false,
      posttime: false
    },
    platform: {
      weibo: true,
      xiaomi: true
    },
    dialog: {
      base: [
        '余额(元)'
      ],
      platform: [
        '微博广告',
        '小米广告'
      ]
    }
  },
  statusModal: {
    visiable: false,
    rules: {},
    dialog: {
      customId: '',
      platformId: '',
      status: '',
      reason: ''
    }
  },
  queryForm: {
    page: 1,
    export: false,
    platformId: '',
    userId: '',
    status: '',
    keyword: ''
  },
  table: [],
  count: 0
}

let getters = {
  users: state => state.users,
  loading: state => state.loading,
  customTableModal: state => state.customTableModal,
  statusModal: state => state.statusModal,
  queryForm: state => state.queryForm,
  table: state => state.table,
  count: state => state.count
}

let mutations = {

  /**
   * 设置更改运营人员
   * @param {Object} payload 运营人员对象列表
   */
  [types.CUSTOM_LIST_USER](state, payload) {
    state.users = payload
  },

  /**
   * 更改loading状态
   * @param {Object} payload {
   *  loading: true/false
   * }
   */
  [types.CUSTOM_LIST_LOADING](state, payload) {
    state.loading = payload.loading
  },

  /**
   * 根据传递进来的对象替换 queryFrom 字段值
   * @param {Object} payload 搜索对象，字段名跟 queryForm 一样
   */
  [types.CUSTOM_LIST_QUERYFORM](state, payload) {
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
  [types.CUSTOM_LIST_TABLE](state, payload) {
    state.table = payload.table
    state.count = payload.count
  },

  /**
   * 修改客户/WeAD状态
   * @param {Object} payload {
   *  platformId: 平台ID
   *  customId: 客户ID
   *  verifyStatus: 平台状态
   *  status: WeAD状态
   * }
   */
  [types.CUSTOM_LIST_UPDATE_TABLE_APTITUDE](state, payload) {
    let platformName = String(payload.platformId) === '1' ? 'waxPlaform' : 'maxPlaform'
    for (let item of state.table) {
      if (String(item.customId) === String(payload.customId)) {
        if (payload.verifyStatus) {
          item[platformName].verifyStatus = payload.verifyStatus
        }
        if (payload.status) {
          item[platformName].status = payload.status
        }
      }
    }
  },

  /**
   * 修改表格自定义列弹窗状态
   * @param {Object} payload {
   *  visiable: 是否显示弹窗,
   *  base: {
   *    balance: 余额,
   *    operators: 运营人员,
   *    posttime: 创建时间
   *  },
   *  platform: {
   *    weibo: 微博广告,
   *    xiaomi: 小米广告
   *  },
   *  dialog: {
   *    base: 弹窗基本信息数组
   *    platform: 平台资质数组
   *  }
   * }
   */
  [types.CUSTOM_LIST_CUSTOMTABLE_MODAL](state, payload) {
    for (let prop in payload) {
      state.customTableModal[prop] = payload[prop]
    }
  },

  /**
   * 修改WeAD弹窗状态
   * @param {Boolean} payload {
   *  visiable: 是否显示弹窗
   *  dialog: {
   *    customId: '',
   *    platformId: '',
   *    status: 状态
   *    reason: 原因
   *  }
   * }
   */
  [types.CUSTOM_LIST_STATUS_MODAL](state, payload) {
    for (let prop in payload) {
      state.statusModal[prop] = payload[prop]
    }
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
    commit(types.CUSTOM_LIST_LOADING, payload)
  },

  /**
   * 更新表单搜索条件
   * @param {Object} payload 搜索对象，字段名跟 queryForm 一样
   */
  async updateQueryForm({ commit }, payload) {
    commit(types.CUSTOM_LIST_QUERYFORM, payload)
  },

  /**
   * 获取订单数据
   */
  async getList({ dispatch, commit, state }) {
    dispatch('updateLoading', {
      loading: true
    })

    let data = await Vue.wGet('/manage/custom/list.do', state.queryForm)

    for (let item of data.data.records) {
      if (item.operators === '') {
        item.operators = '-'
      }
      if (item.posttime === null) {
        item.posttime = '-'
      } else {
        item.posttime = moment(item.posttime).format('YYYY-MM-DD HH:mm')
      }

      item.balance = Vue.wFormatDeci((item.balance / 100).toFixed(2))
    }

    commit(types.CUSTOM_LIST_TABLE, {
      table: data.data.records,
      count: data.data.count
    })

    dispatch('updateLoading', {
      loading: false
    })
  },

  /**
   * 获取运营人员
   */
  async getUser({ commit }) {
    let data = await Vue.wGet('/select/listUsers.do')
    commit(types.CUSTOM_LIST_USER, data.data)
  },

  /**
   * 送审客户
   * @param { Object } payload {
   *  customId: 客户ID
   *  platformId: 平台ID
   *  verifyStatus: 平台状态
   * }
   */
  async platformVerify({ commit }, payload) {
    let data = await Vue.wPost('/manage/custom/verify.do', payload)
    if (data.data === true) {
      commit(types.CUSTOM_LIST_UPDATE_TABLE_APTITUDE, payload)
    }
    return data
  },

  /**
   * 更改自定义表格弹窗状态
   * @param {Object} payload  {
   *  visiable: 是否显示弹窗,
   *  base: {
   *    balance: 余额,
   *    operators: 运营人员,
   *    posttime: 创建时间
   *  },
   *  platform: {
   *    weibo: 微博广告,
   *    xiaomi: 小米广告
   *  },
   *  dialog: {
   *    base: 弹窗基本信息数组
   *    platform: 平台资质数组
   *  }
   * }
   */
  async updateCustomTableModal({ commit }, payload) {
    commit(types.CUSTOM_LIST_CUSTOMTABLE_MODAL, payload)
  },

  /**
   * 更新WeAD状态弹窗
   * @param {Object} payload {
   *  visiable: 是否显示弹窗
   *  dialog: {
   *    customId: '',
   *    platformId: '',
   *    status: 状态
   *    reason: 原因
   *  }
   * }
   */
  async updateStatusModal({ commit }, payload) {
    commit(types.CUSTOM_LIST_STATUS_MODAL, payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
