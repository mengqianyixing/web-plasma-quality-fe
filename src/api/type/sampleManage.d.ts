/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询样本批次列表↗](https://yapi.sharing8.cn/project/529/interface/api/32100) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/batchs`
 * @更新时间 `2024-01-05 11:24:55`
 */
export interface GetApiCoreSampleBatchsRequest {
  /**
   * 当前页面
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 采浆公司编号
   */
  stationNo?: string;
  /**
   * 样本批号
   */
  batchSampleNo?: string;
  /**
   * 样本类型
   */
  sampleType?: string;
  /**
   * 验收状态
   */
  verifyState?: string;
  /**
   * 验收开始日期
   */
  verifyBeginAt?: string;
  /**
   * 验收结束日期
   */
  verifyEndAt?: string;
  /**
   * 效价项目有效期开始日期
   */
  titerExpiredBeginAt?: string;
  /**
   * 效价项目有效期结束日期
   */
  titerExpiredEndAt?: string;
  /**
   * 其他有效期开始日期
   */
  othersExpiredBeginAt?: string;
  /**
   * 其他有效期结束日期
   */
  othersExpiredEndAt?: string;
}

/**
 * 接口 [查询样本批次列表↗](https://yapi.sharing8.cn/project/529/interface/api/32100) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/batchs`
 * @更新时间 `2024-01-05 11:24:55`
 */
export type GetApiCoreSampleBatchsResponse = {
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
   * 浆站出库日期
   */
  outStationDate?: string;
  /**
   * 样本数量
   */
  sampleCount?: number;
  /**
   * 接收人
   */
  acceptor?: string;
  /**
   * 接收日期
   */
  acceptAt?: string;
  /**
   * 合格样本数量
   */
  qualifiedCount?: number;
  /**
   * 不合格样本数量
   */
  unqualifiedCount?: number;
  /**
   * 验收人
   */
  verifier?: string;
  /**
   * 验收日期
   */
  verifyAt?: string;
  /**
   * 效价项目有效期至
   */
  titerExpired?: string;
  /**
   * 其他有效期至
   */
  thersExpired?: string;
  /**
   * 验收状态
   */
  verifyState?: string;
}[];

/**
 * 接口 [不合格样本列表↗](https://yapi.sharing8.cn/project/529/interface/api/32103) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/unqualified`
 * @更新时间 `2024-05-31 17:15:08`
 */
export interface GetApiCoreSampleUnqualifiedRequest {
  /**
   * 样本批号
   */
  batchSampleNo: string;
  /**
   * 当前页面
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
}

/**
 * 接口 [不合格样本列表↗](https://yapi.sharing8.cn/project/529/interface/api/32103) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/unqualified`
 * @更新时间 `2024-05-31 17:15:08`
 */
export type GetApiCoreSampleUnqualifiedResponse = {
  /**
   * 样本编号
   */
  sampleNo?: string;
  /**
   * 浆员姓名
   */
  donorName?: string;
  cardNo?: string;
  /**
   * 浆员编号
   */
  donorNo?: string;
  /**
   * 不合格原因
   */
  unqualifiedReason?: string;
  /**
   * 采浆日期
   */
  collectDate?: string;
}[];

/**
 * 接口 [发布样本批次↗](https://yapi.sharing8.cn/project/529/interface/api/32106) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/sample/release`
 * @更新时间 `2024-01-05 14:30:33`
 */
export interface PutApiCoreSampleReleaseRequest {
  /**
   * 样本批号
   */
  batchSampleNo?: string;
}

/**
 * 接口 [发布样本批次↗](https://yapi.sharing8.cn/project/529/interface/api/32106) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/sample/release`
 * @更新时间 `2024-01-05 14:30:33`
 */
export type PutApiCoreSampleReleaseResponse = string;

/**
 * 接口 [样本逐袋接收↗](https://yapi.sharing8.cn/project/529/interface/api/34239) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/batch/sample/accept/pack`
 * @更新时间 `2024-04-10 11:27:35`
 */
export interface PostApiCoreBatchSampleAcceptPackRequest {
  /**
   * 样本袋号
   */
  packNo: string;
  /**
   * 样本接收单号，完成一袋未接收的样本袋接收之后会返回
   */
  bsaNo?: string;
}

/**
 * 接口 [样本逐袋接收↗](https://yapi.sharing8.cn/project/529/interface/api/34239) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/batch/sample/accept/pack`
 * @更新时间 `2024-04-10 11:27:35`
 */
export interface PostApiCoreBatchSampleAcceptPackResponse {
  /**
   * 接收单号，完成一袋接收后会返回单号，否则无返回
   */
  bsaNo?: string;
  /**
   * 出库日期
   */
  outWarehouseDate?: string;
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
   * 接收状态，W-待接收，R-接收中，S-已接收
   */
  acceptState?: string;
  /**
   * 待接收列表
   */
  unAcceptList?: {
    /**
     * 样本袋号
     */
    sampleBagNo?: string;
    /**
     * 样本数量
     */
    sampleCount?: number;
  }[];
  /**
   * 已接收列表
   */
  acceptedList?: {
    /**
     * 样本袋号
     */
    sampleBagNo?: string;
    /**
     * 样本数量
     */
    sampleCount?: number;
    /**
     * 接收人
     */
    acceptor?: string;
    /**
     * 接受日期
     */
    acceptAt?: string;
  }[];
}

/**
 * 接口 [查询样本排架列表↗](https://yapi.sharing8.cn/project/529/interface/api/34284) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/racks`
 * @更新时间 `2024-04-12 20:30:30`
 */
export interface GetApiCoreBatchSampleRacksRequest {
  /**
   * 样本批号
   */
  batchNo: string;
  /**
   * 架号
   */
  rackId?: string;
  /**
   * 样本编号
   */
  sampleNo?: string;
}

/**
 * 接口 [查询样本排架列表↗](https://yapi.sharing8.cn/project/529/interface/api/34284) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/racks`
 * @更新时间 `2024-04-12 20:30:30`
 */
export type GetApiCoreBatchSampleRacksResponse = {
  /**
   * 样本批号
   */
  batchNo?: string;
  /**
   * 样本类型
   */
  sampleType?: string;
  /**
   * 架号
   */
  rackId?: string;
  /**
   * 样本编号范围
   */
  sampleNoRange?: string;
  /**
   * 样本数量
   */
  sampleCount?: number;
  /**
   * 缺号样本
   */
  lackSampleNo?: string;
}[];

/**
 * 接口 [查询样本排架顺序详情列表↗](https://yapi.sharing8.cn/project/529/interface/api/34293) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/rack/detail`
 * @更新时间 `2024-04-13 14:55:30`
 */
export interface GetApiCoreBatchSampleRackDetailRequest {
  /**
   * 架号
   */
  rackId: string;
  /**
   * 样本编号
   */
  sampleNo?: string;
}

/**
 * 接口 [查询样本排架顺序详情列表↗](https://yapi.sharing8.cn/project/529/interface/api/34293) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/rack/detail`
 * @更新时间 `2024-04-13 14:55:30`
 */
export type GetApiCoreBatchSampleRackDetailResponse = {
  /**
   * 样本批号
   */
  batchNo?: string;
  /**
   * 样本类型
   */
  sampleType?: string;
  /**
   * 架号
   */
  rackId?: string;
  /**
   * 序号
   */
  rackPos?: number;
  /**
   * 样本编号
   */
  sampleNo?: string;
  /**
   * 是否需要高亮显示，true表示需要，false表示不需要
   */
  highlight?: boolean;
}[];

/**
 * 接口 [打印样本架签↗](https://yapi.sharing8.cn/project/529/interface/api/34302) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/batch/sample/rack/label`
 * @更新时间 `2024-04-13 16:12:36`
 */
export interface PostApiCoreBatchSampleRackLabelRequest {
  rackList: {
    /**
     * 架号
     */
    rackId: string;
    /**
     * 序号
     */
    sampleNoRange: string;
    /**
     * 批号
     */
    batchNo: string;
  }[];
}

/**
 * 接口 [打印样本架签↗](https://yapi.sharing8.cn/project/529/interface/api/34302) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/batch/sample/rack/label`
 * @更新时间 `2024-04-13 16:12:36`
 */
export type PostApiCoreBatchSampleRackLabelResponse = string[];

/**
 * 接口 [查询样本检测计划列表↗](https://yapi.sharing8.cn/project/529/interface/api/34740) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/plans`
 * @更新时间 `2024-05-14 16:47:19`
 */
export interface GetApiCoreSamplePlansRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 计划开始日期（默认空）
   */
  planBeginDate?: string;
  /**
   * 计划结束日期（默认空）
   */
  planEndDate?: string;
  /**
   * 混样方式，查看枚举类SampleMixTypeEnum（（默认空查全部）
   */
  mixType?: string;
  /**
   * 样本批号
   */
  batchNo?: string;
}

/**
 * 接口 [查询样本检测计划列表↗](https://yapi.sharing8.cn/project/529/interface/api/34740) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/plans`
 * @更新时间 `2024-05-14 16:47:19`
 */
export interface GetApiCoreSamplePlansResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 计划单号
     */
    planNo?: string;
    /**
     * 计划日期
     */
    planDate?: string;
    /**
     * 样本批号
     */
    batchNoes?: string;
    /**
     * 样本数量
     */
    sampleCount?: number;
    /**
     * 试管架数
     */
    rackCount?: number;
    /**
     * 混样方式
     */
    mixType?: string;
    /**
     * 计划人
     */
    creator?: string;
  }[];
}

