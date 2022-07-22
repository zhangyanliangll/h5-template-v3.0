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
