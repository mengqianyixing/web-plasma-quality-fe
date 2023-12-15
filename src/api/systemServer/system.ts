import { RoleParams, RoleListGetResultModel } from './model/systemModel';
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
import {
  DeleteUserIdRequest,
  DeleteUserIdResponse,
  PostSysUserRequest,
  PostSysUserResponse,
  PostSysUsersRequest,
  PostSysUsersResponse,
  PutSysUserRequest,
  PutSysUserResponse,
} from '@/api/type/userManage';
import {
  GetSysResourceIdRequest,
  GetSysResourceIdResponse,
  PostSysResourceRequest,
  PostSysResourceResponse,
  PostSysResourcesRequest,
  PostSysResourcesResponse,
  PutSysResourceRequest,
  PutSysResourceResponse,
} from '@/api/type/resourcesManage';

enum Api {
  AccountList = '/api/sys/users',
  IsAccountExist = '/api/system/accountExist',
  DeptList = '/api/sys/depts',
  RestfulDeptUrl = '/api/sys/dept',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/api/sys/menus',
  MenuTree = '/api/sys/menu/tree',
  RestfulMenuUrl = '/api/sys/menu',
  RolePageList = '/api/sys/roles',
  RestfulRoleUrl = '/api/sys/role',
  RestfulUserUrl = '/api/sys/user',
  RestfulResourceUrl = '/api/sys/resource',
  GetResourcesList = '/api/sys/resources',
  GetAllRoleList = '/api/system/getAllRoleList',
}

export const getAccountList = (params: PostSysUsersRequest) =>
  defHttp.post<PostSysUsersResponse>({ url: Api.AccountList, params });

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

export const deleteUser = (params: DeleteUserIdRequest['id']) =>
  defHttp.delete<DeleteUserIdResponse>({ url: Api.RestfulUserUrl + `/${params}` });

export const editUser = (params: PutSysUserRequest) =>
  defHttp.put<PutSysUserResponse>({ url: Api.RestfulUserUrl, params });

export const addUser = (params: PostSysUserRequest) =>
  defHttp.post<PostSysUserResponse>({ url: Api.RestfulUserUrl, params });

export const getResourcesList = (params: PostSysResourcesRequest) =>
  defHttp.post<PostSysResourcesResponse>({ url: Api.GetResourcesList, params });

export const getResourceDetail = (params: GetSysResourceIdRequest['id']) =>
  defHttp.get<GetSysResourceIdResponse>({ url: Api.RestfulResourceUrl + `/${params}` });

export const addResource = (params: PostSysResourceRequest) =>
  defHttp.post<PostSysResourceResponse>({ url: Api.RestfulResourceUrl, params });

export const editResource = (params: PutSysResourceRequest) =>
  defHttp.put<PutSysResourceResponse>({ url: Api.RestfulResourceUrl, params });

export const deleteResource = (params: GetSysResourceIdRequest['id']) =>
  defHttp.delete<GetSysResourceIdResponse>({ url: Api.RestfulResourceUrl + `/${params}` });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
