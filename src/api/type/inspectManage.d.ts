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
 * @更新时间 `2024-03-04 20:20:01`
 */
export interface PostApiCoreLabProjectsRequest {
  currPage: number;
  pageSize: number;
  projectName?: string;
  projectAbbr?: string;
  projectCode?: string;
  state?: string;
}

/**
 * 接口 [查询检验项目列表↗](https://yapi.sharing8.cn/project/529/interface/api/31833) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `POST /api/core/lab/projects`
 * @更新时间 `2024-03-04 20:20:01`
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
 * @更新时间 `2023-12-28 11:31:37`
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
   * 固定值:labMethod
   */
  dataDictId: string;
}

/**
 * 接口 [新增检验方法↗](https://yapi.sharing8.cn/project/529/interface/api/31872) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `POST /api/sys/dict/item/method`
 * @更新时间 `2023-12-28 11:31:37`
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
 * @更新时间 `2023-12-28 14:11:32`
 */
export interface PostApiSysDictItemMethodsRequest {
  currPage: number;
  pageSize: number;
  methodAbbr?: string;
  itemKey?: string;
  /**
   * 固定值：labMethod
   */
  dataDictId: string;
}

/**
 * 接口 [查询检验方法列表↗](https://yapi.sharing8.cn/project/529/interface/api/31884) 的 **返回类型**
 *
 * @分类 [检验管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5306)
 * @请求头 `POST /api/sys/dict/item/methods`
 * @更新时间 `2023-12-28 14:11:32`
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
    creater?: string;
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
 * @更新时间 `2024-01-12 17:43:29`
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
  titerType: string;
  /**
   * 排序
   */
  sort: number;
  /**
   * 状态
   */
  enable: boolean;
  /**
   * 优先级
   */
  priority: string;
  /**
   * 默认标记
   */
  defaultTag: boolean;
  min?: number;
  max?: number;
}

/**
 * 接口 [新增效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/31851) 的 **返回类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `POST /api/sys/dict/item/alence`
 * @更新时间 `2024-01-12 17:43:29`
 */
export type PostApiSysDictItemAlenceResponse = string;

/**
 * 接口 [修改效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/31854) 的 **请求类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `PUT /api/sys/dict/item/alence`
 * @更新时间 `2024-01-12 17:41:03`
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
  defaultTag?: string;
  priority?: string;
  min?: string;
  max?: string;
}

/**
 * 接口 [修改效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/31854) 的 **返回类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `PUT /api/sys/dict/item/alence`
 * @更新时间 `2024-01-12 17:41:03`
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
 * @更新时间 `2024-01-12 17:41:21`
 */
export interface GetApiSysDictItemAlenceDictItemIdRequest {
  dictItemId: string;
}

/**
 * 接口 [查询效价类型详情↗](https://yapi.sharing8.cn/project/529/interface/api/31860) 的 **返回类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `GET /api/sys/dict/item/alence/{dictItemId}`
 * @更新时间 `2024-01-12 17:41:21`
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
  defaultTag?: string;
  priority?: string;
  min?: string;
  max?: string;
}

/**
 * 接口 [查询效价列表↗](https://yapi.sharing8.cn/project/529/interface/api/31863) 的 **请求类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `POST /api/sys/dict/item/alences`
 * @更新时间 `2024-03-04 16:58:15`
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
 * @更新时间 `2024-03-04 16:58:15`
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
    creator: string;
    creatAt: string;
    dictItemId: string;
    defaultTag: string;
    priority: string;
  }[];
}

/**
 * 接口 [效价类型（下拉框）↗](https://yapi.sharing8.cn/project/529/interface/api/33202) 的 **请求类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `GET /api/sys/dict/item/titer-level`
 * @更新时间 `2024-02-02 10:38:30`
 */
export interface GetApiSysDictItemTiterLevelRequest {}

/**
 * 接口 [效价类型（下拉框）↗](https://yapi.sharing8.cn/project/529/interface/api/33202) 的 **返回类型**
 *
 * @分类 [效价类型↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5320)
 * @请求头 `GET /api/sys/dict/item/titer-level`
 * @更新时间 `2024-02-02 10:38:30`
 */
export interface GetApiSysDictItemTiterLevelResponse {
  key: string;
  value: string;
}

/**
 * 接口 [样品批次查询↗](https://yapi.sharing8.cn/project/529/interface/api/31905) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/batchSamples`
 * @更新时间 `2024-02-07 15:24:44`
 */
export interface PostApiCoreLabRegistrationBatchSamplesRequest {
  stationNo?: string;
  sampleCode?: string;
  bsNo?: string;
}

/**
 * 接口 [样品批次查询↗](https://yapi.sharing8.cn/project/529/interface/api/31905) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/batchSamples`
 * @更新时间 `2024-02-07 15:24:44`
 */
export type PostApiCoreLabRegistrationBatchSamplesResponse = {
  bsNo: string;
  stationNo: string;
  sampleCode?: string;
  totalCount?: string;
  accepted?: string;
  outDate?: string;
  status?: string;
  totalQualified?: string;
  /**
   * 验收不合格样本
   */
  totalUnqualified: string;
}[];

/**
 * 接口 [获取血浆类型统计数据↗](https://yapi.sharing8.cn/project/529/interface/api/31911) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/registration/plasmaTypes/{bsNo}`
 * @更新时间 `2023-12-29 10:55:59`
 */
export interface GetApiCoreLabRegistrationPlasmaTypesBsNoRequest {
  /**
   * 样品批号
   */
  bsNo: string;
}

/**
 * 接口 [获取血浆类型统计数据↗](https://yapi.sharing8.cn/project/529/interface/api/31911) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/registration/plasmaTypes/{bsNo}`
 * @更新时间 `2023-12-29 10:55:59`
 */
export type GetApiCoreLabRegistrationPlasmaTypesBsNoResponse = {
  /**
   * 血浆类型
   */
  plasmaType: string;
  /**
   * 样品总数
   */
  count: number;
}[];

/**
 * 接口 [根据样本批号查询检验项目↗](https://yapi.sharing8.cn/project/529/interface/api/31914) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/registration/labProjects/{bsNo}`
 * @更新时间 `2024-02-23 10:42:52`
 */
