import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreSamplePlansRequest,
  GetApiCoreSamplePlansResponse,
  GetApiCoreSampleUnplansRequest,
  GetApiCoreSampleUnplansResponse,
  PostApiCoreSamplePlanRequest,
  PostApiCoreSamplePlanResponse,
  PutApiCoreSamplePlanRequest,
  PutApiCoreSamplePlanResponse,
  GetApiCoreSamplePlanMixListRequest,
  GetApiCoreSamplePlanMixListResponse,
  GetApiCoreSamplePlanMixTubeDetailRequest,
  GetApiCoreSamplePlanMixTubeDetailResponse,
  GetApiCoreSamplePlanDetailRequest,
  GetApiCoreSamplePlanDetailResponse,
} from '@/api/type/sampleManage';

enum Api {
  LIST = '/api/core/sample/plans',
  FORM = '/api/core/sample/plan',
  FORM_DT = '/api/core/sample/plan/detail',
  BATCH_LIST = '/api/core/sample/unplans',
  MIX_LIST = '/api/core/sample/plan/mixList',
  MIX_DT = '/api/core/sample/plan/mixTube/detail',
}

export const getListApi = (params: GetApiCoreSamplePlansRequest) =>
  defHttp.get<GetApiCoreSamplePlansResponse>({ url: Api.LIST, params });

export const submitAddApi = (params: PostApiCoreSamplePlanRequest) =>
  defHttp.post<PostApiCoreSamplePlanResponse>({ url: Api.FORM, params });

export const submitUpdateApi = (params: PutApiCoreSamplePlanRequest) =>
  defHttp.put<PutApiCoreSamplePlanResponse>({ url: Api.FORM, params });

export const getFormDtApi = (params: GetApiCoreSamplePlanDetailRequest) =>
  defHttp.get<GetApiCoreSamplePlanDetailResponse>({ url: Api.FORM_DT, params });

export const getBatchListApi = (params: GetApiCoreSampleUnplansRequest) =>
  defHttp.get<GetApiCoreSampleUnplansResponse>({ url: Api.BATCH_LIST, params });

export const getMixListApi = (params: GetApiCoreSamplePlanMixListRequest) =>
  defHttp.get<GetApiCoreSamplePlanMixListResponse>({ url: Api.MIX_LIST, params });

export const getMixDtListApi = (params: GetApiCoreSamplePlanMixTubeDetailRequest) =>
  defHttp.get<GetApiCoreSamplePlanMixTubeDetailResponse>({ url: Api.MIX_DT, params });
