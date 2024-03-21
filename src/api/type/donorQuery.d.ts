/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [浆员信息查询↗](https://yapi.sharing8.cn/project/529/interface/api/33277) 的 **请求类型**
 *
 * @分类 [浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5730)
 * @请求头 `POST /api/core/donor/list`
 * @更新时间 `2024-02-23 15:55:32`
 */
export interface PostApiCoreDonorListRequest {
  /**
   * 浆员编号
   */
  donorNo: string;
}

/**
 * 接口 [浆员信息查询↗](https://yapi.sharing8.cn/project/529/interface/api/33277) 的 **返回类型**
 *
 * @分类 [浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5730)
 * @请求头 `POST /api/core/donor/list`
 * @更新时间 `2024-02-23 15:55:32`
 */
export interface PostApiCoreDonorListResponse {
  /**
   * 浆员编号
   */
  donorNo?: string;
  /**
   * 身份证号
   */
  idcardId?: string;
  /**
   * 身份证地址
   */
  idcardAddress?: string;
  /**
   * 不合格依据日期
   */
  blockCreateAt?: string;
  /**
   * 建档日期
   */
  createAt?: string;
  /**
   * 民族
   */
  nation?: string;
  /**
   * 工  作
   */
  profession?: string;
  /**
   * 状态
   */
  donorStatus?: string;
  /**
   * 年龄
   */
  age?: string;
  /**
   * 性别
   */
  gender?: string;
  /**
   * 血型
   */
  bloodType?: string;
  /**
   * 浆员姓名
   */
  name?: string;
  /**
   * 采浆公司
   */
  stationName?: string;
  /**
   * 暂拒/淘汰原因
   */
  failedCause?: string;
  /**
   * 现居地址
   */
  currentAddress?: string;
  /**
   * 淘汰系统
   */
  blockSys?: string;
}

/**
 * 接口 [浆员血浆信息↗](https://yapi.sharing8.cn/project/529/interface/api/33362) 的 **请求类型**
 *
 * @分类 [浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5730)
 * @请求头 `POST /api/core/donor/plasma`
 * @更新时间 `2024-02-23 16:12:26`
 */
export interface PostApiCoreDonorPlasmaRequest {
  donorNo: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [浆员血浆信息↗](https://yapi.sharing8.cn/project/529/interface/api/33362) 的 **返回类型**
 *
 * @分类 [浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5730)
 * @请求头 `POST /api/core/donor/plasma`
 * @更新时间 `2024-02-23 16:12:26`
 */
export interface PostApiCoreDonorPlasmaResponse {
  totalCount: number;
  pageSize: null;
  totalPage: null;
  currPage: null;
  result?: {
    /**
     * 浆站箱号
     */
    stationBoxNo: string;
    /**
     * 现存箱号
     */
    boxNo: string;
    /**
     * 血浆批号
     */
    fkBatchNo: string;
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 采集日期
     */
    collectAt: string;
    /**
     * 验收净重
     */
    netWeight: string;
    /**
     * 系统净重
     */
    rawWeight: string;
    /**
     * 来浆类型
     */
    rawImm: string;
    /**
     * 效价类型
     */
    titerType: string;
    /**
     * 血浆过程状态
     */
    processState: string;
    /**
     * 血浆不合格原因
     */
    failed: string;
    /**
     * 血浆复检信息
     */
    reCheckInfo: {
      /**
       * 结果发布日期
       */
      issueAt: string;
      /**
       * 复检结果
       */
      reCheckResult: string;
      /**
       * 不合格项目
       */
      unqualifiedItems: string;
      /**
       * 血浆类型
       */
      immunityType: string;
      /**
       * 效价结果值
       */
      titer: string;
    };
    /**
     * 检疫期参考信息
     */
    trackedSeeInfo: {
      /**
       * 满足日期
       */
      qualifiedDate: string;
      /**
       * 样本批号
       */
      batchSampleNo: string;
      /**
       * 样本编号
       */
      sampleNo: string;
      /**
       *  采集日期
       */
      collectAt: string;
      /**
       *  浆站检验日期
       */
      stationCheckDate: string;
      /**
       * 厂家复检日期
       */
      reCheckDate: string;
      /**
       * 样本结果，0表示不合格，1表示合格
       */
      reCheckResult: string;
      /**
       * 不合格项目
       */
      unqualifiedItems: string;
    };
  }[];
}

/**
 * 接口 [回访明细↗](https://yapi.sharing8.cn/project/529/interface/api/33402) 的 **请求类型**
 *
 * @分类 [浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5730)
 * @请求头 `POST /api/core/donor/callbacks`
 * @更新时间 `2024-02-23 17:15:52`
 */
export interface PostApiCoreDonorCallbacksRequest {
  donorNo: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [回访明细↗](https://yapi.sharing8.cn/project/529/interface/api/33402) 的 **返回类型**
 *
 * @分类 [浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5730)
 * @请求头 `POST /api/core/donor/callbacks`
 * @更新时间 `2024-02-23 17:15:52`
 */
export interface PostApiCoreDonorCallbacksResponse {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  result?: {
    /**
     * 样本编号
     */
    sampleNo: string;
    /**
     * 样本批号
     */
    bsNo: string;
    /**
     * 采集日期
     */
    collectAt: string;
    /**
     * 结果发布日期
     */
    releaseAt: string;
    /**
     * 样本状态
     */
    state: string;
    /**
     * 样本结果
     */
    reslut: string;
    /**
     * 不合格项目
     */
    faild: string;
  }[];
}

/**
 * 接口 [效价趋势图↗](https://yapi.sharing8.cn/project/529/interface/api/33407) 的 **请求类型**
 *
 * @分类 [浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5730)
 * @请求头 `GET /api/core/donor/chart/{donorNo}`
 * @更新时间 `2024-02-23 18:13:12`
 */
export interface GetApiCoreDonorChartDonorNoRequest {
  donorNo: string;
}

/**
 * 接口 [效价趋势图↗](https://yapi.sharing8.cn/project/529/interface/api/33407) 的 **返回类型**
 *
 * @分类 [浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5730)
 * @请求头 `GET /api/core/donor/chart/{donorNo}`
 * @更新时间 `2024-02-23 18:13:12`
 */
export type GetApiCoreDonorChartDonorNoResponse = {
  /**
   * 免疫类型
   */
  immunity: string;
  line: {
    /**
     * 采集日期
     */
    collectAt: string;
    /**
     * 效价值
     */
    titer: string;
  }[];
}[];

/**
 * 接口 [接口模版样例↗](https://yapi.sharing8.cn/project/529/interface/api/33979) 的 **请求类型**
 *
 * @分类 [浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5730)
 * @请求头 `GET /a/b/c`
 * @更新时间 `2024-03-18 10:38:07`
 */
export interface GetAbcRequest {}

/**
 * 接口 [接口模版样例↗](https://yapi.sharing8.cn/project/529/interface/api/33979) 的 **返回类型**
 *
 * @分类 [浆员查询↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5730)
 * @请求头 `GET /a/b/c`
 * @更新时间 `2024-03-18 10:38:07`
 */
export interface GetAbcResponse {}

/* prettier-ignore-end */
