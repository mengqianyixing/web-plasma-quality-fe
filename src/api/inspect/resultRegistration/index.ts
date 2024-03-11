/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-25 16:41:07
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-03 20:33:20
 */
import { defHttp } from '@/utils/http/axios';
import {
  PostApiCoreLabRegistrationBatchSamplesRequest,
  PostApiCoreLabRegistrationBatchSamplesResponse,
  GetApiCoreLabRegistrationPlasmaTypesBsNoRequest,
  GetApiCoreLabRegistrationPlasmaTypesBsNoResponse,
  GetApiCoreLabRegistrationLabProjectsBsNoRequest,
  GetApiCoreLabRegistrationLabProjectsBsNoResponse,
  PostApiCoreLabRegistrationLabItemResponse,
  PostApiCoreLabRegistrationLabItemRequest,
  GetApiCoreLabRegistrationLabItemBsNoRequest,
  GetApiCoreLabRegistrationLabItemBsNoResponse,
  GetApiCoreLabRegistrationLabItemTiterBsNoRequest,
  GetApiCoreLabRegistrationLabItemTiterBsNoResponse,
  PostApiCoreLabRegistrationLabItemLabReportRequest,
  PostApiCoreLabRegistrationLabItemLabReportResponse,
  DeleteApiCoreLabRegistrationLabItemLabReportBsNoRequest,
  DeleteApiCoreLabRegistrationLabItemLabReportBsNoResponse,
  DeleteApiCoreLabRegistrationLabItemRequest,
  DeleteApiCoreLabRegistrationLabItemResponse,
  PutApiCoreLabRegistrationLabItemRequest,
  PutApiCoreLabRegistrationLabItemResponse,
  PutApiCoreLabRegistrationLabItemNotCheckRequest,
  PutApiCoreLabRegistrationLabItemNotCheckResponse,
  PostApiCoreLabRegistrationLabItemTiterRequest,
  PostApiCoreLabRegistrationLabItemTiterResponse,
  PostApiCoreLabRegistrationLabItemsRequest,
  PostApiCoreLabRegistrationLabItemsResponse,
  PutApiCoreLabRegistrationLabItemTiterRequest,
  PutApiCoreLabRegistrationLabItemTiterResponse,
  GetApiCoreLabRegistrationDonorSampleNoRequest,
  GetApiCoreLabRegistrationDonorSampleNoResponse,
  PostApiCoreLabRegistrationTiterUploadRequest,
  PostApiCoreLabRegistrationTiterUploadResponse,
  GetApiCoreLabItemProjectBsNoRequest,
  GetApiCoreLabItemProjectBsNoResponse,
  GetApiCoreLabProjectMaterialProjectIdRequest,
  GetApiCoreLabProjectMaterialProjectIdResponse,
  GetApiCoreLabMaterialDetailsBsNoRequest,
  GetApiCoreLabMaterialDetailsBsNoResponse,
  PostApiCoreLabMaterialDetailRequest,
  PostApiCoreLabMaterialDetailResponse,
  DeleteApiCoreLabMaterialDetailRequest,
  DeleteApiCoreLabMaterialDetailResponse,
  DeleteApiCoreLabRegistrationLabItemUnqualifiedRequest,
  DeleteApiCoreLabRegistrationLabItemUnqualifiedResponse,
  PostApiCoreLabMbBaninRequest,
  PostApiCoreLabMbBaninResponse,
} from '@/api/type/inspectManage';

enum Api {
  BATCH_LIST = `/api/core/lab/registration/batchSamples`,
  PLASMA_COUNT = '/api/core/lab/registration/plasmaTypes/',
  CHECK_ITEM_LIST = '/api/core/lab/registration/labProjects/',

  ADD_ITEM = '/api/core/lab/registration/labItem',

  CHECK_LIST = '/api/core/lab/registration/labItem/',

  TITER_LIST = '/api/core/lab/registration/labItem/titer/',

  REGISTRATION = '/api/core/lab/registration/labItem/labReport',
  REVOKE_REGISTRATION = '/api/core/lab/registration/labItem/labReport/',

  NOT_CHECK = '/api/core/lab/registration/labItem/notCheck/',

  TITER_CHECK = '/api/core/lab/registration/labItem/titer',
  CHECK_ITEM_DT_LIST = '/api/core/lab/registration/labItems',

  DONOR = '/api/core/lab/registration/donor/',

  IMPORT = '/api/core/lab/registration/titer/upload',

  TITER_ITEMS = '/api/core/lab/item/project/',
  TITER_ITEM_MATERIAL = '/api/core/lab/project/material/',
  MATERIAL_LIST = '/api/core/lab/material/details/',
  MATERIAL_ADD_RE = '/api/core/lab/material/detail',

  REMOVE_UNQUA = '/api/core/lab/registration/labItem/unqualified',

  SQ_IMPORT = '/api/core/lab/mbBanin',
}

export const removeUnqualified = (data: DeleteApiCoreLabRegistrationLabItemUnqualifiedRequest) =>
  defHttp.delete<DeleteApiCoreLabRegistrationLabItemUnqualifiedResponse>({
    url: Api.REMOVE_UNQUA,
    data,
  });

export const uploadItemTiter = (data: PostApiCoreLabRegistrationTiterUploadRequest) =>
  defHttp.uploadFile<PostApiCoreLabRegistrationTiterUploadResponse>({ url: Api.IMPORT }, data);

