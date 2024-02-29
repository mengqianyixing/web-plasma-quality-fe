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
 * @更新时间 `2024-02-22 17:42:44`
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
   * 血浆过程状态（读取后端枚举）
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
   * 检疫期类型，PASS-检疫期合格，UN_TRACK-待追踪，FIRST_UN_TRACK-首次续追踪，RE_UN_TRACK-反复续追踪，UN_PROD_OUT-非生产出库，FAILED-血浆不合格
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
 * @更新时间 `2024-02-22 17:42:44`
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

/**
 * 接口 [批号查询-来浆数据↗](https://yapi.sharing8.cn/project/529/interface/api/33367) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/plasma/statistic`
 * @更新时间 `2024-02-22 22:35:23`
 */
export interface GetApiCoreBatchPlasmaStatisticRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 血浆批号起
   */
  batchStartNo?: string;
  /**
   * 血浆批号止
   */
  batchEndNo?: string;
}

/**
 * 接口 [批号查询-来浆数据↗](https://yapi.sharing8.cn/project/529/interface/api/33367) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/plasma/statistic`
 * @更新时间 `2024-02-22 22:35:23`
 */
export interface GetApiCoreBatchPlasmaStatisticResponse {
  batchNo: string;
  typeList: {
    /**
     * 来浆类型
     */
    plasmaType: string;
    /**
     * 血浆编号（起止）
     */
    batchNoRange: string;
    /**
     * 浆站不合格
     */
    lackNos?: string;
    /**
     * 血浆数量
     */
    totalNum: number;
    /**
     * 验收净重
     */
    verifyWeight: number;
    /**
     * 验收血浆不合格编号
     */
    verifyUnqNos?: string;
  }[];
}

/**
 * 接口 [批号查询-检疫期↗](https://yapi.sharing8.cn/project/529/interface/api/33412) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/quarantine/statistic`
 * @更新时间 `2024-02-22 23:00:21`
 */
export interface GetApiCoreBatchQuarantineStatisticRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 血浆批号起
   */
  batchStartNo?: string;
  /**
   * 血浆批号止
   */
  batchEndNo?: string;
}

/**
 * 接口 [批号查询-检疫期↗](https://yapi.sharing8.cn/project/529/interface/api/33412) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/quarantine/statistic`
 * @更新时间 `2024-02-22 23:00:21`
 */
export interface GetApiCoreBatchQuarantineStatisticResponse {
  /**
   * 批号
   */
  batchNo: string;
  typeList: {
    /**
     * 检疫期类型
     */
    quarantineType: string;
    /**
     * 效价类型
     */
    titerType: string;
    /**
     * 批检疫期报告情况血浆数量
     */
    batchStatusTotal: number;
    /**
     * 批检疫期报告情况验收净重
     */
    batchStatusWeight: number;
    /**
     * 当前检疫期状态血浆数量
     */
    nowStatusTotal: number;
    /**
     * 当前检疫期状态验收净重
     */
    nowStatusWeight: number;
    /**
     * 库存状态在库数量
     */
    stockTotal: number;
    /**
     * 库存状态在库净重
     */
    stockWeight: number;
    /**
     * 库存状态出库数量
     */
    outTotal: number;
    /**
     * 库存状态出库净重
     */
    outWeight: number;
  }[];
}

/**
 * 接口 [货位查询↗](https://yapi.sharing8.cn/project/529/interface/api/33457) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bank/location/statistics`
 * @更新时间 `2024-02-26 19:20:20`
 */
export interface GetApiCoreBankLocationStatisticsRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 血浆（样本）批号
   */
  batchNo?: string;
  /**
   * 血浆类型（通过查询后端枚举ImmType）
   */
  plasmaType?: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * 存放类型（通过查询后端枚举BankTrayTypeEnum）
   */
  trayType?: string;
  /**
   * 血浆（样本）箱号
   */
  boxNo?: string;
}

/**
 * 接口 [货位查询↗](https://yapi.sharing8.cn/project/529/interface/api/33457) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bank/location/statistics`
 * @更新时间 `2024-02-26 19:20:20`
 */
