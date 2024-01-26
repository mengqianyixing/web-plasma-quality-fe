import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreDonorCallbackDefeatRequest,
  GetApiCoreDonorCallbackDefeatResponse,
} from '@/api/type/callbackManage';

enum Api {
  CALLBACK_FAILURE_LIST = '/api/core/donor/callback/defeat',
}

export const getCallbackFailureList = (params: GetApiCoreDonorCallbackDefeatRequest) =>
  defHttp.get<GetApiCoreDonorCallbackDefeatResponse>(
    { url: Api.CALLBACK_FAILURE_LIST, params },
    {
      joinParamsToUrl: true,
    },
  );
