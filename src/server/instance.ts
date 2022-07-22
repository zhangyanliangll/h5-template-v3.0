import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  AxiosResponse,
} from 'axios'
import type { FetchResponse } from '@/typings/server.d'
import { transformRequestData } from './transform'
import { REFRESH_TOKEN_CODE } from '@/config'
import { handleRefreshToken } from './helpers'
import { getToken } from '@/utils/server'

/**
 * 封装axios请求类
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance

  /**
   *
   * @param axiosConfig - axios配置
   * @param backendConfig - 后端返回的数据配置
   */
  constructor(axiosConfig: AxiosRequestConfig) {
    this.instance = axios.create(axiosConfig)
    this.setInterceptor()
  }

  /** 设置请求拦截器 */
  setInterceptor(): void {
    this.instance.interceptors.request.use(
      async (config) => {
        const handleConfig = { ...config }

        if (handleConfig.headers) {
          // 数据转换
          const contentType = handleConfig.headers['Content-Type'] as string
          handleConfig.data = await transformRequestData(
            handleConfig.data,
            contentType,
          )
          // // 设置token
          handleConfig.headers.Authorization = getToken()
        }
        return handleConfig
      },
      (axiosError: AxiosError) => {
        return Promise.reject(axiosError)
      },
    )
    this.instance.interceptors.response.use(
      async (response: AxiosResponse<FetchResponse.Response>) => {
        const { status, data } = response

        if (status === 200 || status < 300 || status === 304) {
          // 请求成功
          if (data.code === data.status) {
            return response
          }
          // token失效, 刷新token
          if (REFRESH_TOKEN_CODE.includes(data.code)) {
            const config = await handleRefreshToken(response.config)
            if (config) {
              return this.instance.request(config)
            }
          }
          return response
        }
        return Promise.reject()
      },
      (axiosError: AxiosError) => {
        return Promise.reject(axiosError)
      },
    )
  }
}
