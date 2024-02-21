/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-27 15:34:55
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-30 17:13:37
 */
import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBankTraySortOutRequest,
  GetApiCoreBankTraySortOutResponse,
  GetApiCoreBankTraySortInRequest,
  GetApiCoreBankTraySortInResponse,
  GetApiCoreBankTraySortOutBoxesRequest,
  GetApiCoreBankTraySortOutBoxesResponse,
  GetApiProductPrepareSortingSortBoxesRequest,
  GetApiProductPrepareSortingSortBoxesResponse,
} from '@/api/type/productionSortingMange';

enum Api {
  OUT_STORE_LIST = `/api/core/bank/tray/sort-out`,
  IN_STORE_LIST = '/api/core/bank/tray/sort-in',
  BOX_LIST = '/api/core/bank/tray/sort-out/boxes',
  SORTING_BOX_LIST = '/api/product/prepare/sorting/sort-boxes',
}

export const getOutStoreListApi = (params: GetApiCoreBankTraySortOutRequest) =>
  defHttp.get<GetApiCoreBankTraySortOutResponse>({
    url: Api.OUT_STORE_LIST,
    params: params,
  });

export const getInStoreListApi = (params: GetApiCoreBankTraySortInRequest) =>
  defHttp.get<GetApiCoreBankTraySortInResponse>({
    url: Api.IN_STORE_LIST,
    params: params,
  });

export const getBoxListApi = (params: GetApiCoreBankTraySortOutBoxesRequest) =>
  defHttp.get<GetApiCoreBankTraySortOutBoxesResponse>({
    url: Api.BOX_LIST,
    params,
  });

export const getSortingBoxListApi = (params: GetApiProductPrepareSortingSortBoxesRequest) =>
  defHttp.get<GetApiProductPrepareSortingSortBoxesResponse>({
    url: Api.SORTING_BOX_LIST,
    params,
  });
