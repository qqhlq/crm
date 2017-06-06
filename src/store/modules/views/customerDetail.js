import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  customerDetailData: {},
  dynamicTypesData: {},
  dynamicListData: {},
  delCustomdata: {},
  allotCustomdata: {},
  releaseFollowDynamicdata: {},
  updateCustomData: {}

}
let getters = {
  customerDetailData: state => state.customerDetailData,
  dynamicTypesData: state => state.dynamicTypesData,
  delCustomdata: state => state.delCustomdata,
  allotCustomdata: state => state.allotCustomdata,
  releaseFollowDynamicdata: state => state.releaseFollowDynamicdata,
  dynamicListData: state => state.dynamicListData,
  updateCustomData: state => state.updateCustomData
}
let mutations = {

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
   * 获取某客户详情信息
   * @param {Object} payload {
   * }
   */


  async getCustomerDetail({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.customerDetailData =  await Vue.wGet('/crm/custom/detail.do', param)
  },

  /**
   * 获取客户动态所有类型
   * @param {Object} payload {
   * }
   */

  async getDynamicOptions({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.dynamicTypesData =  await Vue.wGet('/crm/custom/update_type_option.do', param)
  },


  /**
   * 删除客户
   * @param {Object} payload {
   * }
   */

  async delCustom({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.delCustomdata = await Vue.wGet('/crm/custom/del.do', param)
  },

  /**
   * 分配客户
   * @param {Object} payload {
   * }
   */

  async allotCustom({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.allotCustomdata = await Vue.wPost('/crm//custom/allocate.do', param)
  },

  /**
   * 发布动态
   * @param {Object} payload {
   * }
   */

  async releaseFollowDynamic({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.releaseFollowDynamicdata = await Vue.wPost('/crm/custom/post_custom_news.do', param)
  },

  /**
   * 获取用户动态列表
   * @param {Object} payload {
   * }
   */

  async getDynamicList({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.dynamicListData = await Vue.wGet('/crm/custom/custom_news_list.do', param)
  },

  /**
   * 修改客户
   * @param {Object} payload {
   * }
   */

  async updateCustom({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    state.updateCustom =  await Vue.wPost('/crm/custom/update.do', param)
  },


}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