export interface GetApiCoreBankLocationStatisticsResponse {
  currPage?: number;
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
     * 血浆（样本）批号
     */
    batchNo?: string;
    /**
     * 当前箱号
     */
    boxNo?: string;
    /**
     * 数量
     */
    bagCount?: number;
    /**
     * 当前托盘编号
     */
    trayNo?: string;
    /**
     * 库房编号
     */
    houseNo?: string;
    /**
     * 存放库房
     */
    warehouseName?: string;
    /**
     * 库房类型
     */
    houseType?: string;
    /**
     * 当前货位号
     */
    locationNo?: string;
    /**
     * 存放类型（PLA-血浆，NOR-检测样本，PER-保留样本，EPT-空托盘）
     */
    trayType?: string;
  }[];
}

/**
 * 接口 [检测结果查询↗](https://yapi.sharing8.cn/project/529/interface/api/33462) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/samples`
 * @更新时间 `2024-02-26 15:04:17`
 */
export interface PostApiCoreLabSamplesRequest {
  pageSize: string;
  currPage: string;
  /**
   * 样本批号
   */
  bsNo?: string;
  /**
   * 样本类型
   */
  sampleType: string;
  /**
   * 采浆公司
   */
  fkStationNo: string;
  /**
   * 结果发布日期
   */
  issueAt: string;
  /**
   * 样本采集日期
   */
  collectAt: string;
}

/**
 * 接口 [检测结果查询↗](https://yapi.sharing8.cn/project/529/interface/api/33462) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/samples`
 * @更新时间 `2024-02-26 15:04:17`
 */
export interface PostApiCoreLabSamplesResponse {
  totalCount: number;
  pageSize: null;
  totalPage: null;
  currPage: null;
  result: {
    /**
     * 样本批号
     */
    bsNo?: string;
    /**
     * 采浆公司
     */
    stationName?: string;
    /**
     * 样本类型
     */
    sampleType?: string;
    /**
     * 样本数量
     */
    sampleCount?: string;
    /**
     * 样本验收
     */
    verification?: {
      /**
       * 合格数
       */
      passCount?: string;
      /**
       * 不合格数
       */
      failedCount?: string;
      /**
       * 不合格比率(%)
       */
      ratio?: string;
    };
    /**
     * 检测数量
     */
    testCount?: string;
    /**
     * 检测合格
     */
    qualified?: {
      /**
       * 合格数
       */
      passCount: string;
      /**
       * 合格比率(%)
       */
      ratio: string;
    };
    /**
     * 检测不合格
     */
    unqualified: {
      /**
       * HBV-DNA
       */
      hbvdna: string;
      /**
       * HCV-RNA
       */
      hcvrna: string;
      /**
       * HIV-RNA
       */
      hivrna: string;
      /**
       * HBsAg
       */
      hbsag: string;
      /**
       * HCV抗体
       */
      hcv: string;
      /**
       * HIV-1/HIV-2抗体
       */
      hiv: string;
      /**
       * TP抗体
       */
      tpAntibody: string;
      /**
       * ALT
       */
      alt: string;
      /**
       * TP
       */
      tp: string;
      /**
       * 合计
       */
      count: string;
      /**
       * 不合格比率(%)
       */
      ratio: string;
    };
  }[];
}

/**
 * 接口 [样本查询↗](https://yapi.sharing8.cn/project/529/interface/api/33467) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/sample/query`
 * @更新时间 `2024-02-26 15:12:57`
 */
export interface GetApiCoreSampleQueryRequest {
  /**
   * 当前页数
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 样本批号
   */
  sampleBatchNo?: string;
  /**
   * 样本编号
   */
  sampleNo?: string;
  /**
   * 采集开始日期
   */
  collectBeginAt?: string;
  /**
   * 采集结束日期
   */
  collectEndAt?: string;
  /**
   * 样本类型（通过查询枚举接口SampleType）
   */
  sampleType?: string;
  /**
   * 浆员编号
   */
  donorNo?: string;
  /**
   * 浆员姓名
   */
  donorName?: string;
  /**
   * 检测发布开始日期
   */
  issueBeginAt?: string;
  /**
   * 检测发布结束日期
   */
  issueEndAt?: string;
  /**
   * 样本状态（浆站报废/缺号/不合格/合格）---待定
   */
  sampleStatus?: string;
  /**
   * 来浆类型（通过查询枚举接口ImmType）
   */
  plasmaTypeFromStation?: string;
  /**
   * 血浆类型（通过查询枚举接口ImmType）
   */
  plasmaType?: string;
}

