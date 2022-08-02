import { AppModuleState } from '../modules/app'
import { UserModuleState } from '../modules/user'

export type RootStateTypes = {
  user: UserModuleState
  app: AppModuleState
}
