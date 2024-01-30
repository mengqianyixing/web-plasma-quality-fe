/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询血浆出库托盘列表↗](https://yapi.sharing8.cn/project/529/interface/api/32957) 的 **请求类型**
 *
 * @分类 [分拣-托盘出入库，解绑绑定↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5568)
 * @请求头 `GET /api/product/prepare/sorting/out-traies`
 * @更新时间 `2024-01-30 16:03:34`
 */
export interface GetApiProductPrepareSortingOutTraiesRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 状态，已出库-S、未出库-W、出库中-R
   */
  state?: string;
  /**
   * 是否全分拣
   */
  sortType?: string;
  /**
   * 投产准备号
   */
  prepareNo: string;
}

/**
 * 接口 [查询血浆出库托盘列表↗](https://yapi.sharing8.cn/project/529/interface/api/32957) 的 **返回类型**
 *
 * @分类 [分拣-托盘出入库，解绑绑定↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5568)
 * @请求头 `GET /api/product/prepare/sorting/out-traies`
 * @更新时间 `2024-01-30 16:03:34`
 */
export interface GetApiProductPrepareSortingOutTraiesResponse {
  totalCount?: number;
  currPage?: null;
  totalPage?: null;
  pageSize?: null;
  result?: {
    /**
     * 托盘编号
     */
    trayNo?: string;
    /**
     * 血浆批号，多个则以英文逗号隔开
     */
    batchNoes?: string;
    /**
     * 存放血浆箱数
     */
    boxCount?: number;
    /**
     * 是否全分拣，0表示否，1表示是
     */
    allSort?: number;
    /**
     * 状态，已出库-S、未出库-W、出库中-R
     */
    state?: string;
    /**
     * 存放库房
     */
    wareHouseName?: string;
    /**
     * 存放库房编号
     */
    houseNo?: string;
    /**
     * 库房类型
     */
    houseType?: string;
    /**
     * 存放货位
     */
    locationNo?: string;
  }[];
}

/**
 * 接口 [查询血浆入库托盘列表↗](https://yapi.sharing8.cn/project/529/interface/api/32962) 的 **请求类型**
 *
 * @分类 [分拣-托盘出入库，解绑绑定↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5568)
 * @请求头 `GET /api/product/prepare/sorting/in-traies`
 * @更新时间 `2024-01-30 16:03:57`
 */
export interface GetApiProductPrepareSortingInTraiesRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * 血浆箱号
   */
  boxNo?: string;
  /**
   * 投产准备号
   */
  prepareNo: string;
}

/**
 * 接口 [查询血浆入库托盘列表↗](https://yapi.sharing8.cn/project/529/interface/api/32962) 的 **返回类型**
 *
 * @分类 [分拣-托盘出入库，解绑绑定↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5568)
 * @请求头 `GET /api/product/prepare/sorting/in-traies`
 * @更新时间 `2024-01-30 16:03:57`
 */
export interface GetApiProductPrepareSortingInTraiesResponse {
  totalCount?: number;
  currPage?: null;
  totalPage?: null;
  pageSize?: null;
  result?: {
    /**
     * 托盘编号
     */
    trayNo?: string;
    /**
     * 箱数
     */
    boxCount?: number;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 状态：W-未入库，R-入库中，S-已入库
     */
    state?: string;
    /**
     * 存放库房
     */
    wareHouseName?: string;
    /**
     * 存放货位
     */
    locationNo?: string;
  }[];
}

/**
 * 接口 [出库血浆托盘血浆箱存放明细列表↗](https://yapi.sharing8.cn/project/529/interface/api/32967) 的 **请求类型**
 *
 * @分类 [分拣-托盘出入库，解绑绑定↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5568)
 * @请求头 `GET /api/product/prepare/sorting/out-tray-boxes/{trayNo}`
 * @更新时间 `2024-01-30 14:47:01`
 */
export interface GetApiProductPrepareSortingOutTrayBoxesTrayNoRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
}

/**
 * 接口 [出库血浆托盘血浆箱存放明细列表↗](https://yapi.sharing8.cn/project/529/interface/api/32967) 的 **返回类型**
 *
 * @分类 [分拣-托盘出入库，解绑绑定↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5568)
 * @请求头 `GET /api/product/prepare/sorting/out-tray-boxes/{trayNo}`
 * @更新时间 `2024-01-30 14:47:01`
 */
export type GetApiProductPrepareSortingOutTrayBoxesTrayNoResponse = {
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 血浆箱号
   */
  boxNo?: string;
  /**
   * 血浆数量
   */
  bagCount?: number;
  /**
   * 是否待分拣，0表示否，1表示是
   */
  sortState?: number;
}[];

/**
 * 接口 [查询入库血浆的分拣血浆箱列表↗](https://yapi.sharing8.cn/project/529/interface/api/33032) 的 **请求类型**
 *
 * @分类 [分拣-托盘出入库，解绑绑定↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5568)
 * @请求头 `GET /api/product/prepare/sorting/in-tray-boxes`
 * @更新时间 `2024-01-30 16:14:04`
 */
export interface GetApiProductPrepareSortingInTrayBoxesRequest {
  /**
   * 投产准备号
   */
  prepareNo: string;
  /**
   * 装箱类型
   */
  pickType?: string;
  /**
   * 血浆箱号
   */
  boxNo?: string;
}

/**
 * 接口 [查询入库血浆的分拣血浆箱列表↗](https://yapi.sharing8.cn/project/529/interface/api/33032) 的 **返回类型**
 *
 * @分类 [分拣-托盘出入库，解绑绑定↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5568)
 * @请求头 `GET /api/product/prepare/sorting/in-tray-boxes`
 * @更新时间 `2024-01-30 16:14:04`
 */
export interface GetApiProductPrepareSortingInTrayBoxesResponse {
  totalCount?: number;
  currPage?: null;
  totalPage?: null;
  pageSize?: null;
  result?: {
    /**
     * 血浆箱号
     */
    boxNo?: string;
    /**
     * 装箱类型
     */
    pickType?: string;
    /**
     * 血浆数量
     */
    bagCount?: number;
    /**
     * 装箱人
     */
    picker?: string;
    /**
     * 装箱日期
     */
    pickDate?: string;
    /**
     * trayNo
     */
    trayNo?: string;
  }[];
}

/* prettier-ignore-end */
