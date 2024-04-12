/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [对接日志↗](https://yapi.sharing8.cn/project/529/interface/api/34266) 的 **请求类型**
 *
 * @分类 [对接日志↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5832)
 * @请求头 `GET /api/connect/logs`
 * @更新时间 `2024-04-11 19:44:40`
 */
export interface GetApiConnectLogsRequest {
  pageSize: string;
  currPage: string;
  /**
   * 第三方系统模块
   */
  sysType?: string;
  /**
   * 创建日期
   */
  createStartDate: string;
  /**
   * 创建日期 默认当天
   */
  createEndDate: string;
}

/**
 * 接口 [对接日志↗](https://yapi.sharing8.cn/project/529/interface/api/34266) 的 **返回类型**
 *
 * @分类 [对接日志↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5832)
 * @请求头 `GET /api/connect/logs`
 * @更新时间 `2024-04-11 19:44:40`
 */
export interface GetApiConnectLogsResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    /**
     * 执行时长
     */
    processTime: number;
    /**
     * 第三方请求方式
     */
    requestType: string;
    /**
     * 第三方系统模块
     */
    sysType: string;
    /**
     * 操作描述
     */
    operationDesc: string;
    /**
     * 创建时间
     */
    createTime: string;
    /**
     * 请求参数
     */
    reqData: string;
    /**
     * 响应数据
     */
    respData: string;
  }[];
}

/* prettier-ignore-end */
