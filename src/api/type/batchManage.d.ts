/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询接收记录信息↗](https://yapi.sharing8.cn/project/529/interface/api/31755) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/accept/{batchNo}`
 * @更新时间 `2023-12-21 17:36:42`
 */
export interface GetApiCoreBatchPlasmaAcceptBatchNoRequest {
  /**
   * 批号
   */
  batchNo: string;
}

/**
 * 接口 [查询接收记录信息↗](https://yapi.sharing8.cn/project/529/interface/api/31755) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/accept/{batchNo}`
 * @更新时间 `2023-12-21 17:36:42`
 */
export interface GetApiCoreBatchPlasmaAcceptBatchNoResponse {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 出库单号
   */
  transNo: string;
  /**
   * 接收详情
   */
  acceptDetail: {
    /**
     * 血浆箱数
     */
    boxCount: number;
    /**
     * 血浆数量
     */
    plasmaCount: number;
    /**
     * 未接收箱数
     */
    unAcceptCount: number;
    /**
     * 已接收箱数
     */
    acceptCount: number;
    /**
     * 未接收箱列表
     */
    unAcceptDetails: {
      /**
       * 箱号
       */
      boxNo: string;
      /**
       * 血浆数量
       */
      plasmaCount: number;
    }[];
    /**
     * 已接收箱列表
     */
    acceptDetails: {
      /**
       * 箱号
       */
      boxNo: string;
      /**
       * 血浆数量
       */
      plasmaCount: number;
      /**
       * 托盘编号
       */
      trayNo: string;
      /**
       * 接收人
       */
      operator: string;
      /**
       * 复核人
       */
      checker: string;
      /**
       * 接收日期
       */
      acceptAt: string;
    }[];
  };
}

/**
 * 接口 [批次汇总信息(批次下拉框)↗](https://yapi.sharing8.cn/project/529/interface/api/31758) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/summary`
 * @更新时间 `2023-12-22 13:38:36`
 */
export interface GetApiCoreBatchSummaryRequest {
  /**
   * 浆站编号
   */
  stationNo?: string;
  /**
   * 批号
   */
  batchNo?: string;
  /**
   * 接收状态
   */
  acceptState?: string;
  /**
   * 验收状态
   */
  verifyState?: string;
  /**
   * 当前页
   */
  currPage: string;
  /**
   * 大小
   */
  pageSize: string;
}

/**
 * 接口 [批次汇总信息(批次下拉框)↗](https://yapi.sharing8.cn/project/529/interface/api/31758) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/summary`
 * @更新时间 `2023-12-22 13:38:36`
 */
export interface GetApiCoreBatchSummaryResponse {
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
    stationName: string;
    /**
     * 出库人/时间
     */
    dispatch: {
      /**
       * 出库人
       */
      depositor: string;
      /**
       * 出库时间
       */
      optTime: string;
    };
    /**
     * 血浆数量
     */
    plasmaCount: number;
    /**
     * 箱数
     */
    boxCount: string;
    /**
     * 接收状态
     */
    acceptState: string;
    /**
     * 验收状态
     */
    verifyState: string;
    /**
     * 批号
     */
    batchNo: string;
  };
}

/**
 * 接口 [血浆接收↗](https://yapi.sharing8.cn/project/529/interface/api/31761) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/accept/box`
 * @更新时间 `2023-12-27 13:53:04`
 */
export interface PostApiCoreBatchPlasmaAcceptBoxRequest {
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 血浆箱号
   */
  boxNo: string;
  /**
   * 复核人
   */
  checker?: string;
  /**
   * 托盘
   */
  trayNo: string;
}

/**
 * 接口 [血浆接收↗](https://yapi.sharing8.cn/project/529/interface/api/31761) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/accept/box`
 * @更新时间 `2023-12-27 13:53:04`
 */
