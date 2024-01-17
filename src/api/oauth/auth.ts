/*
 * @Author: HxB
 * @Date: 2024-01-03 10:01:13
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-16 18:30:25
 * @Description: 菜单权限管理
 * @FilePath: \psms-fe\src\api\oauth\auth.ts
 */
// @TODO: 稳定版待补充类型声明
import { defHttp } from '@/utils/http/axios';

/**
 * 获取所有用户
 * @param params
 * @returns
 */
export const getCasDoorAllUsers = (params?) =>
  defHttp.get(
    { url: '/api/sys/casdoor/all-users', params },
    {
      joinParamsToUrl: true,
    },
  );

/**
 * 获取所有角色
 * @param params
 * @returns
 */
export const getCasDoorRoles = (params) => {
  if (params.name) {
    params.field = 'name';
    params.value = params.name;
  }
  return defHttp.get(
    { url: '/api/sys/casdoor/roles', params },
    {
      joinParamsToUrl: true,
    },
  );
};

/**
 * 修改角色资料
 * @param data
 * @returns
 */
export const setCasDoorRole = (data) => defHttp.put({ url: '/api/sys/casdoor/role', data });

/**
 * 增加角色
 * @param data
 * @returns
 */
export const addCasDoorRole = (data) =>
  defHttp.post(
    { url: '/api/sys/casdoor/role', data },
    {
      joinParamsToUrl: true,
    },
  );

/**
 * 删除角色
 * @param data
 * @returns
 */
export const deleteCasDoorRole = (data) =>
  defHttp.delete(
    { url: '/api/sys/casdoor/role', data },
    {
      joinParamsToUrl: true,
    },
  );
