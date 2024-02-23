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
  PostApiCoreLabRequestItemRequest,
  PostApiCoreLabRequestItemResponse,
  PutApiCoreLabRequestItemRequest,
  PutApiCoreLabRequestItemResponse,
  DeleteApiCoreLabRequestItemRequest,
  DeleteApiCoreLabRequestItemResponse,
  PostApiCoreLabRequestItemsRequest,
  PostApiCoreLabRequestItemsResponse,
  PostApiCoreLabRequestItemSingleRequest,
  PostApiCoreLabRequestItemSingleResponse,
} from '@/api/type/inspectManage';

enum Api {
  LIST = `/api/core/lab/request/items`,
  FORM = '/api/core/lab/request/item',
  DT = '/api/core/lab/request/item/single',
}

export const getListApi = (data: PostApiCoreLabRequestItemsRequest) =>
  defHttp.post<PostApiCoreLabRequestItemsResponse>({
    url: Api.LIST,
    data,
  });
export const addApi = (data: PostApiCoreLabRequestItemRequest) =>
  defHttp.post<PostApiCoreLabRequestItemResponse>({ url: Api.FORM, data });

export const updateApi = (data: PutApiCoreLabRequestItemRequest) =>
  defHttp.put<PutApiCoreLabRequestItemResponse>({
    url: Api.FORM,
    data,
  });
export const removeApi = (data: DeleteApiCoreLabRequestItemRequest) =>
  defHttp.delete<DeleteApiCoreLabRequestItemResponse>({
    url: Api.FORM,
    data,
  });
export const getDtApi = (data: PostApiCoreLabRequestItemSingleRequest) =>
  defHttp.post<PostApiCoreLabRequestItemSingleResponse>({ url: Api.DT, data });
