/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [投产出库列表↗](https://yapi.sharing8.cn/project/529/interface/api/32627) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/out-store`
 * @更新时间 `2024-02-04 15:58:57`
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
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/out-store`
 * @更新时间 `2024-02-04 15:58:57`
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
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/out-store/box`
 * @更新时间 `2024-02-04 16:00:05`
 */
export interface PostApiProductOutStoreBoxRequest {
  orderNo: string;
  boxNo: string;
}

/**
 * 接口 [投产逐箱出库↗](https://yapi.sharing8.cn/project/529/interface/api/32632) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/out-store/box`
 * @更新时间 `2024-02-04 16:00:05`
 */
export interface PostApiProductOutStoreBoxResponse {}

/**
 * 接口 [投产批出库↗](https://yapi.sharing8.cn/project/529/interface/api/32642) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/out-store/batch`
 * @更新时间 `2024-02-04 15:59:12`
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
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/out-store/batch`
 * @更新时间 `2024-02-04 15:59:12`
 */
export interface PostApiProductOutStoreBatchResponse {}

/**
 * 接口 [投产逐箱出库信息↗](https://yapi.sharing8.cn/project/529/interface/api/32672) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/out-store/boxes/{orderNo}`
 * @更新时间 `2024-02-04 16:01:01`
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
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/out-store/boxes/{orderNo}`
 * @更新时间 `2024-02-04 16:01:01`
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
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `DELETE /api/product/out-store/batch/{orderNo}`
 * @更新时间 `2024-02-04 16:00:38`
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
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `DELETE /api/product/out-store/batch/{orderNo}`
 * @更新时间 `2024-02-04 16:00:38`
 */
export interface DeleteApiProductOutStoreBatchOrderNoResponse {}

/**
 * 接口 [投产出库托盘列表↗](https://yapi.sharing8.cn/project/529/interface/api/32807) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/tray/out`
 * @更新时间 `2024-02-04 15:58:37`
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
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/tray/out`
 * @更新时间 `2024-02-04 15:58:37`
 */
export type GetApiProductPrepareTrayOutResponse = {
  /**
   * 托盘编号
   */
  trayNo: string;
  boxNum: number;
  plasmaNum: number;
  state: string;
  houseName?: string;
  /**
   * 是否高架自动库，为true选择站点
   */
  automatic?: boolean;
}[];

/**
 * 接口 [分拣批次信息查询↗](https://yapi.sharing8.cn/project/529/interface/api/32867) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/batch-info`
 * @更新时间 `2024-02-04 15:58:01`
 */
export interface GetApiProductPrepareSortingBatchInfoRequest {
  prepareNo: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [分拣批次信息查询↗](https://yapi.sharing8.cn/project/529/interface/api/32867) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/batch-info`
 * @更新时间 `2024-02-04 15:58:01`
 */
export interface GetApiProductPrepareSortingBatchInfoResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    batchNo?: string;
    pickCount?: null;
    sortCount?: number;
    waitSortCount?: number;
    operator?: string;
    startAt?: string;
    endAt?: string;
    elapsedTime?: string;
    /**
     *   RUN, //准备中     REV, //待复核     TPK, //待分拣     RPK, //分拣中     CPK, //已分拣     OUT, //已出库     DEL  //已取消
     */
    state?: string;
  }[];
}

/**
 * 接口 [装箱信息列表查询↗](https://yapi.sharing8.cn/project/529/interface/api/32872) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/boxs`
 * @更新时间 `2024-02-04 16:00:23`
 */
export interface GetApiProductPrepareSortingBoxsRequest {
  /**
   * 准备号
   */
  prepareNo: string;
  currPage: string;
  pageSize: string;
  /**
   * 箱编码
   */
  boxNo?: string;
  /**
   * 装箱类型
   */
  useType?: string;
  /**
   * 状态    TBR("待复核"),
   *     RVD("已复核"),
   */
  state?: string;
}

/**
 * 接口 [装箱信息列表查询↗](https://yapi.sharing8.cn/project/529/interface/api/32872) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/boxs`
 * @更新时间 `2024-02-04 16:00:23`
 */
export interface GetApiProductPrepareSortingBoxsResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    /**
     * 箱编码
     */
    boxNo?: string;
    /**
     * 装箱类型
     */
    useType?: string;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 装箱人
     */
    operator?: string;
    /**
     * 装箱日期
     */
    operateAt?: string;
    /**
     * 状态    TBR("待复核"),     RVD("已复核"),
     */
    state?: string;
  }[];
}

/**
 * 接口 [装箱核对袋信息查询↗](https://yapi.sharing8.cn/project/529/interface/api/32887) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/box/{boxNo}`
 * @更新时间 `2024-02-04 15:57:37`
 */
