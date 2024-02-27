import { defHttp } from '@/utils/http/axios';
import {
  DeleteApiCoreBankDeliverNonproductivePickPlasmaBagNoRequest,
  DeleteApiCoreBankDeliverNonproductiveProcessDlvNoRequest,
  DeleteApiCoreBankDeliverNonproductiveReadyDlvNoRequest,
  DeleteApiCoreBankDeliverNonproductiveReadyDlvNoResponse,
  DeleteApiCoreBankDeliverNonproductiveRequest,
  DeleteApiCoreBankDeliverNonproductiveReviewDlvNoRequest,
  GetApiCoreBankDeliverNonproductiveDetailBatchRequest,
  GetApiCoreBankDeliverNonproductiveDetailBatchResponse,
  GetApiCoreBankDeliverNonproductiveDetailBoxRequest,
  GetApiCoreBankDeliverNonproductiveDetailBoxResponse,
  GetApiCoreBankDeliverNonproductiveDetailPlasmaRequest,
  GetApiCoreBankDeliverNonproductiveDetailPlasmaResponse,
  GetApiCoreBankDeliverNonproductivePickPlasmaRequest,
  GetApiCoreBankDeliverNonproductivePickPlasmaResponse,
  GetApiCoreBankDeliverNonproductiveRequest,
  GetApiCoreBankDeliverNonproductiveResponse,
  GetApiCoreBankDeliverNonproductiveScanRequest,
  GetApiCoreBankDeliverNonproductiveScanResponse,
  PostApiCoreBankDeliverNonproductivePickPlasmaRequest,
  PostApiCoreBankDeliverNonproductivePickPlasmaResponse,
  PostApiCoreBankDeliverNonproductiveRequest,
  PostApiCoreBankDeliverNonproductiveResponse,
  PostApiCoreBankDeliverNonproductiveScanRequest,
  PostApiCoreBankDeliverNonproductiveScanResponse,
  PutApiCoreBankDeliverNonproductiveProcessDlvNoRequest,
  PutApiCoreBankDeliverNonproductiveReadyDlvNoRequest,
  PutApiCoreBankDeliverNonproductiveReadyDlvNoResponse,
  PutApiCoreBankDeliverNonproductiveRequest,
  PutApiCoreBankDeliverNonproductiveResponse,
  PutApiCoreBankDeliverNonproductiveReviewDlvNoRequest,
} from '@/api/type/stockoutManage';

enum Api {
  DELIVER_RESTFUL = '/api/core/bank/deliver/nonproductive',
  PICK_PLASMA_LIST = '/api/core/bank/deliver/nonproductive/pick-plasma',
  NON_PRODUCTIVE_PLASMA_BATCH = '/api/core/bank/deliver/nonproductive/detail-batch',
  NON_PRODUCTIVE_BOX = '/api/core/bank/deliver/nonproductive/detail-box',
  NON_PRODUCTIVE_PLASMA = '/api/core/bank/deliver/nonproductive/detail-plasma',
  NON_PRODUCTIVE_COMPLETE = '/api/core/bank/deliver/nonproductive/ready',
  NON_PRODUCTIVE_REVIEW = '/api/core/bank/deliver/nonproductive/review',
  NON_PRODUCTIVE_CHECK = '/api/core/bank/deliver/nonproductive/process',
  PLASMA_SCAN_RESTFUL = '/api/core/bank/deliver/nonproductive/scan',
}

export const getCoreBankDelivers = (params: GetApiCoreBankDeliverNonproductiveRequest) =>
  defHttp.get<GetApiCoreBankDeliverNonproductiveResponse>({ url: Api.DELIVER_RESTFUL, params });

export const createCoreBankDeliver = (params: PostApiCoreBankDeliverNonproductiveRequest) =>
  defHttp.post<PostApiCoreBankDeliverNonproductiveResponse>({ url: Api.DELIVER_RESTFUL, params });

export const updateCoreBankDeliver = (params: PutApiCoreBankDeliverNonproductiveRequest) =>
  defHttp.put<PutApiCoreBankDeliverNonproductiveResponse>({ url: Api.DELIVER_RESTFUL, params });

