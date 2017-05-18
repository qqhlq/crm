import WNav from './nav'
import WNavItem from './nav-item'

WNav.install = Vue => {
  Vue.component(WNav.name, WNav)
}
WNavItem.install = Vue => {
  Vue.component(WNavItem.name, WNavItem)
}

export { WNav, WNavItem }
