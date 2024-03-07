import { defHttp } from '@/utils/http/axios';
import {
  PostApiCoreLabMaterialTemplateRequest,
  PostApiCoreLabMaterialTemplateResponse,
  PutApiCoreLabMaterialTemplateDisableIdRequest,
  PutApiCoreLabMaterialTemplateDisableIdResponse,
  PutApiCoreLabMaterialTemplateEnableIdRequest,
  PutApiCoreLabMaterialTemplateEnableIdResponse,
  PutApiCoreLabMaterialTemplateRequest,
  PutApiCoreLabMaterialTemplateResponse,
  PutApiCoreLabMaterialTemplateReviewCancelRequest,
  PutApiCoreLabMaterialTemplateReviewCancelResponse,
  PutApiCoreLabMaterialTemplateReviewIdRequest,
  PutApiCoreLabMaterialTemplateReviewIdResponse,
  PostApiCoreLabMaterialTemplatesRequest,
  PostApiCoreLabMaterialTemplatesResponse,
  GetApiCoreLabMaterialTemplateIdRequest,
  GetApiCoreLabMaterialTemplateIdResponse,
  PutApiCoreLabMaterialTemplateDeadlineRequest,
  PutApiCoreLabMaterialTemplateDeadlineResponse,
} from '@/api/type/inspectManage';

enum Api {
  LIST = `/api/core/lab/material/templates`,
  FORM = '/api/core/lab/material/template',
  REVIEW = '/api/core/lab/material/template/review/',
  CANCEL_REVIEW = '/api/core/lab/material/template/review/cancel',
  ENABLE = '/api/core/lab/material/template/enable/',
  DISABLE = '/api/core/lab/material/template/disable/',
  DT = '/api/core/lab/material/template/',
  UPDATE_DATE = '/api/core/lab/material/template/deadline',
}

export const getListApi = (data: PostApiCoreLabMaterialTemplatesRequest) =>
  defHttp.post<PostApiCoreLabMaterialTemplatesResponse>({
    url: Api.LIST,
    data,
  });
export const getDtApi = (data: GetApiCoreLabMaterialTemplateIdRequest) =>
  defHttp.get<GetApiCoreLabMaterialTemplateIdResponse>({
    url: Api.DT + data.id,
  });
export const reviewApi = (data: PutApiCoreLabMaterialTemplateReviewIdRequest) =>
  defHttp.put<PutApiCoreLabMaterialTemplateReviewIdResponse>({ url: Api.REVIEW + data.id });

export const cancelReviewApi = (data: PutApiCoreLabMaterialTemplateReviewCancelRequest) =>
  defHttp.put<PutApiCoreLabMaterialTemplateReviewCancelResponse>({ url: Api.CANCEL_REVIEW, data });

export const addFormApi = (data: PostApiCoreLabMaterialTemplateRequest) =>
  defHttp.post<PostApiCoreLabMaterialTemplateResponse>({
    url: Api.FORM,
    data,
  });

export const updateFormApi = (data: PutApiCoreLabMaterialTemplateRequest) =>
  defHttp.put<PutApiCoreLabMaterialTemplateResponse>({
    url: Api.FORM,
    data,
  });

export const enableApi = ({ id }: PutApiCoreLabMaterialTemplateEnableIdRequest) =>
  defHttp.put<PutApiCoreLabMaterialTemplateEnableIdResponse>({ url: Api.ENABLE + id });

export const disableApi = ({ id }: PutApiCoreLabMaterialTemplateDisableIdRequest) =>
  defHttp.put<PutApiCoreLabMaterialTemplateDisableIdResponse>({ url: Api.DISABLE + id });

export const updateDateApi = (data: PutApiCoreLabMaterialTemplateDeadlineRequest) =>
  defHttp.put<PutApiCoreLabMaterialTemplateDeadlineResponse>({ url: Api.UPDATE_DATE, data });
