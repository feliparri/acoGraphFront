import Layout from 'layouts/Layout'
import Dashboard from 'pages/Dashboard'
// import Recepcion from 'pages/Recepcion'
import Obras from 'pages/Obras'
import Login from 'components/auth/login'
import Logout from 'components/auth/logout'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      { path: '/dashboard/', name: 'dashboard', component: Dashboard },
      // { path: '/recepcion/', name: 'recepcion', component: Recepcion },
      { path: '/obras/', name: 'obras', component: Obras }
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
