declare type ObjectType = Record<string, any>

declare namespace FetchResponse {
  interface Response<T = any> {
    message: string
    result: T
    status: string
  }
}

declare type ResType<T> = FetchResponse.Response<T>
