import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBatchPlasmaInStoreRequest,
  GetApiCoreBatchPlasmaInStoreResponse,
} from '@/api/type/plasmaStoreManage';

import {
  PostApiCoreBatchPlasmaVerifyPublishBatchNoRequest,
  PostApiCoreBatchPlasmaWeightRequest,
  PostApiCoreBatchPlasmaWeightResponse,
} from '@/api/type/batchManage';

enum Api {
  PLASMA_INBOUND_LIST = '/api/core/batch/plasma/in-store',
  PLASMA_WEIGHT = '/api/core/batch/plasma/weight',
  PLASMA_VERIFY_PUBLISH = '/api/core/batch/plasma/verify/publish',
}

export const getPlasmaInboundList = (params: GetApiCoreBatchPlasmaInStoreRequest) =>
  defHttp.get<GetApiCoreBatchPlasmaInStoreResponse>(
    { url: Api.PLASMA_INBOUND_LIST, params },
    { joinParamsToUrl: true },
  );

export const registerPlasmaWeight = (params: PostApiCoreBatchPlasmaWeightRequest) =>
  defHttp.post<PostApiCoreBatchPlasmaWeightResponse>({ url: Api.PLASMA_WEIGHT, params });

export const plasmaVerifyPublish = (
  params: PostApiCoreBatchPlasmaVerifyPublishBatchNoRequest['batchNo'],
) => defHttp.post({ url: Api.PLASMA_VERIFY_PUBLISH + '/' + params });