/**
 * 接口 [样本查询↗](https://yapi.sharing8.cn/project/529/interface/api/33467) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/sample/query`
 * @更新时间 `2024-02-26 15:12:57`
 */
export interface GetApiCoreSampleQueryResponse {
  currPage?: number;
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
    sampleBatchNo?: string;
    /**
     * 样本类型
     */
    sampleType?: string;
    /**
     * 样本编号
     */
    sampleNo?: string;
    /**
     * 采集日期
     */
    collectAt?: string;
    /**
     * 来浆类型
     */
    plasmaTypeFromStation?: string;
    /**
     * 血浆类型
     */
    plasmaType?: string;
    /**
     * 浆员编号
     */
    donorNo?: string;
    /**
     * 浆员姓名
     */
    donorName?: string;
    /**
     * 接收人
     */
    acceptor?: string;
    /**
     * 接收日期
     */
    acceptAt?: string;
    /**
     * 样本状态 ---待定
     */
    sampleStatus?: string;
    /**
     * 检测结果
     */
    testResult?: string;
    /**
     * 不合格原因
     */
    unqualifiedReason?: string;
    /**
     * 效价值
     */
    titer?: number;
  }[];
}

/**
 * 接口 [样本统计↗](https://yapi.sharing8.cn/project/529/interface/api/33472) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/sample/statistics`
 * @更新时间 `2024-02-26 15:31:14`
 */
export interface GetApiCoreSampleStatisticsRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 分页大小
   */
  pageSize: string;
  /**
   * 采浆公司编号
   */
  stationNo?: string;
  /**
   * 样本批号
   */
  sampleBatchNo?: string;
  /**
   * 样本类型（通过查询枚举接口SampleType）
   */
  sampleType?: string;
  /**
   * 检测结果发布开始日期
   */
  issueBeginAt?: string;
  /**
   * 检测结果发布结束日期
   */
  issueEndAt?: string;
}

/**
 * 接口 [样本统计↗](https://yapi.sharing8.cn/project/529/interface/api/33472) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/sample/statistics`
 * @更新时间 `2024-02-26 15:31:14`
 */
export interface GetApiCoreSampleStatisticsResponse {
  currPage?: number;
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
    sampleBatchNo?: string;
    /**
     * 样本类型
     */
    sampleType?: string;
    /**
     * 样本总数
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
     * 检测结果
     */
    testResult?: string;
    /**
     * 发布人
     */
    issuer?: string;
    /**
     * 发布日期
     */
    issueAt?: string;
    /**
     * 合格总数
     */
    qualifiedCount?: number;
    /**
     * 不合格总数
     */
    unqualifiedCount?: number;
    /**
     * 高效价总数
     */
    totalHighTiter?: number;
    /**
     * 低效价总数
     */
    totalLowTiter?: number;
    /**
     * 无效价总数
     */
    totalNoTiter?: number;
    /**
     * 试剂批号
     */
    reagentBatchNo?: string;
  }[];
}

/**
 * 接口 [立体库血浆量查询↗](https://yapi.sharing8.cn/project/529/interface/api/33482) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/blood-volume/statistics`
 * @更新时间 `2024-02-26 20:58:30`
 */
export interface GetApiCoreBatchBloodVolumeStatisticsRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 分页大小
   */
  pageSize: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 血浆类型
   */
  plasmaType?: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
}

/**
 * 接口 [立体库血浆量查询↗](https://yapi.sharing8.cn/project/529/interface/api/33482) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/blood-volume/statistics`
 * @更新时间 `2024-02-26 20:58:30`
 */
