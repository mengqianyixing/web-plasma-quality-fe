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
 * @更新时间 `2023-12-26 14:17:51`
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
 * @更新时间 `2023-12-26 14:17:51`
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

/* prettier-ignore-end */
