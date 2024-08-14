/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [启用\/禁用库房↗](https://yapi.sharing8.cn/project/529/interface/api/31500) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `PUT /api/core/bank/warehouse-use`
 * @更新时间 `2023-12-18 16:50:18`
 */
export interface PutApiCoreBankWarehouseUseRequest {
  /**
   * 库房编号
   */
  houseNo: string;
  /**
   * 是否禁用，NORMAL表示启用，CLOSED表示禁用
   */
  closed: string;
}

/**
 * 接口 [启用\/禁用库房↗](https://yapi.sharing8.cn/project/529/interface/api/31500) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `PUT /api/core/bank/warehouse-use`
 * @更新时间 `2023-12-18 16:50:18`
 */
export interface PutApiCoreBankWarehouseUseResponse {
  /**
   * 响应码，0表示成功
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [启用\/禁用货位↗](https://yapi.sharing8.cn/project/529/interface/api/31512) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `PUT /api/core/bank/location-use`
 * @更新时间 `2023-12-18 16:50:35`
 */
export interface PutApiCoreBankLocationUseRequest {
  /**
   * 货位编号
   */
  locationNo: string;
  /**
   * 是否禁用，NORMAL表示启用，CLOSED表示禁用
   */
  closed: string;
}

/**
 * 接口 [启用\/禁用货位↗](https://yapi.sharing8.cn/project/529/interface/api/31512) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `PUT /api/core/bank/location-use`
 * @更新时间 `2023-12-18 16:50:35`
 */
export interface PutApiCoreBankLocationUseResponse {
  /**
   * 响应码，0表示成功
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [新增库房↗](https://yapi.sharing8.cn/project/529/interface/api/31536) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `POST /api/core/bank/warehouse`
 * @更新时间 `2023-12-18 17:00:06`
 */
export interface PostApiCoreBankWarehouseRequest {
  houseName: string;
  capacity?: number;
  parentHouseNo?: string;
  houseType: string;
  /**
   * 血浆流程绑定
   */
  flowBind?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 是否禁用，NORMAL表示启用，CLOSED表示禁用
   */
  closed: string;
}

/**
 * 接口 [新增库房↗](https://yapi.sharing8.cn/project/529/interface/api/31536) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `POST /api/core/bank/warehouse`
 * @更新时间 `2023-12-18 17:00:06`
 */
export type PostApiCoreBankWarehouseResponse = string;

/**
 * 接口 [手动扩容↗](https://yapi.sharing8.cn/project/529/interface/api/31539) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `PUT /api/core/bank/warehouse`
 * @更新时间 `2023-12-12 13:48:19`
 */
export interface PutApiCoreBankWarehouseRequest {
  /**
   * 库房编号
   */
  houseNo?: string;
  /**
   * 库位扩容数量
   */
  expansion?: number;
}

/**
 * 接口 [手动扩容↗](https://yapi.sharing8.cn/project/529/interface/api/31539) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `PUT /api/core/bank/warehouse`
 * @更新时间 `2023-12-12 13:48:19`
 */
export type PutApiCoreBankWarehouseResponse = string;

/**
 * 接口 [查询库房列表↗](https://yapi.sharing8.cn/project/529/interface/api/31545) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/warehouses`
 * @更新时间 `2024-03-26 15:56:51`
 */
export interface GetApiCoreBankWarehousesRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 库房编号
   */
  houseNo?: string;
  /**
   * 库房名称
   */
  houseName?: string;
  /**
   * S表示高架库，F表示平库
   */
  warehouseType?: string;
  closed?: string;
  normal?: string;
}

/**
 * 接口 [查询库房列表↗](https://yapi.sharing8.cn/project/529/interface/api/31545) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/warehouses`
 * @更新时间 `2024-03-26 15:56:51`
 */
export interface GetApiCoreBankWarehousesResponse {
  /**
   * 当前页码
   */
  currPage: number;
  /**
   * 页大小
   */
  pageSize: number;
  /**
   * 总数量
   */
  totalCount: number;
  /**
   * 数据列表
   */
  result: {
    /**
     * 库房编号
     */
    houseNo: string;
    /**
     * 库房名称
     */
    houseName: string;
    /**
     * 上级库房编号
     */
    parentHouseId: string;
    /**
     * 上级库房名称
     */
    parentHouseName: string;
    /**
     * 库房类型
     */
    houseType: string;
    /**
     * 货位数量
     */
    locationCount: number;
    /**
     * 规格
     */
    standard: string;
    /**
     * 是否禁用，0表示启用，1表示禁用
     */
    closed: number;
    /**
     * 备注
     */
    remark: string;
    /**
     * 已使用货位数量
     */
    locationUsedCount: number;
  }[];
}

/**
 * 接口 [查询库房详情↗](https://yapi.sharing8.cn/project/529/interface/api/31548) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/warehouse/{houseNo}`
 * @更新时间 `2023-12-19 14:08:51`
 */
export interface GetApiCoreBankWarehouseHouseNoRequest {
  houseNo: string;
}

/**
 * 接口 [查询库房详情↗](https://yapi.sharing8.cn/project/529/interface/api/31548) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/warehouse/{houseNo}`
 * @更新时间 `2023-12-19 14:08:51`
 */
export interface GetApiCoreBankWarehouseHouseNoResponse {
  /**
   * 库房编号
   */
  houseNo: string;
  /**
   * 库房名称
   */
  houseName: string;
  /**
   * 上级库房编号
   */
  parentHouseNo: string;
  /**
   * 上级库房名称
   */
  parentHouseName: string;
  /**
   * 库房类别
   */
  houseType: string;
  /**
   * 货位数量
   */
  locationCount: string;
  /**
   * 规格
   */
  standard: string;
  /**
   * 是否禁用，0表示启用，1表示禁用
   */
  closed: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 已使用货位数量
   */
  locationUsedCount: string;
  /**
   * 库房区域列表
   */
  subHouseList: {
    houseNo: string;
    houseName: string;
    parentHouseId: string;
    parentHouseName: string;
    houseType: string;
    locationCount: number;
    standard: string;
    closed: string;
    remark: string;
    locationUsedCount: number;
  }[];
}

/**
 * 接口 [查看货位列表↗](https://yapi.sharing8.cn/project/529/interface/api/31557) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/locations`
 * @更新时间 `2024-08-13 11:02:36`
 */
export interface GetApiCoreBankLocationsRequest {
  /**
   * 当前页面
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 货位号
   */
  locationNo?: string;
  /**
   * 托盘号
   */
  trayNo?: string;
  /**
   * 库房编号
   */
  houseNo: string;
  /**
   * 货位是否禁用，0表示启用，1表示禁用
   */
  closed?: string;
  /**
   * 是否查询操作，0表示否，1表示是，默认否
   */
  queryFlag?: string;
}

/**
 * 接口 [查看货位列表↗](https://yapi.sharing8.cn/project/529/interface/api/31557) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/locations`
 * @更新时间 `2024-08-13 11:02:36`
 */
export interface GetApiCoreBankLocationsResponse {
  currPage: number;
  pageSize: number;
  totalCount: number;
  result: {
    /**
     * 货位号
     */
    locationNo: string;
    /**
     * 托盘编号
     */
    trayNo: string;
    /**
     * 是否启用，0表示启用，1表示禁用
     */
    closed: number;
  }[];
}

/**
 * 接口 [库存查询↗](https://yapi.sharing8.cn/project/529/interface/api/31671) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/search/bank/stock`
 * @更新时间 `2024-07-18 10:41:47`
 */
export interface GetApiSearchBankStockRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 接收开始日期
   */
  receiptStartDate?: string;
  /**
   * 接收结束日期
   */
  receiptEndDate?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 效价类型
   */
  immType?: string;
  /**
   *  /**
   *      * 投产出库
   *      * /
   *     PRO,
   *     /**
   *      * 不合格出库转移
   *      * /
   *     RMT,
   *     /**
   *      * 不合格出库销毁
   *      * /
   *     DST,
   *     /**
   *      * 科研出库
   *      * /
   *     SIC,
   *     /**
   *      * 普通出库
   *      * /
   *     NOR,
   *     /**
   *      * 非生产出库
   *      * /
   *     NPD,
   */
  dlvType?: string;
  /**
   * 血浆过程状态  字典stockPlasmaProcessStatus
   */
  state?: string;
  /**
   * 验收发布开始时间
   */
  verifyStartDate?: string;
  /**
   * 验收发布结束时间
   */
  verifyEndDate?: string;
}

/**
 * 接口 [库存查询↗](https://yapi.sharing8.cn/project/529/interface/api/31671) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/search/bank/stock`
 * @更新时间 `2024-07-18 10:41:47`
 */
export type GetApiSearchBankStockResponse = {
  /**
   * 采浆公司
   */
  stationNo: string;
  /**
   * 入库数量（袋）
   */
  inNum: number;
  /**
   * 入库重量（kg）
   */
  inWeight: number;
  /**
   * 出库数量（袋）
   */
  outNum: number;
  /**
   * 出库重量（kg）
   */
  outWeight: number;
  /**
   * 结存数量（袋）
   */
  surplusNum: number;
  /**
   * 结存重量（kg）
   */
  surplusWeight: number;
  /**
   * 库房
   */
  bankNames: string;
}[];

/**
 * 接口 [入库查询↗](https://yapi.sharing8.cn/project/529/interface/api/31680) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/reception`
 * @更新时间 `2024-02-04 16:00:20`
 */
export interface GetApiCoreBankReceptionRequest {
  /**
   * 当前页面
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
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 接收开始日期
   */
  acceptStartDate?: string;
  /**
   * 接收结束日期
   */
  acceptEndDate?: string;
  /**
   * 验收发布开始日期
   */
  verifyPubStartDate?: string;
  /**
   * 验收发布结束日期
   */
  verifyPubEndDate?: string;
}

/**
 * 接口 [入库查询↗](https://yapi.sharing8.cn/project/529/interface/api/31680) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/reception`
 * @更新时间 `2024-02-04 16:00:20`
 */
export interface GetApiCoreBankReceptionResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 采浆公司
     */
    stationNo: string;
    /**
     * 血浆批号
     */
    batchNo: string;
    /**
     * 采集开始日期
     */
    collectStartDate: string;
    /**
     * 采集结束日期
     */
    collectEndDate: string;
    /**
     * 浆站出库日期
     */
    stationOutDate: string;
    /**
     * 出库数量（袋）
     */
    outNum: number;
    /**
     * 出库总净重（kg）
     */
    outWeight: number;
    /**
     * 接收日期
     */
    acceptDate: string;
    /**
     * 验收发布人
     */
    verifyPublisher: string;
    /**
     * 验收发布日期
     */
    verifyPubDate: string;
    /**
     * 验收数量（袋）
     */
    verifyNum: number;
    /**
     * 验收总净重（kg）
     */
    verifyWeight: number;
    /**
     * 差异总袋数
     */
    diffNum: number;
    /**
     * 差异总净重（kg）
     */
    diffWeight: number;
    /**
     * 验收合格数量袋
     */
    verifyPassNum: number;
    /**
     * 验收不合格数量（袋）
     */
    verifyNoPassNum: number;
    /**
     * 不足量数量
     */
    shortFallNum: number;
  }[];
}

