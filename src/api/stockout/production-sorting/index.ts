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
  GetApiProductPrepareSortingInTraiesRequest,
  GetApiProductPrepareSortingInTraiesResponse,
  GetApiProductPrepareSortingOutTraiesRequest,
  GetApiProductPrepareSortingOutTraiesResponse,
  GetApiProductPrepareSortingOutTrayBoxesTrayNoRequest,
  GetApiProductPrepareSortingOutTrayBoxesTrayNoResponse,
  GetApiProductPrepareSortingInTrayBoxesRequest,
  GetApiProductPrepareSortingInTrayBoxesResponse,
} from '@/api/type/productionSortingMange';

enum Api {
  OUT_STORE_LIST = `/api/product/prepare/sorting/out-traies`,
  IN_STORE_LIST = '/api/product/prepare/sorting/in-traies',
  BOX_LIST = '/api/product/prepare/sorting/out-tray-boxes/',
  SORTING_BOX_LIST = '/api/product/prepare/sorting/in-tray-boxes',
}

export const getOutStoreListApi = (params: GetApiProductPrepareSortingOutTraiesRequest) =>
  defHttp.get<GetApiProductPrepareSortingOutTraiesResponse>({
    url: Api.OUT_STORE_LIST,
    params: params,
  });

export const getInStoreListApi = (params: GetApiProductPrepareSortingInTraiesRequest) =>
  defHttp.get<GetApiProductPrepareSortingInTraiesResponse>({
    url: Api.IN_STORE_LIST,
    params: params,
  });

export const getBoxListApi = (params: GetApiProductPrepareSortingOutTrayBoxesTrayNoRequest) =>
  defHttp.get<GetApiProductPrepareSortingOutTrayBoxesTrayNoResponse>({
    url: Api.BOX_LIST + params.trayNo,
  });

export const getSortingBoxListApi = (params: GetApiProductPrepareSortingInTrayBoxesRequest) =>
  defHttp.get<GetApiProductPrepareSortingInTrayBoxesResponse>({
    url: Api.SORTING_BOX_LIST,
    params,
  });
