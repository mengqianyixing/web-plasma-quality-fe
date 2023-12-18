import { defHttp } from '/@/utils/http/axios';
import {
  DeleteApiSysMenuIdRequest,
  GetApiSysMenuTreeResponse,
  PostApiSysMenuRequest,
  PostApiSysMenuResponse,
  PostApiSysMenusRequest,
  PostApiSysMenusResponse,
  PutApiSysMenuRequest,
  PutApiSysMenuResponse,
} from '@/api/type/menuManage';
import {
  DeleteApiSysDeptIdRequest,
  DeleteApiSysDeptIdResponse,
  PostApiSysDeptRequest,
  PostApiSysDeptResponse,
  PostApiSysDeptsRequest,
  PostApiSysDeptsResponse,
  PutApiSysDeptRequest,
  PutApiSysDeptResponse,
} from '@/api/type/deptManage';
import {
  DeleteApiSysRoleIdRequest,
  GetApiSysRoleIdRequest,
  GetApiSysRoleIdResponse,
  PostApiSysRoleRequest,
  PostApiSysRolesRequest,
  PostApiSysRolesResponse,
  PutApiSysRoleRequest,
  PutApiSysRoleResponse,
} from '@/api/type/roleManage';
import {
  DeleteApiSysUserIdRequest,
  DeleteApiSysUserIdResponse,
  PostApiSysUserRequest,
  PostApiSysUserResponse,
  PostApiSysUsersRequest,
  PostApiSysUsersResponse,
  PutApiSysUserRequest,
  PutApiSysUserResponse,
} from '@/api/type/userManage';
import {
  GetApiSysResourceIdRequest,
  GetApiSysResourceIdResponse,
  PostApiSysResourceRequest,
  PostApiSysResourceResponse,
  PostApiSysResourcesRequest,
  PostApiSysResourcesResponse,
  PutApiSysResourceRequest,
  PutApiSysResourceResponse,
} from '@/api/type/resourcesManage';

enum Api {
  AccountList = '/api/sys/users',
  IsAccountExist = '/api/system/accountExist',
  DeptList = '/api/sys/depts',
  RestfulDeptUrl = '/api/sys/dept',
  MenuList = '/api/sys/menus',
  MenuTree = '/api/sys/menu/tree',
  RestfulMenuUrl = '/api/sys/menu',
  RolePageList = '/api/sys/roles',
  RestfulRoleUrl = '/api/sys/role',
  RestfulUserUrl = '/api/sys/user',
  RestfulResourceUrl = '/api/sys/resource',
  GetResourcesList = '/api/sys/resources',
}

export const getAccountList = (params: PostApiSysUsersRequest) =>
  defHttp.post<PostApiSysUsersResponse>({ url: Api.AccountList, params });

export const getDeptList = (params: PostApiSysDeptsRequest) =>
  defHttp.post<PostApiSysDeptsResponse>({ url: Api.DeptList, params });

export const addDept = (params: PostApiSysDeptRequest) =>
  defHttp.post<PostApiSysDeptResponse>({ url: Api.RestfulDeptUrl, params });

export const editDept = (params: PutApiSysDeptRequest) =>
  defHttp.put<PutApiSysDeptResponse>({ url: Api.RestfulDeptUrl, params });

export const deleteDept = (params: DeleteApiSysDeptIdRequest['id']) =>
  defHttp.delete<DeleteApiSysDeptIdResponse>({ url: Api.RestfulDeptUrl + `/${params}` });

export const getMenuList = (params?: PostApiSysMenusRequest) =>
  defHttp.post<PostApiSysMenusResponse>({ url: Api.MenuList, params });

export const getMenuTree = () => defHttp.get<GetApiSysMenuTreeResponse>({ url: Api.MenuTree });

export const addMenu = (params: PostApiSysMenuRequest) =>
  defHttp.post<PostApiSysMenuResponse>({ url: Api.RestfulMenuUrl, params });

export const deleteMenu = (id: DeleteApiSysMenuIdRequest['id']) =>
  defHttp.delete({ url: Api.RestfulMenuUrl + `/${id}` });

export const editMenu = (params: PutApiSysMenuRequest) =>
  defHttp.put<PutApiSysMenuResponse>({ url: Api.RestfulMenuUrl, params });

export const getRoleListByPage = (params?: PostApiSysRolesRequest) =>
  defHttp.post<PostApiSysRolesResponse>({ url: Api.RolePageList, params });

export const editRole = (params: PutApiSysRoleRequest) =>
  defHttp.put<PutApiSysRoleResponse>({ url: Api.RestfulRoleUrl, params });

export const deleteRole = (params: DeleteApiSysRoleIdRequest['id']) =>
  defHttp.delete({ url: Api.RestfulRoleUrl + `/${params}` });

export const addRole = (params: PostApiSysRoleRequest) =>
  defHttp.post({ url: Api.RestfulRoleUrl, params });

export const getRoleDetail = (params: GetApiSysRoleIdRequest['id']) =>
  defHttp.get<GetApiSysRoleIdResponse>({ url: Api.RestfulRoleUrl + `/${params}` });

export const deleteUser = (params: DeleteApiSysUserIdRequest['id']) =>
  defHttp.delete<DeleteApiSysUserIdResponse>({ url: Api.RestfulUserUrl + `/${params}` });

export const editUser = (params: PutApiSysUserRequest) =>
  defHttp.put<PutApiSysUserResponse>({ url: Api.RestfulUserUrl, params });

export const addUser = (params: PostApiSysUserRequest) =>
  defHttp.post<PostApiSysUserResponse>({ url: Api.RestfulUserUrl, params });

export const getResourcesList = (params: PostApiSysResourcesRequest) =>
  defHttp.post<PostApiSysResourcesResponse>({ url: Api.GetResourcesList, params });

export const getResourceDetail = (params: GetApiSysResourceIdRequest['id']) =>
  defHttp.get<GetApiSysResourceIdResponse>({ url: Api.RestfulResourceUrl + `/${params}` });

export const addResource = (params: PostApiSysResourceRequest) =>
  defHttp.post<PostApiSysResourceResponse>({ url: Api.RestfulResourceUrl, params });

export const editResource = (params: PutApiSysResourceRequest) =>
  defHttp.put<PutApiSysResourceResponse>({ url: Api.RestfulResourceUrl, params });

export const deleteResource = (params: GetApiSysResourceIdRequest['id']) =>
  defHttp.delete<GetApiSysResourceIdResponse>({ url: Api.RestfulResourceUrl + `/${params}` });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