export interface GetApiCoreLabRegistrationLabProjectsBsNoRequest {
  bsNo: string;
}

/**
 * 接口 [根据样本批号查询检验项目↗](https://yapi.sharing8.cn/project/529/interface/api/31914) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/registration/labProjects/{bsNo}`
 * @更新时间 `2024-02-23 10:42:52`
 */
export type GetApiCoreLabRegistrationLabProjectsBsNoResponse = {
  plasmaType: string;
  labProjects: {
    /**
     * 检测项目id
     */
    projectId: string;
    /**
     * 检测项目简称
     */
    projectAbbr: string;
    /**
     * 血浆类型
     */
    plasmaType?: string;
    /**
     * 默认选择
     */
    check: boolean;
  }[];
}[];

/**
 * 接口 [添加检验项目到明细↗](https://yapi.sharing8.cn/project/529/interface/api/31917) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/labItem`
 * @更新时间 `2023-12-29 17:46:30`
 */
export type PostApiCoreLabRegistrationLabItemRequest = {
  /**
   * 血浆类型
   */
  plasmaType: string;
  /**
   * 项目id
   */
  projectId: string;
  /**
   * 样本批号
   */
  bsNo: string;
}[];

/**
 * 接口 [添加检验项目到明细↗](https://yapi.sharing8.cn/project/529/interface/api/31917) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/labItem`
 * @更新时间 `2023-12-29 17:46:30`
 */
export interface PostApiCoreLabRegistrationLabItemResponse {}

/**
 * 接口 [查询检验明细↗](https://yapi.sharing8.cn/project/529/interface/api/31920) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/registration/labItem/{bsNo}`
 * @更新时间 `2023-12-30 10:07:51`
 */
export interface GetApiCoreLabRegistrationLabItemBsNoRequest {
  /**
   * 样品批号
   */
  bsNo: string;
}

/**
 * 接口 [查询检验明细↗](https://yapi.sharing8.cn/project/529/interface/api/31920) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/registration/labItem/{bsNo}`
 * @更新时间 `2023-12-30 10:07:51`
 */
export type GetApiCoreLabRegistrationLabItemBsNoResponse = {
  /**
   * 检测项目
   */
  projectAbbr: string;
  /**
   * 检测方法
   */
  methodAbbr: string;
  /**
   * 合格样品总数
   */
  totalQualified: number;
  /**
   * 不合格样品总数
   */
  totalUnqualified: number;
  /**
   * 未检测样品总数
   */
  totalNotCheck: number;
  /**
   * 检验项目id
   */
  projectId: string;
}[];

/**
 * 接口 [查询效价明细↗](https://yapi.sharing8.cn/project/529/interface/api/31923) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/registration/labItem/titer/{bsNo}`
 * @更新时间 `2023-12-30 19:33:32`
 */
export interface GetApiCoreLabRegistrationLabItemTiterBsNoRequest {
  /**
   * 样品批号
   */
  bsNo: string;
}

/**
 * 接口 [查询效价明细↗](https://yapi.sharing8.cn/project/529/interface/api/31923) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/registration/labItem/titer/{bsNo}`
 * @更新时间 `2023-12-30 19:33:32`
 */
export type GetApiCoreLabRegistrationLabItemTiterBsNoResponse = {
  /**
   * 检测项目
   */
  projectAbbr: string;
  /**
   * 检测方法
   */
  methodAbbr: string;
  /**
   * 高效价总数
   */
  totalHighTiter: number;
  /**
   * 低效价总数
   */
  totalLowTiter: number;
  /**
   * 无效价总数
   */
  totalNormal: number;
  /**
   * 未检测样品总数
   */
  totalNotCheck: number;
  /**
   * 检验项目id
   */
  projectId: string;
  /**
   * 血浆类型
   */
  plasmaType?: string;
}[];

/**
 * 接口 [登记完成↗](https://yapi.sharing8.cn/project/529/interface/api/31926) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/labItem/labReport`
 * @更新时间 `2023-12-29 11:30:00`
 */
export interface PostApiCoreLabRegistrationLabItemLabReportRequest {
  /**
   * 样品批号
   */
  bsNo: string;
}

/**
 * 接口 [登记完成↗](https://yapi.sharing8.cn/project/529/interface/api/31926) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/labItem/labReport`
 * @更新时间 `2023-12-29 11:30:00`
 */
export type PostApiCoreLabRegistrationLabItemLabReportResponse = string;

/**
 * 接口 [撤销登记↗](https://yapi.sharing8.cn/project/529/interface/api/31929) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `DELETE /api/core/lab/registration/labItem/labReport/{bsNo}`
 * @更新时间 `2023-12-29 11:31:06`
 */
export interface DeleteApiCoreLabRegistrationLabItemLabReportBsNoRequest {
  bsNo: string;
}

/**
 * 接口 [撤销登记↗](https://yapi.sharing8.cn/project/529/interface/api/31929) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `DELETE /api/core/lab/registration/labItem/labReport/{bsNo}`
 * @更新时间 `2023-12-29 11:31:06`
 */
export type DeleteApiCoreLabRegistrationLabItemLabReportBsNoResponse = string;

/**
 * 接口 [删除检验明细↗](https://yapi.sharing8.cn/project/529/interface/api/31932) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `DELETE /api/core/lab/registration/labItem`
 * @更新时间 `2024-01-03 19:04:01`
 */
export interface DeleteApiCoreLabRegistrationLabItemRequest {
  /**
   * 项目id
   */
  projectId: string;
  /**
   * 样本批号
   */
  bsNo: string;
  cause: string;
}

/**
 * 接口 [删除检验明细↗](https://yapi.sharing8.cn/project/529/interface/api/31932) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `DELETE /api/core/lab/registration/labItem`
 * @更新时间 `2024-01-03 19:04:01`
 */
export type DeleteApiCoreLabRegistrationLabItemResponse = string;

/**
 * 接口 [检测明细不合格登记↗](https://yapi.sharing8.cn/project/529/interface/api/31935) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `PUT /api/core/lab/registration/labItem`
 * @更新时间 `2024-01-03 20:10:27`
 */
