/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询编码列表↗](https://yapi.sharing8.cn/project/521/interface/api/31626) 的 **请求类型**
 *
 * @分类 [编码管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5236)
 * @请求头 `GET /api/sys/codingRules`
 * @更新时间 `2023-12-19 10:13:16`
 */
export interface GetApiSysCodingRulesRequest {}

/**
 * 接口 [查询编码列表↗](https://yapi.sharing8.cn/project/521/interface/api/31626) 的 **返回类型**
 *
 * @分类 [编码管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5236)
 * @请求头 `GET /api/sys/codingRules`
 * @更新时间 `2023-12-19 10:13:16`
 */
export type GetApiSysCodingRulesResponse = {
  /**
   * 编码类型
   */
  codingType: string;
  /**
   * 编码名称
   */
  name: string;
  /**
   * 创建时间
   */
  createdAt: string;
  /**
   * 更新时间
   */
  updatedAt: string;
}[];

/**
 * 接口 [查询编码详情↗](https://yapi.sharing8.cn/project/521/interface/api/31635) 的 **请求类型**
 *
 * @分类 [编码管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5236)
 * @请求头 `GET /api/sys/codingRule/{codingType}`
 * @更新时间 `2023-12-25 09:59:08`
 */
export interface GetApiSysCodingRuleCodingTypeRequest {
  codingType: string;
}

/**
 * 接口 [查询编码详情↗](https://yapi.sharing8.cn/project/521/interface/api/31635) 的 **返回类型**
 *
 * @分类 [编码管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5236)
 * @请求头 `GET /api/sys/codingRule/{codingType}`
 * @更新时间 `2023-12-25 09:59:08`
 */
export type GetApiSysCodingRuleCodingTypeResponse = {
  order: number;
  id: {
    id: string;
    remark: string;
  };
  remark: string;
  length: number;
  constant?: string;
}[];

/**
 * 接口 [更新编码规则↗](https://yapi.sharing8.cn/project/521/interface/api/31638) 的 **请求类型**
 *
 * @分类 [编码管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5236)
 * @请求头 `PUT /api/sys/codingRule`
 * @更新时间 `2023-12-25 09:59:27`
 */
export interface PutApiSysCodingRuleRequest {
  /**
   * 标签类型
   */
  codingType: string;
  adapterRules: {
    order: number;
    id: {
      id: string;
      remark: string;
    }[];
    remark: string;
    length: number;
    constant?: string;
  }[];
}

/**
 * 接口 [更新编码规则↗](https://yapi.sharing8.cn/project/521/interface/api/31638) 的 **返回类型**
 *
 * @分类 [编码管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5236)
 * @请求头 `PUT /api/sys/codingRule`
 * @更新时间 `2023-12-25 09:59:27`
 */
export interface PutApiSysCodingRuleResponse {}

/**
 * 接口 [获取编码↗](https://yapi.sharing8.cn/project/521/interface/api/31674) 的 **请求类型**
 *
 * @分类 [编码管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5236)
 * @请求头 `POST /api/sys/codingRules/nextNo`
 * @更新时间 `2023-12-19 17:48:13`
 */
export interface PostApiSysCodingRulesNextNoRequest {
  /**
   * 编码类型
   */
  codingType: string;
  /**
   * 血浆类型
   */
  plasmaType?: string;
  /**
   * 不合格项目
   */
  failedCode?: string;
}

/**
 * 接口 [获取编码↗](https://yapi.sharing8.cn/project/521/interface/api/31674) 的 **返回类型**
 *
 * @分类 [编码管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5236)
 * @请求头 `POST /api/sys/codingRules/nextNo`
 * @更新时间 `2023-12-19 17:48:13`
 */
export type PostApiSysCodingRulesNextNoResponse = string;

/* prettier-ignore-end */
