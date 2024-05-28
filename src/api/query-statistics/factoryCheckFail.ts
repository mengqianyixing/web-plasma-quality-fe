import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchPlasmaFactoryRequest,
  GetApiSearchPlasmaFactoryResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/plasma/factory',
}

export const getListApi = (params: GetApiSearchPlasmaFactoryRequest) =>
  defHttp.get<GetApiSearchPlasmaFactoryResponse>({ url: Api.LIST, params });
