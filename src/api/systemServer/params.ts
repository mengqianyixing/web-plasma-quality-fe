import { defHttp } from '@/utils/http/axios';
import {
  DeleteApiSysParamIdRequest,
  GetApiSysParamsRequest,
  GetApiSysParamsResponse,
  PostApiSysParamRequest,
  PutApiSysParamRequest,
} from '@/api/type/systemParamsManage';

enum Api {
  SYS_PARAMS = '/api/sys/params',
  SYS_PARAMS_RESTFUL = '/api/sys/param',
}

export const getSysParamsList = (params: GetApiSysParamsRequest) =>
  defHttp.get<GetApiSysParamsResponse>({ url: Api.SYS_PARAMS, params });

export const addSysParams = (params: PostApiSysParamRequest) =>
  defHttp.post({ url: Api.SYS_PARAMS_RESTFUL, params });

export const editSysParams = (params: PutApiSysParamRequest) =>
  defHttp.put({ url: Api.SYS_PARAMS_RESTFUL, params });

export const deleteSysParams = (params: DeleteApiSysParamIdRequest['id']) =>
  defHttp.delete({ url: Api.SYS_PARAMS_RESTFUL + '/' + params });
