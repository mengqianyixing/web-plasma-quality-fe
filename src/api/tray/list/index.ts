/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-23 20:54:41
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 18:42:51
 */
import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBankTraiesRequest,
  GetApiCoreBankTraiesResponse,
  PutApiCoreBankTrayUselessRequest,
  PutApiCoreBankTrayUselessResponse,
  PostApiCoreBankTrayRequest,
  PostApiCoreBankTrayResponse,
  PutApiCoreBankTrayRequest,
  PutApiCoreBankTrayResponse,
  GetApiCoreBankTrayTrayNoRequest,
  GetApiCoreBankTrayTrayNoResponse,
  GetApiCoreBankTrayBoxTrayNoRequest,
  GetApiCoreBankTrayBoxTrayNoResponse,
  GetApiCoreBankTrayBagDetailRequest,
  GetApiCoreBankTrayBagDetailResponse,
  GetApiCoreBankTrayKeeppacksRequest,
  GetApiCoreBankTrayKeeppacksResponse,
  GetApiCoreBankTrayKeepsamplesRequest,
  GetApiCoreBankTrayKeepsamplesResponse,
} from '@/api/type/trayManage';
import {
  GetApiCoreBankTrayPlasmaVerifyRequest,
  GetApiCoreBankTrayPlasmaVerifyResponse,
} from '@/api/type/batchManage';

export const getListApi = (params: GetApiCoreBankTraiesRequest) =>
  defHttp.get<GetApiCoreBankTraiesResponse>({ url: '/api/core/bank/traies', params });

export const getAcceptPlasmaListApi = (params: GetApiCoreBankTrayPlasmaVerifyRequest) =>
  defHttp.get<GetApiCoreBankTrayPlasmaVerifyResponse>({
    url: '/api/core/bank/tray/plasma-verify',
    params,
  });

export const disableTrayApi = (data: PutApiCoreBankTrayUselessRequest) =>
  defHttp.put<PutApiCoreBankTrayUselessResponse>({ url: `/api/core/bank/tray/useless`, data });

export const createTrayLabelApi = (params: PostApiCoreBankTrayRequest) =>
  defHttp.post<PostApiCoreBankTrayResponse>({ url: '/api/core/bank/tray', params });

export const confirmTrayLabelApi = (params: PutApiCoreBankTrayRequest) =>
  defHttp.put<PutApiCoreBankTrayResponse>({ url: '/api/core/bank/tray', params });

export const trayDtListApi = ({ trayNo }: GetApiCoreBankTrayTrayNoRequest) =>
  defHttp.get<GetApiCoreBankTrayTrayNoResponse>({ url: `/api/core/bank/tray/${trayNo}` });

export const trayBoxListApi = ({ trayNo }: GetApiCoreBankTrayBoxTrayNoRequest) =>
  defHttp.get<GetApiCoreBankTrayBoxTrayNoResponse>({ url: `/api/core/bank/tray/box/${trayNo}` });

export const traySampleBoxListApi = (params: GetApiCoreBankTrayKeeppacksRequest) =>
  defHttp.get<GetApiCoreBankTrayKeeppacksResponse>({
    url: `/api/core/bank/tray/keeppacks`,
    params,
  });

export const trayBoxListApiAccept = ({ trayNo }: GetApiCoreBankTrayBoxTrayNoRequest) =>
  defHttp.get<GetApiCoreBankTrayBoxTrayNoResponse>({
    url: `/api/core/bank/tray/box/verify/${trayNo}`,
  });

export const trayBagListApi = (params: GetApiCoreBankTrayBagDetailRequest) =>
  defHttp.get<GetApiCoreBankTrayBagDetailResponse>({
    url: `/api/core/bank/tray/bag/detail`,
    params,
  });

export const traySampleBagListApi = (params: GetApiCoreBankTrayKeepsamplesRequest) =>
  defHttp.get<GetApiCoreBankTrayKeepsamplesResponse>({
    url: `/api/core/bank/tray/keepsamples`,
    params,
  });
