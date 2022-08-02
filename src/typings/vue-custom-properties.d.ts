import { Store } from 'vuex'
import { RootState } from '@/store/typings/vuex-type'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}
