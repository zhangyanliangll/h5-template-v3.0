import { ActionContext } from '@/typings/vuex'

export interface UserModuleState {
  userInfo: Record<string, any>
}

export default {
  namespaced: true,
  state: (): UserModuleState => {
    return {
      userInfo: {
        name: 'Mr.Zhang',
      },
    }
  },
  getters: {
    /**
     * @description: 获取用户信息
     * @param {UserModuleState} state
     * @return {object}
     * store.getters['app/GET_USER_INFO'])
     */
    GET_USER_INFO: (state: UserModuleState): Record<string, any> => {
      return state.userInfo
    },
  },
  mutations: {
    /**
     * @description: 设置用户信息
     * @param {UserModuleState} state
     * @param {Record} data
     * @param {*} any
     * @return {*}
     * store.commit('user/MU_SET_USER_INFO', result)
     */
    MU_SET_USER_INFO(state: UserModuleState, data: Record<string, any>): void {
      state.userInfo = data
    },
  },
  actions: {
    /**
     * @description: 设置用户信息
     * @param {*}
     * @return {*}
     * store.dispatch('user/AC_SET_USER_INFO', result)
     */
    AC_SET_USER_INFO(
      { commit }: ActionContext<UserModuleState>,
      data: Record<string, any>,
    ): void {
      commit('MU_SET_USER_INFO', data)
    },
  },
}
