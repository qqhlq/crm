import './assets/libs/font-awesome-4.7.0/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'
import './styles/index.scss'
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import lodash from 'lodash'
import App from './app'
import router from './router'
import store from './store'
import api from './plugins/api'
import formater from './plugins/formater'
import verifier from './plugins/verifier'
import BHeader from './components/header'
import BStationMail from './components/stationMail'
import BTreeDrop from './components/treeDrop'
import BProcessBar from './components/processBar'
import BComplexDrop from './components/complexDrop'
import BModaler from './components/modaler'
import BLoadSelect from './components/loadSelect'
import BDatePicker from './components/datePicker'
import BCrumbs from './components/crumbs'

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(lodash)
Vue.use(api)
Vue.use(formater)
Vue.use(verifier)
Vue.use(BHeader)
Vue.use(BStationMail)
Vue.use(BTreeDrop)
Vue.use(BProcessBar)
Vue.use(BComplexDrop)
Vue.use(BModaler)
Vue.use(BLoadSelect)
Vue.use(BDatePicker)
Vue.use(BCrumbs)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
