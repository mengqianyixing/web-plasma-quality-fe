/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [获取系统配置↗](https://yapi.sharing8.cn/project/521/interface/api/36012) 的 **请求类型**
 *
 * @分类 [系统配置↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6092)
 * @请求头 `GET /api/sys/casdoor/application/config`
 * @更新时间 `2024-07-10 11:11:31`
 */
export interface GetApiSysCasdoorApplicationConfigRequest {}

/**
 * 接口 [获取系统配置↗](https://yapi.sharing8.cn/project/521/interface/api/36012) 的 **返回类型**
 *
 * @分类 [系统配置↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6092)
 * @请求头 `GET /api/sys/casdoor/application/config`
 * @更新时间 `2024-07-10 11:11:31`
 */
export interface GetApiSysCasdoorApplicationConfigResponse {
  expireInHours?: number;
  refreshExpireInHours?: number;
  validLoginDuration?: number;
  failedSigninLimit?: number;
  failedSigninfrozenTime?: number;
  passwordExpiredDays?: number;
  /**
   * AlwaysNone  （无）（始终开启）  Dynamic（动态开启）
   */
  rule?: string;
  providers?: {
    canSignIn?: boolean;
    canSignUp?: boolean;
    canUnlink?: boolean;
    name?: string;
    displayName?: null;
    category?: null;
    type?: null;
    owner?: string;
    prompted?: boolean;
    provider?: {
      canSignIn?: null;
      canSignUp?: null;
      canUnlink?: null;
      name?: string;
      displayName?: string;
      category?: string;
      type?: string;
      owner?: string;
      prompted?: null;
      provider?: null;
      rule?: null;
      signupGroup?: null;
      port?: number;
    };
    rule?: string;
    signupGroup?: string;
    port?: null;
  }[];
}

/**
 * 接口 [更新系统配置↗](https://yapi.sharing8.cn/project/521/interface/api/36018) 的 **请求类型**
 *
 * @分类 [系统配置↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6092)
 * @请求头 `POST /api/sys/casdoor/application/config`
 * @更新时间 `2024-07-10 11:14:49`
 */
export interface PostApiSysCasdoorApplicationConfigRequest {
  expireInHours?: number;
  refreshExpireInHours?: number;
  validLoginDuration?: number;
  failedSigninLimit?: number;
  failedSigninfrozenTime?: number;
  passwordExpiredDays?: number;
  rule?: string;
}

/**
 * 接口 [更新系统配置↗](https://yapi.sharing8.cn/project/521/interface/api/36018) 的 **返回类型**
 *
 * @分类 [系统配置↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6092)
 * @请求头 `POST /api/sys/casdoor/application/config`
 * @更新时间 `2024-07-10 11:14:49`
 */
export type PostApiSysCasdoorApplicationConfigResponse = string;

/* prettier-ignore-end */