/**
 * 接口 [新增库房站点↗](https://yapi.sharing8.cn/project/529/interface/api/31779) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `POST /api/core/bank/site`
 * @更新时间 `2023-12-22 15:57:21`
 */
export interface PostApiCoreBankSiteRequest {
  /**
   * 站点编号
   */
  siteNo: string;
  /**
   * 站点名称
   */
  siteName: string;
  /**
   * 所属库房
   */
  fkHouseNo: string;
  /**
   * 1禁用,0正常
   */
  closed: number;
}

/**
 * 接口 [新增库房站点↗](https://yapi.sharing8.cn/project/529/interface/api/31779) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `POST /api/core/bank/site`
 * @更新时间 `2023-12-22 15:57:21`
 */
export type PostApiCoreBankSiteResponse = string;

/**
 * 接口 [修改库房站点↗](https://yapi.sharing8.cn/project/529/interface/api/31782) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `PUT /api/core/bank/site`
 * @更新时间 `2023-12-23 14:07:26`
 */
export interface PutApiCoreBankSiteRequest {
  siteNo: string;
  siteName?: string;
  fkHouseNo?: string;
  closed?: number;
  /**
   * 未修改前的站点编号
   */
  siteNoOld: string;
}

/**
 * 接口 [修改库房站点↗](https://yapi.sharing8.cn/project/529/interface/api/31782) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `PUT /api/core/bank/site`
 * @更新时间 `2023-12-23 14:07:26`
 */
