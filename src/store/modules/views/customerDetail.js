import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  customerDetailData: {},
  dynamicTypesData: {},
  dynamicListData: {},
  delCustomdata: {},
  allotCustomdata: {},
  releaseFollowDynamicdata: {},
  updateCustomData: {},
  transferCustomData: {},
  returnCustomData: {},
  getCustomData: {}

}
let getters = {
  customerDetailData: state => state.customerDetailData,
  dynamicTypesData: state => state.dynamicTypesData,
  delCustomdata: state => state.delCustomdata,
  allotCustomdata: state => state.allotCustomdata,
  releaseFollowDynamicdata: state => state.releaseFollowDynamicdata,
  dynamicListData: state => state.dynamicListData,
  updateCustomData: state => state.updateCustomData,
  transferCustomData: state => state.transferCustomData,
  returnCustomData: state => state.returnCustomData,
  getCustomData: state => state.getCustomData

}
let mutations = {

  //获取分组列表返回数据
  [types.VIEWS_CUSTOMERDETAIL_GET_CUSTOMERDETAIL](state, param) {
    state.customerDetailData = param
  },

  //获取客户所有动态类型返回数据
  [types.VIEWS_CUSTOMERDETAIL_GET_DYNAMICOPTIONS](state, param) {
    state.dynamicTypesData = param
  },

  //获取删除客户返回数据
  [types.VIEWS_CUSTOMERDETAIL_DEL_CUSTOM](state, param) {
    state.delCustomdata = param
  },

  //获取分配客户返回数据
  [types.VIEWS_CUSTOMERDETAIL_ALLOT_CUSTOM](state, param) {
    state.allotCustomdata = param
  },

  //获取发布动态返回数据
  [types.VIEWS_CUSTOMERDETAIL_RELEASE_FOLLOWDYNAMIC](state, param) {
    state.releaseFollowDynamicdata = param
  },

  //获取用户动态列表返回数据
  [types.VIEWS_CUSTOMERDETAIL_GET_DYNAMICLIST](state, param) {
    state.dynamicListData = param
  },

  //获取修改客户返回数据
  [types.VIEWS_CUSTOMERDETAIL_GET_UPDATECUSTOML](state, param) {
    state.updateCustomData = param
  },

  //获取转移客户返回数据
  [types.VIEWS_CUSTOMERDETAIL_TRANSFER_CUSTOM](state, param) {
    state.transferCustomData = param
  },

  //获取领取客户返回数据
  [types.VIEWS_CUSTOMERDETAIL_GET_CUSTOM](state, param) {
    state.getCustomData = param
  },

  //获取退回客户返回数据
  [types.VIEWS_CUSTOMERDETAIL_RETURN_CUSTOM](state, param) {
    state.returnCustomData = param
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
   * 获取某客户详情信息
   * @param {Object} payload {
   * }
   */


  async getCustomerDetail({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CUSTOMERDETAIL_GET_CUSTOMERDETAIL, await Vue.wGet('/crm/custom/detail.do', param))
  },

  /**
   * 获取客户动态所有类型
   * @param {Object} payload {
   * }
   */

  async getDynamicOptions({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CUSTOMERDETAIL_GET_DYNAMICOPTIONS, await Vue.wGet('/crm/custom/update_type_option.do', param))
  },


  /**
   * 删除客户
   * @param {Object} payload {
   * }
   */

  async delCustom({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CUSTOMERDETAIL_DEL_CUSTOM, await Vue.wGet('/crm/custom/del.do', param))
  },

  /**
   * 分配客户
   * @param {Object} payload {
   * }
   */

  async allotCustom({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CUSTOMERDETAIL_ALLOT_CUSTOM, await Vue.wPost('/crm//custom/allocate.do', param))
  },

  /**
   * 发布动态
   * @param {Object} payload {
   * }
   */

  async releaseFollowDynamic({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CUSTOMERDETAIL_RELEASE_FOLLOWDYNAMIC, await Vue.wPost('/crm/custom/post_custom_news.do', param))
  },

  /**
   * 获取客户动态列表
   * @param {Object} payload {
   * }
   */

  async getDynamicList({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CUSTOMERDETAIL_GET_DYNAMICLIST, await Vue.wGet('/crm/custom/custom_news_list.do', param))
  },

  /**
   * 修改客户
   * @param {Object} payload {
   * }
   */

  async updateCustom({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CUSTOMERDETAIL_GET_UPDATECUSTOML, await Vue.wPost('/crm/custom/update.do', param))
  },

  /**
   * 转移客户
   * @param {Object} payload {
   * }
   */

  async transferCustom({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CUSTOMERDETAIL_TRANSFER_CUSTOM, await Vue.wPost('/crm/custom/transfer.do', param))
  },

  /**
   * 领取客户
   * @param {Object} payload {
   * }
   */

  async getCustom({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CUSTOMERDETAIL_GET_CUSTOM, await Vue.wPost('/crm/custom/draw.do', param))
  },

  /**
   * 退回客户
   * @param {Object} payload {
   * }
   */

  async returnCustom({ dispatch, commit }, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.VIEWS_CUSTOMERDETAIL_RETURN_CUSTOM, await Vue.wPost(' /crm/custom/reback.do', param))
  },


}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
