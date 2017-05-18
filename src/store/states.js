export default {
  sidebar: 0, // 侧边栏开启关闭状态，0:关闭，1:开启
  menus: [ // 所有菜单
    'overview',
    'customer',
    'delivery',
    'order',
    'finance',
    'auth',
    'message',
    'log',
    'feedback'
  ],
  activeMenu: '', // 当前激活的菜单
  platforms: { // 系统中所有的广告平台
    1: '微博广告',
    2: '小米广告'
  },
  screenWidth: 0 // 当前屏幕宽度
}