export interface PostApiCoreBatchPlasmaAcceptBoxResponse {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 出库单号
   */
  transNo: string;
  /**
   * 接收详情
   */
  acceptDetail: {
    /**
     * 血浆箱数
     */
    boxCount: number;
    /**
     * 血浆数量
     */
    plasmaCount: number;
    /**
     * 未接收箱数
     */
    unAcceptCount: number;
    /**
     * 已接收箱数
     */
    acceptCount: number;
    /**
     * 未接收箱列表
     */
    unAcceptDetails: {
      /**
       * 箱号
       */
      boxNo: string;
      /**
       * 血浆数量
       */
      plasmaCount: number;
    }[];
    /**
     * 已接收箱列表
     */
    acceptDetails: {
      /**
       * 箱号
       */
      boxNo: string;
      /**
       * 血浆数量
       */
      plasmaCount: number;
      /**
       * 托盘编号
       */
      trayNo: string;
      /**
       * 接收人
       */
      operator: string;
      /**
       * 复核人
       */
      checker: string;
      /**
       * 接收日期
       */
      acceptAt: string;
    }[];
  };
}

/**
 * 接口 [提交接收单↗](https://yapi.sharing8.cn/project/529/interface/api/31764) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `PUT /api/core/batch/commit/acceptation/{batchNo}`
 * @更新时间 `2023-12-21 15:47:05`
 */
export interface PutApiCoreBatchCommitAcceptationBatchNoRequest {
  /**
   * 批号
   */
  batchNo: string;
}

/**
 * 接口 [提交接收单↗](https://yapi.sharing8.cn/project/529/interface/api/31764) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `PUT /api/core/batch/commit/acceptation/{batchNo}`
 * @更新时间 `2023-12-21 15:47:05`
 */
export interface PutApiCoreBatchCommitAcceptationBatchNoResponse {}

/**
 * 接口 [查询提交单记录↗](https://yapi.sharing8.cn/project/529/interface/api/31767) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/acceptation/{batchNo}`
 * @更新时间 `2023-12-21 17:00:45`
 */
export interface GetApiCoreBatchAcceptationBatchNoRequest {
  /**
   * 批号
   */
  batchNo: string;
}

/**
 * 接口 [查询提交单记录↗](https://yapi.sharing8.cn/project/529/interface/api/31767) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/acceptation/{batchNo}`
 * @更新时间 `2023-12-21 17:00:45`
 */
export type GetApiCoreBatchAcceptationBatchNoResponse = {
  /**
   * 接收人
   */
  operator: string;
  /**
   * 复核人
   */
  checker: string;
  /**
   * 创建时间
   */
  createAt: string;
  /**
   * 提交时间
   */
  commitAt: string;
  /**
   * 接收箱数
   */
  boxCount: number;
}[];

/**
 * 接口 [验收数量详情↗](https://yapi.sharing8.cn/project/529/interface/api/31770) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/bag/statistics/{batchNo}`
 * @更新时间 `2023-12-23 15:11:38`
 */
export interface GetApiCoreBagStatisticsBatchNoRequest {
  batchNo: string;
}

/**
 * 接口 [验收数量详情↗](https://yapi.sharing8.cn/project/529/interface/api/31770) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/bag/statistics/{batchNo}`
 * @更新时间 `2023-12-23 15:11:38`
 */
export type GetApiCoreBagStatisticsBatchNoResponse = {
  /**
   * 免疫类型
   */
  immuType?: string;
  /**
   * 血浆数量
   */
  plasmaNum?: number;
  /**
   * 血浆重量
   */
  plasmaWeight?: number;
}[];

/**
 * 接口 [血浆批次详情↗](https://yapi.sharing8.cn/project/529/interface/api/31791) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/bag/plasma`
 * @更新时间 `2023-12-25 16:19:51`
 */