export interface GetApiProductPrepareSortingBoxBoxNoRequest {
  /**
   * 箱号
   */
  boxNo: string;
}

/**
 * 接口 [装箱核对袋信息查询↗](https://yapi.sharing8.cn/project/529/interface/api/32887) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/box/{boxNo}`
 * @更新时间 `2024-02-04 15:57:37`
 */
export interface GetApiProductPrepareSortingBoxBoxNoResponse {
  /**
   * 已核对数
   */
  checkedCount?: number;
  /**
   * 总数
   */
  totalCount?: number;
  list?: {
    /**
     * 箱号
     */
    boxNo: string;
    /**
     * 血浆号
     */
    bagNo: string;
    /**
     *     PRO,  // 合格投产     UPR,  // 合格不投产     UNQ,  // 不合格     WV   //待追踪
     */
    pickType: string;
    /**
     * 核对人
     */
    checker: string | null;
    /**
     * 核对时间
     */
    checkAt: string | null;
    /**
     * 状态   TBR("待复核"),     RVD("已复核"),
     */
    state: string;
  }[];
}

/**
 * 接口 [装箱核对↗](https://yapi.sharing8.cn/project/529/interface/api/32892) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `PUT /api/product/prepare/sorting/box/check`
 * @更新时间 `2024-02-04 15:56:45`
 */
export interface PutApiProductPrepareSortingBoxCheckRequest {
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 袋号
   */
  bagNo?: string;
}

/**
 * 接口 [装箱核对↗](https://yapi.sharing8.cn/project/529/interface/api/32892) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `PUT /api/product/prepare/sorting/box/check`
 * @更新时间 `2024-02-04 15:56:45`
 */
export type PutApiProductPrepareSortingBoxCheckResponse = null;

/**
 * 接口 [查询准备号内的批次号↗](https://yapi.sharing8.cn/project/529/interface/api/32902) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/batch/{prepareNo}`
 * @更新时间 `2024-02-04 15:59:47`
 */
export interface GetApiProductPrepareSortingBatchPrepareNoRequest {
  /**
   * 准备号
   */
  prepareNo: string;
}

/**
 * 接口 [查询准备号内的批次号↗](https://yapi.sharing8.cn/project/529/interface/api/32902) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/batch/{prepareNo}`
 * @更新时间 `2024-02-04 15:59:47`
 */
export type GetApiProductPrepareSortingBatchPrepareNoResponse = {
  batchNo?: string;
}[];

/**
 * 接口 [查询分拣总览↗](https://yapi.sharing8.cn/project/529/interface/api/32907) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/{prepareNo}`
 * @更新时间 `2024-02-27 09:34:17`
 */
export interface GetApiProductPrepareSortingPrepareNoRequest {
  prepareNo: string;
}

/**
 * 接口 [查询分拣总览↗](https://yapi.sharing8.cn/project/529/interface/api/32907) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/{prepareNo}`
 * @更新时间 `2024-02-27 09:34:17`
 */
export interface GetApiProductPrepareSortingPrepareNoResponse {
  /**
   * 投产准备分拣血浆数量汇总
   */
  preSummary: {
    /**
     * 分拣批次数
     */
    batchNoCount: number;
    /**
     * 分拣总数
     */
    sortTotal: number;
    /**
     * 已分拣总数
     */
    sortCount: number;
    /**
     * 投产总数
     */
    proTotal: number;
    /**
     * 已分拣批次投产总数
     */
    proSortCount: number;
  };
  /**
   * 批汇总
   */
  batchSummary: {
    /**
     * 批号
     */
    batchNo: string;
    /**
     * 分拣总数
     */
    sortTotal: number;
    /**
     * 已分拣总数
     */
    sortCount: number;
    /**
     * 投产已分拣数
     */
    proSortTotal: string;
  };
  /**
   * 批次 投产
   */
  pros: {
    immTypeName: string;
    immType: string;
    titerLevel: string;
    /**
     * 已分拣数
     */
    sortCount: number;
    /**
     * 总数
     */
    totalCount: number;
    /**
     * 血浆编号
     */
    bagNos: string[];
  };
  /**
   * 批次 不投产
   */
  unPro: {
    /**
     * 血浆分拣效价类型列表
     */
    sortImmTypes: {
      immTypeName: string;
      immType: string;
      titerLevel: string;
      /**
       * 已分拣数
       */
      sortCount: string;
      /**
       * 总数
       */
      totalCount: string;
      /**
       * 血浆编号
       */
      bagNos: string[];
    }[];
    /**
     * 已分拣数
     */
    sortCount: number;
    /**
     * 总数
     */
    total: number;
    pickType: string;
  };
  /**
   * 批次 待放行/不投产
   */
  utrkUnPro: {
    /**
     * 血浆分拣效价类型列表
     */
    sortImmTypes: {
      immTypeName: string;
      immType: string;
      titerLevel: string;
      sortCount: string;
      bagNos: string;
    }[];
    /**
     * 已分拣数
     */
    sortCount: string;
    /**
     * 总数
     */
    total: string;
    pickType: string;
  };
}

