import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  tradeData: {},
  productlineData: {},
  provinceData: {},
  cityData: {},
  addNewCustomData: {},
  updateCustomData: {}
}
let getters = {

  tradeData: state => state.tradeData,
  productlineData: state => state.productlineData,
  provinceData: state => state.provinceData,
  cityData: state => state.cityData,
  addNewCustomData: state => state.addNewCustomData,
}
let mutations = {

  /**
   * 处理人员数据（添加已选和默选）
   * @param {Object} payload {
   * }
   */

  [types.GROUP_COMPLEXDROP_DATA_PREP](state, payload) {
    state.vetUsers = payload.data.data.records
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
   * 获取行业
   * @param {Object} payload {
   * }
   */

  async getTradeOptions({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.tradeData =  await Vue.wGet(' /crm/custom/trade_option.do', param)
  },

  /**
   * 获取产品线
   * @param {Object} payload {
   * }
   */

  async getProductlineOptions({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.productlineData =  await Vue.wGet('/crm/custom/product_line_option.do', param)
  },

  /**
   * 获取省份
   * @param {Object} payload {
   * }
   */

  async getProvinceOptions({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.provinceData =  await Vue.wGet('/crm/custom/province_option.do', param)
  },

  /**
   * 根据省份id获取城市
   * @param {Object} payload {
   * }
   */

  async getCitysOptions({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.cityData =  await Vue.wPost('/crm/custom/province_city_option.do', param)
  },

  /**
   * 新建客户
   * @param {Object} payload {
   * }
   */

  async addNewCustom({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.addNewCustomData =  await Vue.wPost('/crm/custom/add.do', param)
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
