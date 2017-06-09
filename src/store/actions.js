import * as types from './mutation-types'
import Vue from 'vue'

export default {


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
   * 开关站内信
   * @param {Object} payload {
   * }
   */
  async switchStationMail({ commit, state }, payload) {
    commit(types.STATIONMAIL_IS_OUT, {'isStationMailOut': !(state.isStationMailOut)})
  },

  /**
   * 打开站内信
   * @param {Object} payload {
   * }
   */
  async stationMailOut({ commit, state }, payload) {
    commit(types.STATIONMAIL_IS_OUT, {'isStationMailOut': false})
  },

  /**
   * 关闭站内信
   * @param {Object} payload {
   * }
   */
  async stationMailIn({ commit, state}, ) {
    commit(types.STATIONMAIL_IS_OUT, {'isStationMailOut': true})
  },

  /**
   * 点击某个标签外任意地方实现某行为
   * @param {Object} payload - 参数
   * @param {el} payload.el - 屏蔽的标签
   * @param {el} payload.adEl - 添加事件标签
   * @param {function} payload.behavior - 行为
   */
  on({ commit }, payload) {
    if(payload.adEl.addEventListener) {
      payload.adEl.addEventListener('click', (e) => {
        if (!payload.el.contains(e.target)){
          payload.behavior()
        }
      }, false)
    } else {
      attachEvent('onclick', (e) => {
        if (!payload.el.contains(e.target)){
          payload.behavior()
        }
      })
    }
  },


  /**
   * 获取导航栏内容
   * @param {Object} payload {
   * }
   */

  async getMenusList({ commit, state}, param) {
    if(!state.menusData.data) {
      let data =  await Vue.wGet('/admin/user/list_menus.do', param)
      commit(types.HEADER_MEANSDATA, data)
    }
  },

  // 退出登录
  async logout({commit, state}) {
    let data = await Vue.wGet('/auth/logout.do')
    if(data.data !== false) {
      location.href = '/boss/user/login'
    }
  },

  // 更改密码
  async changePassword({ commit, state}) {
    location.href = '/boss/user/change-pwd?username=' + encodeURIComponent(localStorage.getItem('email'))
  },

  // 验证客户上限
  async checkCustomLimit({dispatch, commit}, payload) {
    let param = await dispatch('isParamUndefind', payload)
    commit(types.CHECK_CUSTOMS_LIMIT, await Vue.wPost('/crm/custom/vaild_count_limit.do', param))
  }
}
