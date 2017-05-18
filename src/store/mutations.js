import * as types from './mutation-types'

export default {
  [types.TOGGLE_SIDEBAR](state) {
    state.sidebar = state.sidebar === 0 ? 1 : 0
  },
  [types.CHANGE_ACTIVE_MENU](state, payload) {
    state.activeMenu = payload.active
  },
  [types.SCREEN_WIDTH](state, payload) {
    state.screenWidth = payload.screenWidth
  }
}
