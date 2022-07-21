/**
 * @description: 清空cookie
 * @param {*} void
 * @return {*}
 */
export const cleanCookie = (): void => {
  const date = new Date()
  date.setTime(date.getTime() - 10000)
  // eslint-disable-next-line no-useless-escape
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  console.log('需要删除的cookie名字：' + keys)
  if (keys) {
    // eslint-disable-next-line prettier/prettier
    for (let i = keys.length; i--;)
      document.cookie =
        keys[i] + '=0; expire=' + date.toUTCString() + '; path=/'
  }
}

/**
 * @description: 设置cookie
 * @param {string} name
 * @param {string} value
 * @return {*}
 */
export const setCookie = (name: string, value: string): void => {
  document.cookie = name + '=' + escape(value)
}

/**
 * @description: 是否是微信
 * @param {*}
 * @return {boolean}
 */
export function isWxAgent(): boolean {
  const browser: any = navigator.userAgent.toLowerCase()
  return browser.match(/MicroMessenger/i) == 'micromessenger'
}

/**
 * @description: 判断安卓和ios、Pc
 * @param {*} string
 * @return {*}
 */
export const getPlatform = (): string => {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isAndroid) {
    return 'Android'
  } else if (isIOS) {
    return 'IOS'
  } else {
    return 'PC'
  }
}

/**
 * @description: 防抖函数
 * @param {*}
 * @return {*}
 */
export function debounce(
  func: (...args: any) => void,
  delay = 500,
): (...args: any) => void {
  let timeout: any = null
  return function (this: any, ...args: any) {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * @description: 节流函数
 * @param {*}
 * @return {*}
 */
export function throttle(
  func: (...args: any) => void,
  delay = 500,
): (...args: any) => void {
  let timeout: any = null
  return function (this: any, ...args: any) {
    if (timeout) {
      return
    }
    timeout = setTimeout(() => {
      func.apply(this, args)
      clearTimeout(timeout)
      timeout = null
    }, delay)
  }
}

const fillImage = (selectorName: string, canvas: HTMLCanvasElement) => {
  const target = document.querySelector(selectorName) as HTMLElement
  if (target) {
    // target.appendChild(canvas)
    target.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
  }
}

// 生成水印背景
export function createWaterMark(
  text: string, // 文本
  selectorName: string | string[], // 需要渲染的dom节点
  rowNumber = 2, // 一行展示多少条
  height = 80, // canvas 图片高度
  rotateAngle = -15, // 倾斜角度
  style?: {
    font?: string // 样式
    fillStyle?: string // 填充样式的字体颜色
  },
  config?: {
    offsetX?: number // x轴 begin drawing the text
    offsetY?: number // y轴 begin drawing the text
  },
): void {
  const clientWith = document.documentElement.clientWidth
  const canvas: HTMLCanvasElement = document.createElement('canvas')

  canvas.width = Math.round(clientWith / rowNumber)
  canvas.height = height
  canvas.style.display = 'none'

  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.font =
      (style && style.font) || '400 14px PingFangSC-Regular, PingFang SC'
    ctx.fillStyle = (style && style.fillStyle) || '#e6ebed'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.rotate((rotateAngle * Math.PI) / 180)

    // x 轴从宽度的1/3开始绘制，而y轴则是角度加上 1/2的距离
    const fillX = canvas.width / 3
    const fillY = canvas.height / 2 + Math.abs(rotateAngle)
    ctx.fillText(
      text,
      config && config.offsetX ? config.offsetX : fillX,
      config && config.offsetY ? config.offsetY : fillY,
    )
  }

  if (Array.isArray(selectorName)) {
    for (let i = 0; i < selectorName.length; i++) {
      fillImage(selectorName[i], canvas)
    }
  } else {
    fillImage(selectorName, canvas)
  }
}

/**
 * @description: 获取图片
 * @param {string} fileName // 图片名字
 * @return {*}
 */
export function getImgSrc(fileName: string): string {
  try {
    return require(`@/assets/images/${fileName}`)
  } catch (error) {
    return 'error.png'
  }
}

/**
 * 月份加减
 * @param yearMonthDay 值  2020-08-19或2020-08
 * @param monthNum 值 要加减的月份 -5或5
 */
export function addMonths(yearMonthDay: string, monthNum: number): string {
  if (!yearMonthDay) {
    const today = new Date()
    yearMonthDay = `${today.getFullYear()}-${today.getMonth() + 1}`
  }
  const arr = yearMonthDay.split('-') // 2020-08-19或2020-08
  let year = parseInt(arr[0])
  let month: any = parseInt(arr[1])
  month = month + monthNum
  if (month > 12) {
    //月份加
    const yearNum = parseInt(String((month - 1) / 12))
    month = month % 12 == 0 ? 12 : month % 12
    year += yearNum
  } else if (month <= 0) {
    //月份减
    month = Math.abs(month)
    const yearNum = parseInt(String((month + 12) / 12))
    year -= yearNum
  }
  month = month < 10 ? '0' + month : month
  return year + '-' + month
}
