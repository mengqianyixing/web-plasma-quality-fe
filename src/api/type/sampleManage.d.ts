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
 * @更新时间 `2024-01-05 14:53:03`
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
 * @更新时间 `2024-01-05 14:53:03`
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
 * @更新时间 `2024-05-16 00:01:55`
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
}

/**
 * 接口 [查看指定汇集管下的混样详情列表↗](https://yapi.sharing8.cn/project/529/interface/api/34770) 的 **返回类型**
 *
 * @分类 [样本管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5376)
 * @请求头 `GET /api/core/sample/plan/mixTube/detail`
 * @更新时间 `2024-05-16 00:01:55`
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

/* prettier-ignore-end */
