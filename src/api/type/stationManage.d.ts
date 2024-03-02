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

/**
 * 接口 [采浆公司列表↗](https://yapi.sharing8.cn/project/521/interface/api/33232) 的 **请求类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `GET /api/sys/station`
 * @更新时间 `2024-02-21 17:04:11`
 */
export interface GetApiSysStationRequest {}

/**
 * 接口 [采浆公司列表↗](https://yapi.sharing8.cn/project/521/interface/api/33232) 的 **返回类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `GET /api/sys/station`
 * @更新时间 `2024-02-21 17:04:11`
 */
export interface GetApiSysStationResponse {
  /**
   * 简称
   */
  shortName: string;
  /**
   * 全称
   */
  fullName: string;
  /**
   * 血浆皮重
   */
  tareWeight: number;
  /**
   * 浆站编码
   */
  stationNo: string;
  /**
   * ERP浆站编码
   */
  preERP: string;
  /**
   * 状态
   */
  status: string;
  /**
   * 浆站系统类型
   */
  systemType: string;
  /**
   * 所在省份
   */
  province: string;
  /**
   * 所在省份编码
   */
  provinceCode: string;
  /**
   * 记录人
   */
  creator: string;
  /**
   * 记录日期
   */
  createDate: string;
}

/**
 * 接口 [新增采浆公司↗](https://yapi.sharing8.cn/project/521/interface/api/33237) 的 **请求类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `POST /api/sys/station`
 * @更新时间 `2024-02-21 15:23:27`
 */
export interface PostApiSysStationRequest {
  /**
   * 浆站编码
   */
  stationNo: string;
  /**
   * ERP浆站编码
   */
  preERP: string;
  /**
   * 全称
   */
  fullName: string;
  /**
   * 简称
   */
  shortName: string;
  /**
   * 浆站系统类型
   */
  systemType: string;
  /**
   * 所在省份
   */
  provinceCode: string;
  /**
   * 血浆皮重
   */
  tareWeight: number;
}

/**
 * 接口 [新增采浆公司↗](https://yapi.sharing8.cn/project/521/interface/api/33237) 的 **返回类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `POST /api/sys/station`
 * @更新时间 `2024-02-21 15:23:27`
 */
export interface PostApiSysStationResponse {}

/**
 * 接口 [编辑采浆公司↗](https://yapi.sharing8.cn/project/521/interface/api/33242) 的 **请求类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `PUT /api/sys/station`
 * @更新时间 `2024-02-21 15:23:34`
 */
export interface PutApiSysStationRequest {
  /**
   * ERP浆站编码
   */
  preERP: string;
  /**
   * 全称
   */
  fullName: string;
  /**
   * 简称
   */
  shortName: string;
  /**
   * 浆站系统类型
   */
  systemType: string;
  /**
   * 所在省份
   */
  province: string;
  /**
   * 血浆皮重
   */
  tareWeight: string;
  /**
   * 编辑说明
   */
  remark: string;
}

/**
 * 接口 [编辑采浆公司↗](https://yapi.sharing8.cn/project/521/interface/api/33242) 的 **返回类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `PUT /api/sys/station`
 * @更新时间 `2024-02-21 15:23:34`
 */
export interface PutApiSysStationResponse {}

/**
 * 接口 [停用采浆公司↗](https://yapi.sharing8.cn/project/521/interface/api/33247) 的 **请求类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `DELETE /api/sys/station`
 * @更新时间 `2024-02-21 15:43:46`
 */
export interface DeleteApiSysStationRequest {
  /**
   * 浆站编号
   */
  stationNo: string;
  /**
   * 复核人
   */
  reviewer: string;
}

/**
 * 接口 [停用采浆公司↗](https://yapi.sharing8.cn/project/521/interface/api/33247) 的 **返回类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `DELETE /api/sys/station`
 * @更新时间 `2024-02-21 15:43:46`
 */
export interface DeleteApiSysStationResponse {}

/**
 * 接口 [启用采浆公司↗](https://yapi.sharing8.cn/project/521/interface/api/33252) 的 **请求类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `POST /api/sys/station/{stationNo}`
 * @更新时间 `2024-02-21 15:59:54`
 */
export interface PostApiSysStationStationNoRequest {
  stationNo: string;
}

/**
 * 接口 [启用采浆公司↗](https://yapi.sharing8.cn/project/521/interface/api/33252) 的 **返回类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `POST /api/sys/station/{stationNo}`
 * @更新时间 `2024-02-21 15:59:54`
 */
export interface PostApiSysStationStationNoResponse {}

/**
 * 接口 [浆站下拉表单↗](https://yapi.sharing8.cn/project/521/interface/api/33327) 的 **请求类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `GET /api/sys/station/form`
 * @更新时间 `2024-02-21 16:50:34`
 */
export interface GetApiSysStationFormRequest {}

/**
 * 接口 [浆站下拉表单↗](https://yapi.sharing8.cn/project/521/interface/api/33327) 的 **返回类型**
 *
 * @分类 [基础设置-采浆公司管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5703)
 * @请求头 `GET /api/sys/station/form`
 * @更新时间 `2024-02-21 16:50:34`
 */
export type GetApiSysStationFormResponse = {
  /**
   * 浆站编号
   */
  stationNo: string;
  /**
   * 浆站名称
   */
  stationName: string;
}[];

/* prettier-ignore-end */
