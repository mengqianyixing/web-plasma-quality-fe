/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-27 15:34:55
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-27 15:43:21
 */
import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreLabMethodsResponse,
  GetApiCoreLabMethodsRequest,
  PostApiCoreLabMethodRequest,
  PostApiCoreLabMethodResponse,
  PostApiCoreLabMethodsRequest,
  PostApiCoreLabMethodsResponse,
  DeleteApiCoreLabMethodMIdRequest,
  DeleteApiCoreLabMethodMIdResponse,
  PutApiCoreLabMethodRequest,
  PutApiCoreLabMethodResponse,
  GetApiCoreLabMethodMIdRequest,
  GetApiCoreLabMethodMIdResponse,
} from '@/api/type/inspectManage';

enum Api {
  LIST = `/api/core/lab/methods`,
  FORM = '/api/core/lab/method',
  DT_RE = '/api/core/lab/method/',
}

export const getListApi = (data: PostApiCoreLabMethodsRequest) =>
  defHttp.post<PostApiCoreLabMethodsResponse>({ url: Api.LIST, data });

export const getInspectMethodListApi = (data: GetApiCoreLabMethodsRequest) =>
  defHttp.get<GetApiCoreLabMethodsResponse>({ url: Api.LIST, data });

export const addTitlerTypeApi = (data: PostApiCoreLabMethodRequest) =>
  defHttp.post<PostApiCoreLabMethodResponse>({ url: Api.FORM, data });

export const updateTitlerTypeApi = (data: PutApiCoreLabMethodRequest) =>
  defHttp.put<PutApiCoreLabMethodResponse>({ url: Api.FORM, data });

export const getTitlerTypeDtApi = ({ mId }: GetApiCoreLabMethodMIdRequest) =>
  defHttp.get<GetApiCoreLabMethodMIdResponse>({ url: Api.DT_RE + mId });

export const removeTitlerTypeApi = ({ mId }: DeleteApiCoreLabMethodMIdRequest) =>
  defHttp.delete<DeleteApiCoreLabMethodMIdResponse>({ url: Api.DT_RE + mId });