export interface PutApiCoreLabRegistrationLabItemRequest {
  /**
   * 样品编号
   */
  sampleNo: string;
  /**
   * 不合格
   */
  unqualified?: string;
  /**
   * 复核人姓名
   */
  checker: string;
  /**
   * 复核人编号
   */
  checkeName: string;
  /**
   * 批次信息
   */
  bsNo: string;
  /**
   * OD值
   */
  od?: number;
  /**
   * Cutoff值
   */
  cutoff?: number;
  /**
   * CT值
   */
  ct?: number;
  projectIds: string[];
}

/**
 * 接口 [检测明细不合格登记↗](https://yapi.sharing8.cn/project/529/interface/api/31935) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `PUT /api/core/lab/registration/labItem`
 * @更新时间 `2024-01-03 20:10:27`
 */
export type PutApiCoreLabRegistrationLabItemResponse = string;

/**
 * 接口 [未检测登记↗](https://yapi.sharing8.cn/project/529/interface/api/31944) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `PUT /api/core/lab/registration/labItem/notCheck`
 * @更新时间 `2024-01-03 20:10:34`
 */
export interface PutApiCoreLabRegistrationLabItemNotCheckRequest {
  sampleNo: string;
  bsNo: string;
  projectIds: string[];
}

/**
 * 接口 [未检测登记↗](https://yapi.sharing8.cn/project/529/interface/api/31944) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `PUT /api/core/lab/registration/labItem/notCheck`
 * @更新时间 `2024-01-03 20:10:34`
 */
export type PutApiCoreLabRegistrationLabItemNotCheckResponse = string;

/**
 * 接口 [录入效价结果↗](https://yapi.sharing8.cn/project/529/interface/api/31953) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/labItem/titer`
 * @更新时间 `2024-01-04 13:36:13`
 */
export type PostApiCoreLabRegistrationLabItemTiterRequest = {
  /**
   * 样品编号
   */
  sampleNo: string;
  /**
   * 检测日期
   */
  checkAt: string;
  /**
   * 效价结果
   */
  conclusion: string;
  /**
   * 当前批次
   */
  bsNo: string;
  /**
   * 项目id
   */
  projectId: string;
}[];

/**
 * 接口 [录入效价结果↗](https://yapi.sharing8.cn/project/529/interface/api/31953) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/labItem/titer`
 * @更新时间 `2024-01-04 13:36:13`
 */
export type PostApiCoreLabRegistrationLabItemTiterResponse = string;

/**
 * 接口 [查询样本明细↗](https://yapi.sharing8.cn/project/529/interface/api/31959) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/labItems`
 * @更新时间 `2024-03-04 18:40:51`
 */
export interface PostApiCoreLabRegistrationLabItemsRequest {
  pageSize: number;
  currPage: number;
  /**
   * 检验项目id
   */
  projectId: string;
  /**
   * 查询类型：合格、不合格、未检测、没有效价、有效价
   */
  type: string;
  /**
   * 样本批次
   */
  bsNo: string;
  /**
   * 样品编号
   */
  sampleId?: string;
  /**
   * 效价结果
   */
  valenceResult?: string;
  /**
   * 检测日期
   */
  checkAt?: string;
}

/**
 * 接口 [查询样本明细↗](https://yapi.sharing8.cn/project/529/interface/api/31959) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/labItems`
 * @更新时间 `2024-03-04 18:40:51`
 */
export interface PostApiCoreLabRegistrationLabItemsResponse {
  totalCount: number;
  totalPage: number;
  currPage: number;
  pageSize: number;
  result?: {
    /**
     * 样品编号
     */
    sampleNo: string;
    /**
     * 浆员编号
     */
    donorNo: string;
    /**
     * 浆员姓名
     */
    name: string;
    /**
     * OD值
     */
    od?: number;
    /**
     * Cutoff值
     */
    cutoff?: number;
    /**
     * CT值
     */
    ct?: number;
    /**
     * 血浆类型
     */
    plasmaType?: number;
    /**
     * 效价类型
     */
    titerType?: number;
    /**
     * 效价结果
     */
    conclusion?: string;
    /**
     * 检测日期
     */
    checkAt?: string;
    /**
     * 血型
     */
    bloodType?: string;
    /**
     * 不合格
     */
    unqualified?: string;
  }[];
}

/**
 * 接口 [根据样本编号获取浆员信息↗](https://yapi.sharing8.cn/project/529/interface/api/31983) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/registration/donor/{sampleNo}`
 * @更新时间 `2024-01-03 20:11:19`
 */
export interface GetApiCoreLabRegistrationDonorSampleNoRequest {
  sampleNo: string;
}

/**
 * 接口 [根据样本编号获取浆员信息↗](https://yapi.sharing8.cn/project/529/interface/api/31983) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/registration/donor/{sampleNo}`
 * @更新时间 `2024-01-03 20:11:19`
 */
export interface GetApiCoreLabRegistrationDonorSampleNoResponse {
  /**
   * 浆员编号
   */
  donorNo: string;
  /**
   * 浆员姓名
   */
  name: string;
  /**
   * 采集日期
   */
  collectAt: string;
  /**
   * 血型
   */
  bloodType: string;
}

/**
 * 接口 [修改效价结果↗](https://yapi.sharing8.cn/project/529/interface/api/31986) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `PUT /api/core/lab/registration/labItem/titer`
 * @更新时间 `2024-01-03 20:11:30`
 */
export interface PutApiCoreLabRegistrationLabItemTiterRequest {
  reason?: string;
  checkeName?: string;
  checker?: string;
  bsNo?: string;
  conclusion?: string;
  sampleNo?: string;
}

/**
 * 接口 [修改效价结果↗](https://yapi.sharing8.cn/project/529/interface/api/31986) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `PUT /api/core/lab/registration/labItem/titer`
 * @更新时间 `2024-01-03 20:11:30`
 */
export interface PutApiCoreLabRegistrationLabItemTiterResponse {}

/**
 * 接口 [查询当前项目的样本信息 ↗](https://yapi.sharing8.cn/project/529/interface/api/31989) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/sample`
 * @更新时间 `2024-01-03 20:11:46`
 */
