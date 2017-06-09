import * as types from './mutation-types'

export default {

  /**
   * 开关站内信， true：是，false：否
   * @param {Object} payload 表格类型
   */
  [types.STATIONMAIL_IS_OUT](state, payload) {
    state.isStationMailOut = payload.isStationMailOut
  },

  [types.HEADER_MEANSDATA](state, payload) {
    state.menusData = payload
    let role = payload.data.crmRole
    state.role =  role
  },

  // 获取验证客户上限返回数据
  [types.CHECK_CUSTOMS_LIMIT](state, payload) {
    state.checkCustomsLimitData = payload
  },
}
