import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router'
import { beforeRouter } from './router-config'

import Home from '../views/Home.vue'

import modulesRoutes from './get-modules-routes'

const routes: Array<RouteRecordRaw> = [
  ...modulesRoutes,
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    savedPosition,
  ) {
    // return desired position
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        left: 0,
      }
    }
  },
})

beforeRouter(router)

export default router
