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
 * @更新时间 `2024-03-02 17:10:03`
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
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [批号查询-来浆数据↗](https://yapi.sharing8.cn/project/529/interface/api/33367) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/plasma/statistic`
 * @更新时间 `2024-03-02 17:10:03`
 */
export interface GetApiCoreBatchPlasmaStatisticResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    batchNo?: string;
    typeList?: {
      /**
       * 来浆类型
       */
      plasmaType: string;
      /**
       * 血浆编号（起止）
       */
      batchNoRange: string;
      /**
       * 血浆数量
       */
      totalNum: number;
      /**
       * 验收净重
       */
      verifyWeight: number;
      /**
       * 浆站不合格
       */
      lackNos: string;
      /**
       * 验收血浆不合格编号
       */
      verifyUnqNos: string;
    }[];
  }[];
}

/**
 * 接口 [批号查询-检疫期↗](https://yapi.sharing8.cn/project/529/interface/api/33412) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/quarantine/statistic`
 * @更新时间 `2024-03-02 17:08:22`
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
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [批号查询-检疫期↗](https://yapi.sharing8.cn/project/529/interface/api/33412) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/quarantine/statistic`
 * @更新时间 `2024-03-02 17:08:22`
 */
export interface GetApiCoreBatchQuarantineStatisticResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    batchNo?: string;
    typeList?: {
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
 * @更新时间 `2024-02-29 13:52:30`
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
 * @更新时间 `2024-02-29 13:52:30`
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
     * 检测结果发布人
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
 * @更新时间 `2024-03-02 15:54:21`
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
 * @更新时间 `2024-03-02 15:54:21`
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
     * 物料编码
     */
    materialNo?: string;
    /**
     * 效价详情
     */
    titerDetailList?: {
      /**
       * 效价类型
       */
      titerType?: string;
      /**
       * 血浆类型
       */
      plasmaType?: string;
      /**
       * 合格血浆总数
       */
      totalQualified?: number;
      /**
       * 合格血浆验收净重（g）
       */
      qualifiedNetWeight?: number;
      /**
       * 不合格血浆总数
       */
      totalUnqualified?: number;
      /**
       * 不合格血浆验收净重 （g）
       */
      unqualifiedNetWeight?: number;
    }[];
  }[];
}

/**
 * 接口 [投产查询↗](https://yapi.sharing8.cn/project/529/interface/api/33497) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/product/inquiry`
 * @更新时间 `2024-03-13 10:50:20`
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
 * @更新时间 `2024-03-13 10:50:20`
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
    /**
     * 代数
     */
    bagCount: string;
  }[];
  currPage: null;
}

/**
 * 接口 [库存统计↗](https://yapi.sharing8.cn/project/529/interface/api/33502) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/stock/statistics`
 * @更新时间 `2024-02-29 18:07:50`
 */