export interface GetApiCoreBatchBloodVolumeStatisticsResponse {
  currPage?: number;
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
     * 血浆批号
     */
    batchNo?: string;
    /**
     * 数量
     */
    bagCount?: number;
    /**
     * 重量（g）
     */
    totalWeight?: number;
  }[];
}

/**
 * 接口 [ERP-入库查询↗](https://yapi.sharing8.cn/project/529/interface/api/33487) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/erp/inbound/query`
 * @更新时间 `2024-02-26 16:22:50`
 */
export interface GetApiCoreBatchErpInboundQueryRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 分页大小
   */
  pageSize?: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 验收发布开始日期
   */
  publishBeginAt?: string;
  /**
   * 验收发布结束日期
   */
  publishEndAt?: string;
  /**
   * 来浆开始日期
   */
  acceptBeginAt?: string;
  /**
   * 来浆结束日期
   */
  acceptEndAt?: string;
}

/**
 * 接口 [ERP-入库查询↗](https://yapi.sharing8.cn/project/529/interface/api/33487) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/erp/inbound/query`
 * @更新时间 `2024-02-26 16:22:50`
 */
export interface GetApiCoreBatchErpInboundQueryResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 血浆批号
     */
    batchNo?: string;
    /**
     * 血浆批号（ERP）
     */
    batchNoFromErp?: string;
    /**
     * 采集开始日期
     */
    collectBeginAt?: string;
    /**
     * 采集结束日期
     */
    collectEndAt?: string;
    /**
     * 来浆日期
     */
    acceptAt?: string;
    /**
     * 验收发布日期
     */
    publishAt?: string;
    /**
     * 来浆总数
     */
    bagCount?: number;
    /**
     * 来浆总重量（g）
     */
    totalWeight?: number;
  }[];
}

/**
 * 接口 [ERP-检验报告查询↗](https://yapi.sharing8.cn/project/529/interface/api/33492) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/lab/erp/test-report/query`
 * @更新时间 `2024-02-26 17:27:03`
 */
export interface GetApiCoreLabErpTestReportQueryRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 分页大小
   */
  pageSize: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 血浆复核开始日期
   */
  recheckBeginAt?: string;
  /**
   * 血浆复核结束日期
   */
  recheckEndAt?: string;
}

/**
 * 接口 [ERP-检验报告查询↗](https://yapi.sharing8.cn/project/529/interface/api/33492) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/lab/erp/test-report/query`
 * @更新时间 `2024-02-26 17:27:03`
 */
export interface GetApiCoreLabErpTestReportQueryResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 血浆批号
     */
    batchNo?: string;
    /**
     * 血浆批号（ERP）
     */
    batchNoFromErp?: string;
    /**
     * 血浆复核日期
     */
    recheckAt?: string;
    /**
     * 采集开始日期
     */
    collectBeginAt?: string;
    /**
     * 采集结束日期
     */
    collectEndAt?: string;
    /**
     * 血浆类型（例如：乙免、狂免）
     */
    plasmaType?: string;
    /**
     * 效价类型 （例如：乙免高效价、狂免低效价）
     */
    titerType?: string;
    /**
     * 物料编码
     */
    materialNo?: string;
    /**
     * 血浆合格总数
     */
    totalQualified?: number;
    /**
     * 血浆验收净重（g）
     */
    netWeight?: number;
    /**
     * 不合格血浆总数
     */
    totalUnqualified?: number;
    /**
     * 不合格验收净重（g）
     */
    unqualifiedNetWeight?: number;
  }[];
}

/**
 * 接口 [投产查询↗](https://yapi.sharing8.cn/project/529/interface/api/33497) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/product/inquiry`
 * @更新时间 `2024-02-27 19:44:07`
 */
