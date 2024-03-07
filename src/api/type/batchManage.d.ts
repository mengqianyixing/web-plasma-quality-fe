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
 * @更新时间 `2024-02-05 14:41:38`
 */
export interface GetApiCoreBagStatisticsBatchNoRequest {
  batchNo: string;
}

/**
 * 接口 [验收数量详情↗](https://yapi.sharing8.cn/project/529/interface/api/31770) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/bag/statistics/{batchNo}`
 * @更新时间 `2024-02-05 14:41:38`
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
   * 效价类型
   */
  titerType?: string;
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
 * @更新时间 `2024-02-05 15:17:03`
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
  /**
   * 验收人
   */
  receiver?: string;
  /**
   * 浆站箱号
   */
  boxNo?: string;
}

/**
 * 接口 [血浆批次详情↗](https://yapi.sharing8.cn/project/529/interface/api/31791) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/bag/plasma`
 * @更新时间 `2024-02-05 15:17:03`
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
     * 现存箱号
     */
    nowBoxNo: string;
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
     * 血型
     */
    bloodType: string;
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
 * @请求头 `GET /api/core/batch/plasma/verify/{batchNo}`
 * @更新时间 `2024-01-18 18:08:47`
 */
export interface GetApiCoreBatchPlasmaVerifyBatchNoRequest {
  batchNo: string;
}

/**
 * 接口 [查询血浆验收记录信息↗](https://yapi.sharing8.cn/project/529/interface/api/31809) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/{batchNo}`
 * @更新时间 `2024-01-18 18:08:47`
 */
export interface GetApiCoreBatchPlasmaVerifyBatchNoResponse {
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
   * 复核人
   */
  checker: string;
  /**
   * 托盘号
   */
  trayNo: string;
}

/**
 * 接口 [查询血浆验收袋记录信息↗](https://yapi.sharing8.cn/project/529/interface/api/31812) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/bag`
 * @更新时间 `2024-01-09 14:02:50`
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
   * 验收状态 0-未验收  1-已验收
   */
  verifyState?: string;
  /**
   * 验收结果 0-不合格 1-合格
   */
  verifyResult?: string;
}

/**
 * 接口 [查询血浆验收袋记录信息↗](https://yapi.sharing8.cn/project/529/interface/api/31812) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/bag`
 * @更新时间 `2024-01-09 14:02:50`
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
 * @更新时间 `2024-01-11 18:23:41`
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
 * @更新时间 `2024-01-11 18:23:41`
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
  /**
   * 复核人
   */
  checker: string;
  /**
   * 托盘号
   */
  trayNo: string;
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
 * @更新时间 `2024-01-04 17:14:43`
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
   * 操作类型(暂停-PAUSE  继续-RESTORE)
   */
  state: string;
  /**
   * 类型 ACC(接收) VER(验收)
   */
  type: string;
}

/**
 * 接口 [验收暂停、继续(箱)↗](https://yapi.sharing8.cn/project/529/interface/api/31893) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/box/pause`
 * @更新时间 `2024-01-04 17:14:43`
 */
export interface PostApiCoreBatchPlasmaVerifyBoxPauseResponse {}

/**
 * 接口 [验收暂停列表↗](https://yapi.sharing8.cn/project/529/interface/api/31896) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/pause/{batchNo}/{pattern}/{pauseType}`
 * @更新时间 `2024-01-04 17:08:53`
 */
export interface GetApiCoreBatchPlasmaVerifyPauseBatchNoPatternPauseTypeRequest {
  /**
   * 批号
   */
  batchNo: string;
  /**
   * 查询类型(箱BOX , 批BCH)
   */
  pattern: string;
  /**
   * ACC(接收) VER(验收)
   */
  pauseType: string;
}

/**
 * 接口 [验收暂停列表↗](https://yapi.sharing8.cn/project/529/interface/api/31896) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/verify/pause/{batchNo}/{pattern}/{pauseType}`
 * @更新时间 `2024-01-04 17:08:53`
 */
export type GetApiCoreBatchPlasmaVerifyPauseBatchNoPatternPauseTypeResponse = {
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
 * @更新时间 `2024-01-04 17:14:54`
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
   * 操作类型(暂停-PAUSE  继续-RESTORE)
   */
  state: string;
  /**
   * 类型 ACC(接收) VER(验收)
   */
  type: string;
}