export interface GetApiCoreBatchStockStatisticsRequest {
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
 * @更新时间 `2024-02-29 18:07:50`
 */
export interface GetApiCoreBatchStockStatisticsResponse {
  /**
   * 入库汇总
   */
  inStockSummary?: {
    /**
     * 采浆公司编号
     */
    stationNo?: string;
    /**
     * 采浆公司
     */
    stationName?: string;
    /**
     * 批次数量
     */
    batchCount?: number;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 验收净重（kg）
     */
    totalVerifyWeight?: number;
  }[];
  /**
   * 出库汇总
   */
  outStockSummary?: {
    /**
     * 采浆公司编号
     */
    stationNo?: string;
    /**
     * 采浆公司
     */
    stationName?: string;
    /**
     * 批次数量
     */
    batchCount?: number;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 验收净重（kg）
     */
    totalVerifyWeight?: number;
  }[];
  /**
   * 满足检疫期未投产
   */
  meetQuarantineUnProduct?: {
    /**
     * 效价类型
     */
    titerType?: string;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 验收净重（kg）
     */
    totalVerifyWeight?: number;
    /**
     * 最早采集日期
     */
    earliestCollectAt?: string;
  }[];
  /**
   * 未满足—首次续追踪
   */
  unMeetQuarantineFirstTrace?: {
    /**
     * 效价类型
     */
    titerType?: string;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 验收净重（kg）
     */
    totalVerifyWeight?: number;
    /**
     * 最早采集日期
     */
    earliestCollectAt?: string;
  }[];
  /**
   * 未满足—反复续追踪
   */
  unMeetQuarantineRepeateTrace?: {
    /**
     * 效价类型
     */
    titerType?: string;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 验收净重（kg）
     */
    totalVerifyWeight?: number;
    /**
     * 最早采集日期
     */
    earliestCollectAt?: string;
  }[];
  /**
   * 待验收汇总
   */
  waitVerifySummary?: {
    /**
     * 采浆公司编号
     */
    stationNo?: string;
    /**
     * 采浆公司
     */
    stationName?: string;
    /**
     * 批次数量
     */
    batchCount?: number;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 验收净重（kg）
     */
    totalVerifyWeight?: number;
  }[];
  /**
   * 待检测汇总
   */
  waitTestSummary?: {
    /**
     * 采浆公司编号
     */
    stationNo?: string;
    /**
     * 采浆公司
     */
    stationName?: string;
    /**
     * 批次数量
     */
    batchCount?: number;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 验收净重（kg）
     */
    totalVerifyWeight?: number;
  }[];
  /**
   * 检查合格汇总
   */
  testQualifiedSummary?: {
    /**
     * 采浆公司编号
     */
    stationNo?: string;
    /**
     * 采浆公司
     */
    stationName?: string;
    /**
     * 批次数量
     */
    batchCount?: number;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 验收净重（kg）
     */
    totalVerifyWeight?: number;
  }[];
  /**
   * 检测不合格汇总
   */
  testUnqualifiedSummary?: {
    /**
     * 采浆公司编号
     */
    stationNo?: string;
    /**
     * 采浆公司
     */
    stationName?: string;
    /**
     * 批次数量
     */
    batchCount?: number;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 验收净重（kg）
     */
    totalVerifyWeight?: number;
  }[];
}

/**
 * 接口 [血浆检测-检测结果汇总↗](https://yapi.sharing8.cn/project/529/interface/api/33547) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/bag/check`
 * @更新时间 `2024-02-29 20:39:17`
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
 * @更新时间 `2024-02-29 20:39:17`
 */
export type PostApiCoreLabBagCheckResponse = {
  stationName: string;
  other: string;
  checkUn: {};
  exterior: {};
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
 * @更新时间 `2024-02-29 14:40:18`
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
 * @更新时间 `2024-02-29 14:40:18`
 */
export interface GetApiCoreDonorCallbackStatisticStationResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    stationNo?: string;
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
  }[];
}

/**
 * 接口 [特免血浆查询↗](https://yapi.sharing8.cn/project/529/interface/api/33594) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/bag/titer`
 * @更新时间 `2024-03-02 11:17:35`
 */
export interface PostApiCoreBagTiterRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
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
 * @更新时间 `2024-03-02 11:17:35`
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
    /**
     * 来浆类型
     */
    rawImm: string;
  }[];
}[];

/**
 * 接口 [回访批号查询↗](https://yapi.sharing8.cn/project/529/interface/api/33601) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/sample/callback/statistic`
 * @更新时间 `2024-03-02 11:17:46`
 */
export interface GetApiCoreBatchSampleCallbackStatisticRequest {
  /**
   * 采浆公司编号
   */
  stationNo?: string;
  /**
   * 样本接收日期起
   */
  sampleReceiveStartDate?: string;
  /**
   * 样本接收日期止
   */
  sampleReceiveEndDate?: string;
  /**
   * 样本批号
   */
  sampleBatchNo?: string;
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [回访批号查询↗](https://yapi.sharing8.cn/project/529/interface/api/33601) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/sample/callback/statistic`
 * @更新时间 `2024-03-02 11:17:46`
 */
export interface GetApiCoreBatchSampleCallbackStatisticResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    /**
     * 浆站编号
     */
    stationNo: string;
    /**
     * 浆站名称
     */
    stationName: string;
    /**
     * 样本批号
     */
    sampleBatchNo: string;
    /**
     * 回访样本数量
     */
    sampleNum: number;
    /**
     * 检测结果审核人
     */
    reviewer?: string;
    /**
     * 接收日期
     */
    receiveDate: string;
    /**
     * 采集日期起止
     */
    collectDateString: string;
    /**
     * 检测结果发布人
     */
    issueBy?: string;
    /**
     * 检测结果发布日期
     */
    issueDate?: string;
  }[];
}

/**
 * 接口 [批号统计↗](https://yapi.sharing8.cn/project/529/interface/api/33643) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/statistic`
 * @更新时间 `2024-02-29 18:22:14`
 */
