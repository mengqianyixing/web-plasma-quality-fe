/*
 * @Author: HxB
 * @Date: 2024-01-03 10:01:13
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-11 14:54:21
 * @Description: 菜单权限管理
 * @FilePath: \psms-fe\src\api\oauth\menu.ts
 */
import { defHttp } from '@/utils/http/axios';

/**
 * 获取所有用户
 * @param params
 * @returns
 */
export const getCasDoorUsers = (params?) =>
  defHttp.get(
    { url: '/api/sys/casdoor/get-users', params },
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
    { url: '/api/sys/casdoor/get-roles', params },
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
export const setCasDoorRoles = (data) =>
  defHttp.post({ url: '/api/sys/casdoor/update-role', data });

// /**
//  * 获取角色详情
//  * @param params
//  * @returns
//  */
// export const getRoleDomainAuth = (params) =>
//   defHttp.get(
//     { url: '/api/sys/casdoor/get-role', params },
//     {
//       joinParamsToUrl: true,
//     },
//   );

/**
 * 增加角色
 * @param data
 * @returns
 */
export const addCasDoorRole = (data) =>
  defHttp.post(
    { url: '/api/sys/casdoor/add-role', data },
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
  defHttp.post(
    { url: '/api/sys/casdoor/delete-role', data },
    {
      joinParamsToUrl: true,
    },
  );
