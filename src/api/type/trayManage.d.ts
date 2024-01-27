/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [托盘列表查询↗](https://yapi.sharing8.cn/project/529/interface/api/31620) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/traies`
 * @更新时间 `2024-01-04 16:15:50`
 */
export interface GetApiCoreBankTraiesRequest {
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
   * 血浆批次
   */
  batchNo?: string;
  /**
   * 浆袋编号
   */
  bagNo?: string;
  /**
   * 样本批次
   */
  batchSampleNo?: string;
  /**
   * 投产准备号
   */
  prepareNo?: string;
  /**
   * 是否禁用，0表示启用，1表示禁用
   */
  closed?: string;
  /**
   * 血浆箱号
   */
  boxNo?: string;
}

/**
 * 接口 [托盘列表查询↗](https://yapi.sharing8.cn/project/529/interface/api/31620) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/traies`
 * @更新时间 `2024-01-04 16:15:50`
 */
export interface GetApiCoreBankTraiesResponse {
  /**
   * 当前页码
   */
  currPage?: number;
  /**
   * 页大小
   */
  pageSize?: number;
  /**
   * 总数量
   */
  totalCount?: number;
  /**
   * 数据列表
   */
  result?: {
    /**
     * 托盘编号
     */
    trayNo: string;
    /**
     * 已存箱数量
     */
    totalNumber?: number;
    /**
     * 已存血浆数量
     */
    totalBagNumber?: string;
    /**
     * 所存放库房名称
     */
    houseName?: string;
    /**
     * 所存放货位号
     */
    locationNo?: string;
    /**
     * 库房编号
     */
    houseNo?: string;
    /**
     * 库房类型
     */
    houseType?: string;
    /**
     * 创建人
     */
    creater?: string;
    /**
     * 创建时间
     */
    create_at?: string;
    /**
     * 0表示启用，1表示禁用
     */
    closed?: number;
    /**
     * 更新人
     */
    updater?: string;
    /**
     * 更新时间
     */
    updateAt?: string;
  }[];
}

/**
 * 接口 [托盘标签生成↗](https://yapi.sharing8.cn/project/529/interface/api/31623) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray`
 * @更新时间 `2023-12-19 17:13:59`
 */
export interface PostApiCoreBankTrayRequest {
  /**
   * 托盘数量
   */
  trayNumber: number;
}

/**
 * 接口 [托盘标签生成↗](https://yapi.sharing8.cn/project/529/interface/api/31623) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray`
 * @更新时间 `2023-12-19 17:13:59`
 */
export interface PostApiCoreBankTrayResponse {
  /**
   * 标签样式json数据
   */
  style: string;
}

/**
 * 接口 [托盘标签确认↗](https://yapi.sharing8.cn/project/529/interface/api/31629) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray`
 * @更新时间 `2023-12-19 17:39:26`
 */
export interface PutApiCoreBankTrayRequest {
  trayNo: string;
  /**
   * confirm表示成功，cancel表示失败
   */
  action: string;
}

/**
 * 接口 [托盘标签确认↗](https://yapi.sharing8.cn/project/529/interface/api/31629) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray`
 * @更新时间 `2023-12-19 17:39:26`
 */
export interface PutApiCoreBankTrayResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [托盘详情查询↗](https://yapi.sharing8.cn/project/529/interface/api/31632) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/{trayNo}`
 * @更新时间 `2023-12-18 11:25:34`
 */
export interface GetApiCoreBankTrayTrayNoRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
}

/**
 * 接口 [托盘详情查询↗](https://yapi.sharing8.cn/project/529/interface/api/31632) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/{trayNo}`
 * @更新时间 `2023-12-18 11:25:34`
 */
export interface GetApiCoreBankTrayTrayNoResponse {}

/**
 * 接口 [托盘绑定\/解绑箱↗](https://yapi.sharing8.cn/project/529/interface/api/31641) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/box`
 * @更新时间 `2023-12-18 15:33:26`
 */
export interface PostApiCoreBankTrayBoxRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
  /**
   * 箱列表
   */
  boxes: string[];
  /**
   * bind-绑定，unbind-解绑
   */
  type: string;
}

