/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [不合格登记↗](https://yapi.sharing8.cn/project/529/interface/api/31794) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified`
 * @更新时间 `2023-12-23 17:40:52`
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
}

/**
 * 接口 [不合格登记↗](https://yapi.sharing8.cn/project/529/interface/api/31794) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified`
 * @更新时间 `2023-12-23 17:40:52`
 */
export type PostApiCoreBagUnqualifiedResponse = null;

/**
 * 接口 [不合格箱管理列表↗](https://yapi.sharing8.cn/project/529/interface/api/32133) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `GET /api/core/bank/unqualified/boxes`
 * @更新时间 `2024-01-06 16:52:49`
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
 * @更新时间 `2024-01-06 16:52:49`
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
 * @更新时间 `2024-01-06 10:45:49`
 */
export interface PostApiCoreBankUnqualifiedBoxRequest {
  /**
   * 不合格原因
   */
  unqReason: string;
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
 * @更新时间 `2024-01-06 10:45:49`
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
 * @更新时间 `2024-01-06 14:30:42`
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
 * @更新时间 `2024-01-06 14:30:42`
 */
export interface PostApiCoreBankDeliverPlasmaSelectedOutResponse {
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
