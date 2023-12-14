/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [创建生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/31488) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `POST /api/product/order`
 * @更新时间 `2023-12-11 17:43:07`
 */
export interface PostApiProductOrderRequest {
  mesId: string;
  orderType: string;
  orderWeight: number;
  expiration: string;
  /**
   * yyyy-MM-dd
   */
  planOut: string;
  /**
   * yyyy-MM-dd
   */
  planTask: string;
}

/**
 * 接口 [创建生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/31488) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `POST /api/product/order`
 * @更新时间 `2023-12-11 17:43:07`
 */
export interface PostApiProductOrderResponse {}

/**
 * 接口 [查询生产指令列表↗](https://yapi.sharing8.cn/project/529/interface/api/31491) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `POST /api/product/orders`
 * @更新时间 `2023-12-12 15:23:54`
 */
export interface PostApiProductOrdersRequest {
  /**
   * 分页大小
   */
  pageSize: number;
  /**
   * 当前页
   */
  currPage: number;
  /**
   * 制造批号
   */
  mesId?: string;
  /**
   * 投产类型
   */
  orderType?: string;
  /**
   * 血浆效期
   */
  expiration?: string;
  /**
   * 状态
   */
  state?: string;
}

/**
 * 接口 [查询生产指令列表↗](https://yapi.sharing8.cn/project/529/interface/api/31491) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `POST /api/product/orders`
 * @更新时间 `2023-12-12 15:23:54`
 */
export interface PostApiProductOrdersResponse {
  /**
   * 分页大小
   */
  pageSize: number;
  /**
   * 当前页
   */
  currPage: number;
  /**
   * 总数
   */
  totalCount: number;
  /**
   * 总页数
   */
  totalPage: number;
  result?: {
    /**
     * 制造批号
     */
    mesId: string;
    /**
     * 生产指令编号（主键）
     */
    orderNo: string;
    /**
     * 投产类型
     */
    orderType: string;
    /**
     * 投浆重量(t)
     */
    orderWeight: number;
    /**
     * 血浆效期
     */
    expiration: string;
    /**
     * 计划出库日期
     */
    planOut: string;
    /**
     * 计划投产日期
     */
    planTask: string;
    /**
     * 状态
     */
    state?: string;
    /**
     * 申请人
     */
    creator?: string;
    /**
     * 申请日期
     */
    createAt?: string;
  }[];
}

/**
 * 接口 [修改生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/31503) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `PUT /api/product/order`
 * @更新时间 `2023-12-12 10:42:38`
 */
export interface PutApiProductOrderRequest {
  /**
   * 制造批号
   */
  mesId?: string;
  /**
   * 生产指令编号
   */
  orderNo: string;
  /**
   * 投产类型
   */
  orderType?: string;
  /**
   * 计划投产（t）
   */
  orderWeight?: number;
  /**
   * 血浆效期
   */
  expiration?: string;
  /**
   * 计划出库日期
   */
  planOut?: string;
  /**
   * 计划投产日期
   */
  planTask?: string;
}

/**
 * 接口 [修改生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/31503) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `PUT /api/product/order`
 * @更新时间 `2023-12-12 10:42:38`
 */
export type PutApiProductOrderResponse = string;

/**
 * 接口 [查询生产指令详情↗](https://yapi.sharing8.cn/project/529/interface/api/31515) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `GET /api/product/order/{orderNo}`
 * @更新时间 `2023-12-12 15:24:23`
 */
export interface GetApiProductOrderOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [查询生产指令详情↗](https://yapi.sharing8.cn/project/529/interface/api/31515) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `GET /api/product/order/{orderNo}`
 * @更新时间 `2023-12-12 15:24:23`
 */
export interface GetApiProductOrderOrderNoResponse {
  /**
   * 制造批号
   */
  mesId: string;
  /**
   * 投产类型
   */
  orderType: string;
  /**
   * 投产重量（t）
   */
  orderWeight: number;
  /**
   * 血浆效期
   */
  expiration: string;
  /**
   * 计划出库日期
   */
  planOut: string;
  /**
   * 计划投产日期
   */
  planTask: string;
}

/**
 * 接口 [生产指令撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31518) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `DELETE /api/product/order/{orderNo}`
 * @更新时间 `2023-12-12 10:43:04`
 */
export interface DeleteApiProductOrderOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [生产指令撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31518) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `DELETE /api/product/order/{orderNo}`
 * @更新时间 `2023-12-12 10:43:04`
 */
export type DeleteApiProductOrderOrderNoResponse = string;

/**
 * 接口 [生产指令审核↗](https://yapi.sharing8.cn/project/529/interface/api/31524) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `POST /api/product/order/check`
 * @更新时间 `2023-12-12 10:43:27`
 */
export interface PostApiProductOrderCheckRequest {
  /**
   * 审批结果
   */
  result: string;
  /**
   * 审批意见
   */
  idea?: string;
  /**
   * 生产指令编号
   */
  orderNo: string;
}

/**
 * 接口 [生产指令审核↗](https://yapi.sharing8.cn/project/529/interface/api/31524) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `POST /api/product/order/check`
 * @更新时间 `2023-12-12 10:43:27`
 */
export interface PostApiProductOrderCheckResponse {}

/**
 * 接口 [生产指令审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31527) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `DELETE /api/product/order/check/{orderNo}`
 * @更新时间 `2023-12-12 10:43:42`
 */
export interface DeleteApiProductOrderCheckOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [生产指令审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31527) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `DELETE /api/product/order/check/{orderNo}`
 * @更新时间 `2023-12-12 10:43:42`
 */
export type DeleteApiProductOrderCheckOrderNoResponse = string;

/**
 * 接口 [生产指令复核↗](https://yapi.sharing8.cn/project/529/interface/api/31530) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `POST /api/product/order/review`
 * @更新时间 `2023-12-12 10:43:58`
 */
export interface PostApiProductOrderReviewRequest {
  /**
   * 生产指令编号
   */
  orderNo: string;
  /**
   * 复核结果
   */
  result: string;
  /**
   * 复核意见
   */
  idea?: string;
}

/**
 * 接口 [生产指令复核↗](https://yapi.sharing8.cn/project/529/interface/api/31530) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `POST /api/product/order/review`
 * @更新时间 `2023-12-12 10:43:58`
 */
export type PostApiProductOrderReviewResponse = string;

/**
 * 接口 [生产指令复核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31533) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `DELETE /api/product/order/review/{orderNo}`
 * @更新时间 `2023-12-12 10:45:18`
 */
export interface DeleteApiProductOrderReviewOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [生产指令复核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31533) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `DELETE /api/product/order/review/{orderNo}`
 * @更新时间 `2023-12-12 10:45:18`
 */
export type DeleteApiProductOrderReviewOrderNoResponse = string;

/* prettier-ignore-end */
