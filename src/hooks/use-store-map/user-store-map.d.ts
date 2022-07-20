import { modulesType, mapperType } from '@/store/typings/vuex-type.d'

import { NamespacedMappers } from 'vuex'

// 获取getters / state
export type useStoreMapFnType<K extends 'getters' | 'state'> = (
  mapper: mapperType<modulesType, K>[],
) => any

export type useMapperStateGettersFunType = (
  mapper: string[],
  type: keyof NamespacedMappers,
) => any
