import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBankStockRequest,
  GetApiCoreBankStockResponse,
} from '@/api/type/plasmaStoreManage';
import { GetApiSysDictItemTiterLevelResponse } from '@/api/type/inspectManage';

enum Api {
  INVENTORY_DETAIL = '/api/core/bank/stock',
  DILUTION_TYPE = '/api/sys/dict/item/titer-level',
}

export const inventoryDetailApi = (params: GetApiCoreBankStockRequest) =>
  defHttp.get<GetApiCoreBankStockResponse>({ url: Api.INVENTORY_DETAIL, params });

export const getDilutionTypeApi = () =>
  defHttp.get<GetApiSysDictItemTiterLevelResponse>({ url: Api.DILUTION_TYPE });
