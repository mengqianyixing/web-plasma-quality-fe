/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询标签打印记录↗](https://yapi.sharing8.cn/project/521/interface/api/31650) 的 **请求类型**
 *
 * @分类 [打印记录↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5215)
 * @请求头 `POST /api/sys/printingRecords`
 * @更新时间 `2023-12-18 15:26:05`
 */
export interface PostApiSysPrintingRecordsRequest {
  /**
   * 当前页
   */
  currPage: number;
  /**
   * 分页大小
   */
  pageSize: string;
  /**
   * 打印日期（开始)
   */
  begnDate: string;
  /**
   * 打印日期（结束)
   */
  endDate: string;
  /**
   * 标签类型
   */
  labelType?: string;
  /**
   * 打印人
   */
  creator?: string;
}

/**
 * 接口 [查询标签打印记录↗](https://yapi.sharing8.cn/project/521/interface/api/31650) 的 **返回类型**
 *
 * @分类 [打印记录↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5215)
 * @请求头 `POST /api/sys/printingRecords`
 * @更新时间 `2023-12-18 15:26:05`
 */
export interface PostApiSysPrintingRecordsResponse {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  result: {
    /**
     * 主键
     */
    prtNo: string;
    /**
     * 排队的号
     */
    seqNumber?: number;
    /**
     * 标签类型
     */
    labelType: string;
    /**
     * 打印原因
     */
    reason?: string;
    /**
     * 打印人
     */
    creator: string;
    /**
     * 打印时间
     */
    createAt: string;
    /**
     * 是否补打
     */
    supplementary: number;
    /**
     * 业务编号
     */
    bissNo: string;
  }[];
}

/**
 * 接口 [标签预览↗](https://yapi.sharing8.cn/project/521/interface/api/31662) 的 **请求类型**
 *
 * @分类 [打印记录↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5215)
 * @请求头 `GET /api/sys/printingRecord/preview/{prtNo}`
 * @更新时间 `2023-12-18 14:52:20`
 */
export interface GetApiSysPrintingRecordPreviewPrtNoRequest {
  prtNo: string;
}

/**
 * 接口 [标签预览↗](https://yapi.sharing8.cn/project/521/interface/api/31662) 的 **返回类型**
 *
 * @分类 [打印记录↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5215)
 * @请求头 `GET /api/sys/printingRecord/preview/{prtNo}`
 * @更新时间 `2023-12-18 14:52:20`
 */
export type GetApiSysPrintingRecordPreviewPrtNoResponse = string[];

/**
 * 接口 [标签补打↗](https://yapi.sharing8.cn/project/521/interface/api/31665) 的 **请求类型**
 *
 * @分类 [打印记录↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5215)
 * @请求头 `PUT /api/sys/printingRecord/{prtNo}`
 * @更新时间 `2023-12-18 15:13:52`
 */
export interface PutApiSysPrintingRecordPrtNoRequest {
  /**
   * 份数
   */
  times: number;
  /**
   * 分辨率
   */
  resolution: number;
  /**
   * 打印机名
   */
  printerName: string;
  /**
   * 打印机类型
   */
  printerType: string;
  directLabel: {
    Width: number;
    Height: number;
    Gap: number;
    Data: {
      Id: string;
      Type: string;
      Data: string;
      OnlyDisplay: boolean;
      X: number;
      'Y;': number;
      Orientation: number;
      LineThickness: number;
      BarcodeRatio: number;
      Width: number;
      Height: number;
      Readable: boolean;
      UseThickness: boolean;
      TextFormat: {
        FontName: string;
        FontSize: number;
        Bold: boolean;
        Italic: boolean;
        Underline: boolean;
        LineWrap: boolean;
        Revert: boolean;
        Middle: boolean;
      };
    }[];
  };
  prtNo: string;
}

/**
 * 接口 [标签补打↗](https://yapi.sharing8.cn/project/521/interface/api/31665) 的 **返回类型**
 *
 * @分类 [打印记录↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5215)
 * @请求头 `PUT /api/sys/printingRecord/{prtNo}`
 * @更新时间 `2023-12-18 15:13:52`
 */
export interface PutApiSysPrintingRecordPrtNoResponse {}

/* prettier-ignore-end */