export const getDonorApi = ({ sampleNo }: GetApiCoreLabRegistrationDonorSampleNoRequest) =>
  defHttp.get<GetApiCoreLabRegistrationDonorSampleNoResponse>({ url: Api.DONOR + sampleNo });

export const updateTiterCheckApi = (data: PutApiCoreLabRegistrationLabItemTiterRequest) =>
  defHttp.put<PutApiCoreLabRegistrationLabItemTiterResponse>({ url: Api.TITER_CHECK, data });

export const getBatchListApi = (data: PostApiCoreLabRegistrationBatchSamplesRequest) =>
  defHttp.post<PostApiCoreLabRegistrationBatchSamplesResponse>({ url: Api.BATCH_LIST, data });

export const getPlasmaCountApi = ({ bsNo }: GetApiCoreLabRegistrationPlasmaTypesBsNoRequest) =>
  defHttp.get<GetApiCoreLabRegistrationPlasmaTypesBsNoResponse>({ url: Api.PLASMA_COUNT + bsNo });

export const getCheckItemListApi = ({ bsNo }: GetApiCoreLabRegistrationLabProjectsBsNoRequest) =>
  defHttp.get<GetApiCoreLabRegistrationLabProjectsBsNoResponse>({
    url: Api.CHECK_ITEM_LIST + bsNo,
  });

export const addItemApi = (data: PostApiCoreLabRegistrationLabItemResponse) =>
  defHttp.post<PostApiCoreLabRegistrationLabItemRequest>({ url: Api.ADD_ITEM, data });

export const getCheckListApi = ({ bsNo }: GetApiCoreLabRegistrationLabItemBsNoRequest) =>
  defHttp.get<GetApiCoreLabRegistrationLabItemBsNoResponse>({ url: Api.CHECK_LIST + bsNo });

export const removeCheckApi = (data: DeleteApiCoreLabRegistrationLabItemRequest) =>
  defHttp.delete<DeleteApiCoreLabRegistrationLabItemResponse>({
    url: Api.ADD_ITEM,
    data,
  });

export const getTiterListApi = ({ bsNo }: GetApiCoreLabRegistrationLabItemTiterBsNoRequest) =>
  defHttp.get<GetApiCoreLabRegistrationLabItemTiterBsNoResponse>({ url: Api.TITER_LIST + bsNo });

export const submitRegistrationApi = (data: PostApiCoreLabRegistrationLabItemLabReportRequest) =>
  defHttp.post<PostApiCoreLabRegistrationLabItemLabReportResponse>({ url: Api.REGISTRATION, data });

export const sumbitRevokeRegistrationApi = ({
  bsNo,
}: DeleteApiCoreLabRegistrationLabItemLabReportBsNoRequest) =>
  defHttp.delete<DeleteApiCoreLabRegistrationLabItemLabReportBsNoResponse>({
    url: Api.REVOKE_REGISTRATION + bsNo,
  });

export const summitUnqualifiedApi = (data: PutApiCoreLabRegistrationLabItemRequest) =>
  defHttp.put<PutApiCoreLabRegistrationLabItemResponse>({ url: Api.ADD_ITEM, data });

export const submitNotCheckApi = (data: PutApiCoreLabRegistrationLabItemNotCheckRequest) =>
  defHttp.put<PutApiCoreLabRegistrationLabItemNotCheckResponse>({
    url: Api.NOT_CHECK,
    data,
  });

export const submitTiterCheckApi = (data: PostApiCoreLabRegistrationLabItemTiterRequest) =>
  defHttp.post<PostApiCoreLabRegistrationLabItemTiterResponse>({ url: Api.TITER_CHECK, data });

export const getCheckItemDtListApi = (data: PostApiCoreLabRegistrationLabItemsRequest) =>
  defHttp.post<PostApiCoreLabRegistrationLabItemsResponse>({
    url: Api.CHECK_ITEM_DT_LIST,
    data,
  });

export const getTiterItemsApi = (data: GetApiCoreLabItemProjectBsNoRequest) =>
  defHttp.get<GetApiCoreLabItemProjectBsNoResponse>({
    url: Api.TITER_ITEMS + data.bsNo,
  });

export const getTiterItemMaterialApi = (data: GetApiCoreLabProjectMaterialProjectIdRequest) =>
  defHttp.get<GetApiCoreLabProjectMaterialProjectIdResponse>({
    url: Api.TITER_ITEM_MATERIAL + data.projectId,
  });

export const getMaterialListApi = (data: GetApiCoreLabMaterialDetailsBsNoRequest) =>
  defHttp.get<GetApiCoreLabMaterialDetailsBsNoResponse>({
    url: Api.MATERIAL_LIST + data.bsNo,
  });

export const submitMaterialApi = (data: PostApiCoreLabMaterialDetailRequest) =>
  defHttp.post<PostApiCoreLabMaterialDetailResponse>({
    url: Api.MATERIAL_ADD_RE,
    data,
  });

export const deleteMaterialApi = (data: DeleteApiCoreLabMaterialDetailRequest) =>
  defHttp.delete<DeleteApiCoreLabMaterialDetailResponse>({
    url: Api.MATERIAL_ADD_RE,
    data,
  });

export const submitSqImportApi = (data: PostApiCoreLabMbBaninRequest) =>
  defHttp.post<PostApiCoreLabMbBaninResponse>({ url: Api.SQ_IMPORT, data });
