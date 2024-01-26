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

/**
 * 接口 [通过血浆批次查询箱号通过多个批号↗](https://yapi.sharing8.cn/project/529/interface/api/32752) 的 **请求类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `POST /api/core/bag/flag/box/batches`
 * @更新时间 `2024-01-23 19:24:08`
 */
export interface PostApiCoreBagFlagBoxBatchesRequest {
  batchNos: string[];
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [通过血浆批次查询箱号通过多个批号↗](https://yapi.sharing8.cn/project/529/interface/api/32752) 的 **返回类型**
 *
 * @分类 [血浆限制↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5460)
 * @请求头 `POST /api/core/bag/flag/box/batches`
 * @更新时间 `2024-01-23 19:24:08`
 */
export interface PostApiCoreBagFlagBoxBatchesResponse {
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
 * 接口 [新增放行单↗](https://yapi.sharing8.cn/project/529/interface/api/32677) 的 **请求类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `POST /api/product/release`
 * @更新时间 `2024-01-23 18:39:15`
 */
export interface PostApiProductReleaseRequest {
  /**
   * 制造批号
   */
  mesId: string;
  /**
   * 放行单号
   */
  prNo: string;
  /**
   * 审核项
   */
  releaseDetail: {
    /**
     * 排序号
     */
    appIndex: string;
    /**
     * 审核项目
     */
    appName: string;
    /**
     * 审核内容
     */
    appContent: string;
    /**
     * 审核结果
     */
    appResult: string;
  }[];
  /**
   * 结论
   */
  conclusion: string;
  /**
   * 备注
   */
  remark: string;
}

/**
 * 接口 [新增放行单↗](https://yapi.sharing8.cn/project/529/interface/api/32677) 的 **返回类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `POST /api/product/release`
 * @更新时间 `2024-01-23 18:39:15`
 */
export type PostApiProductReleaseResponse = string;

/**
 * 接口 [编辑放行单↗](https://yapi.sharing8.cn/project/529/interface/api/32687) 的 **请求类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `PUT /api/product/release`
 * @更新时间 `2024-01-24 19:45:27`
 */
export interface PutApiProductReleaseRequest {
  mesId: string;
  prNo: string;
  releaseDetail?: {
    appIndex: string;
    appName: string;
    appContent: string;
    appResult: string;
  }[];
}

/**
 * 接口 [编辑放行单↗](https://yapi.sharing8.cn/project/529/interface/api/32687) 的 **返回类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `PUT /api/product/release`
 * @更新时间 `2024-01-24 19:45:27`
 */
export interface PutApiProductReleaseResponse {}

/**
 * 接口 [获取放行单详情↗](https://yapi.sharing8.cn/project/529/interface/api/32692) 的 **请求类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `GET /api/product/release/{prNo}`
 * @更新时间 `2024-01-23 10:25:26`
 */
export interface GetApiProductReleasePrNoRequest {
  prNo: string;
}

/**
 * 接口 [获取放行单详情↗](https://yapi.sharing8.cn/project/529/interface/api/32692) 的 **返回类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `GET /api/product/release/{prNo}`
 * @更新时间 `2024-01-23 10:25:26`
 */
export interface GetApiProductReleasePrNoResponse {
  mesId: string;
  prNo: string;
  releaseDetail: {
    appIndex: string;
    appName: string;
    appContent: string;
    appResult: string;
  }[];
}

/**
 * 接口 [复核↗](https://yapi.sharing8.cn/project/529/interface/api/32697) 的 **请求类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `PUT /api/product/release/review/{prNo}`
 * @更新时间 `2024-01-23 19:14:21`
 */
export interface PutApiProductReleaseReviewPrNoRequest {
  prNo: string;
}

/**
 * 接口 [复核↗](https://yapi.sharing8.cn/project/529/interface/api/32697) 的 **返回类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `PUT /api/product/release/review/{prNo}`
 * @更新时间 `2024-01-23 19:14:21`
 */
export interface PutApiProductReleaseReviewPrNoResponse {}

/**
 * 接口 [放行↗](https://yapi.sharing8.cn/project/529/interface/api/32702) 的 **请求类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `PUT /api/product/release/{prNo}`
 * @更新时间 `2024-01-23 10:32:20`
 */
export interface PutApiProductReleasePrNoRequest {
  prNo: string;
}

/**
 * 接口 [放行↗](https://yapi.sharing8.cn/project/529/interface/api/32702) 的 **返回类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `PUT /api/product/release/{prNo}`
 * @更新时间 `2024-01-23 10:32:20`
 */
export type PutApiProductReleasePrNoResponse = string;

/**
 * 接口 [取消放行↗](https://yapi.sharing8.cn/project/529/interface/api/32707) 的 **请求类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `PUT /api/product/release/cancel`
 * @更新时间 `2024-01-23 10:33:45`
 */
export interface PutApiProductReleaseCancelRequest {
  prNo: string;
  reason?: string;
}

/**
 * 接口 [取消放行↗](https://yapi.sharing8.cn/project/529/interface/api/32707) 的 **返回类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `PUT /api/product/release/cancel`
 * @更新时间 `2024-01-23 10:33:45`
 */
export interface PutApiProductReleaseCancelResponse {}

/**
 * 接口 [查询放行单列表↗](https://yapi.sharing8.cn/project/529/interface/api/32712) 的 **请求类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `POST /api/product/releases`
 * @更新时间 `2024-01-24 10:46:03`
 */
export interface PostApiProductReleasesRequest {
  /**
   * 制造批号
   */
  mesId?: string;
  /**
   * 放行单号
   */
  prNo?: string;
  /**
   * 放行状态
   */
  state?: string;
  currPage: number;
  pageSize: number;
}

/**
 * 接口 [查询放行单列表↗](https://yapi.sharing8.cn/project/529/interface/api/32712) 的 **返回类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `POST /api/product/releases`
 * @更新时间 `2024-01-24 10:46:03`
 */
export interface PostApiProductReleasesResponse {
  pageSize: number;
  currPage: number;
  totalCount: number;
  totalPage: number;
  result?: {
    /**
     * 制造批号
     */
    mesId?: string;
    /**
     * 投产类型
     */
    orderType?: string;
    /**
     * 计划投产日期
     */
    planTask?: string;
    /**
     * 投产血浆净重
     */
    netWeight: string;
    /**
     * 投产血浆数量
     */
    prodBagCount: string;
    /**
     * 献血浆者人数
     */
    donorCount: string;
    /**
     * 最早采集日期
     */
    minCollectAt: string;
    /**
     * 最晚采集日期
     */
    maxCollectAt: string;
    /**
     * 最早采集血浆有效期至
     */
    earliestValid: string;
    /**
     * 最晚满检疫期日期
     */
    latestExpiration: string;
    /**
     * 放行状态
     */
    state: string;
    /**
     * 放行单号
     */
    prNo: string;
    /**
     * 审核人
     */
    checker: string;
    /**
     * 审核日期
     */
    checkAt: string;
    /**
     * 复核人
     */
    reviewer: string;
    /**
     * 复核日期
     */
    reviewAt: string;
    /**
     * 放行人
     */
    releaseBy: string;
    /**
     * 放行日期
     */
    releaseAt: string;
    orderNo: string;
    batchNos: string;
    /**
     * 是否有血浆限制标记
     */
    bagFlag: boolean;
  }[];
}

/**
 * 接口 [查询未挑选出的不合格血浆↗](https://yapi.sharing8.cn/project/529/interface/api/32722) 的 **请求类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `GET /api/product/release/unqualified/{orderNo}`
 * @更新时间 `2024-01-23 16:39:03`
 */
export interface GetApiProductReleaseUnqualifiedOrderNoRequest {
  orderNo: string;
}

/**
 * 接口 [查询未挑选出的不合格血浆↗](https://yapi.sharing8.cn/project/529/interface/api/32722) 的 **返回类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `GET /api/product/release/unqualified/{orderNo}`
 * @更新时间 `2024-01-23 16:39:03`
 */
export type GetApiProductReleaseUnqualifiedOrderNoResponse = {
  /**
   * 不合格血浆编号
   */
  bagNo: string;
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 不合格日期
   */
  createAt: string;
  /**
   * 不合格类型
   */
  fkFailedCode: string;
  /**
   * 不合格原因
   */
  failedReason: string;
  /**
   * 状态
   */
  state: string;
}[];

/**
 * 接口 [查询预制审核内容↗](https://yapi.sharing8.cn/project/529/interface/api/32787) 的 **请求类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `GET /api/product/release/detail`
 * @更新时间 `2024-01-24 17:57:38`
 */
export interface GetApiProductReleaseDetailRequest {}

/**
 * 接口 [查询预制审核内容↗](https://yapi.sharing8.cn/project/529/interface/api/32787) 的 **返回类型**
 *
 * @分类 [血浆批放行↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5469)
 * @请求头 `GET /api/product/release/detail`
 * @更新时间 `2024-01-24 17:57:38`
 */
export type GetApiProductReleaseDetailResponse = {
  appIndex: string;
  appName: string;
  appContent: string;
  appResult: string;
}[];

/* prettier-ignore-end */
