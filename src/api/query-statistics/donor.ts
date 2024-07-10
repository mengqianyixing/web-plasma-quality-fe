import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreDonorListRequest,
  PostApiCoreDonorListResponse,
  PostApiCoreDonorPlasmaRequest,
  PostApiCoreDonorPlasmaResponse,
  PostApiCoreDonorCallbacksRequest,
  PostApiCoreDonorCallbacksResponse,
  GetApiCoreDonorChartCardNoRequest,
  GetApiCoreDonorChartCardNoResponse,
} from '@/api/type/donorQuery';

enum Api {
  // 浆员明细
  DONOR_INFO = '/api/search/donor/info',
  // 血浆明细
  BATCH_INFO = '/api/core/donor/plasma',
  // 回访明细
  CALLBACKS_INFO = '/api/core/donor/callbacks',
  // 效价趋势图
  DONOR_CHART = '/api/core/donor/chart',
}

export const donorInfoListApi = (params: PostApiCoreDonorListRequest) =>
  defHttp.get<PostApiCoreDonorListResponse>({ url: Api.DONOR_INFO + '/' + params.cardNo });

export const batchInfoListApi = (params: PostApiCoreDonorPlasmaRequest) =>
  defHttp.post<PostApiCoreDonorPlasmaResponse>({ url: Api.BATCH_INFO, params });

export const callbacksInfoListApi = (params: PostApiCoreDonorCallbacksRequest) =>
  defHttp.post<PostApiCoreDonorCallbacksResponse>({ url: Api.CALLBACKS_INFO, params });

export const donorChartApi = (params: GetApiCoreDonorChartCardNoRequest['cardNo']) =>
  defHttp.get<GetApiCoreDonorChartCardNoResponse>({ url: Api.DONOR_CHART + '/' + params });
