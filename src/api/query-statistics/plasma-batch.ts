import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBatchPlasmaStatisticRequest,
  GetApiCoreBatchPlasmaStatisticResponse,
  GetApiSearchBankPlasmaStatisticStockRequest,
  GetApiSearchBankPlasmaStatisticStockResponse,
  GetApiSearchBankPlasmaStatisticStockTotalRequest,
  GetApiSearchBankPlasmaStatisticStockTotalResponse,
  GetApiSearchBatchQuarantineStatisticRequest,
  GetApiSearchBatchQuarantineStatisticResponse,
} from '@/api/type/queryStatistics';

enum Api {
  Plasma_Batch_Statistics = '/api/core/batch/plasma/statistic',
  Plasma_Batch_Quarantine_Statistics = '/api/search/batch/quarantine/statistic',
  Plasma_Batch_Inventory_Statistics = '/api/search/bank/plasma/statistic/stock',
  Plasma_Batch_Inventory_Statistics_Total = '/api/search/bank/plasma/statistic/stock-total',
}

export const getPlasmaBatchList = (params: GetApiCoreBatchPlasmaStatisticRequest) =>
  defHttp.get<GetApiCoreBatchPlasmaStatisticResponse>(
    { url: Api.Plasma_Batch_Statistics, params },
    { joinParamsToUrl: true },
  );

export const getPlasmaBatchListByQuarantine = (
  params: GetApiSearchBatchQuarantineStatisticRequest,
) =>
  defHttp.get<GetApiSearchBatchQuarantineStatisticResponse>(
    { url: Api.Plasma_Batch_Quarantine_Statistics, params },
    { joinParamsToUrl: true },
  );

export const getPlasmaBatchListByInventory = (
  params: GetApiSearchBankPlasmaStatisticStockRequest,
) =>
  defHttp.get<GetApiSearchBankPlasmaStatisticStockResponse>(
    { url: Api.Plasma_Batch_Inventory_Statistics, params },
    { joinParamsToUrl: true },
  );

export const getPlasmaBatchListByInventoryTotal = (
  params: GetApiSearchBankPlasmaStatisticStockTotalRequest,
) =>
  defHttp.get<GetApiSearchBankPlasmaStatisticStockTotalResponse>(
    { url: Api.Plasma_Batch_Inventory_Statistics_Total, params },
    { joinParamsToUrl: true },
  );
