import { defHttp } from '@/utils/http/axios';

import {
  GetApiSysLogOperationsModuleNameRequest,
  GetApiSysLogOperationsModuleNameResponse,
  GetApiSysLogsRequest,
  GetApiSysLogsResponse,
} from '@/api/type/logsMange';

enum Api {
  LIST = '/api/sys/logs',
  SELECT = '/api/sys/log/operations/',
}

export const getListApi = (params: GetApiSysLogsRequest) =>
  defHttp.get<GetApiSysLogsResponse>({ url: Api.LIST, params });

export const getSelectListApi = (params: GetApiSysLogOperationsModuleNameRequest) =>
  defHttp.get<GetApiSysLogOperationsModuleNameResponse>({ url: Api.SELECT + params.moduleName });
