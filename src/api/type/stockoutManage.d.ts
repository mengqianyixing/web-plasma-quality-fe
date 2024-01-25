/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询投产准备列表↗](https://yapi.sharing8.cn/project/529/interface/api/32184) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/list`
 * @更新时间 `2024-01-15 13:46:30`
 */
export interface GetApiProductPrepareListRequest {
  /**
   * 投产准备号
   */
  prepareNo?: string;
  prodType?: string;
  /**
   * RUN-准备中  REV-待复核  TPK-待分拣  RPK-分拣中  CPK-已分拣  OUT-已出库
   */
  prepareState?: string;
  /**
   * TPR-待投产  CPR-投产
   */
  pickMode?: string;
  /**
   * 1、ALL-限制  2、NO-不限制  3、血浆限制单号
   */
  bagFlag?: string;
  /**
   * 分拣完成日期(开始时间)
   */
  pickBegin?: string;
  /**
   * 分拣完成日期(结束时间)
   */
  pickEnd: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [查询投产准备列表↗](https://yapi.sharing8.cn/project/529/interface/api/32184) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/list`
 * @更新时间 `2024-01-15 13:46:30`
 */
export interface GetApiProductPrepareListResponse {
  /**
   * 分页大小
   */
  pageSize: number;
  /**
   * 当前页
   */
  currPage: number;
  /**
   * 总数
   */
  totalCount: number;
  /**
   * 总页数
   */
  totalPage: number;
  /**
   * 列表
   */
  result: {
    /**
     * 投产准备号
     */
    prepareNo: string;
    /**
     * 1、ALL-限制  2、NO-不限制  3、血浆限制单号
     */
    bagFlag: string;
    summary: {
      /**
       * 批次数量
       */
      batchCount: number;
      /**
       * 分拣血浆数量
       */
      pickBagCount: number;
      /**
       * 投产血浆数量
       */
      prodBagCount: number;
      /**
       * 总净重（kg）
       */
      netWeight: number;
      /**
       * 浆员数量
       */
      donorCount: number;
      /**
       * 最小采集日期
       */
      minCollectAt: string;
      /**
       * 最大采集日期
       */
      maxCollectAt: string;
      /**
       * 平均效价值
       */
      avgTiter: number;
      /**
       * 高效价数量
       */
      tallTiterCount: string;
      /**
       * 低效价数量
       */
      lowTiterCount: string;
      /**
       * 普通数量
       */
      ordinaryCount: string;
    };
    /**
     * 投产准备状态
     */
    prepareState: string;
    /**
     * 投产类型
     */
    prodType: string;
    /**
     * 挑浆模式
     */
    pickMode: string;
    /**
     * 创建人
     */
    creator: string;
    /**
     * 复核人
     */
    reviewer: string;
    /**
     * 创建时间
     */
    reviewerAt: string;
    /**
     * 复核时间
     */
    createAt: string;
  }[];
}

/**
 * 接口 [新建投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/32187) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/save`
 * @更新时间 `2024-01-22 16:22:23`
 */
export interface PostApiProductPrepareSaveRequest {
  /**
   * 投产类型
   */
  prodType: string;
  /**
   * 限制血浆
   */
  fkBfNo: string;
  /**
   * 挑浆模式
   */
  pickMode: string;
}

/**
 * 接口 [新建投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/32187) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/save`
 * @更新时间 `2024-01-22 16:22:23`
 */
export interface PostApiProductPrepareSaveResponse {}

/**
 * 接口 [修改投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/32190) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/update`
 * @更新时间 `2024-01-09 17:09:41`
 */
export interface PostApiProductPrepareUpdateRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
  /**
   * 投产类型
   */
  prodType: string;
  /**
   * 限制血浆
   */
  fkBfNo: string;
  /**
   * 挑浆模式
   */
  pickMode: string;
}

/**
 * 接口 [修改投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/32190) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/update`
 * @更新时间 `2024-01-09 17:09:41`
 */
export interface PostApiProductPrepareUpdateResponse {}

/**
 * 接口 [撤销未挑选准备↗](https://yapi.sharing8.cn/project/529/interface/api/32193) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/revoke-unpick`
 * @更新时间 `2024-01-09 17:16:01`
 */
export interface PostApiProductPrepareRevokeUnpickRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
  /**
   * 备注
   */
  remark: string;
}

/**
 * 接口 [撤销未挑选准备↗](https://yapi.sharing8.cn/project/529/interface/api/32193) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/revoke-unpick`
 * @更新时间 `2024-01-09 17:16:01`
 */
export interface PostApiProductPrepareRevokeUnpickResponse {}

/**
 * 接口 [撤销已挑选准备↗](https://yapi.sharing8.cn/project/529/interface/api/32196) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/revoke-pick`
 * @更新时间 `2024-01-09 17:15:50`
 */
export interface PostApiProductPrepareRevokePickRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
  /**
   * 备注
   */
  remark: string;
}

