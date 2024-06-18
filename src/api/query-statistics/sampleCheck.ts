import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchSampleLabRequest,
  GetApiSearchSampleLabResponse,
  GetApiSearchSampleLabCountDetailRequest,
  GetApiSearchSampleLabCountDetailResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/sample/lab',
  DT = '/api/search/sample/lab/count/detail',
  DT2 = '/api/search/sample/lab/check/failed/detail',
  DT3 = '/api/search/sample/lab/check/detail',
}

export const getListApi = (params: GetApiSearchSampleLabRequest) =>
  defHttp.get<GetApiSearchSampleLabResponse>({ url: Api.LIST, params });

export const getDtListApi = (params: GetApiSearchSampleLabCountDetailRequest) =>
  defHttp.get<GetApiSearchSampleLabCountDetailResponse>({ url: Api.DT, params });
export const getDtList2Api = (params: GetApiSearchSampleLabCountDetailRequest) =>
  defHttp.get<GetApiSearchSampleLabCountDetailResponse>({ url: Api.DT2, params });
export const getDtList3Api = (params: GetApiSearchSampleLabCountDetailRequest) =>
  defHttp.get<GetApiSearchSampleLabCountDetailResponse>({ url: Api.DT3, params });
