export const wx = window['wx']

export type wxApi =
  // 扫码
  | 'scanQRCode'
  // 分享
  | 'updateAppMessageShareData'
  | 'updateTimelineShareData'
  // 获取本地图片接口
  | 'chooseImage'
  | 'getLocalImgData'
  // 微信支付
  | 'chooseWXPay'
