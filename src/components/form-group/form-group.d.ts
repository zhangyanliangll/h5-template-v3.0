export interface IformGroupsItem {
  [key: string]: any
  label: string | number
  targetElement?: string
  fieldEvent?: string
  value?: string
  fixedValue?: string
  isLink?: boolean
  readonly?: boolean
  multiColumn?: boolean
  class?: string | ObjectType[]
  isHiddenBorder?: boolean
  isNeedVanPopup?: boolean
  isShow?: boolean
  fieldProps?: ObjectType
  popupProps?: ObjectType
  options?: ObjectType[]
  optionAlias?: IoptionAlias
  separateQuery?: [string, string]
  rules?: ObjectType[]
  renderItem?: ObjectType
}

export interface Iprops {
  formGroups: IformGroupsItem[]
  modelValue: ObjectType
}

export interface IoptionAlias {
  label: string
  value: string
}

export interface IFormGroup {
  /**
   * 验证表单，支持传入 name 来验证单个或部分表单项
   * @param name 字段名
   */
  validateField(name?: string | string[]): Promise
  /**
   * 重置表单项的验证提示，支持传入 name 来重置单个或部分表单项
   * @param name 字段名
   */
  resetValidation(name?: string | string[]): Promise
  /**
   * 滚动到对应表单项的位置，默认滚动到顶部，第二个参数传 false 可滚动至底部
   * @param name 字段名
   */
  scrollToField(name: string, alignToTop?: boolean): null
  /**
   * 获取api query
   */
  getApiQuery(): any
  /**
   * 初始化form
   */
  init(): any
}
