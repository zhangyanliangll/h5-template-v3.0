## 表单组件（form-group）

目的：主要是为了解决移动端表单弹框可以进行通过配置进行完成，减少代码的重复书写，解耦；
缺点： 1.上传文件未完成；2.如果是过分复杂表单的话，亲！这边不建议你使用，建议你还是自己画；

#### 主配置

| name            | Description                                    | Type     | Default | required |
| --------------- | ---------------------------------------------- | -------- | ------- | -------- |
| formGroup       | 表单配置参数                                   | array    | []      | true     |
| formQuery       | 表单数据                                       | array    | []      | true     |
| validateField   | 验证表单，支持传入 name 来验证单个或部分表单项 | Function |         |          |
| resetValidation | 重置表单，支持传入 name 来验证单个或部分表单项 | Function |         |          |
| scrollToField   | 滚动到对应表单项的位置，默认滚动到顶部         | Function |         |          |
| getApiQuery     | 获取 api query                                 | Function |         |          |
| init            | 重新初始化 formGroups                          | Function |         |          |

### 1、 formQuery 配置

| name            | Description  | Type   | Default |
| --------------- | ------------ | ------ | ------- |
| propertyAddress | 房屋地址参数 | string |         |
| paymentMethod   | 支付方式参数 | string |         |

其他同理....不写了,和 formGroup value 属性值对应上即可，不明白，请往下翻，有例子

### 2、 formGroup 配置 （注：van-field，targetElement 弹层使用 vant 属性也可使用）

| name          | Description                                                                       | Type    | Default |
| ------------- | --------------------------------------------------------------------------------- | ------- | ------- |
| targetElement | 弹层组件，vant 组件节点名称或者 title、slot                                       | string  |         |
| isHidden      | 是否隐藏                                                                          | boolean | false   |
| label         | label 字段                                                                        | string  |         |
| isLink        | 是否需要显示箭头                                                                  | boolean | false   |
| value         | v-model 绑定的属性（ formQuery 里面的 ）                                          | string  |
| fixedValue    | 固定值，即不包含在 formQuery 里面的数据（需要在 targetElement==='defined'下使用） | string  |

|
| readonly | 是否只读 | number | false |
| class | class 名 | object、string | |
| options | vant-Picker 下拉的值 | array | |
| popupProps | vant-Picker 等 valueKey,value | text、value | |
| fieldProps | van-field 参数属性 | object | |
| isShowPopup | 是否显示弹层,当 targetElement 有值时有效 | boolean | |
| isNeedVanPopup | 是否需要 van-popup,当 targetElement 有值时有效 | boolean | |
| isHiddenBorder | 是否隐藏下边框 0.5px | boolean | false |
| targetEvent | 绑定弹出层事件 | object | |
| fieldEvent | 绑定输入框事件 | object | |
| rules | 提交时校验的正则 | array | |
| separateQuery | van-calendar 使用时 type= 'range', formQuery 参数属性名 | object | |
| notQuery | notQuer 为 true 则不会提交本属性 | boolean | false | |

### 使用方法

```html
<form-group ref="formRef" v-model="formQuery" :formGroups="formGroups">
  <template #myFromItem>
    <div>myFromItem</div>
  </template>
</form-group>

<div @click="save">保存</div>
```

```js 通用详情弹窗 formGroup配置参数示例
import FormGroup from "_com/form-group/index";
import type { IFormGroup } from '@/components/form-group/form-group'

export default defineComponent({
  name: 'PageName',
  components: {
    FormGroup,
  },
  setup(props) {
    const formRef = ref({} as IFormGroup)

    const formQuery: any = ref({
      propertyAddress: '',
      paymentMethod: '',
      handoverDate: '',
      bizDateBegina: '',
      bizDateEndb: '',
      customerComAddress: '',
    })
    const formGroups: any = [
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
      },
      {
        targetElement: 'van-calendar',
        label: '交付日期',
        isLink: true,
        readonly: true,
        value: 'handoverDate',
        fieldProps: {
          placeholder: '请选择交付日期',
          'value-format': 'YYYY-MM-DD',
        },
      },
      {
        targetElement: 'van-calendar',
        label: '交付日期',
        isLink: true,
        readonly: true,
        value: 'handoverDate',
        fieldProps: {
          placeholder: '请选择交付日期',
          'value-format': 'YYYY-MM-DD',
        },
        popupProps: {
          type: 'range',
          color: '#00B9EF',
        },
        separateQuery: {
          bizDateBegina: 0,
          bizDateEndb: 1,
        },
      },
      {
        label: '房屋地址',
        value: 'customerComAddress',
        fieldProps: {
          type: 'textarea',
          placeholder: '请输入房屋地址',
        },
        rules: [],
      },
    ]

    return {
      formGroups,
      formQuery,
    }
  },
})
```

详见 form-group.vue
