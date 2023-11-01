import {
  AccountParams,
  DeptListItem,
  RoleParams,
  RolePageParams,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';
import {
  DeleteSysMenuIdRequest,
  GetSysMenuTreeResponse,
  PostSysMenuRequest,
  PostSysMenuResponse,
  PostSysMenusRequest,
  PostSysMenusResponse,
  PutSysMenuRequest,
  PutSysMenuResponse,
} from '@/api/type/menuManage';

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/sys/menus',
  MenuTree = '/sys/menu/tree',
  restfulMenuUrl = '/sys/menu',
  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/system/getAllRoleList',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: PostSysMenusRequest) =>
  defHttp.post<PostSysMenusResponse>({ url: Api.MenuList, params });

export const getMenuTree = () => defHttp.get<GetSysMenuTreeResponse>({ url: Api.MenuTree });

export const addMenu = (params: PostSysMenuRequest) =>
  defHttp.post<PostSysMenuResponse>({ url: Api.restfulMenuUrl, params });

export const deleteMenu = (id: DeleteSysMenuIdRequest['id']) =>
  defHttp.delete({ url: Api.restfulMenuUrl + `/${id}` });

export const editMenu = (params: PutSysMenuRequest) =>
  defHttp.put<PutSysMenuResponse>({ url: Api.restfulMenuUrl, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
