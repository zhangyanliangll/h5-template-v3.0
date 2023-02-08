<template>
  <router-view v-slot="{ Component, route }" v-if="isRefresh">
    <!-- fix: ios原生侧滑返回会重新触发动画  -->
    <transition
      v-if="platform !== 'IOS'"
      :name="(route.meta.transitionName as string) || 'slide-in'"
      mode="out-in"
    >
      <keep-alive :include="include">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
    <keep-alive v-else :include="include">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, ref, computed, provide, nextTick } from 'vue'
import { getPlatform } from '@/utils/tools'
import { useStore } from '@/hooks/use-store'
export default defineComponent({
  setup() {
    const platform = getPlatform() // 平台
    const isRefresh = ref(true) // 手动刷新
    const store = useStore()

    // 缓存的组件
    const include = computed((): any => {
      return store.getters['app/GET_CACHE_MODULE']
    })

    provide('reload', reload)
    async function reload() {
      isRefresh.value = false
      await nextTick()
      isRefresh.value = true
    }

    return {
      isRefresh,
      platform,
      include,
    }
  },
})
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
