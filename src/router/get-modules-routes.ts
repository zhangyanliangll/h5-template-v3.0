import { RouteRecordRaw } from 'vue-router'

let modulesRoutes: RouteRecordRaw[] = []

function compileModulesFile(modulesFiles: __WebpackModuleApi.RequireContext) {
  modulesFiles.keys().forEach((modulePath: string) => {
    const moduleExport = modulesFiles(modulePath).default
    modulesRoutes = [...modulesRoutes, ...moduleExport]
  })
}

const modulesFiles = require.context('./modules', true, /\.ts$/)

compileModulesFile(modulesFiles)

export default modulesRoutes
