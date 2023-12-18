import { defHttp } from '@/utils/http/axios';
import { GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '#/axios';
import { PostSysUserLoginRequest, PostSysUserLoginResponse } from '@/api/type/login';

enum Api {
  Login = '/api/sys/user/login',
  Logout = '/api/sys/user/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: PostSysUserLoginRequest, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<PostSysUserLoginResponse>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
