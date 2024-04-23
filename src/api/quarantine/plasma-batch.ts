/*
 * @Author: HxB
 * @Date: 2024-01-03 10:01:13
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-19 14:27:00
 * @Description: 血浆批检疫期报告
 * @FilePath: \psms-fe\src\api\quarantine\plasma-batch.ts
 */
// @TODO: [API TYPE] 稳定版后再使用 ytt 统一生成类型声明
import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBatchPlasmaReleasesRequest,
  GetApiCoreBatchPlasmaReleasesResponse,
  GetApiCoreBatchPlasmaUnReleasesRequest,
  GetApiCoreBatchPlasmaUnReleasesResponse,
} from '@/api/type/batchManage';

import {
  GetApiCoreBatchPlasmaReleaseBagsRequest,
  GetApiCoreBatchPlasmaReleaseBagsResponse,
} from '@/api/type/qualityMange';

/**
 * 查询未放行列表
 * @param params
 * @returns
 */
export const getPlasmaBatchUnReleases = (params?: GetApiCoreBatchPlasmaUnReleasesRequest) =>
  defHttp.get<GetApiCoreBatchPlasmaUnReleasesResponse>(
    { url: '/api/core/batch/plasma/un-releases', params },
    {
      joinParamsToUrl: true,
    },
  );

/**
 * 查询放行单列表
 * @param params
 * @returns
 */
export const getPlasmaBatchReleases = (params?: GetApiCoreBatchPlasmaReleasesRequest) =>
  defHttp.get<GetApiCoreBatchPlasmaReleasesResponse>(
    { url: '/api/core/batch/plasma/releases', params },
    {
      joinParamsToUrl: true,
    },
  );

/**
 * 批检疫期报告新增弹窗血浆明细
 * @param params
 * @returns
 */
export const getPlasmaBatchReleaseBags = (params?: GetApiCoreBatchPlasmaReleaseBagsRequest) =>
  defHttp.get<GetApiCoreBatchPlasmaReleaseBagsResponse>(
    { url: '/api/core/batch/plasma/release/bags', params },
    {
      joinParamsToUrl: true,
    },
  );

/**
 * 新建批放行单
 * @param params
 * @returns
 */
export const addPlasmaBatchRelease = (data: any) =>
  defHttp.post({ url: '/api/core/batch/plasma/release', data });

/**
 * 复核/取消批放行单
 * @param params
 * @returns
 */
export const setPlasmaBatchRelease = (data: any) =>
  defHttp.put({ url: '/api/core/batch/plasma/release', data });
