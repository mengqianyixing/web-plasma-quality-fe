/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-25 16:41:07
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-03 15:01:40
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
  GetApiCoreLabRegistrationDonorSampleIdRequest,
  GetApiCoreLabRegistrationDonorSampleIdResponse,
  PostApiCoreLabRegistrationTiterUploadRequest,
  PostApiCoreLabRegistrationTiterUploadResponse,
} from '@/api/type/inspectManage';

enum Api {
  BATCH_LIST = `/api/core/lab/registration/batchSamples`,
  PLASMA_COUNT = '/api/core/lab/registration/plasmaTypes/',
  CHECK_ITEM_LIST = '/api/core/lab/registration/labProjects/',

  ADD_ITEM = '/api/core/lab/registration/labItem',

  CHECK_LIST = '/api/core/lab/registration/labItem/',
  // REMOVE_CHECK = '/api/core/lab/registration/labItem',

  TITER_LIST = '/api/core/lab/registration/labItem/titer/',

  REGISTRATION = '/api/core/lab/registration/labItem/labReport',
  REVOKE_REGISTRATION = '/api/core/lab/registration/labItem/labReport/',

  // UNQUALIFIED = '/api/core/lab/registration/labItem',

  NOT_CHECK = '/api/core/lab/registration/labItem/notCheck/',

  TITER_CHECK = '/api/core/lab/registration/labItem/titer',
  CHECK_ITEM_DT_LIST = '/api/core/lab/registration/labItems',

  DONOR = '/api/core/lab/registration/donor/',

  IMPORT = '/api/core/lab/registration/titer/upload',
}

export const uploadItemTiter = (data: PostApiCoreLabRegistrationTiterUploadRequest) =>
  defHttp.uploadFile<PostApiCoreLabRegistrationTiterUploadResponse>({ url: Api.IMPORT }, data);

export const getDonorApi = ({ sampleId }: GetApiCoreLabRegistrationDonorSampleIdRequest) =>
  defHttp.get<GetApiCoreLabRegistrationDonorSampleIdResponse>({ url: Api.DONOR + sampleId });

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