/**
 * 接口 [查询已接收的且未加入检测计划的样本批次列表↗](https://yapi.sharing8.cn/project/529/interface/api/34746) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/unplans`
 * @更新时间 `2024-05-14 16:49:09`
 */
export interface GetApiCoreSampleUnplansRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 采浆公司编号
   */
  stationNo?: string;
  /**
   * 样本编号
   */
  batchNo?: string;
  /**
   * 样本类型，NOR-血浆样本，CAB-回访样本
   */
  sampleType?: string;
}

/**
 * 接口 [查询已接收的且未加入检测计划的样本批次列表↗](https://yapi.sharing8.cn/project/529/interface/api/34746) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/unplans`
 * @更新时间 `2024-05-14 16:49:09`
 */
export interface GetApiCoreSampleUnplansResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 采浆公司
     */
    stationName?: string;
    /**
     * 样本批号
     */
    batchNo?: string;
    /**
     * 样本类型
     */
    sampleType?: string;
    /**
     * 浆站出库日期
     */
    outStationDate?: string;
    /**
     * 样本数量
     */
    sampleCount?: number;
    /**
     * 接收人
     */
    acceptor?: string;
    /**
     * 接收日期
     */
    acceptAt?: string;
  }[];
}

/**
 * 接口 [新增样本检测计划↗](https://yapi.sharing8.cn/project/529/interface/api/34752) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/sample/plan`
 * @更新时间 `2024-05-15 16:22:49`
 */
export interface PostApiCoreSamplePlanRequest {
  /**
   * 计划日期
   */
  planDate: string;
  /**
   * 混样方式
   */
  mixType: string;
  /**
   * 样本批次列表
   */
  batchList: {
    /**
     * 样本批号
     */
    batchNo: string;
    /**
     * 样本数量
     */
    sampleCount: number;
    /**
     * 排序号
     */
    orderNum: number;
  }[];
}

/**
 * 接口 [新增样本检测计划↗](https://yapi.sharing8.cn/project/529/interface/api/34752) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/sample/plan`
 * @更新时间 `2024-05-15 16:22:49`
 */
export type PostApiCoreSamplePlanResponse = string;

/**
 * 接口 [修改样本检测计划↗](https://yapi.sharing8.cn/project/529/interface/api/34758) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/sample/plan`
 * @更新时间 `2024-05-15 16:24:01`
 */
