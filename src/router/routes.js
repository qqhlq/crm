import Group from 'views/group'
import Indexv from 'views/indexv'
import Common from 'views/common'
import Private from 'views/private'
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
    path: '/common',
    name: 'Common',
    component: Common
  },
  {
    path: '/processbar',
    name: 'BProcessBar',
    component: BProcessBar
  },
  {
    path: '/private',
    name: 'Private',
    component: Private
  },
  {
    path: '/customerDetail',
    name: 'customerDetail',
    component: customerDetail
  }
]
