import { defineComponent, h } from 'vue'

const name = 'dynamic-component'

export default defineComponent({
  name,
  props: {
    renderItem: {
      type: Function,
      required: true,
    },
    sourceData: {
      type: Object,
      default() {
        return {}
      },
    },
    formItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  render() {
    return this.renderItem
      ? this.renderItem(h, this.sourceData, this.formItem)
      : null
  },
})
