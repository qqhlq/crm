import Vue from 'vue'
import Vuex from 'vuex'
import state from './states'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import openList from './modules/open/list'
import privateList from './modules/private/list'
import groupHeader from './modules/group/header'
import groupcomplexDrop from './modules/group/complexDrop'
import newCustom from './modules/group/newCustom'
import customerDetail from './modules/views/customerDetail'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    openList,
    privateList,
    groupHeader,
    groupcomplexDrop,
    customerDetail,
    newCustom
  },
  state,
  getters,
  mutations,
  actions
})