export interface PostApiProductInquiryRequest {
  /**
   * 制造批号
   */
  mesId?: string;
  /**
   * 计划出库日期开始
   */
  planOutBegin?: string;
  /**
   * 计划出库日期结束
   */
  planOutEnd?: string;
  /**
   * 计划投产日期开始
   */
  planTaskBegin?: string;
  /**
   * 计划投产日期结束
   */
  planTaskEnd?: string;
  /**
   * 投产类型
   */
  orderType?: string;
  /**
   * 血浆编号
   */
  bagNo?: string;
  /**
   * 血浆批号开始
   */
  batchNoBegin?: string;
  /**
   * 血浆批号结束
   */
  batchNoEnd?: string;
  /**
   * 血浆采集日期开始
   */
  collectionAtBegin?: string;
  /**
   * 血浆采集日期结束
   */
  collectionAtEnd?: string;
  pageSize: number;
  currPage: number;
}

/**
 * 接口 [投产查询↗](https://yapi.sharing8.cn/project/529/interface/api/33497) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/product/inquiry`
 * @更新时间 `2024-02-27 19:44:07`
 */
export interface PostApiProductInquiryResponse {
  totalCount: number;
  pageSize: null;
  totalPage: null;
  result?: {
    /**
     * 制造批号
     */
    mesId: string;
    /**
     * 投产类型
     */
    orderType: string;
    /**
     * 计划出库日期
     */
    planOut: string;
    /**
     * 计划投产日期
     */
    planTask: string;
    /**
     * 投产重量 kg
     */
    prodWeight: string;
    /**
     * 记录人
     */
    creator: string;
    /**
     * 记录日期
     */
    createAt: string;
    /**
     * 复核人
     */
    reviewer: string;
    /**
     * 审核人
     */
    checker: string;
    /**
     * 人数
     */
    count: string;
  }[];
  currPage: null;
}

/**
 * 接口 [库存统计↗](https://yapi.sharing8.cn/project/529/interface/api/33502) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/stock/statistics`
 * @更新时间 `2024-02-26 18:03:08`
 */
export interface GetApiCoreBatchStockStatisticsRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 分页大小
   */
  pageSize: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 接收开始日期
   */
  acceptBeginAt?: string;
  /**
   * 接收结束日期
   */
  acceptEndAt?: string;
  /**
   * 验收开始日期
   */
  verifyBeginAt?: string;
  /**
   * 验收结束日期
   */
  verifyEndAt?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 血浆类型（通过查询枚举接口ImmType）
   */
  plasmaType?: string;
  /**
   * 验收发布开始日期
   */
  publishBeginAt?: string;
  /**
   * 验收发布结束日期
   */
  publishEndAt?: string;
  /**
   * 出库开始日期
   */
  deliverBeginAt?: string;
  /**
   * 出库结束日期
   */
  deliverEndAt?: string;
  /**
   * 血浆出库类型（通过查询枚举接口DlvType）
   */
  dlvType?: string;
}

/**
 * 接口 [库存统计↗](https://yapi.sharing8.cn/project/529/interface/api/33502) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/stock/statistics`
 * @更新时间 `2024-02-26 18:03:08`
 */
export interface GetApiCoreBatchStockStatisticsResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {}[];
}

/**
 * 接口 [血浆检测-检测结果汇总↗](https://yapi.sharing8.cn/project/529/interface/api/33547) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/bag/check`
 * @更新时间 `2024-02-28 20:15:05`
 */
export interface PostApiCoreLabBagCheckRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 血浆批号开始
   */
  batchNoBegin?: string;
  /**
   * 血浆批号结束
   */
  batchNoEnd?: string;
  /**
   * 验收发布日期开始
   */
  verificationBegin?: string;
  /**
   * 验收发布日期结束
   */
  verificationEnd?: string;
  /**
   * 接收日期开始
   */
  acceptBegin?: string;
  /**
   * 接收日期结束
   */
  acceptEnd?: string;
  /**
   * 来浆类型
   */
  rawImm?: string;
  /**
   * 血浆类型
   */
  plasmaType?: string;
  /**
   * 效价类型
   */
  titerType?: string;
  /**
   * 检测发布日期开始
   */
  issueBegin?: string;
  /**
   * 检测发布日期结束
   */
  issueEnd?: string;
}

/**
 * 接口 [血浆检测-检测结果汇总↗](https://yapi.sharing8.cn/project/529/interface/api/33547) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/bag/check`
 * @更新时间 `2024-02-28 20:15:05`
 */