/**
 * 接口 [托盘绑定\/解绑箱↗](https://yapi.sharing8.cn/project/529/interface/api/31641) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/box`
 * @更新时间 `2023-12-18 15:33:26`
 */
export interface PostApiCoreBankTrayBoxResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [托盘入库提交↗](https://yapi.sharing8.cn/project/529/interface/api/31644) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/warehouse/reception`
 * @更新时间 `2023-12-20 21:16:03`
 */
export interface PostApiCoreBankTrayWarehouseReceptionRequest {
  /**
   * 审批单号
   */
  applicationNo?: string;
  /**
   * 入库托盘信息
   */
  recInfo: {
    /**
     * 托盘编号
     */
    trayNo: string;
    /**
     * 区域编号
     */
    wareHouseNo?: string;
    /**
     * 货位编号
     */
    locationNo?: string;
  }[];
}

/**
 * 接口 [托盘入库提交↗](https://yapi.sharing8.cn/project/529/interface/api/31644) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/warehouse/reception`
 * @更新时间 `2023-12-20 21:16:03`
 */
export interface PostApiCoreBankTrayWarehouseReceptionResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [托盘入库确认\/取消↗](https://yapi.sharing8.cn/project/529/interface/api/31647) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray/warehouse/reception`
 * @更新时间 `2023-12-18 14:39:05`
 */
export interface PutApiCoreBankTrayWarehouseReceptionRequest {
  /**
   * 入库单号
   */
  recNo: string;
  /**
   * confirm-入库成功，cancel-入库失败
   */
  action: string;
}

/**
 * 接口 [托盘入库确认\/取消↗](https://yapi.sharing8.cn/project/529/interface/api/31647) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray/warehouse/reception`
 * @更新时间 `2023-12-18 14:39:05`
 */
export interface PutApiCoreBankTrayWarehouseReceptionResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [托盘出库提交↗](https://yapi.sharing8.cn/project/529/interface/api/31653) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/warehouse/deliver`
 * @更新时间 `2023-12-22 16:59:08`
 */
export interface PostApiCoreBankTrayWarehouseDeliverRequest {
  /**
   * 生产指令编号
   */
  orderNo?: string;
  /**
   * 审批单号
   */
  applicationNo?: string;
  /**
   * 出库托盘信息
   */
  dlvInfo: string[];
  /**
   * 站点id，如果是高架库出库的时候必填
   */
  siteId?: string;
}

/**
 * 接口 [托盘出库提交↗](https://yapi.sharing8.cn/project/529/interface/api/31653) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/warehouse/deliver`
 * @更新时间 `2023-12-22 16:59:08`
 */
export interface PostApiCoreBankTrayWarehouseDeliverResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [托盘出库确认\/取消↗](https://yapi.sharing8.cn/project/529/interface/api/31656) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray/warehouse/deliver`
 * @更新时间 `2023-12-18 14:46:43`
 */
export interface PutApiCoreBankTrayWarehouseDeliverRequest {
  /**
   * 出库单号
   */
  dlvNo: string;
  /**
   * confirm-出库成功，cancel-出库失败
   */
  action: string;
}

/**
 * 接口 [托盘出库确认\/取消↗](https://yapi.sharing8.cn/project/529/interface/api/31656) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray/warehouse/deliver`
 * @更新时间 `2023-12-18 14:46:43`
 */
export interface PutApiCoreBankTrayWarehouseDeliverResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [托盘转移提交↗](https://yapi.sharing8.cn/project/529/interface/api/31659) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/warehouse/move`
 * @更新时间 `2024-01-27 14:35:27`
 */
export interface PostApiCoreBankTrayWarehouseMoveRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
  /**
   * 目标货位
   */
  targetLocatonNo?: string;
}

/**
 * 接口 [托盘转移提交↗](https://yapi.sharing8.cn/project/529/interface/api/31659) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/warehouse/move`
 * @更新时间 `2024-01-27 14:35:27`
 */
export interface PostApiCoreBankTrayWarehouseMoveResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [托盘转移确认\/取消↗](https://yapi.sharing8.cn/project/529/interface/api/31668) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray/warehouse/move`
 * @更新时间 `2023-12-18 14:56:35`
 */
export interface PutApiCoreBankTrayWarehouseMoveRequest {
  moveId: string;
  /**
   * confirm-转移成功，cancel-转移失败
   */
  action: string;
}

/**
 * 接口 [托盘转移确认\/取消↗](https://yapi.sharing8.cn/project/529/interface/api/31668) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray/warehouse/move`
 * @更新时间 `2023-12-18 14:56:35`
 */
export interface PutApiCoreBankTrayWarehouseMoveResponse {
  /**
   * 响应码
   */
  code?: string;
  /**
   * 响应信息
   */
  msg?: string;
}

/**
 * 接口 [托盘报废↗](https://yapi.sharing8.cn/project/529/interface/api/31677) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray/useless`
 * @更新时间 `2024-01-13 15:39:56`
 */
export interface PutApiCoreBankTrayUselessRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
  /**
   * 复核人
   */
  rechecker: string;
}

/**
 * 接口 [托盘报废↗](https://yapi.sharing8.cn/project/529/interface/api/31677) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray/useless`
 * @更新时间 `2024-01-13 15:39:56`
 */
export interface PutApiCoreBankTrayUselessResponse {
  /**
   * 响应码
   */
  code: string;
  /**
   * 响应信息
   */
  msg: string;
}

/**
 * 接口 [查询指定托盘下的所有浆箱信息↗](https://yapi.sharing8.cn/project/529/interface/api/31803) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/box/{trayNo}`
 * @更新时间 `2023-12-23 16:57:06`
 */
export interface GetApiCoreBankTrayBoxTrayNoRequest {
  /**
   * 托盘号
   */
  trayNo: string;
}

/**
 * 接口 [查询指定托盘下的所有浆箱信息↗](https://yapi.sharing8.cn/project/529/interface/api/31803) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/box/{trayNo}`
 * @更新时间 `2023-12-23 16:57:06`
 */
export type GetApiCoreBankTrayBoxTrayNoResponse = {
  /**
   * 箱号
   */
  boxNo?: string;
}[];

/**
 * 接口 [查询指定托盘所在的库房↗](https://yapi.sharing8.cn/project/529/interface/api/31806) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/warehouse/tray/{trayNo}`
 * @更新时间 `2023-12-23 19:13:41`
 */
export interface GetApiCoreBankWarehouseTrayTrayNoRequest {
  /**
   * 托盘号
   */
  trayNo: string;
}

/**
 * 接口 [查询指定托盘所在的库房↗](https://yapi.sharing8.cn/project/529/interface/api/31806) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/warehouse/tray/{trayNo}`
 * @更新时间 `2023-12-23 19:13:41`
 */
export interface GetApiCoreBankWarehouseTrayTrayNoResponse {
  houseNo: string;
  houseName: string;
  houseType: string;
}

/**
 * 接口 [托盘重绑（血浆验收）↗](https://yapi.sharing8.cn/project/529/interface/api/32242) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/box/verify`
 * @更新时间 `2024-01-13 09:38:06`
 */
export interface PostApiCoreBankTrayBoxVerifyRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
  /**
   * bind-绑定，unbind-解绑
   */
  type: string;
  /**
   * 箱号列表
   */
  boxes: string[];
}

/**
 * 接口 [托盘重绑（血浆验收）↗](https://yapi.sharing8.cn/project/529/interface/api/32242) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/box/verify`
 * @更新时间 `2024-01-13 09:38:06`
 */
export interface PostApiCoreBankTrayBoxVerifyResponse {
  code: string;
  msg: string;
}

/**
 * 接口 [校验托盘是否在库↗](https://yapi.sharing8.cn/project/529/interface/api/32252) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/instore/{trayNo}`
 * @更新时间 `2024-01-15 10:16:18`
 */
export interface GetApiCoreBankTrayInstoreTrayNoRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
}

/**
 * 接口 [校验托盘是否在库↗](https://yapi.sharing8.cn/project/529/interface/api/32252) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/instore/{trayNo}`
 * @更新时间 `2024-01-15 10:16:18`
 */
export type GetApiCoreBankTrayInstoreTrayNoResponse = boolean;

/* prettier-ignore-end */
