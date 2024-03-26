// @TODO: [API TYPE] 稳定版后再使用 ytt 统一生成类型声明
import { defHttp } from '@/utils/http/axios';
import { UploadFileParams } from '#/axios';
import { AxiosProgressEvent } from 'axios';
import { useMessage } from '@/hooks/web/useMessage';
import { PutApiReportContentRequest } from '@/api/type/report';

const { createErrorModal } = useMessage();
let reportPrintParams: PutApiReportContentRequest = {
  reportKey: '',
  contentKey: '',
};
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

/**
 * 获取报表pdf
 * @param params
 * @returns
 */
export const getReportApi = (params: PutApiReportContentRequest) => {
  reportPrintParams = params;
  return defHttp
    .get(
      { url: '/api/report/preview-pdf', params, responseType: 'blob' },
      { isTransformResponse: false },
    )
    .then((res) => {
      if (res.type !== 'application/json') {
        return res;
      } else {
        const reader = new FileReader();
        reader.onloadend = function () {
          const jsonDataAsText = reader.result as string;
          try {
            const jsonObject = JSON.parse(jsonDataAsText);
            jsonObject.msg && createErrorModal({ title: '错误提示', content: jsonObject.msg });
          } catch (error) {
            console.error('Error parsing JSON string:', error);
          }
        };
        // 第四步：开始读取Blob为文本
        reader.readAsText(res);
        return Promise.reject();
      }
    });
};

export const updateReportPrintApi = () =>
  defHttp.put({
    url: '/api/report/content',
    params: <PutApiReportContentRequest>reportPrintParams,
  });
