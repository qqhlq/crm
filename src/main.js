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
import BTreeDrop from './components/treeDrop'
import BTable from './components/table'
import BLoadSelect from './components/loadSelect'
import BDatePicker from './components/datePicker'

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(lodash)
Vue.use(api)
Vue.use(formater)
Vue.use(verifier)
Vue.use(BHeader)
Vue.use(BTreeDrop)
Vue.use(BTable)
Vue.use(BLoadSelect)
Vue.use(BDatePicker)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
