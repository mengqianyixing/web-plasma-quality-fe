/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [新增检验项目↗](https://yapi.sharing8.cn/project/529/interface/api/31818) 的 **请求类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `POST /api/core/lab/project`
 * @更新时间 `2023-12-26 11:39:36`
 */
export interface PostApiCoreLabProjectRequest {
  /**
   * 检验项目名称
   */
  projectName: string;
  /**
   * 检验项目简称
   */
  projectAbbr: string;
  /**
   * 项目代码
   */
  projectCode: string;
  /**
   * 血浆类型
   */
  plasmaType?: string;
  /**
   * 顺序
   */
  sort: number;
  /**
   * 是否永拒浆员；是：0，否：1
   */
  refuse: number;
  /**
   * 状态:0:正常；1：禁用
   */
  state: number;
  /**
   * 判断标准
   */
  standard: string;
  /**
   * 检测必须物料
   */
  requiredMaterials: string;
  /**
   * 检测方法
   */
  method: string;
  /**
   * OD值有效位数
   */
  odValidBit: number;
  /**
   * 结果值有效位数
   */
  priceValidBit: string;
  /**
   * 检测性质
   */
  checkNature: string;
  /**
   * 对应血浆检测不合格原因
   */
  checkUnqualifiedReason?: string;
  /**
   * 检疫期不合格原因
   */
  periodUnqualifiedReason?: string;
  /**
   * 续追踪不合格原因
   */
  traceUnqualifiedReason?: string;
  /**
   * 是否追溯检疫期；是：0，否：1
   */
  traceBack: number;
  /**
   * 是否复检；是：0，否：1
   */
  recheck: number;
}

/**
 * 接口 [新增检验项目↗](https://yapi.sharing8.cn/project/529/interface/api/31818) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `POST /api/core/lab/project`
 * @更新时间 `2023-12-26 11:39:36`
 */
export type PostApiCoreLabProjectResponse = string;

/**
 * 接口 [编辑检验项目↗](https://yapi.sharing8.cn/project/529/interface/api/31821) 的 **请求类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `PUT /api/core/lab/project`
 * @更新时间 `2023-12-26 14:24:29`
 */
export interface PutApiCoreLabProjectRequest {
  projectName?: string;
  projectAbbr?: string;
  projectCode?: string;
  sort?: number;
  refuse?: number;
  state?: number;
  standard?: string;
  requiredMaterials?: string;
  method?: string;
  odValidBit?: number;
  priceValidBit?: string;
  checkNature?: string;
  traceBack?: number;
  recheck?: number;
  plasmaType?: string;
  checkUnqualifiedReason?: string;
  periodUnqualifiedReason?: string;
  traceUnqualifiedReason?: string;
  /**
   * 主键id
   */
  projectId: string;
  /**
   * 是否启用禁用
   */
  enableFlag?: string;
}

/**
 * 接口 [编辑检验项目↗](https://yapi.sharing8.cn/project/529/interface/api/31821) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `PUT /api/core/lab/project`
 * @更新时间 `2023-12-26 14:24:29`
 */
export type PutApiCoreLabProjectResponse = string;

/**
 * 接口 [删除检验项目↗](https://yapi.sharing8.cn/project/529/interface/api/31824) 的 **请求类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `DELETE /api/core/lab/project/{id}`
 * @更新时间 `2023-12-25 16:45:27`
 */
export interface DeleteApiCoreLabProjectIdRequest {
  id: string;
}

/**
 * 接口 [删除检验项目↗](https://yapi.sharing8.cn/project/529/interface/api/31824) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `DELETE /api/core/lab/project/{id}`
 * @更新时间 `2023-12-25 16:45:27`
 */
export type DeleteApiCoreLabProjectIdResponse = string;

/**
 * 接口 [获取检测项目详情↗](https://yapi.sharing8.cn/project/529/interface/api/31827) 的 **请求类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `GET /api/core/lab/project/{id}`
 * @更新时间 `2023-12-26 11:39:58`
 */
export interface GetApiCoreLabProjectIdRequest {
  id: string;
}

/**
 * 接口 [获取检测项目详情↗](https://yapi.sharing8.cn/project/529/interface/api/31827) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `GET /api/core/lab/project/{id}`
 * @更新时间 `2023-12-26 11:39:58`
 */
export interface GetApiCoreLabProjectIdResponse {
  projectName: string;
  projectAbbr: string;
  projectCode?: string;
  sort?: number;
  refuse?: number;
  state?: number;
  standard?: string;
  requiredMaterials?: string;
  method?: string;
  odValidBit?: number;
  priceValidBit?: string;
  checkNature?: string;
  traceBack?: number;
  recheck?: number;
  plasmaType?: string;
  checkUnqualifiedReason?: string;
  periodUnqualifiedReason?: string;
  traceUnqualifiedReason?: string;
  /**
   * 主键id
   */
  projectId: string;
}

/**
 * 接口 [查询检验项目列表↗](https://yapi.sharing8.cn/project/529/interface/api/31833) 的 **请求类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `POST /api/core/lab/projects`
 * @更新时间 `2023-12-26 11:40:12`
 */
export interface PostApiCoreLabProjectsRequest {
  currPage: number;
  pageSize: number;
  projectName?: string;
  projectAbbr?: string;
  projectCode?: string;
}

/**
 * 接口 [查询检验项目列表↗](https://yapi.sharing8.cn/project/529/interface/api/31833) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `POST /api/core/lab/projects`
 * @更新时间 `2023-12-26 11:40:12`
 */
export interface PostApiCoreLabProjectsResponse {
  totalCount?: number;
  totalPage?: number;
  currPage?: number;
  pageSize?: number;
  result?: {
    projectName?: string;
    projectAbbr?: string;
    projectId?: string;
    projectCode?: string;
    sort?: number;
    refuse?: number;
    state?: number;
    standard?: string;
    requiredMaterials?: string;
    method?: string;
    odValidBit?: number;
    priceValidBit?: string;
    checkNature?: string;
    traceBack?: number;
    recheck?: number;
    plasmaType?: string;
    checkUnqualifiedReason?: string;
    periodUnqualifiedReason?: string;
    traceUnqualifiedReason?: string;
    creator?: string;
    createAt?: string;
  }[];
}

/**
 * 接口 [新增检验方法↗](https://yapi.sharing8.cn/project/529/interface/api/31872) 的 **请求类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `POST /api/sys/dict/item/method`
 * @更新时间 `2023-12-28 11:14:22`
 */
export interface PostApiSysDictItemMethodRequest {
  /**
   * 方法简称
   */
  methodAbbr: string;
  /**
   * 方法全称
   */
  itemKey: string;
  /**
   * 检验间隔天数
   */
  intervalDays: number;
  /**
   * 状态:0:正常；1：禁用
   */
  enable: boolean;
  /**
   * 顺序
   */
  sort: number;
  /**
   * 检测模式
   */
  detectionMode: string;
  /**
   * 固定值
   */
  dataDictId: string;
}

/**
 * 接口 [新增检验方法↗](https://yapi.sharing8.cn/project/529/interface/api/31872) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `POST /api/sys/dict/item/method`
 * @更新时间 `2023-12-28 11:14:22`
 */
export type PostApiSysDictItemMethodResponse = string;

/**
 * 接口 [修改检验方法↗](https://yapi.sharing8.cn/project/529/interface/api/31875) 的 **请求类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `PUT /api/sys/dict/item/method`
 * @更新时间 `2023-12-28 11:14:35`
 */
export interface PutApiSysDictItemMethodRequest {
  /**
   * 全程
   */
  itemKey?: string;
  /**
   * 简称
   */
  methodAbbr?: string;
  intervalDays?: number;
  enable?: boolean;
  sort?: number;
  detectionMode?: string;
  /**
   * 主键
   */
  dictItemId: string;
}

/**
 * 接口 [修改检验方法↗](https://yapi.sharing8.cn/project/529/interface/api/31875) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `PUT /api/sys/dict/item/method`
 * @更新时间 `2023-12-28 11:14:35`
 */
export type PutApiSysDictItemMethodResponse = string;

/**
 * 接口 [删除检验方法↗](https://yapi.sharing8.cn/project/529/interface/api/31878) 的 **请求类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `DELETE /api/sys/dict/item/method/{dictItemId}`
 * @更新时间 `2023-12-28 09:41:36`
 */
export interface DeleteApiSysDictItemMethodDictItemIdRequest {
  dictItemId: string;
}

/**
 * 接口 [删除检验方法↗](https://yapi.sharing8.cn/project/529/interface/api/31878) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `DELETE /api/sys/dict/item/method/{dictItemId}`
 * @更新时间 `2023-12-28 09:41:36`
 */
export type DeleteApiSysDictItemMethodDictItemIdResponse = string;

/**
 * 接口 [查询检验方法详情↗](https://yapi.sharing8.cn/project/529/interface/api/31881) 的 **请求类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `GET /api/sys/dict/item/method/{dictItemId}`
 * @更新时间 `2023-12-28 11:14:45`
 */
export interface GetApiSysDictItemMethodDictItemIdRequest {
  dictItemId: string;
}

/**
 * 接口 [查询检验方法详情↗](https://yapi.sharing8.cn/project/529/interface/api/31881) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `GET /api/sys/dict/item/method/{dictItemId}`
 * @更新时间 `2023-12-28 11:14:45`
 */
export interface GetApiSysDictItemMethodDictItemIdResponse {
  /**
   * 全程
   */
  itemKey: string;
  intervalDays: number;
  enable: boolean;
  sort: number;
  detectionMode: string;
  creator?: string;
  createAt?: string;
  /**
   * 简称
   */
  methodAbbr: string;
  dictItemId: string;
}

/**
 * 接口 [查询检验方法列表↗](https://yapi.sharing8.cn/project/529/interface/api/31884) 的 **请求类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `POST /api/sys/dict/item/methods`
 * @更新时间 `2023-12-28 11:15:48`
 */
export interface PostApiSysDictItemMethodsRequest {
  currPage: number;
  pageSize: number;
  methodAbbr?: string;
  itemKey?: string;
}

/**
 * 接口 [查询检验方法列表↗](https://yapi.sharing8.cn/project/529/interface/api/31884) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `POST /api/sys/dict/item/methods`
 * @更新时间 `2023-12-28 11:15:48`
 */
export interface PostApiSysDictItemMethodsResponse {
  totalCount: number;
  totalPage: number;
  currPage: number;
  pageSize: number;
  result?: {
    methodAbbr: string;
    itemKey: string;
    intervalDays: number;
    enable: boolean;
    sort: number;
    detectionMode: string;
    creator?: string;
    createAt?: string;
    dictItemId: string;
  }[];
}

/**
 * 接口 [查询检验方法选项数据↗](https://yapi.sharing8.cn/project/529/interface/api/31887) 的 **请求类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `GET /api/sys/dict/item/methods`
 * @更新时间 `2023-12-28 09:42:26`
 */
export interface GetApiSysDictItemMethodsRequest {}

/**
 * 接口 [查询检验方法选项数据↗](https://yapi.sharing8.cn/project/529/interface/api/31887) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `GET /api/sys/dict/item/methods`
 * @更新时间 `2023-12-28 09:42:26`
 */
export type GetApiSysDictItemMethodsResponse = {
  label: string;
  value: string;
}[];

/**
 * 接口 [新增效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/31851) 的 **请求类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `POST /api/sys/dict/item/alence`
 * @更新时间 `2023-12-28 11:06:08`
 */
export interface PostApiSysDictItemAlenceRequest {
  /**
   * 固定值
   */
  dataDictId: string;
  /**
   * 血浆类型
   */
  plasmaType: string;
  /**
   * 效价名称
   */
  itemKey: string;
  /**
   * 效价编码
   */
  itemValue: string;
  /**
   * 效价结果
   */
  result: string;
  /**
   * 排序
   */
  sort: number;
  /**
   * 状态
   */
  enable: boolean;
}

/**
 * 接口 [新增效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/31851) 的 **返回类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `POST /api/sys/dict/item/alence`
 * @更新时间 `2023-12-28 11:06:08`
 */
export type PostApiSysDictItemAlenceResponse = string;

/**
 * 接口 [修改效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/31854) 的 **请求类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `PUT /api/sys/dict/item/alence`
 * @更新时间 `2023-12-28 10:18:49`
 */
export interface PutApiSysDictItemAlenceRequest {
  itemKey?: string;
  itemValue?: string;
  result?: string;
  sort?: number;
  enable?: boolean;
  dataDictId?: string;
  plasmaType?: string;
  dictItemId: string;
}

/**
 * 接口 [修改效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/31854) 的 **返回类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `PUT /api/sys/dict/item/alence`
 * @更新时间 `2023-12-28 10:18:49`
 */
export type PutApiSysDictItemAlenceResponse = string;

/**
 * 接口 [删除效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/31857) 的 **请求类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `DELETE /api/sys/dict/item/alence/{dictItemId}`
 * @更新时间 `2023-12-27 17:33:12`
 */
export interface DeleteApiSysDictItemAlenceDictItemIdRequest {
  dictItemId: string;
}

/**
 * 接口 [删除效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/31857) 的 **返回类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `DELETE /api/sys/dict/item/alence/{dictItemId}`
 * @更新时间 `2023-12-27 17:33:12`
 */
export type DeleteApiSysDictItemAlenceDictItemIdResponse = string;

/**
 * 接口 [查询效价类型详情↗](https://yapi.sharing8.cn/project/529/interface/api/31860) 的 **请求类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `GET /api/sys/dict/item/alence/{dictItemId}`
 * @更新时间 `2023-12-28 10:08:34`
 */
export interface GetApiSysDictItemAlenceDictItemIdRequest {
  dictItemId: string;
}

/**
 * 接口 [查询效价类型详情↗](https://yapi.sharing8.cn/project/529/interface/api/31860) 的 **返回类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `GET /api/sys/dict/item/alence/{dictItemId}`
 * @更新时间 `2023-12-28 10:08:34`
 */
export interface GetApiSysDictItemAlenceDictItemIdResponse {
  dictItemId: string;
  itemKey: string;
  itemValue: string;
  result: string;
  sort: number;
  enable: number;
  dataDictId: string;
  plasmaType: string;
  creater?: string;
  createAt?: string;
}

/**
 * 接口 [查询效价列表↗](https://yapi.sharing8.cn/project/529/interface/api/31863) 的 **请求类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `POST /api/sys/dict/item/alences`
 * @更新时间 `2023-12-28 10:08:12`
 */
export interface PostApiSysDictItemAlencesRequest {
  currPage: string;
  pageSize: string;
  plasmaType?: number;
  code?: string;
  name?: string;
  /**
   * 固定值
   */
  dataDictId?: string;
}

/**
 * 接口 [查询效价列表↗](https://yapi.sharing8.cn/project/529/interface/api/31863) 的 **返回类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `POST /api/sys/dict/item/alences`
 * @更新时间 `2023-12-28 10:08:12`
 */
export interface PostApiSysDictItemAlencesResponse {
  totalCount: number;
  totalPage: number;
  currPage: number;
  pageSize: number;
  result?: {
    plasmaType: number;
    itemValue: string;
    itemKey: string;
    result: string;
    sort: number;
    enable: number;
    creater: string;
    creatAt: string;
    dictItemId: string;
  }[];
}

/* prettier-ignore-end */
