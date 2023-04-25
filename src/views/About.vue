<template>
  <h1>姓名：{{ name }}</h1>
  <h1>年龄：{{ age }}</h1>
  <h2>职业：{{ job.occupation }}<br />薪资：{{ job.salary }}</h2>
  <h3>爱好：{{ hobby[0] }},{{ hobby[1] }},{{ hobby[2] }}</h3>
  <button @click="say">修改</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(0)

const obj = ref({
  count: 0,
})

console.log(obj)
console.log(count)

const addCount = () => {
  obj.value.count++
}
</script>
