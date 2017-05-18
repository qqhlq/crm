import Log from 'views/log'
import CustomerList from 'views/customer/list'
import CustomerCreateBase from 'views/customer/create/base'
import CustomerCreatePlatform from 'views/customer/create/platform'
import DeliveryList from 'views/delivery/list'
import DeliveryMonitor from 'views/delivery/monitor'
import DeliveryTest from 'views/delivery/test'
import OrderList from 'views/order/list'

export default [
  {
    path: '/boss/log',
    name: 'Log',
    component: Log
  },
  {
    path: '/boss/customer',
    name: 'CustomerList',
    component: CustomerList
  },
  {
    path: '/boss/customer/create/base',
    name: 'CustomerCreateBase',
    component: CustomerCreateBase
  },
  {
    path: '/boss/customer/create/platform',
    name: 'CustomerCreatePlatform',
    component: CustomerCreatePlatform
  },
  {
    path: '/boss/delivery',
    name: 'DeliveryList',
    component: DeliveryList
  },
  {
    path: '/boss/delivery/monitor/:cid',
    name: 'DeliveryMonitor',
    component: DeliveryMonitor
  },
  {
    path: '/boss/delivery/test/:cid',
    name: 'DeliveryTest',
    component: DeliveryTest
  },
  {
    path: '/boss/order',
    name: 'OrderList',
    component: OrderList
  }
]
