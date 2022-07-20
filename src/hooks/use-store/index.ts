import { store } from '@/store/index'
import { RootStateTypes } from '@/store/modules'
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
