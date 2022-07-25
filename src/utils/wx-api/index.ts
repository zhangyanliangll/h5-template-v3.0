import { Toast } from 'vant'
import { getWxConfigApi } from '@/api/common'
import { isPro } from '@/config/index'

// 初始化 微信JSDK 配置
export async function initWxConfig(allowApi: string[]): Promise<void> {
  const url = window.location.href.split('#')[0]

  const { appId, timestamp, nonceStr, signature } = await getWxConfigApi({
    url,
  })

  wx.config({
    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，
    // 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，
    // 仅在pc端时才会打印。
    debug: isPro,
    appId, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // 必填，签名
    jsApiList: allowApi,
  })

  wx.ready(() => {
    // config后就会执行 不管是不是成功
  })
  wx.error((res: ObjectType) => {
    // 这个地方的好处就是wx.config配置错误，
    // 会弹出窗口哪里错误，然后根据微信文档查询即可。
    alert('出错了：' + res.errMsg)
  })
}

// 微信扫码功能
export function scanQRCode(needResult = 1): Promise<any> {
  return new Promise((resolve, reject) => {
    wx.ready(() => {
      wx.scanQRCode({
        // 微信扫一扫接口
        desc: 'scanQRCode desc',
        needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: ({ resultStr }: Record<string, any>) => {
          // 当needResult 为 1 时，扫码返回的结果
          resolve(resultStr)
        },
        fail: (error: any) => {
          Toast('请重试')
          setTimeout(() => {
            window.location.reload()
          }, 500)
          reject({
            scan: false,
            error,
          })
        },
      })
    })
  })
}

// 获取本地图片id
export function chooseImage(): Promise<any> {
  return new Promise((resolve, reject) => {
    wx.ready(() => {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: ({ localIds }: Record<string, any>) => {
          // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          resolve(localIds)
        },
        fail: (error: any) => {
          reject({
            chooseImage: false,
            error,
          })
        },
      })
    })
  })
}

// 获取本地图片接口
export async function getLocalImgData(): Promise<any> {
  const localId = await chooseImage()
  return new Promise((resolve) => {
    wx.ready(() => {
      wx.getLocalImgData({
        localId, // 图片的localID
        success: ({ localData }: any) => {
          resolve(localData) // localData是图片的base64数据
        },
      })
    })
  })
}

// 分享config
export async function initWXShareConfig({
  title,
  desc,
  link,
  imgUrl,
}: Record<string, any>): Promise<any> {
  await initWxConfig(['updateAppMessageShareData', 'updateTimelineShareData'])
  wx.ready(() => {
    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
    wx.updateAppMessageShareData({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: () => {
        // 设置成功
      },
      fail: (error: any) => {
        console.log(error)
      },
    })
    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    wx.updateTimelineShareData({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: () => {
        // 设置成功
      },
      fail: (error: any) => {
        console.log(error)
      },
    })
  })
  wx.error((res: any) => {
    alert('出错了：' + res.errMsg)
  })
}