export interface GetApiCoreBagPlasmaRequest {
  /**
   * 批次号
   */
  batchNo: string;
  /**
   * 验收状态  传FAIL为不合格
   */
  bagVerify?: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [血浆批次详情↗](https://yapi.sharing8.cn/project/529/interface/api/31791) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/bag/plasma`
 * @更新时间 `2023-12-25 16:19:51`
 */
export interface GetApiCoreBagPlasmaResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    /**
     * 采浆公司编号
     */
    stationNo: string;
    /**
     * 采浆公司名称
     */
    stationName: string;
    /**
     * 血浆批号
     */
    batchNo: string;
    /**
     * 浆站箱号
     */
    boxNo: string;
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 采集日期
     */
    collectAt: string;
    /**
     * 浆员编号
     */
    donorNo: string;
    /**
     * 浆员姓名
     */
    donorName: string;
    /**
     * 浆员状态
     */
    donorStatus: string;
    /**
     * 采浆类型
     */
    immType: string;
    /**
     * 浆站净重
     */
    stationWeight: number;
    /**
     * 验收净重
     */
    verifyWeight: number;
    /**
     * 地址
     */
    address: string;
  }[];
}

/**
 * 接口 [查询血浆验收记录信息↗](https://yapi.sharing8.cn/project/529/interface/api/31809) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/{boxNo}`
 * @更新时间 `2023-12-27 17:28:33`
 */
export interface GetApiCoreBatchPlasmaVerifyBoxNoRequest {
  /**
   * 箱号
   */
  boxNo: string;
}

/**
 * 接口 [查询血浆验收记录信息↗](https://yapi.sharing8.cn/project/529/interface/api/31809) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/{boxNo}`
 * @更新时间 `2023-12-27 17:28:33`
 */
export interface GetApiCoreBatchPlasmaVerifyBoxNoResponse {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 采浆公司编号
   */
  stationNo: string;
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 已验收血浆数
   */
  verifyBagCount: number;
  /**
   * 血浆总数
   */
  bagCount: number;
  /**
   * 已验收箱数
   */
  verifyBoxCount: number;
  /**
   * 箱总数
   */
  boxCount: number;
  /**
   * 未验收血浆编号
   */
  unVerifyBag: string[];
  /**
   * 已验收血浆信息
   */
  verifyBag: {
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 验收时间
     */
    verifyAt: string;
    /**
     * 血浆验收结果
     */
    bagResult: string;
    /**
     * 样本验收结果
     */
    sampleResult: string;
  }[];
  /**
   * 血浆箱号
   */
  boxNo: string;
}

/**
 * 接口 [查询血浆验收袋记录信息↗](https://yapi.sharing8.cn/project/529/interface/api/31812) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/bag`
 * @更新时间 `2023-12-29 13:43:38`
 */
export interface GetApiCoreBatchPlasmaVerifyBagRequest {
  /**
   * 浆站编号
   */
  stationNo?: string;
  /**
   * 批号
   */
  batchNo?: string;
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 验收状态(WAIT-未验收  PASS-已验收)
   */
  verifyState?: string;
  /**
   * 验收结果(PASS-合格 FAIL-不合格)
   */
  verifyResult?: string;
}

/**
 * 接口 [查询血浆验收袋记录信息↗](https://yapi.sharing8.cn/project/529/interface/api/31812) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/bag`
 * @更新时间 `2023-12-29 13:43:38`
 */
export type GetApiCoreBatchPlasmaVerifyBagResponse = {
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 袋号
   */
  bagNo?: string;
  /**
   * 采集日期
   */
  collectAt?: string;
  /**
   * 浆员编号
   */
  donorNo?: string;
  /**
   * 浆员名称
   */
  donorName?: string;
  /**
   * 性别 （M, F）
   */
  gender?: string;
  /**
   * 血型（A,B,AB,O）
   */
  bloodType?: string;
  /**
   * 浆站重量
   */
  rawWeight?: number;
  /**
   * 验收净重
   */
  netWeight?: number;
  /**
   * 验收人
   */
  verifyUser?: string;
  /**
   * 复核人
   */
  checker?: string;
  /**
   * 验收时间
   */
  verifyAt?: string;
  /**
   * 验收状态
   */
  verifyState?: string;
  /**
   * 血浆验收结果
   */
  bagVerifyResult?: string;
  /**
   * 样本验收结果
   */
  sampleResult?: string;
}[];

