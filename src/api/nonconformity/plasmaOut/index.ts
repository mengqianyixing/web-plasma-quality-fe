import { defHttp } from '@/utils/http/axios';
import {
  PostApiCoreBankDeliverDetailOutRequest,
  PostApiCoreBankDeliverDetailOutResponse,
  PostApiCoreBankDeliverPlasmaRequest,
  PostApiCoreBankDeliverPlasmaResponse,
  PostApiCoreBankDeliversRequest,
  PostApiCoreBankDeliversResponse,
  PostApiCoreBankDeliverRequest,
  PostApiCoreBankDeliverResponse,
  DeleteApiCoreBankDeliverRequest,
  DeleteApiCoreBankDeliverResponse,
  PutApiCoreBankDeliverRequest,
  PutApiCoreBankDeliverResponse,
  PutApiCoreBankPreviewReviewNoRequest,
  PutApiCoreBankPreviewReviewNoResponse,
  PutApiCoreBankPreviewReviewRevokeRequest,
  PutApiCoreBankPreviewReviewRevokeResponse,
  GetApiCoreBankDeliverNoRequest,
  GetApiCoreBankDeliverNoResponse,
  PostApiCoreBankDeliverPlasmaSelectedRequest,
  PostApiCoreBankDeliverPlasmaSelectedResponse,
  PostApiCoreBankDeliverPlasmaSelectedNotOutRequest,
  PostApiCoreBankDeliverPlasmaSelectedNotOutResponse,
  PostApiCoreBankDeliverPlasmaSelectedOutRequest,
  PostApiCoreBankDeliverPlasmaSelectedOutResponse,
  PostApiCoreBankDeliverDetailRequest,
  PostApiCoreBankDeliverDetailResponse,
  DeleteApiCoreBankDeliverDetailBagNoRequest,
  DeleteApiCoreBankDeliverDetailBagNoResponse,
} from '@/api/type/nonconformityManage';

enum Api {
  LIST = '/api/core/bank/delivers',
  FORM = '/api/core/bank/deliver',
  FORM_DT = '/api/core/bank/deliver/',
  TABLE_DT = '/api/core/bank/deliver/plasma/selected',

  ADD_TABLE_DT = '/api/core/bank/deliver/detail',
  REMOVE_TABLE_DT = '/api/core/bank/deliver/detail/',

  PLASMA_LIST = '/api/core/bank/deliver/plasma',
  PROCESS = '/api/core/bank/preview/review/',
  UN_PROCESS = '/api/core/bank/preview/review/revoke',
  SCAN = '/api/core/bank/deliver/detail/out',
  NOT_SCAN = '/api/core/bank/deliver/plasma/selected/NotOut',
  SCANED = '/api/core/bank/deliver/plasma/selected/out',
}

export const getListApi = (data: PostApiCoreBankDeliversRequest) =>
  defHttp.post<PostApiCoreBankDeliversResponse>({ url: Api.LIST, data });

export const addFormApi = (data: PostApiCoreBankDeliverRequest) =>
  defHttp.post<PostApiCoreBankDeliverResponse>({ url: Api.FORM, data });

export const updateFormApi = (data: PutApiCoreBankDeliverRequest) =>
  defHttp.put<PutApiCoreBankDeliverResponse>({ url: Api.FORM, data });

export const removeFormApi = (data: DeleteApiCoreBankDeliverRequest) =>
  defHttp.delete<DeleteApiCoreBankDeliverResponse>({ url: Api.FORM, data });

export const dtFormApi = (params: GetApiCoreBankDeliverNoRequest) =>
  defHttp.get<GetApiCoreBankDeliverNoResponse>({ url: Api.FORM_DT + params.no });

export const dtTableApi = (data: PostApiCoreBankDeliverPlasmaSelectedRequest) =>
  defHttp.post<PostApiCoreBankDeliverPlasmaSelectedResponse>({ url: Api.TABLE_DT, data });

export const addTableApi = (data: PostApiCoreBankDeliverDetailRequest) =>
  defHttp.post<PostApiCoreBankDeliverDetailResponse>({ url: Api.ADD_TABLE_DT, data });

export const removeTableApi = (data: DeleteApiCoreBankDeliverDetailBagNoRequest) =>
  defHttp.delete<DeleteApiCoreBankDeliverDetailBagNoResponse>({
    url: Api.REMOVE_TABLE_DT + data.bagNo,
  });

export const getPlasmaListApi = (data: PostApiCoreBankDeliverPlasmaRequest) =>
  defHttp.post<PostApiCoreBankDeliverPlasmaResponse>({ url: Api.PLASMA_LIST, data });

export const processApi = (data: PutApiCoreBankPreviewReviewNoRequest) =>
  defHttp.put<PutApiCoreBankPreviewReviewNoResponse>({ url: Api.PROCESS + data.no });

export const unProcessApi = (data: PutApiCoreBankPreviewReviewRevokeRequest) =>
  defHttp.put<PutApiCoreBankPreviewReviewRevokeResponse>({ url: Api.UN_PROCESS, data });

export const scanApi = (data: PostApiCoreBankDeliverDetailOutRequest) =>
  defHttp.post<PostApiCoreBankDeliverDetailOutResponse>({ url: Api.SCAN, data });

export const notScanApi = (data: PostApiCoreBankDeliverPlasmaSelectedNotOutRequest) =>
  defHttp.post<PostApiCoreBankDeliverPlasmaSelectedNotOutResponse>({ url: Api.NOT_SCAN, data });

export const scanedApi = (data: PostApiCoreBankDeliverPlasmaSelectedOutRequest) =>
  defHttp.post<PostApiCoreBankDeliverPlasmaSelectedOutResponse>({ url: Api.SCANED, data });
