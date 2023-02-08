import {
  RouteLocationNormalized,
  NavigationGuardNext,
  Router,
} from 'vue-router'
import cached from './cached'

export const beforeRouter = (router: Router): void => {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      // 设置缓存
      cached(to, from)

      next()
    },
  )
  // router.afterEach((to, from) => {
  //   console.log();
  // });
}

export default beforeRouter