export interface GetApiCoreBatchStatisticRequest {
  pageSize: string;
  currPage: string;
  /**
   * 接收日期起
   */
  acceptStartDate?: string;
  /**
   * 接收日期止
   */
  acceptEndDate?: string;
  /**
   * 参考样本批次号
   */
  sampleBatchNo?: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 血浆批号
   */
  bagBatchNo?: string;
}

/**
 * 接口 [批号统计↗](https://yapi.sharing8.cn/project/529/interface/api/33643) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/statistic`
 * @更新时间 `2024-02-29 18:22:14`
 */
export interface GetApiCoreBatchStatisticResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    stationNo: string;
    /**
     * 采浆公司
     */
    stationName: string;
    /**
     * 血浆批号
     */
    batchNo: string;
    /**
     * 采集开始日期
     */
    collStartDate: string;
    /**
     * 采集结束日期
     */
    collEndDate: string;
    /**
     * 接收日期
     */
    acceptDate?: string;
    /**
     * 验收发布人
     */
    verifyPubBy?: string;
    /**
     * 验收发布日期
     */
    verifyPubDate?: string;
    /**
     * 验收数量袋
     */
    verifyNum?: number;
    /**
     * 验收验收净重（kg）
     */
    verifyWeight?: number;
    /**
     * 结果发布人
     */
    issueBy?: string;
    /**
     * 结果发布日期
     */
    issueDate?: string;
    /**
     * 合格数量袋
     */
    passNum?: number;
    /**
     * 不合格数量袋
     */
    noPassNum?: number;
    /**
     * 参考样本批号
     */
    referBatchNo?: string;
    /**
     * 样本检测发布人
     */
    samplePubBy?: string;
    /**
     * 样本检测发布日期
     */
    samplePubDate?: string;
  }[];
}

/**
 * 接口 [特免血浆统计↗](https://yapi.sharing8.cn/project/529/interface/api/33650) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/bag/titer/count`
 * @更新时间 `2024-03-02 11:18:23`
 */
export interface PostApiCoreBagTiterCountRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 采集日期开始
   */
  collectionBegin?: string;
  /**
   * 采集日期结束
   */
  collectionEnd?: string;
  /**
   * 来浆类型
   */
  rawImm?: string;
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
 * 接口 [特免血浆统计↗](https://yapi.sharing8.cn/project/529/interface/api/33650) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/bag/titer/count`
 * @更新时间 `2024-03-02 11:18:23`
 */
export type PostApiCoreBagTiterCountResponse = {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 血浆数量（袋）
   */
  bagCount: string;
  /**
   * 来浆类型
   */
  rawImm: string;
  /**
   * 详情
   */
  details: {
    /**
     * 数量
     */
    bagCount: string;
    /**
     * 比率%
     */
    ratio: string;
    /**
     * 检测合格数量  （袋）
     */
    checkPassCount: string;
    /**
     * 检测合格验收净重（kg）
     */
    checkPassWeight: string;
    /**
     * 检疫期合格数量（袋）
     */
    passCount: string;
    /**
     * 检疫期合格验收净重（kg）
     */
    passWeight: string;
    /**
     * 效价级别
     */
    level: string;
  }[];
}[];

/**
 * 接口 [不合格血浆按浆站统计↗](https://yapi.sharing8.cn/project/529/interface/api/33657) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/unqualified/statistic-station`
 * @更新时间 `2024-03-01 15:42:25`
 */
export interface GetApiCoreBagUnqualifiedStatisticStationRequest {
  pageSize: string;
  currPage: string;
  stationNo?: string;
  verifyPubStartDate?: string;
  verifyPubEndDate?: string;
  inStoreStartDate?: string;
  inStoreEndDate?: string;
  issueStartDate?: string;
  issueEndDate?: string;
  unqInStoreStartDate?: string;
  unqInStoreEndDate?: string;
}

/**
 * 接口 [不合格血浆按浆站统计↗](https://yapi.sharing8.cn/project/529/interface/api/33657) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/unqualified/statistic-station`
 * @更新时间 `2024-03-01 15:42:25`
 */
export interface GetApiCoreBagUnqualifiedStatisticStationResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    stationNo: string;
    /**
     * 采浆公司
     */
    stationName: string;
    /**
     * 入库数量（袋）
     */
    inNum: number;
    /**
     * 验收数量（袋）
     */
    verifyNum: number;
    /**
     * 验收合格数量（袋）
     */
    verifyPassNum?: number;
    /**
     * 验收不合格
     */
    verifyUnqNum?: number;
    /**
     * 检测不合格
     */
    testUnqNum?: number;
    /**
     * 检疫期不合格
     */
    quarantineUnqNum?: number;
    /**
     * 续追踪不合格
     */
    trackUnqNum?: number;
    /**
     * 其他不合格
     */
    otherUnqNum?: number;
  }[];
}

