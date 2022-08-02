import { Store } from 'vuex'
import { RootStateTypes } from '@/store/typings/state-type.d'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootStateTypes>
  }
}
