import { modulesType, GetStoreMapperType } from '@/store/typings/vuex-type.d'

// 获取模块函数
type GetStoreFun<M, ModelName, AttrName, FuName> = M[ModelName &
  keyof M][AttrName & keyof M[ModelName]][FuName & keyof M[ModelName][AttrName]]

// Parameters 获取 传入参数的类型
type DefineParametersType<T> = {
  [P in keyof T]: Parameters<T[P]>[1]
}

// 定义函数传参 方法
interface DefineParametersFun<T> {
  <K extends keyof T>(mutation: K, params?: T[K]): void
}

// 定义方法模块 对应
type GetStoreMoudelFunType<T extends 'getters' | 'mutations' | 'actions'> = {
  [P in GetStoreMapperType<T>]: P extends `${infer J}/${infer K}`
    ? GetStoreFun<modulesType, J, T, K>
    : unknown
}

// 获取 getters
type GetGettersType = GetStoreMoudelFunType<'getters'>

// 获取 mutations
type GetMutationsType = GetStoreMoudelFunType<'mutations'>
type MutationsFunParms = DefineParametersType<GetMutationsType> // mutations  函数传参对应

// 获取 actions
type GetActionsType = GetStoreMoudelFunType<'actions'>
type ActionsFunParms = DefineParametersType<GetActionsType> // actions  函数传参对应

export type Getters = GetGettersType

export type Commit = DefineParametersFun<MutationsFunParms>

export type Dispatch = DefineParametersFun<ActionsFunParms>
