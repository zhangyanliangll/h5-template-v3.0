<template>
  <div class="home">
    <FormGroup
      ref="formRef"
      v-model="formQuery"
      :formGroups="(formGroups as any)"
    >
      <template #myFromItem>
        <div>myFromItem</div>
      </template>
    </FormGroup>
    <div @click="save">save</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, toRaw, ref } from 'vue'
import FormGroup from '_com/form-group/index.vue'
import type { IFormGroup } from '_com/form-group/form-group'

export default defineComponent({
  name: 'Home',
  components: {
    FormGroup,
  },
  setup() {
    const formRef = ref({} as IFormGroup)

    const formQuery: ObjectType = {
      propertyAddress: '12312312',
      paymentMethod: '',
      handoverDate: '',
      bizDateBegina: '',
      bizDateEndb: '',
      customerComAddress: '',
    }

    const formGroups: ObjectType[] = [
      {
        targetElement: 'title',
        label: '主题一',
      },
      {
        label: '房屋地址',
        value: 'propertyAddress',
        fieldProps: {
          clearable: true,
          placeholder: '请输入房屋地址',
        },
        rules: [],
      },
      {
        targetElement: 'van-picker',
        label: '支付方式',
        isLink: true,
        readonly: true,
        isHiddenBorder: true,
        value: 'paymentMethod',
        fieldProps: {
          placeholder: '请选择支付方式',
        },
        options: [
          {
            text: '现金',
            value: 'CASH',
          },
          {
            text: '银行转账',
            value: 'TRANSFER',
          },
          {
            text: '第三方平台支付（支付宝、微信）',
            value: 'THIRD_PLATFORM',
          },
        ],
        optionAlias: {
          label: 'text',
          value: 'value',
        },
      },
      {
        targetElement: 'van-calendar',
        label: '单个日期',
        isLink: true,
        readonly: true,
        value: 'handoverDate',
        fieldProps: {
          placeholder: '请选择单个日期',
          'value-format': 'YYYY-MM-DD',
        },
      },
      {
        targetElement: 'van-calendar',
        label: '时间日历',
        isLink: true,
        readonly: true,
        value: 'handoverDate',
        fieldProps: {
          placeholder: '请选择时间区间',
          'value-format': 'YYYY-MM-DD',
        },
        popupProps: {
          type: 'range',
          color: '#00B9EF',
        },
        separateQuery: ['bizDateBegina', 'bizDateEndb'],
      },
      {
        targetElement: 'slot',
        slotName: 'myFromItem',
      },
      {
        label: '房屋地址',
        value: 'customerComAddress',
        fieldProps: {
          type: 'textarea',
          placeholder: '请输入房屋地址',
        },
        rules: [{ required: true, message: '请填写密码' }],
      },
      {
        label: 'render渲染',
        renderItem(h: any, sourceData: any) {
          return h(
            'h1',
            {
              style: {
                color: '#fff',
                backgroundColor: 'red',
                height: '30px',
                fontSize: '24px',
              },
              onClick: () => {
                console.log('触发了点击事件---')
              },
            },
            sourceData.propertyAddress,
          )
        },
      },
    ]

    const form = reactive({
      formQuery,
      formGroups,
      async save() {
        // console.log([1, 2, 3, 4, 5, 6].remove(1))
        // console.log(' asdsad asdasd sdad '.Trim(true))
        // console.log('123'.toChies())
        // console.log('https://www.baidu.com/s?ie=UTF-8&wd=typings'.query('wd'))
        // formRef.value.validateField()
        try {
          await formRef.value.validateField()
        } catch (error) {
          console.log(error, '------error--')
        }
        console.log(toRaw(form.formQuery), '---formQuery.value===')
        console.log(form.formQuery, '---formQuery.value===')
      },
    })

    return {
      ...toRefs(form),
      formRef,
    }
  },
})
</script>

<style lang="scss" scoped>
.home {
  background-color: $default;
  height: 100vh;
}
</style>