export type PutApiCoreBankSiteResponse = string;

/**
 * 接口 [获取库房站点列表↗](https://yapi.sharing8.cn/project/529/interface/api/31785) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `POST /api/core/bank/sites`
 * @更新时间 `2023-12-22 16:12:02`
 */
export interface PostApiCoreBankSitesRequest {
  currPage: number;
  pageSize: number;
  siteNo?: string;
}

/**
 * 接口 [获取库房站点列表↗](https://yapi.sharing8.cn/project/529/interface/api/31785) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `POST /api/core/bank/sites`
 * @更新时间 `2023-12-22 16:12:02`
 */
export interface PostApiCoreBankSitesResponse {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  result?: {
    siteNo: string;
    siteName: string;
    fkHouseNo: string;
    closed: number;
    creator?: string;
    updater?: string;
    createAt?: string;
    updateAt?: string;
  }[];
}

/**
 * 接口 [获取库房站点详情↗](https://yapi.sharing8.cn/project/529/interface/api/31788) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/site/{siteNo}`
 * @更新时间 `2023-12-22 16:54:39`
 */
export interface GetApiCoreBankSiteSiteNoRequest {
  siteNo: string;
}

/**
 * 接口 [获取库房站点详情↗](https://yapi.sharing8.cn/project/529/interface/api/31788) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/site/{siteNo}`
 * @更新时间 `2023-12-22 16:54:39`
 */
