import { defHttp } from '@/utils/http/axios';
import {
  DeleteApiProductOutStoreBatchOrderNoRequest,
  GetApiProductOutStoreBoxesOrderNoRequest,
  GetApiProductOutStoreBoxesOrderNoResponse,
  GetApiProductPrepareTrayOutRequest,
  GetApiProductPrepareTrayOutResponse,
  PostApiProductOutStoreBatchRequest,
  PostApiProductOutStoreBoxRequest,
} from '@/api/type/stockoutManage';
import {
  PostApiProductReceptionAcceptBatchRequest,
  PostApiProductReceptionAcceptBoxRequest,
  PostApiProductReceptionAcceptedBoxesRequest,
  PostApiProductReceptionAcceptedBoxesResponse,
  PostApiProductReceptionAcceptRevokeRequest,
  PostApiProductReceptionBoxesRequest,
  PostApiProductReceptionBoxesResponse,
} from '@/api/type/productionReceiveManage';

enum Api {
  PRODUCTION_BATCH_PUT_INTO = '/api/product/out-store/batch',
  PRODUCTION_BATCH_RECEIVE = '/api/product/reception/accept/batch',
  PRODUCTION_BATCH_RECEIVE_REVOKE = '/api/product/reception/accept/revoke',
  PRODUCTION_RECEPTION_LIST = '/api/product/reception/boxes',
  PRODUCTION_ACCEPTED_LIST = '/api/product/reception/accepted/boxes',
  PRODUCTION_ACCEPT_BOX = '/api/product/reception/accept/box',
  PRODUCTION_OUT_STORE_LIST = '/api/product/out-store/boxes',
  PRODUCTION_OUT_STORE = '/api/product/out-store/box',
  PRODUCTION_TRAY_OUT_STORE = '/api/product/prepare/tray/out',
}

export const productionStockOutByBatch = (params: PostApiProductOutStoreBatchRequest) =>
  defHttp.post({ url: Api.PRODUCTION_BATCH_PUT_INTO, params });

export const productionReceiveByBatch = (params: PostApiProductReceptionAcceptBatchRequest) =>
  defHttp.post({ url: Api.PRODUCTION_BATCH_RECEIVE, params });

export const productionReceiveRevokeByBatch = (
  params: PostApiProductReceptionAcceptRevokeRequest,
) => defHttp.post({ url: Api.PRODUCTION_BATCH_RECEIVE_REVOKE, params });

export const getReceptionList = (params: PostApiProductReceptionBoxesRequest) =>
  defHttp.post<PostApiProductReceptionBoxesResponse>({
    url: Api.PRODUCTION_RECEPTION_LIST,
    params,
  });

export const getAcceptedReceptionList = (params: PostApiProductReceptionAcceptedBoxesRequest) =>
  defHttp.post<PostApiProductReceptionAcceptedBoxesResponse>({
    url: Api.PRODUCTION_ACCEPTED_LIST,
    params,
  });

export const productionAcceptByBox = (params: PostApiProductReceptionAcceptBoxRequest) =>
  defHttp.post({ url: Api.PRODUCTION_ACCEPT_BOX, params });

export const getProductionOutStoreList = (
  params: GetApiProductOutStoreBoxesOrderNoRequest['orderNo'],
) =>
  defHttp.get<GetApiProductOutStoreBoxesOrderNoResponse>({
    url: Api.PRODUCTION_OUT_STORE_LIST + '/' + params,
  });

export const productionOutStore = (params: PostApiProductOutStoreBoxRequest) =>
  defHttp.post({ url: Api.PRODUCTION_OUT_STORE, params });

export const revokeProductionOutStore = (
  params: DeleteApiProductOutStoreBatchOrderNoRequest['orderNo'],
) => defHttp.delete({ url: Api.PRODUCTION_BATCH_PUT_INTO + '/' + params });

export const getTrayOutStoreList = (params: GetApiProductPrepareTrayOutRequest) =>
  defHttp.get<GetApiProductPrepareTrayOutResponse>(
    { url: Api.PRODUCTION_TRAY_OUT_STORE, params },
    {
      joinParamsToUrl: true,
    },
  );
