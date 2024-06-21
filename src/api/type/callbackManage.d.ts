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
 * @更新时间 `2024-05-07 15:49:41`
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
   * 发布状态   取CallbackPlanState
   */
  state?: string;
  /**
   * 名单编号
   */
  batchNo?: string;
  /**
   * 回访样本批号
   */
  sampleBatchNo?: string;
  /**
   * 回访样本接收日期起
   */
  sampleAcceptStartDate?: string;
  /**
   * 回访样本接收日期止
   */
  sampleAcceptEndDate?: string;
  /**
   * 回访样本发布日期
   */
  samplePublishStartDate: string;
  /**
   * 回访样本发布日期
   */
  samplePublishEndDate: string;
}

/**
 * 接口 [回访计划查询↗](https://yapi.sharing8.cn/project/529/interface/api/31869) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback`
 * @更新时间 `2024-05-07 15:49:41`
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
     * 自主回访
     */
    selfBackNum: number;
    /**
     * 回访成功
     */
    okNum: number;
    /**
     * 回访失败
     */
    failedNum: number;
    /**
     * 恢复采浆
     */
    recoverNum: number;
    /**
     * 未回访
     */
    noVisitNum: number;
    /**
     * 样本接收人
     */
    sampleAcceptBy?: string;
    /**
     * 样本接收日期
     */
    sampleAcceptAt?: string;
    /**
     * 样本发布人
     */
    samplePublishBy?: string;
    /**
     * 样本发布日期
     */
    samplePublishAt?: string;
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
 * @更新时间 `2024-06-21 14:37:34`
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
  /**
   * 批次号
   */
  batchNo: string;
  /**
   * 血浆状态， 首次反复， 1 首次 2反复
   */
  trackType?: string;
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [待回访浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/31899) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/need`
 * @更新时间 `2024-06-21 14:37:34`
 */
export interface GetApiCoreDonorCallbackNeedResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
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
    donatorStatus: string;
    minCollTime: string;
    minPlasmaNo: string;
    maxCollectTime: string;
    plasmaCount: number;
    stationNo: string;
    trackType: string;
    cardNo: string;
    donorNo: string;
    refuseDate: string;
    refuseReason: string;
    immType: string;
    callbackDate: string;
    callbackResult: string;
    sampleCollectTime: string;
    sampleNo: string;
    remark: string;
  }[];
}

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
 * @请求头 `GET /api/search/donor/callback/detail`
 * @更新时间 `2024-06-21 14:06:31`
 */
export interface GetApiSearchDonorCallbackDetailRequest {
  /**
   * 回访批次号
   */
  batchNo: string;
  /**
   * 浆员编号
   */
  donorNo?: string;
  /**
   * 血浆类型
   */
  immType?: string;
  /**
   * 距今未采浆天数
   */
  gapDays?: string;
  minCollectTime?: string;
  maxCollectTime?: string;
  /**
   * 血浆状态  传1首次 2反复
   */
  trackType?: string;
  /**
   * 浆员卡号
   */
  cardNo?: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [回访批次详情↗](https://yapi.sharing8.cn/project/529/interface/api/31998) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/search/donor/callback/detail`
 * @更新时间 `2024-06-21 14:06:31`
 */
export interface GetApiSearchDonorCallbackDetailResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    stationNo: string;
    donorNo: string;
    donorName: string;
    idcardId: string;
    gender: string;
    donatorStatus: string;
    minCollTime: string;
    minPlasmaNo: string;
    maxCollectTime: string;
    plasmaCount: number;
    state: string;
    immType: string;
    bloodType: string;
    deadline: string;
    trackType: string;
    refuseDate: null | string;
    refuseReason: string | null;
    callbackDate: string;
    callbackResult: string;
    sampleCollectTime: string;
    sampleNo: string;
    remark: string;
  }[];
}

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

/**
 * 接口 [回访完成情况↗](https://yapi.sharing8.cn/project/529/interface/api/32877) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/result`
 * @更新时间 `2024-01-26 17:32:06`
 */
export interface GetApiCoreDonorCallbackResultRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 生成开始日期
   */
  createStartDate?: string;
  /**
   * 生成结束日期
   */
  createEndDate?: string;
  /**
   * 样品接收开始日期
   */
  receiveStartDate?: string;
  /**
   * 样品接收结束日期
   */
  receiveEndDate?: string;
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [回访完成情况↗](https://yapi.sharing8.cn/project/529/interface/api/32877) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/result`
 * @更新时间 `2024-01-26 17:32:06`
 */
export type GetApiCoreDonorCallbackResultResponse = {
  /**
   * 浆站名称
   */
  stationNo: string;
  /**
   * 回访批次
   */
  batchNo: string;
  /**
   * 生成日期
   */
  generateDate: string;
  /**
   * 需回访数量
   */
  totalCount: number;
  /**
   * 恢复采浆量
   */
  recoverNum: number;
  /**
   * 回访样本数量
   */
  sampleNum: number;
  /**
   * 超期未回访数量
   */
  overDateNum: number;
  /**
   * 回访失败量
   */
  failedNum: number;
  /**
   * 样本接收日期
   */
  receiveDate: string;
  /**
   * 样本准备日期
   */
  readyDate: number;
  /**
   * 完成率
   */
  completionRate: string;
}[];

/**
 * 接口 [回访失败(终止回访)查询↗](https://yapi.sharing8.cn/project/529/interface/api/32882) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/defeat`
 * @更新时间 `2024-05-31 10:43:25`
 */
export interface GetApiCoreDonorCallbackDefeatRequest {
  pageSize: string;
  currPage: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 回访开始日期
   */
  callBackStartDate?: string;
  /**
   * 回访结束日期
   */
  callBackEndDate?: string;
  /**
   * 失败原因
   */
  failureReason?: string;
}

/**
 * 接口 [回访失败(终止回访)查询↗](https://yapi.sharing8.cn/project/529/interface/api/32882) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/defeat`
 * @更新时间 `2024-05-31 10:43:25`
 */
export type GetApiCoreDonorCallbackDefeatResponse = {
  /**
   * 采浆公司编号
   */
  stationNo: string;
  /**
   * 浆员编号
   */
  donorNo: string;
  /**
   * 浆员卡号
   */
  cardNo: string;
  /**
   * 浆员姓名
   */
  name: string;
  /**
   * 浆员性别
   */
  gender: string;
  /**
   * 浆员状态
   */
  status: string;
  /**
   * 拒绝日期
   */
  refuseDate?: string;
  /**
   * 拒绝原因
   */
  refuseReason?: string;
  /**
   * 最后采浆日期
   */
  lastCollectionDate: string;
  /**
   * 回访日期
   */
  callBackDate?: string;
  /**
   * 失败原因
   */
  failureReason?: string;
}[];

/**
 * 接口 [浆站永拒查询↗](https://yapi.sharing8.cn/project/529/interface/api/33507) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/block`
 * @更新时间 `2024-05-31 10:53:31`
 */
export interface GetApiCoreDonorBlockRequest {
  pageSize: string;
  currPage: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 建档开始日期
   */
  createAtBegin?: string;
  /**
   * 建档结束日期
   */
  createAtEnd?: string;
  /**
   * 永拒原因
   */
  blockReason?: string;
  /**
   * 永拒开始日期
   */
  blockAtBegin?: string;
  /**
   * 永拒结束日期
   */
  blockAtEnd: string;
}

/**
 * 接口 [浆站永拒查询↗](https://yapi.sharing8.cn/project/529/interface/api/33507) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/block`
 * @更新时间 `2024-05-31 10:53:31`
 */
export interface GetApiCoreDonorBlockResponse {
  totalCount?: number;
  pageSize?: null;
  totalPage?: null;
  currPage?: null;
  result?: {
    /**
     * 浆站名称
     */
    stationName: string;
    /**
     * 浆站编号
     */
    donorNo: string;
    /**
     * 浆员卡号
     */
    cardNo: string;
    /**
     * 浆员名称
     */
    donorName: number;
    /**
     * 永拒原因
     */
    blockReason: string;
    /**
     * 永拒日期
     */
    blockAt: string;
  }[];
}

/**
 * 接口 [回访状态明细↗](https://yapi.sharing8.cn/project/529/interface/api/34185) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/status/detail`
 * @更新时间 `2024-04-02 17:02:08`
 */
export interface GetApiCoreDonorCallbackStatusDetailRequest {
  pageSize: string;
  currPage: string;
  /**
   * SCP("回访成功-采浆"),
   *     SCS("回访成功-采样"),
   *     FIL("回访失败"),
   * WIT("未回访"),
   */
  status: string;
  /**
   * 回访批次编号
   */
  planNo: string;
  /**
   * 血浆批号日期起
   */
  batchStartNo?: string;
  /**
   * 血浆批号日期止
   */
  batchEndNo?: string;
  /**
   * 血浆状态  首次反复
   */
  plasmaStatus?: string;
  /**
   * 血浆类型
   */
  plasmaType?: string;
  /**
   * 浆员编号
   */
  donorNo?: string;
}

/**
 * 接口 [回访状态明细↗](https://yapi.sharing8.cn/project/529/interface/api/34185) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/status/detail`
 * @更新时间 `2024-04-02 17:02:08`
 */
export type GetApiCoreDonorCallbackStatusDetailResponse = {
  /**
   * 浆员编号
   */
  donorNo: string;
  /**
   * 浆员姓名
   */
  donorName: string;
  /**
   * 最后采浆日期
   */
  lastCollectTime: string;
  /**
   * 血浆状态
   */
  plasmaStatus?: string;
  /**
   * 血浆袋数（袋）
   */
  plasmaCount: number;
  /**
   * 回访日期
   */
  callbackDate?: string;
  /**
   * 样本采集日期
   */
  sampleCollectDate?: string;
  /**
   * 回访发布日期
   */
  callbackPubDate: string;
  /**
   * 样本编号
   */
  sampleNo?: string | null;
  /**
   * 血型
   */
  bloodType: string;
}[];

/**
 * 接口 [回访详情血浆明细↗](https://yapi.sharing8.cn/project/529/interface/api/34194) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/search/donor/callback/detail/bag`
 * @更新时间 `2024-06-21 16:14:16`
 */
export interface GetApiSearchDonorCallbackDetailBagRequest {
  /**
   * 浆员编号
   */
  donorNo: string;
  /**
   * 批次号
   */
  planNo: string;
}

/**
 * 接口 [回访详情血浆明细↗](https://yapi.sharing8.cn/project/529/interface/api/34194) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/search/donor/callback/detail/bag`
 * @更新时间 `2024-06-21 16:14:16`
 */
export type GetApiSearchDonorCallbackDetailBagResponse = {
  /**
   * 血浆编号
   */
  bagNo: string;
  /**
   * 血浆类型
   */
  donorNo: string;
  /**
   * 血浆状态
   */
  plasmaType: string;
  /**
   * 采集日期
   */
  collDate: string;
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 浆员姓名
   */
  name: string;
}[];

/**
 * 接口 [回访状态详情查询↗](https://yapi.sharing8.cn/project/529/interface/api/35256) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/detail-state`
 * @更新时间 `2024-06-17 20:09:25`
 */
export interface GetApiCoreDonorCallbackDetailStateRequest {
  pageSize: string;
  currPage: string;
  startBatchNo?: string;
  endBatchNo?: string;
  /**
   * 浆员编号
   */
  donorNo?: string;
  /**
   *     WIT("未回访"),
   *     SCP("恢复采浆"),
   *     SCS("回访成功"),
   *     END("回访终止"),
   */
  state?: string;
  /**
   * 血浆状态
   */
  plasmaStatus?: string;
  planNo: string;
}

/**
 * 接口 [回访状态详情查询↗](https://yapi.sharing8.cn/project/529/interface/api/35256) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/detail-state`
 * @更新时间 `2024-06-17 20:09:25`
 */
export interface GetApiCoreDonorCallbackDetailStateResponse {
  totalCount?: number;
  pageSize?: null;
  totalPage?: null;
  currPage?: null;
  result?: {
    /**
     * 浆员编号
     */
    donorNo: string;
    /**
     * 冗余 传参用
     */
    cardNo: string;
    /**
     * 姓名
     */
    name: number;
    /**
     * 回访日期
     */
    callbackDate: string;
    /**
     * 样品编号
     */
    sampleNo: string;
    /**
     * 血型
     */
    bloodType: string;
    /**
     * 现居地址
     */
    liveAddress: string;
    /**
     * 采集日期
     */
    collDate: string;
    /**
     * 血浆状态
     */
    trackType: string;
    /**
     * 最后采浆日期
     */
    lastCollDate: string;
    /**
     * 血浆数量
     */
    bagNum: number;
  }[];
}

/* prettier-ignore-end */
