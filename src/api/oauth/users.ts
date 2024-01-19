/*
 * @Author: HxB
 * @Date: 2024-01-16 18:07:49
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-19 14:26:50
 * @Description: 用户管理
 * @FilePath: \psms-fe\src\api\oauth\users.ts
 */
// @TODO: [API TYPE] 稳定版后再使用 ytt 统一生成类型声明
import { defHttp } from '@/utils/http/axios';

/**
 * 获取所有用户
 * @param params
 * @returns
 */
export const getCasDoorUsers = (params?) => {
  if (params.name) {
    params.field = 'name';
    params.value = params.name;
  }
  return defHttp.get(
    { url: '/api/sys/casdoor/users', params },
    {
      joinParamsToUrl: true,
    },
  );
};

/**
 * 获取用户详情
 * @param params
 * @returns
 */
export const getCasDoorUserInfo = (params) => {
  return defHttp.get(
    { url: '/api/sys/casdoor/roles', params },
    {
      joinParamsToUrl: true,
    },
  );
};

/**
 * 修改用户资料
 * @param data
 * @returns
 */
export const setCasDoorUser = (data) => defHttp.put({ url: '/api/sys/casdoor/user', data });

/**
 * 修改用户密码
 * @param data
 * @returns
 */
export const setCasDoorUserPwd = (data) =>
  defHttp.put({ url: '/api/sys/casdoor/user-password', data });

/**
 * 增加用户
 * @param data
 * @returns
 */
export const addCasDoorUser = (data) => defHttp.post({ url: '/api/sys/casdoor/user', data });

/**
 * 删除用户
 * @param data
 * @returns
 */
export const deleteCasDoorUser = (data) => defHttp.delete({ url: '/api/sys/casdoor/user', data });
