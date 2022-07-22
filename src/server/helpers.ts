import type { AxiosRequestConfig } from 'axios'
import { useStore } from '@/hooks/use-store'
import { removeToken, setToken } from '@/utils/server'
import { api_fetchUpdateToken } from '@/api/common'

/**
 * 刷新token
 * @param axiosConfig - token失效时的请求配置
 */
export async function handleRefreshToken(
  axiosConfig: AxiosRequestConfig,
): Promise<any> {
  const store = useStore()
  const { data } = await api_fetchUpdateToken({})
  if (data) {
    setToken(data)
    store.commit('user/MU_SET_TOKEN', data)
    const config = { ...axiosConfig }
    if (config.headers) {
      config.headers.Authorization = data.token
    }
    return config
  }
  removeToken()
  return null
}
