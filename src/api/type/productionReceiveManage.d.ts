/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询待接收的箱↗](https://yapi.sharing8.cn/project/529/interface/api/32582) 的 **请求类型**
 *
 * @分类 [投产接收↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5451)
 * @请求头 `POST /api/product/reception/boxs`
 * @更新时间 `2024-01-19 19:39:47`
 */
export interface PostApiProductReceptionBoxsRequest {
  orderNo: string;
  currPage: number;
  pageSize: number;
}

/**
 * 接口 [查询待接收的箱↗](https://yapi.sharing8.cn/project/529/interface/api/32582) 的 **返回类型**
 *
 * @分类 [投产接收↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5451)
 * @请求头 `POST /api/product/reception/boxs`
 * @更新时间 `2024-01-19 19:39:47`
 */
export interface PostApiProductReceptionBoxsResponse {
  totalCount: number;
  currPage: null;
  totalPage: null;
  pageSize: null;
  result?: {
    boxNo: string;
    acceptBagCount: string;
  }[];
}

/**
 * 接口 [查询已接收的箱↗](https://yapi.sharing8.cn/project/529/interface/api/32587) 的 **请求类型**
 *
 * @分类 [投产接收↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5451)
 * @请求头 `POST /api/product/reception/accepted/boxs`
 * @更新时间 `2024-01-19 19:39:42`
 */
export interface PostApiProductReceptionAcceptedBoxsRequest {
  orderNo: string;
  currPage: number;
  pageSize: number;
}

/**
 * 接口 [查询已接收的箱↗](https://yapi.sharing8.cn/project/529/interface/api/32587) 的 **返回类型**
 *
 * @分类 [投产接收↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5451)
 * @请求头 `POST /api/product/reception/accepted/boxs`
 * @更新时间 `2024-01-19 19:39:42`
 */
export interface PostApiProductReceptionAcceptedBoxsResponse {
  totalCount: number;
  currPage: null;
  totalPage: null;
  pageSize: null;
  result?: {
    boxNo: string;
    acceptBagCount: string;
  }[];
}

/**
 * 接口 [按箱接收↗](https://yapi.sharing8.cn/project/529/interface/api/32592) 的 **请求类型**
 *
 * @分类 [投产接收↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5451)
 * @请求头 `POST /api/product/reception/accept/box`
 * @更新时间 `2024-01-19 19:39:37`
 */
export interface PostApiProductReceptionAcceptBoxRequest {
  boxNo: string;
  orderNo: string;
}

/**
 * 接口 [按箱接收↗](https://yapi.sharing8.cn/project/529/interface/api/32592) 的 **返回类型**
 *
 * @分类 [投产接收↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5451)
 * @请求头 `POST /api/product/reception/accept/box`
 * @更新时间 `2024-01-19 19:39:37`
 */
export type PostApiProductReceptionAcceptBoxResponse = string;

/**
 * 接口 [整批接收↗](https://yapi.sharing8.cn/project/529/interface/api/32597) 的 **请求类型**
 *
 * @分类 [投产接收↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5451)
 * @请求头 `POST /api/product/reception/accept/batch`
 * @更新时间 `2024-01-19 19:39:32`
 */
export interface PostApiProductReceptionAcceptBatchRequest {
  orderNo: string;
}

/**
 * 接口 [整批接收↗](https://yapi.sharing8.cn/project/529/interface/api/32597) 的 **返回类型**
 *
 * @分类 [投产接收↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5451)
 * @请求头 `POST /api/product/reception/accept/batch`
 * @更新时间 `2024-01-19 19:39:32`
 */
export type PostApiProductReceptionAcceptBatchResponse = string;

/**
 * 接口 [撤销接收↗](https://yapi.sharing8.cn/project/529/interface/api/32602) 的 **请求类型**
 *
 * @分类 [投产接收↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5451)
 * @请求头 `POST /api/product/reception/accept/revoke`
 * @更新时间 `2024-01-19 19:39:26`
 */
export interface PostApiProductReceptionAcceptRevokeRequest {
  orderNo: string;
  cause?: string;
}

/**
 * 接口 [撤销接收↗](https://yapi.sharing8.cn/project/529/interface/api/32602) 的 **返回类型**
 *
 * @分类 [投产接收↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5451)
 * @请求头 `POST /api/product/reception/accept/revoke`
 * @更新时间 `2024-01-19 19:39:26`
 */
export type PostApiProductReceptionAcceptRevokeResponse = string;

/* prettier-ignore-end */