export interface PutApiCoreSamplePlanRequest {
  planNo?: string;
  planDate?: string;
  mixType?: string;
  batchList?: {
    batchNo?: string;
    sampleCount?: number;
    /**
     * 排序号
     */
    orderNum?: number;
  }[];
}

/**
 * 接口 [修改样本检测计划↗](https://yapi.sharing8.cn/project/529/interface/api/34758) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/sample/plan`
 * @更新时间 `2024-05-15 16:24:01`
 */
export type PutApiCoreSamplePlanResponse = string;

/**
 * 接口 [查看指定检测计划下的混样列表↗](https://yapi.sharing8.cn/project/529/interface/api/34764) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/plan/mixList`
 * @更新时间 `2024-05-16 00:04:15`
 */
export interface GetApiCoreSamplePlanMixListRequest {
  /**
   * 检测日期
   */
  planDate: string;
  /**
   * 混样方式，查看枚举类SampleMixTypeEnum
   */
  mixType: string;
  /**
   * 样本批号
   */
  batchNo?: string;
}

/**
 * 接口 [查看指定检测计划下的混样列表↗](https://yapi.sharing8.cn/project/529/interface/api/34764) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/plan/mixList`
 * @更新时间 `2024-05-16 00:04:15`
 */
export type GetApiCoreSamplePlanMixListResponse = {
  /**
   * 样本批号
   */
  batchNo?: string;
  /**
   * 样本类型
   */
  sampleType?: string;
  /**
   * 汇集管编号
   */
  mixTubeNo?: string;
  /**
   * 样本编号范围
   */
  sampleNoRange?: string;
  /**
   * 样本数量
   */
  sampleCount?: number;
  /**
   * 缺号样本
   */
  lackSampleNoes?: string;
}[];

/**
 * 接口 [查看指定汇集管下的混样详情列表↗](https://yapi.sharing8.cn/project/529/interface/api/34770) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/plan/mixTube/detail`
 * @更新时间 `2024-06-13 16:10:41`
 */
export interface GetApiCoreSamplePlanMixTubeDetailRequest {
  /**
   * 汇集管编号
   */
  mixTubeNo: string;
  /**
   * 检测日期
   */
  planDate: string;
  /**
   * 混样方式
   */
  mixType: string;
  /**
   * 样本批号
   */
  batchNo: string;
}

/**
 * 接口 [查看指定汇集管下的混样详情列表↗](https://yapi.sharing8.cn/project/529/interface/api/34770) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/plan/mixTube/detail`
 * @更新时间 `2024-06-13 16:10:41`
 */
export type GetApiCoreSamplePlanMixTubeDetailResponse = {
  /**
   * 样本批号
   */
  batchNo?: string;
  /**
   * 样本类型（翻译好返回）
   */
  sampleType?: string;
  /**
   * 汇集管编号
   */
  mixTubeNo?: string;
  /**
   * 样本编号
   */
  sampleNo?: string;
}[];

/**
 * 接口 [查询样本检测计划详情信息↗](https://yapi.sharing8.cn/project/529/interface/api/34776) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/plan/detail`
 * @更新时间 `2024-05-14 17:01:55`
 */
export interface GetApiCoreSamplePlanDetailRequest {
  /**
   * 计划单号
   */
  planNo: string;
}

/**
 * 接口 [查询样本检测计划详情信息↗](https://yapi.sharing8.cn/project/529/interface/api/34776) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/plan/detail`
 * @更新时间 `2024-05-14 17:01:55`
 */
export interface GetApiCoreSamplePlanDetailResponse {
  /**
   * 计划日期
   */
  planDate?: string;
  /**
   * 计划单号
   */
  planNo: string;
  /**
   * 混样方式
   */
  mixType?: string;
  /**
   * 样本批号列表
   */
  batchList?: {
    /**
     * 样本批号
     */
    batchNo?: string;
    /**
     * 样本数量
     */
    sampleCount?: number;
  }[];
}

/**
 * 接口 [保留样本出库申请单列表↗](https://yapi.sharing8.cn/project/529/interface/api/34836) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample`
 * @更新时间 `2024-06-12 20:15:38`
 */