/**
 * 接口 [样本检测↗](https://yapi.sharing8.cn/project/529/interface/api/33671) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/sample/detail`
 * @更新时间 `2024-03-02 11:18:58`
 */
export interface PostApiCoreLabSampleDetailRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 采集日期开始
   */
  collectionBegin?: string;
  /**
   * 采集日期结束
   */
  collectionEnd?: string;
  /**
   * 样本类型
   */
  sampleType?: string;
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
 * 接口 [样本检测↗](https://yapi.sharing8.cn/project/529/interface/api/33671) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/sample/detail`
 * @更新时间 `2024-03-02 11:18:58`
 */
export type PostApiCoreLabSampleDetailResponse = {
  /**
   * 采浆公司
   */
  stationName: string;
  /**
   * 样本类型
   */
  sampleType: string;
  /**
   * 样本总数
   */
  sampleCount: string;
  /**
   * 已接收未检测
   */
  acceptCount: string;
  /**
   * 检测样本
   */
  checkCount: string;
  /**
   * 检测中
   */
  checkingCount: string;
  /**
   * 检测合格
   */
  check: {
    /**
     * 合计
     */
    count: string;
    /**
     * 比率%
     */
    ratio: string;
  };
  /**
   * 检测不合格分项目列出
   */
  failed: string[];
  /**
   * 验收不合格
   */
  verification: {
    /**
     * 血浆验收不合格
     */
    bag: string;
    /**
     * 样本验收不合格
     */
    sample: string;
    /**
     * 献血浆者符合性
     */
    donor: string;
    /**
     * 合计
     */
    count: string;
    /**
     * 比率%
     */
    ratio: string;
  };
  /**
   * 其他不合格
   */
  other: string;
}[];

/**
 * 接口 [浆站箱号查询↗](https://yapi.sharing8.cn/project/529/interface/api/33685) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/station/box`
 * @更新时间 `2024-03-02 10:44:51`
 */
export interface GetApiCoreBatchStationBoxRequest {
  /**
   * 浆站编号
   */
  stationNo: string;
  /**
   * 开始批号
   */
  batchStartNo?: string;
  /**
   * 结束批号
   */
  batchEndNo: string;
  /**
   * 箱号
   */
  boxNo: string;
  /**
   * 来浆类型
   */
  rawImm?: string;
  /**
   * 血浆类型
   */
  immunity?: string;
  /**
   * 效价类型
   */
  immTypeLevel: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [浆站箱号查询↗](https://yapi.sharing8.cn/project/529/interface/api/33685) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/batch/station/box`
 * @更新时间 `2024-03-02 10:44:51`
 */
export interface GetApiCoreBatchStationBoxResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
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
     * 来浆类型
     */
    rawImm: string;
    /**
     * 最小血浆编号
     */
    minBagNo: string;
    /**
     * 最大血浆编号
     */
    maxBagNo: string;
    /**
     * 血浆数量
     */
    bagCount: number;
  }[];
}

/**
 * 接口 [投产准备号查询↗](https://yapi.sharing8.cn/project/529/interface/api/33692) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/product/prepare/out-store/list`
 * @更新时间 `2024-03-01 17:21:17`
 */
export interface GetApiProductPrepareOutStoreListRequest {
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 血浆编号
   */
  bagNo?: string;
  /**
   * 效价类型
   */
  immType: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [投产准备号查询↗](https://yapi.sharing8.cn/project/529/interface/api/33692) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/product/prepare/out-store/list`
 * @更新时间 `2024-03-01 17:21:17`
 */
export interface GetApiProductPrepareOutStoreListResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    /**
     * 采浆公司名称
     */
    prepareNo: string;
    /**
     * 投产血浆数量
     */
    prodBagCount: number;
    /**
     * 总净重（kg）
     */
    netWeight: number;
    /**
     * 投产类型
     */
    prodType: string;
    /**
     * 已出库 血浆数量
     */
    outBagCount: number;
    /**
     * 已出库 总净重（kg）
     */
    outNetWeight: number;
    /**
     * 出库日期
     */
    outAt: number;
    /**
     * 未出库 血浆数量
     */
    unOutBagCount: string;
    /**
     * 未出库 总净重（kg）
     */
    unOutNetWeight: string;
  }[];
}

/**
 * 接口 [不合格血浆按批次统计↗](https://yapi.sharing8.cn/project/529/interface/api/33699) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/unqualified/statistic-batch`
 * @更新时间 `2024-03-01 18:01:03`
 */
export interface GetApiCoreBagUnqualifiedStatisticBatchRequest {
  pageSize: string;
  currPage: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 验收发布日期起止
   */
  verifyPubStartDate?: string;
  verifyPubEndDate?: string;
  /**
   * 入库日期起止
   */
  inStoreStartDate?: string;
  inStoreEndDate?: string;
  /**
   * 检测发布日期起止
   */
  issueStartDate?: string;
  issueEndDate?: string;
  /**
   * 不合格入库日期起止
   */
  unqInStoreStartDate?: string;
  unqInStoreEndDate?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
}

/**
 * 接口 [不合格血浆按批次统计↗](https://yapi.sharing8.cn/project/529/interface/api/33699) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/unqualified/statistic-batch`
 * @更新时间 `2024-03-01 18:01:03`
 */
export interface GetApiCoreBagUnqualifiedStatisticBatchResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    stationNo: string;
    /**
     * 采浆公司
     */
    stationName: string;
    /**
     * 批次号
     */
    batchNo: string;
    /**
     * 入库日期
     */
    inStoreDate?: string;
    /**
     * 入库数量（袋）
     */
    inStoreNum: number;
    /**
     * 验收数量（袋）
     */
    verifyNum: number;
    /**
     * 验收合格数量（袋）
     */
    verifyPassNum?: number;
    /**
     * 验收不合格
     */
    verifyUnqNum?: number;
    /**
     * 检测不合格
     */
    testUnqNum?: number;
    /**
     * 检疫期不合格
     */
    quarantineUnqNum?: number;
    /**
     * 续追踪不合格
     */
    trackUnqNum?: number;
    /**
     * 其他不合格
     */
    otherUnqNum?: number;
    /**
     * 合计
     */
    totalNum: string;
    /**
     * 不合格率
     */
    unqRate: string;
  }[];
}

/**
 * 接口 [浆员状态查询↗](https://yapi.sharing8.cn/project/529/interface/api/33706) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/donor/state`
 * @更新时间 `2024-03-04 16:04:04`
 */
export interface PostApiCoreDonorStateRequest {
  /**
   * 采浆公司
   */
  stationNo: string;
  /**
   * 血浆批号
   */
  batch: string;
  /**
   * 采集日期开始
   */
  collectBegin: string;
  /**
   * 采集日期结束
   */
  collectEnd: string;
  /**
   * 血浆类型
   */
  immunity: string;
  /**
   * 淘汰原 因
   */
  cause: string;
  /**
   * 效价结果开始
   */
  titerBenign: string;
  /**
   * 效价结果结束
   */
  titerEnd: string;
  /**
   * 浆员状态
   */
  state: string;
  /**
   * 淘汰系统
   */
  blockBy: string;
  /**
   * 检测发布日期开始
   */
  checkBegin: string;
  /**
   * 检测发布日期结束
   */
  checkEnd: string;
  /**
   * 回访状态
   */
  callback: string;
  /**
   * 不合格依据日期开始
   */
  listenBegin: string;
  /**
   * 不合格依据日期结束
   */
  listenEnd: string;
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [浆员状态查询↗](https://yapi.sharing8.cn/project/529/interface/api/33706) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/donor/state`
 * @更新时间 `2024-03-04 16:04:04`
 */
export interface PostApiCoreDonorStateResponse {
  currPage: number;
  pageSize: number;
  totalCount: number;
  result?: {
    stationName?: string;
    netWeight?: string;
    /**
     * 无检疫期后续的血浆数量
     */
    ambiguityBagCount?: string;
    bloodType?: string;
    name?: string;
    donorNo?: string;
    /**
     * 最早  采集日期
     */
    earlier?: string;
    /**
     * 血浆总袋数
     */
    bagCount?: string;
    idcardAddress?: string;
    /**
     * 最晚采集日期
     */
    late?: string;
    /**
     * 淘汰系统
     */
    blockBy?: string;
    /**
     * 淘汰原因
     */
    cause?: string;
    /**
     * 不合格依据日期
     */
    listen?: string;
  }[];
}

/**
 * 接口 [厂家检测不合格查询↗](https://yapi.sharing8.cn/project/529/interface/api/33713) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/item/query`
 * @更新时间 `2024-03-05 17:42:43`
 */
export interface PostApiCoreLabItemQueryRequest {
  pageSize: string;
  currPage: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 采集日期
   */
  collectionBegin?: string;
  collectionEnd?: string;
  /**
   * 验收发布日期
   */
  releaseBegin?: string;
  releaseEnd?: string;
  /**
   * 检测发布日期
   */
  issueBegin?: string;
  issueEnd?: string;
}

/**
 * 接口 [厂家检测不合格查询↗](https://yapi.sharing8.cn/project/529/interface/api/33713) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/item/query`
 * @更新时间 `2024-03-05 17:42:43`
 */
export interface PostApiCoreLabItemQueryResponse {
  currPage: number;
  pageSize: number;
  totalCount: number;
  result?: {
    /**
     * 采浆公司
     */
    stationName: string;
    /**
     * 血浆批号
     */
    batchNo: string;
    /**
     * 报告发布日期
     */
    issueAt: string;
    /**
     * 样本编号
     */
    sampleNo: string;
    /**
     * 献血浆者编号
     */
    donorNo: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * 采集日期
     */
    collectionAt: string;
    /**
     * 不合格原因
     */
    cause: string;
    /**
     * 已销毁血浆批号
     */
    destroyedBatchNo: string;
    /**
     * 已销毁血浆编号
     */
    destroyedBagNo: string;
    /**
     * 献血浆者永久拒绝日期
     */
    rejectAt: string;
  }[];
}

/**
 * 接口 [不合格追踪↗](https://yapi.sharing8.cn/project/529/interface/api/33783) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/donor/unqualified/track`
 * @更新时间 `2024-03-07 10:31:36`
 */
export interface GetApiCoreDonorUnqualifiedTrackRequest {
  currPage: string;
  pageSize: string;
  /**
   * 浆站编码
   */
  stationNo?: string;
  /**
   * 样本批次号
   */
  sampleBatchNo?: string;
  /**
   * 样本编码
   */
  sampleNo?: string;
  /**
   * 采集日期开始
   */
  collectStartDate?: string;
  collectEndDate?: string;
  /**
   * 不合格来源(浆站报送/厂家检测)
   */
  blockBy: string;
  /**
   * 不合格原因(需追溯检疫期的项目相关)
   */
  failedCode: string;
  /**
   * 不合格日期查询
   */
  blockStartDate: string;
  blockEndDate: string;
}

/**
 * 接口 [不合格追踪↗](https://yapi.sharing8.cn/project/529/interface/api/33783) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/donor/unqualified/track`
 * @更新时间 `2024-03-07 10:31:36`
 */
export interface GetApiCoreDonorUnqualifiedTrackResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    /**
     * 采浆公司
     */
    stationName?: null;
    stationNo?: string;
    /**
     * 样本批号
     */
    sampleBatchNo?: null;
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
     * 姓名
     */
    donorName?: string;
    failedCode?: string;
    /**
     * 不合格原因
     */
    failedReason?: null;
    /**
     * 不合格日期
     */
    blockAt?: string;
    /**
     * 不合格来源
     */
    blockBy?: string;
  }[];
}

/**
 * 接口 [血浆汇总↗](https://yapi.sharing8.cn/project/529/interface/api/33804) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/report/plasma/summary`
 * @更新时间 `2024-03-08 16:40:50`
 */
export interface GetApiReportPlasmaSummaryRequest {
  currPage: string;
  pageSize: string;
  /**
   * 浆站编码
   */
  stationNo?: string;
  /**
   * 批次号
   */
  batchNo?: string;
  /**
   * 状态
   */
  printState?: string;
  /**
   * 打印开始时间
   */
  printAtBegin?: string;
  /**
   * 打印结束时间
   */
  printAtEnd?: string;
}

/**
 * 接口 [血浆汇总↗](https://yapi.sharing8.cn/project/529/interface/api/33804) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/report/plasma/summary`
 * @更新时间 `2024-03-08 16:40:50`
 */
export interface GetApiReportPlasmaSummaryResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    /**
     * 采浆公司
     */
    stationName?: null;
    /**
     * 批号
     */
    batchNo?: string;
    /**
     * 血浆总数
     */
    bagCount?: number;
    /**
     * 生产出库数量
     */
    ''?: number;
    /**
     * 非生产出库数量
     */
    unProOutCount?: number;
    /**
     * 不合格数量
     */
    unqualifiedCount?: number;
    /**
     * 状态
     */
    printState?: boolean;
    /**
     * 打印人
     */
    printor?: string;
    /**
     * 打印时间
     */
    printAt?: null;
  }[];
}

