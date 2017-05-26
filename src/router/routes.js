import Group from 'views/group'
import Indexv from 'views/indexv'
import BProcessBar from 'components/processBar'
import BModaler from 'components/modaler'
export default [
  {
    path: '/group',
    name: 'Group',
    component: Group
  },
  {
    path: '/index',
    name: 'Indexv',
    component: Indexv
  },
  {
    path: '/processbar',
    name: 'BProcessBar',
    component: BProcessBar
  },
  {
    path: '/modaler',
    name: 'BModaler',
    component: BModaler
  }
]
