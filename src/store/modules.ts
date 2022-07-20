import UserModule, { UserModuleState } from './modules/user'
import AppModule, { AppModuleState } from './modules/app'

export type RootStateTypes = {
  user: UserModuleState
  app: AppModuleState
}

export default {
  user: UserModule, // 用户数据模块
  app: AppModule,
}