export interface PostApiCoreLabRegistrationSampleRequest {
  bsNo: string;
  projectId: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [查询当前项目的样本信息 ↗](https://yapi.sharing8.cn/project/529/interface/api/31989) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/sample`
 * @更新时间 `2024-01-03 20:11:46`
 */
export type PostApiCoreLabRegistrationSampleResponse = {
  sampleNo: string;
  donorNo: string;
  name: string;
}[];

/**
 * 接口 [效价导入↗](https://yapi.sharing8.cn/project/529/interface/api/32034) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/titer/upload`
 * @更新时间 `2024-01-03 10:33:42`
 */
export interface PostApiCoreLabRegistrationTiterUploadRequest {
  file: FileData;
  projectId: string;
  bsNo: string;
}

/**
 * 接口 [效价导入↗](https://yapi.sharing8.cn/project/529/interface/api/32034) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/registration/titer/upload`
 * @更新时间 `2024-01-03 10:33:42`
 */
export interface PostApiCoreLabRegistrationTiterUploadResponse {
  /**
   * 汇总
   */
  summary: {
    /**
     * 文件名称
     */
    filename: string;
    /**
     * 上传日期
     */
    uploadAt: string;
    /**
     * 上传用户
     */
    username: string;
    /**
     * 数据总数
     */
    count: string;
    /**
     * 保存成功总数
     */
    successCount: string;
    /**
     * 保存失败总数
     */
    faildCount: string;
  };
  dataSaved: {
    /**
     * 样本id
     */
    sampleId: string;
    /**
     * 浆员编号
     */
    donorNo: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * 血浆类型
     */
    plasmaType: string;
    /**
     * 效价类型
     */
    titerType: string;
    /**
     * 结论
     */
    conclusion: string;
    /**
     * od值
     */
    od: string;
    /**
     * 效价结果值
     */
    titerResult: string;
    /**
     * 检测日期
     */
    checkAt: string;
  }[];
  dataFaild: {
    unsavedData: string;
    notes: string;
  }[];
}

/**
 * 接口 [效价excel导入↗](https://yapi.sharing8.cn/project/529/interface/api/32037) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/titer/excel/import`
 * @更新时间 `2024-01-04 09:32:29`
 */
export interface PostApiCoreLabTiterExcelImportRequest {
  file: FileData;
  stationNo: string;
  /**
   *     //普通
   *     N,
   *     //乙免
   *     B,
   * //狂免
   *     R,
   *     //破免
   *     T,
   *     //巨细胞
   *     C;
   */
  type: string;
}

/**
 * 接口 [效价excel导入↗](https://yapi.sharing8.cn/project/529/interface/api/32037) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/titer/excel/import`
 * @更新时间 `2024-01-04 09:32:29`
 */
export interface PostApiCoreLabTiterExcelImportResponse {
  detailVOS: {
    /**
     * 批次号
     */
    batchNo: string;
    /**
     * 样本编号
     */
    sampleNo: string;
    /**
     * 效价值
     */
    titerResult: string;
    /**
     * od值
     */
    od: string;
    /**
     * 记录日期
     */
    checkTime: string;
    /**
     * 检测类型
     */
    type: string;
  }[];
  failedNos: string[];
}

/**
 * 接口 [效价导入列表↗](https://yapi.sharing8.cn/project/529/interface/api/32040) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/titer`
 * @更新时间 `2024-01-03 15:08:27`
 */
export interface GetApiCoreLabTiterRequest {
  stationNo?: string;
  sampleBatchNo?: string;
  type?: string;
  currPage: string;
  pageSize: string;
  /**
   * 记录开始日期
   */
  recordStartDate?: string;
  /**
   * 记录结束日期
   */
  recordEndDate?: string;
}

/**
 * 接口 [效价导入列表↗](https://yapi.sharing8.cn/project/529/interface/api/32040) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/titer`
 * @更新时间 `2024-01-03 15:08:27`
 */
export interface GetApiCoreLabTiterResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    /**
     * 采浆公司编号
     */
    stationNo: string;
    /**
     * 样本批号
     */
    sampleBatchNo: string;
    /**
     * 检测类型
     */
    type: string;
    /**
     * 样本总数
     */
    sampleTotal: number;
    /**
     * 高效价总数
     */
    highTiterNum: number;
    /**
     * 低效价总数
     */
    lowTiterNum: number;
    /**
     * 无效价总数
     */
    noTiterNum: number;
    /**
     * 记录人
     */
    recorder: string;
    /**
     * 记录时间
     */
    recordTime: string;
  }[];
}

/**
 * 接口 [效价导入列表批次详情效价类↗](https://yapi.sharing8.cn/project/529/interface/api/32052) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/titer/name-count`
 * @更新时间 `2024-01-04 10:37:08`
 */
export interface GetApiCoreLabTiterNameCountRequest {
  /**
   * 批次号
   */
  bsNo: string;
  /**
   * 检测类型
   *  //普通
   *     N,
   *     //乙免
   *     B,
   *     //狂免
   *     R,
   *     //破免
   *     T,
   *     //巨细胞
   *     C;
   */
  type: string;
}

/**
 * 接口 [效价导入列表批次详情效价类↗](https://yapi.sharing8.cn/project/529/interface/api/32052) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/titer/name-count`
 * @更新时间 `2024-01-04 10:37:08`
 */
export type GetApiCoreLabTiterNameCountResponse = {
  /**
   * 效价类型名称
   */
  titerType: string;
  /**
   * 数量
   */
  count: number;
}[];

/**
 * 接口 [效价导入批次详情↗](https://yapi.sharing8.cn/project/529/interface/api/32055) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/titer/detail`
 * @更新时间 `2024-01-03 20:35:40`
 */
export interface GetApiCoreLabTiterDetailRequest {
  pageSize: string;
  currPage: string;
  batchNo: string;
  /**
   * 效价类型名称
   */
  titerType?: string;
}

/**
 * 接口 [效价导入批次详情↗](https://yapi.sharing8.cn/project/529/interface/api/32055) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/titer/detail`
 * @更新时间 `2024-01-03 20:35:40`
 */
export interface GetApiCoreLabTiterDetailResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    /**
     * 样本编号
     */
    sampleNo: string;
    /**
     * 效价结果值
     */
    titerResult: string;
    /**
     * od值
     */
    od: string;
    /**
     * 检测日期
     */
    checkTime: string;
  }[];
}

/**
 * 接口 [效价删除↗](https://yapi.sharing8.cn/project/529/interface/api/32058) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `DELETE /api/core/lab/titer`
 * @更新时间 `2024-01-04 10:38:15`
 */
export interface DeleteApiCoreLabTiterRequest {
  /**
   * 批次号
   */
  bsNo: string;
  /**
   *     //普通     N,     //乙免     B,     //狂免     R,     //破免     T,     //巨细胞     C;
   */
  type: string;
}

/**
 * 接口 [效价删除↗](https://yapi.sharing8.cn/project/529/interface/api/32058) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `DELETE /api/core/lab/titer`
 * @更新时间 `2024-01-04 10:38:15`
 */
export type DeleteApiCoreLabTiterResponse = null;

/**
 * 接口 [查询已添加的检验项目↗](https://yapi.sharing8.cn/project/529/interface/api/33337) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/item/project/{bsNo}`
 * @更新时间 `2024-02-21 21:00:16`
 */
export interface GetApiCoreLabItemProjectBsNoRequest {
  bsNo: string;
}

/**
 * 接口 [查询已添加的检验项目↗](https://yapi.sharing8.cn/project/529/interface/api/33337) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/item/project/{bsNo}`
 * @更新时间 `2024-02-21 21:00:16`
 */
export type GetApiCoreLabItemProjectBsNoResponse = {
  label: string;
  value: string;
}[];

/**
 * 接口 [根据检验项目id查询预登记物料信息↗](https://yapi.sharing8.cn/project/529/interface/api/33342) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/project/material/{projectId}`
 * @更新时间 `2024-02-21 19:47:17`
 */
export interface GetApiCoreLabProjectMaterialProjectIdRequest {
  projectId: string;
}

/**
 * 接口 [根据检验项目id查询预登记物料信息↗](https://yapi.sharing8.cn/project/529/interface/api/33342) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/project/material/{projectId}`
 * @更新时间 `2024-02-21 19:47:17`
 */
export type GetApiCoreLabProjectMaterialProjectIdResponse = {
  testType: string;
  materialName: string;
  factory: string;
  reagentBatch: string;
  releaseNo: string;
  expireDate: string;
  deadline: string;
  projectName: string;
  id: string;
}[];

/**
 * 接口 [查询已登记的物料信息↗](https://yapi.sharing8.cn/project/529/interface/api/33347) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/material/details/{bsNo}`
 * @更新时间 `2024-02-22 11:16:08`
 */
export interface GetApiCoreLabMaterialDetailsBsNoRequest {
  bsNo: string;
}

/**
 * 接口 [查询已登记的物料信息↗](https://yapi.sharing8.cn/project/529/interface/api/33347) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `GET /api/core/lab/material/details/{bsNo}`
 * @更新时间 `2024-02-22 11:16:08`
 */
export type GetApiCoreLabMaterialDetailsBsNoResponse = {
  testType: string;
  materialName: string;
  factory: string;
  reagentBatch: string;
  releaseNo: string;
  expireDate: string;
  deadline: string;
  projectName: string;
  id: string;
}[];

/**
 * 接口 [物料登记↗](https://yapi.sharing8.cn/project/529/interface/api/33352) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/material/detail`
 * @更新时间 `2024-02-21 20:26:34`
 */
export interface PostApiCoreLabMaterialDetailRequest {
  id: string;
  fkProjectId: string;
  bsNo: string;
}

/**
 * 接口 [物料登记↗](https://yapi.sharing8.cn/project/529/interface/api/33352) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `POST /api/core/lab/material/detail`
 * @更新时间 `2024-02-21 20:26:34`
 */
export type PostApiCoreLabMaterialDetailResponse = string;

/**
 * 接口 [删除物料明细↗](https://yapi.sharing8.cn/project/529/interface/api/33357) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `DELETE /api/core/lab/material/detail`
 * @更新时间 `2024-02-21 19:51:42`
 */
export interface DeleteApiCoreLabMaterialDetailRequest {
  id: string;
  cause: string;
}

/**
 * 接口 [删除物料明细↗](https://yapi.sharing8.cn/project/529/interface/api/33357) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `DELETE /api/core/lab/material/detail`
 * @更新时间 `2024-02-21 19:51:42`
 */
export type DeleteApiCoreLabMaterialDetailResponse = string;

/**
 * 接口 [撤销检测明细不合格登记↗](https://yapi.sharing8.cn/project/529/interface/api/33776) 的 **请求类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `DELETE /api/core/lab/registration/labItem/unqualified`
 * @更新时间 `2024-03-06 11:26:17`
 */
export interface DeleteApiCoreLabRegistrationLabItemUnqualifiedRequest {
  /**
   * 样品编号
   */
  sampleNo: string;
  /**
   * 批次信息
   */
  bsNo: string;
  /**
   * 检验项目id
   */
  projectId: string[];
}

/**
 * 接口 [撤销检测明细不合格登记↗](https://yapi.sharing8.cn/project/529/interface/api/33776) 的 **返回类型**
 *
 * @分类 [检验结果登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5341)
 * @请求头 `DELETE /api/core/lab/registration/labItem/unqualified`
 * @更新时间 `2024-03-06 11:26:17`
 */
export type DeleteApiCoreLabRegistrationLabItemUnqualifiedResponse = string;

/**
 * 接口 [检验报告审核↗](https://yapi.sharing8.cn/project/529/interface/api/32022) 的 **请求类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `PUT /api/core/lab/report/review/{reportNo}`
 * @更新时间 `2024-01-02 17:08:39`
 */
export interface PutApiCoreLabReportReviewReportNoRequest {
  reportNo: string;
}

/**
 * 接口 [检验报告审核↗](https://yapi.sharing8.cn/project/529/interface/api/32022) 的 **返回类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `PUT /api/core/lab/report/review/{reportNo}`
 * @更新时间 `2024-01-02 17:08:39`
 */
export type PutApiCoreLabReportReviewReportNoResponse = string;

