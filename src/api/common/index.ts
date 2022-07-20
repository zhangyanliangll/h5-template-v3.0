import { prefix } from '@/config'
import { request } from '@/server/request'

import { IaddIntentionParams, TaddIntentionRes } from './index.d'

// POST
export const api_Intention = (data: IaddIntentionParams): TaddIntentionRes =>
  request({
    url: `${prefix}/security/intentionReport/insertIntentionTransactionReport`,
    method: 'POST',
    data,
  })

// GET
export const api_getList = (params: IaddIntentionParams): TaddIntentionRes =>
  request({
    url: `${prefix}/security/commissionScheme/queryPage`,
    method: 'GET',
    params,
  })

// 获取微信授权配置信息
export const api_getWxConfig = (params: ObjectType): ObjectType =>
  request({
    url: `${prefix}/security/commissionScheme/queryPage`,
    method: 'GET',
    params,
  })