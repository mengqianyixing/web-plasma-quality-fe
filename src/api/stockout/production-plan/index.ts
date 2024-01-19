/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-27 15:34:55
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-18 18:20:32
 */
import { defHttp } from '@/utils/http/axios';
import {
  PostApiProductPlanOrdersRequest,
  PostApiProductPlanOrdersResponse,
  PostApiProductPlanPrepareRequest,
  PostApiProductPlanPrepareResponse,
  GetApiProductPlanPrepareOrderNoRequest,
  GetApiProductPlanPrepareOrderNoResponse,
  GetApiProductPlanOrderNoRequest,
  GetApiProductPlanOrderNoResponse,
  PostApiProductPlanBoxRequest,
  PostApiProductPlanBoxResponse,
  GetApiProductPlanBoxOrderNoRequest,
  GetApiProductPlanBoxOrderNoResponse,
  GetApiProductPlanImmuneTypeOrderNoRequest,
  GetApiProductPlanImmuneTypeOrderNoResponse,
  GetApiProductPlanStationOrderNoRequest,
  GetApiProductPlanStationOrderNoResponse,
  GetApiProductPlanBatchOrderNoRequest,
  GetApiProductPlanBatchOrderNoResponse,
  PostApiProductPlanBagRequest,
  PostApiProductPlanBagResponse,
  PostApiProductPlanBoxSelectRequest,
  PostApiProductPlanBoxSelectResponse,
  PostApiProductPlanPrepareSelectRequest,
  PostApiProductPlanPrepareSelectResponse,
  DeleteApiProductPlanBoxCancelRequest,
  DeleteApiProductPlanBoxCancelResponse,
  DeleteApiProductPlanPrepareCancelRequest,
  DeleteApiProductPlanPrepareCancelResponse,
  PutApiProductPlanCompleteCancelRequest,
  PutApiProductPlanCompleteCancelResponse,
  PutApiProductPlanCompleteOrderNoRequest,
  PutApiProductPlanCompleteOrderNoResponse,
  PutApiProductPlanReviewCancelRequest,
  PutApiProductPlanReviewCancelResponse,
  PutApiProductPlanReviewOrderNoRequest,
  PutApiProductPlanReviewOrderNoResponse,
  PutApiProductPlanCheckCancelRequest,
  PutApiProductPlanCheckCancelResponse,
  PutApiProductPlanCheckOrderNoRequest,
  PutApiProductPlanCheckOrderNoResponse,
} from '@/api/type/productionPlan';

enum Api {
  LIST = `/api/product/plan/orders`,
  PREPARE_NOTSELECT_LIST = '/api/product/plan/prepare',
  PREPARE_SELECT_LIST = '/api/product/plan/prepare/',
  DT = '/api/product/plan/',
  BOX_SELECT_LIST = '/api/product/plan/box/',
  BOX_NOT_SELECT_LIST = '/api/product/plan/box',
  TITER_LIST = '/api/product/plan/immuneType/',
  STATION_LIST = '/api/product/plan/station/',
  BATCH_LIST = '/api/product/plan/batch/',
  PLASMA_LIST = '/api/product/plan/bag',
  BOX_SELECT = '/api/product/plan/box/select',
  PREPARE_SELECT = '/api/product/plan/prepare/select',
  BOX_CANCEL = '/api/product/plan/box/cancel',
  PREPARE_CANCEL = '/api/product/plan/prepare/cancel',

  COMPLETE_PLAN = '/api/product/plan/complete/',
  COMPLETE_CANCEL_PLAN = '/api/product/plan/complete/cancel',
  REVIEW_PLAN = '/api/product/plan/review/',
  CANCEL_REVIEW_PLAN = '/api/product/plan/review/cancel',
  CHECK_PLAN = '/api/product/plan/check/',
  CANCEL_CHECK_PLAN = '/api/product/plan/check/cancel',
}

export const getListApi = (data: PostApiProductPlanOrdersRequest) =>
  defHttp.post<PostApiProductPlanOrdersResponse>({
    url: Api.LIST,
    data: data,
  });

export const getNotSelectPrepareListApi = (data: PostApiProductPlanPrepareRequest) =>
  defHttp.post<PostApiProductPlanPrepareResponse>({
    url: Api.PREPARE_NOTSELECT_LIST,
    data: data,
  });
