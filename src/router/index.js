import Home from '../pages/home'
import User from '../pages/user'
import Grhx from '../pages/grhx'
import Error from '../pages/error'
import Demo from '../pages/test/demo'
export let AppRouter = [
  {
    path: '/',
    component: Home,
    name: 'home',
    exact: true
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    exact: true
  },
  {
    path: '/user',
    component: User,
    name: 'user',
    auth: true,
    exact: true
  },
  {
    path: '/grhx',
    component: Grhx,
    name: 'grhx',
    exact: true
  },
  {
    path: '/404',
    component: Error,
    name: 'error',
    exact: true
  },
  {
    path: '/demo',
    component: Demo,
    name: 'demo',
    exact: true
  },
]
