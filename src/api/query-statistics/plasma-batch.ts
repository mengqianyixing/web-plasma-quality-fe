import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBatchPlasmaStatisticRequest,
  GetApiCoreBatchPlasmaStatisticResponse,
  GetApiCoreBatchQuarantineStatisticRequest,
  GetApiCoreBatchQuarantineStatisticResponse,
} from '@/api/type/queryStatistics';

enum Api {
  Plasma_Batch_Statistics = '/api/core/batch/plasma/statistic',
  Plasma_Batch_Quarantine_Statistics = '/api/core/batch/quarantine/statistic',
}

export const getPlasmaBatchList = (params: GetApiCoreBatchPlasmaStatisticRequest) =>
  defHttp.get<GetApiCoreBatchPlasmaStatisticResponse>(
    { url: Api.Plasma_Batch_Statistics, params },
    { joinParamsToUrl: true },
  );

export const getPlasmaBatchListByQuarantine = (params: GetApiCoreBatchQuarantineStatisticRequest) =>
  defHttp.get<GetApiCoreBatchQuarantineStatisticResponse>(
    { url: Api.Plasma_Batch_Quarantine_Statistics, params },
    { joinParamsToUrl: true },
  );
