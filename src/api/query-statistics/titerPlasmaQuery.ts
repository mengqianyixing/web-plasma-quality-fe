import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchPlasmaPrivilegeDetailsRequest,
  GetApiSearchPlasmaPrivilegeDetailsResponse,
  GetApiSearchPlasmaPrivilegeRequest,
  GetApiSearchPlasmaPrivilegeResponse,
  GetApiSearchPlasmaPrivilegeTotalRequest,
  GetApiSearchPlasmaPrivilegeTotalResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/plasma/privilege',
  DT = '/api/search/plasma/privilege/details',
  COUNT = '/api/search/plasma/privilege/total',
}

export const getListApi = (params: GetApiSearchPlasmaPrivilegeRequest) =>
  defHttp.get<GetApiSearchPlasmaPrivilegeResponse>({ url: Api.LIST, params });

export const getDtApi = (params: GetApiSearchPlasmaPrivilegeDetailsRequest) =>
  defHttp.get<GetApiSearchPlasmaPrivilegeDetailsResponse>({ url: Api.DT, params });

export const getCountApi = (params: GetApiSearchPlasmaPrivilegeTotalRequest) =>
  defHttp.get<GetApiSearchPlasmaPrivilegeTotalResponse>({ url: Api.COUNT, params });
