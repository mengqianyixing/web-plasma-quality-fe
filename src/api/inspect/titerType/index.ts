import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBagTiterTypeBttNoRequest,
  GetApiCoreBagTiterTypeBttNoResponse,
  PutApiCoreBagTiterTypeRequest,
  PutApiCoreBagTiterTypeResponse,
  PostApiCoreBagTiterTypeRequest,
  PostApiCoreBagTiterTypeResponse,
  DeleteApiCoreBagTiterTypeBttNoRequest,
  DeleteApiCoreBagTiterTypeBttNoResponse,
  PostApiCoreBagTiterTypesRequest,
  PostApiCoreBagTiterTypesResponse,
} from '@/api/type/inspectManage';

enum Api {
  LIST = `/api/core/bag/titer/types`,
  FORM = '/api/core/bag/titer/type',
  DT_RE = '/api/core/bag/titer/type/',
}

export const getListApi = (data: PostApiCoreBagTiterTypesRequest) =>
  defHttp.post<PostApiCoreBagTiterTypesResponse>({ url: Api.LIST, data });

export const addTitlerTypeApi = (data: PostApiCoreBagTiterTypeRequest) =>
  defHttp.post<PostApiCoreBagTiterTypeResponse>({ url: Api.FORM, data });

export const updateTitlerTypeApi = (data: PutApiCoreBagTiterTypeRequest) =>
  defHttp.put<PutApiCoreBagTiterTypeResponse>({ url: Api.FORM, data });

export const getTitlerTypeDtApi = ({ bttNo }: GetApiCoreBagTiterTypeBttNoRequest) =>
  defHttp.get<GetApiCoreBagTiterTypeBttNoResponse>({ url: Api.DT_RE + bttNo });

export const removeTitlerTypeApi = ({ bttNo }: DeleteApiCoreBagTiterTypeBttNoRequest) =>
  defHttp.delete<DeleteApiCoreBagTiterTypeBttNoResponse>({ url: Api.DT_RE + bttNo });
