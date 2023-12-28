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
} from '@/api/type/trayManage';

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

export const bindBoxApi = (params: PostApiCoreBankTrayBoxRequest) =>
  defHttp.post<PostApiCoreBankTrayBoxResponse>({ url: '/api/core/bank/tray/box', params });

export const taryHouseApi = ({ trayNo }: GetApiCoreBankWarehouseTrayTrayNoRequest) =>
  defHttp.get<GetApiCoreBankWarehouseTrayTrayNoResponse>({
    url: `/api/core/bank/warehouse/tray/${trayNo}`,
  });