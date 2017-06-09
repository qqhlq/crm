import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  tradeData: {},
  productlineData: {},
  provinceData: {},
  cityData: {},
  vaildNameData: {}
}
let getters = {

  tradeData: state => state.tradeData,
  productlineData: state => state.productlineData,
  provinceData: state => state.provinceData,
  cityData: state => state.cityData,
  vaildNameData:state => state.vaildNameData
}
let mutations = {

  //获取分组列表返回数据
  [types.GROUP_NEWCUSTOM_GET_TRADEOPTIONS](state, param) {
    state.tradeData = param
  },

  //获取分组列表返回数据
  [types.GROUP_NEWCUSTOM_GET_PRODUCTLINEOPTIONS](state, param) {
    state.productlineData = param
  },

  //获取分组列表返回数据
  [types.GROUP_NEWCUSTOM_GET_PROVINCEOPTIONS](state, param) {
    state.provinceData = param
  },

  //获取分组列表返回数据
  [types.GROUP_NEWCUSTOM_GET_CITYSOPTIONS](state, param) {
    state.cityData = param
  },

  //获取验证名称唯一性返回数据
  [types.GROUP_NEWCUSTOM_VAILD_NAME](state, param) {
    state.vaildNameData = param
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
    commit(types.GROUP_NEWCUSTOM_GET_TRADEOPTIONS, await Vue.wGet('/crm/custom/trade_option.do', param))
  },

  /**
   * 获取产品线
   * @param {Object} payload {
   * }
   */

  async getProductlineOptions({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.GROUP_NEWCUSTOM_GET_PRODUCTLINEOPTIONS, await Vue.wGet('/crm/custom/product_line_option.do', param))
  },

  /**
   * 获取省份
   * @param {Object} payload {
   * }
   */

  async getProvinceOptions({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.GROUP_NEWCUSTOM_GET_PROVINCEOPTIONS, await Vue.wGet('/crm/custom/province_option.do', param))
  },

  /**
   * 根据省份id获取城市
   * @param {Object} payload {
   * }
   */

  async getCitysOptions({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.GROUP_NEWCUSTOM_GET_CITYSOPTIONS, await Vue.wPost('/crm/custom/province_city_option.do', param))
  },

  /**
   * 验证名称唯一性
   * @param {Object} payload {
   * }
   */

  async vaildName({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.GROUP_NEWCUSTOM_VAILD_NAME, await Vue.wPost('/crm/custom/vaild_name.do', param))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
