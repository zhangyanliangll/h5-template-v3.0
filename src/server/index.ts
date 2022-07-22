import type { RequestFunType } from '@/typings/server.d'
import { isDev, API_BASE_URL, REQUEST_TIMEOUT } from '@/config'
import { createRequest } from './request'

export const api = createRequest({
  baseURL: isDev ? '/api' : API_BASE_URL, //接口请求地址
  timeout: REQUEST_TIMEOUT,
})

export const request: RequestFunType = api.request
