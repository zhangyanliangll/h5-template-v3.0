import { EnumStorageKey } from '@/enum'

/** 设置token */
export const setToken = (token: string): void => {
  localStorage.setItem(EnumStorageKey.token, token)
}

/** 获取token */
export const getToken = (): string => {
  return localStorage.getItem(EnumStorageKey.token) || ''
}

/** 删除token */
export const removeToken = (): void => {
  localStorage.removeItem(EnumStorageKey.token)
}
