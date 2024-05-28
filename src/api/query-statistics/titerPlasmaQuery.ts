import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchPlasmaPrivilegeDetailsRequest,
  GetApiSearchPlasmaPrivilegeDetailsResponse,
  GetApiSearchPlasmaPrivilegeRequest,
  GetApiSearchPlasmaPrivilegeResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/plasma/privilege',
  DT = '/api/search/plasma/privilege/details',
}

export const getListApi = (params: GetApiSearchPlasmaPrivilegeRequest) =>
  defHttp.get<GetApiSearchPlasmaPrivilegeResponse>({ url: Api.LIST, params });

export const getDtApi = (params: GetApiSearchPlasmaPrivilegeDetailsRequest) =>
  defHttp.get<GetApiSearchPlasmaPrivilegeDetailsResponse>({ url: Api.DT, params });
