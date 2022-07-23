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
import { defineComponent, ref, provide, nextTick, onBeforeMount } from 'vue'
import { getPetApi } from '@/api/common'
export default defineComponent({
  setup() {
    const isRouterAlive = ref(true)

    provide('reload', reload)
    async function reload() {
      isRouterAlive.value = false
      await nextTick()
      isRouterAlive.value = true
    }
    // https://autumnfish.cn/search?keywords=%22%E6%88%91%22
    // https://mock.apifox.cn/m1/1328576-0-default/pet/1

    onBeforeMount(async () => {
      const data = await getPetApi({
        keywords: '我',
        a: '我adasdasdsa',
        c: '我adasdasdsa',
      })
      console.log(data, '--1')
    })

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
