import { ActionContext } from '@/typings/vuex'

export interface UserModuleState {
  userInfo: Record<string, any>
  /** 用户token */
  token: string
}

export default {
  namespaced: true,
  state: (): UserModuleState => {
    return {
      userInfo: {
        name: 'Mr.Zhang',
      },
      token: '',
    }
  },
  getters: {
    /**
     * @description: 获取用户是否登陆
     * @param {UserModuleState} state
     * @return {boolean}
     * store.getters['app/GET_IS_LOGIN'])
     */
    GET_IS_LOGIN: (state: UserModuleState): boolean => {
      return Boolean(state.token)
    },
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
     * @description: 设置Token
     * @param {UserModuleState} state
     * @param {string} data
     * @return {*}
     * store.commit('app/MU_SET_TOKEN', result)
     */
    MU_SET_TOKEN(state: UserModuleState, data: string): void {
      state.token = data
    },
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
