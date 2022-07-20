import qs from 'qs'
import { EnumContentType } from '@/typings/enum'
/**
 * 请求数据的转换
 * @param requestData - 请求数据
 * @param contentType - 请求头的Content-Type
 */
export function transformRequestData(
  requestData: string | any,
  contentType?: string,
): Record<string, any> {
  // application/json类型不处理
  let data = requestData
  // form类型转换
  if (
    typeof requestData === 'string' &&
    contentType === EnumContentType.formUrlencoded
  ) {
    data = qs.stringify(requestData)
  }

  return data
}
