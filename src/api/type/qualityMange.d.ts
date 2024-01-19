/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [通过血浆批次查询箱号↗](https://yapi.sharing8.cn/project/529/interface/api/32607) 的 **请求类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `POST /api/core/bag/flag/box`
 * @更新时间 `2024-01-19 15:02:48`
 */
export interface PostApiCoreBagFlagBoxRequest {
  batchNo?: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [通过血浆批次查询箱号↗](https://yapi.sharing8.cn/project/529/interface/api/32607) 的 **返回类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `POST /api/core/bag/flag/box`
 * @更新时间 `2024-01-19 15:02:48`
 */
export interface PostApiCoreBagFlagBoxResponse {
  totalCount: number;
  currPage: null;
  totalPage: null;
  pageSize: null;
  result?: {
    /**
     * 血浆箱号
     */
    boxNo: string;
    /**
     * 血浆批号
     */
    batchNo: string;
    /**
     * 血浆数量
     */
    bagCount: string;
    /**
     * 血浆编号
     */
    bagNos: string;
  }[];
}

/**
 * 接口 [标记↗](https://yapi.sharing8.cn/project/529/interface/api/32612) 的 **请求类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `POST /api/core/bag/flag`
 * @更新时间 `2024-01-19 14:52:21`
 */
export interface PostApiCoreBagFlagRequest {
  boxNos: string[];
  remark?: string;
}

/**
 * 接口 [标记↗](https://yapi.sharing8.cn/project/529/interface/api/32612) 的 **返回类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `POST /api/core/bag/flag`
 * @更新时间 `2024-01-19 14:52:21`
 */
export interface PostApiCoreBagFlagResponse {}

/**
 * 接口 [查询限制列表↗](https://yapi.sharing8.cn/project/529/interface/api/32617) 的 **请求类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `POST /api/core/bag/flags`
 * @更新时间 `2024-01-19 15:27:38`
 */
export interface PostApiCoreBagFlagsRequest {
  batchNo?: string;
  currPage: string;
  pageSize: string;
  stationNo?: string;
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
}

/**
 * 接口 [查询限制列表↗](https://yapi.sharing8.cn/project/529/interface/api/32617) 的 **返回类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `POST /api/core/bag/flags`
 * @更新时间 `2024-01-19 15:27:38`
 */
export interface PostApiCoreBagFlagsResponse {
  totalCount: number;
  currPage: null;
  totalPage: null;
  pageSize: null;
  result?: {
    /**
     * 采浆公司
     */
    stationName: string;
    /**
     * 血浆批号
     */
    batchNo: string;
    /**
     * 血浆箱数
     */
    boxCount: string;
    /**
     * 血浆数量
     */
    bagCount: string;
    /**
     * 备注
     */
    remark: string;
    /**
     * 记录人
     */
    creator: string;
    /**
     * 记录时间
     */
    createAt: string;
    /**
     * 复核人
     */
    reviewer: string;
    /**
     * 复核时间
     */
    reviewAt: string;
    bfNo: string;
  }[];
}

/**
 * 接口 [通过血浆批次查询已限制箱号↗](https://yapi.sharing8.cn/project/529/interface/api/32622) 的 **请求类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `POST /api/core/bag/flagged/box`
 * @更新时间 `2024-01-19 19:12:02`
 */
export interface PostApiCoreBagFlaggedBoxRequest {
  batchNo: string;
  currPage: number;
  pageSize: number;
}

/**
 * 接口 [通过血浆批次查询已限制箱号↗](https://yapi.sharing8.cn/project/529/interface/api/32622) 的 **返回类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `POST /api/core/bag/flagged/box`
 * @更新时间 `2024-01-19 19:12:02`
 */
export interface PostApiCoreBagFlaggedBoxResponse {
  totalCount: number;
  currPage: number;
  totalPage: number;
  pageSize: number;
  remark: string;
  result?: {
    boxNo: string;
    batchNo: string;
    bagCount: string;
    bagNos?: string;
  }[];
}

/**
 * 接口 [血浆限制复核↗](https://yapi.sharing8.cn/project/529/interface/api/32647) 的 **请求类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `PUT /api/core/bag/flag/review/{bfNo}`
 * @更新时间 `2024-01-19 15:30:04`
 */
export interface PutApiCoreBagFlagReviewBfNoRequest {
  bfNo: string;
}

/**
 * 接口 [血浆限制复核↗](https://yapi.sharing8.cn/project/529/interface/api/32647) 的 **返回类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `PUT /api/core/bag/flag/review/{bfNo}`
 * @更新时间 `2024-01-19 15:30:04`
 */
export interface PutApiCoreBagFlagReviewBfNoResponse {}

/**
 * 接口 [血浆限制取消↗](https://yapi.sharing8.cn/project/529/interface/api/32652) 的 **请求类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `DELETE /api/core/bag/flag/cancel/{bfNo}`
 * @更新时间 `2024-01-19 15:50:45`
 */
export interface DeleteApiCoreBagFlagCancelBfNoRequest {
  bfNo: string;
}

/**
 * 接口 [血浆限制取消↗](https://yapi.sharing8.cn/project/529/interface/api/32652) 的 **返回类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `DELETE /api/core/bag/flag/cancel/{bfNo}`
 * @更新时间 `2024-01-19 15:50:45`
 */
export interface DeleteApiCoreBagFlagCancelBfNoResponse {}

/* prettier-ignore-end */
