
import Layout from 'layouts/Layout'
// import Index from 'pages/Index'
import Dashboard from 'pages/Dashboard'
import Reportes from 'pages/Reportes'
import Consolidados from 'pages/Consolidados'
import Login from 'components/auth/login'
import Logout from 'components/auth/logout'
// import Store from '../store'
// import router from '.'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      // { path: '/dashboard', name: 'index', component: Index },
      { path: '/dashboard/', name: 'dashboard', component: Dashboard },
      { path: '/reportes/', name: 'reportes', component: Reportes },
      { path: '/consolidados/', name: 'consolidados', component: Consolidados }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: { requiresVisitor: true }
  },
  {
    path: '/logout',
    component: Logout,
    name: 'logout',
    meta: { requiresVisitor: true }
  }
]

// const openRoutes = ['Login', 'Register']

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
