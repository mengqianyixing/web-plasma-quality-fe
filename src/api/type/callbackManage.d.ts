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

/**
 * 接口 [待回访浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/31899) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/need`
 * @更新时间 `2024-01-04 19:48:20`
 */
export interface GetApiCoreDonorCallbackNeedRequest {
  stationNo: string;
  maxCollectTime: string;
  minCollectTime: string;
  /**
   * 血浆类型      N, // 普浆
   *     T, // 破免
   *     B, // 乙免
   *     R, // 狂免
   *     A, // 炭疽
   *     C  // 新冠
   */
  immType?: string;
  /**
   * 末次距今未采浆天数
   */
  gapDays: string;
  /**
   * 血浆状态 ：首次 反复
   */
  plasmaType?: string;
}

/**
 * 接口 [待回访浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/31899) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/need`
 * @更新时间 `2024-01-04 19:48:20`
 */
export type GetApiCoreDonorCallbackNeedResponse = {
  stationNo: string;
  /**
   * 浆员编号
   */
  donorNo: string;
  /**
   * 浆员姓名
   */
  donorName: string;
  /**
   * 身份证号
   */
  idcardId: string;
  /**
   * 性别
   */
  gender: string;
  /**
   * 状态
   */
  donatorStatus: string;
  /**
   * 拒绝日期
   */
  refuseDate?: string;
  /**
   * 拒绝原因
   */
  refuseReason?: string;
  /**
   * 最早待回访采浆日期
   */
  minCollTime: string;
  /**
   * 最早采浆血浆编号
   */
  minPlasmaNo: string;
  /**
   * 最后采浆日期
   */
  maxCollectTime: string;
  /**
   * 待追踪袋数
   */
  plasmaCount: number;
  callbackDate?: string;
  callbackResult?: string;
  sampleCollectTime?: string;
  sampleNo?: string;
  remark?: string;
}[];

/**
 * 接口 [待回访浆员生成↗](https://yapi.sharing8.cn/project/529/interface/api/31902) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `POST /api/core/donor/callback/need`
 * @更新时间 `2024-01-04 19:34:52`
 */
export interface PostApiCoreDonorCallbackNeedRequest {
  /**
   * 回访批次号
   */
  batchNo: string;
  /**
   * 勾选的浆员编号
   */
  donorNos: string[];
}

/**
 * 接口 [待回访浆员生成↗](https://yapi.sharing8.cn/project/529/interface/api/31902) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `POST /api/core/donor/callback/need`
 * @更新时间 `2024-01-04 19:34:52`
 */
export type PostApiCoreDonorCallbackNeedResponse = null;

/**
 * 接口 [回访批次详情↗](https://yapi.sharing8.cn/project/529/interface/api/31998) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/detail`
 * @更新时间 `2024-01-04 19:16:42`
 */
export interface GetApiCoreDonorCallbackDetailRequest {
  /**
   * 回访批次号
   */
  batchNo: string;
}

/**
 * 接口 [回访批次详情↗](https://yapi.sharing8.cn/project/529/interface/api/31998) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/detail`
 * @更新时间 `2024-01-04 19:16:42`
 */
export type GetApiCoreDonorCallbackDetailResponse = {
  stationNo: string;
  donorNo: string;
  donorName: string;
  idcardId: string;
  gender: string;
  donatorStatus: string;
  refuseDate?: string | null;
  refuseReason?: string | null;
  minCollTime: string;
  minPlasmaNo: string;
  maxCollectTime: string;
  plasmaCount: number;
  callbackDate?: string;
  callbackResult?: string;
  sampleCollectTime?: string;
  sampleNo?: string;
  remark?: string;
}[];

/**
 * 接口 [回访批次确认↗](https://yapi.sharing8.cn/project/529/interface/api/32001) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `POST /api/core/donor/callback`
 * @更新时间 `2024-01-02 09:36:20`
 */
export interface PostApiCoreDonorCallbackRequest {
  callbackBatchNoes?: string[];
}

/**
 * 接口 [回访批次确认↗](https://yapi.sharing8.cn/project/529/interface/api/32001) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `POST /api/core/donor/callback`
 * @更新时间 `2024-01-02 09:36:20`
 */
export type PostApiCoreDonorCallbackResponse = null;

/**
 * 接口 [回访名单撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32004) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `DELETE /api/core/donor/callback`
 * @更新时间 `2024-01-02 14:50:09`
 */
export interface DeleteApiCoreDonorCallbackRequest {
  callbackBatchNoes?: string[];
}

/**
 * 接口 [回访名单撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32004) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `DELETE /api/core/donor/callback`
 * @更新时间 `2024-01-02 14:50:09`
 */
export type DeleteApiCoreDonorCallbackResponse = null;

/**
 * 接口 [创建回访批次↗](https://yapi.sharing8.cn/project/529/interface/api/32067) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `POST /api/core/donor/callback/batch`
 * @更新时间 `2024-01-04 19:28:23`
 */
export interface PostApiCoreDonorCallbackBatchRequest {
  /**
   * 采浆公司编号
   */
  stationNo: string;
}

/**
 * 接口 [创建回访批次↗](https://yapi.sharing8.cn/project/529/interface/api/32067) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `POST /api/core/donor/callback/batch`
 * @更新时间 `2024-01-04 19:28:23`
 */
export type PostApiCoreDonorCallbackBatchResponse = string;

/**
 * 接口 [待确认回访浆员撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32070) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `DELETE /api/core/donor/callback/detail`
 * @更新时间 `2024-01-04 19:22:58`
 */
export interface DeleteApiCoreDonorCallbackDetailRequest {
  /**
   * 浆员编号
   */
  donorNos: string[];
  /**
   * 回访批号
   */
  batchNo: string;
}

/**
 * 接口 [待确认回访浆员撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32070) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `DELETE /api/core/donor/callback/detail`
 * @更新时间 `2024-01-04 19:22:58`
 */
export interface DeleteApiCoreDonorCallbackDetailResponse {}

/* prettier-ignore-end */
