## useStore 封装

> 主要是意在解决在获取 store.getters 等 代码给出提示，防止输入错误
> _该方法仅提供一种实现方式，具体可根据自己页面业务复杂程度而定_

### 使用方法

```js
import { defineComponent, toRefs } from 'vue'
import { useStore } from '@/hooks/use-store'

<script lang="ts">

export default defineComponent({
    setup() {
      const store = useStore()
      // store
      const userInfo = store.state.user.userInfo
      // getters
      const GET_USER_INFO = store.getters['user/GET_USER_INFO']
      // mutations
      store.commit('user/MU_SET_USER_INFO',{})
      // actions
      store.commit('user/AC_SET_USER_INFO',{})

      return toRefs({
        userInfo,
        GET_USER_INFO,userInfo
      })
  }
</script>;
```

详见 useStore/index.js