/**
 * 接口 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/32912) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/bag`
 * @更新时间 `2024-02-27 09:34:00`
 */
export interface PostApiProductPrepareSortingBagRequest {
  prepareNo: string;
  'bagNo：': string;
  batchNo?: string;
  /**
   * 分拣正常进行：true-正常
   * 1、不合格时需传 true
   * 2、整箱投产但单袋分拣时传 true
   */
  pickFlag?: string;
}

/**
 * 接口 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/32912) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/bag`
 * @更新时间 `2024-02-27 09:34:00`
 */
export interface PostApiProductPrepareSortingBagResponse {
  /**
   * 投产准备分拣血浆数量汇总
   */
  preSummary: {
    /**
     * 分拣批次数
     */
    batchNoCount: number;
    /**
     * 分拣总数
     */
    sortTotal: number;
    /**
     * 已分拣总数
     */
    sortCount: number;
    /**
     * 投产总数
     */
    proTotal: number;
    /**
     * 已分拣批次投产总数
     */
    proSortCount: number;
  };
  /**
   * 批汇总
   */
  batchSummary: {
    /**
     * 批号
     */
    batchNo: string;
    /**
     * 分拣总数
     */
    sortTotal: number;
    /**
     * 已分拣总数
     */
    sortCount: number;
    /**
     * 投产已分拣数
     */
    proSortTotal: number;
  };
  /**
   * 批次 投产
   */
  pros: {
    immTypeName: string;
    immType: string;
    titerLevel: string;
    /**
     * 已分拣数
     */
    sortCount: number;
    /**
     * 总数
     */
    totalCount: number;
    /**
     * 血浆编号
     */
    bagNos: string[];
  };
  /**
   * 批次 不投产
   */
  unPro: {
    /**
     * 血浆分拣效价类型列表
     */
    sortImmTypes: {
      immTypeName: string;
      immType: string;
      titerLevel: string;
      /**
       * 已分拣数
       */
      sortCount: string;
      /**
       * 总数
       */
      totalCount: string;
      /**
       * 血浆编号
       */
      bagNos: string[];
    }[];
    /**
     * 已分拣数
     */
    sortCount: number;
    /**
     * 总数
     */
    total: number;
    pickType: string;
  };
  /**
   * 批次 待放行/不投产
   */
  utrkUnPro: {
    /**
     * 血浆分拣效价类型列表
     */
    sortImmTypes: {
      immTypeName: string;
      immType: string;
      titerLevel: string;
      sortCount: string;
      bagNos: string;
    }[];
    /**
     * 已分拣数
     */
    sortCount: string;
    /**
     * 总数
     */
    total: string;
    pickType: string;
  };
  /**
   * true-满箱 false-不满
   */
  fullBox: boolean;
  /**
   * 整箱合格投产 true-是
   */
  fullBoxQua: boolean;
  /**
   * 血浆合格状态
   */
  track: string;
  /**
   * 箱号
   */
  boxNo: string;
}

/**
 * 接口 [封箱↗](https://yapi.sharing8.cn/project/529/interface/api/32917) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/box-sealing`
 * @更新时间 `2024-02-21 15:53:31`
 */
export interface PostApiProductPrepareSortingBoxSealingRequest {
  bagNos?: string[];
  /**
   * 准备号
   */
  prepareNo?: string;
  /**
   * 效价类型  N, // 普浆     T, // 破免     B, // 乙免     R, // 狂免     A, // 炭疽     C, // 新冠     G  // 巨细胞类型
   */
  immType?: string;
  /**
   *     投产类型 PRO,  // 合格投产     UPR,  // 合格不投产     UNQ,  // 不合格     WV   //待追踪
   */
  pickType?: string;
  /**
   * 批号
   */
  batchNo: string;
}

/**
 * 接口 [封箱↗](https://yapi.sharing8.cn/project/529/interface/api/32917) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/box-sealing`
 * @更新时间 `2024-02-21 15:53:31`
 */
export type PostApiProductPrepareSortingBoxSealingResponse = null;

/**
 * 接口 [合箱↗](https://yapi.sharing8.cn/project/529/interface/api/32922) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/mould-assembling`
 * @更新时间 `2024-02-04 15:55:19`
 */
