/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [血浆审核列表↗](https://yapi.sharing8.cn/project/529/interface/api/32477) 的 **请求类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `GET /api/core/batch/plasma/audits`
 * @更新时间 `2024-01-18 14:37:12`
 */
export interface GetApiCoreBatchPlasmaAuditsRequest {
  /**
   * 采浆公司编号
   */
  stationNo?: string;
  /**
   * 血浆批号
   */
  batchNo?: string;
  /**
   * 审核状态，WC-待审核，WV-待复核，WA-待批准，AD-已批准
   */
  auditState?: string;
  /**
   * 审核单号
   */
  auditId?: string;
  /**
   * 开始发布日期
   */
  releaseBeginAt?: string;
  /**
   * 结束发布日期
   */
  releaseEndAt?: string;
  /**
   * 开始审核日期
   */
  auditBeginAt?: string;
  /**
   * 结束审核日期
   */
  auditEndAt?: string;
  /**
   * 开始复核日期
   */
  recheckBeginAt?: string;
  /**
   * 结束复核日期
   */
  recheckEndAt?: string;
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
 * 接口 [血浆审核列表↗](https://yapi.sharing8.cn/project/529/interface/api/32477) 的 **返回类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `GET /api/core/batch/plasma/audits`
 * @更新时间 `2024-01-18 14:37:12`
 */
export interface GetApiCoreBatchPlasmaAuditsResponse {
  totalCount?: number;
  currPage?: null;
  totalPage?: null;
  pageSize?: null;
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
     * 血浆批号
     */
    batchNo?: string;
    /**
     * 验收日期
     */
    verifyAt?: string;
    /**
     * 验收数量
     */
    verifyCount?: number;
    /**
     * 合格血浆数量
     */
    qualifiedCount?: number;
    /**
     * 特免合格数量
     */
    titerQualifiedCount?: number;
    /**
     * 检测结果发布人
     */
    testIssuer?: string;
    /**
     * 检测结果发布日期
     */
    testIssueAt?: string;
    /**
     * 审核单号
     */
    auditId?: string;
    /**
     * 审核人
     */
    auditer?: string;
    /**
     * 审核日期
     */
    auditAt?: string;
    /**
     * 复核人
     */
    rechecker?: string;
    /**
     * 复核日期
     */
    recheckAt?: string;
    /**
     * 批准人
     */
    approver?: string;
    /**
     * 批准日期
     */
    approvalAt?: string;
    /**
     * 审核状态，WC-待审核，WV-待复核，WA-待批准，AD-已批准
     */
    auditState?: string;
  }[];
}

/**
 * 接口 [新增血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/32482) 的 **请求类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `POST /api/core/batch/plasma/audit`
 * @更新时间 `2024-01-17 19:36:38`
 */
export interface PostApiCoreBatchPlasmaAuditRequest {
  /**
   * 血浆批次号
   */
  batchNo: string;
  /**
   * 审核项目列表
   */
  auditList: {
    /**
     * 序号
     */
    sort: number;
    /**
     * 审核项目
     */
    auditItem: string;
    /**
     * 审核内容
     */
    auditContent: string;
    /**
     * 审核结果
     */
    auditResult: string;
  }[];
  /**
   * 审核结论
   */
  auditConclusion: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [新增血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/32482) 的 **返回类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `POST /api/core/batch/plasma/audit`
 * @更新时间 `2024-01-17 19:36:38`
 */
export type PostApiCoreBatchPlasmaAuditResponse = string;

/**
 * 接口 [编辑血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/32487) 的 **请求类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `PUT /api/core/batch/plasma/audit`
 * @更新时间 `2024-01-17 19:36:11`
 */
export interface PutApiCoreBatchPlasmaAuditRequest {
  /**
   * 血浆审核id
   */
  auditId: string;
  /**
   * 血浆批号
   */
  batchNo: string;
  /**
   * 审核项目列表
   */
  auditList: {
    /**
     * 序号
     */
    sort: number;
    /**
     * 审核项目
     */
    auditItem: string;
    /**
     * 审核内容
     */
    auditContent: string;
    /**
     * 审核结果
     */
    auditResult: string;
  }[];
  /**
   * 审核结论
   */
  auditConclusion: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [编辑血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/32487) 的 **返回类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `PUT /api/core/batch/plasma/audit`
 * @更新时间 `2024-01-17 19:36:11`
 */
export type PutApiCoreBatchPlasmaAuditResponse = string;

/**
 * 接口 [血浆审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32492) 的 **请求类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `PUT /api/core/batch/plasma/audit/revoke`
 * @更新时间 `2024-01-17 20:25:56`
 */
export interface PutApiCoreBatchPlasmaAuditRevokeRequest {
  /**
   * 审核id
   */
  auditId: string;
  /**
   * 撤销原因
   */
  remark: string;
}

/**
 * 接口 [血浆审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32492) 的 **返回类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `PUT /api/core/batch/plasma/audit/revoke`
 * @更新时间 `2024-01-17 20:25:56`
 */
export type PutApiCoreBatchPlasmaAuditRevokeResponse = string;

/**
 * 接口 [血浆审核复核↗](https://yapi.sharing8.cn/project/529/interface/api/32497) 的 **请求类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `PUT /api/core/batch/plasma/audit/recheck`
 * @更新时间 `2024-01-17 19:44:27`
 */
export interface PutApiCoreBatchPlasmaAuditRecheckRequest {
  /**
   * 审核id
   */
  auditId: string;
}

/**
 * 接口 [血浆审核复核↗](https://yapi.sharing8.cn/project/529/interface/api/32497) 的 **返回类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `PUT /api/core/batch/plasma/audit/recheck`
 * @更新时间 `2024-01-17 19:44:27`
 */
export type PutApiCoreBatchPlasmaAuditRecheckResponse = string;

/**
 * 接口 [血浆审核复核取消↗](https://yapi.sharing8.cn/project/529/interface/api/32502) 的 **请求类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `PUT /api/core/batch/plasma/audit/recheck-cancel`
 * @更新时间 `2024-01-17 19:46:56`
 */
export interface PutApiCoreBatchPlasmaAuditRecheckCancelRequest {
  /**
   * 审核id
   */
  auditId: string;
  /**
   * 备注
   */
  remark: string;
}

/**
 * 接口 [血浆审核复核取消↗](https://yapi.sharing8.cn/project/529/interface/api/32502) 的 **返回类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `PUT /api/core/batch/plasma/audit/recheck-cancel`
 * @更新时间 `2024-01-17 19:46:56`
 */
export type PutApiCoreBatchPlasmaAuditRecheckCancelResponse = string;

/**
 * 接口 [血浆审核批准↗](https://yapi.sharing8.cn/project/529/interface/api/32507) 的 **请求类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `PUT /api/core/batch/plasma/audit/approval`
 * @更新时间 `2024-01-17 19:48:36`
 */
export interface PutApiCoreBatchPlasmaAuditApprovalRequest {
  /**
   * 审核id
   */
  auditId: string;
}

/**
 * 接口 [血浆审核批准↗](https://yapi.sharing8.cn/project/529/interface/api/32507) 的 **返回类型**
 *
 * @分类 [血浆审核↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5442)
 * @请求头 `PUT /api/core/batch/plasma/audit/approval`
 * @更新时间 `2024-01-17 19:48:36`
 */
export type PutApiCoreBatchPlasmaAuditApprovalResponse = string;

/* prettier-ignore-end */