export const getPickPlasmaList = (params: GetApiCoreBankDeliverNonproductivePickPlasmaRequest) =>
  defHttp.get<GetApiCoreBankDeliverNonproductivePickPlasmaResponse>({
    url: Api.PICK_PLASMA_LIST,
    params,
  });

export const getDeliverNonProductiveDetailBatch = (
  params: GetApiCoreBankDeliverNonproductiveDetailBatchRequest,
) =>
  defHttp.get<GetApiCoreBankDeliverNonproductiveDetailBatchResponse>({
    url: Api.NON_PRODUCTIVE_PLASMA_BATCH,
    params,
  });

export const getDeliverNonProductiveDetailBox = (
  params: GetApiCoreBankDeliverNonproductiveDetailBoxRequest,
) =>
  defHttp.get<GetApiCoreBankDeliverNonproductiveDetailBoxResponse>({
    url: Api.NON_PRODUCTIVE_BOX,
    params,
  });

export const getDeliverNonProductivePlasma = (
  params: GetApiCoreBankDeliverNonproductiveDetailPlasmaRequest,
) =>
  defHttp.get<GetApiCoreBankDeliverNonproductiveDetailPlasmaResponse>({
    url: Api.NON_PRODUCTIVE_PLASMA,
    params,
  });

export const pickPlasma = (params: PostApiCoreBankDeliverNonproductivePickPlasmaRequest) =>
  defHttp.post<PostApiCoreBankDeliverNonproductivePickPlasmaResponse>({
    url: Api.PICK_PLASMA_LIST,
    params,
  });

export const deleteDeliverNonProductive = (params: DeleteApiCoreBankDeliverNonproductiveRequest) =>
  defHttp.delete({ url: Api.DELIVER_RESTFUL, params });

export const completeDeliverNonProductive = (
  params: PutApiCoreBankDeliverNonproductiveReadyDlvNoRequest['dlvNo'],
) =>
  defHttp.put<PutApiCoreBankDeliverNonproductiveReadyDlvNoResponse>({
    url: Api.NON_PRODUCTIVE_COMPLETE + `/${params}`,
  });

export const revokeDeliverNonProductive = (
  params: DeleteApiCoreBankDeliverNonproductiveReadyDlvNoRequest['dlvNo'],
) =>
  defHttp.delete<DeleteApiCoreBankDeliverNonproductiveReadyDlvNoResponse>({
    url: Api.NON_PRODUCTIVE_COMPLETE + `/${params}`,
  });

export const reviewDeliverNonProductive = (
  params: PutApiCoreBankDeliverNonproductiveReviewDlvNoRequest['dlvNo'],
) => defHttp.put({ url: Api.NON_PRODUCTIVE_REVIEW + `/${params}` });

export const revokeReviewDeliverNonProductive = (
  params: DeleteApiCoreBankDeliverNonproductiveReviewDlvNoRequest['dlvNo'],
) => defHttp.delete({ url: Api.NON_PRODUCTIVE_REVIEW + `/${params}` });

export const checkDeliverNonProductive = (
  params: PutApiCoreBankDeliverNonproductiveProcessDlvNoRequest['dlvNo'],
) => defHttp.put({ url: Api.NON_PRODUCTIVE_CHECK + `/${params}` });

export const revokeCheckDeliverNonProductive = (
  params: DeleteApiCoreBankDeliverNonproductiveProcessDlvNoRequest['dlvNo'],
) => defHttp.delete({ url: Api.NON_PRODUCTIVE_CHECK + `/${params}` });

export const deletePickPlasma = (
  params: DeleteApiCoreBankDeliverNonproductivePickPlasmaBagNoRequest['bagNo'],
) => defHttp.delete({ url: Api.PICK_PLASMA_LIST + `/${params}` });

export const getPlasmaScanList = (params: GetApiCoreBankDeliverNonproductiveScanRequest) =>
  defHttp.get<GetApiCoreBankDeliverNonproductiveScanResponse>({
    url: Api.PLASMA_SCAN_RESTFUL,
    params,
  });

export const outStorePlasma = (params: PostApiCoreBankDeliverNonproductiveScanRequest) =>
  defHttp.post<PostApiCoreBankDeliverNonproductiveScanResponse>({
    url: Api.PLASMA_SCAN_RESTFUL,
    params,
  });
