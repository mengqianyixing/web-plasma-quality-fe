/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [更新打印记录↗](https://yapi.sharing8.cn/project/521/interface/api/34113) 的 **请求类型**
 *
 * @分类 [报表↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5813)
 * @请求头 `PUT /api/report/content`
 * @更新时间 `2024-03-26 15:18:43`
 */
export interface PutApiReportContentRequest {
  reportKey: string;
  contentKey: string;
}

/**
 * 接口 [更新打印记录↗](https://yapi.sharing8.cn/project/521/interface/api/34113) 的 **返回类型**
 *
 * @分类 [报表↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5813)
 * @请求头 `PUT /api/report/content`
 * @更新时间 `2024-03-26 15:18:43`
 */
export type PutApiReportContentResponse = string;

/**
 * 接口 [报表模版列表↗](https://yapi.sharing8.cn/project/521/interface/api/34143) 的 **请求类型**
 *
 * @分类 [报表↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5813)
 * @请求头 `GET /api/report/templates`
 * @更新时间 `2024-03-28 11:31:46`
 */
export interface GetApiReportTemplatesRequest {
  /**
   * 页
   */
  currPage: string;
  /**
   * 页面大小
   */
  pageSize: string;
}

/**
 * 接口 [报表模版列表↗](https://yapi.sharing8.cn/project/521/interface/api/34143) 的 **返回类型**
 *
 * @分类 [报表↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5813)
 * @请求头 `GET /api/report/templates`
 * @更新时间 `2024-03-28 11:31:46`
 */
export interface GetApiReportTemplatesResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    id: string;
    /**
     * 报表文件编号
     */
    ctrlNo: string;
    /**
     * 报表名称
     */
    ctrlTitle: string;
    /**
     * 英文标题
     */
    ctrlEngTitle: string;
    /**
     * 报表版本号
     */
    ctrlVersion: string;
    effectiveDate: null | string;
    expiredDate: null | string;
    reportKey: string;
    /**
     * 模版文件地址
     */
    templateFile: string | null;
    /**
     * 模版版本号
     */
    templateVersion: number;
    /**
     * 状态（CLOSE 无效 OPEN 生效）
     */
    state: string;
  }[];
}

/**
 * 接口 [编辑模版↗](https://yapi.sharing8.cn/project/521/interface/api/34148) 的 **请求类型**
 *
 * @分类 [报表↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5813)
 * @请求头 `POST /api/report/template`
 * @更新时间 `2024-03-28 11:33:10`
 */
export interface PostApiReportTemplateRequest {
  ctrlNo?: string;
  ctrlTitle?: string;
  ctrlEngTitle?: string;
  ctrlVersion?: string;
  effectiveDate?: string;
  expiredDate?: string;
  id?: string;
}

/**
 * 接口 [编辑模版↗](https://yapi.sharing8.cn/project/521/interface/api/34148) 的 **返回类型**
 *
 * @分类 [报表↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5813)
 * @请求头 `POST /api/report/template`
 * @更新时间 `2024-03-28 11:33:10`
 */
export type PostApiReportTemplateResponse = null;

/* prettier-ignore-end */