/**
 * 接口 [验收暂停、继续(批)↗](https://yapi.sharing8.cn/project/529/interface/api/31908) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/batch/pause`
 * @更新时间 `2024-01-04 17:14:54`
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
 * @更新时间 `2024-03-06 16:04:13`
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
 * @更新时间 `2024-03-06 16:04:13`
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
    /**
     * 标识是否献血浆者不符合，true表示是，false表示不是
     */
    donorBlock?: boolean;
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
 * 接口 [提交样本验收↗](https://yapi.sharing8.cn/project/529/interface/api/31947) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `PUT /api/core/batch/sample/verify`
 * @更新时间 `2024-01-01 14:53:55`
 */
export interface PutApiCoreBatchSampleVerifyRequest {
  /**
   * 样本批号
   */
  batchSampleNo: string;
  /**
   * 样本验收单号
   */
  verifyNo?: string;
}

/**
 * 接口 [提交样本验收↗](https://yapi.sharing8.cn/project/529/interface/api/31947) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `PUT /api/core/batch/sample/verify`
 * @更新时间 `2024-01-01 14:53:55`
 */
export type PutApiCoreBatchSampleVerifyResponse = string;

/**
 * 接口 [样本验收过程中确认献血浆者不符合↗](https://yapi.sharing8.cn/project/529/interface/api/31950) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/verify/non-conformance`
 * @更新时间 `2024-01-03 21:24:59`
 */
export interface PostApiCoreBatchSampleVerifyNonConformanceRequest {
  /**
   * 样本编号
   */
  sampleNo: string;
  /**
   * 样本验收单号
   */
  sampleVerifyNo: string;
  /**
   * 样本批号
   */
  batchSampleNo: string;
}

/**
 * 接口 [样本验收过程中确认献血浆者不符合↗](https://yapi.sharing8.cn/project/529/interface/api/31950) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/verify/non-conformance`
 * @更新时间 `2024-01-03 21:24:59`
 */
export type PostApiCoreBatchSampleVerifyNonConformanceResponse = string;

/**
 * 接口 [撤销单个样本验收↗](https://yapi.sharing8.cn/project/529/interface/api/31956) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `PUT /api/core/batch/sample/verify/revoke`
 * @更新时间 `2024-01-04 11:35:06`
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
  /**
   * 样本批号
   */
  batchSampleNo: string;
}

/**
 * 接口 [撤销单个样本验收↗](https://yapi.sharing8.cn/project/529/interface/api/31956) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `PUT /api/core/batch/sample/verify/revoke`
 * @更新时间 `2024-01-04 11:35:06`
 */
export type PutApiCoreBatchSampleVerifyRevokeResponse = string;

/**
 * 接口 [验收撤销↗](https://yapi.sharing8.cn/project/529/interface/api/31962) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/revoke/bag`
 * @更新时间 `2024-01-02 10:39:28`
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
 * @更新时间 `2024-01-02 10:39:28`
 */
export interface PostApiCoreBatchPlasmaVerifyRevokeBagResponse {}

/**
 * 接口 [查询浆站缺号列表↗](https://yapi.sharing8.cn/project/529/interface/api/31965) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/verify/lack/{batchSampleNo}`
 * @更新时间 `2024-03-06 09:38:50`
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
 * @更新时间 `2024-03-06 09:38:50`
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
  /**
   * 缺号说明
   */
  remark?: string;
}[];

/**
 * 接口 [批称重↗](https://yapi.sharing8.cn/project/529/interface/api/31968) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/weight`
 * @更新时间 `2024-01-18 14:25:16`
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
  /**
   * 复核人
   */
  reviewer: string;
}

/**
 * 接口 [批称重↗](https://yapi.sharing8.cn/project/529/interface/api/31968) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/weight`
 * @更新时间 `2024-01-18 14:25:16`
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

/**
 * 接口 [查询献血浆者不符合列表↗](https://yapi.sharing8.cn/project/529/interface/api/31992) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/verify/non-conformance/{batchSampleNo}`
 * @更新时间 `2024-01-03 21:17:17`
 */