export interface GetApiCoreBankSiteSiteNoResponse {
  siteNo: string;
  siteName: string;
  fkHouseNo: string;
  closed: number;
  creator?: string;
  updater?: string;
  createAt?: string;
  updateAt?: string;
}

/**
 * 接口 [根据库房查站点↗](https://yapi.sharing8.cn/project/529/interface/api/31797) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/site/house/{houseNo}`
 * @更新时间 `2023-12-23 10:49:40`
 */
export interface GetApiCoreBankSiteHouseHouseNoRequest {
  houseNo: string;
}

/**
 * 接口 [根据库房查站点↗](https://yapi.sharing8.cn/project/529/interface/api/31797) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/site/house/{houseNo}`
 * @更新时间 `2023-12-23 10:49:40`
 */
export type GetApiCoreBankSiteHouseHouseNoResponse = {
  /**
   * 库房名称
   */
  lable: string;
  /**
   * 库房编号
   */
  value: string;
}[];

/**
 * 接口 [查询库房列表名称（前端作下拉表单）↗](https://yapi.sharing8.cn/project/529/interface/api/32160) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/warehouses/name`
 * @更新时间 `2024-01-13 11:02:13`
 */
export interface GetApiCoreBankWarehousesNameRequest {
  /**
   * 库房类型
   */
  houseType: string;
  /**
   * 库房类型根据头字母模糊匹配
   */
  houseTypeLike: string;
}

/**
 * 接口 [查询库房列表名称（前端作下拉表单）↗](https://yapi.sharing8.cn/project/529/interface/api/32160) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/warehouses/name`
 * @更新时间 `2024-01-13 11:02:13`
 */