export interface GetApiCoreBankDeliverSampleRequest {
  /**
   * 申请单号
   */
  dlvNo?: string;
  /**
   * 申请日期起
   */
  applyStartDate?: string;
  /**
   * 申请日期止
   */
  applyEndDate?: string;
  /**
   * 状态
   */
  state?: string;
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [保留样本出库申请单列表↗](https://yapi.sharing8.cn/project/529/interface/api/34836) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample`
 * @更新时间 `2024-06-12 20:15:38`
 */
export interface GetApiCoreBankDeliverSampleResponse {
  /**
   * 申请单号
   */
  dlvNo: string;
  /**
   * 批次数量  （按批隐藏）
   */
  batchNum: number;
  /**
   * 样本袋数   （按批隐藏）
   */
  sampleNum: string;
  /**
   * 样本数
   */
  totalNum: string;
  /**
   * 血浆最晚投产日期   （按批隐藏）
   */
  bagLatestProdDate: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 申请人
   */
  applyBy?: string;
  /**
   * 申请日期
   */
  applyDate?: string;
  /**
   * 审核人
   */
  reviewer?: string;
  /**
   * 审核日期
   */
  reviewDate?: string;
  state?: string;
}

/**
 * 接口 [保留样本出库单创建↗](https://yapi.sharing8.cn/project/529/interface/api/34842) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/bank/deliver/sample`
 * @更新时间 `2024-06-12 20:26:05`
 */
export interface PostApiCoreBankDeliverSampleRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [保留样本出库单创建↗](https://yapi.sharing8.cn/project/529/interface/api/34842) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/bank/deliver/sample`
 * @更新时间 `2024-06-12 20:26:05`
 */
export interface PostApiCoreBankDeliverSampleResponse {}

/**
 * 接口 [保留样本出库单样本批次详情列表↗](https://yapi.sharing8.cn/project/529/interface/api/34848) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/detail`
 * @更新时间 `2024-05-24 10:37:04`
 */
export interface GetApiCoreBankDeliverSampleDetailRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
}

/**
 * 接口 [保留样本出库单样本批次详情列表↗](https://yapi.sharing8.cn/project/529/interface/api/34848) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/detail`
 * @更新时间 `2024-05-24 10:37:04`
 */
export type GetApiCoreBankDeliverSampleDetailResponse = {
  /**
   * 浆站名称
   */
  stationName: string;
  /**
   * 样本袋数
   */
  sampleBagNum: number;
  /**
   * 样本批号
   */
  batchNo: string;
  /**
   * 样本数
   */
  sampleNum: string;
  /**
   * 最晚投产时间
   */
  bagLatestProdDate: string;
}[];

/**
 * 接口 [批量挑选保留样本批次列表↗](https://yapi.sharing8.cn/project/529/interface/api/34854) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample-pick`
 * @更新时间 `2024-05-24 10:43:11`
 */
export interface GetApiCoreBankDeliverSamplePickRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 样本批号
   */
  batchNo?: string;
}

/**
 * 接口 [批量挑选保留样本批次列表↗](https://yapi.sharing8.cn/project/529/interface/api/34854) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample-pick`
 * @更新时间 `2024-05-24 10:43:11`
 */
export type GetApiCoreBankDeliverSamplePickResponse = {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 样本批号
   */
  batchNo: string;
  /**
   * 样本袋数
   */
  sampleBagNum: string;
  /**
   * 样本数量
   */
  sampleNum: string;
  /**
   * 血浆最晚投产日期
   */
  bagLatestProdDate: string;
}[];

/**
 * 接口 [保留样本出库单详情删除↗](https://yapi.sharing8.cn/project/529/interface/api/34866) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `DELETE /api/core/bank/deliver/sample-pick`
 * @更新时间 `2024-05-24 10:40:57`
 */
export interface DeleteApiCoreBankDeliverSamplePickRequest {
  /**
   * 单号
   */
  dlvNo: string;
  /**
   * 批号列表
   */
  batchNos: string[];
}

/**
 * 接口 [保留样本出库单详情删除↗](https://yapi.sharing8.cn/project/529/interface/api/34866) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `DELETE /api/core/bank/deliver/sample-pick`
 * @更新时间 `2024-05-24 10:40:57`
 */
export interface DeleteApiCoreBankDeliverSamplePickResponse {}

/**
 * 接口 [保留样本挑选↗](https://yapi.sharing8.cn/project/529/interface/api/34872) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/bank/deliver/sample-pick`
 * @更新时间 `2024-05-24 10:45:52`
 */
export interface PostApiCoreBankDeliverSamplePickRequest {
  /**
   * 单号
   */
  dlvNo: string;
  /**
   * 血浆批号
   */
  batchNos: string[];
}

/**
 * 接口 [保留样本挑选↗](https://yapi.sharing8.cn/project/529/interface/api/34872) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/bank/deliver/sample-pick`
 * @更新时间 `2024-05-24 10:45:52`
 */
export interface PostApiCoreBankDeliverSamplePickResponse {}

/**
 * 接口 [保留样本出库移提交申请↗](https://yapi.sharing8.cn/project/529/interface/api/34878) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/bank/deliver/sample/ready/{dlvNo}`
 * @更新时间 `2024-05-23 14:44:58`
 */
export interface PutApiCoreBankDeliverSampleReadyDlvNoRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
}

/**
 * 接口 [保留样本出库移提交申请↗](https://yapi.sharing8.cn/project/529/interface/api/34878) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/bank/deliver/sample/ready/{dlvNo}`
 * @更新时间 `2024-05-23 14:44:58`
 */
export interface PutApiCoreBankDeliverSampleReadyDlvNoResponse {}

/**
 * 接口 [保留样本出库移提交申请撤销↗](https://yapi.sharing8.cn/project/529/interface/api/34884) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `DELETE /api/core/bank/deliver/sample/ready/{dlvNo}`
 * @更新时间 `2024-05-23 14:45:54`
 */
export interface DeleteApiCoreBankDeliverSampleReadyDlvNoRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
}

/**
 * 接口 [保留样本出库移提交申请撤销↗](https://yapi.sharing8.cn/project/529/interface/api/34884) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `DELETE /api/core/bank/deliver/sample/ready/{dlvNo}`
 * @更新时间 `2024-05-23 14:45:54`
 */
export interface DeleteApiCoreBankDeliverSampleReadyDlvNoResponse {}

/**
 * 接口 [保留样本出库申请单审核↗](https://yapi.sharing8.cn/project/529/interface/api/34890) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/bank/deliver/sample/process/{dlvNo}`
 * @更新时间 `2024-05-23 14:46:53`
 */
export interface PutApiCoreBankDeliverSampleProcessDlvNoRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
}

/**
 * 接口 [保留样本出库申请单审核↗](https://yapi.sharing8.cn/project/529/interface/api/34890) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/bank/deliver/sample/process/{dlvNo}`
 * @更新时间 `2024-05-23 14:46:53`
 */
export interface PutApiCoreBankDeliverSampleProcessDlvNoResponse {}

/**
 * 接口 [保留样本出库申请单审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/34896) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `DELETE /api/core/bank/deliver/sample/process/{dlvNo}`
 * @更新时间 `2024-05-23 14:47:27`
 */
export interface DeleteApiCoreBankDeliverSampleProcessDlvNoRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
}

/**
 * 接口 [保留样本出库申请单审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/34896) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `DELETE /api/core/bank/deliver/sample/process/{dlvNo}`
 * @更新时间 `2024-05-23 14:47:27`
 */
export interface DeleteApiCoreBankDeliverSampleProcessDlvNoResponse {}