export type PostApiCoreLabBagCheckResponse = {
  stationName: string;
  other: string;
  checkUn: {
    project?: string;
    ratio?: string;
    num?: string;
  };
  exterior: {
    num: string;
    project: string;
    ratio: string;
  }[];
  check: {
    num?: string;
    ratio?: string;
  };
  bagCount: string;
  batchCount: string;
  batch: string;
}[];

/**
 * 接口 [血浆检测-效价结果汇总↗](https://yapi.sharing8.cn/project/529/interface/api/33562) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/bag/titer`
 * @更新时间 `2024-02-28 20:14:21`
 */
export interface PostApiCoreLabBagTiterRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 血浆批号开始
   */
  batchNoBegin?: string;
  /**
   * 血浆批号结束
   */
  batchNoEnd?: string;
  /**
   * 验收发布日期开始
   */
  verificationBegin?: string;
  /**
   * 验收发布日期结束
   */
  verificationEnd?: string;
  /**
   * 接收日期开始
   */
  acceptBegin?: string;
  /**
   * 接收日期结束
   */
  acceptEnd?: string;
  /**
   * 来浆类型
   */
  rawImm?: string;
  /**
   * 血浆类型
   */
  plasmaType?: string;
  /**
   * 效价类型
   */
  titerType?: string;
  /**
   * 检测发布日期开始
   */
  issueBegin?: string;
  /**
   * 检测发布日期结束
   */
  issueEnd?: string;
}

/**
 * 接口 [血浆检测-效价结果汇总↗](https://yapi.sharing8.cn/project/529/interface/api/33562) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/bag/titer`
 * @更新时间 `2024-02-28 20:14:21`
 */
export type PostApiCoreLabBagTiterResponse = {
  stationName: string;
  titerCount: string;
  titerTypes: string;
  bagCount: string;
  rawImm: string;
  ratio: string;
}[];

/**
 * 接口 [血浆检测-续追踪不合格汇总↗](https://yapi.sharing8.cn/project/529/interface/api/33567) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/bag/track`
 * @更新时间 `2024-02-28 20:11:08`
 */
export interface PostApiCoreLabBagTrackRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 血浆批号开始
   */
  batchNoBegin?: string;
  /**
   * 血浆批号结束
   */
  batchNoEnd?: string;
  /**
   * 验收发布日期开始
   */
  verificationBegin?: string;
  /**
   * 验收发布日期结束
   */
  verificationEnd?: string;
  /**
   * 接收日期开始
   */
  acceptBegin?: string;
  /**
   * 接收日期结束
   */
  acceptEnd?: string;
  /**
   * 来浆类型
   */
  rawImm?: string;
  /**
   * 血浆类型
   */
  plasmaType?: string;
  /**
   * 效价类型
   */
  titerType?: string;
  /**
   * 检测发布日期开始
   */
  issueBegin?: string;
  /**
   * 检测发布日期结束
   */
  issueEnd?: string;
}

/**
 * 接口 [血浆检测-续追踪不合格汇总↗](https://yapi.sharing8.cn/project/529/interface/api/33567) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/bag/track`
 * @更新时间 `2024-02-28 20:11:08`
 */
export interface PostApiCoreLabBagTrackResponse {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 批号起止
   */
  batch: string;
  /**
   * 血浆数量（袋
   */
  bagCount: string;
  /**
   * 首次续追踪数量
   */
  sTrack: string;
  /**
   * 比率（%）
   */
  sRatio: string;
  /**
   * 反复续追踪数量
   */
  fTrack: string;
  /**
   * 比率（%）
   */
  fRatio: string;
  /**
   * 合计
   */
  count: string;
  /**
   * 比率（%）
   */
  ratio: string;
}

/**
 * 接口 [回访统计↗](https://yapi.sharing8.cn/project/529/interface/api/33587) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/donor/callback/statistic-station`
 * @更新时间 `2024-02-28 16:07:09`
 */