/**
 * 接口 [撤销已挑选准备↗](https://yapi.sharing8.cn/project/529/interface/api/32196) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/revoke-pick`
 * @更新时间 `2024-01-09 17:15:50`
 */
export interface PostApiProductPrepareRevokePickResponse {}

/**
 * 接口 [完成准备↗](https://yapi.sharing8.cn/project/529/interface/api/32199) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/commit`
 * @更新时间 `2024-01-18 14:47:48`
 */
export interface PostApiProductPrepareCommitRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
}

/**
 * 接口 [完成准备↗](https://yapi.sharing8.cn/project/529/interface/api/32199) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/commit`
 * @更新时间 `2024-01-18 14:47:48`
 */
export interface PostApiProductPrepareCommitResponse {}

/**
 * 接口 [投产准备复核↗](https://yapi.sharing8.cn/project/529/interface/api/32202) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/check`
 * @更新时间 `2024-01-09 18:22:09`
 */
export interface PostApiProductPrepareCheckRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
  /**
   * 复核人
   */
  checker: string;
  /**
   * 备注
   */
  remark: string;
}

/**
 * 接口 [投产准备复核↗](https://yapi.sharing8.cn/project/529/interface/api/32202) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/check`
 * @更新时间 `2024-01-09 18:22:09`
 */
export interface PostApiProductPrepareCheckResponse {}

/**
 * 接口 [投产准备撤销复核↗](https://yapi.sharing8.cn/project/529/interface/api/32205) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/revoke-check`
 * @更新时间 `2024-01-09 18:23:12`
 */
export interface PostApiProductPrepareRevokeCheckRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
  /**
   * 复核人
   */
  checker: string;
  /**
   * 备注
   */
  remark: string;
}

/**
 * 接口 [投产准备撤销复核↗](https://yapi.sharing8.cn/project/529/interface/api/32205) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/revoke-check`
 * @更新时间 `2024-01-09 18:23:12`
 */
export interface PostApiProductPrepareRevokeCheckResponse {}

/**
 * 接口 [投产准备汇总（效价类型）↗](https://yapi.sharing8.cn/project/529/interface/api/32208) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/immunity/{prepareNo}`
 * @更新时间 `2024-01-11 18:26:22`
 */
export interface GetApiProductPrepareSummaryImmunityPrepareNoRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
}

/**
 * 接口 [投产准备汇总（效价类型）↗](https://yapi.sharing8.cn/project/529/interface/api/32208) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/immunity/{prepareNo}`
 * @更新时间 `2024-01-11 18:26:22`
 */
export interface GetApiProductPrepareSummaryImmunityPrepareNoResponse {
  field_1: {
    /**
     * 效价
     */
    immunity: string;
    /**
     * 血浆数量
     */
    bagCount: number;
    /**
     * 血浆比例
     */
    bagRatio: string;
    /**
     * 净重
     */
    netWeight: string;
    /**
     * 净重比例
     */
    netWeightRatio: string;
  }[];
}

/**
 * 接口 [投产准备汇总（浆站）↗](https://yapi.sharing8.cn/project/529/interface/api/32211) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/station/{prepareNo}`
 * @更新时间 `2024-01-11 18:26:31`
 */
export interface GetApiProductPrepareSummaryStationPrepareNoRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
}

/**
 * 接口 [投产准备汇总（浆站）↗](https://yapi.sharing8.cn/project/529/interface/api/32211) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/station/{prepareNo}`
 * @更新时间 `2024-01-11 18:26:31`
 */
export interface GetApiProductPrepareSummaryStationPrepareNoResponse {
  field_1: {
    /**
     * 浆站名称
     */
    stationName: string;
    /**
     * 血浆数量
     */
    bagCount: number;
    /**
     * 血浆比例
     */
    bagRatio: string;
    /**
     * 净重
     */
    netWeight: string;
    /**
     * 净重比例
     */
    netWeightRatio: string;
  }[];
}

/**
 * 接口 [投产准备汇总（血浆批次）↗](https://yapi.sharing8.cn/project/529/interface/api/32214) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/batch/{prepareNo}`
 * @更新时间 `2024-01-11 18:26:43`
 */
export interface GetApiProductPrepareSummaryBatchPrepareNoRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
}

/**
 * 接口 [投产准备汇总（血浆批次）↗](https://yapi.sharing8.cn/project/529/interface/api/32214) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/batch/{prepareNo}`
 * @更新时间 `2024-01-11 18:26:43`
 */
export interface GetApiProductPrepareSummaryBatchPrepareNoResponse {
  field_1: {
    /**
     * 浆站名称
     */
    stationName: string;
    /**
     * 批号
     */
    batchNo: string;
    /**
     * 血浆数量
     */
    bagCount: number;
    /**
     * 净重
     */
    netWeight: string;
    /**
     * 效价
     */
    immunity: string;
  }[];
}

/**
 * 接口 [投产准备汇总（箱）↗](https://yapi.sharing8.cn/project/529/interface/api/32217) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/box/{prepareNo}`
 * @更新时间 `2024-01-11 18:26:50`
 */
export interface GetApiProductPrepareSummaryBoxPrepareNoRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
}

/**
 * 接口 [投产准备汇总（箱）↗](https://yapi.sharing8.cn/project/529/interface/api/32217) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/box/{prepareNo}`
 * @更新时间 `2024-01-11 18:26:50`
 */
export interface GetApiProductPrepareSummaryBoxPrepareNoResponse {
  field_1: {
    /**
     * 浆站名称
     */
    stationName: string;
    /**
     * 批号
     */
    batchNo: string;
    /**
     * 箱号
     */
    boxNo: string;
    /**
     * 血浆数量
     */
    bagCount: number;
    /**
     * 净重
     */
    netWeight: string;
    /**
     * 效价
     */
    immunity: string;
  }[];
}

/**
 * 接口 [投产准备汇总（袋）↗](https://yapi.sharing8.cn/project/529/interface/api/32220) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/bag/{prepareNo}`
 * @更新时间 `2024-01-10 15:08:32`
 */
export interface GetApiProductPrepareSummaryBagPrepareNoRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
}

/**
 * 接口 [投产准备汇总（袋）↗](https://yapi.sharing8.cn/project/529/interface/api/32220) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/bag/{prepareNo}`
 * @更新时间 `2024-01-10 15:08:32`
 */
export interface GetApiProductPrepareSummaryBagPrepareNoResponse {
  field_1: {
    /**
     * 浆站名称
     */
    stationName: string;
    /**
     * 批号
     */
    batchNo: string;
    /**
     * 箱号
     */
    boxNo: string;
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 采集日期
     */
    collectAt: string;
    /**
     * 浆员编号
     */
    donorNo: number;
    /**
     * 浆员姓名
     */
    donorName: string;
    /**
     * 血型
     */
    bloodType: string;
    /**
     * 效价
     */
    immunity: string;
    /**
     * 效价值
     */
    titer: string;
    /**
     * 血浆状态
     */
    tracked: string;
  }[];
}

/**
 * 接口 [挑浆  批查询↗](https://yapi.sharing8.cn/project/529/interface/api/32322) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/pick/batch`
 * @更新时间 `2024-01-22 16:25:09`
 */
export interface GetApiProductPreparePickBatchRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
  /**
   * 浆站编号
   */
  stationNo?: string;
  /**
   * 批号
   */
  batchNo?: string;
  /**
   * 首次挑选
   */
  firstFlag?: string;
  /**
   * 最小采集天数
   */
  minCollectDay?: string;
  /**
   * 最大采集天数
   */
  maxCollectDay?: string;
  /**
   * 最小效价值
   */
  minTiter?: string;
  /**
   * 最大效价值
   */
  maxTiter?: string;
  /**
   * 效价等级  H-高效价  L-低效价
   */
  titerLevel?: string;
  /**
   * 排序字段(batchNo passCount passRatio)
   */
  orderBy?: string;
  /**
   * 升序：asc 降序：desc
   */
  sort: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [挑浆  批查询↗](https://yapi.sharing8.cn/project/529/interface/api/32322) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/pick/batch`
 * @更新时间 `2024-01-22 16:25:09`
 */
export interface GetApiProductPreparePickBatchResponse {
  field_1: {
    /**
     * 批号
     */
    stationName: string;
    /**
     * 浆站
     */
    batchNo: string;
    /**
     * 挑浆次数
     */
    batchPickCount: number;
    /**
     * 未挑选数量(不包含不合格血浆)
     */
    unpickCount: number;
    /**
     * 满足数量
     */
    passCount: number;
    /**
     * 满足率
     */
    passRatio: number;
    /**
     * 浆员数量 (去重后数量)
     */
    donorCount: string;
    /**
     * 最早采集日期
     */
    minCollectAt: string;
    /**
     * 平均效价
     */
    avgTiter: number;
    /**
     * 高效价
     */
    heightCount: number;
    /**
     * 低效价
     */
    lowCount: number;
  }[];
}

/**
 * 接口 [挑浆  箱查询↗](https://yapi.sharing8.cn/project/529/interface/api/32327) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/pick/box`
 * @更新时间 `2024-01-22 16:25:59`
 */
export interface GetApiProductPreparePickBoxRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
  /**
   * 浆站编号
   */
  stationNo?: string;
  /**
   * 批号
   */
  batchNo?: string;
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 最小采集天数
   */
  minCollectDay?: string;
  /**
   * 最大采集天数
   */
  maxCollectDay: string;
  /**
   * 效价等级 H-高效价  L-低效价
   */
  titerLevel?: string;
  /**
   * 最小效价值
   */
  minTiter?: string;
  /**
   * 最大效价值
   */
  maxTiter?: string;
  /**
   * 排序字段(batchNo passCount passRatio)
   */
  orderBy: string;
  sort: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [挑浆  箱查询↗](https://yapi.sharing8.cn/project/529/interface/api/32327) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/pick/box`
 * @更新时间 `2024-01-22 16:25:59`
 */
export interface GetApiProductPreparePickBoxResponse {
  field_1: {
    /**
     * 批号
     */
    stationName: string;
    /**
     * 浆站
     */
    batchNo: string;
    /**
     * 箱号
     */
    boxNo: string;
    /**
     * 未挑选数量(不包含不合格血浆)
     */
    unpickCount: number;
    /**
     * 满足数量
     */
    passCount: number;
    /**
     * 满足率
     */
    passRatio: number;
    /**
     * 浆员数量 (去重后数量)
     */
    donorCount: string;
    /**
     * 最早采集日期
     */
    minCollectAt: string;
    /**
     * 平均效价
     */
    avgTiter: number;
    /**
     * 高效价
     */
    heightCount: number;
    /**
     * 低效价
     */
    lowCount: number;
  }[];
}

/**
 * 接口 [挑浆↗](https://yapi.sharing8.cn/project/529/interface/api/32332) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/pick/bag`
 * @更新时间 `2024-01-22 16:24:27`
 */
export interface PostApiProductPreparePickBagRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
  /**
   * 浆站
   */
  stationNo?: string;
  /**
   * 批号
   */
  batchNos?: string;
  /**
   * 箱号
   */
  boxNos?: string;
  /**
   * 首次挑选
   */
  firstFlag?: string;
  /**
   * 最小采集天数
   */
  minCollectDay?: string;
  /**
   * 最大采集天数
   */
  maxCollectDay?: string;
  /**
   * 效价等级  H-高效价  L-低效价
   */
  'titerLevel：': string;
  /**
   * 最小效价值
   */
  minTiter: string;
  /**
   * 最大效价值
   */
  maxTiter: string;
}

/**
 * 接口 [挑浆↗](https://yapi.sharing8.cn/project/529/interface/api/32332) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/pick/bag`
 * @更新时间 `2024-01-22 16:24:27`
 */
export interface PostApiProductPreparePickBagResponse {}

/**
 * 接口 [撤销挑浆↗](https://yapi.sharing8.cn/project/529/interface/api/32337) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/revoke/pick/bag`
 * @更新时间 `2024-01-19 09:46:13`
 */
export interface PostApiProductPrepareRevokePickBagRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
  /**
   * 批号
   */
  batchNos?: string;
  /**
   * 箱号
   */
  boxNos?: string;
}

/**
 * 接口 [撤销挑浆↗](https://yapi.sharing8.cn/project/529/interface/api/32337) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/prepare/revoke/pick/bag`
 * @更新时间 `2024-01-19 09:46:13`
 */
export interface PostApiProductPrepareRevokePickBagResponse {}

/**
 * 接口 [已挑批次↗](https://yapi.sharing8.cn/project/529/interface/api/32342) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/pick/bag/batch/{prepareNo}`
 * @更新时间 `2024-01-19 11:07:18`
 */
export interface GetApiProductPreparePickBagBatchPrepareNoRequest {
  prepareNo: string;
}

/**
 * 接口 [已挑批次↗](https://yapi.sharing8.cn/project/529/interface/api/32342) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/pick/bag/batch/{prepareNo}`
 * @更新时间 `2024-01-19 11:07:18`
 */
export interface GetApiProductPreparePickBagBatchPrepareNoResponse {
  field_5: {
    /**
     * 批次
     */
    batchNo: string;
    /**
     * 数量
     */
    count: number;
  }[];
}

/**
 * 接口 [已挑箱↗](https://yapi.sharing8.cn/project/529/interface/api/32347) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/pick/bag/box/{prepareNo}`
 * @更新时间 `2024-01-19 11:07:29`
 */
export interface GetApiProductPreparePickBagBoxPrepareNoRequest {
  prepareNo: string;
}

/**
 * 接口 [已挑箱↗](https://yapi.sharing8.cn/project/529/interface/api/32347) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/pick/bag/box/{prepareNo}`
 * @更新时间 `2024-01-19 11:07:29`
 */
export interface GetApiProductPreparePickBagBoxPrepareNoResponse {
  field_5: {
    /**
     * 箱
     */
    boxNo: string;
    /**
     * 数量
     */
    count: number;
  }[];
}

/**
 * 接口 [挑浆汇总预览查询↗](https://yapi.sharing8.cn/project/529/interface/api/32542) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/preview`
 * @更新时间 `2024-01-18 10:01:12`
 */
export interface GetApiProductPrepareSummaryPreviewRequest {
  /**
   * 投产准备号
   */
  prepareNo?: string;
  /**
   * 1、ALL-限制  2、NO-不限制  3、血浆限制单号
   */
  bagFlag?: string;
  /**
   * 首次挑选
   */
  firstFlag?: string;
  /**
   * 最小采集天数
   */
  minCollectDay?: string;
  /**
   * 最大采集天数
   */
  maxCollectDay?: string;
  /**
   * 效价
   */
  immunity?: string;
  /**
   * 最小效价值
   */
  minTiter: string;
  /**
   * 最大效价值
   */
  maxTiter: string;
  /**
   * 批号
   */
  batchNos: string;
  /**
   * 箱号
   */
  boxNos: string;
}

/**
 * 接口 [挑浆汇总预览查询↗](https://yapi.sharing8.cn/project/529/interface/api/32542) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/summary/preview`
 * @更新时间 `2024-01-18 10:01:12`
 */
export interface GetApiProductPrepareSummaryPreviewResponse {
  field_8: {
    /**
     * 投产准备号
     */
    prepareNo: string;
    /**
     * 1、ALL-限制  2、NO-不限制  3、血浆限制单号
     */
    bagFlag: string;
    /**
     * 投产准备状态
     */
    prepareState: string;
    /**
     * 投产类型
     */
    prodType: string;
    /**
     * 挑浆模式
     */
    pickMode: string;
    /**
     * 创建人
     */
    creator: string;
    /**
     * 复核人
     */
    reviewer: string;
    /**
     * 复核时间
     */
    reviewerAt: string;
    /**
     * 创建时间
     */
    createAt: string;
    summary: {
      /**
       * 批次数量
       */
      batchCount: number;
      /**
       * 分拣血浆数量
       */
      pickBagCount: number;
      /**
       * 投产血浆数量
       */
      prodBagCount: number;
      /**
       * 总净重（kg）
       */
      netWeight: number;
      /**
       * 浆员数量
       */
      donorCount: string;
      /**
       * 最小采集日期
       */
      minCollectAt: string;
      /**
       * 最大采集日期
       */
      maxCollectAt: string;
      /**
       * 平均效价值
       */
      avgTiter: number;
      /**
       * 高效价数量
       */
      tallTiterCount: string;
      /**
       * 低效价数量
       */
      lowTiterCount: string;
      /**
       * 普通数量
       */
      ordinaryCount: string;
    };
  };
}

/**
 * 接口 [投产出库列表↗](https://yapi.sharing8.cn/project/529/interface/api/32627) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/out-store`
 * @更新时间 `2024-01-19 10:47:21`
 */
export interface GetApiProductPrepareOutStoreRequest {
  /**
   * 制造批号
   */
  batchNo?: string;
  /**
   * 投产类型
   */
  type?: string;
  /**
   * 投产状态
   */
  state?: string;
  /**
   * 出库开始日期
   */
  outStartDate?: string;
  /**
   * 出库结束日期
   */
  outEndDate?: string;
}

/**
 * 接口 [投产出库列表↗](https://yapi.sharing8.cn/project/529/interface/api/32627) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/out-store`
 * @更新时间 `2024-01-19 10:47:21`
 */
export interface GetApiProductPrepareOutStoreResponse {
  totalCount?: number;
  pageSize?: null;
  currPage?: null;
  totalPage?: null;
  result?: {
    /**
     * 制造批号
     */
    batchNo: string;
    /**
     * 计划投浆量
     */
    prepareWeight: string;
    /**
     * 投产类型
     */
    type: string;
    /**
     * 计划出库日期
     */
    planOutDate: string;
    /**
     * 计划投产日期
     */
    planProdDate: string;
    /**
     * 血浆总数
     */
    plasmaNum: number;
    /**
     * 血浆净重
     */
    realityWeight: number;
    /**
     * 血浆有效期
     */
    expirationDate: string;
    /**
     * 投产状态
     */
    prodState: string;
    /**
     * 出库日期
     */
    outDate: string;
    /**
     * 出库人
     */
    outPerson: string;
    /**
     * 接收人
     */
    receiver?: string;
    /**
     * 接收日期
     */
    acceptDate?: string;
  }[];
}

/**
 * 接口 [投产逐箱出库↗](https://yapi.sharing8.cn/project/529/interface/api/32632) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/out-store/box`
 * @更新时间 `2024-01-23 16:43:59`
 */
export interface PostApiProductOutStoreBoxRequest {
  orderNo: string;
  boxNo: string;
}

/**
 * 接口 [投产逐箱出库↗](https://yapi.sharing8.cn/project/529/interface/api/32632) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/out-store/box`
 * @更新时间 `2024-01-23 16:43:59`
 */
export interface PostApiProductOutStoreBoxResponse {}

/**
 * 接口 [投产批出库↗](https://yapi.sharing8.cn/project/529/interface/api/32642) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/out-store/batch`
 * @更新时间 `2024-01-22 19:52:05`
 */
export interface PostApiProductOutStoreBatchRequest {
  /**
   * 生产指令号
   */
  orderNo: string;
}

/**
 * 接口 [投产批出库↗](https://yapi.sharing8.cn/project/529/interface/api/32642) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `POST /api/product/out-store/batch`
 * @更新时间 `2024-01-22 19:52:05`
 */
export interface PostApiProductOutStoreBatchResponse {}

/**
 * 接口 [投产逐箱出库信息↗](https://yapi.sharing8.cn/project/529/interface/api/32672) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/out-store/boxes/{orderNo}`
 * @更新时间 `2024-01-22 17:07:24`
 */
export interface GetApiProductOutStoreBoxesOrderNoRequest {
  /**
   * 投产orderNo
   */
  orderNo: string;
}

/**
 * 接口 [投产逐箱出库信息↗](https://yapi.sharing8.cn/project/529/interface/api/32672) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/out-store/boxes/{orderNo}`
 * @更新时间 `2024-01-22 17:07:24`
 */
export interface GetApiProductOutStoreBoxesOrderNoResponse {
  /**
   * 未出库
   */
  notOutList?: {
    boxNo?: string;
    bagNum?: number;
  }[];
  /**
   * 已出库
   */
  outList?: {
    boxNo?: string;
    bagNum?: number;
  }[];
}

/**
 * 接口 [出库撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32717) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `DELETE /api/product/out-store/batch/{orderNo}`
 * @更新时间 `2024-01-23 16:48:55`
 */
export interface DeleteApiProductOutStoreBatchOrderNoRequest {
  /**
   * 投产批号
   */
  orderNo: string;
}

/**
 * 接口 [出库撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32717) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `DELETE /api/product/out-store/batch/{orderNo}`
 * @更新时间 `2024-01-23 16:48:55`
 */
export interface DeleteApiProductOutStoreBatchOrderNoResponse {}

/**
 * 接口 [投产出库托盘列表↗](https://yapi.sharing8.cn/project/529/interface/api/32807) 的 **请求类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/tray/out`
 * @更新时间 `2024-01-25 14:17:20`
 */
export interface GetApiProductPrepareTrayOutRequest {
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * 生产指令号
   */
  orderNo: string;
}

/**
 * 接口 [投产出库托盘列表↗](https://yapi.sharing8.cn/project/529/interface/api/32807) 的 **返回类型**
 *
 * @分类 [投产准备↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5390)
 * @请求头 `GET /api/product/prepare/tray/out`
 * @更新时间 `2024-01-25 14:17:20`
 */
export type GetApiProductPrepareTrayOutResponse = {
  /**
   * 托盘编号
   */
  trayNo: string;
  boxNum: number;
  plasmaNum: number;
  state: string;
  houseName: string;
}[];

/* prettier-ignore-end */
