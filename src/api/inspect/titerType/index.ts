/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-27 10:06:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-15 10:03:58
 */
import { defHttp } from '@/utils/http/axios';
import {
  GetApiSysDictItemAlenceDictItemIdResponse,
  GetApiSysDictItemAlenceDictItemIdRequest,
  PostApiSysDictItemAlencesRequest,
  PostApiSysDictItemAlencesResponse,
  PostApiSysDictItemAlenceRequest,
  PostApiSysDictItemAlenceResponse,
  PutApiSysDictItemAlenceRequest,
  PutApiSysDictItemAlenceResponse,
  DeleteApiSysDictItemAlenceDictItemIdRequest,
  DeleteApiSysDictItemAlenceDictItemIdResponse,
} from '@/api/type/inspectManage';

enum Api {
  LIST = `/api/sys/dict/item/alences`,
  FORM = '/api/sys/dict/item/alence',
  DT_RE = '/api/sys/dict/item/alence/',
}

export const getListApi = (data: PostApiSysDictItemAlencesRequest) =>
  defHttp.post<PostApiSysDictItemAlencesResponse>({
    url: Api.LIST,
    data: { ...data, dataDictId: '100005' },
  });

export const addTitlerTypeApi = (data: PostApiSysDictItemAlenceRequest) =>
  defHttp.post<PostApiSysDictItemAlenceResponse>({
    url: Api.FORM,
    data: { ...data, dataDictId: '100005' },
  });

export const updateTitlerTypeApi = (data: PutApiSysDictItemAlenceRequest) =>
  defHttp.put<PutApiSysDictItemAlenceResponse>({
    url: Api.FORM,
    data: { ...data, dataDictId: '100005' },
  });

export const getTitlerTypeDtApi = ({ dictItemId }: GetApiSysDictItemAlenceDictItemIdRequest) =>
  defHttp.get<GetApiSysDictItemAlenceDictItemIdResponse>({ url: Api.DT_RE + dictItemId });

export const removeTitlerTypeApi = ({ dictItemId }: DeleteApiSysDictItemAlenceDictItemIdRequest) =>
  defHttp.delete<DeleteApiSysDictItemAlenceDictItemIdResponse>({ url: Api.DT_RE + dictItemId });