/**
 * 接口 [查询血浆验收箱记录信息↗](https://yapi.sharing8.cn/project/529/interface/api/31815) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/box`
 * @更新时间 `2023-12-26 14:22:23`
 */
export interface GetApiCoreBatchPlasmaVerifyBoxRequest {
  /**
   * 浆站编号
   */
  stationNo: string;
  /**
   * 批号
   */
  batchNo: string;
  /**
   * 箱号
   */
  boxNo: string;
  /**
   * 验收状态
   */
  verifyState: string;
  /**
   * 验收结果
   */
  verifyResult: string;
}

/**
 * 接口 [查询血浆验收箱记录信息↗](https://yapi.sharing8.cn/project/529/interface/api/31815) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/box`
 * @更新时间 `2023-12-26 14:22:23`
 */
export type GetApiCoreBatchPlasmaVerifyBoxResponse = {
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 接收人
   */
  acceptUser?: string;
  /**
   * 未验收数量
   */
  unVerifyCount?: string;
  /**
   * 已验收数量
   */
  verifyCount?: string;
  /**
   * 验收合格数量
   */
  qualifiedCount?: string;
  /**
   * 验收人
   */
  verifyUser?: string;
  /**
   * 验收复核人
   */
  checker?: string;
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * 验收状态
   */
  verifyState?: string;
}[];

/**
 * 接口 [样本接收↗](https://yapi.sharing8.cn/project/529/interface/api/31830) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/accept`
 * @更新时间 `2023-12-25 21:43:51`
 */
export interface PostApiCoreBatchSampleAcceptRequest {
  /**
   * 样本批次号
   */
  batchSampleNo: string;
}

/**
 * 接口 [样本接收↗](https://yapi.sharing8.cn/project/529/interface/api/31830) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/accept`
 * @更新时间 `2023-12-25 21:43:51`
 */
export type PostApiCoreBatchSampleAcceptResponse = string;

/**
 * 接口 [查询样本接收记录列表↗](https://yapi.sharing8.cn/project/529/interface/api/31839) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/accept`
 * @更新时间 `2023-12-28 11:00:14`
 */
export interface GetApiCoreBatchSampleAcceptRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 样本批次号
   */
  batchSampleNo?: string;
  /**
   * 采浆公司编号
   */
  stationNo?: string;
}

/**
 * 接口 [查询样本接收记录列表↗](https://yapi.sharing8.cn/project/529/interface/api/31839) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/accept`
 * @更新时间 `2023-12-28 11:00:14`
 */
export interface GetApiCoreBatchSampleAcceptResponse {
  /**
   * 当前页码
   */
  currPage?: number;
  /**
   * 页数大小
   */
  pageSize?: number;
  /**
   * 总数量
   */
  totalCount?: number;
  /**
   * 列表数据
   */
  result?: {
    /**
     * 采浆公司编号
     */
    stationNo?: string;
    /**
     * 采浆公司名称
     */
    stationName?: string;
    /**
     * 样品批号
     */
    batchSampleNo?: string;
    /**
     * 样品类型
     */
    sampleType?: string;
    /**
     * 样品总数
     */
    totalCount?: number;
    /**
     * 接收状态，W-未接收，R-接收中，F-已接收
     */
    acceptState?: string;
  }[];
}

/**
 * 接口 [血浆验收(袋)↗](https://yapi.sharing8.cn/project/529/interface/api/31848) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/bag`
 * @更新时间 `2023-12-27 17:28:54`
 */
