import { defHttp } from '@/utils/http/axios';
import { GetApiSysRoleUserMenutreeResponse } from '@/api/type/roleManage';

enum Api {
  GetMenuList = '/api/sys/role/user/menutree',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<GetApiSysRoleUserMenutreeResponse>({ url: Api.GetMenuList });
};
