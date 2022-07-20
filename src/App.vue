<template>
  <keep-alive>
    <router-view
      class="app-content-box"
      v-if="$route.meta.keepAlive && isRouterAlive"
    ></router-view>
  </keep-alive>
  <router-view
    class="app-content-box"
    v-if="!$route.meta.keepAlive && isRouterAlive"
  ></router-view>
</template>

<script lang="ts">
import { defineComponent, ref, provide, nextTick } from 'vue'
export default defineComponent({
  setup() {
    const isRouterAlive = ref(true)

    provide('reload', reload)
    async function reload() {
      isRouterAlive.value = false
      await nextTick()
      isRouterAlive.value = true
    }

    return {
      isRouterAlive,
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