export interface PostApiCoreBatchPlasmaVerifyBagRequest {
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 血浆箱号
   */
  boxNo?: string;
  /**
   * 血浆编号
   */
  bagNo: string;
  /**
   * 复核人
   */
  checker: string;
  /**
   * 托盘编号
   */
  trayNo: string;
}

/**
 * 接口 [血浆验收(袋)↗](https://yapi.sharing8.cn/project/529/interface/api/31848) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/bag`
 * @更新时间 `2023-12-27 17:28:54`
 */
export interface PostApiCoreBatchPlasmaVerifyBagResponse {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 采浆公司编号
   */
  stationNo: string;
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 已验收血浆数
   */
  verifyBagCount: number;
  /**
   * 血浆总数
   */
  bagCount: number;
  /**
   * 已验收箱数
   */
  verifyBoxCount: number;
  /**
   * 箱总数
   */
  boxCount: number;
  /**
   * 未验收血浆编号
   */
  unVerifyBag: string[];
  /**
   * 已验收血浆信息
   */
  verifyBag: {
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 验收时间
     */
    verifyAt: string;
    /**
     * 血浆验收结果
     */
    bagResult: string;
    /**
     * 样本验收结果
     */
    sampleResult: string;
  }[];
  /**
   * 血浆箱号
   */
  boxNo: string;
  /**
   * 献血浆者不符合项目
   */
  donorFailed: string;
}

/**
 * 接口 [查询样本批次接收详情信息↗](https://yapi.sharing8.cn/project/529/interface/api/31890) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/accept/{batchSampleNo}`
 * @更新时间 `2023-12-29 13:49:59`
 */
export interface GetApiCoreBatchSampleAcceptBatchSampleNoRequest {
  batchSampleNo: string;
}

/**
 * 接口 [查询样本批次接收详情信息↗](https://yapi.sharing8.cn/project/529/interface/api/31890) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/accept/{batchSampleNo}`
 * @更新时间 `2023-12-29 13:49:59`
 */
export interface GetApiCoreBatchSampleAcceptBatchSampleNoResponse {
  /**
   * 采浆公司编号
   */
  stationNo?: string;
  /**
   * 采浆公司名称
   */
  stationName?: string;
  /**
   * 样本批号
   */
  batchSampleNo?: string;
  /**
   * 样本类型
   */
  sampleType?: string;
  /**
   * 样本袋数
   */
  bagCount?: number;
  /**
   * 样本数量
   */
  totalCount?: number;
  /**
   * 接收状态，W-未接收，R-接收中，F-已接收
   */
  acceptState?: string;
  /**
   * 出库日期
   */
  outWarehouseDate: string;
  /**
   * 浆站出库信息{出库人、出库时间}
   */
  dispatch: {};
  /**
   * 已接收列表
   */
  unAcceptList?: {
    /**
     * 样本袋号
     */
    sampleBagNo: string;
    /**
     * 样本数量
     */
    sampleCount: number;
  }[];
  /**
   * 未接收列表
   */
  acceptedList: {
    /**
     * 样本袋号
     */
    sampleBagNo: string;
    /**
     * 样本数量
     */
    sampleCount: number;
    /**
     * 接收人
     */
    acceptor: string;
    /**
     * 接收日期
     */
    acceptAt: string;
  }[];
}

/**
 * 接口 [验收暂停、继续(箱)↗](https://yapi.sharing8.cn/project/529/interface/api/31893) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/box/pause`
 * @更新时间 `2023-12-29 10:40:32`
 */
export interface PostApiCoreBatchPlasmaVerifyBoxPauseRequest {
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 血浆箱号
   */
  boxNo: string;
  /**
   * 复核人
   */
  checker: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 类型(暂停-PAUSE  继续-RESTORE)
   */
  pauseType: string;
}

/**
 * 接口 [验收暂停、继续(箱)↗](https://yapi.sharing8.cn/project/529/interface/api/31893) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/box/pause`
 * @更新时间 `2023-12-29 10:40:32`
 */
