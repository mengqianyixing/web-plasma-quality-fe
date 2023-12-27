/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [浆站列表↗](https://yapi.sharing8.cn/project/529/interface/api/31836) 的 **请求类型**
 *
 * @分类 [浆站管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5313)
 * @请求头 `GET /api/core/station`
 * @更新时间 `2023-12-25 17:32:42`
 */
export interface GetApiCoreStationRequest {}

/**
 * 接口 [浆站列表↗](https://yapi.sharing8.cn/project/529/interface/api/31836) 的 **返回类型**
 *
 * @分类 [浆站管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5313)
 * @请求头 `GET /api/core/station`
 * @更新时间 `2023-12-25 17:32:42`
 */
export type GetApiCoreStationResponse = {
  /**
   * 浆站编号
   */
  stationNo?: string;
  /**
   * 浆站名称
   */
  stationName?: string;
}[];

/* prettier-ignore-end */
