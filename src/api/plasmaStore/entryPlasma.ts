import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBankReceptionRequest,
  GetApiCoreBankReceptionResponse,
} from '@/api/type/plasmaStoreManage';

enum Api {
  RECEPTION_DETAIL = '/api/core/bank/reception',
}

export const receptionDetailApi = (params: GetApiCoreBankReceptionRequest) =>
  defHttp.get<GetApiCoreBankReceptionResponse>({ url: Api.RECEPTION_DETAIL, params });
