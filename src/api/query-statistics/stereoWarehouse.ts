import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBatchBloodVolumeStatisticsRequest,
  GetApiCoreBatchBloodVolumeStatisticsResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/batch/blood-volume/statistics',
}

export const getListApi = (params: GetApiCoreBatchBloodVolumeStatisticsRequest) =>
  defHttp.get<GetApiCoreBatchBloodVolumeStatisticsResponse>({ url: Api.LIST, params });
