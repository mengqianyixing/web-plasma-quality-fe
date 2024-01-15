/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-27 15:34:55
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-15 10:04:37
 */
import { defHttp } from '@/utils/http/axios';
import {
  PostApiSysDictItemMethodRequest,
  PostApiSysDictItemMethodResponse,
  PutApiSysDictItemMethodRequest,
  PutApiSysDictItemMethodResponse,
  DeleteApiSysDictItemMethodDictItemIdRequest,
  DeleteApiSysDictItemMethodDictItemIdResponse,
  PostApiSysDictItemMethodsRequest,
  PostApiSysDictItemMethodsResponse,
  GetApiSysDictItemMethodsResponse,
  GetApiSysDictItemMethodDictItemIdRequest,
  GetApiSysDictItemMethodDictItemIdResponse,
} from '@/api/type/inspectManage';

enum Api {
  LIST = `/api/sys/dict/item/methods`,
  FORM = '/api/sys/dict/item/method',
  DT_RE = '/api/sys/dict/item/method/',
}

export const getListApi = (data: PostApiSysDictItemMethodsRequest) =>
  defHttp.post<PostApiSysDictItemMethodsResponse>({
    url: Api.LIST,
    data: { ...data, dataDictId: '100004' },
  });

export const getInspectMethodListApi = () =>
  defHttp.get<GetApiSysDictItemMethodsResponse>({ url: Api.LIST });

export const addInspectMethodApi = (data: PostApiSysDictItemMethodRequest) =>
  defHttp.post<PostApiSysDictItemMethodResponse>({
    url: Api.FORM,
    data: { ...data, dataDictId: '100004' },
  });

export const updateInspectMethodApi = (data: PutApiSysDictItemMethodRequest) =>
  defHttp.put<PutApiSysDictItemMethodResponse>({
    url: Api.FORM,
    data: { ...data, dataDictId: '100004' },
  });

export const getInspectMethodDtApi = ({ dictItemId }: GetApiSysDictItemMethodDictItemIdRequest) =>
  defHttp.get<GetApiSysDictItemMethodDictItemIdResponse>({ url: Api.DT_RE + dictItemId });

export const removeInspectMethodApi = ({
  dictItemId,
}: DeleteApiSysDictItemMethodDictItemIdRequest) =>
  defHttp.delete<DeleteApiSysDictItemMethodDictItemIdResponse>({ url: Api.DT_RE + dictItemId });
