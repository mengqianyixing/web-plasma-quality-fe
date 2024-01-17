/*
 * @Author: HxB
 * @Date: 2024-01-03 10:01:13
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-17 16:59:14
 * @Description: 血浆批检疫期报告
 * @FilePath: \psms-fe\src\api\quarantine\plasma-batch.ts
 */
// @TODO: 稳定版待补充类型声明
import { defHttp } from '@/utils/http/axios';

/**
 * 查询放行单列表
 * @param params
 * @returns
 */
export const getPlasmaBatchReleases = (params?: any) =>
  defHttp.get(
    { url: '/api/core/batch/plasma/releases', params },
    {
      joinParamsToUrl: true,
    },
  );

/**
 * 查询放行单详情
 * @param params
 * @returns
 */
export const getPlasmaBatchRelease = (params?: any) =>
  defHttp.get(
    { url: '/api/core/batch/plasma/release', params },
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