/**
 * 接口 [检验报告审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32025) 的 **请求类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `PUT /api/core/lab/report/review/revoke`
 * @更新时间 `2024-01-02 17:07:08`
 */
export interface PutApiCoreLabReportReviewRevokeRequest {
  /**
   * 报告编号
   */
  reportNo: string;
  /**
   * 原因
   */
  cause: string;
}

/**
 * 接口 [检验报告审核撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32025) 的 **返回类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `PUT /api/core/lab/report/review/revoke`
 * @更新时间 `2024-01-02 17:07:08`
 */
export type PutApiCoreLabReportReviewRevokeResponse = string;

/**
 * 接口 [检验报告发布↗](https://yapi.sharing8.cn/project/529/interface/api/32028) 的 **请求类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `PUT /api/core/lab/report/review/release/{reportNo}`
 * @更新时间 `2024-01-04 13:54:27`
 */
export interface PutApiCoreLabReportReviewReleaseReportNoRequest {
  reportNo: string;
}

/**
 * 接口 [检验报告发布↗](https://yapi.sharing8.cn/project/529/interface/api/32028) 的 **返回类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `PUT /api/core/lab/report/review/release/{reportNo}`
 * @更新时间 `2024-01-04 13:54:27`
 */
export interface PutApiCoreLabReportReviewReleaseReportNoResponse {}

/**
 * 接口 [检验报告制作↗](https://yapi.sharing8.cn/project/529/interface/api/32043) 的 **请求类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `POST /api/core/lab/report/made/{reportNo}`
 * @更新时间 `2024-01-03 15:57:51`
 */
export interface PostApiCoreLabReportMadeReportNoRequest {
  reportNo: string;
}

/**
 * 接口 [检验报告制作↗](https://yapi.sharing8.cn/project/529/interface/api/32043) 的 **返回类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `POST /api/core/lab/report/made/{reportNo}`
 * @更新时间 `2024-01-03 15:57:51`
 */
export type PostApiCoreLabReportMadeReportNoResponse = string;

/**
 * 接口 [检验报告制作撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32046) 的 **请求类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `PUT /api/core/lab/report/made/revoke`
 * @更新时间 `2024-01-03 17:51:28`
 */
export interface PutApiCoreLabReportMadeRevokeRequest {
  reportNo: string;
  cause: string;
}

/**
 * 接口 [检验报告制作撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32046) 的 **返回类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `PUT /api/core/lab/report/made/revoke`
 * @更新时间 `2024-01-03 17:51:28`
 */
export interface PutApiCoreLabReportMadeRevokeResponse {}

/**
 * 接口 [检验报告列表查询↗](https://yapi.sharing8.cn/project/529/interface/api/32061) 的 **请求类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `POST /api/core/lab/reports`
 * @更新时间 `2024-02-20 15:29:40`
 */