export interface PostApiProductPrepareSortingMouldAssemblingRequest {
  bagNos?: string[];
  prepareNo?: string;
}

/**
 * 接口 [合箱↗](https://yapi.sharing8.cn/project/529/interface/api/32922) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/mould-assembling`
 * @更新时间 `2024-02-04 15:55:19`
 */
export type PostApiProductPrepareSortingMouldAssemblingResponse = null;

/**
 * 接口 [整箱合格分拣↗](https://yapi.sharing8.cn/project/529/interface/api/32937) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/all-qua/box`
 * @更新时间 `2024-02-04 15:55:32`
 */
export interface PostApiProductPrepareSortingAllQuaBoxRequest {
  prepareNo: string;
  boxNo: string;
}

/**
 * 接口 [整箱合格分拣↗](https://yapi.sharing8.cn/project/529/interface/api/32937) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/all-qua/box`
 * @更新时间 `2024-02-04 15:55:32`
 */
export interface PostApiProductPrepareSortingAllQuaBoxResponse {}

/**
 * 接口 [分拣完成↗](https://yapi.sharing8.cn/project/529/interface/api/33027) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/commit/sorting/{prepareNo}`
 * @更新时间 `2024-02-04 15:55:04`
 */
export interface PostApiProductPrepareCommitSortingPrepareNoRequest {
  prepareNo: string;
}

/**
 * 接口 [分拣完成↗](https://yapi.sharing8.cn/project/529/interface/api/33027) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/commit/sorting/{prepareNo}`
 * @更新时间 `2024-02-04 15:55:04`
 */
export interface PostApiProductPrepareCommitSortingPrepareNoResponse {}

/**
 * 接口 [分拣暂停、继续(批次)↗](https://yapi.sharing8.cn/project/529/interface/api/33262) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/batch/pause`
 * @更新时间 `2024-02-20 16:22:38`
 */
export interface PostApiProductPrepareSortingBatchPauseRequest {
  /**
   * 血浆批号
   */
  prepareNo: string;
  /**
   * 血浆箱号
   */
  batchNo?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 操作类型(暂停-PAUSE  继续-RESTORE)
   */
  state: string;
}

/**
 * 接口 [分拣暂停、继续(批次)↗](https://yapi.sharing8.cn/project/529/interface/api/33262) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/batch/pause`
 * @更新时间 `2024-02-20 16:22:38`
 */
export interface PostApiProductPrepareSortingBatchPauseResponse {}

/**
 * 接口 [分拣暂停列表↗](https://yapi.sharing8.cn/project/529/interface/api/33267) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/prepare/pause/{prepareNo}/{pattern}`
 * @更新时间 `2024-02-20 16:27:19`
 */
export interface GetApiProductPrepareSortingPreparePausePrepareNoPatternRequest {
  prepareNo: string;
  /**
   * 查询类型(批-BATCH ,准备号-PREPARE)
   */
  pattern: string;
}

/**
 * 接口 [分拣暂停列表↗](https://yapi.sharing8.cn/project/529/interface/api/33267) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `GET /api/product/prepare/sorting/prepare/pause/{prepareNo}/{pattern}`
 * @更新时间 `2024-02-20 16:27:19`
 */
export type GetApiProductPrepareSortingPreparePausePrepareNoPatternResponse = {
  /**
   * 唯一标识
   */
  pspId: string;
  prepareNo: string;
  batchNo: string;
  /**
   * 暂停时间
   */
  createAt: string;
  /**
   * 暂停人
   */
  creater: string;
  /**
   * 复核人
   */
  reviewer: string;
  /**
   * 继续时间
   */
  freeAt: string;
  /**
   * 当前状态
   */
  state: string;
  /**
   * 继续人
   */
  freedBy: string;
  /**
   * 继续复核人
   */
  reviewBy: string;
}[];

/**
 * 接口 [分拣暂停、继续(准备号)↗](https://yapi.sharing8.cn/project/529/interface/api/33272) 的 **请求类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/prepare/pause`
 * @更新时间 `2024-02-20 16:24:05`
 */
export interface PostApiProductPrepareSortingPreparePauseRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
  batchNo?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 操作类型(暂停-PAUSE  继续-RESTORE)
   */
  state: string;
}

/**
 * 接口 [分拣暂停、继续(准备号)↗](https://yapi.sharing8.cn/project/529/interface/api/33272) 的 **返回类型**
 *
 * @分类 [血浆分拣↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5667)
 * @请求头 `POST /api/product/prepare/sorting/prepare/pause`
 * @更新时间 `2024-02-20 16:24:05`
 */
export interface PostApiProductPrepareSortingPreparePauseResponse {}

/* prettier-ignore-end */