/**
 * 接口 [保留样本扫描列表↗](https://yapi.sharing8.cn/project/529/interface/api/34902) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/scan`
 * @更新时间 `2024-05-27 17:56:32`
 */
export interface GetApiCoreBankDeliverSampleScanRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
}

/**
 * 接口 [保留样本扫描列表↗](https://yapi.sharing8.cn/project/529/interface/api/34902) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/scan`
 * @更新时间 `2024-05-27 17:56:32`
 */
export interface GetApiCoreBankDeliverSampleScanResponse {
  /**
   * 申请单号
   */
  dlvNo: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 批次数量
   */
  batchNum: string;
  /**
   * 样本袋数
   */
  sampleBagNum: string;
  /**
   * 样本数量
   */
  sampleNum: string;
  /**
   * 未出库袋数
   */
  waitOutNum: string;
  /**
   * 已出库袋数
   */
  outedNum: string;
  waitList: {
    /**
     * 样本袋号
     */
    sampleBagNo: string;
    /**
     * 样本数量
     */
    sampleNum?: string;
  }[];
  outedList: {
    /**
     * 样本袋号
     */
    sampleBagNo: string;
    /**
     * 出库日期
     */
    outDate: string;
    /**
     * 出库人
     */
    scanBy: string;
    /**
     * 样本数量
     */
    sampleNum: string;
  }[];
}

/**
 * 接口 [保留样本袋出库扫描↗](https://yapi.sharing8.cn/project/529/interface/api/34908) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/bank/deliver/sample/scan`
 * @更新时间 `2024-05-23 15:26:21`
 */
export interface PostApiCoreBankDeliverSampleScanRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
  /**
   * 样本袋号
   */
  sampleBagNo: string;
}

/**
 * 接口 [保留样本袋出库扫描↗](https://yapi.sharing8.cn/project/529/interface/api/34908) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/bank/deliver/sample/scan`
 * @更新时间 `2024-05-23 15:26:21`
 */
export interface PostApiCoreBankDeliverSampleScanResponse {}

/**
 * 接口 [保留样本托盘出库列表↗](https://yapi.sharing8.cn/project/529/interface/api/34914) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/tray`
 * @更新时间 `2024-05-28 11:27:52`
 */
export interface GetApiCoreBankDeliverSampleTrayRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * 样本批号
   */
  batchNo?: string;
  /**
   * 箱号
   */
  boxNo?: string;
}

/**
 * 接口 [保留样本托盘出库列表↗](https://yapi.sharing8.cn/project/529/interface/api/34914) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/tray`
 * @更新时间 `2024-05-28 11:27:52`
 */
export interface GetApiCoreBankDeliverSampleTrayResponse {
  /**
   * 托盘号
   */
  trayNo?: string;
  /**
   * 采浆公司
   */
  stationName?: string;
  /**
   * 样本批号
   */
  batchNo?: string;
  /**
   * 样本袋号
   */
  sampleBagNo?: string;
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 库房号
   */
  houseNo?: string;
  /**
   * 存放位置
   */
  location?: string;
}

/**
 * 接口 [保留样本接收：获取新的保留箱号↗](https://yapi.sharing8.cn/project/529/interface/api/34920) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/pack/next-boxno`
 * @更新时间 `2024-05-24 09:24:47`
 */
export interface GetApiCoreBatchSampleAcceptPackNextBoxnoRequest {}

/**
 * 接口 [保留样本接收：获取新的保留箱号↗](https://yapi.sharing8.cn/project/529/interface/api/34920) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/pack/next-boxno`
 * @更新时间 `2024-05-24 09:24:47`
 */
export type GetApiCoreBatchSampleAcceptPackNextBoxnoResponse = string;

/**
 * 接口 [保留样本接收：样本逐袋接收↗](https://yapi.sharing8.cn/project/529/interface/api/34926) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/batch/sample/accept/keep-pack`
 * @更新时间 `2024-05-27 17:05:46`
 */
export interface PostApiCoreBatchSampleAcceptKeepPackRequest {
  /**
   * 托盘号
   */
  trayNo?: string;
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 样本袋号
   */
  packNo: string;
  /**
   * 样本批号
   */
  batchNo?: string;
}

/**
 * 接口 [保留样本接收：样本逐袋接收↗](https://yapi.sharing8.cn/project/529/interface/api/34926) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/batch/sample/accept/keep-pack`
 * @更新时间 `2024-05-27 17:05:46`
 */
export interface PostApiCoreBatchSampleAcceptKeepPackResponse {
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 当前箱的样本袋数
   */
  packCount?: number;
  /**
   * 出库日期
   */
  outWarehouseDate?: string;
  /**
   * 采浆公司编号
   */
  stationNo?: string;
  /**
   * 采浆公司
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
   * 接收状态
   */
  acceptState?: string;
  /**
   * 未接收列表
   */
  unAcceptList?: {
    /**
     * 样本袋号
     */
    sampleBagNo?: string;
    /**
     * 样本数量
     */
    sampleCount?: number;
  }[];
  /**
   * 已接收列表
   */
  acceptedList?: {
    /**
     * 托盘编号
     */
    trayNo?: string;
    /**
     * 箱号
     */
    boxNo?: string;
    /**
     * 样本袋号
     */
    sampleBagNo?: string;
    /**
     * 样本数量
     */
    sampleCount?: number;
    /**
     * 接收人
     */
    acceptor?: string;
    /**
     * 接收日期
     */
    acceptAt?: string;
  }[];
}

/**
 * 接口 [保留样本接收：点击样本袋号超链接查看样本明细↗](https://yapi.sharing8.cn/project/529/interface/api/34956) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/detail`
 * @更新时间 `2024-05-31 17:19:14`
 */
export interface GetApiCoreBatchSampleAcceptKeepPackDetailRequest {
  /**
   * 当前页面
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 采浆公司编号
   */
  stationNo: string;
  /**
   * 样本批号
   */
  batchNo: string;
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 样本袋号
   */
  packNo?: string;
}

