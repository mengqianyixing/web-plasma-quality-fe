/*
 * @Author: HxB
 * @Date: 2024-01-03 10:01:13
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-26 16:00:11
 * @Description: 策略管理
 * @FilePath: \psms-fe\src\api\oauth\policies.ts
 */
// @TODO: [API TYPE] 稳定版后再使用 ytt 统一生成类型声明
import { defHttp } from '@/utils/http/axios';

/**
 * 获取所有策略角色
 * @param params
 * @returns
 */
export const getCasDoorAllPolicyRoles = (params?) =>
  defHttp.get(
    { url: '/api/sys/casdoor/all-roles', params },
    {
      joinParamsToUrl: true,
    },
  );

/**
 * 获取策略-分页
 * @param params
 * @returns
 */
export const getCasDoorPolicies = (params) => {
  if (params.name) {
    params.field = 'name';
    params.value = params.name;
  }
  return defHttp.get(
    { url: 'api/sys/casdoor/policies', params },
    {
      joinParamsToUrl: true,
    },
  );
};

/**
 * 修改策略
 * @param data
 * @returns
 */
export const setCasDoorPolicy = (data) => defHttp.put({ url: '/api/sys/casdoor/policy', data });

/**
 * 增加策略
 * @param data
 * @returns
 */
export const addCasDoorPolicy = (data) => defHttp.post({ url: '/api/sys/casdoor/policy', data });

/**
 * 删除策略
 * @param data
 * @returns
 */
export const deleteCasDoorPolicy = (data) =>
  defHttp.delete({ url: '/api/sys/casdoor/policy', data });
