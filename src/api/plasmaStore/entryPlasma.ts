import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBankReceptionRequest,
  GetApiCoreBankReceptionResponse,
} from '@/api/type/plasmaStoreManage';

import { GetApiCoreStationResponse } from '@/api/type/stationManage';

import {
  GetApiCoreBagPlasmaRequest,
  GetApiCoreBagPlasmaResponse,
  GetApiCoreBagStatisticsBatchNoRequest,
} from '@/api/type/batchManage';

enum Api {
  // 入库查询
  RECEPTION_DETAIL = '/api/core/bank/reception',
  // 血浆批次详情
  BATCH_DETAIL = '/api/core/bag/plasma',
  // 验收数量详情
  VERIFY_NUM = '/api/core/bag/statistics',
  // 血浆公司下拉框搜索
  STATION_NAME = '/api/sys/station/form',
}

export const receptionDetailApi = (params: GetApiCoreBankReceptionRequest) =>
  defHttp.get<GetApiCoreBankReceptionResponse>({ url: Api.RECEPTION_DETAIL, params });

export const stationNameSearchApi = () =>
  defHttp.get<GetApiCoreStationResponse>({ url: Api.STATION_NAME });

export const bagPlasmaDetailApi = (params: GetApiCoreBagPlasmaRequest) =>
  defHttp.get<GetApiCoreBagPlasmaResponse>({ url: Api.BATCH_DETAIL, params });

export const verifyNumApi = (params: GetApiCoreBagStatisticsBatchNoRequest) =>
  defHttp.get<GetApiCoreBagStatisticsBatchNoRequest>({ url: Api.VERIFY_NUM + '/' + params });

export const verifyNoPassNumApi = (params: GetApiCoreBagPlasmaRequest) =>
  defHttp.get<GetApiCoreBagPlasmaResponse>({ url: Api.BATCH_DETAIL, params });