/**
 * 接口 [保留样本接收：点击样本袋号超链接查看样本明细↗](https://yapi.sharing8.cn/project/529/interface/api/34956) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/detail`
 * @更新时间 `2024-05-31 17:19:14`
 */
export interface GetApiCoreBatchSampleAcceptKeepPackDetailResponse {
  /**
   * 当前页码
   */
  currPage?: number;
  /**
   * 页大小
   */
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 采浆公司编号
     */
    stationNo?: string;
    /**
     * 采浆公司
     */
    stationName?: string;
    /**
     * 样本批号
     */
    batchNo?: string;
    /**
     * 样本袋号
     */
    packNo?: string;
    /**
     * 箱号
     */
    boxNo?: string;
    /**
     * 样本编号
     */
    sampleNo?: string;
    /**
     * 采集日期
     */
    collectAt?: string;
    /**
     * 浆员编号
     */
    donorNo?: string;
    /**
     * 浆员姓名
     */
    donorName?: string;
    cardNo?: string;
  }[];
}

/**
 * 接口 [保留样本接收：托盘入库列表↗](https://yapi.sharing8.cn/project/529/interface/api/34962) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/traies`
 * @更新时间 `2024-05-24 10:45:53`
 */
export interface GetApiCoreBatchSampleAcceptKeepPackTraiesRequest {
  /**
   * 样本批号
   */
  batchNo: string;
  /**
   * 样本袋号
   */
  packNo?: string;
  /**
   * 托盘编号
   */
  trayNo?: string;
}

/**
 * 接口 [保留样本接收：托盘入库列表↗](https://yapi.sharing8.cn/project/529/interface/api/34962) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/traies`
 * @更新时间 `2024-05-24 10:45:53`
 */
export type GetApiCoreBatchSampleAcceptKeepPackTraiesResponse = {
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * 箱号
   */
  boxCount?: number;
  /**
   * 样本袋数
   */
  packCount?: number;
  /**
   * 样本数量
   */
  sampleCount?: number;
  /**
   * 状态
   */
  state?: string;
  /**
   * 存放库房
   */
  houseName?: string;
  /**
   * 存放货位
   */
  locationNo?: string;
}[];

/**
 * 接口 [保留样本接收：箱明细列表↗](https://yapi.sharing8.cn/project/529/interface/api/34968) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/boxes`
 * @更新时间 `2024-05-23 20:22:19`
 */
export interface GetApiCoreBatchSampleAcceptKeepPackBoxesRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
}

/**
 * 接口 [保留样本接收：箱明细列表↗](https://yapi.sharing8.cn/project/529/interface/api/34968) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/boxes`
 * @更新时间 `2024-05-23 20:22:19`
 */
export type GetApiCoreBatchSampleAcceptKeepPackBoxesResponse = {
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 样本袋数
   */
  packCount?: number;
  /**
   * 封箱人
   */
  sealer?: string;
  /**
   * 封箱时间
   */
  sealAt?: string;
}[];

/**
 * 接口 [保留样本接收：样本袋明细列表↗](https://yapi.sharing8.cn/project/529/interface/api/34974) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/packes`
 * @更新时间 `2024-05-23 20:27:39`
 */
export interface GetApiCoreBatchSampleAcceptKeepPackPackesRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
}

/**
 * 接口 [保留样本接收：样本袋明细列表↗](https://yapi.sharing8.cn/project/529/interface/api/34974) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/packes`
 * @更新时间 `2024-05-23 20:27:39`
 */
export type GetApiCoreBatchSampleAcceptKeepPackPackesResponse = {
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 样本袋号
   */
  packNo?: string;
  /**
   * 样本数量
   */
  sampleCount?: number;
  /**
   * 接收人
   */
  acceptor?: string;
  /**
   * 接收时间
   */
  acceptAt?: string;
}[];

/**
 * 接口 [保留样本接收：撤销样本袋接收↗](https://yapi.sharing8.cn/project/529/interface/api/34980) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/batch/sample/accept/keep-pack/revoke`
 * @更新时间 `2024-05-23 20:32:42`
 */
export interface PutApiCoreBatchSampleAcceptKeepPackRevokeRequest {
  /**
   * 样本袋号
   */
  packNo: string;
}

/**
 * 接口 [保留样本接收：撤销样本袋接收↗](https://yapi.sharing8.cn/project/529/interface/api/34980) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/batch/sample/accept/keep-pack/revoke`
 * @更新时间 `2024-05-23 20:32:42`
 */
export interface PutApiCoreBatchSampleAcceptKeepPackRevokeResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应时间
   */
  msg: string;
}

/**
 * 接口 [保留样本接收：封箱↗](https://yapi.sharing8.cn/project/529/interface/api/34986) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/batch/sample/accept/keep-pack/seal`
 * @更新时间 `2024-06-06 09:29:26`
 */
export interface PutApiCoreBatchSampleAcceptKeepPackSealRequest {
  /**
   * 箱号
   */
  boxNo: string;
  /**
   * 托盘编号
   */
  trayNo: string;
  /**
   * 样本批号
   */
  batchNo: string;
}

/**
 * 接口 [保留样本接收：封箱↗](https://yapi.sharing8.cn/project/529/interface/api/34986) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/batch/sample/accept/keep-pack/seal`
 * @更新时间 `2024-06-06 09:29:26`
 */
export type PutApiCoreBatchSampleAcceptKeepPackSealResponse = string;

/**
 * 接口 [保留样本接收：打印箱签↗](https://yapi.sharing8.cn/project/529/interface/api/34992) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/batch/sample/accept/keep-pack/print-label`
 * @更新时间 `2024-05-27 15:11:17`
 */
export interface PostApiCoreBatchSampleAcceptKeepPackPrintLabelRequest {
  /**
   * 箱号
   */
  boxNo: string;
}

