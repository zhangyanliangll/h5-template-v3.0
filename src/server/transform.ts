import qs from 'qs'
import FormData from 'form-data'
import type { RequestParam } from '@/typings/server.d'
import { EnumContentType } from '@/enum'
import { isArray, isFile } from '@/utils/typeof/index'

/**
 * 请求数据的转换
 * @param requestData - 请求数据
 * @param contentType - 请求头的Content-Type
 */
export async function transformRequestData(
  requestData: any | string,
  contentType?: string,
): Promise<any> {
  // application/json类型不处理
  let data = requestData
  // form类型转换
  if (contentType === EnumContentType['form-urlencoded']) {
    data = qs.stringify(requestData)
  }
  // form-data类型转换
  if (contentType === EnumContentType['form-data']) {
    data = await handleFormData(requestData)
  }

  return data
}

async function handleFormData(data: Record<string, any>) {
  const formData = new FormData()
  const entries = Object.entries(data)

  entries.forEach(async ([key, value]) => {
    const isFileType =
      isFile(value) || (isArray(value) && value.length && isFile(value[0]))

    if (isFileType) {
      await transformFile(formData, key, value)
    } else {
      formData.append(key, value)
    }
  })

  return formData
}

/**
 * 接口为上传文件的类型时数据转换
 * @param key - 文件的属性名
 * @param file - 单文件或多文件
 */
async function transformFile(
  formData: FormData,
  key: string,
  file: File[] | File,
) {
  if (isArray(file)) {
    // 多文件
    await Promise.all(
      (file as File[]).map((item) => {
        formData.append(key, item)
        return true
      }),
    )
  } else {
    // 单文件
    formData.append(key, file)
  }
}

/**
 * 处理请求传参格式
 * @param param - 请求参数
 */
export function transformRequestParam(param: RequestParam): any {
  const { url, data, type, responseType, axiosConfig } = param
  const method = param.method || 'GET'
  const isParams = ['GET', 'DELETE'].includes(method)
  // 参数
  const query: Record<string, any> = {
    method,
    url,
    params: isParams ? data : '',
    data: !isParams ? data : '',
    ...axiosConfig,
  }
  // 处理 content-type 类型
  if (type) {
    query.headers = {
      ...query.headers,
      'Content-Type': EnumContentType[type],
    }
  }
  if (responseType) {
    query.responseType = responseType
  }
  return query
}
