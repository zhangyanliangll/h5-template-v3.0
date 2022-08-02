import { store } from '@/store/index'
import { RootStateTypes } from '@/store/typings/state-type.d'
import { Getters, Commit, Dispatch } from './user-store.d'

interface UseStoreHooks {
  state: RootStateTypes
  getters: Getters
  commit: Commit
  dispatch: Dispatch
}

export const useStore = (): UseStoreHooks => {
  const { state, getters, commit, dispatch } = store

  return { state, getters, commit, dispatch }
}

export default useStore
