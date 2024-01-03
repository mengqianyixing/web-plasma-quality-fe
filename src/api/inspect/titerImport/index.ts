import { defHttp } from '@/utils/http/axios';
import {
  PostApiCoreLabTiterExcelImportRequest,
  PostApiCoreLabTiterExcelImportResponse,
  GetApiCoreLabTiterRequest,
  GetApiCoreLabTiterResponse,
} from '@/api/type/inspectManage';

enum Api {
  LIST = `/api/core/lab/titer`,
  IMPORT = '/api/core/lab/titer/excel/import',
}

export const getListApi = (data: GetApiCoreLabTiterRequest) =>
  defHttp.get<GetApiCoreLabTiterResponse>({
    url: Api.LIST,
    data: data,
  });

export const importTiterFileApi = (data: PostApiCoreLabTiterExcelImportRequest) =>
  defHttp.uploadFile<PostApiCoreLabTiterExcelImportResponse>(
    {
      url: Api.IMPORT,
    },
    data,
  );