export interface GetApiCoreBatchSampleVerifyNonConformanceBatchSampleNoRequest {
  /**
   * 样本批号
   */
  batchSampleNo: string;
}

/**
 * 接口 [查询献血浆者不符合列表↗](https://yapi.sharing8.cn/project/529/interface/api/31992) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/sample/verify/non-conformance/{batchSampleNo}`
 * @更新时间 `2024-01-03 21:17:17`
 */
export type GetApiCoreBatchSampleVerifyNonConformanceBatchSampleNoResponse = {
  /**
   * 样本编号
   */
  sampleNo?: string;
  /**
   * 是否合格，0不合格，1合格
   */
  qualified?: number;
  /**
   * 字典value
   */
  dictItemValue?: string;
  /**
   * 字典key
   */
  dictItemKey?: string;
}[];

/**
 * 接口 [生成样本验收单↗](https://yapi.sharing8.cn/project/529/interface/api/31995) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/verify`
 * @更新时间 `2024-01-03 10:02:39`
 */
export interface PostApiCoreBatchSampleVerifyRequest {
  /**
   * 样本批号
   */
  batchSampleNo: string;
}

/**
 * 接口 [生成样本验收单↗](https://yapi.sharing8.cn/project/529/interface/api/31995) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/verify`
 * @更新时间 `2024-01-03 10:02:39`
 */
export type PostApiCoreBatchSampleVerifyResponse = string;

/**
 * 接口 [样本验收中的不合格样本登记↗](https://yapi.sharing8.cn/project/529/interface/api/32049) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/unqualified`
 * @更新时间 `2024-01-24 19:45:25`
 */
export interface PostApiCoreBatchSampleUnqualifiedRequest {
  /**
   * 复核人
   */
  checker: string;
  /**
   * 样本编号
   */
  sampleNo: string;
  /**
   * 不合格原因code
   */
  unqualifiedReasonCode: string;
  /**
   * 验收单号
   */
  verifyNo: string;
  /**
   * 样本批号
   */
  batchSampleNo: string;
}

/**
 * 接口 [样本验收中的不合格样本登记↗](https://yapi.sharing8.cn/project/529/interface/api/32049) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/unqualified`
 * @更新时间 `2024-01-24 19:45:25`
 */
export type PostApiCoreBatchSampleUnqualifiedResponse = string;

/**
 * 接口 [接收暂停↗](https://yapi.sharing8.cn/project/529/interface/api/32064) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/accept/batch/pause`
 * @更新时间 `2024-01-04 17:45:40`
 */
export interface PostApiCoreBatchPlasmaAcceptBatchPauseRequest {
  /**
   * 批号
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
   * 操作类型(暂停-PAUSE  继续-RESTORE)
   */
  state: string;
  /**
   * 类型 ACC(接收) VER(验收)
   */
  type: string;
}

/**
 * 接口 [接收暂停↗](https://yapi.sharing8.cn/project/529/interface/api/32064) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/accept/batch/pause`
 * @更新时间 `2024-01-04 17:45:40`
 */
export interface PostApiCoreBatchPlasmaAcceptBatchPauseResponse {}

/**
 * 接口 [新建批放行单↗](https://yapi.sharing8.cn/project/529/interface/api/32312) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/release`
 * @更新时间 `2024-01-17 13:53:25`
 */
export interface PostApiCoreBatchPlasmaReleaseRequest {
  batchNo?: string;
}

/**
 * 接口 [新建批放行单↗](https://yapi.sharing8.cn/project/529/interface/api/32312) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/release`
 * @更新时间 `2024-01-17 13:53:25`
 */
export interface PostApiCoreBatchPlasmaReleaseResponse {
  brNo?: string;
  fkBpNo?: string;
  state?: string;
  summary?: {
    totalCount?: number;
    failedCount?: number;
    unProductionCount?: number;
    trackedCount?: number;
    firstUnTrackedCount?: number;
    reUnTrackedCount?: number;
    approvedBy?: string;
  };
  content?: {
    /**
     * （检验报告后，检疫期报告前）
     */
    failedBag?: {
      bagNo?: string;
      donorNo?: string;
      donorName?: string;
      fkFailedCode?: string;
      pickBy?: string;
      reviewBy?: string;
      pickAt?: string;
    }[];
    unProductionBag?: string[];
    trackedBag?: string[];
    /**
     * 报告时，血浆所属献血浆员在厂家系统的首袋采集且未放行血浆
     */
    firstUnTrackedBag?: string[];
    /**
     * 报告时，血浆所属献血浆员在厂家系统的非首袋采集且未放行血浆
     */
    reUnTrackedBag?: string[];
  };
  creator?: string;
  reviewer?: string;
  createAt?: string;
  reviewAt?: string;
  remark?: string;
}

