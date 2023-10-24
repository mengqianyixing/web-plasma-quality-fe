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
 * @请求头 `GET /sys/verify-code/{uuid}`
 * @更新时间 `2023-10-24 10:54:24`
 */
export interface GetSysVerifyCodeUuidRequest {
  /**
   * 终端登录标识
   */
  uuid: string;
}

/**
 * 接口 [获取验证码↗](https://yapi.sharing8.cn/project/521/interface/api/29380) 的 **返回类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `GET /sys/verify-code/{uuid}`
 * @更新时间 `2023-10-24 10:54:24`
 */
export type GetSysVerifyCodeUuidResponse = string;

/**
 * 接口 [用户登录↗](https://yapi.sharing8.cn/project/521/interface/api/29386) 的 **请求类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `POST /sys/user/login`
 * @更新时间 `2023-10-24 15:21:16`
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
 * @更新时间 `2023-10-24 15:21:16`
 */
export interface PostSysUserLoginResponse {
  /**
   * 接入token
   */
  accessToken: string;
  /**
   * 刷新token
   */
  refreshToken: string;
  /**
   * 菜单授权列表
   */
  menuAuthList?: {
    /**
     * 菜单编码
     */
    menuCode: string;
    /**
     * 菜单名称
     */
    menuName: string;
    /**
     * 菜单类型
     */
    menuType: number;
    /**
     * 图标类型
     */
    iconType?: string;
    /**
     * 菜单id
     */
    menuId: string;
    /**
     * 子菜单
     */
    childMenuList?: {
      /**
       * 菜单编码
       */
      menuCode: string;
      /**
       * 菜单名称
       */
      menuName: string;
      /**
       * 菜单类型
       */
      menuType: number;
      /**
       * 图标类型
       */
      iconType?: string;
      /**
       * 菜单id
       */
      menuId: string;
    }[];
  }[];
}

/**
 * 接口 [用户登出↗](https://yapi.sharing8.cn/project/521/interface/api/29392) 的 **请求类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `GET /sys/user/logout`
 * @更新时间 `2023-10-24 10:04:14`
 */
export interface GetSysUserLogoutRequest {}

/**
 * 接口 [用户登出↗](https://yapi.sharing8.cn/project/521/interface/api/29392) 的 **返回类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `GET /sys/user/logout`
 * @更新时间 `2023-10-24 10:04:14`
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

/**
 * 接口 [刷新token↗](https://yapi.sharing8.cn/project/521/interface/api/29404) 的 **请求类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `GET /sys/user/refresh-token`
 * @更新时间 `2023-10-24 10:08:54`
 */
export interface GetSysUserRefreshTokenRequest {}

/**
 * 接口 [刷新token↗](https://yapi.sharing8.cn/project/521/interface/api/29404) 的 **返回类型**
 *
 * @分类 [登录/登出↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4416)
 * @请求头 `GET /sys/user/refresh-token`
 * @更新时间 `2023-10-24 10:08:54`
 */
export interface GetSysUserRefreshTokenResponse {
  /**
   * 接入token
   */
  access_token: string;
  /**
   * 刷新token
   */
  refresh_token: string;
}

/* prettier-ignore-end */
