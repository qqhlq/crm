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


  // 获取待办列表
  [types.STATIONMAIL_GET_BACKLOG](state, payload) {
    state.stationmailGetBlacklogData = payload
  },


  // 获取已读提醒列表
  [types.STATIONMAIL_GET_LISTREAD](state, payload) {
    state.stationmailGetRemindData = payload
  },

  // 获取未读提醒列表
  [types.STATIONMAIL_GET_REMIND](state, payload) {
    state.stationmailGetListreadData = payload
  },

  // 删除提醒
  [types.STATIONMAIL_DEL_REMIND](state, payload) {
    state.stationmailDelRemindData = payload
  },

  // 标注已读
  [types.STATIONMAIL_READ_REMIND](state, payload) {
    state.stationmailReadRemindData = payload
  },
}
