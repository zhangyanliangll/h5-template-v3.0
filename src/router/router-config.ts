import {
  RouteLocationNormalized,
  NavigationGuardNext,
  Router,
} from 'vue-router'

export const beforeRouter = (router: Router): void => {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      // 那些页面需要缓存，不要请求刷新数据
      const path = from.path as string
      if (
        to.meta.keepAlivePath &&
        (to.meta.keepAlivePath as string[]).includes(path)
      ) {
        to.meta.isBack = false // 不刷新
      } else {
        to.meta.isBack = true
      }

      next()
    },
  )

  // router.afterEach((to, from) => {
  //   console.log();
  // });
}

export default beforeRouter
