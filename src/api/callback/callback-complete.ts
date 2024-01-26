import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreDonorCallbackResultRequest,
  GetApiCoreDonorCallbackResultResponse,
} from '@/api/type/callbackManage';

enum Api {
  CALLBACK_COMPLETE_RESULT = '/api/core/donor/callback/result',
}

export const getCallbackCompleteList = (params: GetApiCoreDonorCallbackResultRequest) =>
  defHttp.get<GetApiCoreDonorCallbackResultResponse>(
    { url: Api.CALLBACK_COMPLETE_RESULT, params },
    {
      joinParamsToUrl: true,
    },
  );
