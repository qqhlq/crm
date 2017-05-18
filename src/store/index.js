import Vue from 'vue'
import Vuex from 'vuex'
import state from './states'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import customerList from './modules/customer/list'
import customerCreate from './modules/customer/create'
import deliveryList from './modules/delivery/list'
import deliveryMonitor from './modules/delivery/monitor'
import deliveryTest from './modules/delivery/test'
import orderList from './modules/order/list'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    customerList,
    customerCreate,
    deliveryList,
    deliveryMonitor,
    deliveryTest,
    orderList
  },
  state,
  getters,
  mutations,
  actions
})
