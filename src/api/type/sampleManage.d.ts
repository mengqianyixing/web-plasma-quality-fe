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

/* prettier-ignore-end */
