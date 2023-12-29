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
 * @更新时间 `2023-12-29 11:28:16`
 */
export interface GetApiCoreDonorCallbackNeedRequest {
  currPage: string;
  pageSize: string;
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
  immType: string;
  /**
   * 末次距今未采浆天数
   */
  gapDays: string;
}

/**
 * 接口 [待回访浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/31899) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `GET /api/core/donor/callback/need`
 * @更新时间 `2023-12-29 11:28:16`
 */
export interface GetApiCoreDonorCallbackNeedResponse {
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
     * 浆员姓名
     */
    donorName: string;
    /**
     * 性别
     */
    gender: number;
    /**
     * 状态
     */
    donatorStatus: string;
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
    plasmaCount: string;
  }[];
}

/**
 * 接口 [待回访浆员生成↗](https://yapi.sharing8.cn/project/529/interface/api/31902) 的 **请求类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `POST /api/core/donor/callback/need`
 * @更新时间 `2023-12-29 09:51:55`
 */
export interface PostApiCoreDonorCallbackNeedRequest {
  stationNo: string;
  /**
   * 最早回访采浆结束日期
   */
  maxCollectTime: string;
  /**
   * 最早回访采浆开始日期
   */
  minCollectTime: string;
  /**
   *  回访间隔天数 保留字段可以先不传
   */
  intervalDay?: string;
  /**
   * 未勾选的浆员编号
   */
  donorNos?: string[];
}

/**
 * 接口 [待回访浆员生成↗](https://yapi.sharing8.cn/project/529/interface/api/31902) 的 **返回类型**
 *
 * @分类 [浆员管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5327)
 * @请求头 `POST /api/core/donor/callback/need`
 * @更新时间 `2023-12-29 09:51:55`
 */
export type PostApiCoreDonorCallbackNeedResponse = null;

/* prettier-ignore-end */
