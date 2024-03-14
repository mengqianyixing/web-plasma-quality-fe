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
 * @更新时间 `2024-03-13 17:50:02`
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
  /**
   * 计划出库日期开始时间
   */
  begnPlanOut?: string;
  /**
   * 计划出库日期结束时间
   */
  endPlanOut?: string;
  /**
   * 计划投产日期开始时间
   */
  begnPlanTask?: string;
  /**
   * 计划投产日期结束时间
   */
  endPlanTask?: string;
  /**
   * out  标识为投产出库页面
   */
  pageFlag?: string;
}

/**
 * 接口 [查询生产指令列表↗](https://yapi.sharing8.cn/project/529/interface/api/31491) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `POST /api/product/orders`
 * @更新时间 `2024-03-13 17:50:02`
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
     * 投产箱数
     */
    boxNum: number;
    /**
     * 投浆数量
     */
    totalNum: number;
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
    /**
     * 复核人
     */
    reviewer?: string;
    /**
     * 复核日期
     */
    reviewAt?: string;
    /**
     * 审核人
     */
    checker?: string;
    /**
     * 审核日期
     */
    checkAt?: string;
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
 * @更新时间 `2023-12-15 13:46:25`
 */
export interface DeleteApiProductOrderOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [生产指令撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31518) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `DELETE /api/product/order/{orderNo}`
 * @更新时间 `2023-12-15 13:46:25`
 */
export type DeleteApiProductOrderOrderNoResponse = string;

/**
 * 接口 [生产指令审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31524) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `PUT /api/product/order/check`
 * @更新时间 `2023-12-15 13:49:33`
 */
export interface PutApiProductOrderCheckRequest {
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
 * 接口 [生产指令审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31524) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `PUT /api/product/order/check`
 * @更新时间 `2023-12-15 13:49:33`
 */
export interface PutApiProductOrderCheckResponse {}

/**
 * 接口 [生产指令审核↗](https://yapi.sharing8.cn/project/529/interface/api/31527) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `PUT /api/product/order/check/{orderNo}`
 * @更新时间 `2023-12-15 13:46:58`
 */
export interface PutApiProductOrderCheckOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [生产指令审核↗](https://yapi.sharing8.cn/project/529/interface/api/31527) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `PUT /api/product/order/check/{orderNo}`
 * @更新时间 `2023-12-15 13:46:58`
 */
export type PutApiProductOrderCheckOrderNoResponse = string;

/**
 * 接口 [生产指令复核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31530) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `PUT /api/product/order/review`
 * @更新时间 `2023-12-15 13:49:01`
 */
export interface PutApiProductOrderReviewRequest {
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
 * 接口 [生产指令复核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31530) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `PUT /api/product/order/review`
 * @更新时间 `2023-12-15 13:49:01`
 */
export type PutApiProductOrderReviewResponse = string;

/**
 * 接口 [生产指令复核↗](https://yapi.sharing8.cn/project/529/interface/api/31533) 的 **请求类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `PUT /api/product/order/review/{orderNo}`
 * @更新时间 `2023-12-15 13:48:55`
 */
export interface PutApiProductOrderReviewOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [生产指令复核↗](https://yapi.sharing8.cn/project/529/interface/api/31533) 的 **返回类型**
 *
 * @分类 [生产指令↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5173)
 * @请求头 `PUT /api/product/order/review/{orderNo}`
 * @更新时间 `2023-12-15 13:48:55`
 */
export type PutApiProductOrderReviewOrderNoResponse = string;

/* prettier-ignore-end */
