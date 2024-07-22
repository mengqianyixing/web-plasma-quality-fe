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
 * @更新时间 `2024-06-17 19:45:11`
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
  /**
   * 样本编号
   */
  sampleNo?: string;
  /**
   * 是否在库，0表示不在库，1表示在库
   */
  inBank?: string;
  /**
   * 查询业务流程节点，plasmaVerify表示血浆验收阶段查询托盘列表
   */
  queryFlow?: string;
  /**
   * 标识出库列表还是入库列表，"out"表示查询待验收的血浆所在的出库托盘列表，"in"表示查询已验收的血浆所在的入库托盘列表
   */
  inOut?: string;
  /**
   * 存放类型，通过查询枚举类BankTrayTypeEnum
   */
  trayType?: string;
  /**
   * 入库状态，通过查询枚举类trayStatus
   */
  trayStatus?: string;
  /**
   * 负载状态，0-空载，1-负载
   */
  useStatus?: string;
  /**
   * 样本袋号
   */
  packNo?: string;
}

/**
 * 接口 [托盘列表查询↗](https://yapi.sharing8.cn/project/529/interface/api/31620) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/traies`
 * @更新时间 `2024-06-17 19:45:11`
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
    /**
     * DLV-出库中,REC-入库中,MVE-移库中,FRY-越库中,IN-在库,OUT-不在库
     */
    trayStatus?: string;
    /**
     * 采浆公司，例如：简阳,南江
     */
    stationNames?: string;
    /**
     * 血浆批号，例如：12120240407,12120240408,B101107
     */
    batchNoes?: string;
    /**
     * 箱号类型，例如：WTL,WTH,RTL,TL,T,N
     */
    boxTypes?: string;
  }[];
}

/**
 * 接口 [托盘标签生成↗](https://yapi.sharing8.cn/project/529/interface/api/31623) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray`
 * @更新时间 `2024-07-18 18:40:30`
 */
export interface PostApiCoreBankTrayRequest {
  /**
   * 托盘数量，打印的时候必填
   */
  trayNumber?: number;
  /**
   * 补打托盘编号数组
   */
  trayNoList?: string[];
}

/**
 * 接口 [托盘标签生成↗](https://yapi.sharing8.cn/project/529/interface/api/31623) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray`
 * @更新时间 `2024-07-18 18:40:30`
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
 * @更新时间 `2024-03-30 15:51:23`
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
  /**
   * 具体业务场景，plasmaVerify-血浆验收，plasmaSort-血浆分拣，handwork-手工绑定解绑
   */
  bizScen?: string;
  /**
   * 投产准备号
   */
  prepareNo?: string;
}

/**
 * 接口 [托盘绑定\/解绑箱↗](https://yapi.sharing8.cn/project/529/interface/api/31641) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/box`
 * @更新时间 `2024-03-30 15:51:23`
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
 * @更新时间 `2024-03-29 17:28:59`
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
  /**
   * 托盘入库的具体业务场景，plasmaVerify-血浆验收
   */
  bizScen?: string;
}

/**
 * 接口 [托盘入库提交↗](https://yapi.sharing8.cn/project/529/interface/api/31644) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/warehouse/reception`
 * @更新时间 `2024-03-29 17:28:59`
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
 * @更新时间 `2024-06-18 11:33:35`
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
  /**
   * 保留样本单个出库RSD，批量出库RSO
   */
  dlvType?: string;
}

/**
 * 接口 [托盘出库提交↗](https://yapi.sharing8.cn/project/529/interface/api/31653) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/warehouse/deliver`
 * @更新时间 `2024-06-18 11:33:35`
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
 * @更新时间 `2024-03-06 19:41:19`
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
  /**
   * 库房编号
   */
  targetHouseNo: string;
  /**
   * 高架库出库站点编号
   */
  siteNo?: string;
}

/**
 * 接口 [托盘转移提交↗](https://yapi.sharing8.cn/project/529/interface/api/31659) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/warehouse/move`
 * @更新时间 `2024-03-06 19:41:19`
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

/**
 * 接口 [托盘移库，血浆箱列表↗](https://yapi.sharing8.cn/project/529/interface/api/34176) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/boxes`
 * @更新时间 `2024-04-03 15:45:34`
 */
