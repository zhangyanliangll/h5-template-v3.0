import { ActionContext } from '@/typings/vuex'

export interface AppModuleState {
  baseUrl: string
}

export default {
  namespaced: true,
  state: (): AppModuleState => {
    return {
      baseUrl: 'https://www.baidu.com/',
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
