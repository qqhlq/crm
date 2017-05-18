import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  baseInfo: {
    customName: '',
    productName: '',
    platformId: '1'
  },
  account: {
    weibo: {},
    xiaomi: {}
  },
  order: {
    weibo: {
      loading: false,
      queryForm: {
        export: false,
        page: 1,
        customId: 0,
        keyword: '',
        platformId: 1
      },
      table: [],
      count: 0
    },
    xiaomi: {
      loading: false,
      queryForm: {
        export: false,
        page: 1,
        customId: 0,
        keyword: '',
        platformId: 1
      },
      table: [],
      count: 0
    }
  }
}

let getters = {
  baseInfo: state => state.baseInfo,
  weiboAccount: state => state.account.weibo,
  weiboOrderLoading: state => state.order.weibo.loading,
  weiboOrderQueryForm: state => state.order.weibo.queryForm,
  weiboOrderTable: state => state.order.weibo.table,
  weiboOrderCount: state => state.order.weibo.count,
  xiaomiAccount: state => state.account.xiaomi,
  xiaomiOrderTable: state => state.order.xiaomi.table,
  xiaomiOrderCount: state => state.order.xiaomi.count,
  xiaomiOrderLoading: state => state.order.xiaomi.loading,
  xiaomiOrderQueryForm: state => state.order.xiaomi.queryForm
}

let mutations = {

  /**
   * 设置基本信息
   * @param {Object} payload {
   *  baseInfo: 基本信息
   * }
   */
  [types.DELIVERY_MONITOR_BASEINFO](state, payload) {
    for (let prop in payload) {
      state.baseInfo[prop] = payload[prop]
    }
  },

  /**
   * 设置账户信息
   * @param {Object} payload {
   *  account: 帐户信息,
   *  platformId: 平台ID
   * }
   */
  [types.DELIVERY_MONITOR_ACCOUNT](state, payload) {
    let platformName = ''
    switch (String(payload.platformId)) {
      case '1':
        platformName = 'weibo'
        break
      case '2':
        platformName = 'xiaomi'
        break
      default:
        break
    }
    state.account[platformName] = payload
  },

  /**
   * 设置订单信息
   * @param {Object} payload {
   *  order: 订单信息,
   *  platformId: 平台ID
   * }
   */
  [types.DELIVERY_MONITOR_ORDER](state, payload) {
    let platformName = ''
    switch (String(payload.platformId)) {
      case '1':
        platformName = 'weibo'
        break
      case '2':
        platformName = 'xiaomi'
        break
      default:
        break
    }
    for (let prop in payload) {
      state.order[platformName][prop] = payload[prop]
    }
  },

  /**
   * 更新本地存储的账户监控链接
   * @param {Object} payload {
   *  reportUrl: 平台监控链接
   *  platformId: 平台ID
   * }
   */
  [types.DELIVERY_MONITOR_UPDATE_ACCOUNT_MONITORURL](state, payload) {
    let platformName = ''
    switch (String(payload.platformId)) {
      case '1':
        platformName = 'weibo'
        break
      case '2':
        platformName = 'xiaomi'
        break
      default:
        break
    }
    state.account[platformName].clickUrl = payload.clickUrl
  },

  /**
   * 更新本地存储的订单监控链接
   * @param {Object} payload {
   *  monitorUrl: 账户监控链接
   *  orderId: 订单ID
   *  platformId: 平台ID
   * }
   */
  [types.DELIVERY_MONITOR_UPDATE_ORDER_MONITORURL](state, payload) {
    let platformName = ''
    switch (String(payload.platformId)) {
      case '1':
        platformName = 'weibo'
        break
      case '2':
        platformName = 'xiaomi'
        break
      default:
        break
    }
    for (let item of state.order[platformName].table) {
      if (String(item.orderId) === String(payload.orderId)) {
        for (let prop in payload) {
          item[prop] = payload[prop]
        }
      }
    }
  },

  /**
   * 更新订单搜索条件
   * @param {Object} payload {
   *  export: 是否导出
   *  page: 页数
   *  customId: 客户ID
   *  platformId: 平台ID
   * }
   */
  [types.DELIVERY_MONITOR_ORDER_QUERYFORM](state, payload) {
    for (let prop in payload) {
      state.order.weibo.queryForm[prop] = payload[prop]
    }
  }
}

let actions = {

  /**
   * 设置基本信息
   * @param {Object} payload {
   *  baseInfo: 基本信息
   * }
   */
  async setBaseInfo({ commit }, payload) {
    commit(types.DELIVERY_MONITOR_BASEINFO, payload)
  },

  /**
   * 设置账户信息
   * @param {Object} payload {
   *  account: 帐户信息,
   *  platformId: 平台ID
   * }
   */
  async setAccount({ commit }, payload) {
    commit(types.DELIVERY_MONITOR_ACCOUNT, payload)
  },

  /**
   * 获取账户信息
   * @param {Object} payload {
   *  customId: 客户ID,
   *  platformId: 平台ID
   * }
   */
  async getAccount({ dispatch, commit }, payload) {
    let data = await Vue.wGet('/manage/deal/get.do', payload)
    dispatch('setAccount', {
      clickUrl: data.data.clickUrl,
      reportType: data.data.reportType,
      platformId: payload.platformId
    })
    dispatch('setBaseInfo', {
      customName: data.data.customName,
      productName: data.data.productName
    })
  },

  /**
   * 设置订单信息
   * @param {Object} payload {
   *  order: 订单信息,
   *  platformId: 平台ID
   * }
   */
  async setOrder({ commit }, payload) {
    commit(types.DELIVERY_MONITOR_ORDER, payload)
  },

  /**
   * 获取订单信息
   * @param {Object} payload {
   *  page: 页数,
   *  customId: 客户ID,
   *  export: 是否导出,
   *  keyword: 搜索字段,
   *  platformId: 平台ID
   * }
   */
  async getOrder({ dispatch, commit, state }, payload) {
    commit(types.DELIVERY_MONITOR_ORDER_QUERYFORM, payload)
    let data = await Vue.wGet('/manage/deal/list.do', state.order.weibo.queryForm)
    dispatch('setOrder', {
      platformId: state.order.weibo.queryForm.platformId,
      table: data.data.records,
      count: data.data.count
    })
  },

  /**
   * 更新监控链接
   * @param {Object} payload {
   *  type: 账户级(1) / 订单级(2),
   *  monitorUrl: 订单级监控链接,
   *  reportUrl: 账户级监控链接,
   *  platformId: 平台ID
   * }
   */
  async updateMonitorUrl({ commit }, payload) {
    let url = String(payload.type) === '1' ?
      '/manage/deal/updateReportUrl.do' :
      '/manage/deal/updateMonitorUrl.do'

    let data = await Vue.wPost(url, payload)

    if (data.data === true) {
      if (String(payload.type) === '1') {
        commit(types.DELIVERY_MONITOR_UPDATE_ACCOUNT_MONITORURL, payload)
      } else {
        commit(types.DELIVERY_MONITOR_UPDATE_ORDER_MONITORURL, payload)
      }
    }

    return data
  },

  /**
   * 更改上报类型
   * @param {Object} payload {
   *  reportType: 上报类型
   *  customId: 客户ID
   *  platformId: 平台ID
   * }
   */
  async updateReportType({ commit }, payload) {
    return await Vue.wPost('/manage/deal/updateReportType.do', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
