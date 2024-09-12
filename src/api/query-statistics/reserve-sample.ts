import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchSampleRetainBatchDetailRequest,
  GetApiSearchSampleRetainBatchDetailResponse,
  GetApiSearchSampleRetainBatchRequest,
  GetApiSearchSampleRetainBatchResponse,
  GetApiSearchSampleRetainPackRequest,
  GetApiSearchSampleRetainPackResponse,
} from '@/api/type/sampleManage';

enum Api {
  SAMPLE_RETAIN_BATCH_LIST = '/api/search/sample/retain/batch',
  PACK_DETAIL = '/api/search/sample/retain/pack',
  Batch_detail = '/api/search/sample/retain/batch-detail',
}

export const getRetainBatchList = (params: GetApiSearchSampleRetainBatchRequest) =>
  defHttp.get<GetApiSearchSampleRetainBatchResponse>(
    {
      url: Api.SAMPLE_RETAIN_BATCH_LIST,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const getRetainSamplePackDetail = (params: GetApiSearchSampleRetainPackRequest) =>
  defHttp.get<GetApiSearchSampleRetainPackResponse>(
    {
      url: Api.PACK_DETAIL,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const getRetainSampleBatchDetail = (params: GetApiSearchSampleRetainBatchDetailRequest) =>
  defHttp.get<GetApiSearchSampleRetainBatchDetailResponse>(
    {
      url: Api.Batch_detail,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );
