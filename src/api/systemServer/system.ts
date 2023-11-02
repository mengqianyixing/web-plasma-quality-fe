import {
  AccountParams,
  RoleParams,
  AccountListGetResultModel,
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
import {
  DeleteSysDeptIdRequest,
  DeleteSysDeptIdResponse,
  PostSysDeptRequest,
  PostSysDeptResponse,
  PostSysDeptsRequest,
  PostSysDeptsResponse,
  PutSysDeptRequest,
  PutSysDeptResponse,
} from '@/api/type/deptManage';
import {
  DeleteSysRoleIdRequest,
  GetSysRoleIdRequest,
  GetSysRoleIdResponse,
  PostSysRoleRequest,
  PostSysRolesRequest,
  PostSysRolesResponse,
  PutSysRoleRequest,
  PutSysRoleResponse,
} from '@/api/type/roleManage';

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/sys/depts',
  RestfulDeptUrl = '/sys/dept',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/sys/menus',
  MenuTree = '/sys/menu/tree',
  RestfulMenuUrl = '/sys/menu',
  RolePageList = '/sys/roles',
  RestfulRoleUrl = '/sys/role',
  GetAllRoleList = '/system/getAllRoleList',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params: PostSysDeptsRequest) =>
  defHttp.post<PostSysDeptsResponse>({ url: Api.DeptList, params });

export const addDept = (params: PostSysDeptRequest) =>
  defHttp.post<PostSysDeptResponse>({ url: Api.RestfulDeptUrl, params });

export const editDept = (params: PutSysDeptRequest) =>
  defHttp.put<PutSysDeptResponse>({ url: Api.RestfulDeptUrl, params });

export const deleteDept = (params: DeleteSysDeptIdRequest['id']) =>
  defHttp.delete<DeleteSysDeptIdResponse>({ url: Api.RestfulDeptUrl + `/${params}` });

export const getMenuList = (params?: PostSysMenusRequest) =>
  defHttp.post<PostSysMenusResponse>({ url: Api.MenuList, params });

export const getMenuTree = () => defHttp.get<GetSysMenuTreeResponse>({ url: Api.MenuTree });

export const addMenu = (params: PostSysMenuRequest) =>
  defHttp.post<PostSysMenuResponse>({ url: Api.RestfulMenuUrl, params });

export const deleteMenu = (id: DeleteSysMenuIdRequest['id']) =>
  defHttp.delete({ url: Api.RestfulMenuUrl + `/${id}` });

export const editMenu = (params: PutSysMenuRequest) =>
  defHttp.put<PutSysMenuResponse>({ url: Api.RestfulMenuUrl, params });

export const getRoleListByPage = (params?: PostSysRolesRequest) =>
  defHttp.post<PostSysRolesResponse>({ url: Api.RolePageList, params });

export const editRole = (params: PutSysRoleRequest) =>
  defHttp.put<PutSysRoleResponse>({ url: Api.RestfulRoleUrl, params });

export const deleteRole = (params: DeleteSysRoleIdRequest['id']) =>
  defHttp.delete({ url: Api.RestfulRoleUrl + `/${params}` });

export const addRole = (params: PostSysRoleRequest) =>
  defHttp.post({ url: Api.RestfulRoleUrl, params });

export const getRoleDetail = (params: GetSysRoleIdRequest['id']) =>
  defHttp.get<GetSysRoleIdResponse>({ url: Api.RestfulRoleUrl + `/${params}` });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