export interface PostApiCoreBatchPlasmaVerifyBoxPauseResponse {}

/**
 * 接口 [验收暂停列表↗](https://yapi.sharing8.cn/project/529/interface/api/31896) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/pause/{batchNo}/{pattern}`
 * @更新时间 `2023-12-29 18:02:58`
 */
export interface GetApiCoreBatchPlasmaVerifyPauseBatchNoPatternRequest {
  /**
   * 批号
   */
  batchNo: string;
  /**
   * 查询类型(箱BOX , 批BCH)
   */
  pattern: string;
}

/**
 * 接口 [验收暂停列表↗](https://yapi.sharing8.cn/project/529/interface/api/31896) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/pause/{batchNo}/{pattern}`
 * @更新时间 `2023-12-29 18:02:58`
 */
export type GetApiCoreBatchPlasmaVerifyPauseBatchNoPatternResponse = {
  /**
   * 箱号
   */
  boxNo: string;
  /**
   * 托盘编号
   */
  trayNo: string;
  /**
   * 暂停时间
   */
  createAt: string;
  /**
   * 验收人
   */
  creater: string;
  /**
   * 复核人
   */
  reviewer: string;
  /**
   * 继续时间
   */
  freeAt: string;
  /**
   * 当前状态
   */
  state: string;
  /**
   * 唯一标识
   */
  bpId: string;
  /**
   * 继续人
   */
  freedBy: string;
  /**
   * 继续复核人
   */
  reviewBy: string;
}[];

/**
 * 接口 [验收暂停、继续(批)↗](https://yapi.sharing8.cn/project/529/interface/api/31908) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/batch/pause`
 * @更新时间 `2023-12-29 10:40:38`
 */
export interface PostApiCoreBatchPlasmaVerifyBatchPauseRequest {
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 复核人
   */
  checker: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 类型(暂停-PAUSE  继续-RESTORE)
   */
  pauseType: string;
}

/**
 * 接口 [验收暂停、继续(批)↗](https://yapi.sharing8.cn/project/529/interface/api/31908) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/batch/pause`
 * @更新时间 `2023-12-29 10:40:38`
 */
export interface PostApiCoreBatchPlasmaVerifyBatchPauseResponse {}

/**
 * 接口 [查询样本验收记录列表↗](https://yapi.sharing8.cn/project/529/interface/api/31938) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/verify`
 * @更新时间 `2023-12-29 13:48:35`
 */
export interface GetApiCoreBatchSampleVerifyRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 样本批次号
   */
  batchSampleNo: string;
}

/**
 * 接口 [查询样本验收记录列表↗](https://yapi.sharing8.cn/project/529/interface/api/31938) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/verify`
 * @更新时间 `2023-12-29 13:48:35`
 */
export interface GetApiCoreBatchSampleVerifyResponse {
  /**
   * 当前页码
   */
  currPage?: number;
  /**
   * 页数大小
   */
  pageSize?: number;
  /**
   * 总数量
   */
  totalCount?: number;
  /**
   * 数据列表
   */
  result?: {
    /**
     * 采浆公司编号
     */
    stationNo?: string;
    /**
     * 采浆公司名称
     */
    stationName?: string;
    /**
     * 样本批号
     */
    batchSampleNo?: string;
    /**
     * 样本类型
     */
    sampleType?: string;
    /**
     * 样本数量
     */
    totalCount?: number;
    /**
     * 验收状态，未验证W、验收中R、已验收S
     */
    verifyState?: string;
    /**
     * 接收时间
     */
    acceptAt?: string;
  }[];
}

/**
 * 接口 [查询样本批次验收详情信息↗](https://yapi.sharing8.cn/project/529/interface/api/31941) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/verify/{batchSampleNo}`
 * @更新时间 `2023-12-29 15:05:55`
 */
export interface GetApiCoreBatchSampleVerifyBatchSampleNoRequest {
  /**
   * 样本批号
   */
  batchSampleNo: string;
}

