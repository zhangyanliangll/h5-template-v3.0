import AppModule, { AppModuleState } from './modules/app'
import UserModule, { UserModuleState } from './modules/user'

export type RootStateTypes = {
  user: UserModuleState
  app: AppModuleState
}

export default {
  user: UserModule, // 用户数据模块
  app: AppModule,
}
