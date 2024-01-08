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
 * 接口 [不合格箱管理列表↗](https://yapi.sharing8.cn/project/529/interface/api/32133) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `GET /api/core/bank/unqualified/boxes`
 * @更新时间 `2024-01-06 16:52:49`
 */
export interface GetApiCoreBankUnqualifiedBoxesRequest {
  /**
   * 箱号
   */
  boxNo?: string;
  pageSize: string;
  currPage: string;
}

/**
 * 接口 [不合格箱管理列表↗](https://yapi.sharing8.cn/project/529/interface/api/32133) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `GET /api/core/bank/unqualified/boxes`
 * @更新时间 `2024-01-06 16:52:49`
 */
export interface GetApiCoreBankUnqualifiedBoxesResponse {
  totalCount?: number;
  pageSize?: null;
  currPage?: null;
  totalPage?: null;
  result?: {
    /**
     * 箱号
     */
    boxNo: string;
    /**
     * 容量
     */
    capacity: string;
    /**
     * 已存放血浆数量（袋）
     */
    bagNum: string;
    /**
     * 不合格原因
     */
    unqReason: string;
    /**
     * 库房编号
     */
    houseNo: string;
    /**
     * 库房名称
     */
    houseName: string;
  }[];
}

/**
 * 接口 [不合格箱管理新增↗](https://yapi.sharing8.cn/project/529/interface/api/32136) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bank/unqualified/box`
 * @更新时间 `2024-01-06 17:59:34`
 */
export interface PostApiCoreBankUnqualifiedBoxRequest {
  /**
   * 不合格原因
   */
  unqReason: string;
  unqReasonKey: string;
  /**
   * 容量
   */
  capacity: string;
  /**
   * 不合格库房编号
   */
  houseNo: string;
}

/**
 * 接口 [不合格箱管理新增↗](https://yapi.sharing8.cn/project/529/interface/api/32136) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `POST /api/core/bank/unqualified/box`
 * @更新时间 `2024-01-06 17:59:34`
 */
export interface PostApiCoreBankUnqualifiedBoxResponse {}

/**
 * 接口 [不合格箱编辑↗](https://yapi.sharing8.cn/project/529/interface/api/32142) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `PUT /api/core/bank/unqualified/box`
 * @更新时间 `2024-01-06 10:52:52`
 */
export interface PutApiCoreBankUnqualifiedBoxRequest {
  /**
   * 箱号
   */
  boxNo: string;
  /**
   * 容量
   */
  capacity: string;
}

/**
 * 接口 [不合格箱编辑↗](https://yapi.sharing8.cn/project/529/interface/api/32142) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `PUT /api/core/bank/unqualified/box`
 * @更新时间 `2024-01-06 10:52:52`
 */
export interface PutApiCoreBankUnqualifiedBoxResponse {}

/**
 * 接口 [不合格箱撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32154) 的 **请求类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `DELETE /api/core/bank/unqualified/box/{boxNo}`
 * @更新时间 `2024-01-06 16:56:08`
 */
export interface DeleteApiCoreBankUnqualifiedBoxBoxNoRequest {
  /**
   * 箱号
   */
  boxNo: string;
}

/**
 * 接口 [不合格箱撤销↗](https://yapi.sharing8.cn/project/529/interface/api/32154) 的 **返回类型**
 *
 * @分类 [不合格管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5299)
 * @请求头 `DELETE /api/core/bank/unqualified/box/{boxNo}`
 * @更新时间 `2024-01-06 16:56:08`
 */
export interface DeleteApiCoreBankUnqualifiedBoxBoxNoResponse {}

/* prettier-ignore-end */
