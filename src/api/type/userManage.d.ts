/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询用户列表↗](https://yapi.sharing8.cn/project/521/interface/api/29260) 的 **请求类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `POST /api/sys/users`
 * @更新时间 `2023-12-15 10:44:03`
 */
export interface PostApiSysUsersRequest {
  /**
   * 当前页数
   */
  currPage: number;
  /**
   * 分页大小
   */
  pageSize: number;
  /**
   * 用户姓名
   */
  username?: string;
  /**
   * 登录账号
   */
  account?: string;
  /**
   * 是否支持多端登录：1：是，0：否
   */
  multiClientLoginEnable?: number;
  /**
   * 性别
   */
  sex?: string;
  /**
   * 状态， 0：禁用， 1：正常，  -1 : 删除， 2：人工锁定， 3 密码过期自动锁定
   */
  status?: number;
  /**
   * 部门id
   */
  deptId?: string;
  /**
   * 角色id
   */
  roleId?: string;
}

/**
 * 接口 [查询用户列表↗](https://yapi.sharing8.cn/project/521/interface/api/29260) 的 **返回类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `POST /api/sys/users`
 * @更新时间 `2023-12-15 10:44:03`
 */
export interface PostApiSysUsersResponse {
  result?: {
    /**
     * 用户id，主键
     */
    userId: string;
    /**
     * 登录账号，唯一
     */
    account: string;
    /**
     * 用户名称
     */
    username: string;
    /**
     * 是否支持多端登录：1：是，0：否
     */
    multiClientLoginEnable: number;
    /**
     * 性别，男、女
     */
    sex: string;
    /**
     * 手机号码
     */
    phonenumber?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 联系地址
     */
    address?: string;
    /**
     * 状态， 0：禁用， 1：正常， 2：人工锁定， 3 密码过期自动锁定
     */
    status: number;
    /**
     * 上一次修改密码时间
     */
    pwdLastMdyTime?: string;
    /**
     * 密码过期时间
     */
    pwdExpiredTime: string;
    /**
     * 否	备注信息
     */
    remark?: string;
    /**
     * 角色
     */
    roles?: {
      /**
       * 角色名称
       */
      roleName: string;
      /**
       * 角色Id
       */
      roleId: string;
    }[];
    /**
     * 部门名称
     */
    deptName?: string;
    /**
     * 创建人
     */
    createUser?: string;
    /**
     * 否	创建时间
     */
    createTime?: string;
  }[];
  /**
   * 当前页
   */
  currPage: number;
  /**
   * 总页数
   */
  totalPage: number;
  /**
   * 分页大小
   */
  pageSize: number;
  /**
   * 总数
   */
  totalCount: number;
}

/**
 * 接口 [新增用户信息↗](https://yapi.sharing8.cn/project/521/interface/api/29266) 的 **请求类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `POST /api/sys/user`
 * @更新时间 `2023-12-15 10:44:14`
 */
export interface PostApiSysUserRequest {
  /**
   * 登录账号，唯一
   */
  account: string;
  /**
   * 用户名称
   */
  username: string;
  /**
   * 用户密码
   */
  password: string;
  /**
   * 是否支持多端登录：1：是，0：否
   */
  multiClientLoginEnable: number;
  /**
   * 性别
   */
  sex: string;
  /**
   * 手机号码
   */
  phonenumber?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 联系地址
   */
  address?: string;
  /**
   * 状态
   */
  status: number;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 角色Id列表
   */
  roleIds?: string[];
  /**
   * 部门id
   */
  deptId?: string;
}

/**
 * 接口 [新增用户信息↗](https://yapi.sharing8.cn/project/521/interface/api/29266) 的 **返回类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `POST /api/sys/user`
 * @更新时间 `2023-12-15 10:44:14`
 */
export interface PostApiSysUserResponse {}

/**
 * 接口 [删除用户信息↗](https://yapi.sharing8.cn/project/521/interface/api/29278) 的 **请求类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `DELETE /api/sys/user/{id}`
 * @更新时间 `2023-12-15 10:44:30`
 */
export interface DeleteApiSysUserIdRequest {
  /**
   * 用户id
   */
  id: string;
}

/**
 * 接口 [删除用户信息↗](https://yapi.sharing8.cn/project/521/interface/api/29278) 的 **返回类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `DELETE /api/sys/user/{id}`
 * @更新时间 `2023-12-15 10:44:30`
 */
export type DeleteApiSysUserIdResponse = string;

/**
 * 接口 [编辑用户基本信息↗](https://yapi.sharing8.cn/project/521/interface/api/29290) 的 **请求类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `PUT /api/sys/user`
 * @更新时间 `2023-12-15 10:44:39`
 */
export interface PutApiSysUserRequest {
  /**
   * 用户id，主键
   */
  userId: string;
  /**
   * 用户名称
   */
  username?: string;
  /**
   * 是否支持多端登录：1：是，0：否
   */
  multiClientLoginEnable?: number;
  /**
   * 性别
   */
  sex?: string;
  /**
   * 手机号码
   */
  phonenumber?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 联系地址
   */
  address?: string;
  /**
   * 状态
   */
  status?: number;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 角色ID数组
   */
  roleIds?: string[];
  /**
   * 部门Id
   */
  deptId?: string;
}

/**
 * 接口 [编辑用户基本信息↗](https://yapi.sharing8.cn/project/521/interface/api/29290) 的 **返回类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `PUT /api/sys/user`
 * @更新时间 `2023-12-15 10:44:39`
 */
export interface PutApiSysUserResponse {}

/**
 * 接口 [修改用户密码↗](https://yapi.sharing8.cn/project/521/interface/api/29308) 的 **请求类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `PUT /api/sys/user/pwd`
 * @更新时间 `2023-12-15 10:44:50`
 */
export interface PutApiSysUserPwdRequest {
  /**
   * 用户id，主键
   */
  userId: string;
  /**
   * 用户新密码
   */
  password?: string;
  /**
   * 用户旧密码
   */
  oldPassword?: string;
  /**
   * 重置标志，true：重置密码为设定密码；false：使用新密码，此时新密码必填
   */
  resetFlag: boolean;
}

/**
 * 接口 [修改用户密码↗](https://yapi.sharing8.cn/project/521/interface/api/29308) 的 **返回类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `PUT /api/sys/user/pwd`
 * @更新时间 `2023-12-15 10:44:50`
 */
export interface PutApiSysUserPwdResponse {}

/**
 * 接口 [查询个人信息详情↗](https://yapi.sharing8.cn/project/521/interface/api/29350) 的 **请求类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `GET /api/sys/user/{id}`
 * @更新时间 `2023-12-15 10:44:57`
 */
export interface GetApiSysUserIdRequest {
  /**
   * 用户ID
   */
  id: string;
}

/**
 * 接口 [查询个人信息详情↗](https://yapi.sharing8.cn/project/521/interface/api/29350) 的 **返回类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `GET /api/sys/user/{id}`
 * @更新时间 `2023-12-15 10:44:57`
 */
export interface GetApiSysUserIdResponse {
  /**
   * 用户id
   */
  userId: string;
  /**
   * 状态
   */
  status: number;
  /**
   * 是否支持多端登录
   */
  multiClientLoginEnable: number;
  /**
   * 登录账号
   */
  account: string;
  /**
   * 用户名称
   */
  username: string;
  /**
   * 性别
   */
  sex?: number;
  /**
   * 手机号码
   */
  phonenumber?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 联系地址
   */
  address?: string;
  /**
   * 上一次修改密码时间
   */
  pwdLastMdyTime: string;
  /**
   * 密码过期时间
   */
  pwdExpiredTime: string;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 部门名称
   */
  deptName?: string;
  roles?: {
    /**
     * 角色名称
     */
    roleName: string;
    /**
     * 角色Id
     */
    roleId: string;
  }[];
}

/**
 * 接口 [根据用户编号集合查询用户信息↗](https://yapi.sharing8.cn/project/521/interface/api/31773) 的 **请求类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `POST /api/sys/users/byUuserNo`
 * @更新时间 `2023-12-22 13:57:22`
 */
export interface PostApiSysUsersByUuserNoRequest {
  /**
   * 用户编号
   */
  userNo: string;
  /**
   * 用户姓名
   */
  username: string;
}

/**
 * 接口 [根据用户编号集合查询用户信息↗](https://yapi.sharing8.cn/project/521/interface/api/31773) 的 **返回类型**
 *
 * @分类 [用户管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4376)
 * @请求头 `POST /api/sys/users/byUuserNo`
 * @更新时间 `2023-12-22 13:57:22`
 */
export interface PostApiSysUsersByUuserNoResponse {}

/* prettier-ignore-end */
