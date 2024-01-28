/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-22 09:12:00
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-26 10:00:10
 */
import { defHttp } from '@/utils/http/axios';
import {
  PostApiSysDictItemRequest,
  PostApiSysDictItemResponse,
  PostApiSysDictItemsRequest,
  PostApiSysDictItemsResponse,
  PostApiSysDictRequest,
  PostApiSysDictResponse,
  PostApiSysDictsRequest,
  PostApiSysDictsResponse,
  PutApiSysDictRequest,
  GetApiSysDictDictIdRequest,
  GetApiSysDictDictIdResponse,
  GetApiSysDictItemDictItemIdRequest,
  GetApiSysDictItemDictItemIdResponse,
  PutApiSysDictItemRequest,
  PutApiSysDictItemResponse,
  PutApiSysDictResponse,
  DeleteApiSysDictDictIdRequest,
  DeleteApiSysDictDictIdResponse,
  DeleteApiSysDictItemDictItemIdRequest,
  DeleteApiSysDictItemDictItemIdResponse,
  PostApiSysDictionaryItemsRequest,
  PostApiSysDictionaryItemsResponse,
  GetApiSysDictLinkDataLinkedDictRequest,
  GetApiSysDictLinkDataLinkedDictResponse,
  PostApiSysItemItemKeyRequest,
  PostApiSysItemItemKeyResponse,
} from '../type/dictionary';

enum Api {
  DICT_LIST = `/api/sys/dicts`,
  DICT_FORM = '/api/sys/dict',
  DICT_DICT_ID = '/api/sys/dict/',
  DICT_ITEM_LIST = '/api/sys/dict/items',
  DICT_ITEM_FORM = '/api/sys/dict/item',
  DICT_ITEM_REMOVE = '/api/sys/dict/item/',
  DICT_ITEM_LIST_BY_NO = '/api/sys/dictionaryItems',
  DICT_ITEM_LIST_BY_NO2 = '/api/sys/item/itemKey',
  DICT_COLUMNS = '/api/sys/dict/linkData/',
}

export const getDictListApi = (params: PostApiSysDictsRequest) =>
  defHttp.post<PostApiSysDictsResponse>({ url: Api.DICT_LIST, params });

export const addDictApi = (params: PostApiSysDictRequest) =>
  defHttp.post<PostApiSysDictResponse>({ url: Api.DICT_FORM, params });

export const updateDictApi = (params: PutApiSysDictRequest) =>
  defHttp.put<PutApiSysDictResponse>({ url: Api.DICT_FORM, params });

export const removeDictApi = ({ dictId }: DeleteApiSysDictDictIdRequest) =>
  defHttp.delete<DeleteApiSysDictDictIdResponse>({ url: `${Api.DICT_DICT_ID}${dictId}` });

export const getDictDtApi = ({ dictId }: GetApiSysDictDictIdRequest) =>
  defHttp.get<GetApiSysDictDictIdResponse>({ url: `${Api.DICT_DICT_ID}${dictId}` });

export const getDictItemListApi = (params: PostApiSysDictItemsRequest) =>
  defHttp.post<PostApiSysDictItemsResponse>({ url: Api.DICT_ITEM_LIST, params });

export const addDictItemApi = (params: PostApiSysDictItemRequest) =>
  defHttp.post<PostApiSysDictItemResponse>({ url: Api.DICT_ITEM_FORM, params });

export const updateDictItemApi = (params: PutApiSysDictItemRequest) =>
  defHttp.put<PutApiSysDictItemResponse>({ url: Api.DICT_ITEM_FORM, params });

export const removeDictItemApi = ({ dictItemId }: DeleteApiSysDictItemDictItemIdRequest) =>
  defHttp.delete<DeleteApiSysDictItemDictItemIdResponse>({
    url: `${Api.DICT_ITEM_REMOVE}${dictItemId}`,
  });

export const getDictItemDtApi = ({ dictItemId }: GetApiSysDictItemDictItemIdRequest) =>
  defHttp.get<GetApiSysDictItemDictItemIdResponse>({
    url: `${Api.DICT_ITEM_REMOVE}${dictItemId}`,
  });
export const getDictItemListByNoApi = (params: PostApiSysDictionaryItemsRequest) =>
  defHttp.post<PostApiSysDictionaryItemsResponse>({
    url: `${Api.DICT_ITEM_LIST_BY_NO}`,
    params,
  });
export const getDictItemListByNo2Api = (params: PostApiSysItemItemKeyRequest) =>
  defHttp.post<PostApiSysItemItemKeyResponse>({
    url: `${Api.DICT_ITEM_LIST_BY_NO2}`,
    params,
  });

export const getDictColumnsApi = ({ linkedDict }: GetApiSysDictLinkDataLinkedDictRequest) =>
  defHttp.get<GetApiSysDictLinkDataLinkedDictResponse>({ url: Api.DICT_COLUMNS + linkedDict });
