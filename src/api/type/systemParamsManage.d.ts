/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [新增系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/32223) 的 **请求类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `POST /api/sys/param`
 * @更新时间 `2024-01-10 16:28:38`
 */
export interface PostApiSysParamRequest {
  /**
   * 参数名称
   */
  paramName: string;
  /**
   * 参数健名
   */
  paramKey: string;
  /**
   * 参数键值
   */
  paramValue: string;
  /**
   * 备注说明
   */
  remark?: string;
  /**
   * 状态，1-正常  2-停用
   */
  status: number;
}

/**
 * 接口 [新增系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/32223) 的 **返回类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `POST /api/sys/param`
 * @更新时间 `2024-01-10 16:28:38`
 */
export type PostApiSysParamResponse = string;

/**
 * 接口 [修改系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/32226) 的 **请求类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `PUT /api/sys/param`
 * @更新时间 `2024-01-10 16:39:19`
 */
export interface PutApiSysParamRequest {
  /**
   * 参数id
   */
  id: string;
  /**
   * 参数名称
   */
  paramName: string;
  /**
   * 参数健名
   */
  paramKey: string;
  /**
   * 参数键值
   */
  paramValue: string;
  /**
   * 备注说明
   */
  remark?: string;
  /**
   * 状态，1-正常  2-停用
   */
  status: number;
}

/**
 * 接口 [修改系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/32226) 的 **返回类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `PUT /api/sys/param`
 * @更新时间 `2024-01-10 16:39:19`
 */
export type PutApiSysParamResponse = string;

/**
 * 接口 [系统参数列表↗](https://yapi.sharing8.cn/project/521/interface/api/32229) 的 **请求类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `GET /api/sys/params`
 * @更新时间 `2024-01-10 18:49:31`
 */
export interface GetApiSysParamsRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 分页大小
   */
  pageSize: string;
  /**
   * 参数名称
   */
  paramName?: string;
  /**
   * 参数健名
   */
  paramKey?: string;
  /**
   * 创建开始时间
   */
  createBeginAt?: string;
  /**
   * 创建结束时间
   */
  createEndAt?: string;
}

/**
 * 接口 [系统参数列表↗](https://yapi.sharing8.cn/project/521/interface/api/32229) 的 **返回类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `GET /api/sys/params`
 * @更新时间 `2024-01-10 18:49:31`
 */
export interface GetApiSysParamsResponse {
  /**
   * 总数量
   */
  totalCount?: number;
  /**
   * 页大小
   */
  pageSize?: number;
  /**
   * 总页数
   */
  totalPage?: number;
  /**
   * 当前页
   */
  currPage?: number;
  /**
   * 数据列表
   */
  result?: {
    /**
     * 参数id
     */
    id?: string;
    /**
     * 参数名称
     */
    paramName?: string;
    /**
     * 参数健名
     */
    paramKey?: string;
    /**
     * 参数键值
     */
    paramValue?: string;
    /**
     * 备注说明
     */
    remark?: string;
    /**
     * 状态，1-正常  2-停用
     */
    status?: number;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 更新时间
     */
    updateTime?: string;
  }[];
}

/**
 * 接口 [删除系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/32232) 的 **请求类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `DELETE /api/sys/param/{id}`
 * @更新时间 `2024-01-10 17:13:47`
 */
export interface DeleteApiSysParamIdRequest {
  /**
   * 参数id
   */
  id: string;
}

/**
 * 接口 [删除系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/32232) 的 **返回类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `DELETE /api/sys/param/{id}`
 * @更新时间 `2024-01-10 17:13:47`
 */
export type DeleteApiSysParamIdResponse = string;

/**
 * 接口 [获取服务端枚举↗](https://yapi.sharing8.cn/project/521/interface/api/33397) 的 **请求类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `GET /api/sys/enums`
 * @更新时间 `2024-02-22 18:10:22`
 */
export interface GetApiSysEnumsRequest {}

/**
 * 接口 [获取服务端枚举↗](https://yapi.sharing8.cn/project/521/interface/api/33397) 的 **返回类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `GET /api/sys/enums`
 * @更新时间 `2024-02-22 18:10:22`
 */
export type GetApiSysEnumsResponse = {
  path: string;
  desc: string;
  enumObjList: {
    key: string;
    show: string;
  }[];
}[];

/**
 * 接口 [根据参数key查询参数value↗](https://yapi.sharing8.cn/project/521/interface/api/33972) 的 **请求类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `GET /api/sys/param/{paramKey}`
 * @更新时间 `2024-03-16 11:09:25`
 */
export interface GetApiSysParamParamKeyRequest {
  paramKey: string;
}

/**
 * 接口 [根据参数key查询参数value↗](https://yapi.sharing8.cn/project/521/interface/api/33972) 的 **返回类型**
 *
 * @分类 [系统参数↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5397)
 * @请求头 `GET /api/sys/param/{paramKey}`
 * @更新时间 `2024-03-16 11:09:25`
 */
export interface GetApiSysParamParamKeyResponse {}

/* prettier-ignore-end */
