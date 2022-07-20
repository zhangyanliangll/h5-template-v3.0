/*
 *@description 全局注册的 mixin
 */
import { App } from 'vue'

export default {
  install: (app: App): void => {
    app.mixin({
      methods: {},
    })
  },
}