export type GetApiCoreBankWarehousesNameResponse = {
  bankName?: string;
  bankNo?: string;
}[];

/**
 * 接口 [入库记录↗](https://yapi.sharing8.cn/project/529/interface/api/32317) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/batch/plasma/in-store`
 * @更新时间 `2024-01-18 16:01:27`
 */
export interface GetApiCoreBatchPlasmaInStoreRequest {
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 状态
   */
  state?: string;
  /**
   * 接受开始日期
   */
  receiveStartDate?: string;
  /**
   * 接受结束日期
   */
  receiveEndDate?: string;
  /**
   * 验收开始日期
   */
  verifyStartDate?: string;
  /**
   * 验收结束日期
   */
  verifyEndDate?: string;
  /**
   * 发布开始日期
   */
  publishStartDate?: string;
  /**
   * 发布结束日期
   */
  publishEndDate?: string;
}

/**
 * 接口 [入库记录↗](https://yapi.sharing8.cn/project/529/interface/api/32317) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/batch/plasma/in-store`
 * @更新时间 `2024-01-18 16:01:27`
 */
export interface GetApiCoreBatchPlasmaInStoreResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 采浆公司
     */
    stationNo: string;
    /**
     * 血浆批号
     */
    batchNo: string;
    /**
     * 血浆箱数
     */
    boxNum: number;
    /**
     * 接受箱数
     */
    acceptBoxNum: number;
    /**
     * 血浆数量
     */
    bagNum: number;
    /**
     * 验收数量
     */
    verifyNum?: number;
    /**
     * 合格血浆数量
     */
    passBagNum?: number;
    /**
     * 不合格血浆数量
     */
    noPassBagNum?: number;
    /**
     * 缺号数量
     */
    lackNoNum?: number;
    /**
     * 浆站重量
     */
    stationWeight?: number;
    /**
     * 验收重量
     */
    verifyWeight?: number;
    /**
     * 接收日期
     */
    acceptDate?: string;
    /**
     * 验收日期
     */
    verifyDate?: string;
    /**
     * 发布日期
     */
    pubDate?: string;
    /**
     * 发布人
     */
    publisher?: string;
    /**
     * 验收状态
     */
    verifyState: string;
  }[];
}

/**
 * 接口 [平面图↗](https://yapi.sharing8.cn/project/529/interface/api/34326) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/location-layout`
 * @更新时间 `2024-07-11 16:52:20`
 */
export interface GetApiCoreBankLocationLayoutRequest {
  /**
   * 库房
   */
  houseNo: string;
  /**
   * 货架编号
   */
  shelfNo: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 样本批号
   */
  sampleBatchNo?: string;
}

/**
 * 接口 [平面图↗](https://yapi.sharing8.cn/project/529/interface/api/34326) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/location-layout`
 * @更新时间 `2024-07-11 16:52:20`
 */
export type GetApiCoreBankLocationLayoutResponse = {
  /**
   * 货位号
   */
  locationNo: string;
  /**
   * 颜色
   */
  color: string;
  /**
   * 显示内容
   */
  desc: string;
}[][];

/**
 * 接口 [平面图-批号明细↗](https://yapi.sharing8.cn/project/529/interface/api/34332) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/location-layout/batches`
 * @更新时间 `2024-06-24 21:05:08`
 */
export interface GetApiCoreBankLocationLayoutBatchesRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
  currPage: string;
  pageSize: string;
  /**
   * 托盘存放类型：PLA-血浆，PER-样本
   */
  trayType: string;
}

/**
 * 接口 [平面图-批号明细↗](https://yapi.sharing8.cn/project/529/interface/api/34332) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/location-layout/batches`
 * @更新时间 `2024-06-24 21:05:08`
 */
export interface GetApiCoreBankLocationLayoutBatchesResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 采浆公司
     */
    stationName: string;
    /**
     * 批号
     */
    batchNo: string;
    /**
     * 数量
     */
    totalCount: number;
  }[];
}

