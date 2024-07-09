/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [部门列表↗](https://yapi.sharing8.cn/project/521/interface/api/35970) 的 **请求类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `GET /api/sys/casdoor/groups`
 * @更新时间 `2024-07-08 18:37:45`
 */
export interface GetApiSysCasdoorGroupsRequest {
  currPage: string;
  pageSize: string;
  /**
   * 查询列名字
   */
  field: string;
  value: string;
}

/**
 * 接口 [部门列表↗](https://yapi.sharing8.cn/project/521/interface/api/35970) 的 **返回类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `GET /api/sys/casdoor/groups`
 * @更新时间 `2024-07-08 18:37:45`
 */
export interface GetApiSysCasdoorGroupsResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    name?: string;
    key?: null;
    title?: null;
    owner?: string;
    parentId?: string;
    type?: string;
    users?: null;
    displayName?: string;
    createdTime?: string;
    isEnabled?: boolean;
    isTopGroup?: boolean;
  }[];
}

/**
 * 接口 [获取全部部门列表↗](https://yapi.sharing8.cn/project/521/interface/api/35976) 的 **请求类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `GET /api/sys/casdoor/all-groups`
 * @更新时间 `2024-07-08 18:39:59`
 */
export interface GetApiSysCasdoorAllGroupsRequest {
  /**
   * 是否树状结构
   */
  withTree: string;
}

/**
 * 接口 [获取全部部门列表↗](https://yapi.sharing8.cn/project/521/interface/api/35976) 的 **返回类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `GET /api/sys/casdoor/all-groups`
 * @更新时间 `2024-07-08 18:39:59`
 */
export type GetApiSysCasdoorAllGroupsResponse = {
  name: string;
  key: null;
  title: null;
  owner: string;
  parentId: string;
  type: string;
  users: null;
  displayName: string;
  children: null;
  createdTime: string;
  isEnabled: boolean;
  isTopGroup: boolean;
}[];

/**
 * 接口 [获取某部门↗](https://yapi.sharing8.cn/project/521/interface/api/35982) 的 **请求类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `GET /api/sys/casdoor/group`
 * @更新时间 `2024-07-08 18:41:23`
 */
export interface GetApiSysCasdoorGroupRequest {
  /**
   * 部门编码
   */
  name: string;
}

/**
 * 接口 [获取某部门↗](https://yapi.sharing8.cn/project/521/interface/api/35982) 的 **返回类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `GET /api/sys/casdoor/group`
 * @更新时间 `2024-07-08 18:41:23`
 */
export interface GetApiSysCasdoorGroupResponse {
  name?: string;
  key?: null;
  title?: null;
  owner?: string;
  parentId?: string;
  type?: string;
  users?: null;
  displayName?: string;
  children?: null;
  createdTime?: string;
  isEnabled?: boolean;
  isTopGroup?: boolean;
}

/**
 * 接口 [新增部门↗](https://yapi.sharing8.cn/project/521/interface/api/35988) 的 **请求类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `POST /api/sys/casdoor/group`
 * @更新时间 `2024-07-08 18:43:31`
 */
export interface PostApiSysCasdoorGroupRequest {
  name?: string;
  displayName?: string;
  parentId?: string;
}

/**
 * 接口 [新增部门↗](https://yapi.sharing8.cn/project/521/interface/api/35988) 的 **返回类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `POST /api/sys/casdoor/group`
 * @更新时间 `2024-07-08 18:43:31`
 */
export type PostApiSysCasdoorGroupResponse = string;

/**
 * 接口 [编辑部门↗](https://yapi.sharing8.cn/project/521/interface/api/35994) 的 **请求类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `PUT /api/sys/casdoor/group`
 * @更新时间 `2024-07-08 18:45:19`
 */
export interface PutApiSysCasdoorGroupRequest {
  name?: string;
  parentId?: string;
  displayName?: string;
}

/**
 * 接口 [编辑部门↗](https://yapi.sharing8.cn/project/521/interface/api/35994) 的 **返回类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `PUT /api/sys/casdoor/group`
 * @更新时间 `2024-07-08 18:45:19`
 */
export type PutApiSysCasdoorGroupResponse = string;

/**
 * 接口 [删除部门↗](https://yapi.sharing8.cn/project/521/interface/api/36000) 的 **请求类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `DELETE /api/sys/casdoor/group`
 * @更新时间 `2024-07-08 18:46:37`
 */
export interface DeleteApiSysCasdoorGroupRequest {
  name?: string;
}

/**
 * 接口 [删除部门↗](https://yapi.sharing8.cn/project/521/interface/api/36000) 的 **返回类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `DELETE /api/sys/casdoor/group`
 * @更新时间 `2024-07-08 18:46:37`
 */
export type DeleteApiSysCasdoorGroupResponse = string;

/**
 * 接口 [从部门移除用户↗](https://yapi.sharing8.cn/project/521/interface/api/36006) 的 **请求类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `GET /api/sys/casdoor/remove-user-from-group`
 * @更新时间 `2024-07-08 18:47:20`
 */
export interface GetApiSysCasdoorRemoveUserFromGroupRequest {}

/**
 * 接口 [从部门移除用户↗](https://yapi.sharing8.cn/project/521/interface/api/36006) 的 **返回类型**
 *
 * @分类 [casdoor部门管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_6085)
 * @请求头 `GET /api/sys/casdoor/remove-user-from-group`
 * @更新时间 `2024-07-08 18:47:20`
 */
export interface GetApiSysCasdoorRemoveUserFromGroupResponse {}

/* prettier-ignore-end */
