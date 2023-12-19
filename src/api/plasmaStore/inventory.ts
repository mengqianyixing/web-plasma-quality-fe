import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBankStockRequest,
  GetApiCoreBankStockResponse,
} from '@/api/type/plasmaStoreManage';

enum Api {
  INVENTORY_DETAIL = ' /api/core/bank/stock',
}

export const inventoryDetailApi = (params: GetApiCoreBankStockRequest) =>
  defHttp.get<GetApiCoreBankStockResponse>({ url: Api.INVENTORY_DETAIL, params });
