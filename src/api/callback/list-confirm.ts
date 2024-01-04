import { defHttp } from '@/utils/http/axios';
import { PostApiCoreDonorCallbackRequest } from '@/api/type/callbackManage';

enum Api {
  CALLBACK_CONFIRM = '/api/core/donor/callback',
}

export const callbackConfirm = (params: PostApiCoreDonorCallbackRequest) =>
  defHttp.post(
    { url: Api.CALLBACK_CONFIRM, params },
    {
      joinParamsToUrl: true,
    },
  );
