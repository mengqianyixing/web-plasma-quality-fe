/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [新增样式↗](https://yapi.sharing8.cn/project/521/interface/api/31569) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `POST /api/sys/tag`
 * @更新时间 `2023-12-23 11:40:54`
 */
export interface PostApiSysTagRequest {
  tagName: string;
  labelType: string;
  resolution: number;
  times: number;
  printerType: string;
  printerName: string;
  content?: {
    Width: number;
    Height: number;
    Gap: number;
    Data: {
      Id?: string;
      Type: string;
      Data: string;
      OnlyDisplay: boolean;
      X: number;
      Y: number;
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
      }[];
    }[];
  };
  state?: string;
  patternPicture?: string;
}

/**
 * 接口 [新增样式↗](https://yapi.sharing8.cn/project/521/interface/api/31569) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `POST /api/sys/tag`
 * @更新时间 `2023-12-23 11:40:54`
 */
export type PostApiSysTagResponse = string;

/**
 * 接口 [编辑样式↗](https://yapi.sharing8.cn/project/521/interface/api/31572) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `PUT /api/sys/tag`
 * @更新时间 `2023-12-23 11:40:12`
 */
export interface PutApiSysTagRequest {
  tagNo: string;
  tagName?: string;
  labelType?: string;
  resolution?: number;
  times?: number;
  printerType?: string;
  printerName?: string;
  content?: {
    Width: number;
    Height: number;
    Gap: number;
    Data: {
      Id: string;
      Type: string;
      Data: string;
      OnlyDisplay: boolean;
      X: number;
      Y: number;
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
  patternPicture?: string;
  state?: string;
}

/**
 * 接口 [编辑样式↗](https://yapi.sharing8.cn/project/521/interface/api/31572) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `PUT /api/sys/tag`
 * @更新时间 `2023-12-23 11:40:12`
 */
export type PutApiSysTagResponse = string;

/**
 * 接口 [删除样式↗](https://yapi.sharing8.cn/project/521/interface/api/31575) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `DELETE /api/sys/tag/{tagNo}`
 * @更新时间 `2023-12-15 10:21:28`
 */
export interface DeleteApiSysTagTagNoRequest {
  tagNo: string;
}

/**
 * 接口 [删除样式↗](https://yapi.sharing8.cn/project/521/interface/api/31575) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `DELETE /api/sys/tag/{tagNo}`
 * @更新时间 `2023-12-15 10:21:28`
 */
export type DeleteApiSysTagTagNoResponse = string;

/**
 * 接口 [查询样式列表↗](https://yapi.sharing8.cn/project/521/interface/api/31578) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `POST /api/sys/tags`
 * @更新时间 `2023-12-15 15:06:45`
 */
export interface PostApiSysTagsRequest {
  /**
   * 标签名称
   */
  tagName?: string;
  /**
   * 标签类型
   */
  labelType?: string;
  /**
   * 状态
   */
  state?: string;
}

/**
 * 接口 [查询样式列表↗](https://yapi.sharing8.cn/project/521/interface/api/31578) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `POST /api/sys/tags`
 * @更新时间 `2023-12-15 15:06:45`
 */
export type PostApiSysTagsResponse = {
  /**
   * 标签编号
   */
  tagNo: string;
  /**
   * 标签类型
   */
  labelType: string;
  /**
   * 分辨率
   */
  resolution: string;
  /**
   * 打印份数
   */
  times: string;
  /**
   * 打印机类型
   */
  printerType: string;
  /**
   * 打印机名
   */
  printerName: string;
  /**
   * 状态
   */
  state: string;
}[];

/**
 * 接口 [查询样式详情↗](https://yapi.sharing8.cn/project/521/interface/api/31581) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `GET /api/sys/tag/{tagNo}`
 * @更新时间 `2023-12-23 11:42:45`
 */
export interface GetApiSysTagTagNoRequest {
  tagNo: string;
}

/**
 * 接口 [查询样式详情↗](https://yapi.sharing8.cn/project/521/interface/api/31581) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `GET /api/sys/tag/{tagNo}`
 * @更新时间 `2023-12-23 11:42:45`
 */
export interface GetApiSysTagTagNoResponse {
  tagName: string;
  labelType: string;
  resolution: number;
  times: number;
  printerType: string;
  printerName: string;
  patternPicture: string;
  state: string;
  content: {
    Width: number;
    Height: number;
    Gap: number;
    Data: {
      Type: string;
      Data: string;
      OnlyDisplay: boolean;
      X: number;
      Y: number;
      Orientation: number;
      LineThickness: number;
      BarcodeRatio: number;
      Width: number;
      Height: number;
      Readable: boolean;
      UseThickness: boolean;
      TextFormat: {
        FontName?: string;
        FontSize?: number;
        Bold?: boolean;
        Italic?: boolean;
        Underline?: boolean;
        LineWrap?: boolean;
        Revert?: boolean;
        Middle?: boolean;
      };
      Id?: string;
    }[];
  };
}

/**
 * 接口 [复制样式↗](https://yapi.sharing8.cn/project/521/interface/api/31593) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `GET /api/sys/tag/copy/{tagNo}`
 * @更新时间 `2023-12-15 15:15:10`
 */
export interface GetApiSysTagCopyTagNoRequest {
  tagNo: string;
}

/**
 * 接口 [复制样式↗](https://yapi.sharing8.cn/project/521/interface/api/31593) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `GET /api/sys/tag/copy/{tagNo}`
 * @更新时间 `2023-12-15 15:15:10`
 */
export type GetApiSysTagCopyTagNoResponse = string;

/**
 * 接口 [启用样式↗](https://yapi.sharing8.cn/project/521/interface/api/31599) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `PUT /api/sys/tag/enable/{tagNo}`
 * @更新时间 `2023-12-15 14:58:58`
 */
export interface PutApiSysTagEnableTagNoRequest {
  tagNo: string;
}

/**
 * 接口 [启用样式↗](https://yapi.sharing8.cn/project/521/interface/api/31599) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `PUT /api/sys/tag/enable/{tagNo}`
 * @更新时间 `2023-12-15 14:58:58`
 */
export interface PutApiSysTagEnableTagNoResponse {}

/**
 * 接口 [禁用样式↗](https://yapi.sharing8.cn/project/521/interface/api/31602) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `PUT /api/sys/tag/disable/{tagNo}`
 * @更新时间 `2023-12-15 15:00:21`
 */
export interface PutApiSysTagDisableTagNoRequest {
  tagNo: string;
}

/**
 * 接口 [禁用样式↗](https://yapi.sharing8.cn/project/521/interface/api/31602) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `PUT /api/sys/tag/disable/{tagNo}`
 * @更新时间 `2023-12-15 15:00:21`
 */
export type PutApiSysTagDisableTagNoResponse = string;

/**
 * 接口 [查询历史样式列表↗](https://yapi.sharing8.cn/project/521/interface/api/31605) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `POST /api/sys/tags/his`
 * @更新时间 `2023-12-16 14:11:08`
 */
export interface PostApiSysTagsHisRequest {
  /**
   * 标签名称
   */
  tagName?: string;
  /**
   * 标签类型
   */
  labelType?: string;
  /**
   * 标签编号
   */
  tagNo: string;
}

/**
 * 接口 [查询历史样式列表↗](https://yapi.sharing8.cn/project/521/interface/api/31605) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `POST /api/sys/tags/his`
 * @更新时间 `2023-12-16 14:11:08`
 */
export type PostApiSysTagsHisResponse = {
  /**
   * 历史标签编号
   */
  hisNo: string;
  /**
   * 标签类型
   */
  labelType: string;
  /**
   * 分辨率
   */
  resolution: string;
  /**
   * 打印份数
   */
  times: string;
  /**
   * 打印机类型
   */
  printerType: string;
  /**
   * 打印机名
   */
  printerName: string;
}[];

/**
 * 接口 [重用历史样式↗](https://yapi.sharing8.cn/project/521/interface/api/31611) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `GET /api/sys/tag/his/reuse/{hisNo}`
 * @更新时间 `2023-12-16 14:42:04`
 */
export interface GetApiSysTagHisReuseHisNoRequest {
  hisNo: string;
}

/**
 * 接口 [重用历史样式↗](https://yapi.sharing8.cn/project/521/interface/api/31611) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `GET /api/sys/tag/his/reuse/{hisNo}`
 * @更新时间 `2023-12-16 14:42:04`
 */
export type GetApiSysTagHisReuseHisNoResponse = string;

/**
 * 接口 [标签样式预览↗](https://yapi.sharing8.cn/project/521/interface/api/31614) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `POST /api/sys/tag/preview`
 * @更新时间 `2023-12-23 14:06:06`
 */
export interface PostApiSysTagPreviewRequest {
  content: {
    Data: {
      Id: string;
      Type: string;
      Data: string;
      OnlyDisplay: boolean;
      X: number;
      Y: number;
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
      }[];
    }[];
    Width?: number;
    Height?: number;
    Gap?: number;
  };
  resolution: number;
  tagName?: string;
  labelType?: string;
  times?: number;
  printerType?: string;
  printerName?: string;
  patternPicture?: string;
  state?: string;
}

/**
 * 接口 [标签样式预览↗](https://yapi.sharing8.cn/project/521/interface/api/31614) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `POST /api/sys/tag/preview`
 * @更新时间 `2023-12-23 14:06:06`
 */
export type PostApiSysTagPreviewResponse = string[];

/**
 * 接口 [历史样式预览↗](https://yapi.sharing8.cn/project/521/interface/api/31617) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `GET /sys/tag/his/preview/{hisNo}`
 * @更新时间 `2023-12-16 10:40:25`
 */
export interface GetSysTagHisPreviewHisNoRequest {
  hisNo: string;
}

/**
 * 接口 [历史样式预览↗](https://yapi.sharing8.cn/project/521/interface/api/31617) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `GET /sys/tag/his/preview/{hisNo}`
 * @更新时间 `2023-12-16 10:40:25`
 */
export type GetSysTagHisPreviewHisNoResponse = string[];

/**
 * 接口 [标签打印↗](https://yapi.sharing8.cn/project/521/interface/api/31683) 的 **请求类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `POST /api/sys/tag/print`
 * @更新时间 `2023-12-20 14:33:50`
 */
export interface PostApiSysTagPrintRequest {
  /**
   * 打印类型
   */
  labelType: string;
  /**
   * 业务编号
   */
  bissNo: string;
  /**
   * 打印类容，传入类型为HashMap
   */
  param?: {};
}

/**
 * 接口 [标签打印↗](https://yapi.sharing8.cn/project/521/interface/api/31683) 的 **返回类型**
 *
 * @分类 [样式管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5208)
 * @请求头 `POST /api/sys/tag/print`
 * @更新时间 `2023-12-20 14:33:50`
 */
export interface PostApiSysTagPrintResponse {
  /**
   * 打印次数
   */
  times: number;
  /**
   * 分辨率
   */
  resolution: number;
  /**
   * 打印机类型
   */
  printerType: string;
  /**
   * 打印机名称
   */
  printerName: string;
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
      Y: number;
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
}

/* prettier-ignore-end */
