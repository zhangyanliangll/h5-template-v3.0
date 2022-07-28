<template>
  <div class="input-content-box">
    <van-form ref="vanFromRef">
      <van-cell-group>
        <div
          v-for="item in formGroups"
          :key="item.value || item.label || item.slotName"
          :class="item.class"
        >
          <template v-if="!item.isHidden">
            <div class="title" v-if="item.targetElement === 'title'">
              {{ item.label }}
            </div>
            <dynamicComponent
              v-else-if="item.renderItem"
              :sourceData="formQuery"
              :renderItem="(item.renderItem as Function)"
              :formItem="item"
            >
            </dynamicComponent>
            <!-- 普通展示 -->
            <div
              v-else-if="item.targetElement === 'defined'"
              class="defined van-cell border-bottom"
            >
              <span class="label van-field__label" v-bind="item.labelProps">
                {{ item.label }}
              </span>
              <span class="item" v-bind="item.itemProps">
                {{ formQuery[item.value as any] || item.fixedValue }}
              </span>
            </div>
            <!-- 自定义 -->
            <slot
              v-else-if="item.targetElement === 'slot'"
              :name="item.slotName"
            ></slot>
            <!-- 表单 -->
            <template v-else>
              <van-field
                :label="item.label"
                :is-link="item.isLink"
                :readonly="item.readonly"
                :class="{
                  'border-bottom': true,
                  'hidden-border': item.isHiddenBorder,
                  'textarea-label':
                    item.fieldProps && item.fieldProps.type === 'textarea', //超文本标题
                }"
                :rules="item.rules"
                v-bind="item.fieldProps"
                v-model="formQuery[item.value as any]"
                v-on="{
                  click: () => setPopupShow(item),
                  ...(item.fieldEvent as any)
                }"
                @update:model-value="fieldUpdateModel"
              >
                <template #button v-if="item.fieldRigthContent">
                  <div
                    v-if="typeof item.fieldRigthContent == 'string'"
                    class="field-right-text"
                  >
                    {{ item.fieldRigthContent }}
                  </div>
                  <div v-else>
                    <dynamicComponent
                      :sourceData="formQuery"
                      :renderItem="item.fieldRigthContent"
                      :formItem="item"
                    >
                    </dynamicComponent>
                  </div>
                </template>
                <template
                  #input
                  v-if="
                   ['van-picker', 'van-calendar'].includes(item.targetElement as string)
                  "
                >
                  <div>
                    <!-- 时间回显 -->
                    <span
                      v-if="item.targetElement === 'van-calendar'"
                      :class="{
                        'placeholder-color': !formatterCalendar(item),
                      }"
                    >
                      {{
                        formatterCalendar(item) ||
                        (item.fieldProps as any).placeholder
                      }}
                    </span>
                    <!-- 自定义显示 picker 弹层回显 -->
                    <span
                      :class="{
                        'placeholder-color': item.multiColumn
                          ? !formQuery[item.value as any]
                          : !formatterPicker(item)
                      }"
                      v-else-if="item.targetElement === 'van-picker'"
                    >
                      <span v-if="item.multiColumn">{{
                        formQuery[item.value as any] ||
                        (item.fieldProps as any).placeholder
                      }}</span>
                      <span v-else>
                        {{
                          formatterPicker(item) ||
                          (item.fieldProps as any).placeholder
                        }}</span
                      >
                    </span>
                  </div>
                </template>
              </van-field>
            </template>
            <!-- 弹层组件 -->
            <teleport to="#app" v-if="item.targetElement">
              <template v-if="item.isNeedVanPopup">
                <van-popup v-model:show="item.isShow" position="bottom">
                  <component
                    :ref="item.value"
                    :is="item.targetElement"
                    :columns="item.options"
                    v-bind="{
                      ...item.popupProps,
                      ...item.optionAlias,
                    }"
                    v-on="item.targetEvent || {}"
                    @cancel="item.isShow = false"
                    @confirm="
                      (val:any) => {
                        selectConfirm(item, val)
                      }
                    "
                  />
                </van-popup>
              </template>
              <template v-else>
                <component
                  :ref="item.value"
                  :is="item.targetElement"
                  v-model:show="item.isShow"
                  v-bind="{
                    ...item.popupProps,
                    ...item.optionAlias,
                  }"
                  v-on="item.targetEvent || {}"
                  @confirm="
                    (val:any) => {
                      selectConfirm(item, val)
                    }
                  "
                />
              </template>
            </teleport>
          </template>
        </div>
      </van-cell-group>
    </van-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  reactive,
  toRefs,
  ref,
  onBeforeMount,
  PropType,
  nextTick,
} from 'vue'
import { IformGroupsItem, Iprops, IoptionAlias } from './form-group.d'
import dynamicComponent from './dynamic-component'

