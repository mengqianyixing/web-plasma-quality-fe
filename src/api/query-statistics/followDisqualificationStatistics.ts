import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBagUnqualifiedStatisticTrackRenewalRequest,
  GetApiCoreBagUnqualifiedStatisticTrackRenewalResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/bag/unqualified/statistic-track-renewal',
  DT = '/api/core/bag/unqualified/statistic-track-renewal/detail',
}

export const getListApi = (params: GetApiCoreBagUnqualifiedStatisticTrackRenewalRequest) =>
  defHttp.get<GetApiCoreBagUnqualifiedStatisticTrackRenewalResponse>({ url: Api.LIST, params });

export const getDtListApi = (params: GetApiCoreBagUnqualifiedStatisticTrackRenewalRequest) =>
  defHttp.get<GetApiCoreBagUnqualifiedStatisticTrackRenewalResponse>({ url: Api.DT, params });
