import { defHttp } from '@/utils/http/axios';
import {
  GetApiSysCaptchaUuidRequest,
  GetApiSysCaptchaUuidResponse,
  PostApiSysReviewerLoginRequest,
  PostApiSysReviewerLoginResponse,
} from '@/api/type/login';

enum Api {
  GetSysVerifyCode = '/api/sys/captcha',
  ReCheckLogin = '/api/sys/reviewer/login',
}

/**
 * @description: Get user menu based on id
 */

export const getSysVerifyCode = (uuid: GetApiSysCaptchaUuidRequest['uuid']) => {
  return defHttp.get<GetApiSysCaptchaUuidResponse>({
    url: Api.GetSysVerifyCode + `/${uuid}`,
  });
};

export const reCheckLogin = (params: PostApiSysReviewerLoginRequest) =>
  defHttp.post<PostApiSysReviewerLoginResponse>({
    url: Api.ReCheckLogin,
    params,
  });
