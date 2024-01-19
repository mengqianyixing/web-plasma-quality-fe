/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [获取投产计划列表↗](https://yapi.sharing8.cn/project/529/interface/api/32352) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/orders`
 * @更新时间 `2024-01-18 10:23:39`
 */
export interface PostApiProductPlanOrdersRequest {
  /**
   * 指令编号
   */
  orderNo?: string;
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
  planState?: string;
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [获取投产计划列表↗](https://yapi.sharing8.cn/project/529/interface/api/32352) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/orders`
 * @更新时间 `2024-01-18 10:23:39`
 */
export interface PostApiProductPlanOrdersResponse {
  totalCount: number;
  pageSize?: null;
  currPage: null;
  totalPage: null;
  result?: {
    /**
     * 制造批号
     */
    mesId: string;
    /**
     * 计划投浆量
     */
    orderWeight: number;
    /**
     * 投产类型
     */
    orderType: string;
    /**
     * 计划出库日期
     */
    planOut: string;
    /**
     * 计划投产日期
     */
    planTask: string;
    /**
     * 血浆袋数
     */
    totalNum: number;
    /**
     * 血浆净重
     */
    totalWeight: number;
    /**
     * 浆员数量
     */
    totalDonor: number;
    /**
     * 血浆有效期
     */
    expiration: string;
    /**
     * 组浆状态
     */
    state: string;
    /**
     * 效价类型
     */
    immuneTypes?: string;
    /**
     * 计划人
     */
    planner: string;
    /**
     * 计划日期
     */
    planAt: string;
    /**
     * 复核人
     */
    planReviewer: string;
    /**
     * 复核日期
     */
    planRevieAt: string;
    /**
     * 审核人
     */
    planChecker: string;
    /**
     * 审核日期
     */
    planCheckAt: string;
    orderNo: string;
  }[];
}

/**
 * 接口 [查询已准备的投产准备号列表↗](https://yapi.sharing8.cn/project/529/interface/api/32362) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/prepare/{orderNo}`
 * @更新时间 `2024-01-18 10:16:09`
 */
export interface GetApiProductPlanPrepareOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [查询已准备的投产准备号列表↗](https://yapi.sharing8.cn/project/529/interface/api/32362) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/prepare/{orderNo}`
 * @更新时间 `2024-01-18 10:16:09`
 */
export type GetApiProductPlanPrepareOrderNoResponse = {
  ppNo: string;
  prodType: string;
  minCollectAt: string;
  maxCollectAt: string;
  prodBagCount: string;
  netWeight: string;
  immuneTypes: string;
}[];

/**
 * 接口 [查询投产准备详情↗](https://yapi.sharing8.cn/project/529/interface/api/32367) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/{orderNo}`
 * @更新时间 `2024-01-18 10:16:16`
 */
export interface GetApiProductPlanOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [查询投产准备详情↗](https://yapi.sharing8.cn/project/529/interface/api/32367) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/{orderNo}`
 * @更新时间 `2024-01-18 10:16:16`
 */
export interface GetApiProductPlanOrderNoResponse {
  /**
   * 制造批号
   */
  mesId: string;
  /**
   * 投产类型
   */
  orderType: string;
  /**
   * 血浆效期
   */
  expiration: string;
  /**
   * 计划投浆量
   */
  orderWeight: string;
  /**
   * 计划出库日期
   */
  planOut: string;
  /**
   * 计划投产日期
   */
  planTask: string;
  /**
   * 血浆袋数
   */
  prodBagCount: string;
  /**
   * 血浆净重
   */
  netWeight: string;
  /**
   * 最早采集日期
   */
  minCollectAt: string;
  /**
   * 最晚采集日期
   */
  maxCollectAt: string;
  /**
   * 浆员数量
   */
  donorCount: string;
  /**
   * 平均效价值
   */
  avgTiter?: string;
  /**
   * 高效价数量
   */
  tallTiterCount?: string;
  /**
   * 低效价数量
   */
  lowTiterCount?: string;
  /**
   * 普通数量
   */
  ordinaryCount?: string;
  /**
   * 状态
   */
  state?: string;
}

/**
 * 接口 [查询已准备的血浆箱号↗](https://yapi.sharing8.cn/project/529/interface/api/32372) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/box/{orderNo}`
 * @更新时间 `2024-01-18 10:16:22`
 */
export interface GetApiProductPlanBoxOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [查询已准备的血浆箱号↗](https://yapi.sharing8.cn/project/529/interface/api/32372) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/box/{orderNo}`
 * @更新时间 `2024-01-18 10:16:22`
 */
export type GetApiProductPlanBoxOrderNoResponse = {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 血浆批号
   */
  batchNos: string;
  /**
   * 血浆箱号
   */
  boxNo: string;
  /**
   * 血浆袋数
   */
  prodBagCount: string;
  /**
   * 血浆净重
   */
  netWeight: string;
  /**
   * 效价类型
   */
  immuneTypes: string;
}[];

/**
 * 接口 [按效价类型统计↗](https://yapi.sharing8.cn/project/529/interface/api/32377) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/immuneType/{orderNo}`
 * @更新时间 `2024-01-18 10:16:35`
 */
export interface GetApiProductPlanImmuneTypeOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [按效价类型统计↗](https://yapi.sharing8.cn/project/529/interface/api/32377) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/immuneType/{orderNo}`
 * @更新时间 `2024-01-18 10:16:35`
 */
export type GetApiProductPlanImmuneTypeOrderNoResponse = {
  /**
   * 效价类型
   */
  immuneType: string;
  /**
   * 血浆袋数
   */
  prodBagCount: string;
  /**
   * 数量比例
   */
  quantityRatio: string;
  /**
   * 血浆净重
   */
  netWeight: string;
  /**
   * 净重比例
   */
  weightRatio: string;
}[];

/**
 * 接口 [按采浆公司统计↗](https://yapi.sharing8.cn/project/529/interface/api/32382) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/station/{orderNo}`
 * @更新时间 `2024-01-18 10:16:44`
 */
export interface GetApiProductPlanStationOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [按采浆公司统计↗](https://yapi.sharing8.cn/project/529/interface/api/32382) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/station/{orderNo}`
 * @更新时间 `2024-01-18 10:16:44`
 */
export type GetApiProductPlanStationOrderNoResponse = {
  stationName: string;
  /**
   * 血浆袋数
   */
  prodBagCount: string;
  quantityRatio: string;
  netWeight: string;
  weightRatio: string;
}[];

/**
 * 接口 [按批次统计↗](https://yapi.sharing8.cn/project/529/interface/api/32387) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/batch/{orderNo}`
 * @更新时间 `2024-01-18 10:16:51`
 */
export interface GetApiProductPlanBatchOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [按批次统计↗](https://yapi.sharing8.cn/project/529/interface/api/32387) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `GET /api/product/plan/batch/{orderNo}`
 * @更新时间 `2024-01-18 10:16:51`
 */
export type GetApiProductPlanBatchOrderNoResponse = {
  stationName: string;
  batchNo: string;
  /**
   * 血浆袋数
   */
  prodBagCount: string;
  netWeight: string;
  immuneTypes: string;
}[];

/**
 * 接口 [查询血浆明细↗](https://yapi.sharing8.cn/project/529/interface/api/32392) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/bag`
 * @更新时间 `2024-01-18 09:58:49`
 */
export interface PostApiProductPlanBagRequest {
  orderNo: string;
  pageSize: number;
  currPage: number;
}

/**
 * 接口 [查询血浆明细↗](https://yapi.sharing8.cn/project/529/interface/api/32392) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/bag`
 * @更新时间 `2024-01-18 09:58:49`
 */
export interface PostApiProductPlanBagResponse {
  totalCount: number;
  totalPage: number;
  currPage: number;
  pageSize: number;
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
     * 血浆箱号
     */
    boxNo: string;
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 采集日期
     */
    collectAt: number;
    /**
     * 浆员编号
     */
    fkDonorNo: number;
    /**
     * 浆员姓名
     */
    donorName: number;
    /**
     * 血浆类型
     */
    bloodType: string;
    /**
     * 效价类型
     */
    immunity: string;
    /**
     * 效价值
     */
    titer: string;
    /**
     * 血浆状态
     */
    verified: number;
  }[];
}

/**
 * 接口 [查询未准备的投产准备号↗](https://yapi.sharing8.cn/project/529/interface/api/32412) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/prepare`
 * @更新时间 `2024-01-18 18:12:22`
 */
export interface PostApiProductPlanPrepareRequest {
  orderNo: string;
  prodType?: string;
  prepareNo?: string;
  currPage?: string;
  pageSize?: string;
}

/**
 * 接口 [查询未准备的投产准备号↗](https://yapi.sharing8.cn/project/529/interface/api/32412) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/prepare`
 * @更新时间 `2024-01-18 18:12:22`
 */
export interface PostApiProductPlanPrepareResponse {
  totalCount: number;
  currPage: null;
  totalPage: null;
  pageSize: null;
  result?: {
    prodType: string;
    ppNo: string;
    minCollectAt: string;
    maxCollectAt: string;
    prodBagCount: string;
    netWeight: string;
    boxCount: string;
  }[];
}

/**
 * 接口 [查询可准备的血浆箱号↗](https://yapi.sharing8.cn/project/529/interface/api/32422) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/box`
 * @更新时间 `2024-01-18 10:16:29`
 */
export interface PostApiProductPlanBoxRequest {
  /**
   * 投产准备号
   */
  prepareNo?: string;
  /**
   * 投产类型
   */
  prodType?: string;
  /**
   * 血浆箱号
   */
  boxNo?: string;
  orderNo: string;
}

/**
 * 接口 [查询可准备的血浆箱号↗](https://yapi.sharing8.cn/project/529/interface/api/32422) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/box`
 * @更新时间 `2024-01-18 10:16:29`
 */
export type PostApiProductPlanBoxResponse = {
  /**
   * 血浆箱号
   */
  boxNo: string;
  /**
   * 血浆袋数
   */
  prodBagCount: string;
  /**
   * 血浆净重
   */
  netWeight: string;
  /**
   * 效价类型
   */
  immuneTypes: string;
  /**
   * 投产准备号
   */
  prepareNo: string;
  /**
   * 最早采集日期
   */
  minCollectAt: string;
  /**
   * 最晚采集日期
   */
  maxCollectAt: string;
}[];

/**
 * 接口 [按投产准备号挑选↗](https://yapi.sharing8.cn/project/529/interface/api/32462) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/prepare/select`
 * @更新时间 `2024-01-18 19:05:14`
 */
export interface PostApiProductPlanPrepareSelectRequest {
  /**
   * 制造批号
   */
  orderNo: string;
  prodPrepares: string[];
  /**
   * 要绑定的袋数
   */
  bagCount: number;
}

/**
 * 接口 [按投产准备号挑选↗](https://yapi.sharing8.cn/project/529/interface/api/32462) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/prepare/select`
 * @更新时间 `2024-01-18 19:05:14`
 */
export type PostApiProductPlanPrepareSelectResponse = string;

/**
 * 接口 [按箱号取消挑选↗](https://yapi.sharing8.cn/project/529/interface/api/32467) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `DELETE /api/product/plan/box/cancel`
 * @更新时间 `2024-01-18 09:59:09`
 */
export interface DeleteApiProductPlanBoxCancelRequest {
  /**
   * 制造批号
   */
  orderNo: string;
  boxNos: string[];
  /**
   * 要取消的袋数
   */
  bagCount: number;
}

/**
 * 接口 [按箱号取消挑选↗](https://yapi.sharing8.cn/project/529/interface/api/32467) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `DELETE /api/product/plan/box/cancel`
 * @更新时间 `2024-01-18 09:59:09`
 */
export type DeleteApiProductPlanBoxCancelResponse = string;

/**
 * 接口 [按箱号准备号挑选↗](https://yapi.sharing8.cn/project/529/interface/api/32517) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/box/select`
 * @更新时间 `2024-01-18 09:59:03`
 */
export interface PostApiProductPlanBoxSelectRequest {
  /**
   * 制造批号
   */
  orderNo: string;
  boxNos: string[];
  /**
   * 要绑定的袋数
   */
  bagCount: number;
}

/**
 * 接口 [按箱号准备号挑选↗](https://yapi.sharing8.cn/project/529/interface/api/32517) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `POST /api/product/plan/box/select`
 * @更新时间 `2024-01-18 09:59:03`
 */
export type PostApiProductPlanBoxSelectResponse = string;

/**
 * 接口 [按投产准备号取消挑选↗](https://yapi.sharing8.cn/project/529/interface/api/32527) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `DELETE /api/product/plan/prepare/cancel`
 * @更新时间 `2024-01-18 19:06:10`
 */
export interface DeleteApiProductPlanPrepareCancelRequest {
  /**
   * 制造批号
   */
  orderNo: string;
  prodPrepares: string[];
  /**
   * 要取消的袋数
   */
  bagCount: number;
}

/**
 * 接口 [按投产准备号取消挑选↗](https://yapi.sharing8.cn/project/529/interface/api/32527) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `DELETE /api/product/plan/prepare/cancel`
 * @更新时间 `2024-01-18 19:06:10`
 */
export type DeleteApiProductPlanPrepareCancelResponse = string;

/**
 * 接口 [投产计划完成↗](https://yapi.sharing8.cn/project/529/interface/api/32552) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/complete/{orderNo}`
 * @更新时间 `2024-01-18 16:31:30`
 */
export interface PutApiProductPlanCompleteOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [投产计划完成↗](https://yapi.sharing8.cn/project/529/interface/api/32552) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/complete/{orderNo}`
 * @更新时间 `2024-01-18 16:31:30`
 */
export type PutApiProductPlanCompleteOrderNoResponse = string;

/**
 * 接口 [投产计划完成撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32557) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/complete/cancel`
 * @更新时间 `2024-01-18 16:31:34`
 */
export interface PutApiProductPlanCompleteCancelRequest {
  orderNo: string;
  cause: string;
}

/**
 * 接口 [投产计划完成撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32557) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/complete/cancel`
 * @更新时间 `2024-01-18 16:31:34`
 */
export interface PutApiProductPlanCompleteCancelResponse {}

/**
 * 接口 [投产计划审核↗](https://yapi.sharing8.cn/project/529/interface/api/32562) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/check/{orderNo}`
 * @更新时间 `2024-01-18 16:28:01`
 */
export interface PutApiProductPlanCheckOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [投产计划审核↗](https://yapi.sharing8.cn/project/529/interface/api/32562) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/check/{orderNo}`
 * @更新时间 `2024-01-18 16:28:01`
 */
export type PutApiProductPlanCheckOrderNoResponse = string;

/**
 * 接口 [投产计划完成撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32567) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/check/cancel`
 * @更新时间 `2024-01-18 16:28:31`
 */
export interface PutApiProductPlanCheckCancelRequest {
  orderNo: string;
  cause: string;
}

/**
 * 接口 [投产计划完成撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32567) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/check/cancel`
 * @更新时间 `2024-01-18 16:28:31`
 */
export interface PutApiProductPlanCheckCancelResponse {}

/**
 * 接口 [投产计划复核↗](https://yapi.sharing8.cn/project/529/interface/api/32572) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/review/{orderNo}`
 * @更新时间 `2024-01-18 16:29:17`
 */
export interface PutApiProductPlanReviewOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [投产计划复核↗](https://yapi.sharing8.cn/project/529/interface/api/32572) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/review/{orderNo}`
 * @更新时间 `2024-01-18 16:29:17`
 */
export type PutApiProductPlanReviewOrderNoResponse = string;

/**
 * 接口 [投产计划复核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32577) 的 **请求类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/review/cancel`
 * @更新时间 `2024-01-18 16:29:59`
 */
export interface PutApiProductPlanReviewCancelRequest {
  orderNo: string;
  cause: string;
}

/**
 * 接口 [投产计划复核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32577) 的 **返回类型**
 *
 * @分类 [投产计划↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5424)
 * @请求头 `PUT /api/product/plan/review/cancel`
 * @更新时间 `2024-01-18 16:29:59`
 */
export interface PutApiProductPlanReviewCancelResponse {}

/* prettier-ignore-end */
