/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [不合格登记↗](https://yapi.sharing8.cn/project/529/interface/api/31794) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified`
 * @更新时间 `2023-12-23 17:40:52`
 */
export interface PostApiCoreBagUnqualifiedRequest {
  /**
   * 不合格原因
   */
  fkFailedCode: string;
  /**
   * 复核人
   */
  checker: string;
  /**
   * 血浆编号
   */
  fkBagNo: string;
}

/**
 * 接口 [不合格登记↗](https://yapi.sharing8.cn/project/529/interface/api/31794) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bag/unqualified`
 * @更新时间 `2023-12-23 17:40:52`
 */
export type PostApiCoreBagUnqualifiedResponse = null;

/**
 * 接口 [不合格样本登记↗](https://yapi.sharing8.cn/project/529/interface/api/31974) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/sample/unqualified`
 * @更新时间 `2023-12-29 17:28:53`
 */
export interface PostApiCoreSampleUnqualifiedRequest {
  /**
   * 复核人
   */
  checker: string;
  /**
   * 样本编号
   */
  sampleNo: string;
  /**
   * 不合格原因code
   */
  unqualifiedReasonCode: string;
}

/**
 * 接口 [不合格样本登记↗](https://yapi.sharing8.cn/project/529/interface/api/31974) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/sample/unqualified`
 * @更新时间 `2023-12-29 17:28:53`
 */
export type PostApiCoreSampleUnqualifiedResponse = string;

/* prettier-ignore-end */