export const getSelectPrepareListApi = (data: GetApiProductPlanPrepareOrderNoRequest) =>
  defHttp.get<GetApiProductPlanPrepareOrderNoResponse>({
    url: Api.PREPARE_SELECT_LIST + data.orderNo,
  });
export const getNotSelectBoxListApi = (data: PostApiProductPlanBoxRequest) =>
  defHttp.post<PostApiProductPlanBoxResponse>({
    url: Api.BOX_NOT_SELECT_LIST,
    data: data,
  });
export const getSelectBoxListApi = (data: GetApiProductPlanBoxOrderNoRequest) =>
  defHttp.get<GetApiProductPlanBoxOrderNoResponse>({
    url: Api.BOX_SELECT_LIST + data.orderNo,
  });
export const getDtApi = (data: GetApiProductPlanOrderNoRequest) =>
  defHttp.get<GetApiProductPlanOrderNoResponse>({
    url: Api.DT + data.orderNo,
  });
export const getForBatchListApi = (data: GetApiProductPlanBatchOrderNoRequest) =>
  defHttp.get<GetApiProductPlanBatchOrderNoResponse>({
    url: Api.BATCH_LIST + data.orderNo,
  });
export const getForTiterListApi = (data: GetApiProductPlanImmuneTypeOrderNoRequest) =>
  defHttp.get<GetApiProductPlanImmuneTypeOrderNoResponse>({
    url: Api.TITER_LIST + data.orderNo,
  });
export const getForStationListApi = (data: GetApiProductPlanStationOrderNoRequest) =>
  defHttp.get<GetApiProductPlanStationOrderNoResponse>({
    url: Api.STATION_LIST + data.orderNo,
  });
export const getForPlasmaListApi = (data: PostApiProductPlanBagRequest) =>
  defHttp.post<PostApiProductPlanBagResponse>({
    url: Api.PLASMA_LIST,
    data: data,
  });

export const submitBoxSelectApi = (data: PostApiProductPlanBoxSelectRequest) =>
  defHttp.post<PostApiProductPlanBoxSelectResponse>({
    url: Api.BOX_SELECT,
    data: data,
  });
export const submitPrepareSelectApi = (data: PostApiProductPlanPrepareSelectRequest) =>
  defHttp.post<PostApiProductPlanPrepareSelectResponse>({
    url: Api.PREPARE_SELECT,
    data: data,
  });

export const submitBoxCancelApi = (data: DeleteApiProductPlanBoxCancelRequest) =>
  defHttp.delete<DeleteApiProductPlanBoxCancelResponse>({
    url: Api.BOX_CANCEL,
    data: data,
  });
export const submitPrepareCancelApi = (data: DeleteApiProductPlanPrepareCancelRequest) =>
  defHttp.delete<DeleteApiProductPlanPrepareCancelResponse>({
    url: Api.PREPARE_CANCEL,
    data: data,
  });

export const submitComplateApi = (data: PutApiProductPlanCompleteOrderNoRequest) =>
  defHttp.put<PutApiProductPlanCompleteOrderNoResponse>({
    url: Api.COMPLETE_PLAN + data.orderNo,
  });
export const submitComplateCancelApi = (data: PutApiProductPlanCompleteCancelRequest) =>
  defHttp.put<PutApiProductPlanCompleteCancelResponse>({
    url: Api.COMPLETE_CANCEL_PLAN,
    data: data,
  });
export const submitReviewlApi = (data: PutApiProductPlanReviewOrderNoRequest) =>
  defHttp.put<PutApiProductPlanReviewOrderNoResponse>({
    url: Api.REVIEW_PLAN + data.orderNo,
  });

export const submitReviewCancelApi = (data: PutApiProductPlanReviewCancelRequest) =>
  defHttp.put<PutApiProductPlanReviewCancelResponse>({
    url: Api.CANCEL_REVIEW_PLAN,
    data: data,
  });
export const submitChecklApi = (data: PutApiProductPlanCheckOrderNoRequest) =>
  defHttp.put<PutApiProductPlanCheckOrderNoResponse>({
    url: Api.CHECK_PLAN + data.orderNo,
  });
export const submitCheckCancelApi = (data: PutApiProductPlanCheckCancelRequest) =>
  defHttp.put<PutApiProductPlanCheckCancelResponse>({
    url: Api.CANCEL_CHECK_PLAN,
    data: data,
  });
