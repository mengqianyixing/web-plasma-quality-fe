/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [回访计划查询↗](https://yapi.sharing8.cn/project/529/interface/api/31869) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback`
 * @更新时间 `2023-12-27 13:51:21`
 */
export interface GetApiCoreDonorCallbackRequest {
  pageSize: string;
  currPage: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 生成日期
   */
  createStartDate?: string;
  /**
   * 生成日期
   */
  createEndDate?: string;
  /**
   * 发布状态
   */
  state?: string;
}

/**
 * 接口 [回访计划查询↗](https://yapi.sharing8.cn/project/529/interface/api/31869) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback`
 * @更新时间 `2023-12-27 13:51:21`
 */
export interface GetApiCoreDonorCallbackResponse {
  totalCount?: number;
  pageSize?: null;
  totalPage?: null;
  currPage?: null;
  result?: {
    /**
     * 名单编号
     */
    planNo: string;
    /**
     * 浆站编码
     */
    stationNo: string;
    /**
     * 浆员数量
     */
    donorNum: number;
    /**
     * 生成人
     */
    creator: string;
    /**
     * 生成日期
     */
    createAt: string;
    /**
     * 确认人
     */
    checker?: string;
    /**
     * 确认日期
     */
    checkAt?: string;
    /**
     * 状态
     */
    state: string;
  }[];
}

/* prettier-ignore-end */
