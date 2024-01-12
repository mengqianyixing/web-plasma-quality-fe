import { defHttp } from '@/utils/http/axios';
import {
  GetApiSysCaptchaUuidRequest,
  GetApiSysCaptchaUuidResponse,
  PostApiSysReviewerCasdoorLoginRequest,
  PostApiSysReviewerCasdoorLoginResponse,
} from '@/api/type/login';

enum Api {
  GetSysVerifyCode = '/api/sys/captcha',
  ReCheckLogin = '/api/sys/reviewer/casdoor-login',
}

/**
 * @description: Get user menu based on id
 */

export const getSysVerifyCode = (uuid: GetApiSysCaptchaUuidRequest['uuid']) => {
  return defHttp.get<GetApiSysCaptchaUuidResponse>({
    url: Api.GetSysVerifyCode + `/${uuid}`,
  });
};

export const reCheckLogin = (params: PostApiSysReviewerCasdoorLoginRequest) =>
  defHttp.post<PostApiSysReviewerCasdoorLoginResponse>({
    url: Api.ReCheckLogin,
    params,
  });
