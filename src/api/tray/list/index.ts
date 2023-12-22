/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-22 13:46:35
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-22 14:01:05
 */
/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-22 13:46:35
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-22 13:59:39
 */
import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBankTraiesRequest,
  GetApiCoreBankTraiesResponse,
  PutApiCoreBankTrayTrayNoRequest,
  PutApiCoreBankTrayTrayNoResponse,
  PostApiCoreBankTrayRequest,
  PostApiCoreBankTrayResponse,
  PutApiCoreBankTrayRequest,
  PutApiCoreBankTrayResponse,
  GetApiCoreBankTrayTrayNoRequest,
  GetApiCoreBankTrayTrayNoResponse,
} from '@/api/type/trayManage';

export const getListApi = (params: GetApiCoreBankTraiesRequest) =>
  defHttp.get<GetApiCoreBankTraiesResponse>({ url: '/api/core/bank/traies', params });

export const disableTrayApi = ({ trayNo }: PutApiCoreBankTrayTrayNoRequest) =>
  defHttp.put<PutApiCoreBankTrayTrayNoResponse>({ url: `/api/core/bank/tray/${trayNo}` });

export const createTrayLabelApi = (params: PostApiCoreBankTrayRequest) =>
  defHttp.post<PostApiCoreBankTrayResponse>({ url: '/api/core/bank/tray', params });

export const confirmTrayLabelApi = (params: PutApiCoreBankTrayRequest) =>
  defHttp.put<PutApiCoreBankTrayResponse>({ url: '/api/core/bank/tray', params });

export const trayDtListApi = ({ trayNo }: GetApiCoreBankTrayTrayNoRequest) =>
  defHttp.get<GetApiCoreBankTrayTrayNoResponse>({ url: `/api/core/bank/tray/${trayNo}` });
