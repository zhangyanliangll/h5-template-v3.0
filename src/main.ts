import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'

import Vant from 'vant'
import 'vant/lib/index.css'

import '@/utils/inject/index'

import mixin from '@/mixin'

import { notPro } from '@/config'

// 重置样式
import '@/assets/scss/reset.scss'
// 重置 vant样式
import '@/assets/scss/reset-vant-ui.scss'

// 打印日志 工具 ---
if (notPro) {
  Promise.all([import('vconsole')]).then((res) => {
    if (res.length === 1) {
      const VConsole = res[0].default
      new VConsole()
    }
  })
}

createApp(App).use(Vant).use(mixin).use(store, key).use(router).mount('#app')
