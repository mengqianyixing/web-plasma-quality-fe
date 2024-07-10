import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchPlasmaPrivilegeCountRequest,
  GetApiSearchPlasmaPrivilegeCountResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/plasma/privilege/count',
}

export const getListApi = (params: GetApiSearchPlasmaPrivilegeCountRequest) =>
  defHttp.get<GetApiSearchPlasmaPrivilegeCountResponse>({ url: Api.LIST, params });
