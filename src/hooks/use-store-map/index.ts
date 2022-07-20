import { computed } from 'vue'
import { useStore, createNamespacedHelpers } from 'vuex'
import {
  useStoreMapFnType,
  useMapperStateGettersFunType,
} from './user-store-map.d'

/**
 * @description: map state/getters 公共方法
 * @param {string[]}
 * @return {string}
 */
const useMapperStateGetters: useMapperStateGettersFunType = (mapper, type) => {
  const store = useStore()
  const storeGetters: any = {} //计算属性 store 值
  const modulesFnName: any = {} // 模块方法名字: {user:['getterUserInfo']}

  mapper
    .map((item: string) => {
      return item.split('/')
    })
    .forEach((it: any) => {
      if (!Array.isArray(modulesFnName[it[0]])) {
        modulesFnName[it[0]] = []
      }
      modulesFnName[it[0]].push(it[1])
    })

  for (const key in modulesFnName) {
    if (Object.prototype.hasOwnProperty.call(modulesFnName, key)) {
      modulesFnName[key] = (
        createNamespacedHelpers(key) as Record<string, any>
      )[type](modulesFnName[key])
    }
  }

  for (const key in modulesFnName) {
    if (Object.prototype.hasOwnProperty.call(modulesFnName, key)) {
      for (const item in modulesFnName[key]) {
        if (Object.prototype.hasOwnProperty.call(modulesFnName[key], item)) {
          storeGetters[item] = computed(
            modulesFnName[key][item].bind({ $store: store }),
          )
        }
      }
    }
  }

  return storeGetters
}

/**
 * @description: 获取 模块 Getters 的值
 * @param {string[]} mapper 获取的属性名 ['user/getterUserInfo']
 * @return {*}
 */
export const useGetters: useStoreMapFnType<'getters'> = (mapper) => {
  return useMapperStateGetters(mapper, 'mapGetters')
}

/**
 * @description: 获取 模块 state 的值
 * @param { modulesKey } moduleName 模块名字 user
 * @param { string | string[] } mapper 获取的属性名 ['userInfo']
 * @return {*}
 */
export const useState: useStoreMapFnType<'state'> = (mapper) => {
  return useMapperStateGetters(mapper, 'mapState')
}

export default {
  useState,
  useGetters,
}