/**
 * 接口 [检测结果查询-检验样本查询↗](https://yapi.sharing8.cn/project/529/interface/api/33811) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/samples/lab/item`
 * @更新时间 `2024-03-08 18:20:13`
 */
export interface PostApiCoreLabSamplesLabItemRequest {
  pageSize: string;
  currPage: string;
  /**
   * 样本采集日期
   */
  batchNo: string;
  /**
   * 样本类型
   */
  sampleType: string;
  conclusion?: string;
}

/**
 * 接口 [检测结果查询-检验样本查询↗](https://yapi.sharing8.cn/project/529/interface/api/33811) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/samples/lab/item`
 * @更新时间 `2024-03-08 18:20:13`
 */
export interface PostApiCoreLabSamplesLabItemResponse {
  totalCount: number;
  pageSize: null;
  totalPage: null;
  currPage: null;
  result: {
    /**
     * 样本编号
     */
    sampleNo: string;
    /**
     * 检测项目
     */
    project: string;
    /**
     * 不合格
     */
    unqualified: string;
    /**
     * od
     */
    od: string;
    /**
     * cutoff
     */
    cutoff: string;
    /**
     * ct
     */
    ct: string;
    titerValue: string;
    /**
     * 检测结果
     */
    conclusion: string;
    /**
     * 检测日期
     */
    checkAt: string;
  }[];
}

/**
 * 接口 [血浆检测-检测结果汇总-不合格详情↗](https://yapi.sharing8.cn/project/529/interface/api/33818) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/bag/check/details`
 * @更新时间 `2024-03-09 14:40:25`
 */
