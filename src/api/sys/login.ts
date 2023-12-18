import { defHttp } from '@/utils/http/axios';
import { GetApiSysCaptchaUuidRequest, GetApiSysCaptchaUuidResponse } from '@/api/type/login';

enum Api {
  GetSysVerifyCode = '/api/sys/captcha',
}

/**
 * @description: Get user menu based on id
 */

export const getSysVerifyCode = (uuid: GetApiSysCaptchaUuidRequest['uuid']) => {
  return defHttp.get<GetApiSysCaptchaUuidResponse>({
    url: Api.GetSysVerifyCode + `/${uuid}`,
  });
};