/**
 * 接口 [查询放行单详情↗](https://yapi.sharing8.cn/project/529/interface/api/32357) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/release`
 * @更新时间 `2024-01-17 16:49:25`
 */
export interface GetApiCoreBatchPlasmaReleaseRequest {
  /**
   * 和brNo不能同时为空
   */
  batchNo?: string;
  /**
   * 和batchNo不能同时为空
   */
  brNo?: string;
}

/**
 * 接口 [查询放行单详情↗](https://yapi.sharing8.cn/project/529/interface/api/32357) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/release`
 * @更新时间 `2024-01-17 16:49:25`
 */
export interface GetApiCoreBatchPlasmaReleaseResponse {
  brNo?: string;
  fkBpNo?: string;
  state?: string;
  summary?: {
    totalCount?: number;
    failedCount?: number;
    unProductionCount?: number;
    trackedCount?: number;
    firstUnTrackedCount?: number;
    reUnTrackedCount?: number;
    approvedBy?: string;
  };
  content?: {
    failedBag?: {
      bagNo?: string;
      donorNo?: string;
      donorName?: string;
      fkFailedCode?: string;
      pickBy?: string;
      reviewBy?: string;
      pickAt?: string;
    }[];
    unProductionBag?: string[];
    trackedBag?: string[];
    firstUnTrackedBag?: string[];
    reUnTrackedBag?: string[];
  };
  creator?: string;
  reviewer?: string;
  createAt?: string;
  reviewAt?: string;
  remark?: string;
}

/**
 * 接口 [操作批放行单(复核、取消)↗](https://yapi.sharing8.cn/project/529/interface/api/32397) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `PUT /api/core/batch/plasma/release`
 * @更新时间 `2024-01-16 18:00:34`
 */
export interface PutApiCoreBatchPlasmaReleaseRequest {
  brNo?: string;
  state?: string;
}

/**
 * 接口 [操作批放行单(复核、取消)↗](https://yapi.sharing8.cn/project/529/interface/api/32397) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `PUT /api/core/batch/plasma/release`
 * @更新时间 `2024-01-16 18:00:34`
 */
export type PutApiCoreBatchPlasmaReleaseResponse = null;

/**
 * 接口 [验收发布↗](https://yapi.sharing8.cn/project/529/interface/api/32402) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/publish/{batchNo}`
 * @更新时间 `2024-01-17 10:24:55`
 */
export interface PostApiCoreBatchPlasmaVerifyPublishBatchNoRequest {
  batchNo: string;
}

/**
 * 接口 [验收发布↗](https://yapi.sharing8.cn/project/529/interface/api/32402) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/publish/{batchNo}`
 * @更新时间 `2024-01-17 10:24:55`
 */
export interface PostApiCoreBatchPlasmaVerifyPublishBatchNoResponse {}

/**
 * 接口 [分页查询放行单↗](https://yapi.sharing8.cn/project/529/interface/api/32457) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/releases`
 * @更新时间 `2024-01-17 16:55:34`
 */
export interface GetApiCoreBatchPlasmaReleasesRequest {
  currPage: string;
  pageSize: string;
  /**
   * 批次号
   */
  batchNo?: string;
  /**
   * 放行单号
   */
  brNo?: string;
  /**
   * 状态
   */
  state?: string;
}

/**
 * 接口 [分页查询放行单↗](https://yapi.sharing8.cn/project/529/interface/api/32457) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/releases`
 * @更新时间 `2024-01-17 16:55:34`
 */
