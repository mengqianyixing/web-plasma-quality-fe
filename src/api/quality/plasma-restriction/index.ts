import { defHttp } from '@/utils/http/axios';
import {
  PostApiCoreBagFlaggedBoxRequest,
  PostApiCoreBagFlaggedBoxResponse,
  PostApiCoreBagFlagBoxRequest,
  PostApiCoreBagFlagBoxResponse,
  PostApiCoreBagFlagRequest,
  PostApiCoreBagFlagResponse,
  PostApiCoreBagFlagsRequest,
  PostApiCoreBagFlagsResponse,
  PutApiCoreBagFlagReviewBfNoRequest,
  PutApiCoreBagFlagReviewBfNoResponse,
  DeleteApiCoreBagFlagCancelBfNoRequest,
  DeleteApiCoreBagFlagCancelBfNoResponse,
  PostApiCoreBagFlagBoxBatchesRequest,
  PostApiCoreBagFlagBoxBatchesResponse,
} from '@/api/type/qualityMange';

enum Api {
  LIST = '/api/core/bag/flags',
  BOX_LIST = '/api/core/bag/flag/box',
  BIND_BOX_LIST = '/api/core/bag/flagged/box',
  BIND_BOXS_LIST = '/api/core/bag/flag/box/batches',
  MARK = '/api/core/bag/flag',
  REVIEW = '/api/core/bag/flag/review/',
  CANCEL = '/api/core/bag/flag/cancel/',
}

export const getListApi = (params: PostApiCoreBagFlagsRequest) =>
  defHttp.post<PostApiCoreBagFlagsResponse>({ url: Api.LIST, params });

export const getBoxListApi = (params: PostApiCoreBagFlagBoxRequest) =>
  defHttp.post<PostApiCoreBagFlagBoxResponse>({ url: Api.BOX_LIST, params });

export const getBindBoxListApi = (params: PostApiCoreBagFlaggedBoxRequest) =>
  defHttp.post<PostApiCoreBagFlaggedBoxResponse>({ url: Api.BIND_BOX_LIST, params });

export const getBindBoxsListApi = (params: PostApiCoreBagFlagBoxBatchesRequest) =>
  defHttp.post<PostApiCoreBagFlagBoxBatchesResponse>({ url: Api.BIND_BOXS_LIST, params });

export const submitMarkApi = (params: PostApiCoreBagFlagRequest) =>
  defHttp.post<PostApiCoreBagFlagResponse>({ url: Api.MARK, params });

export const submitReviewApi = (params: PutApiCoreBagFlagReviewBfNoRequest) =>
  defHttp.put<PutApiCoreBagFlagReviewBfNoResponse>({ url: Api.REVIEW + params.bfNo });

export const submitCancelApi = (params: DeleteApiCoreBagFlagCancelBfNoRequest) =>
  defHttp.delete<DeleteApiCoreBagFlagCancelBfNoResponse>({ url: Api.CANCEL + params.bfNo });
