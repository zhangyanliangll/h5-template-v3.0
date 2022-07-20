import { AxiosPromise } from 'axios'

export interface IaddIntentionParams {
  [key: string]: any
  signTransactionId: string
}

export type TaddIntentionRes = AxiosPromise<
  ResType<{
    message: string
    status: string
  }>
>
