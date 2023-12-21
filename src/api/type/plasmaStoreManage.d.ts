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
 * @更新时间 `2023-12-19 14:09:18`
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
}

/**
 * 接口 [查询库房列表↗](https://yapi.sharing8.cn/project/529/interface/api/31545) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/warehouses`
 * @更新时间 `2023-12-19 14:09:18`
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
 * @更新时间 `2023-12-19 14:09:05`
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
}

/**
 * 接口 [查看货位列表↗](https://yapi.sharing8.cn/project/529/interface/api/31557) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/locations`
 * @更新时间 `2023-12-19 14:09:05`
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
 * @请求头 `GET /api/core/bank/stock`
 * @更新时间 `2023-12-19 18:08:45`
 */
export interface GetApiCoreBankStockRequest {
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
  immuneType?: string;
  /**
   * 血浆过程状态
   */
  待定?: string;
}

/**
 * 接口 [库存查询↗](https://yapi.sharing8.cn/project/529/interface/api/31671) 的 **返回类型**
 *
 * @分类 [库房管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5187)
 * @请求头 `GET /api/core/bank/stock`
 * @更新时间 `2023-12-19 18:08:45`
 */
export type GetApiCoreBankStockResponse = {
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
  bankNo: string;
}[];

/* prettier-ignore-end */
