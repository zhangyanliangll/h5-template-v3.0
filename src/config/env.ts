const isDev = process.env.NODE_ENV === 'development'
const notDev = process.env.NODE_ENV !== 'development'
const isTest = process.env.NODE_ENV === 'test'
const notTest = process.env.NODE_ENV !== 'test'
const isPro = process.env.NODE_ENV === 'production'
const notPro = process.env.NODE_ENV !== 'production'
const isAnalyze = process.env.ANALYZE

module.exports = {
  isDev,
  notDev,
  isTest,
  notTest,
  isPro,
  notPro,
  isAnalyze,
}
