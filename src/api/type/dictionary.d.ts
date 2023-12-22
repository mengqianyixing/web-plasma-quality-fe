/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [查询字典列表↗](https://yapi.sharing8.cn/project/521/interface/api/31686) 的 **请求类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `POST /api/sys/dicts`
 * @更新时间 `2023-12-20 15:05:20`
 */
export interface PostApiSysDictsRequest {
  /**
   * 当前页
   */
  currPage: number;
  /**
   * 分页大小
   */
  pageSize: number;
  /**
   * 字典名称
   */
  dictName?: string;
  /**
   * 字典编号
   */
  dictNo?: string;
}

/**
 * 接口 [查询字典列表↗](https://yapi.sharing8.cn/project/521/interface/api/31686) 的 **返回类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `POST /api/sys/dicts`
 * @更新时间 `2023-12-20 15:05:20`
 */
export interface PostApiSysDictsResponse {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  result?: {
    /**
     * 主键
     */
    dictId: string;
    /**
     * 字典名称
     */
    dictName: string;
    /**
     * 字典编号
     */
    dictNo: string;
    /**
     * 否系统级别字典,0-否,1-是，默认否
     */
    systemLevel?: string;
    /**
     * 创建时间
     */
    createAt?: string;
    /**
     * 创建人
     */
    creater?: string;
    /**
     * 更新时间
     */
    updateAt?: string;
    /**
     * 更新人
     */
    updater?: string;
    /**
     * 字典描述
     */
    dictDesc?: string;
  }[];
}

/**
 * 接口 [新增字典↗](https://yapi.sharing8.cn/project/521/interface/api/31689) 的 **请求类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `POST /api/sys/dict`
 * @更新时间 `2023-12-20 15:58:38`
 */
export interface PostApiSysDictRequest {
  /**
   * 字典名称
   */
  dictName: string;
  /**
   * 字典编码
   */
  dictNo: string;
  /**
   * 描述
   */
  dictDesc?: string;
  /**
   * 是否系统级别
   */
  systemLevel?: boolean;
}

/**
 * 接口 [新增字典↗](https://yapi.sharing8.cn/project/521/interface/api/31689) 的 **返回类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `POST /api/sys/dict`
 * @更新时间 `2023-12-20 15:58:38`
 */
export type PostApiSysDictResponse = string;

/**
 * 接口 [修改字典↗](https://yapi.sharing8.cn/project/521/interface/api/31692) 的 **请求类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `PUT /api/sys/dict`
 * @更新时间 `2023-12-20 16:11:15`
 */
export interface PutApiSysDictRequest {
  /**
   * 主键
   */
  dictId: string;
  dictName?: string;
  dictNo?: string;
  systemLevel?: boolean;
  dictDesc?: string;
}

/**
 * 接口 [修改字典↗](https://yapi.sharing8.cn/project/521/interface/api/31692) 的 **返回类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `PUT /api/sys/dict`
 * @更新时间 `2023-12-20 16:11:15`
 */
export type PutApiSysDictResponse = string;

/**
 * 接口 [删除字典↗](https://yapi.sharing8.cn/project/521/interface/api/31695) 的 **请求类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `DELETE /api/sys/dict/{dictId}`
 * @更新时间 `2023-12-20 16:11:22`
 */
export interface DeleteApiSysDictDictIdRequest {
  dictId: string;
}

/**
 * 接口 [删除字典↗](https://yapi.sharing8.cn/project/521/interface/api/31695) 的 **返回类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `DELETE /api/sys/dict/{dictId}`
 * @更新时间 `2023-12-20 16:11:22`
 */
export type DeleteApiSysDictDictIdResponse = string;

/**
 * 接口 [查询字典详情↗](https://yapi.sharing8.cn/project/521/interface/api/31698) 的 **请求类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `GET /api/sys/dict/{dictId}`
 * @更新时间 `2023-12-20 15:20:39`
 */
export interface GetApiSysDictDictIdRequest {
  dictId: string;
}

/**
 * 接口 [查询字典详情↗](https://yapi.sharing8.cn/project/521/interface/api/31698) 的 **返回类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `GET /api/sys/dict/{dictId}`
 * @更新时间 `2023-12-20 15:20:39`
 */
export interface GetApiSysDictDictIdResponse {
  dictId?: string;
  dictName?: string;
  dictNo?: string;
  systemLevel?: boolean;
  createAt?: string;
  creater?: string;
  updateAt?: string;
  updater?: string;
  dictDesc?: string;
}

/**
 * 接口 [查询字典项列表↗](https://yapi.sharing8.cn/project/521/interface/api/31701) 的 **请求类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `POST /api/sys/dict/items`
 * @更新时间 `2023-12-22 10:55:33`
 */
export interface PostApiSysDictItemsRequest {
  currPage: number;
  pageSize: number;
  dataDictId: string;
  itemKey?: string;
  itemValue?: string;
}

/**
 * 接口 [查询字典项列表↗](https://yapi.sharing8.cn/project/521/interface/api/31701) 的 **返回类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `POST /api/sys/dict/items`
 * @更新时间 `2023-12-22 10:55:33`
 */
export interface PostApiSysDictItemsResponse {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  result?: {
    /**
     * 主键
     */
    dictItemId: string;
    /**
     * 数据字典表id
     */
    dataDictId: string;
    /**
     * 字典项名称
     */
    itemKey: string;
    /**
     * 字典项值
     */
    itemValue: string;
    /**
     * 字典项描述
     */
    itemDesc?: string;
    /**
     * 排序值
     */
    sort?: string;
    /**
     * 是否启用
     */
    enable?: boolean;
    /**
     * 创建时间
     */
    createAt?: string;
    /**
     * 创建人
     */
    creater?: string;
    /**
     * 更新时间
     */
    updateAt?: string;
    /**
     * 更新人
     */
    updater?: string;
  }[];
}

/**
 * 接口 [新增字典项↗](https://yapi.sharing8.cn/project/521/interface/api/31704) 的 **请求类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `POST /api/sys/dict/item`
 * @更新时间 `2023-12-20 15:41:52`
 */
export interface PostApiSysDictItemRequest {
  /**
   * 名称
   */
  itemKey: string;
  /**
   * 数据值
   */
  itemValue: string;
  /**
   * 描述
   */
  itemDesc?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 是否启用
   */
  enable?: boolean;
  dataDictId: string;
}

/**
 * 接口 [新增字典项↗](https://yapi.sharing8.cn/project/521/interface/api/31704) 的 **返回类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `POST /api/sys/dict/item`
 * @更新时间 `2023-12-20 15:41:52`
 */
export type PostApiSysDictItemResponse = string;

/**
 * 接口 [修改字典项↗](https://yapi.sharing8.cn/project/521/interface/api/31707) 的 **请求类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `PUT /api/sys/dict/item`
 * @更新时间 `2023-12-20 15:44:57`
 */
export interface PutApiSysDictItemRequest {
  dictItemId: string;
  itemKey?: string;
  itemValue?: string;
  itemDesc?: string;
  sort?: number;
  enable?: boolean;
}

/**
 * 接口 [修改字典项↗](https://yapi.sharing8.cn/project/521/interface/api/31707) 的 **返回类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `PUT /api/sys/dict/item`
 * @更新时间 `2023-12-20 15:44:57`
 */
export interface PutApiSysDictItemResponse {}

/**
 * 接口 [删除字典项↗](https://yapi.sharing8.cn/project/521/interface/api/31710) 的 **请求类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `DELETE /api/sys/dict/item/{dictItemId}`
 * @更新时间 `2023-12-22 11:04:48`
 */
export interface DeleteApiSysDictItemDictItemIdRequest {
  dictItemId: string;
}

/**
 * 接口 [删除字典项↗](https://yapi.sharing8.cn/project/521/interface/api/31710) 的 **返回类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `DELETE /api/sys/dict/item/{dictItemId}`
 * @更新时间 `2023-12-22 11:04:48`
 */
export type DeleteApiSysDictItemDictItemIdResponse = string;

/**
 * 接口 [查询字典项详情↗](https://yapi.sharing8.cn/project/521/interface/api/31713) 的 **请求类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `GET /api/sys/dict/item/{dictItemId}`
 * @更新时间 `2023-12-20 15:54:18`
 */
export interface GetApiSysDictItemDictItemIdRequest {
  dictItemId: string;
}

/**
 * 接口 [查询字典项详情↗](https://yapi.sharing8.cn/project/521/interface/api/31713) 的 **返回类型**
 *
 * @分类 [字典管理↗](https://yapi.sharing8.cn/project/521/interface/api/cat_5250)
 * @请求头 `GET /api/sys/dict/item/{dictItemId}`
 * @更新时间 `2023-12-20 15:54:18`
 */
export interface GetApiSysDictItemDictItemIdResponse {
  dictItemId: string;
  dataDictId: string;
  itemKey: string;
  itemValue: string;
  itemDesc?: string;
  sort?: number;
  enable?: boolean;
  createAt?: string;
  creater?: string;
  updateAt?: string;
  updater?: string;
}

/* prettier-ignore-end */