export interface GetApiCoreBankTrayBoxesRequest {
  /**
   * 当前页
   */
  currPage: string;
  /**
   * 页大小
   */
  pageSize: string;
  /**
   * 采浆公司编号
   */
  stationNo?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 投产准备号
   */
  prepareNo?: string;
  /**
   * 托盘编号
   */
  trayNo?: string;
  /**
   * bind-绑定，unbind-解绑
   */
  type: string;
}

/**
 * 接口 [托盘移库，血浆箱列表↗](https://yapi.sharing8.cn/project/529/interface/api/34176) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/boxes`
 * @更新时间 `2024-04-03 15:45:34`
 */
export interface GetApiCoreBankTrayBoxesResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 采浆公司编号
     */
    stationNo?: string;
    /**
     * 采浆公司名称
     */
    stationName?: string;
    /**
     * 箱号
     */
    boxNo?: string;
    /**
     * 血浆批号
     */
    batchNo?: string;
    /**
     * 投产准备号
     */
    prepareNo?: string;
    /**
     * 袋数
     */
    bagCount?: number;
    /**
     * 类型，station-浆站箱，pick-挑拣箱
     */
    boxType?: string;
    /**
     * 托盘编号
     */
    trayNo?: string;
  }[];
}

/**
 * 接口 [托盘越库提交↗](https://yapi.sharing8.cn/project/529/interface/api/34203) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/warehouse/ferry`
 * @更新时间 `2024-04-07 14:11:50`
 */
export interface PostApiCoreBankTrayWarehouseFerryRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
  /**
   * 站点编号
   */
  siteNo: string;
}

/**
 * 接口 [托盘越库提交↗](https://yapi.sharing8.cn/project/529/interface/api/34203) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `POST /api/core/bank/tray/warehouse/ferry`
 * @更新时间 `2024-04-07 14:11:50`
 */
export interface PostApiCoreBankTrayWarehouseFerryResponse {
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
 * 接口 [托盘越库确认\/取消↗](https://yapi.sharing8.cn/project/529/interface/api/34212) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray/warehouse/ferry`
 * @更新时间 `2024-04-07 14:14:13`
 */
export interface PutApiCoreBankTrayWarehouseFerryRequest {
  /**
   * 越库单id
   */
  ferryId: string;
  /**
   * 越库结果确认，confirm表示成功，cancel表示失败
   */
  action: string;
}

/**
 * 接口 [托盘越库确认\/取消↗](https://yapi.sharing8.cn/project/529/interface/api/34212) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `PUT /api/core/bank/tray/warehouse/ferry`
 * @更新时间 `2024-04-07 14:14:13`
 */
export interface PutApiCoreBankTrayWarehouseFerryResponse {
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
 * 接口 [查询指定托盘下的所有血浆信息↗](https://yapi.sharing8.cn/project/529/interface/api/34560) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/bag/detail`
 * @更新时间 `2024-06-03 10:10:33`
 */
export interface GetApiCoreBankTrayBagDetailRequest {
  /**
   * 托盘编号
   */
  trayNo: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 血浆编号
   */
  bagNo?: string;
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 页数大小
   */
  pageSize: string;
}

/**
 * 接口 [查询指定托盘下的所有血浆信息↗](https://yapi.sharing8.cn/project/529/interface/api/34560) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/bag/detail`
 * @更新时间 `2024-06-03 10:10:33`
 */
export interface GetApiCoreBankTrayBagDetailResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 血浆批号
     */
    batchNo?: string;
    /**
     * 血浆编号
     */
    bagNo?: string;
    /**
     * 浆员编号
     */
    donorNo?: string;
    /**
     * 浆员姓名
     */
    donorName?: string;
    /**
     * 现存箱号
     */
    currBoxNo?: string;
    cardNo?: string;
  }[];
}

/**
 * 接口 [查询托盘上的保留样本袋列表↗](https://yapi.sharing8.cn/project/529/interface/api/35400) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/keeppacks`
 * @更新时间 `2024-06-17 16:45:01`
 */
export interface GetApiCoreBankTrayKeeppacksRequest {
  /**
   * 当前页码
   */
  currPage: string;
  /**
   * 页数量
   */
  pageSize: string;
  /**
   * 托盘编号
   */
  trayNo: string;
  /**
   * 样本批号
   */
  batchNo?: string;
  /**
   * 样本袋号
   */
  packNo?: string;
}

/**
 * 接口 [查询托盘上的保留样本袋列表↗](https://yapi.sharing8.cn/project/529/interface/api/35400) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/keeppacks`
 * @更新时间 `2024-06-17 16:45:01`
 */
export interface GetApiCoreBankTrayKeeppacksResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 样本批号
     */
    batchNo?: string;
    /**
     * 样本袋号
     */
    packNo?: string;
    /**
     * 样本数量
     */
    sampleCount?: number;
    /**
     * 样本箱号
     */
    boxNo?: string;
  }[];
}

