import { defHttp } from '@/utils/http/axios';
import {
  PostApiCoreBankTrayWarehouseFerryRequest,
  PostApiCoreBankTrayWarehouseFerryResponse,
} from '@/api/type/trayManage';

enum Api {
  FERRY = '/api/core/bank/tray/warehouse/ferry',
}

export const submitFerryApi = (params: PostApiCoreBankTrayWarehouseFerryRequest) =>
  defHttp.post<PostApiCoreBankTrayWarehouseFerryResponse>({
    url: Api.FERRY,
    params,
  });