export default defineComponent({
  name: 'FormGroup',
  components: {
    dynamicComponent,
  },
  emits: ['update:modelValue'],
  props: {
    formGroups: {
      // 输入配置
      typeof: Array as PropType<IformGroupsItem[]>,
      default: () => {
        return []
      },
    },
    modelValue: {
      // 实际传参
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(props: Iprops, { emit, expose }) {
    const vanFromRef = ref()

    const form = reactive({
      formGroups: props.formGroups,
      formQuery: props.modelValue,
    })

    // 数据变动初始化更新
    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          form.formQuery = val
          init()
        }
      },
      {
        deep: true,
      },
    )

    onBeforeMount(() => {
      init()
    })

    // 展示值初始化
    function init(): void {
      nextTick(() => {
        form.formGroups = props.formGroups.map((item: IformGroupsItem) => {
          // 如果是 van-picker 类型 默认 isNeedVanPopup,isLink = true
          const isVanPicker = (item.targetElement as string) === 'van-picker'
          if (isVanPicker) {
            item.isNeedVanPopup = isVanPicker
            item.isLink = isVanPicker && !item.fieldProps?.disabled
            // 默认
            item.optionAlias = item.optionAlias ?? {
              label: 'text',
              value: 'value',
            }
          }
          // 自定义事件
          item.targetEvent = item.targetEvent ?? {}
          item.isShow = false
          return item
        })
      })
    }

    /**
     * 格式化 Picker 回显值 文本
     */
    function formatterPicker({
      options,
      optionAlias,
      value: modelValueAttrName,
    }: IformGroupsItem): string {
      const optionsItem: any = (options as []).find((item: any) => {
        return (
          item[(optionAlias as IoptionAlias).value] ===
          form.formQuery[modelValueAttrName as string]
        )
      })
      // console.log(optionsItem, '------------optionsItem---', optionAlias)

      return optionsItem
        ? optionsItem[(optionAlias as IoptionAlias).label]
        : null
    }

    /**
     * 格式化 calendar 回显值 文本
     */
    function formatterCalendar({
      separateQuery,
      value: modelValueAttrName,
    }: IformGroupsItem): string {
      // 时间区间回显
      if (separateQuery) {
        return separateQuery.reduce(
          (pre: string, chr: string, index: number) => {
            if (form.formQuery[chr]) {
              return pre + `${index === 1 ? ' 至 ' : ''} ${form.formQuery[chr]}`
            }
            return ''
          },
          '',
        )
      }
      // 单个时间
      return form.formQuery[modelValueAttrName as string] || null
    }

    /**
     *  需要 popup 确认
     */
    function selectConfirm(item: IformGroupsItem, value: any | []): void {
      const {
        targetElement,
        optionAlias,
        value: modelValueAttrName,
        separateQuery,
        multiColumn,
        fieldProps,
        targetEvent: { changeConfirm },
      }: IformGroupsItem = item

      let selectPickName = '' //选中的中文字

      switch (targetElement) {
        case 'van-picker':
          if (multiColumn) {
            // 多列
            form.formQuery[modelValueAttrName as string] = value
            // selectPickName = value.join('-')
          } else {
            form.formQuery[modelValueAttrName as string] =
              value[(optionAlias as IoptionAlias).value as any]
            selectPickName = value[(optionAlias as IoptionAlias).label as any]
          }
          break
        case 'van-calendar':
          // eslint-disable-next-line no-case-declarations
          const valueFormat = (fieldProps as Record<string, any>)[
            'value-format'
          ]

          // 时间区间
          if (separateQuery && Array.isArray(value)) {
            value.forEach((item: any, index: number) => {
              form.formQuery[separateQuery[index]] = new Date(item).format(
                valueFormat,
              )
            })
          } else {
            // 单个时间
            form.formQuery[modelValueAttrName as string] = new Date(
              value,
            ).format(valueFormat)
          }
          break

        default:
          break
      }
      changeConfirm && changeConfirm(selectPickName, item, form.formQuery)
      item.isShow = false
    }

    // 显示弹窗
    function setPopupShow(item: IformGroupsItem) {
      // console.log(item, '----------')
      if (item.fieldProps?.disabled) {
        return
      }
      item.isShow = true
    }

    // 更新 modelValue
    function fieldUpdateModel() {
      emit('update:modelValue', form.formQuery)
    }

    // 获取 api query
    function getApiQuery() {
      const apiQuery: Record<string, any> = {}
      for (let index = 0; index < form.formGroups.length; index++) {
        const { notQuery, value, textTitle } = form.formGroups[index]
        if (!notQuery && !textTitle) {
          apiQuery[value as string] = form.formQuery[value as string]
        }
      }
      return apiQuery
    }

    // 验证表单，支持传入 name 来验证单个或部分表单项
    function validateField(name: string | string[]) {
      return vanFromRef.value.validate(name)
    }

    // 重置表单，支持传入 name 来验证单个或部分表单项
    function resetValidation(name: string | string[]) {
      return vanFromRef.value.resetValidation(name)
    }

    // 滚动到对应表单项的位置，默认滚动到顶部，第二个参数传 false 可滚动至底部
    function scrollToField(name: string, alignToTop: boolean) {
      vanFromRef.value.scrollToField(name, alignToTop)
    }

    // 更新单个 Group Item
    // function updeteGroupItem(name: string) {}

    // 手动 expose 需要暴露给外部的方法
    expose({
      validateField,
      resetValidation,
      scrollToField,
      getApiQuery,
      init,
    })

    return {
      vanFromRef,
      ...toRefs(form),
      formatterPicker,
      formatterCalendar,
      fieldUpdateModel,
      selectConfirm,
      setPopupShow,
    }
  },
})
</script>

