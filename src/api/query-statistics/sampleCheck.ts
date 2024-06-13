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
}

export const getListApi = (params: GetApiSearchSampleLabRequest) =>
  defHttp.get<GetApiSearchSampleLabResponse>({ url: Api.LIST, params });

export const getDtListApi = (params: GetApiSearchSampleLabCountDetailRequest) =>
  defHttp.get<GetApiSearchSampleLabCountDetailResponse>({ url: Api.DT, params });
