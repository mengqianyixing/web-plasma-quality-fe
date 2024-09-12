import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchBankStockWarningRequest,
  GetApiSearchBankStockWarningResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/bank/stock/warning',
}

export const getListApi = (params: GetApiSearchBankStockWarningRequest) =>
  defHttp.get<GetApiSearchBankStockWarningResponse>({ url: Api.LIST, params });
