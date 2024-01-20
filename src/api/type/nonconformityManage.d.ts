/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [血浆不合格登记↗](https://yapi.sharing8.cn/project/529/interface/api/31794) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified`
 * @更新时间 `2024-01-18 14:29:47`
 */
export interface PostApiCoreBagUnqualifiedRequest {
  /**
   * 不合格原因
   */
  fkFailedCode: string;
  /**
   * 复核人
   */
  checker: string;
  /**
   * 血浆编号
   */
  fkBagNo: string;
  lack?: string;
  remark?: string;
  /**
   * 区分页面用（验收弹窗）
   */
  pageFlag?: string;
}

/**
 * 接口 [血浆不合格登记↗](https://yapi.sharing8.cn/project/529/interface/api/31794) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified`
 * @更新时间 `2024-01-18 14:29:47`
 */
export type PostApiCoreBagUnqualifiedResponse = null;

/**
 * 接口 [不合格箱管理列表↗](https://yapi.sharing8.cn/project/529/interface/api/32133) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `GET /api/core/bank/unqualified/boxes`
 * @更新时间 `2024-01-19 10:24:50`
 */
export interface GetApiCoreBankUnqualifiedBoxesRequest {
  /**
   * 箱号
   */
  boxNo?: string;
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [不合格箱管理列表↗](https://yapi.sharing8.cn/project/529/interface/api/32133) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `GET /api/core/bank/unqualified/boxes`
 * @更新时间 `2024-01-19 10:24:50`
 */
export interface GetApiCoreBankUnqualifiedBoxesResponse {
  totalCount?: number;
  pageSize?: null;
  currPage?: null;
  totalPage?: null;
  result?: {
    /**
     * 箱号
     */
    boxNo: string;
    /**
     * 容量
     */
    capacity: string;
    /**
     * 已存放血浆数量（袋）
     */
    bagNum: string;
    /**
     * 不合格原因
     */
    unqReason: string;
    /**
     * 库房编号
     */
    houseNo: string;
    /**
     * 库房名称
     */
    houseName: string;
  }[];
}

/**
 * 接口 [不合格箱管理新增↗](https://yapi.sharing8.cn/project/529/interface/api/32136) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bank/unqualified/box`
 * @更新时间 `2024-01-08 10:42:08`
 */
export interface PostApiCoreBankUnqualifiedBoxRequest {
  /**
   * 不合格原因
   */
  unqReason: string;
  unqReasonKey: string;
  /**
   * 容量
   */
  capacity: string;
  /**
   * 不合格库房编号
   */
  houseNo: string;
}

/**
 * 接口 [不合格箱管理新增↗](https://yapi.sharing8.cn/project/529/interface/api/32136) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bank/unqualified/box`
 * @更新时间 `2024-01-08 10:42:08`
 */
export interface PostApiCoreBankUnqualifiedBoxResponse {}

/**
 * 接口 [不合格箱编辑↗](https://yapi.sharing8.cn/project/529/interface/api/32142) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `PUT /api/core/bank/unqualified/box`
 * @更新时间 `2024-01-06 10:52:52`
 */
export interface PutApiCoreBankUnqualifiedBoxRequest {
  /**
   * 箱号
   */
  boxNo: string;
  /**
   * 容量
   */
  capacity: string;
}

/**
 * 接口 [不合格箱编辑↗](https://yapi.sharing8.cn/project/529/interface/api/32142) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `PUT /api/core/bank/unqualified/box`
 * @更新时间 `2024-01-06 10:52:52`
 */
export interface PutApiCoreBankUnqualifiedBoxResponse {}

/**
 * 接口 [不合格箱撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32154) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `DELETE /api/core/bank/unqualified/box/{boxNo}`
 * @更新时间 `2024-01-06 16:56:08`
 */
export interface DeleteApiCoreBankUnqualifiedBoxBoxNoRequest {
  /**
   * 箱号
   */
  boxNo: string;
}

/**
 * 接口 [不合格箱撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32154) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `DELETE /api/core/bank/unqualified/box/{boxNo}`
 * @更新时间 `2024-01-06 16:56:08`
 */
export interface DeleteApiCoreBankUnqualifiedBoxBoxNoResponse {}

/**
 * 接口 [不合格血浆挑浆↗](https://yapi.sharing8.cn/project/529/interface/api/32163) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified/pick`
 * @更新时间 `2024-01-08 11:27:08`
 */
export interface PostApiCoreBagUnqualifiedPickRequest {
  /**
   * 复核人
   */
  reviewer: string;
  /**
   * 不合格血浆编号
   */
  bagNo: string;
  /**
   * 暂存浆库编号
   */
  bankNo: string;
}

/**
 * 接口 [不合格血浆挑浆↗](https://yapi.sharing8.cn/project/529/interface/api/32163) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified/pick`
 * @更新时间 `2024-01-08 11:27:08`
 */
export interface PostApiCoreBagUnqualifiedPickResponse {}

/**
 * 接口 [不合格浆袋入库↗](https://yapi.sharing8.cn/project/529/interface/api/32166) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified/in-store`
 * @更新时间 `2024-01-08 11:24:10`
 */
export interface PostApiCoreBagUnqualifiedInStoreRequest {
  /**
   * 复核人
   */
  reviewer: string;
  /**
   * 不合格箱号
   */
  boxNo: string;
  /**
   * 不合格血浆编号
   */
  bagNo: string;
}

/**
 * 接口 [不合格浆袋入库↗](https://yapi.sharing8.cn/project/529/interface/api/32166) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified/in-store`
 * @更新时间 `2024-01-08 11:24:10`
 */
export interface PostApiCoreBagUnqualifiedInStoreResponse {}

/**
 * 接口 [不合格血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/32169) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified/process/{bagNo}`
 * @更新时间 `2024-01-08 11:30:24`
 */
export interface PostApiCoreBagUnqualifiedProcessBagNoRequest {
  /**
   * 不合格浆袋编号
   */
  bagNo: string;
}

/**
 * 接口 [不合格血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/32169) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified/process/{bagNo}`
 * @更新时间 `2024-01-08 11:30:24`
 */
export interface PostApiCoreBagUnqualifiedProcessBagNoResponse {}

/**
 * 接口 [不合格浆袋审核撤回↗](https://yapi.sharing8.cn/project/529/interface/api/32172) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `DELETE /api/core/bag/unqualified/process/{bagNo}`
 * @更新时间 `2024-01-08 11:31:27`
 */
export interface DeleteApiCoreBagUnqualifiedProcessBagNoRequest {
  /**
   * 浆袋编号
   */
  bagNo: string;
}

/**
 * 接口 [不合格浆袋审核撤回↗](https://yapi.sharing8.cn/project/529/interface/api/32172) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `DELETE /api/core/bag/unqualified/process/{bagNo}`
 * @更新时间 `2024-01-08 11:31:27`
 */
export interface DeleteApiCoreBagUnqualifiedProcessBagNoResponse {}

/**
 * 接口 [不合格血浆详情↗](https://yapi.sharing8.cn/project/529/interface/api/32175) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `GET /api/core/bag/unqualified/{bagNo}`
 * @更新时间 `2024-01-10 11:16:08`
 */
export interface GetApiCoreBagUnqualifiedBagNoRequest {
  bagNo: string;
}

/**
 * 接口 [不合格血浆详情↗](https://yapi.sharing8.cn/project/529/interface/api/32175) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `GET /api/core/bag/unqualified/{bagNo}`
 * @更新时间 `2024-01-10 11:16:08`
 */
export interface GetApiCoreBagUnqualifiedBagNoResponse {
  /**
   * 血浆编号
   */
  bagNo?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 血浆箱号
   */
  boxNo?: string;
  /**
   * 采浆公司
   */
  stationName?: number;
  /**
   * 浆员编号
   */
  donorNo?: string;
  /**
   * 浆员姓名
   */
  donorName?: number;
  /**
   * 浆员状态
   */
  donorStatus?: string;
  /**
   * 性别
   */
  gender?: string;
  /**
   * 血型
   */
  bloodType?: string;
  /**
   * 采浆日期
   */
  collDate?: string;
  /**
   * 浆站重量
   */
  stationWeight?: string;
  /**
   * 验收净重
   */
  acceptWeight?: string;
  /**
   * 不合格原因
   */
  unqReason?: string;
  /**
   * 血浆流程状态
   */
  plasmaState?: string;
  /**
   * 存放位置
   */
  bankName?: string;
  /**
   * 不合格登记日期
   */
  registerDate?: string;
  /**
   * 登记人
   */
  register?: string;
  /**
   * 登记复核人
   */
  registerReviewer?: string;
  /**
   * 挑浆日期
   */
  pickDate?: string;
  /**
   * 挑浆人
   */
  picker?: string;
  /**
   * 挑浆复核人
   */
  pickReviewer?: string;
  /**
   * 入库日期
   */
  inStoreDate?: string;
  /**
   * 入库人
   */
  inStoreOpt?: string;
  /**
   * 入库复核人
   */
  inStoreReviewer?: string;
  /**
   * 入库审核日期
   */
  processDate?: string;
  /**
   * 审核人
   */
  processor?: string;
  /**
   * 出库申请单号
   */
  outStoreOrderNo?: string;
  /**
   * 出库日期
   */
  outStoreDate?: string;
  /**
   * 出库人
   */
  outStoreOpt?: string;
  /**
   * 申请人
   */
  proposer?: string;
  /**
   * 申请单位
   */
  applicantCompany?: string;
  /**
   * 出库申请日期
   */
  outReviewDate?: string;
  /**
   * 出库审核人
   */
  outReviewer?: string;
  /**
   * 出库用途
   */
  outPurpose?: string;
  /**
   * 不合格出库日期
   */
  unqOutDate?: string;
  /**
   * 不合格操作人
   */
  unqOutOpt?: string;
}

/**
 * 接口 [不合格血浆列表↗](https://yapi.sharing8.cn/project/529/interface/api/32181) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `GET /api/core/bag/unqualified`
 * @更新时间 `2024-01-18 11:21:47`
 */
export interface GetApiCoreBagUnqualifiedRequest {
  pageSize: string;
  currPage: string;
  /**
   * 采浆公司编号
   */
  stationNo?: string;
  /**
   * 血浆批次号
   */
  batchNo?: string;
  /**
   * 浆袋号
   */
  bagNo?: string;
  /**
   * 浆员编号
   */
  fkDonorNo?: string;
  /**
   * 浆员姓名
   */
  donorName?: string;
  /**
   * 不合格原因
   */
  unqReason?: string;
  /**
   * 状态
   */
  state?: string;
  /**
   * 入库时间
   */
  inStoreStartDate?: string;
  /**
   * 入库时间
   */
  inStoreEndDate?: string;
  /**
   * 出库时间
   */
  outStoreStartDate?: string;
  /**
   * 出库时间
   */
  outStoreEndDate?: string;
}

/**
 * 接口 [不合格血浆列表↗](https://yapi.sharing8.cn/project/529/interface/api/32181) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `GET /api/core/bag/unqualified`
 * @更新时间 `2024-01-18 11:21:47`
 */
export interface GetApiCoreBagUnqualifiedResponse {
  totalCount?: number;
  pageSize?: null;
  currPage?: null;
  totalPage?: null;
  result?: {
    /**
     * 浆站编码
     */
    stationNo: string;
    /**
     * 血浆批号
     */
    batchNo: string;
    /**
     * 浆袋号
     */
    bagNo: string;
    /**
     * 浆员编号
     */
    donorNo: string;
    /**
     * 浆员姓名
     */
    donorName: string;
    /**
     * 不合格原因
     */
    unqReason: string;
    /**
     * 状态
     */
    state: string;
    /**
     * 入库日期
     */
    inStoreDate?: string;
    /**
     * 出库日期
     */
    outStoreDate?: string;
    /**
     * 验收人
     */
    receiver?: string;
    /**
     * 验收日期
     */
    verifyAt?: string;
  }[];
}

/**
 * 接口 [不合格血浆批量挑浆↗](https://yapi.sharing8.cn/project/529/interface/api/32547) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified/pick/batch`
 * @更新时间 `2024-01-18 11:24:39`
 */
export interface PostApiCoreBagUnqualifiedPickBatchRequest {
  /**
   * 复核人
   */
  reviewer: string;
  bagNos: string[];
  /**
   * 库房编号
   */
  bankNo: string;
}

/**
 * 接口 [不合格血浆批量挑浆↗](https://yapi.sharing8.cn/project/529/interface/api/32547) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified/pick/batch`
 * @更新时间 `2024-01-18 11:24:39`
 */
export interface PostApiCoreBagUnqualifiedPickBatchResponse {}

/**
 * 接口 [查询不合格出库申请单列表↗](https://yapi.sharing8.cn/project/529/interface/api/32073) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/delivers`
 * @更新时间 `2024-01-06 10:48:48`
 */
export interface PostApiCoreBankDeliversRequest {
  currPage: string;
  pageSize: string;
  /**
   * 申请单号
   */
  dlvNo?: string;
  /**
   * 申请日期开始
   */
  begnDate?: string;
  /**
   * 申请日期结束
   */
  endDate?: string;
  /**
   * 出库用途   DET("0","销毁"),     TRF("1","转移")
   */
  useTo?: string;
  /**
   * 状态 AUT("0","AUT","待审核"),     TBO("1","TBO","待出库"),     OTI("2","TBO","出库中"),     OBD("3","OBD","已出库");
   */
  state?: string;
}

/**
 * 接口 [查询不合格出库申请单列表↗](https://yapi.sharing8.cn/project/529/interface/api/32073) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/delivers`
 * @更新时间 `2024-01-06 10:48:48`
 */
export interface PostApiCoreBankDeliversResponse {
  totalCount: number;
  pageSize: null;
  totalPage?: null;
  currPage: null;
  result?: {
    /**
     * 申请单号
     */
    dlvNo: string;
    /**
     * 出库用途
     */
    useTo: string;
    /**
     * 血浆总数
     */
    count: string;
    /**
     * 申请单位
     */
    applicationUnit: string;
    /**
     * 申请人
     */
    applicant: string;
    /**
     * 申请原因
     */
    applicationCause: string;
    /**
     * 申请日期
     */
    applicationAt: string;
    /**
     * 审核日期
     */
    reviewAt: string;
    /**
     * 审核人
     */
    reviewer: string;
    /**
     * 状态
     */
    reviewState: string;
    /**
     * 审核状态
     */
    state: string;
    /**
     * 记录人
     */
    creator: string;
    /**
     * 记录日期
     */
    createAt: string;
    /**
     * 出库扫描日期
     */
    finishAt: string;
  }[];
}

/**
 * 接口 [新增不合格出库申请单↗](https://yapi.sharing8.cn/project/529/interface/api/32076) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver`
 * @更新时间 `2024-01-05 17:18:07`
 */
export interface PostApiCoreBankDeliverRequest {
  applicant: string;
  applicationAt?: string;
  useTo: string;
  /**
   * 申请原因
   */
  applicationCause?: string;
  /**
   * 部门
   */
  applicationUnit?: string;
  /**
   * 血浆编号列表
   */
  plasmaNos?: string[];
}

/**
 * 接口 [新增不合格出库申请单↗](https://yapi.sharing8.cn/project/529/interface/api/32076) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver`
 * @更新时间 `2024-01-05 17:18:07`
 */
export type PostApiCoreBankDeliverResponse = string;

/**
 * 接口 [查询不合格血浆明细列表↗](https://yapi.sharing8.cn/project/529/interface/api/32079) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/plasma`
 * @更新时间 `2024-01-06 10:49:32`
 */
export interface PostApiCoreBankDeliverPlasmaRequest {
  currPage: string;
  pageSize: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 不合格原因
   */
  fkFailedCode?: string;
  /**
   * 血浆编号
   */
  bagNo?: string;
  /**
   * 浆员编号
   */
  fkDonorNo?: string;
}

/**
 * 接口 [查询不合格血浆明细列表↗](https://yapi.sharing8.cn/project/529/interface/api/32079) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/plasma`
 * @更新时间 `2024-01-06 10:49:32`
 */
export interface PostApiCoreBankDeliverPlasmaResponse {
  totalCount: number;
  pageSize: null;
  currPage: null;
  totalPage: null;
  result?: {
    /**
     * 血浆批号
     */
    batchNo: string;
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 浆员编号
     */
    donorNo: string;
    /**
     * 浆员姓名
     */
    donorName: string;
    /**
     * 不合格原因
     */
    failed: string;
    /**
     * 入库日期
     */
    indate: string;
  }[];
}

/**
 * 接口 [修改不合格出库申请单↗](https://yapi.sharing8.cn/project/529/interface/api/32082) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `PUT /api/core/bank/deliver`
 * @更新时间 `2024-01-05 17:18:24`
 */
export interface PutApiCoreBankDeliverRequest {
  applicant?: string;
  applicationAt?: string;
  useTo?: string;
  applicationCause?: string;
  applicationUnit?: string;
  plasmaNos?: string[];
  /**
   * 申请单号
   */
  dlvNo: string;
}

/**
 * 接口 [修改不合格出库申请单↗](https://yapi.sharing8.cn/project/529/interface/api/32082) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `PUT /api/core/bank/deliver`
 * @更新时间 `2024-01-05 17:18:24`
 */
export type PutApiCoreBankDeliverResponse = string;

/**
 * 接口 [删除不合格出库申请单↗](https://yapi.sharing8.cn/project/529/interface/api/32085) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `DELETE /api/core/bank/deliver`
 * @更新时间 `2024-01-06 15:45:07`
 */
export interface DeleteApiCoreBankDeliverRequest {
  no: string;
  cause: string;
}

/**
 * 接口 [删除不合格出库申请单↗](https://yapi.sharing8.cn/project/529/interface/api/32085) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `DELETE /api/core/bank/deliver`
 * @更新时间 `2024-01-06 15:45:07`
 */
export type DeleteApiCoreBankDeliverResponse = string;

/**
 * 接口 [不合格出库申请单审核↗](https://yapi.sharing8.cn/project/529/interface/api/32088) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `PUT /api/core/bank/preview/review/{no}`
 * @更新时间 `2024-01-05 19:13:29`
 */
export interface PutApiCoreBankPreviewReviewNoRequest {
  no: string;
}

/**
 * 接口 [不合格出库申请单审核↗](https://yapi.sharing8.cn/project/529/interface/api/32088) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `PUT /api/core/bank/preview/review/{no}`
 * @更新时间 `2024-01-05 19:13:29`
 */
export type PutApiCoreBankPreviewReviewNoResponse = string;

/**
 * 接口 [不合格出库申请单审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32091) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `PUT /api/core/bank/preview/review/revoke`
 * @更新时间 `2024-01-05 19:13:38`
 */
export interface PutApiCoreBankPreviewReviewRevokeRequest {
  no: string;
  cause: string;
}

/**
 * 接口 [不合格出库申请单审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32091) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `PUT /api/core/bank/preview/review/revoke`
 * @更新时间 `2024-01-05 19:13:38`
 */
export type PutApiCoreBankPreviewReviewRevokeResponse = string;

/**
 * 接口 [查询不合格血浆出库申请单详情↗](https://yapi.sharing8.cn/project/529/interface/api/32097) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `GET /api/core/bank/deliver/{no}`
 * @更新时间 `2024-01-06 16:02:31`
 */
export interface GetApiCoreBankDeliverNoRequest {
  no: string;
}

/**
 * 接口 [查询不合格血浆出库申请单详情↗](https://yapi.sharing8.cn/project/529/interface/api/32097) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `GET /api/core/bank/deliver/{no}`
 * @更新时间 `2024-01-06 16:02:31`
 */
export interface GetApiCoreBankDeliverNoResponse {
  applicant?: string;
  applicationAt?: string;
  useTo?: string;
  applicationCause?: string;
  applicationUnit?: string;
}

/**
 * 接口 [扫描出库↗](https://yapi.sharing8.cn/project/529/interface/api/32109) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/detail/out`
 * @更新时间 `2024-01-06 15:52:19`
 */
export interface PostApiCoreBankDeliverDetailOutRequest {
  /**
   * 申请单号
   */
  no: string;
  /**
   * 血浆号
   */
  bagNo: string;
}

/**
 * 接口 [扫描出库↗](https://yapi.sharing8.cn/project/529/interface/api/32109) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/detail/out`
 * @更新时间 `2024-01-06 15:52:19`
 */
export type PostApiCoreBankDeliverDetailOutResponse = string;

/**
 * 接口 [查询已选择的不合格血浆明细↗](https://yapi.sharing8.cn/project/529/interface/api/32139) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/plasma/selected`
 * @更新时间 `2024-01-06 10:51:53`
 */
export interface PostApiCoreBankDeliverPlasmaSelectedRequest {
  currPage: string;
  pageSize: string;
  /**
   * 申请单号
   */
  dlvNo?: string;
}

/**
 * 接口 [查询已选择的不合格血浆明细↗](https://yapi.sharing8.cn/project/529/interface/api/32139) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/plasma/selected`
 * @更新时间 `2024-01-06 10:51:53`
 */
export interface PostApiCoreBankDeliverPlasmaSelectedResponse {
  totalCount: number;
  pageSize: null;
  currPage: null;
  totalPage: null;
  result?: {
    /**
     * 血浆批号
     */
    batchNo: string;
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 浆员编号
     */
    donorNo: string;
    /**
     * 浆员姓名
     */
    donorName: string;
    /**
     * 不合格原因
     */
    failed: string;
    /**
     * 入库日期
     */
    indate: string;
  }[];
}

/**
 * 接口 [查询已选择的未出库不合格血浆明细↗](https://yapi.sharing8.cn/project/529/interface/api/32145) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/plasma/selected/NotOut`
 * @更新时间 `2024-01-06 11:19:29`
 */
export interface PostApiCoreBankDeliverPlasmaSelectedNotOutRequest {
  currPage: string;
  pageSize: string;
  /**
   * 申请单号
   */
  dlvNo?: string;
}

/**
 * 接口 [查询已选择的未出库不合格血浆明细↗](https://yapi.sharing8.cn/project/529/interface/api/32145) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/plasma/selected/NotOut`
 * @更新时间 `2024-01-06 11:19:29`
 */
export interface PostApiCoreBankDeliverPlasmaSelectedNotOutResponse {
  totalCount: number;
  pageSize: null;
  currPage: null;
  totalPage: null;
  result?: {
    /**
     * 血浆批号
     */
    batchNo: string;
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 浆员编号
     */
    donorNo: string;
    /**
     * 浆员姓名
     */
    donorName: string;
    /**
     * 不合格原因
     */
    failed: string;
    /**
     * 入库日期
     */
    indate: string;
  }[];
}

/**
 * 接口 [查询已出库的血浆↗](https://yapi.sharing8.cn/project/529/interface/api/32148) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/plasma/selected/out`
 * @更新时间 `2024-01-06 20:23:46`
 */
export interface PostApiCoreBankDeliverPlasmaSelectedOutRequest {
  currPage: string;
  pageSize: string;
  /**
   * 申请单号
   */
  dlvNo?: string;
}

/**
 * 接口 [查询已出库的血浆↗](https://yapi.sharing8.cn/project/529/interface/api/32148) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/plasma/selected/out`
 * @更新时间 `2024-01-06 20:23:46`
 */
export interface PostApiCoreBankDeliverPlasmaSelectedOutResponse {
  totalCount: number;
  pageSize: null;
  currPage: null;
  totalPage: null;
  result?: {
    /**
     * 出库人
     */
    operator: string;
    /**
     * 血浆编号
     */
    bagNo: string;
    /**
     * 出库日期
     */
    operateAt: string;
  }[];
}

/**
 * 接口 [新增不合格明细↗](https://yapi.sharing8.cn/project/529/interface/api/32151) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/detail`
 * @更新时间 `2024-01-06 16:56:10`
 */
export interface PostApiCoreBankDeliverDetailRequest {
  plasmaNos: string[];
  dlvNo: string;
}

/**
 * 接口 [新增不合格明细↗](https://yapi.sharing8.cn/project/529/interface/api/32151) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `POST /api/core/bank/deliver/detail`
 * @更新时间 `2024-01-06 16:56:10`
 */
export type PostApiCoreBankDeliverDetailResponse = string;

/**
 * 接口 [移除不合格明细↗](https://yapi.sharing8.cn/project/529/interface/api/32157) 的 **请求类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `DELETE /api/core/bank/deliver/detail/{bagNo}`
 * @更新时间 `2024-01-06 17:11:09`
 */
export interface DeleteApiCoreBankDeliverDetailBagNoRequest {
  bagNo: string;
}

/**
 * 接口 [移除不合格明细↗](https://yapi.sharing8.cn/project/529/interface/api/32157) 的 **返回类型**
 *
 * @分类 [不合格出库↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5369)
 * @请求头 `DELETE /api/core/bank/deliver/detail/{bagNo}`
 * @更新时间 `2024-01-06 17:11:09`
 */
export type DeleteApiCoreBankDeliverDetailBagNoResponse = string;

/* prettier-ignore-end */
