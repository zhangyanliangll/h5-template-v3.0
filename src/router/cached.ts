import { RouteLocationNormalized } from 'vue-router'
import { useStore } from '@/hooks/use-store'

const store = useStore()

/**
 * @description: 设置缓存
 */
export default function (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
): void {
  const toPageName = (to.name || '').toString()

  if (to.meta.keepAlive && toPageName) {
    //  设置缓存
    store.commit('app/MU_SET_CACHE_MODULE', toPageName)

    const path = from.path as string
    // 清除缓存, 从 clearCachePath 页面进入清除当前页面缓存
    if (
      to.meta.clearCachePath &&
      (to.meta.clearCachePath as string[]).includes(path)
    ) {
      store.commit('app/MU_DEL_CACHE_MODULE', toPageName)
    }
  }
}
