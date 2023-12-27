/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-25 16:41:07
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-26 13:56:40
 */
import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreLabProjectIdRequest,
  GetApiCoreLabProjectIdResponse,
  DeleteApiCoreLabProjectIdResponse,
  DeleteApiCoreLabProjectIdRequest,
  PutApiCoreLabProjectRequest,
  PutApiCoreLabProjectResponse,
  PostApiCoreLabProjectRequest,
  PostApiCoreLabProjectResponse,
  PostApiCoreLabProjectsRequest,
  PostApiCoreLabProjectsResponse,
} from '@/api/type/inspectManage';

enum Api {
  LIST = `/api/core/lab/projects`,
  FORM = '/api/core/lab/project',
  FORM_DT = '/api/core/lab/project/',
}

export const getListApi = (data: PostApiCoreLabProjectsRequest) =>
  defHttp.post<PostApiCoreLabProjectsResponse>({ url: Api.LIST, data });

export const addItemSettingApi = (data: PostApiCoreLabProjectRequest) =>
  defHttp.post<PostApiCoreLabProjectResponse>({ url: Api.FORM, data });

export const updateItemSettingApi = (data: PutApiCoreLabProjectRequest) =>
  defHttp.put<PutApiCoreLabProjectResponse>({ url: Api.FORM, data });

export const getItemSettingDtApi = ({ id }: GetApiCoreLabProjectIdRequest) =>
  defHttp.get<GetApiCoreLabProjectIdResponse>({ url: Api.FORM_DT + id });

export const removeItemSettingApi = ({ id }: DeleteApiCoreLabProjectIdRequest) =>
  defHttp.delete<DeleteApiCoreLabProjectIdResponse>({ url: Api.FORM + '/' + id });
