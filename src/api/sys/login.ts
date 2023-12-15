import { defHttp } from '/@/utils/http/axios';
import { GetSysCaptchaUuidRequest, GetSysCaptchaUuidResponse } from '@/api/type/login';

enum Api {
  GetSysVerifyCode = '/api/sys/captcha',
}

/**
 * @description: Get user menu based on id
 */

export const getSysVerifyCode = (uuid: GetSysCaptchaUuidRequest['uuid']) => {
  return defHttp.get<GetSysCaptchaUuidResponse>({
    url: Api.GetSysVerifyCode + `/${uuid}`,
  });
};
