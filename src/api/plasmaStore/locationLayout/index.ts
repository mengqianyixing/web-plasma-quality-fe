/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-20 10:13:00
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-23 16:41:08
 */
import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBankLocationLayoutRequest,
  GetApiCoreBankLocationLayoutResponse,
  GetApiCoreBankLocationLayoutBatchesResponse,
  GetApiCoreBankLocationLayoutBatchesRequest,
  GetApiCoreBankLocationLayoutBoxesRequest,
  GetApiCoreBankLocationLayoutBoxesResponse,
  GetApiCoreBankLocationLayoutDetailRequest,
  GetApiCoreBankLocationLayoutDetailResponse,
  GetApiCoreBankLocationLayoutSummaryLocationNoRequest,
  GetApiCoreBankLocationLayoutSummaryLocationNoResponse,
} from '@/api/type/plasmaStoreManage';

enum Api {
  LAYOUT = `/api/core/bank/location-layout`,
  BATCH_LIST = '/api/core/bank/location-layout/batches',
  BOX_LIST = '/api/core/bank/location-layout/boxes',
  DT_LIST = '/api/core/bank/location-layout/detail',
  SUMMARY = '/api/core/bank/location-layout/summary/',
}

export const getLayoutApi = (params: GetApiCoreBankLocationLayoutRequest) =>
  defHttp.get<GetApiCoreBankLocationLayoutResponse>({ url: Api.LAYOUT, params });

export const getBatchListApi = (params: GetApiCoreBankLocationLayoutBatchesRequest) =>
  defHttp.get<GetApiCoreBankLocationLayoutBatchesResponse>({ url: Api.BATCH_LIST, params });

export const getBoxListApi = (params: GetApiCoreBankLocationLayoutBoxesRequest) =>
  defHttp.get<GetApiCoreBankLocationLayoutBoxesResponse>({ url: Api.BOX_LIST, params });

export const getDetailListApi = (params: GetApiCoreBankLocationLayoutDetailRequest) =>
  defHttp.get<GetApiCoreBankLocationLayoutDetailResponse>({ url: Api.DT_LIST, params });

export const getSummayrApi = (
  params: GetApiCoreBankLocationLayoutSummaryLocationNoRequest['locationNo'],
) =>
  defHttp.get<GetApiCoreBankLocationLayoutSummaryLocationNoResponse>({
    url: Api.SUMMARY + params,
  });