/**
 * 接口 [查询样本批次验收详情信息↗](https://yapi.sharing8.cn/project/529/interface/api/31941) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/verify/{batchSampleNo}`
 * @更新时间 `2023-12-29 15:05:55`
 */
export interface GetApiCoreBatchSampleVerifyBatchSampleNoResponse {
  /**
   * 已验收列表
   */
  verifyedList?: {
    /**
     * 样本编号
     */
    sampleNo?: string;
    /**
     * 验收人
     */
    verifier?: string;
    /**
     * 验收时间
     */
    verifyAt?: string;
    /**
     * 验收结果，0表示不合格，1表示合格
     */
    qualified?: number;
    /**
     * 不合格原因
     */
    unqualifiedReason?: string;
  }[];
  /**
   * 样本批号
   */
  batchSampleNo?: string;
  /**
   * 样本类型
   */
  sampleType?: string;
  /**
   * 接收时间
   */
  acceptAt?: string;
  /**
   * 样本袋数
   */
  bagCount?: number;
  /**
   * 样本数量
   */
  totalCount?: number;
  /**
   * 缺号数量
   */
  lackCount?: number;
  /**
   * 血浆验收不合格数量
   */
  plasmaAcceptUnqualifiedCount?: number;
  /**
   * 采浆公司编号
   */
  stationNo?: string;
  /**
   * 采浆公司名称
   */
  stationName?: string;
  /**
   * 未验收列表
   */
  unVerifyList?: {
    /**
     * 样本编号
     */
    sampleNo?: string;
  }[];
}

/**
 * 接口 [样本验收↗](https://yapi.sharing8.cn/project/529/interface/api/31947) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/verify`
 * @更新时间 `2023-12-29 14:18:27`
 */
export interface PostApiCoreBatchSampleVerifyRequest {
  /**
   * 样本批号
   */
  batchSampleNo: string;
}

/**
 * 接口 [样本验收↗](https://yapi.sharing8.cn/project/529/interface/api/31947) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/verify`
 * @更新时间 `2023-12-29 14:18:27`
 */
export type PostApiCoreBatchSampleVerifyResponse = string;

/**
 * 接口 [样本验收过程中确认献血浆者不符合↗](https://yapi.sharing8.cn/project/529/interface/api/31950) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/verify/non-conformance`
 * @更新时间 `2023-12-29 14:24:58`
 */
export interface PostApiCoreBatchSampleVerifyNonConformanceRequest {
  /**
   * 样本编号
   */
  sampleNo: string;
}

/**
 * 接口 [样本验收过程中确认献血浆者不符合↗](https://yapi.sharing8.cn/project/529/interface/api/31950) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/verify/non-conformance`
 * @更新时间 `2023-12-29 14:24:58`
 */
export type PostApiCoreBatchSampleVerifyNonConformanceResponse = string;

/**
 * 接口 [撤销单个样本验收↗](https://yapi.sharing8.cn/project/529/interface/api/31956) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `PUT /api/core/batch/sample/verify/revoke`
 * @更新时间 `2023-12-29 14:30:52`
 */
export interface PutApiCoreBatchSampleVerifyRevokeRequest {
  /**
   * 样本编号
   */
  sampleNo: string;
  /**
   * 复核人
   */
  checker: string;
  /**
   * 撤销原因
   */
  revokeReason: string;
}

/**
 * 接口 [撤销单个样本验收↗](https://yapi.sharing8.cn/project/529/interface/api/31956) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `PUT /api/core/batch/sample/verify/revoke`
 * @更新时间 `2023-12-29 14:30:52`
 */
export type PutApiCoreBatchSampleVerifyRevokeResponse = string;

/**
 * 接口 [验收撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31962) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/revoke/bag`
 * @更新时间 `2023-12-29 15:47:50`
 */
