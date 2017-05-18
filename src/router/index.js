import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from '../store'
import routes from './routes'

let router = new Router({
  mode: 'history',
  routes
})

Vue.use(Router)
sync(store, router)

router.beforeEach((to, from, next) => {
  let toPaths = to.path.split('/')
  let active = ''
  let system = toPaths[1]
  let menus = store.getters.menus
  let path2 = toPaths[2]
  let path3 = toPaths[3]

  active = menus.indexOf(`${path2}/${path3}`) !== -1 ?
    `${path2}/${path3}` :
    path2

  if (typeof active === 'undefined') {
    active = menus[0]
  }

  store.dispatch('changeActiveMenu', { active })
  next()
})

export default router
