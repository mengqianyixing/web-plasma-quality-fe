import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBatchPlasmaInStoreRequest,
  GetApiCoreBatchPlasmaInStoreResponse,
} from '@/api/type/plasmaStoreManage';

enum Api {
  PLASMA_INBOUND_LIST = '/api/core/batch/plasma/in-store',
}

export const getPlasmaInboundList = (params: GetApiCoreBatchPlasmaInStoreRequest) =>
  defHttp.get<GetApiCoreBatchPlasmaInStoreResponse>(
    { url: Api.PLASMA_INBOUND_LIST, params },
    { joinParamsToUrl: true },
  );
