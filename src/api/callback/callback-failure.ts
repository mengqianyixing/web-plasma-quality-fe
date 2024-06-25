import { defHttp } from '@/utils/http/axios';
import {
  GetApiSearchDonorCallbackEndedRequest,
  GetApiSearchDonorCallbackEndedResponse,
} from '@/api/type/callbackManage';

enum Api {
  CALLBACK_FAILURE_LIST = '/api/search/donor/callback-ended',
}

export const getCallbackFailureList = (params: GetApiSearchDonorCallbackEndedRequest) =>
  defHttp.get<GetApiSearchDonorCallbackEndedResponse>(
    { url: Api.CALLBACK_FAILURE_LIST, params },
    {
      joinParamsToUrl: true,
    },
  );
