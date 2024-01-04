import { defHttp } from '@/utils/http/axios';
import {
  PostApiCoreLabTiterExcelImportRequest,
  PostApiCoreLabTiterExcelImportResponse,
  GetApiCoreLabTiterRequest,
  GetApiCoreLabTiterResponse,
  GetApiCoreLabTiterNameCountRequest,
  GetApiCoreLabTiterNameCountResponse,
  GetApiCoreLabTiterDetailRequest,
  GetApiCoreLabTiterDetailResponse,
  DeleteApiCoreLabTiterRequest,
  DeleteApiCoreLabTiterResponse,
} from '@/api/type/inspectManage';

enum Api {
  LIST = `/api/core/lab/titer`,
  IMPORT = '/api/core/lab/titer/excel/import',
  DT_COUNT = '/api/core/lab/titer/name-count',
  DT = '/api/core/lab/titer/detail',
  REMOVE = '/api/core/lab/titer',
}

export const getListApi = (params: GetApiCoreLabTiterRequest) =>
  defHttp.get<GetApiCoreLabTiterResponse>({
    url: Api.LIST,
    params,
  });

export const importTiterFileApi = (data: PostApiCoreLabTiterExcelImportRequest) =>
  defHttp.uploadFile<PostApiCoreLabTiterExcelImportResponse>(
    {
      url: Api.IMPORT,
    },
    data,
  );
export const getTiterDtCountList = (data: GetApiCoreLabTiterNameCountRequest) =>
  defHttp.get<GetApiCoreLabTiterNameCountResponse>({ url: Api.DT_COUNT, data });

export const getTiterDtList = (params: GetApiCoreLabTiterDetailRequest) =>
  defHttp.get<GetApiCoreLabTiterDetailResponse>({ url: Api.DT, params });

export const deleteTiterApi = (data: DeleteApiCoreLabTiterRequest) =>
  defHttp.delete<DeleteApiCoreLabTiterResponse>({ url: Api.REMOVE, data });
