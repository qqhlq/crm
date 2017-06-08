import Group from 'views/group'
import Indexv from 'views/indexv'
import Common from 'views/common'
import Private from 'views/private'
import customerDetail from 'views/customerDetail'
import BProcessBar from 'components/processBar'
import BModaler from 'components/modaler'

export default [
  {
    path: '/crm/group',
    name: 'Group',
    component: Group
  },
  {
    path: '/crm/common',
    name: 'Common',
    component: Common
  },
  {
    path: '/crm/processbar',
    name: 'BProcessBar',
    component: BProcessBar
  },
  {
    path: '/crm/private',
    name: 'Private',
    component: Private
  },
  {
    path: '/crm/customerDetail',
    name: 'customerDetail',
    component: customerDetail
  }
]
