import { API_PREFIX } from '@/config'
import { request } from '@/server'

import { IaddIntentionParams, TaddIntentionRes } from './index.d'

// POST
export const api_Intention = (data: IaddIntentionParams): TaddIntentionRes =>
  request({
    url: `${API_PREFIX}/security/intentionReport/insertIntentionTransactionReport`,
    method: 'POST',
    data,
  })

// GET
export const api_getList = (data: IaddIntentionParams): TaddIntentionRes =>
  request({
    url: `${API_PREFIX}/security/commissionScheme/queryPage`,
    method: 'GET',
    data,
  })

// 获取微信授权配置信息
export const api_getWxConfig = (data: ObjectType): ObjectType =>
  request({
    url: `${API_PREFIX}/security/commissionScheme/queryPage`,
    method: 'GET',
    data,
  })

export const api_getMobile = (data: ObjectType): ObjectType =>
  request({
    url: `${API_PREFIX}/pet/1`,
    method: 'GET',
    data,
    type: 'form-urlencoded',
  })

export const api_getMobile2 = (data: ObjectType): ObjectType =>
  request({
    url: `${API_PREFIX}/pet/1`,
    method: 'GET',
    data,
  })

/**
 * 刷新token
 * @param refreshToken
 */
export const api_fetchUpdateToken = (data: ObjectType): ObjectType =>
  request({
    url: `${API_PREFIX}/updateToken`,
    method: 'POST',
    data,
  })
