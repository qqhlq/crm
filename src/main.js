import './assets/libs/font-awesome-4.7.0/css/font-awesome.min.css'
import './styles/index.scss'
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import App from './app'
import router from './router'
import store from './store'
import api from './plugins/api'
import formater from './plugins/formater'
import verifier from './plugins/verifier'
import utils from './plugins/utils'

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(api)
Vue.use(formater)
Vue.use(verifier)
Vue.use(utils)
Vue.use(WHeader)
Vue.use(WSidebar)
Vue.use(dialog.WDialogCustomer)
Vue.use(WNav)
Vue.use(WNavItem)
Vue.use(WTableDropdown)
Vue.use(WTableCaret)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
