import * as types from './mutation-types'

export default {

  /**
   * 开关站内信， true：是，false：否
   * @param {Object} payload 表格类型
   */
  [types.IS_STATIONMAIL_OUT](state, payload) {
    state.isStationMailOut = payload.isStationMailOut
  },
}
