import Group from 'views/group'
import Indexv from 'views/indexv'
import Open from 'views/open'
import customerDetail from 'views/customerDetail'
import BProcessBar from 'components/processBar'
import BModaler from 'components/modaler'

export default [
  {
    path: '/group',
    name: 'Group',
    component: Group
  },
  {
    path: '/open',
    name: 'Open',
    component: Open
  },
  {
    path: '/processbar',
    name: 'BProcessBar',
    component: BProcessBar
  },
  {
    path: '/customerDetail',
    name: 'customerDetail',
    component: customerDetail
  }
]
