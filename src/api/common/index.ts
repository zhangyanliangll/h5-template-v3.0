import { API_PREFIX } from '@/config'
import { request } from '@/server'

import { IaddIntentionParams, TaddIntentionRes } from './index.d'

// POST
export const setIntentionApi = (data: IaddIntentionParams): TaddIntentionRes =>
  request({
    url: `${API_PREFIX}/security/intentionReport/insertIntentionTransactionReport`,
    method: 'POST',
    data,
  })

// GET
export const getListApi = (data: IaddIntentionParams): TaddIntentionRes =>
  request({
    url: `${API_PREFIX}/security/commissionScheme/queryPage`,
    method: 'GET',
    data,
  })

// 获取微信授权配置信息
export const getWxConfigApi = (data: ObjectType): ObjectType =>
  request({
    url: `${API_PREFIX}/security/commissionScheme/queryPage`,
    method: 'GET',
    data,
  })

export const getPetApi = (data: ObjectType): ObjectType =>
  request({
    url: `${API_PREFIX}/pet/1`,
    method: 'GET',
    data,
    type: 'json',
  })

/**
 * 刷新token
 * @param refreshToken
 */
export const fetchUpdateTokenApi = (data: ObjectType): ObjectType =>
  request({
    url: `${API_PREFIX}/updateToken`,
    method: 'POST',
    data,
  })
