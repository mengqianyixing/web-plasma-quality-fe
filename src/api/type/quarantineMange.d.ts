/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File;

/**
 * 接口 [血袋检疫期追溯计算↗](https://yapi.sharing8.cn/project/529/interface/api/32942) 的 **请求类型**
 *
 * @分类 [检疫期管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5559)
 * @请求头 `GET /api/core/bag/quarantine`
 * @更新时间 `2024-01-29 16:44:25`
 */
export interface GetApiCoreBagQuarantineRequest {}

/**
 * 接口 [血袋检疫期追溯计算↗](https://yapi.sharing8.cn/project/529/interface/api/32942) 的 **返回类型**
 *
 * @分类 [检疫期管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5559)
 * @请求头 `GET /api/core/bag/quarantine`
 * @更新时间 `2024-01-29 16:44:25`
 */
export type GetApiCoreBagQuarantineResponse = null;

/**
 * 接口 [超一年期确认查询↗](https://yapi.sharing8.cn/project/529/interface/api/32947) 的 **请求类型**
 *
 * @分类 [检疫期管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5559)
 * @请求头 `GET /api/core/bag/plasma/expired`
 * @更新时间 `2024-01-29 18:23:43`
 */
export interface GetApiCoreBagPlasmaExpiredRequest {
  /**
   * 批次编码
   */
  batchNo?: string;
  /**
   * 血浆编码
   */
  bagNo?: string;
  /**
   * 浆员编码
   */
  donorNo?: string;
  /**
   *  是否确认 空：全部；true已确认；false未确认
   */
  isConfirm?: string;
  /**
   * 当前页码不能为空
   */
  currPage: string;
  /**
   * 页数大小不能为空
   */
  pageSize: string;
}

/**
 * 接口 [超一年期确认查询↗](https://yapi.sharing8.cn/project/529/interface/api/32947) 的 **返回类型**
 *
 * @分类 [检疫期管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5559)
 * @请求头 `GET /api/core/bag/plasma/expired`
 * @更新时间 `2024-01-29 18:23:43`
 */
export interface GetApiCoreBagPlasmaExpiredResponse {
  totalCount?: number;
  pageSize?: number;
  totalPage?: number;
  currPage?: number;
  result?: {
    /**
     * 浆袋编码
     */
    bagNo: string;
    /**
     * 浆站编码
     */
    stationNo: string;
    /**
     * 浆站名称
     */
    stationName: string;
    /**
     * 批次编码
     */
    batchNo: string;
    /**
     *    血浆效价类型 N, // 普浆     T, // 破免     B, // 乙免     R, // 狂免     A, // 炭疽     C, // 新冠     G  // 巨细胞
     */
    plasmaImmType: string;
    /**
     * 采浆日期
     */
    collectAt: string;
    /**
     * 确认人
     */
    creator: string;
    /**
     * 确认日期
     */
    createAt: string;
    /**
     * 浆员编码
     */
    donorNo: string;
    /**
     * 浆员名称
     */
    donorName: string;
    /**
     * 最后采浆日期
     */
    lastCollectAt: string;
    /**
     * 最后回访日期
     */
    lastCallBackAt: string;
    /**
     * 浆员状态
     */
    donatorStatus: string;
  }[];
}

/**
 * 接口 [超一年前二次确认↗](https://yapi.sharing8.cn/project/529/interface/api/32952) 的 **请求类型**
 *
 * @分类 [检疫期管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5559)
 * @请求头 `POST /api/core/bag/plasma/expired`
 * @更新时间 `2024-01-30 11:42:43`
 */
export interface PostApiCoreBagPlasmaExpiredRequest {
  bagNo?: string;
}

/**
 * 接口 [超一年前二次确认↗](https://yapi.sharing8.cn/project/529/interface/api/32952) 的 **返回类型**
 *
 * @分类 [检疫期管理↗](https://yapi.sharing8.cn/project/529/interface/api/cat_5559)
 * @请求头 `POST /api/core/bag/plasma/expired`
 * @更新时间 `2024-01-30 11:42:43`
 */
export type PostApiCoreBagPlasmaExpiredResponse = null;

/* prettier-ignore-end */
