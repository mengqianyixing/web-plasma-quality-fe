import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreLabSamplesLabUnqualifiedItemRequest,
  GetApiCoreLabSamplesLabUnqualifiedItemResponse,
  GetApiSearchSampleResultRequest,
  GetApiSearchSampleResultResponse,
  GetApiSearchSampleLabItemRequest,
  GetApiSearchSampleLabItemResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/sample/result',
  DT = '/api/search/sample/lab/item',
  UN_DT = '/api/core/lab/samples/lab/unqualified/item',
}

export const getListApi = (params: GetApiSearchSampleResultRequest) =>
  defHttp.get<GetApiSearchSampleResultResponse>({ url: Api.LIST, params });

export const getDtApi = (params: GetApiSearchSampleLabItemRequest) =>
  defHttp.get<GetApiSearchSampleLabItemResponse>({ url: Api.DT, params });

export const getUnDtApi = (params: GetApiCoreLabSamplesLabUnqualifiedItemRequest) =>
  defHttp.get<GetApiCoreLabSamplesLabUnqualifiedItemResponse>({ url: Api.UN_DT, params });
