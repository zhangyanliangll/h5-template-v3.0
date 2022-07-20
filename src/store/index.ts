import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import modules, { RootStateTypes } from './modules'

// 定义 injection key
export const key: InjectionKey<Store<RootStateTypes>> = Symbol()

export const store = createStore<RootStateTypes>({
  modules,
})

export default store

// 定义自己的 `useStore` 组合式函数 官网：https://next.vuex.vuejs.org/zh/guide/typescript-support.html#%E7%AE%80%E5%8C%96-usestore-%E7%94%A8%E6%B3%95
export const useStore = <T = RootStateTypes>(): Store<T> => baseUseStore<T>(key)
