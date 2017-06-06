import * as types from '../../mutation-types'
import Vue from 'vue'

let state = {
  menusData: {}
}
let getters = {
  menusData: state => state.menusData,
  navContentUlInOutGetter: state => {
    // 隐藏所有二级菜单
    let navContentUlInOutGetter ={}
    for(var i in state.menusData.data.menus) {
      navContentUlInOutGetter[i] = true
    }
    return navContentUlInOutGetter
  }

}
let mutations = {


}
let actions = {

   /**
   * 获取导航栏内容
   * @param {Object} payload {
   * }
   */

  async getMenusList({ commit }, param) {
    state.menusData =  await Vue.wGet('/admin/user/list_menus.do', param)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