/**
 * 接口 [保留样本接收：打印箱签↗](https://yapi.sharing8.cn/project/529/interface/api/34992) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/batch/sample/accept/keep-pack/print-label`
 * @更新时间 `2024-05-27 15:11:17`
 */
export interface PostApiCoreBatchSampleAcceptKeepPackPrintLabelResponse {}

/**
 * 接口 [保留样本出库单样本批次详情-样本袋列表↗](https://yapi.sharing8.cn/project/529/interface/api/34998) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/detail-bag`
 * @更新时间 `2024-05-27 20:35:37`
 */
export interface GetApiCoreBankDeliverSampleDetailBagRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
}

/**
 * 接口 [保留样本出库单样本批次详情-样本袋列表↗](https://yapi.sharing8.cn/project/529/interface/api/34998) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/detail-bag`
 * @更新时间 `2024-05-27 20:35:37`
 */
export type GetApiCoreBankDeliverSampleDetailBagResponse = {
  /**
   * 浆站名称
   */
  stationName: string;
  /**
   * 样本袋号
   */
  sampleBagNo: number;
  /**
   * 样本批号
   */
  batchNo: string;
  /**
   * 样本数
   */
  sampleNum: string;
  /**
   * 箱号
   */
  boxNo: string;
  /**
   * 位置
   */
  location: string;
}[];

/**
 * 接口 [保留样本接收：样本批号列表↗](https://yapi.sharing8.cn/project/529/interface/api/35004) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/batches`
 * @更新时间 `2024-05-28 15:40:33`
 */
export interface GetApiCoreBatchSampleAcceptKeepPackBatchesRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 样本批号
   */
  batchNo?: string;
  /**
   * 采浆公司编号
   */
  stationNo?: string;
  /**
   * 样本类型，PER-保留样本
   */
  sampleType?: string;
  /**
   * 接收状态数组，W-待接收、R-接收中，S-已接收
   */
  acceptState?: string;
  /**
   * 接收开始日期
   */
  acceptBeginDate?: string;
  /**
   * 接收结束日期
   */
  acceptEndDate?: string;
}

/**
 * 接口 [保留样本接收：样本批号列表↗](https://yapi.sharing8.cn/project/529/interface/api/35004) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/batches`
 * @更新时间 `2024-05-28 15:40:33`
 */
export interface GetApiCoreBatchSampleAcceptKeepPackBatchesResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 采浆公司
     */
    stationName?: string;
    /**
     * 样本批号
     */
    batchNo?: string;
    /**
     * 样本类型
     */
    sampleType?: string;
    /**
     * 样本数量
     */
    sampleCount?: number;
    /**
     * 接收状态
     */
    acceptState?: string;
  }[];
}

/**
 * 接口 [保留样本接收：查询指定批次的接收详情↗](https://yapi.sharing8.cn/project/529/interface/api/35010) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/{batchNo}`
 * @更新时间 `2024-05-28 16:48:37`
 */
export interface GetApiCoreBatchSampleAcceptKeepPackBatchNoRequest {
  /**
   * 样本批号
   */
  batchNo: string;
}

/**
 * 接口 [保留样本接收：查询指定批次的接收详情↗](https://yapi.sharing8.cn/project/529/interface/api/35010) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/batch/sample/accept/keep-pack/{batchNo}`
 * @更新时间 `2024-05-28 16:48:37`
 */
export interface GetApiCoreBatchSampleAcceptKeepPackBatchNoResponse {
  outWarehouseDate?: string;
  stationNo?: string;
  stationName?: string;
  batchSampleNo?: string;
  sampleType?: string;
  bagCount?: number;
  totalCount?: number;
  acceptState?: string;
  unAcceptList?: {
    sampleBagNo?: string;
    sampleCount?: number;
  }[];
  acceptedList?: {
    trayNo?: string;
    boxNo?: string;
    sampleBagNo?: string;
    sampleCount?: number;
    acceptor?: string;
    acceptAt?: string;
  }[];
}

/**
 * 接口 [保留样本接收：接收完成↗](https://yapi.sharing8.cn/project/529/interface/api/35196) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/batch/sample/accept/keep-pack/finish`
 * @更新时间 `2024-06-05 16:45:06`
 */
export interface PutApiCoreBatchSampleAcceptKeepPackFinishRequest {
  /**
   * 样本批号
   */
  batchNo: string;
}

/**
 * 接口 [保留样本接收：接收完成↗](https://yapi.sharing8.cn/project/529/interface/api/35196) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/batch/sample/accept/keep-pack/finish`
 * @更新时间 `2024-06-05 16:45:06`
 */
export type PutApiCoreBatchSampleAcceptKeepPackFinishResponse = string;

/**
 * 接口 [保留样本出库单更新↗](https://yapi.sharing8.cn/project/529/interface/api/35244) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/bank/deliver/sample`
 * @更新时间 `2024-06-06 20:00:46`
 */
export interface PutApiCoreBankDeliverSampleRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [保留样本出库单更新↗](https://yapi.sharing8.cn/project/529/interface/api/35244) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `PUT /api/core/bank/deliver/sample`
 * @更新时间 `2024-06-06 20:00:46`
 */
export interface PutApiCoreBankDeliverSampleResponse {}

/**
 * 接口 [批量挑选保留样本批次列表-单个挑选↗](https://yapi.sharing8.cn/project/529/interface/api/35346) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample-pick-single`
 * @更新时间 `2024-06-12 20:21:48`
 */
export interface GetApiCoreBankDeliverSamplePickSingleRequest {
  /**
   * 样本批号
   */
  batchNo?: string;
  /**
   * 样本编号
   */
  sampleNo?: string;
  /**
   * 浆员编号
   */
  donorNo?: string;
  /**
   * 血浆状态
   */
  plasmaType?: string;
  /**
   * 血浆不合格原因， 血浆不合格原因字典，传code
   */
  unqReason?: string;
}

/**
 * 接口 [批量挑选保留样本批次列表-单个挑选↗](https://yapi.sharing8.cn/project/529/interface/api/35346) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample-pick-single`
 * @更新时间 `2024-06-12 20:21:48`
 */
export type GetApiCoreBankDeliverSamplePickSingleResponse = {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 样本批号
   */
  batchNo: string;
  /**
   * 样本编号
   */
  sampleNo: string;
  /**
   * 采集日期
   */
  collectDate: string;
  /**
   * 浆员姓名
   */
  donorName: string;
  /**
   * 浆员编号
   */
  donorNo: string;
  /**
   * 血型
   */
  bloodType: string;
  /**
   * 血浆状态
   */
  plasmaType: string;
  /**
   * 血浆不合格原因
   */
  unqReason: string;
}[];

/**
 * 接口 [保留样本出库申请单详情-单个↗](https://yapi.sharing8.cn/project/529/interface/api/35352) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample-detail-single`
 * @更新时间 `2024-06-17 09:10:54`
 */
export interface GetApiCoreBankDeliverSampleDetailSingleRequest {
  /**
   * 申请单号
   */
  dlvNo?: string;
}

/**
 * 接口 [保留样本出库申请单详情-单个↗](https://yapi.sharing8.cn/project/529/interface/api/35352) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample-detail-single`
 * @更新时间 `2024-06-17 09:10:54`
 */
export type GetApiCoreBankDeliverSampleDetailSingleResponse = {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 样本批号
   */
  batchNo: string;
  /**
   * 样本编号
   */
  sampleNo: string;
  /**
   * 采集日期
   */
  collectDate: string;
  /**
   * 浆员姓名
   */
  donorName: string;
  /**
   * 浆员编号
   */
  donorNo: string;
  /**
   * 类别
   */
  source: string;
  /**
   * 血型
   */
  bloodType: string;
  /**
   * 血浆状态
   */
  plasmaType: string;
  /**
   * 血浆不合格原因
   */
  unqReason: string;
}[];

/**
 * 接口 [保留样本挑选-单个挑选↗](https://yapi.sharing8.cn/project/529/interface/api/35358) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/bank/deliver/sample-pick-single`
 * @更新时间 `2024-06-12 20:29:11`
 */
export interface PostApiCoreBankDeliverSamplePickSingleRequest {
  /**
   * 单号
   */
  dlvNo: string;
  /**
   * 样本编号
   */
  sampleNos: string[];
}

/**
 * 接口 [保留样本挑选-单个挑选↗](https://yapi.sharing8.cn/project/529/interface/api/35358) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `POST /api/core/bank/deliver/sample-pick-single`
 * @更新时间 `2024-06-12 20:29:11`
 */
export interface PostApiCoreBankDeliverSamplePickSingleResponse {}

/**
 * 接口 [保留样本扫描列表-单个↗](https://yapi.sharing8.cn/project/529/interface/api/35364) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/scan-single`
 * @更新时间 `2024-06-17 09:12:07`
 */
export interface GetApiCoreBankDeliverSampleScanSingleRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
}

/**
 * 接口 [保留样本扫描列表-单个↗](https://yapi.sharing8.cn/project/529/interface/api/35364) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/scan-single`
 * @更新时间 `2024-06-17 09:12:07`
 */
export interface GetApiCoreBankDeliverSampleScanSingleResponse {
  /**
   * 未出库袋数
   */
  waitOutNum: string;
  /**
   * 已出库袋数
   */
  outedNum: string;
  waitList: {
    /**
     * 样本编号
     */
    sampleNo: string;
    /**
     * 类别
     */
    source: string;
    /**
     * 浆员编号
     */
    donorNo?: string;
  }[];
  outedList: {
    /**
     * 样本编号
     */
    sampleNo: string;
    /**
     * 类别
     */
    source: string;
    /**
     * 出库日期
     */
    outDate: string;
    /**
     * 出库人
     */
    scanBy: string;
    /**
     * 浆员编号
     */
    donorNo: string;
  }[];
}

/**
 * 接口 [保留样本托盘出库列表-单个↗](https://yapi.sharing8.cn/project/529/interface/api/35370) 的 **请求类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/tray-single`
 * @更新时间 `2024-06-17 09:12:36`
 */
export interface GetApiCoreBankDeliverSampleTraySingleRequest {
  /**
   * 申请单号
   */
  dlvNo: string;
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * 样本批号
   */
  batchNo?: string;
  /**
   * 样本编号
   */
  sampleNo?: string;
}

/**
 * 接口 [保留样本托盘出库列表-单个↗](https://yapi.sharing8.cn/project/529/interface/api/35370) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/bank/deliver/sample/tray-single`
 * @更新时间 `2024-06-17 09:12:36`
 */
export interface GetApiCoreBankDeliverSampleTraySingleResponse {
  /**
   * 托盘号
   */
  trayNo: string;
  /**
   * 样本编号
   */
  sampleNo: string;
  /**
   * 类别
   */
  source: string;
  /**
   * 样本袋号
   */
  sampleBagNo: string;
  /**
   * 浆员姓名
   */
  donorName: string;
  /**
   * 箱号
   */
  boxNo: string;
  /**
   * 存放位置
   */
  location: string;
}

/**
 * 接口 [新增预检项↗](https://yapi.sharing8.cn/project/529/interface/api/34944) 的 **请求类型**
 *
 * @分类 [预检登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5938)
 * @请求头 `POST /api/core/lab/preview`
 * @更新时间 `2024-05-24 17:28:54`
 */
export type PostApiCoreLabPreviewRequest = {
  bsNo: string;
  immunity: string;
  projectIds: string[];
}[];

/**
 * 接口 [新增预检项↗](https://yapi.sharing8.cn/project/529/interface/api/34944) 的 **返回类型**
 *
 * @分类 [预检登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5938)
 * @请求头 `POST /api/core/lab/preview`
 * @更新时间 `2024-05-24 17:28:54`
 */
export type PostApiCoreLabPreviewResponse = string;

/* prettier-ignore-end */
