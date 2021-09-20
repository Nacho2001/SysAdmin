import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/notas',
    name: 'Notas',
    component: () => import( '../views/Notas.vue')
  },
  {
    path: '/publicaciones',
    name: 'Publicaciones',
    component: () => import( '../views/Publicacion.vue')
  },
  {
    path: '/leydeohm',
    name: 'LeyOhm',
    component: () => import('../views/LeyOhm.vue')

  },
  {
    path: '/pitagoras',
    name: 'Pitagoras',
    component: () => import('../views/Pitagoras.vue')
  },
  {
    path:"/cliente",
    name:"Cliente",
    component: () => import('../views/Cliente.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
