import { defHttp } from '@/utils/http/axios';
import {
  PostApiCoreLabTiterExcelImportRequest,
  PostApiCoreLabTiterExcelImportResponse,
  GetApiCoreLabTiterRequest,
  GetApiCoreLabTiterResponse,
  GetApiCoreLabTiterNameCountBsNoRequest,
  GetApiCoreLabTiterNameCountBsNoResponse,
  GetApiCoreLabTiterDetailRequest,
  GetApiCoreLabTiterDetailResponse,
  DeleteApiCoreLabTiterBsNoRequest,
  DeleteApiCoreLabTiterBsNoResponse,
} from '@/api/type/inspectManage';

enum Api {
  LIST = `/api/core/lab/titer`,
  IMPORT = '/api/core/lab/titer/excel/import',
  DT_COUNT = '/api/core/lab/titer/name-count/',
  DT = '/api/core/lab/titer/detail',
  REMOVE = '/api/core/lab/titer/',
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
export const getTiterDtCountList = ({ bsNo }: GetApiCoreLabTiterNameCountBsNoRequest) =>
  defHttp.get<GetApiCoreLabTiterNameCountBsNoResponse>({ url: Api.DT_COUNT + bsNo });

export const getTiterDtList = (data: GetApiCoreLabTiterDetailRequest) =>
  defHttp.get<GetApiCoreLabTiterDetailResponse>({ url: Api.DT, data });

export const deleteTiterApi = ({ bsNo }: DeleteApiCoreLabTiterBsNoRequest) =>
  defHttp.delete<DeleteApiCoreLabTiterBsNoResponse>({ url: Api.REMOVE + bsNo });
