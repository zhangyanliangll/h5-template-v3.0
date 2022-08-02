import { Store } from 'vuex'
import { RootStateTypes } from '@/store/typings/state-type'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootStateTypes>
  }
}