export interface PostApiCoreBatchPlasmaVerifyRevokeBagRequest {
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
   * 复核人
   */
  checker: string;
  /**
   * 托盘编号
   */
  trayNo: string;
  /**
   * 备注
   */
  remark: string;
}

/**
 * 接口 [验收撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31962) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/revoke/bag`
 * @更新时间 `2023-12-29 15:47:50`
 */
export interface PostApiCoreBatchPlasmaVerifyRevokeBagResponse {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 采浆公司编号
   */
  stationNo: string;
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 已验收血浆数
   */
  verifyBagCount: number;
  /**
   * 血浆总数
   */
  bagCount: number;
  /**
   * 已验收箱数
   */
  verifyBoxCount: number;
  /**
   * 箱总数
   */
  boxCount: number;
  /**
   * 未验收血浆编号
   */
  unVerifyBag: string[];
  /**
   * 已验收血浆信息
   */
  verifyBag: {
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 验收时间
     */
    verifyAt: string;
    /**
     * 血浆验收结果
     */
    bagResult: string;
    /**
     * 样本验收结果
     */
    sampleResult: string;
  }[];
  /**
   * 血浆箱号
   */
  boxNo: string;
  /**
   * 献血浆者不符合项目
   */
  donorFailed: string;
}

/**
 * 接口 [查询浆站缺号列表↗](https://yapi.sharing8.cn/project/529/interface/api/31965) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/verify/lack/{batchSampleNo}`
 * @更新时间 `2023-12-30 16:21:26`
 */
export interface GetApiCoreBatchSampleVerifyLackBatchSampleNoRequest {
  /**
   * 样本批号
   */
  batchSampleNo: string;
}

/**
 * 接口 [查询浆站缺号列表↗](https://yapi.sharing8.cn/project/529/interface/api/31965) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/verify/lack/{batchSampleNo}`
 * @更新时间 `2023-12-30 16:21:26`
 */
export type GetApiCoreBatchSampleVerifyLackBatchSampleNoResponse = {
  /**
   * 样本编号
   */
  sampleNo?: string;
  /**
   * 浆员名称
   */
  donorName?: string;
  /**
   * 浆员编号
   */
  donorNo?: string;
  /**
   * 采浆日期
   */
  collectDate?: string;
}[];

/**
 * 接口 [批称重↗](https://yapi.sharing8.cn/project/529/interface/api/31968) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/weight`
 * @更新时间 `2023-12-29 16:56:51`
 */
export interface PostApiCoreBatchPlasmaWeightRequest {
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 净重
   */
  netWeight: number;
}

/**
 * 接口 [批称重↗](https://yapi.sharing8.cn/project/529/interface/api/31968) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/weight`
 * @更新时间 `2023-12-29 16:56:51`
 */
export interface PostApiCoreBatchPlasmaWeightResponse {}

/**
 * 接口 [查询血浆验收中产生的不合格样本列表↗](https://yapi.sharing8.cn/project/529/interface/api/31971) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/verify/unqualified/{batchSampleNo}`
 * @更新时间 `2023-12-30 14:05:52`
 */
export interface GetApiCoreBatchSampleVerifyUnqualifiedBatchSampleNoRequest {
  /**
   * 样本批号
   */
  batchSampleNo: string;
}

/**
 * 接口 [查询血浆验收中产生的不合格样本列表↗](https://yapi.sharing8.cn/project/529/interface/api/31971) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/verify/unqualified/{batchSampleNo}`
 * @更新时间 `2023-12-30 14:05:52`
 */
export type GetApiCoreBatchSampleVerifyUnqualifiedBatchSampleNoResponse = {
  /**
   * 样本编号
   */
  sampleNo?: string;
  /**
   * 浆员名称
   */
  donorName?: string;
  /**
   * 浆员编号
   */
  donorNo?: string;
  /**
   * 采浆日期
   */
  collectDate?: string;
  /**
   * 不合格原因
   */
  unqualifiedReason?: string;
}[];

/* prettier-ignore-end */
