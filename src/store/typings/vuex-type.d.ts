import modules from '../modules'

export type modulesType = typeof modules

// 拼接
export type Prefix<I, J> = `${I & string}/${J & string}`

export type mapperType<T, K> = {
  [P in keyof T]: Prefix<
    P,
    K extends 'state' ? keyof ReturnType<T[P][K]> : keyof T[P][K]
  >
}[keyof T]

// 获取模块 下的属性
export type GetStoreMapperType<T> = mapperType<modulesType, T>
