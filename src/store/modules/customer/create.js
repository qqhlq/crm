import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  base: {
    trade: {},
    form: {
      customName: '',
      productName: '',
      url: '',
      tradeId: '',
      contactName: '',
      phone: '',
      salesEmail: '',
      address: '',
      businessLicense: [],
      icpLicense: []
    },
    rules: {
      customName: [{
        required: true, message: '请填写公司名', trigger: 'blur'
      }],
      productName: [{
        required: true, message: '请填写产品名', trigger: 'blur'
      }],
      url: [{
        validator(rule, val, cb) {

          console.log(val)
          cb()

        }, trigger: 'blur'
      }]
    }
  }
}

let getters = {
  base: state => state.base
}

let mutations = {

  /**
   * 更改基础资质数据
   * @param {Object} payload 值参照 state.base
   */
  [types.CUSTOM_CREATE_BASE_FORM](state, payload) {
    for (let prop in payload) {
      state.base[prop] = payload[prop]
    }
  }
}

let actions = {

  /**
   * 获取 DSP 行业
   * @param {Object} payload 值参照 state.base
   */
  async getBaseTrade({ commit }, payload) {
    let data = await Vue.wGet('/select/listInnerTrades.do')
    commit(types.CUSTOM_CREATE_BASE_FORM, {
      trade: data.data
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
