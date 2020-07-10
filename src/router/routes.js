
import Layout from 'layouts/Layout'
import Index from 'pages/Index'
import Dashboard from 'pages/Dashboard'
import Reportes from 'pages/Reportes'
// import router from '.'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', name: 'index', component: Index },
      { path: '/dashboard/', name: 'dashboard', component: Dashboard },
      { path: '/reportes/', name: 'reportes', component: Reportes }
    ]
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
