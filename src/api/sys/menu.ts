import { defHttp } from '/@/utils/http/axios';
import { GetSysRoleUserMenutreeResponse } from '@/api/type/roleManage';

enum Api {
  GetMenuList = '/sys/role/user/menutree',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<GetSysRoleUserMenutreeResponse>({ url: Api.GetMenuList });
};
