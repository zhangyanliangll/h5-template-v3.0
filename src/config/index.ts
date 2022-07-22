// 环境变量
const {
  isDev,
  notDev,
  isTest,
  notTest,
  isPro,
  notPro,
  isAnalyze,
} = require('./env')

export { isDev, notDev, isTest, notTest, isPro, notPro, isAnalyze }

export * from './server'
