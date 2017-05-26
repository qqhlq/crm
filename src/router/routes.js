import Group from 'views/group'
import Indexv from 'views/indexv'
import Open from 'views/open'
import BProcessBar from 'components/processBar'
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
    path: '/open',
    name: 'Open',
    component: Open
  },
  {
    path: '/processbar',
    name: 'BProcessBar',
    component: BProcessBar
  }
]
