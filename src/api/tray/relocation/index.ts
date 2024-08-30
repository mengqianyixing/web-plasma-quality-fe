/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-23 20:54:41
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 18:40:34
 */
import { defHttp } from '@/utils/http/axios';
import {
  PostApiCoreBankTrayWarehouseDeliverRequest,
  PostApiCoreBankTrayWarehouseDeliverResponse,
  PostApiCoreBankTrayWarehouseReceptionRequest,
  PostApiCoreBankTrayWarehouseReceptionResponse,
  PostApiCoreBankTrayWarehouseMoveRequest,
  PostApiCoreBankTrayWarehouseMoveResponse,
  PostApiCoreBankTrayBoxRequest,
  PostApiCoreBankTrayBoxResponse,
  GetApiCoreBankWarehouseTrayTrayNoRequest,
  GetApiCoreBankWarehouseTrayTrayNoResponse,
  GetApiCoreBankTrayBoxesRequest,
  GetApiCoreBankTrayBoxesResponse,
  GetApiCoreBankTrayBindRecordRequest,
  GetApiCoreBankTrayBindRecordResponse,
  GetApiCoreBankTrayMoveRecordRequest,
  GetApiCoreBankTrayMoveRecordResponse,
  PostApiCoreBankTrayKeepSampleScanBindRequest,
  PostApiCoreBankTrayKeepSampleScanBindResponse,
  GetApiCoreBankTrayKeepSampleScanBindRecordsRequest,
  GetApiCoreBankTrayKeepSampleScanBindRecordsResponse,
  PostApiCoreBankTrayKeepSampleHandBindRequest,
  PostApiCoreBankTrayKeepSampleHandBindResponse,
} from '@/api/type/trayManage';

enum Api {
  TRAY_BANK_BOXES_LIST = '/api/core/bank/tray/boxes',
}

export const submitOutHouseApi = (params: PostApiCoreBankTrayWarehouseDeliverRequest) =>
  defHttp.post<PostApiCoreBankTrayWarehouseDeliverResponse>({
    url: '/api/core/bank/tray/warehouse/deliver',
    params,
  });

export const submitInHouseApi = (params: PostApiCoreBankTrayWarehouseReceptionRequest) =>
  defHttp.post<PostApiCoreBankTrayWarehouseReceptionResponse>({
    url: '/api/core/bank/tray/warehouse/reception',
    params,
  });

export const submitRelocationApi = (params: PostApiCoreBankTrayWarehouseMoveRequest) =>
  defHttp.post<PostApiCoreBankTrayWarehouseMoveResponse>({
    url: '/api/core/bank/tray/warehouse/move',
    params,
  });

export const bindBoxApi = (params: PostApiCoreBankTrayBoxRequest, errOkCb?: () => void) =>
  defHttp.post<PostApiCoreBankTrayBoxResponse>(
    { url: '/api/core/bank/tray/box', params },
    { errorMessageModeOkCb: errOkCb },
  );
export const handBindSampleBoxApi = (
  params: PostApiCoreBankTrayKeepSampleHandBindRequest,
  errOkCb?: () => void,
) =>
  defHttp.post<PostApiCoreBankTrayKeepSampleHandBindResponse>(
    { url: '/api/core/bank/tray/keep-sample/hand-bind', params },
    { errorMessageModeOkCb: errOkCb },
  );
export const handUnbindSampleBoxApi = (
  params: PostApiCoreBankTrayKeepSampleHandBindRequest,
  errOkCb?: () => void,
) =>
  defHttp.post<PostApiCoreBankTrayKeepSampleHandBindResponse>(
    { url: '/api/core/bank/tray/keep-sample/hand-unbind', params },
    { errorMessageModeOkCb: errOkCb },
  );
export const bindSampleBoxApi = (
  params: PostApiCoreBankTrayKeepSampleScanBindRequest,
  errOkCb?: () => void,
) =>
  defHttp.post<PostApiCoreBankTrayKeepSampleScanBindResponse>(
    { url: '/api/core/bank/tray/keep-sample/scan-bind', params },
    { errorMessageModeOkCb: errOkCb },
  );
export const unbindSampleBoxApi = (
  params: PostApiCoreBankTrayKeepSampleScanBindRequest,
  errOkCb?: () => void,
) =>
  defHttp.post<PostApiCoreBankTrayKeepSampleScanBindResponse>(
    { url: '/api/core/bank/tray/keep-sample/scan-unbind', params },
    { errorMessageModeOkCb: errOkCb },
  );

export const bindVerifyBoxApi = (params: PostApiCoreBankTrayBoxRequest, errOkCb: () => void) =>
  defHttp.post<PostApiCoreBankTrayBoxResponse>(
    { url: '/api/core/bank/tray/box/verify', params },
    { errorMessageModeOkCb: errOkCb },
  );

export const taryHouseApi = ({ trayNo }: GetApiCoreBankWarehouseTrayTrayNoRequest) =>
  defHttp.get<GetApiCoreBankWarehouseTrayTrayNoResponse>({
    url: `/api/core/bank/warehouse/tray/${trayNo}`,
  });

export const getBankBoxesList = (params: GetApiCoreBankTrayBoxesRequest) =>
  defHttp.get<GetApiCoreBankTrayBoxesResponse>(
    { url: Api.TRAY_BANK_BOXES_LIST, params },
    {
      joinParamsToUrl: true,
    },
  );

export const getTrayBoxBindRecordApi = (params: GetApiCoreBankTrayBindRecordRequest) =>
  defHttp.get<GetApiCoreBankTrayBindRecordResponse>({
    url: '/api/core/bank/tray/bind-record',
    params,
  });
export const getTraySampleBoxBindRecordApi = (
  params: GetApiCoreBankTrayKeepSampleScanBindRecordsRequest,
) =>
  defHttp.get<GetApiCoreBankTrayKeepSampleScanBindRecordsResponse>({
    url: '/api/core/bank/tray/keep-sample/scan-bind/records',
    params,
  });
export const getTraySampleBoxUnBindRecordApi = (
  params: GetApiCoreBankTrayKeepSampleScanBindRecordsRequest,
) =>
  defHttp.get<GetApiCoreBankTrayKeepSampleScanBindRecordsResponse>({
    url: '/api/core/bank/tray/keep-sample/scan-unbind/records',
    params,
  });
export const getTraySampleHandBoxBindRecordApi = (
  params: GetApiCoreBankTrayKeepSampleScanBindRecordsRequest,
) =>
  defHttp.get<GetApiCoreBankTrayKeepSampleScanBindRecordsResponse>({
    url: '/api/core/bank/tray/keep-sample/hand-bind/packs',
    params,
  });
export const getTraySampleBoxHandUnBindRecordApi = (
  params: GetApiCoreBankTrayKeepSampleScanBindRecordsRequest,
) =>
  defHttp.get<GetApiCoreBankTrayKeepSampleScanBindRecordsResponse>({
    url: '/api/core/bank/tray/keep-sample/hand-unbind/packs',
    params,
  });

export const getTrayRelocationRecordApi = (params: GetApiCoreBankTrayMoveRecordRequest) =>
  defHttp.get<GetApiCoreBankTrayMoveRecordResponse>({
    url: '/api/core/bank/tray/move-record',
    params,
  });