export interface PostApiCoreLabReportsRequest {
  /**
   * 样品批号
   */
  bsNo?: string;
  /**
   * 采浆公司
   */
  stationNo?: string;
  /**
   * 开始发布日期
   */
  begnIssueAt?: string;
  /**
   * 结束发布日期
   */
  endIssueAt?: string;
  /**
   * 发布状态
   */
  state?: string;
  /**
   * 样品类型
   */
  sampleCode?: string;
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [检验报告列表查询↗](https://yapi.sharing8.cn/project/529/interface/api/32061) 的 **返回类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `POST /api/core/lab/reports`
 * @更新时间 `2024-02-20 15:29:40`
 */
export interface PostApiCoreLabReportsResponse {
  totalCount: number;
  pageSize: null;
  totalPage: null;
  currPage: null;
  result?: {
    /**
     * 采浆公司
     */
    stationName: string;
    /**
     * 样品批号
     */
    bsNo: string;
    /**
     * 样品类型
     */
    sampleCode: string;
    /**
     * 合格样品总数
     */
    totalQualified: string;
    /**
     * 不合格样品总数
     */
    totalUnqualified: string;
    /**
     * 高效价总数
     */
    totalHighTiter: string;
    /**
     * 低效价总数
     */
    totalLowTiter: string;
    /**
     * 无效价总数
     */
    totalNormal: string;
    /**
     * 审核人
     */
    reviewer: string;
    /**
     * 审核日期
     */
    reviewAt: string;
    /**
     * 发布人
     */
    issuer: string;
    /**
     * 发布日期
     */
    issueAt: string;
    reportNo: string;
    /**
     * 制作人
     */
    producer: string;
    /**
     * 制作时间
     */
    productionAt: string;
  }[];
}

/**
 * 接口 [根据检验报告no查询不合格样本↗](https://yapi.sharing8.cn/project/529/interface/api/33257) 的 **请求类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `POST /api/core/lab/report/unqualified`
 * @更新时间 `2024-02-20 15:55:44`
 */
export interface PostApiCoreLabReportUnqualifiedRequest {
  reportNo: string;
  pageSize: number;
  currPage: number;
}

/**
 * 接口 [根据检验报告no查询不合格样本↗](https://yapi.sharing8.cn/project/529/interface/api/33257) 的 **返回类型**
 *
 * @分类 [检验报告↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5362)
 * @请求头 `POST /api/core/lab/report/unqualified`
 * @更新时间 `2024-02-20 15:55:44`
 */
export interface PostApiCoreLabReportUnqualifiedResponse {
  totalCount: number;
  pageSize: null;
  totalPage: null;
  currPage: null;
  result?: {
    /**
     * 样本编号
     */
    sampleNo: string;
    /**
     * 浆员编号
     */
    donorNo: string;
    /**
     * 浆员姓名
     */
    donorName: string;
    /**
     * 不合格项目
     */
    projectName: string;
    /**
     * OD值
     */
    od?: string;
    /**
     * Cutoff值
     */
    cutoff?: string;
    /**
     * 检测时间
     */
    checkAt: string;
    /**
     * 检测方法
     */
    methodName: string;
  }[];
}

/**
 * 接口 [新增预登记↗](https://yapi.sharing8.cn/project/529/interface/api/33287) 的 **请求类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `POST /api/core/lab/material/template`
 * @更新时间 `2024-02-21 15:14:06`
 */
export interface PostApiCoreLabMaterialTemplateRequest {
  /**
   * 检验项目id
   */
  fkProjectId: string;
  /**
   * 检测类型
   */
  testType: string;
  /**
   * 物料名称
   */
  materialName: string;
  /**
   * 试剂厂家
   */
  factory: string;
  /**
   * 试剂批号
   */
  reagentBatch: string;
  /**
   * 试剂放行单号
   */
  releaseNo: string;
  /**
   * 有效期至(yyyy-MM-dd)
   */
  expireDate: string;
  /**
   * 截至使用时间(yyyy-MM-dd)
   */
  deadline: string;
}

/**
 * 接口 [新增预登记↗](https://yapi.sharing8.cn/project/529/interface/api/33287) 的 **返回类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `POST /api/core/lab/material/template`
 * @更新时间 `2024-02-21 15:14:06`
 */
export type PostApiCoreLabMaterialTemplateResponse = string;

/**
 * 接口 [修改预登记↗](https://yapi.sharing8.cn/project/529/interface/api/33292) 的 **请求类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template`
 * @更新时间 `2024-02-21 15:52:53`
 */
export interface PutApiCoreLabMaterialTemplateRequest {
  /**
   * 检验项目id
   */
  fkProjectId?: string;
  /**
   * 检测类型
   */
  testType?: string;
  /**
   * 物料名称
   */
  materialName?: string;
  /**
   * 试剂厂家
   */
  factory?: string;
  /**
   * 试剂批号
   */
  reagentBatch?: string;
  /**
   * 试剂放行单号
   */
  releaseNo?: string;
  /**
   * 有效期至(yyyy-MM-dd)
   */
  expireDate?: string;
  /**
   * 截至使用时间(yyyy-MM-dd)
   */
  deadline?: string;
  /**
   * 主键id
   */
  id: string;
}

/**
 * 接口 [修改预登记↗](https://yapi.sharing8.cn/project/529/interface/api/33292) 的 **返回类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template`
 * @更新时间 `2024-02-21 15:52:53`
 */
export type PutApiCoreLabMaterialTemplateResponse = string;

/**
 * 接口 [复核预登记↗](https://yapi.sharing8.cn/project/529/interface/api/33302) 的 **请求类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template/review/{id}`
 * @更新时间 `2024-02-21 14:53:39`
 */
export interface PutApiCoreLabMaterialTemplateReviewIdRequest {
  id: string;
}

/**
 * 接口 [复核预登记↗](https://yapi.sharing8.cn/project/529/interface/api/33302) 的 **返回类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template/review/{id}`
 * @更新时间 `2024-02-21 14:53:39`
 */
export type PutApiCoreLabMaterialTemplateReviewIdResponse = string;

/**
 * 接口 [取消复核↗](https://yapi.sharing8.cn/project/529/interface/api/33307) 的 **请求类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template/review/cancel`
 * @更新时间 `2024-02-21 16:42:33`
 */
export interface PutApiCoreLabMaterialTemplateReviewCancelRequest {
  id: string;
  cause: string;
}

/**
 * 接口 [取消复核↗](https://yapi.sharing8.cn/project/529/interface/api/33307) 的 **返回类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template/review/cancel`
 * @更新时间 `2024-02-21 16:42:33`
 */
export type PutApiCoreLabMaterialTemplateReviewCancelResponse = string;

/**
 * 接口 [启用↗](https://yapi.sharing8.cn/project/529/interface/api/33312) 的 **请求类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template/enable/{id}`
 * @更新时间 `2024-02-21 15:00:12`
 */
export interface PutApiCoreLabMaterialTemplateEnableIdRequest {
  id: string;
}

/**
 * 接口 [启用↗](https://yapi.sharing8.cn/project/529/interface/api/33312) 的 **返回类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template/enable/{id}`
 * @更新时间 `2024-02-21 15:00:12`
 */
export type PutApiCoreLabMaterialTemplateEnableIdResponse = string;

/**
 * 接口 [停用↗](https://yapi.sharing8.cn/project/529/interface/api/33317) 的 **请求类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template/disable/{id}`
 * @更新时间 `2024-02-21 15:02:50`
 */
export interface PutApiCoreLabMaterialTemplateDisableIdRequest {
  id: string;
}

/**
 * 接口 [停用↗](https://yapi.sharing8.cn/project/529/interface/api/33317) 的 **返回类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template/disable/{id}`
 * @更新时间 `2024-02-21 15:02:50`
 */
export type PutApiCoreLabMaterialTemplateDisableIdResponse = string;

/**
 * 接口 [查询物料预登记列表↗](https://yapi.sharing8.cn/project/529/interface/api/33322) 的 **请求类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `POST /api/core/lab/material/templates`
 * @更新时间 `2024-02-21 15:38:29`
 */
export interface PostApiCoreLabMaterialTemplatesRequest {
  currPage: string;
  pageSize: string;
}

/**
 * 接口 [查询物料预登记列表↗](https://yapi.sharing8.cn/project/529/interface/api/33322) 的 **返回类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `POST /api/core/lab/material/templates`
 * @更新时间 `2024-02-21 15:38:29`
 */
export interface PostApiCoreLabMaterialTemplatesResponse {
  totalCount: number;
  pageSize: null;
  totalPage: null;
  currPage: null;
  result?: {
    /**
     * 检测项目
     */
    projectName?: string;
    /**
     * 启用状态
     */
    state: string;
    /**
     * 检测类型
     */
    testType: string;
    /**
     * 物料名称
     */
    materialName: string;
    /**
     * 试剂厂家
     */
    factory: string;
    /**
     * 试剂批号
     */
    reagentBatch: string;
    /**
     * 试剂放行单
     */
    releaseNo: string;
    /**
     * 有效期至
     */
    expireDate: string;
    /**
     * 使用截至日期
     */
    deadline: string;
    /**
     * 复核人
     */
    reviewer: string;
    /**
     * 复核日期
     */
    reviewAt: string;
  }[];
}

/**
 * 接口 [查询物料预登记详情↗](https://yapi.sharing8.cn/project/529/interface/api/33332) 的 **请求类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `GET /api/core/lab/material/template/{id}`
 * @更新时间 `2024-02-21 17:20:47`
 */
export interface GetApiCoreLabMaterialTemplateIdRequest {
  id: string;
}

/**
 * 接口 [查询物料预登记详情↗](https://yapi.sharing8.cn/project/529/interface/api/33332) 的 **返回类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `GET /api/core/lab/material/template/{id}`
 * @更新时间 `2024-02-21 17:20:47`
 */
export interface GetApiCoreLabMaterialTemplateIdResponse {
  id: string;
  fkProjectId: string;
  testType: string;
  materialName: string;
  factory: string;
  reagentBatch: string;
  releaseNo: string;
  expireDate: string;
  deadline: string;
}

/**
 * 接口 [修改物料预登记使用截至日期↗](https://yapi.sharing8.cn/project/529/interface/api/33769) 的 **请求类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template/deadline`
 * @更新时间 `2024-03-06 09:43:52`
 */
export interface PutApiCoreLabMaterialTemplateDeadlineRequest {
  /**
   * 截至使用时间(yyyy-MM-dd)
   */
  deadline: string;
  /**
   * 主键id
   */
  id: string;
}

/**
 * 接口 [修改物料预登记使用截至日期↗](https://yapi.sharing8.cn/project/529/interface/api/33769) 的 **返回类型**
 *
 * @分类 [物料预登记↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5739)
 * @请求头 `PUT /api/core/lab/material/template/deadline`
 * @更新时间 `2024-03-06 09:43:52`
 */
export type PutApiCoreLabMaterialTemplateDeadlineResponse = string;

/**
 * 接口 [新增必检项↗](https://yapi.sharing8.cn/project/529/interface/api/33372) 的 **请求类型**
 *
 * @分类 [必检项↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5748)
 * @请求头 `POST /api/core/lab/request/item`
 * @更新时间 `2024-02-22 15:48:05`
 */
export interface PostApiCoreLabRequestItemRequest {
  rawImm: string;
  sampleType: string;
  projectIds: string[];
}

/**
 * 接口 [新增必检项↗](https://yapi.sharing8.cn/project/529/interface/api/33372) 的 **返回类型**
 *
 * @分类 [必检项↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5748)
 * @请求头 `POST /api/core/lab/request/item`
 * @更新时间 `2024-02-22 15:48:05`
 */
export type PostApiCoreLabRequestItemResponse = string;

/**
 * 接口 [修改必检项↗](https://yapi.sharing8.cn/project/529/interface/api/33377) 的 **请求类型**
 *
 * @分类 [必检项↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5748)
 * @请求头 `PUT /api/core/lab/request/item`
 * @更新时间 `2024-02-22 16:22:56`
 */
export interface PutApiCoreLabRequestItemRequest {
  rawImm?: string;
  sampleType: string;
  projectIds?: string[];
}

/**
 * 接口 [修改必检项↗](https://yapi.sharing8.cn/project/529/interface/api/33377) 的 **返回类型**
 *
 * @分类 [必检项↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5748)
 * @请求头 `PUT /api/core/lab/request/item`
 * @更新时间 `2024-02-22 16:22:56`
 */
export type PutApiCoreLabRequestItemResponse = string;

/**
 * 接口 [删除必检项↗](https://yapi.sharing8.cn/project/529/interface/api/33382) 的 **请求类型**
 *
 * @分类 [必检项↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5748)
 * @请求头 `DELETE /api/core/lab/request/item`
 * @更新时间 `2024-02-22 15:56:34`
 */
export interface DeleteApiCoreLabRequestItemRequest {
  /**
   * 复核人id
   */
  reviewNo: string;
  /**
   * 复核人姓名
   */
  reviewName: string;
  /**
   * 原因
   */
  cause?: string;
  rawImm: string;
  /**
   * 血浆样本必须传
   */
  sampleType?: string;
}

/**
 * 接口 [删除必检项↗](https://yapi.sharing8.cn/project/529/interface/api/33382) 的 **返回类型**
 *
 * @分类 [必检项↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5748)
 * @请求头 `DELETE /api/core/lab/request/item`
 * @更新时间 `2024-02-22 15:56:34`
 */
export type DeleteApiCoreLabRequestItemResponse = string;

/**
 * 接口 [查询必检项列表↗](https://yapi.sharing8.cn/project/529/interface/api/33387) 的 **请求类型**
 *
 * @分类 [必检项↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5748)
 * @请求头 `POST /api/core/lab/request/items`
 * @更新时间 `2024-02-23 11:15:04`
 */
export interface PostApiCoreLabRequestItemsRequest {
  sampleType?: string;
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [查询必检项列表↗](https://yapi.sharing8.cn/project/529/interface/api/33387) 的 **返回类型**
 *
 * @分类 [必检项↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5748)
 * @请求头 `POST /api/core/lab/request/items`
 * @更新时间 `2024-02-23 11:15:04`
 */
export interface PostApiCoreLabRequestItemsResponse {
  totalCount: number;
  pageSize: null;
  totalPage: null;
  currPage: null;
  result?: {
    rawImm: string;
    sampleType: string;
    projectCodes: string[];
    createAt: string;
    creator: string;
    updateAt: string;
    updater: string;
    sampleTypeEnum: string;
    rawImmEnum: string;
  }[];
}

/**
 * 接口 [查询必检项详情↗](https://yapi.sharing8.cn/project/529/interface/api/33392) 的 **请求类型**
 *
 * @分类 [必检项↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5748)
 * @请求头 `POST /api/core/lab/request/item/single`
 * @更新时间 `2024-02-22 17:03:24`
 */
export interface PostApiCoreLabRequestItemSingleRequest {
  sampleType: string;
  rawImm: string;
}

/**
 * 接口 [查询必检项详情↗](https://yapi.sharing8.cn/project/529/interface/api/33392) 的 **返回类型**
 *
 * @分类 [必检项↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5748)
 * @请求头 `POST /api/core/lab/request/item/single`
 * @更新时间 `2024-02-22 17:03:24`
 */
export interface PostApiCoreLabRequestItemSingleResponse {
  projectIds: string[];
  sampleType: string;
  rawImm?: string;
}

/* prettier-ignore-end */
