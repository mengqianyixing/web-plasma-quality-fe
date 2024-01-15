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
} from '@/api/type/trayManage';

export const getListApi = (params: GetApiCoreBankTraiesRequest) =>
  defHttp.get<GetApiCoreBankTraiesResponse>({ url: '/api/core/bank/traies', params });

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

export const trayBoxListApiAccept = ({ trayNo }: GetApiCoreBankTrayBoxTrayNoRequest) =>
  defHttp.get<GetApiCoreBankTrayBoxTrayNoResponse>({
    url: `/api/core/bank/tray/box/verify/${trayNo}`,
  });
