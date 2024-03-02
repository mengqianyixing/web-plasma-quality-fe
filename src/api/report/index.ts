// @TODO: [API TYPE] 稳定版后再使用 ytt 统一生成类型声明
import { defHttp } from '@/utils/http/axios';
import { UploadFileParams } from '#/axios';
import { AxiosProgressEvent } from 'axios';

/**
 * 获取报表列表
 * @param params
 * @returns
 */
export const getReportList = (params?) => defHttp.get({ url: '/api/report/templates', params });
/**
 * 编辑报表
 * @param params
 * @returns
 */
export const updateReportApi = (params?) => defHttp.post({ url: '/api/report/template', params });
/**
 * 上传模版
 * @param params
 * @returns
 */
export function uploadReportApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) {
  return defHttp.uploadFile(
    {
      url: '/api/report/template/upload',
      onUploadProgress,
    },
    params,
  );
}
