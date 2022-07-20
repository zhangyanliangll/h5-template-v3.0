const { name } = require('../package.json')

// 当前项目的打包名
exports.packageName = name

// 定义不同环境所使用的分支名称
exports.targetEnvironment = {
  'test-trade': 'test-trade',
  'testv1-trade': 'testv1-trade',
  staging: 'staging'
}