export interface PostApiCoreLabBagCheckDetailsRequest {
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
  failedCode: string;
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [血浆检测-检测结果汇总-不合格详情↗](https://yapi.sharing8.cn/project/529/interface/api/33818) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/lab/bag/check/details`
 * @更新时间 `2024-03-09 14:40:25`
 */
export interface PostApiCoreLabBagCheckDetailsResponse {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  result?: {
    bagNo?: string;
    station?: string;
    donorNo?: string;
    name?: string;
    batchNo?: string;
    collectionAt?: string;
  }[];
}

/**
 * 接口 [特免血浆查询-详情↗](https://yapi.sharing8.cn/project/529/interface/api/33825) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/bag/titer/details`
 * @更新时间 `2024-03-09 15:40:21`
 */
export interface PostApiCoreBagTiterDetailsRequest {
  /**
   * 采浆公司
   */
  stationNo: string;
  /**
   * 血浆批号开始
   */
  batchNo: string;
  /**
   * 来浆类型
   */
  rawImm: string;
  /**
   * 效价级别
   */
  titerLevel: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [特免血浆查询-详情↗](https://yapi.sharing8.cn/project/529/interface/api/33825) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `POST /api/core/bag/titer/details`
 * @更新时间 `2024-03-09 15:40:21`
 */
export interface PostApiCoreBagTiterDetailsResponse {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  result?: {
    donorNo: string;
    name: string;
    bagNo: string;
    titerValue: string;
    collectionAt: string;
  }[];
}

/**
 * 接口 [续追踪不和格统计↗](https://yapi.sharing8.cn/project/529/interface/api/33860) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/unqualified/statistic-track-renewal`
 * @更新时间 `2024-03-12 14:07:34`
 */
export interface GetApiCoreBagUnqualifiedStatisticTrackRenewalRequest {
  /**
   * 浆站编码
   */
  stationNo: string;
  /**
   * 采浆开始日期
   */
  collectStartDate: string;
  /**
   * 采浆结束日期
   */
  collectEndDate: string;
  /**
   * 检测发布时间
   */
  verifyPubStartDate: string;
  /**
   * 检测发表结束时间
   */
  verifyPubEndDate: string;
}

/**
 * 接口 [续追踪不和格统计↗](https://yapi.sharing8.cn/project/529/interface/api/33860) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/unqualified/statistic-track-renewal`
 * @更新时间 `2024-03-12 14:07:34`
 */
export type GetApiCoreBagUnqualifiedStatisticTrackRenewalResponse = {
  /**
   * 年份
   */
  year?: string;
  trackNum?: number;
  backTrackUnq?: {
    num?: number;
    ratio?: number;
    projects?: {
      '110001401'?: number;
      '110001402'?: number;
      '110001403'?: number;
      '110001404'?: number;
      '110001405'?: number;
      '110001406'?: number;
    };
  };
  followTrackNumUnq?: {
    num?: number;
    ratio?: number;
    projects?: {
      '110001401'?: number;
      '110001402'?: number;
      '110001403'?: number;
      '110001404'?: number;
      '110001405'?: number;
      '110001406'?: number;
    };
  };
  otherNumUnq?: {
    num?: number;
    ratio?: number;
  };
}[];

/**
 * 接口 [检疫期不合格统计↗](https://yapi.sharing8.cn/project/529/interface/api/33867) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/unqualified/statistic-quarantine`
 * @更新时间 `2024-03-12 14:57:32`
 */
export interface GetApiCoreBagUnqualifiedStatisticQuarantineRequest {
  stationNo: string;
  /**
   * 采集起止日期
   */
  collectStartDate: string;
  /**
   * 采集起止日期
   */
  collectEndDate: string;
  /**
   * 检测发布起止日期
   */
  verifyPubStartDate: string;
  /**
   * 检测发布起止日期
   */
  verifyPubEndDate: string;
  /**
   * 不合格来源
   */
  blockBy: string;
  /**
   * 不合格日期起
   */
  blockStartDate: string;
  /**
   * 不合格日期止
   */
  blockEndDate: string;
}

/**
 * 接口 [检疫期不合格统计↗](https://yapi.sharing8.cn/project/529/interface/api/33867) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/unqualified/statistic-quarantine`
 * @更新时间 `2024-03-12 14:57:32`
 */
export type GetApiCoreBagUnqualifiedStatisticQuarantineResponse = {
  stationNo?: string;
  stationName?: string;
  bagNum?: number;
  /**
   * 检测不合格
   */
  checkUnq?: {
    num?: number;
    ratio?: number;
    projects?: {
      '110001201'?: number;
      '110001202'?: number;
      '110001203'?: number;
      '110001204'?: number;
      '110001205'?: number;
      '110001206'?: number;
      '110001207'?: number;
    };
  };
  /**
   * 检疫期不合格
   */
  quarantineUnq?: {
    num?: number;
    ratio?: number;
    projects?: {
      '110001301'?: number;
      '110001302'?: number;
      '110001303'?: number;
      '110001304'?: number;
      '110001305'?: number;
      '110001306'?: number;
      '110001307'?: number;
    };
  };
  /**
   * 、续追踪不合格
   */
  trackUnq?: {
    num?: number;
    ratio?: number;
  };
}[];

/**
 * 接口 [续追踪不合格统计血浆明细↗](https://yapi.sharing8.cn/project/529/interface/api/33874) 的 **请求类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/unqualified/statistic-track-renewal/detail`
 * @更新时间 `2024-03-13 10:55:19`
 */
export interface GetApiCoreBagUnqualifiedStatisticTrackRenewalDetailRequest {
  currPage: string;
  pageSize: string;
  /**
   * '110001401', '110001', '续追踪不合格HBV-DNA'
   * '110001402', '110001', '续追踪不合格HBsAg'
   * '110001403', '110001', '续追踪不合格HCV-RNA'
   * '110001404', '110001', '续追踪不合格HCV抗体'
   * '110001405', '110001', '续追踪不合格HIV-1/HIV-2抗体'
   * '110001406', '110001', '续追踪不合格HIV-RNA'
   * '110001407', '续追踪不合格超一年'
   */
  failedCode: string;
  /**
   * 查询明细类型：回访不合格追踪 ：BACK
   * 后续供浆检测不合格 ：FOLLOW
   * 其他：OTHER  （failedCode 传 ：110001407）
   */
  trackType: string;
  stationNo?: string;
  collectStartDate?: string;
  collectEndDate?: string;
  verifyPubStartDate?: string;
  verifyPubEndDate?: string;
  /**
   * 年份
   */
  year: string;
}

/**
 * 接口 [续追踪不合格统计血浆明细↗](https://yapi.sharing8.cn/project/529/interface/api/33874) 的 **返回类型**
 *
 * @分类 [查询统计↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5694)
 * @请求头 `GET /api/core/bag/unqualified/statistic-track-renewal/detail`
 * @更新时间 `2024-03-13 10:55:19`
 */
export interface GetApiCoreBagUnqualifiedStatisticTrackRenewalDetailResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    bagNo?: string;
    batchNo?: string;
    donorNo?: string;
    name?: string;
    collectAt?: string;
  }[];
}

/* prettier-ignore-end */
