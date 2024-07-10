import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchBankStockRequest,
  GetApiSearchBankStockResponse,
} from '@/api/type/plasmaStoreManage';
import { GetApiSysDictItemTiterLevelResponse } from '@/api/type/inspectManage';

enum Api {
  INVENTORY_DETAIL = '/api/search/bank/stock',
  DILUTION_TYPE = '/api/sys/dict/item/titer-level',
}

export const inventoryDetailApi = (params: GetApiSearchBankStockRequest) =>
  defHttp.get<GetApiSearchBankStockResponse>({ url: Api.INVENTORY_DETAIL, params });

export const getDilutionTypeApi = () =>
  defHttp.get<GetApiSysDictItemTiterLevelResponse>({ url: Api.DILUTION_TYPE });
