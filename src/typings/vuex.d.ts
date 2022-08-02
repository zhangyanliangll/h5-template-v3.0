import { ActionContext as baseActionContext } from 'vuex'
import { RootStateTypes } from '@/store/typings/state-type.d'

export declare type ActionContext<T> = baseActionContext<T, RootStateTypes>
