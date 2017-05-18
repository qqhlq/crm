import * as types from './mutation-types'
import Vue from 'vue'

export default {

  /**
   * 开启关闭侧边栏
   */
  toggleSidebar({ commit }) {
    commit(types.TOGGLE_SIDEBAR)
  },

  /**
   * 更改激活菜单项
   * @param {Object} payload { active: 激活菜单项 }
   */
  changeActiveMenu({ commit }, payload) {
    commit(types.CHANGE_ACTIVE_MENU, payload)
  },

  /**
   * 监听屏幕变动，记录屏幕宽度
   * @param {Object} payload
   */
  watchScreenWidth({ commit }) {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    commit(types.SCREEN_WIDTH, { screenWidth })
    window.addEventListener('resize', () => {
      let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      commit(types.SCREEN_WIDTH, { screenWidth })
    }, true)
  }
}
