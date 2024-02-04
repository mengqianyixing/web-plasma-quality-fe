/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [获取验证码↗](https://yapi.sharing8.cn/project/521/interface/api/29380) 的 **请求类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `GET /api/sys/captcha/{uuid}`
 * @更新时间 `2023-12-15 10:42:55`
 */
export interface GetApiSysCaptchaUuidRequest {
  /**
   * 终端登录标识
   */
  uuid: string;
}

/**
 * 接口 [获取验证码↗](https://yapi.sharing8.cn/project/521/interface/api/29380) 的 **返回类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `GET /api/sys/captcha/{uuid}`
 * @更新时间 `2023-12-15 10:42:55`
 */
export type GetApiSysCaptchaUuidResponse = string;

/**
 * 接口 [用户登录↗](https://yapi.sharing8.cn/project/521/interface/api/29386) 的 **请求类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `POST /api/sys/user/login`
 * @更新时间 `2023-12-15 10:43:13`
 */
export interface PostApiSysUserLoginRequest {
  /**
   * 登录账号
   */
  account: string;
  /**
   * 登录密码
   */
  password: string;
  /**
   * 验证码
   */
  verifyCode: string;
  /**
   * 终端登录标识
   */
  uuid: string;
}

/**
 * 接口 [用户登录↗](https://yapi.sharing8.cn/project/521/interface/api/29386) 的 **返回类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `POST /api/sys/user/login`
 * @更新时间 `2023-12-15 10:43:13`
 */
export interface PostApiSysUserLoginResponse {
  /**
   * 接入token
   */
  accessToken: string;
  /**
   * 用户名称
   */
  username: string;
  /**
   * 用户id
   */
  userId: string;
}

/**
 * 接口 [用户登出↗](https://yapi.sharing8.cn/project/521/interface/api/29392) 的 **请求类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `GET /api/sys/user/logout`
 * @更新时间 `2023-12-15 10:43:22`
 */
export interface GetApiSysUserLogoutRequest {}

/**
 * 接口 [用户登出↗](https://yapi.sharing8.cn/project/521/interface/api/29392) 的 **返回类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `GET /api/sys/user/logout`
 * @更新时间 `2023-12-15 10:43:22`
 */
export interface GetApiSysUserLogoutResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [复核人登录↗](https://yapi.sharing8.cn/project/521/interface/api/31800) 的 **请求类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `POST /api/sys/reviewer/login`
 * @更新时间 `2023-12-23 19:25:58`
 */
export interface PostApiSysReviewerLoginRequest {
  password: string;
  account: string;
}

/**
 * 接口 [复核人登录↗](https://yapi.sharing8.cn/project/521/interface/api/31800) 的 **返回类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `POST /api/sys/reviewer/login`
 * @更新时间 `2023-12-23 19:25:58`
 */
export interface PostApiSysReviewerLoginResponse {
  userId: string;
  username: string;
}

/**
 * 接口 [复核人Casdoor登录↗](https://yapi.sharing8.cn/project/521/interface/api/32237) 的 **请求类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `POST /api/sys/reviewer/casdoor-login`
 * @更新时间 `2024-02-04 14:11:38`
 */
export interface PostApiSysReviewerCasdoorLoginRequest {
  account?: string;
  password?: string;
  buttonId: string;
}

/**
 * 接口 [复核人Casdoor登录↗](https://yapi.sharing8.cn/project/521/interface/api/32237) 的 **返回类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `POST /api/sys/reviewer/casdoor-login`
 * @更新时间 `2024-02-04 14:11:38`
 */
export interface PostApiSysReviewerCasdoorLoginResponse {
  userId?: string;
  username?: string;
}

/* prettier-ignore-end */
