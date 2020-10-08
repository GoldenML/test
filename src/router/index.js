import Home from '../pages/home'
import User from '../pages/user'
import Grhx from '../pages/grhx'
import Error from '../pages/error'
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
]
