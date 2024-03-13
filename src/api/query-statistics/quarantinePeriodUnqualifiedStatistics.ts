import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBagUnqualifiedStatisticQuarantineRequest,
  GetApiCoreBagUnqualifiedStatisticQuarantineResponse,
  GetApiCoreBagUnqualifiedStatisticQuarantineDetailRequest,
  GetApiCoreBagUnqualifiedStatisticQuarantineDetailResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/bag/unqualified/statistic-quarantine',
  DT = '/api/core/bag/unqualified/statistic-quarantine/detail',
}

export const getListApi = (params: GetApiCoreBagUnqualifiedStatisticQuarantineRequest) =>
  defHttp.get<GetApiCoreBagUnqualifiedStatisticQuarantineResponse>({ url: Api.LIST, params });

export const getDtListApi = (params: GetApiCoreBagUnqualifiedStatisticQuarantineDetailRequest) =>
  defHttp.get<GetApiCoreBagUnqualifiedStatisticQuarantineDetailResponse>({ url: Api.DT, params });