export interface GetApiCoreBatchPlasmaReleasesResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    brNo?: string;
    fkBpNo?: string;
    state?: string;
    summary?: {
      totalCount?: number;
      failedCount?: number;
      unProductionCount?: number;
      trackedCount?: number;
      firstUnTrackedCount?: number;
      reUnTrackedCount?: number;
      approvedBy?: string;
    };
    content?: {
      failedBag?: {
        bagNo?: string;
        donorNo?: string;
        donorName?: string;
        fkFailedCode?: string;
        pickBy?: string;
        reviewBy?: null;
        pickAt?: null;
      }[];
      unProductionBag?: null;
      trackedBag?: string[];
      firstUnTrackedBag?: string[];
      reUnTrackedBag?: string[];
    };
    creator?: string;
    reviewer?: string;
    createAt?: string;
    reviewAt?: string;
    remark?: null;
  }[];
}

/**
 * 接口 [查询未放行的批次↗](https://yapi.sharing8.cn/project/529/interface/api/32637) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/un-releases`
 * @更新时间 `2024-01-19 11:51:05`
 */
export interface GetApiCoreBatchPlasmaUnReleasesRequest {
  currPage: string;
  pageSize: string;
  /**
   * 批次号
   */
  batchNo?: string;
  /**
   * 浆站编码
   */
  stationNo?: string;
}

/**
 * 接口 [查询未放行的批次↗](https://yapi.sharing8.cn/project/529/interface/api/32637) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `GET /api/core/batch/plasma/un-releases`
 * @更新时间 `2024-01-19 11:51:05`
 */
export interface GetApiCoreBatchPlasmaUnReleasesResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    /**
     * 浆站编码
     */
    stationNo?: string;
    /**
     * 浆站名称
     */
    stationName?: string;
    /**
     * 批次编码
     */
    batchNo?: string;
    /**
     * 血浆数量
     */
    plasmaCount?: number;
    /**
     * 最早采浆日期
     */
    firstCollectAt?: string;
    /**
     * 最晚采浆日期
     */
    latestCollectAt?: string;
    /**
     * 最晚采浆日期
     */
    followSeeCount?: number;
    /**
     * 后续可参考血浆比例
     */
    followSeeRatio?: string;
    /**
     * 后续可参考血浆比例
     */
    canReleaseCount?: number;
    /**
     * 后续可参考血浆比例
     */
    canReleaseRatio?: string;
    /**
     * 待放行血浆数量
     */
    waitReleaseCount?: number;
    /**
     * 带放行血浆比例
     */
    waitReleaseRatio?: string;
  }[];
}

/**
 * 接口 [血浆验收不合格样本登记↗](https://yapi.sharing8.cn/project/529/interface/api/32802) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/unqualified/plasma`
 * @更新时间 `2024-01-25 09:26:45`
 */
export interface PostApiCoreBatchSampleUnqualifiedPlasmaRequest {
  /**
   * 复核人
   */
  checker: string;
  /**
   * 样本编号
   */
  sampleNo: string;
  /**
   * 不合格原因code
   */
  unqualifiedReasonCode: string;
  /**
   * 样本批号
   */
  batchSampleNo: string;
}

/**
 * 接口 [血浆验收不合格样本登记↗](https://yapi.sharing8.cn/project/529/interface/api/32802) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/sample/unqualified/plasma`
 * @更新时间 `2024-01-25 09:26:45`
 */
export type PostApiCoreBatchSampleUnqualifiedPlasmaResponse = string;

/**
 * 接口 [批 验收完成↗](https://yapi.sharing8.cn/project/529/interface/api/33217) 的 **请求类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/batch/commit/{batchNo}`
 * @更新时间 `2024-02-18 15:19:23`
 */
export interface PostApiCoreBatchPlasmaVerifyBatchCommitBatchNoRequest {
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
  batchNo: string;
}

/**
 * 接口 [批 验收完成↗](https://yapi.sharing8.cn/project/529/interface/api/33217) 的 **返回类型**
 *
 * @分类 [批次管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5243)
 * @请求头 `POST /api/core/batch/plasma/verify/batch/commit/{batchNo}`
 * @更新时间 `2024-02-18 15:19:23`
 */
export interface PostApiCoreBatchPlasmaVerifyBatchCommitBatchNoResponse {}

/* prettier-ignore-end */
