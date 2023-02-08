import { ActionContext } from '@/typings/vuex'

export interface AppModuleState {
  baseUrl: string
  cacheModule: string[]
}

export default {
  namespaced: true,
  state: (): AppModuleState => {
    return {
      baseUrl: 'https://www.baidu.com/',
      cacheModule: [],
    }
  },
  getters: {
    /**
     * @description: 获取路径
     * @param {AppModuleState} state
     * @return {*}
     * store.getters['app/GET_BASE_URL'])
     */
    GET_BASE_URL: (state: AppModuleState): string => {
      return state.baseUrl
    },
    /**
     * @description: 获取缓存组件
     * @param {AppModuleState} state
     * @return {*}
     * store.getters['app/GET_CACHE_MODULE'])
     */
    GET_CACHE_MODULE: (state: AppModuleState): string[] => {
      return state.cacheModule
    },
  },
  mutations: {
    /**
     * @description: 设置路径
     * @param {AppModuleState} state
     * @param {string} data
     * @return {*}
     * store.commit('app/MU_SET_BASE_URL', result)
     */
    MU_SET_BASE_URL(state: AppModuleState, data: string): void {
      state.baseUrl = data
    },
    /**
     * @description: 设置需要缓存组件
     * @param {AppModuleState} state
     * @param {string} data
     * @return {*}
     * store.commit('app/MU_SET_CACHE_MODULE', result)
     */
    MU_SET_CACHE_MODULE(state: AppModuleState, data: string): void {
      state.cacheModule.push(data)
      state.cacheModule = [...new Set(state.cacheModule as string[])]
    },
    /**
     * @description: 清除缓存组件
     * @param {AppModuleState} state
     * @param {string} data
     * @return {*}
     * store.commit('app/MU_DEL_CACHE_MODULE', result)
     */
    MU_DEL_CACHE_MODULE(state: AppModuleState, data: string): void {
      state.cacheModule = state.cacheModule.filter((name: string) => {
        return name != data
      })
    },
  },
  actions: {
    /**
     * @description: 设置路径
     * @param {*}
     * @return {*}
     * store.dispatch('app/AC_SET_BASE_URL', result)
     */
    AC_SET_BASE_URL(
      { commit }: ActionContext<AppModuleState>,
      data: Record<string, any>,
    ): void {
      commit('MU_SET_BASE_URL', data)
    },
  },
}