export interface GetApiCoreDonorCallbackStatisticStationRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 回访发布日期起
   */
  pubStartDate?: string;
  /**
   * 回访发布日期止
   */
  pubEndDate?: string;
  /**
   * 回访日期起
   */
  callbackStartDate?: string;
  /**
   * 回访日期止
   */
  callbackEndDate?: string;
  /**
   * 回访样本检测发布日期起
   */
  samplePubStartDate?: string;
  /**
   * 回访样本检测发布日期止
   */
  samplePubEndDate?: string;
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [回访统计↗](https://yapi.sharing8.cn/project/529/interface/api/33587) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/donor/callback/statistic-station`
 * @更新时间 `2024-02-28 16:07:09`
 */
export interface GetApiCoreDonorCallbackStatisticStationResponse {
  stationNo?: string;
  /**
   * 浆站名称
   */
  stationName?: string;
  /**
   * 应回访人次
   */
  totalNum?: number;
  /**
   * 恢复采浆人次
   */
  recoverNum?: number;
  /**
   * 回访样本数
   */
  sampleNum?: number;
  /**
   * 回访失败人次
   */
  failedNum?: number;
  /**
   * 终止回访人次
   */
  endNum?: number;
  /**
   * 回访率
   */
  callbackRate?: string;
  /**
   * 放行血浆数量
   */
  passPlasmaNum?: string;
  /**
   * 可放行血浆数量
   */
  canPassPlasmaNum?: string;
}

/**
 * 接口 [特免血浆查询↗](https://yapi.sharing8.cn/project/529/interface/api/33594) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/bag/titer`
 * @更新时间 `2024-02-28 20:31:55`
 */
export interface PostApiCoreBagTiterRequest {
  /**
   * 采浆公司
   */
  sationNo?: string;
  /**
   * 血浆批号开始
   */
  batchBegin?: string;
  /**
   * 血浆批号结束
   */
  batchEnd?: string;
  /**
   * 验收发布日开始
   */
  verificationBegin?: string;
  /**
   * 验收发布日结束
   */
  verificationEnd?: string;
  /**
   * 采集日期开始
   */
  collectionBegin?: string;
  /**
   * 采集日期结束
   */
  collectionEnd?: string;
  /**
   * 试剂批号
   */
  reagentBatch?: string;
  /**
   * 来浆类型
   */
  rawImm?: string;
  /**
   * 血浆类型
   */
  immunity?: string;
  /**
   * 效价值开始
   */
  titerBegin?: string;
  /**
   * 效价值结束
   */
  titerEnd?: string;
  /**
   * 检测发布日期开始
   */
  issueBegin?: string;
  /**
   * 检测发布日期结束
   */
  issueEnd?: string;
}

/**
 * 接口 [特免血浆查询↗](https://yapi.sharing8.cn/project/529/interface/api/33594) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/bag/titer`
 * @更新时间 `2024-02-28 20:31:55`
 */
export type PostApiCoreBagTiterResponse = {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 采浆量
   */
  weight: string;
  /**
   * 血浆数量（袋）
   */
  bagCount: string;
  /**
   * 血浆类型
   */
  titers: {
    /**
     * 来浆数量
     */
    bagCount: string;
    /**
     * 剂批号
     */
    reagentBatch?: string;
    /**
     * 合计
     */
    count: string;
    /**
     * 高效价
     */
    hTiter: string;
    /**
     * 比率%
     */
    hRatio: string;
    /**
     * 低效价
     */
    lTiter: string;
    /**
     * 比率%
     */
    lRatio: string;
    /**
     * 普通
     */
    nTiter: string;
    /**
     * 比率%
     */
    nRatio: string;
  }[];
}[];

/**
 * 接口 [回访批号查询↗](https://yapi.sharing8.cn/project/529/interface/api/33601) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/sample/callback/statistic`
 * @更新时间 `2024-02-29 09:40:12`
 */
export interface GetApiCoreBatchSampleCallbackStatisticRequest {}

/**
 * 接口 [回访批号查询↗](https://yapi.sharing8.cn/project/529/interface/api/33601) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/sample/callback/statistic`
 * @更新时间 `2024-02-29 09:40:12`
 */
export interface GetApiCoreBatchSampleCallbackStatisticResponse {}

/* prettier-ignore-end */