/**
 * 接口 [平面图-箱号明细↗](https://yapi.sharing8.cn/project/529/interface/api/34338) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/location-layout/boxes`
 * @更新时间 `2024-06-24 21:05:26`
 */
export interface GetApiCoreBankLocationLayoutBoxesRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
  currPage: string;
  pageSize: string;
  /**
   * 托盘存放类型：PLA-血浆，PER-样本
   */
  trayType: string;
}

/**
 * 接口 [平面图-箱号明细↗](https://yapi.sharing8.cn/project/529/interface/api/34338) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/location-layout/boxes`
 * @更新时间 `2024-06-24 21:05:26`
 */
export interface GetApiCoreBankLocationLayoutBoxesResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 箱号
     */
    boxNo: string;
    /**
     * 数量
     */
    totalCount: number;
  }[];
}

/**
 * 接口 [平面图-血浆\/样本明细↗](https://yapi.sharing8.cn/project/529/interface/api/34344) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/location-layout/detail`
 * @更新时间 `2024-06-24 21:05:52`
 */
export interface GetApiCoreBankLocationLayoutDetailRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
  currPage: string;
  pageSize: string;
  /**
   * 批号
   */
  batchNo?: string;
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 编号
   */
  number?: string;
  /**
   * 托盘存放类型：PLA-血浆，PER-保留样本
   */
  trayType: string;
}

/**
 * 接口 [平面图-血浆\/样本明细↗](https://yapi.sharing8.cn/project/529/interface/api/34344) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/location-layout/detail`
 * @更新时间 `2024-06-24 21:05:52`
 */
export interface GetApiCoreBankLocationLayoutDetailResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 箱号
     */
    boxNo: string;
    /**
     * 采浆公司
     */
    stationName: string;
    /**
     * 血浆/样本批号
     */
    batchNo: string;
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 样本编号
     */
    sampleNo: string;
    /**
     * 样本袋号
     */
    packNo: string;
    /**
     * 浆员编号（卡号）
     */
    cardNo: string;
    /**
     * 浆员姓名
     */
    donorName: string;
    /**
     * 采集日期
     */
    collectAt: string;
  }[];
}

/**
 * 接口 [平面图-明细统计表头（血浆和保留样本都调用此接口）↗](https://yapi.sharing8.cn/project/529/interface/api/34350) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/location-layout/summary/{locationNo}`
 * @更新时间 `2024-06-24 17:54:56`
 */
export interface GetApiCoreBankLocationLayoutSummaryLocationNoRequest {
  /**
   * 货位号
   */
  locationNo: string;
}

/**
 * 接口 [平面图-明细统计表头（血浆和保留样本都调用此接口）↗](https://yapi.sharing8.cn/project/529/interface/api/34350) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/location-layout/summary/{locationNo}`
 * @更新时间 `2024-06-24 17:54:56`
 */
export interface GetApiCoreBankLocationLayoutSummaryLocationNoResponse {
  /**
   * 货位号
   */
  locationNo?: string;
  /**
   * 数量
   */
  totalCount?: number;
  /**
   * 存放类型
   */
  trayType?: string;
  /**
   * 托盘编号
   */
  trayNo?: string;
}

/**
 * 接口 [编辑库房↗](https://yapi.sharing8.cn/project/529/interface/api/36255) 的 **请求类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `PUT /api/core/bank/warehouse/update`
 * @更新时间 `2024-07-31 16:49:24`
 */
export interface PutApiCoreBankWarehouseUpdateRequest {
  /**
   * 库房编号
   */
  houseNo: string;
  /**
   * 库房名称
   */
  houseName: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [编辑库房↗](https://yapi.sharing8.cn/project/529/interface/api/36255) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `PUT /api/core/bank/warehouse/update`
 * @更新时间 `2024-07-31 16:49:24`
 */
export type PutApiCoreBankWarehouseUpdateResponse = string;

/* prettier-ignore-end */
