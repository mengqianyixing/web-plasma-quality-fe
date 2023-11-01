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
 * @请求头 `GET /sys/captcha/{uuid}`
 * @更新时间 `2023-10-26 13:55:43`
 */
export interface GetSysCaptchaUuidRequest {
  /**
   * 终端登录标识
   */
  uuid: string;
}

/**
 * 接口 [获取验证码↗](https://yapi.sharing8.cn/project/521/interface/api/29380) 的 **返回类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `GET /sys/captcha/{uuid}`
 * @更新时间 `2023-10-26 13:55:43`
 */
export type GetSysCaptchaUuidResponse = string;

/**
 * 接口 [用户登录↗](https://yapi.sharing8.cn/project/521/interface/api/29386) 的 **请求类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `POST /sys/user/login`
 * @更新时间 `2023-10-30 14:18:19`
 */
export interface PostSysUserLoginRequest {
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
 * @请求头 `POST /sys/user/login`
 * @更新时间 `2023-10-30 14:18:19`
 */
export interface PostSysUserLoginResponse {
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
 * @请求头 `GET /sys/user/logout`
 * @更新时间 `2023-10-30 14:18:28`
 */
export interface GetSysUserLogoutRequest {}

/**
 * 接口 [用户登出↗](https://yapi.sharing8.cn/project/521/interface/api/29392) 的 **返回类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `GET /sys/user/logout`
 * @更新时间 `2023-10-30 14:18:28`
 */
export interface GetSysUserLogoutResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/* prettier-ignore-end */
