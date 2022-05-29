import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  },
  {
    path: '/infoMascota/:id',
    name: 'infoMascota',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "infoMascota" */ '../views/InfoMascota.vue')
  },
  {
    path: '/nuevamascota',
    name: 'nuevamascota',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NuevaMascota.vue')
  },
  {
    path: '/',
    name: 'mascotas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MascotasView.vue')
  },
  {
    path: '/mascotas/encontradas',
    name: 'mascotasEncontradas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MascotasEncontradas.vue')
  },
  {
    path: '/mascotas/perdidas',
    name: 'mascotasPerdidas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MascotasPerdidas.vue')
  },
  {
    path: '/iniciarsesion',
    name: 'iniciar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/IniciarSesion')
  },
  {
    path: '/registrarse',
    name: 'registrarse',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegistrarUsuario.vue')
  },
  {
    path: '/perfil',
    name: 'perfil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PerfilUsuario.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