/**
 * 接口 [查询指定托盘上的样本列表↗](https://yapi.sharing8.cn/project/529/interface/api/35406) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/keepsamples`
 * @更新时间 `2024-06-17 17:09:10`
 */
export interface GetApiCoreBankTrayKeepsamplesRequest {
  currPage: string;
  pageSize: string;
  /**
   * 托盘编号
   */
  trayNo: string;
  /**
   * 样本批号
   */
  batchNo?: string;
  /**
   * 样本袋号
   */
  packNo?: string;
  /**
   * 样本编号
   */
  sampleNo?: string;
}

/**
 * 接口 [查询指定托盘上的样本列表↗](https://yapi.sharing8.cn/project/529/interface/api/35406) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/keepsamples`
 * @更新时间 `2024-06-17 17:09:10`
 */
export interface GetApiCoreBankTrayKeepsamplesResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 样本批号
     */
    batchNo?: string;
    /**
     * 样本袋号
     */
    packNo?: string;
    /**
     * 样本编号
     */
    sampleNo?: string;
    /**
     * 类别
     */
    keepBy?: string;
    /**
     * 浆员编号
     */
    cardNo?: string;
    /**
     * 浆员姓名
     */
    donorName?: string;
    /**
     * 采浆日期
     */
    collectAt?: string;
    /**
     * 样本箱号
     */
    boxNo?: string;
  }[];
}

/**
 * 接口 [查询托盘移库记录列表↗](https://yapi.sharing8.cn/project/529/interface/api/36228) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/move-record`
 * @更新时间 `2024-07-20 15:09:54`
 */
export interface GetApiCoreBankTrayMoveRecordRequest {
  currPage: string;
  pageSize: string;
  /**
   * 托盘编号
   */
  trayNo?: string;
}

/**
 * 接口 [查询托盘移库记录列表↗](https://yapi.sharing8.cn/project/529/interface/api/36228) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/move-record`
 * @更新时间 `2024-07-20 15:09:54`
 */
export interface GetApiCoreBankTrayMoveRecordResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 托盘编号
     */
    trayNo?: string;
    /**
     * 原货位
     */
    sourceLocatonNo?: string;
    /**
     * 原库房
     */
    sourceHouseName?: string;
    /**
     * 目标货位
     */
    targetLocatonNo?: string;
    /**
     * 目标库房
     */
    targetHouseName?: string;
    /**
     * 操作人
     */
    operator?: string;
    /**
     * 操作时间
     */
    operateTime?: string;
    /**
     * 状态
     */
    status?: string;
    /**
     * 处理时间
     */
    dealTime?: string;
  }[];
}

/**
 * 接口 [查询托盘与箱绑定解绑记录↗](https://yapi.sharing8.cn/project/529/interface/api/36234) 的 **请求类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/bind-record`
 * @更新时间 `2024-07-20 15:18:03`
 */
export interface GetApiCoreBankTrayBindRecordRequest {
  currPage: string;
  pageSize: string;
  /**
   * 托盘号
   */
  trayNo?: string;
  /**
   * 箱号
   */
  boxNo?: string;
  /**
   * 操作类型：bind-绑定，unbind-解绑
   */
  operateType: string;
}

/**
 * 接口 [查询托盘与箱绑定解绑记录↗](https://yapi.sharing8.cn/project/529/interface/api/36234) 的 **返回类型**
 *
 * @分类 [托盘管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5229)
 * @请求头 `GET /api/core/bank/tray/bind-record`
 * @更新时间 `2024-07-20 15:18:03`
 */
export interface GetApiCoreBankTrayBindRecordResponse {
  currPage?: number;
  pageSize?: number;
  totalCount?: number;
  result?: {
    /**
     * 托盘号
     */
    trayNo?: string;
    /**
     * 箱号
     */
    boxNo?: string;
    /**
     * 操作人
     */
    operator?: string;
    /**
     * 操作时间
     */
    operateTime?: string;
  }[];
}

/* prettier-ignore-end */
