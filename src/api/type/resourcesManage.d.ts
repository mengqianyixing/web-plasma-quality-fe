/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [新增资源↗](https://yapi.sharing8.cn/project/521/interface/api/29272) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `POST /sys/resource`
 * @更新时间 `2023-11-01 10:03:17`
 */
export interface PostSysResourceRequest {
  /**
   * 资源URI
   */
  resourceUri: string;
  /**
   * 请求方法
   */
  methodType: string;
  /**
   * 资源名称
   */
  resourceName: string;
  /**
   * 备注说明
   */
  remark?: string;
  /**
   * 该资源URI关联的菜单id数组
   */
  resourceMenuList: string[];
}

/**
 * 接口 [新增资源↗](https://yapi.sharing8.cn/project/521/interface/api/29272) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `POST /sys/resource`
 * @更新时间 `2023-11-01 10:03:17`
 */
export interface PostSysResourceResponse {
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
 * 接口 [删除资源↗](https://yapi.sharing8.cn/project/521/interface/api/29284) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `DELETE /sys/resource/{id}`
 * @更新时间 `2023-10-30 14:18:58`
 */
export interface DeleteSysResourceIdRequest {
  /**
   * 资源id
   */
  id: string;
}

/**
 * 接口 [删除资源↗](https://yapi.sharing8.cn/project/521/interface/api/29284) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `DELETE /sys/resource/{id}`
 * @更新时间 `2023-10-30 14:18:58`
 */
export interface DeleteSysResourceIdResponse {
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
 * 接口 [修改资源↗](https://yapi.sharing8.cn/project/521/interface/api/29296) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `PUT /sys/resource`
 * @更新时间 `2023-11-01 10:05:24`
 */
export interface PutSysResourceRequest {
  /**
   * 1234567
   */
  resourceId: string;
  /**
   * /sys/resource
   */
  resourceUri: string;
  /**
   * POST
   */
  methodType: string;
  /**
   * 新增资源
   */
  resourceName: string;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 该资源URI关联的菜单id数组
   */
  resourceMenuList: string[];
}

/**
 * 接口 [修改资源↗](https://yapi.sharing8.cn/project/521/interface/api/29296) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `PUT /sys/resource`
 * @更新时间 `2023-11-01 10:05:24`
 */
export interface PutSysResourceResponse {
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
 * 接口 [查询单个资源↗](https://yapi.sharing8.cn/project/521/interface/api/29302) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `GET /sys/resource/{id}`
 * @更新时间 `2023-11-01 10:26:41`
 */
export interface GetSysResourceIdRequest {
  /**
   * 资源id
   */
  id: string;
}

/**
 * 接口 [查询单个资源↗](https://yapi.sharing8.cn/project/521/interface/api/29302) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `GET /sys/resource/{id}`
 * @更新时间 `2023-11-01 10:26:41`
 */
export interface GetSysResourceIdResponse {
  /**
   * 资源id
   */
  resourceId: string;
  /**
   * 资源URI
   */
  resourceUri: string;
  /**
   * 请求方法
   */
  methodType: string;
  /**
   * 资源名称
   */
  resourceName: string;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 创建人
   */
  createUser?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 修改人
   */
  updateUser?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 资源关联的菜单树
   */
  menuTree?: {}[];
}

/**
 * 接口 [查询资源列表↗](https://yapi.sharing8.cn/project/521/interface/api/29326) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `POST /sys/resources`
 * @更新时间 `2023-10-30 14:20:00`
 */
export interface PostSysResourcesRequest {
  /**
   * 当前页码
   */
  currPage: number;
  /**
   * 页数大小
   */
  pageSize: number;
  /**
   * 资源URI，模糊查询
   */
  resourceUri?: string;
  /**
   * 资源名称，模糊查询
   */
  resourceName?: string;
}

/**
 * 接口 [查询资源列表↗](https://yapi.sharing8.cn/project/521/interface/api/29326) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_4392)
 * @请求头 `POST /sys/resources`
 * @更新时间 `2023-10-30 14:20:00`
 */
export interface PostSysResourcesResponse {
  /**
   * 当前页
   */
  currPage: number;
  /**
   * 页数大小
   */
  pageSize: number;
  /**
   * 总数量
   */
  totalCount: number;
  /**
   * 资源列表
   */
  list?: {
    /**
     * 资源id
     */
    resourceId: string;
    /**
     * 资源URI
     */
    resourceUri: string;
    /**
     * 请求方法
     */
    methodType: string;
    /**
     * 资源名称
     */
    resourceName: string;
    /**
     * 备注信息
     */
    remark?: string;
    /**
     * 创建人
     */
    createUser?: string;
    /**
     * 创建时间
     */
    createTime?: string;
  }[];
}

/* prettier-ignore-end */
