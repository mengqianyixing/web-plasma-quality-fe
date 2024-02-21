/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [血浆查询↗](https://yapi.sharing8.cn/project/529/interface/api/33227) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/statistics`
 * @更新时间 `2024-02-19 17:14:24`
 */
export interface GetApiCoreBagStatisticsRequest {
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
   * 浆站出库状态，0表示未出库，1表示已出库
   */
  stationOutboundStatus?: string;
  /**
   * 采集开始日期
   */
  collectBeginAt?: string;
  /**
   * 采集结束日期
   */
  collectEndAt?: string;
  /**
   * 现存箱号
   */
  currBoxNo?: string;
  /**
   * 浆员编号
   */
  donorNo?: string;
  /**
   * 浆员姓名
   */
  donorName?: string;
  /**
   * 浆员状态，NOR-正常，RFT-暂拒，RFF-永拒
   */
  donorStatus?: string;
  /**
   * 血型（A/O/AB/B）
   */
  bloodType?: string;
  /**
   * 血浆编号
   */
  bagNo?: string;
  /**
   * 来浆类型（读取基础配置的血浆类型数据）
   */
  plasmaTypeFromStation?: string;
  /**
   * 最小浆站净重
   */
  minStationNetweight?: string;
  /**
   * 最大浆站净重
   */
  maxStationNetweight?: string;
  /**
   * 参考样本采集开始日期
   */
  seeSampleCollectBeginAt?: string;
  /**
   * 参考样本采集开始日期
   */
  seeSampleCollectEndAt?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 入库状态，NOT-未入库，LCK-缺号，OUT-已出库，IN-在库
   */
  warehousingStatus?: string;
  /**
   * 最小验收净重
   */
  minVerifyNetweight?: string;
  /**
   * 最大验收净重
   */
  maxVerifyNetweight?: string;
  /**
   * 检疫期满足开始日期
   */
  trackedQualifiedBeginAt?: string;
  /**
   * 检疫期满足结束日期
   */
  trackedQualifiedEndAt?: string;
  /**
   * 血浆过程状态，-----待定，涉及多个存储状态
   */
  plasmaStatus?: string;
  /**
   * 血浆类型（读取基础配置的血浆类型数据）
   */
  plasmaType?: string;
  /**
   * 最小效价结果值
   */
  minTiter?: string;
  /**
   * 最大效价结果值
   */
  maxTiter?: string;
  /**
   * 参考样本类型，CAB-回访样本，NOR-血浆样本
   */
  seeSampleType?: string;
  /**
   * 检疫期状态，0表示不满足，1表示满足
   */
  trackedStatus?: string;
  /**
   * 参考批号
   */
  seeBatchNo?: string;
  /**
   * 参考样本
   */
  seeSampleNo?: string;
  /**
   * 检疫期类型（检疫期合格/首次续追踪/反复续追踪/非生产出库/不合格）  ------待定
   */
  trackedType?: string;
  /**
   * 复检结果，0-不合格，1-合格
   */
  reCheckResult?: string;
  /**
   * 血浆不合格原因（读取基础配置的血浆不合格原因数据）
   */
  plasmaUnqualifiedReason?: string;
  /**
   * 参考样本结果，0-不合格，1-合格
   */
  seeSampleResult?: string;
}

/**
 * 接口 [血浆查询↗](https://yapi.sharing8.cn/project/529/interface/api/33227) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/statistics`
 * @更新时间 `2024-02-19 17:14:24`
 */
export interface GetApiCoreBagStatisticsResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 采浆公司
     */
    stationName?: string;
    /**
     * 血浆批号
     */
    batchNo?: string;
    /**
     * 浆站箱号
     */
    stationBoxNo?: string;
    /**
     * 现存箱号
     */
    currBoxNo?: string;
    /**
     * 血浆编号
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
     * 浆员姓名
     */
    donorName?: string;
    /**
     * 浆员状态，NOR-正常，RFT-暂拒，RFF-永拒
     */
    donorStatus?: string;
    /**
     * 血型
     */
    bloodType?: string;
    /**
     * 来浆类型
     */
    plasmaTypeFromStation?: string;
    /**
     * 效价类型
     */
    titerType?: string;
    /**
     * 浆站净重(g)
     */
    stationNetweight?: number;
    /**
     * 验收净重(g)
     */
    verifyNetweight?: number;
    /**
     * 血浆过程状态
     */
    plasmaStatus?: string;
    /**
     * 检疫期类型
     */
    trackedType?: string;
    /**
     * 血浆不合格原因
     */
    plasmaUnqualifiedReason?: string;
    /**
     * 血浆复检信息（结果发布日期、复检结果、不合格项目、血浆类型、效价结果值）
     */
    reCheckInfo?: {
      /**
       * 结果发布日期
       */
      issueAt?: string;
      /**
       * 复检结果，0表示不合格，1表示合格
       */
      reCheckResult?: number;
      /**
       * 不合格项目
       */
      unqualifiedItems?: string;
      /**
       * 血浆类型
       */
      immunityType?: string;
      /**
       * 效价结果值
       */
      titer?: number;
    };
    /**
     * 检疫期参考信息（满足日期、样本批号、样本编号、采集日期、浆站检验日期、厂家复检日期、样本结果、不合格项目）
     */
    trackedSeeInfo?: {
      /**
       * 满足日期
       */
      qualifiedDate?: string;
      /**
       * 样本批号
       */
      batchSampleNo?: string;
      /**
       * 样本编号
       */
      sampleNo?: string;
      /**
       * 采集日期
       */
      collectAt?: string;
      /**
       * 浆站检验日期
       */
      stationCheckDate?: string;
      /**
       * 厂家复检日期
       */
      reCheckDate?: string;
      /**
       * 样本结果，0表示不合格，1表示合格
       */
      reCheckResult?: number;
      /**
       * 不合格项目
       */
      unqualifiedItems?: string;
    };
    /**
     * 地址
     */
    address?: string;
  }[];
}

/* prettier-ignore-end */