<style lang="scss" scoped>
$phaseNumber: 2px; // 一倍图
.input-content-box {
  width: 100%;
  // padding-top: 50 * $phaseNumber;
  overflow-x: hidden;
  box-sizing: border-box;
  .title {
    line-height: 44 * $phaseNumber;
    padding: 0 26 * $phaseNumber;
    font-weight: 400;
    color: #9ea8ab;
    font-size: 16 * $phaseNumber;
    box-sizing: border-box;
    position: relative;
    &::before {
      position: absolute;
      display: block;
      content: '';
      top: 14 * $phaseNumber;
      left: 15 * $phaseNumber;
      width: 3 * $phaseNumber;
      height: 16 * $phaseNumber;
      background: #00b9ef;
      border-radius: 1 * $phaseNumber;
    }
  }
  .field-right-text {
    margin-right: 5px;
    font-size: 14px;
    color: #0d171a;
  }
}
.defined {
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  .label {
    font-weight: bold;
    font-size: 4vw;
    display: inline-block;
    margin-right: var(--van-field-label-margin-right);
  }
}
::v-deep {
  .van-cell {
    padding-left: 18 * $phaseNumber;
    .van-field__label {
      position: relative;
      font-size: 15 * $phaseNumber;
      font-weight: bold;
      color: #0d171a;
      margin-right: 26 * $phaseNumber;
      width: 80 * $phaseNumber;
    }
    .van-field__label--required:before {
      position: absolute;
      left: -8 * $phaseNumber;
      top: 0;
      font-weight: normal;
    }
    textarea {
      width: 100%;
      height: 81 * $phaseNumber;
      border-radius: 4 * $phaseNumber;
      border: 1 * $phaseNumber solid #e1e4e6;
      padding: 9 * $phaseNumber 12 * $phaseNumber;
      box-sizing: border-box;
    }
  }
  .textarea-label {
    display: flex;
    flex-direction: column;
    padding-top: 8 * $phaseNumber;
    .van-field__label {
      margin-bottom: 5 * $phaseNumber;
    }
  }
  .border-bottom {
    position: relative;
    &::before {
      position: absolute;
      display: block;
      content: '';
      bottom: 0;
      left: 15 * $phaseNumber;
      width: 339 * $phaseNumber;
      height: 1 * $phaseNumber;
      transform: scaleY(0.5);
      background: #e5e5e5;
    }
  }
  .hidden-border {
    &::before {
      width: 0;
    }
  }
  .placeholder-color {
    color: #b5bdbf;
  }
}
</style>
