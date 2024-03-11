/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [根据业务功能名称查询其下的所有操作类型↗](https://yapi.sharing8.cn/project/521/interface/api/33832) 的 **请求类型**
 *
 * @分类 [审计日志↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5800)
 * @请求头 `GET /api/sys/log/operations/{moduleName}`
 * @更新时间 `2024-03-10 12:33:44`
 */
export interface GetApiSysLogOperationsModuleNameRequest {
  /**
   * 业务功能名称
   */
  moduleName: string;
}

/**
 * 接口 [根据业务功能名称查询其下的所有操作类型↗](https://yapi.sharing8.cn/project/521/interface/api/33832) 的 **返回类型**
 *
 * @分类 [审计日志↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5800)
 * @请求头 `GET /api/sys/log/operations/{moduleName}`
 * @更新时间 `2024-03-10 12:33:44`
 */
export type GetApiSysLogOperationsModuleNameResponse = string[];

/**
 * 接口 [查询系统日志列表↗](https://yapi.sharing8.cn/project/521/interface/api/33839) 的 **请求类型**
 *
 * @分类 [审计日志↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5800)
 * @请求头 `GET /api/sys/logs`
 * @更新时间 `2024-03-10 12:47:31`
 */
export interface GetApiSysLogsRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 分页大小
   */
  pageSize: string;
  /**
   * 操作开始日期，例如：2023-01-01
   */
  createBeginAt?: string;
  /**
   * 操作结束日期，例如：2023-01-01
   */
  createEndAt?: string;
  /**
   * 用户账号，例如：test001、liyi
   */
  userId?: string;
  /**
   * 业务功能名称，例如：回访管理
   */
  moduleName?: string;
  /**
   * 操作类型名称，例如：回访批次新增
   */
  optName?: string;
  /**
   * 操作内容
   */
  optContent?: string;
}

/**
 * 接口 [查询系统日志列表↗](https://yapi.sharing8.cn/project/521/interface/api/33839) 的 **返回类型**
 *
 * @分类 [审计日志↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5800)
 * @请求头 `GET /api/sys/logs`
 * @更新时间 `2024-03-10 12:47:31`
 */
export interface GetApiSysLogsResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: null;
  currPage?: number;
  result?: {
    /**
     * 操作时间
     */
    optTime?: string;
    /**
     * IP地址
     */
    ip?: string;
    /**
     * 操作用户
     */
    operator?: string;
    /**
     * 功能
     */
    moduleName?: string;
    /**
     * 操作类型
     */
    optName?: string;
    /**
     * 操作内容
     */
    optContent?: string;
  }[];
}

/* prettier-ignore-end */
