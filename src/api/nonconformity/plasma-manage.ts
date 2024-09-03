import {
  GetApiCoreBagUnqualifiedBagNoRequest,
  GetApiCoreBagUnqualifiedBagNoResponse,
  GetApiCoreBagUnqualifiedRequest,
  GetApiCoreBagUnqualifiedResponse,
  PostApiCoreBagUnqualifiedInStoreRequest,
  PostApiCoreBagUnqualifiedPickBatchRequest,
  PostApiCoreBagUnqualifiedPickRequest,
  PostApiCoreBagUnqualifiedProcessBagNoRequest,
  DeleteApiCoreBagUnqualifiedProcessRequest,
  PostApiCoreBankDeliverUnqualifiedPmsOutRequest,
} from '@/api/type/nonconformityManage';
import { defHttp } from '@/utils/http/axios';

enum Api {
  NONCONFORMITY_PLASMA_PICK = '/api/core/bag/unqualified/pick',
  NONCONFORMITY_PLASMA_PICK_BATCH = '/api/core/bag/unqualified/pick/batch',
  NONCONFORMITY_PLASMA_IN_STORE = '/api/core/bag/unqualified/in-store',
  NONCONFORMITY_PLASMA_CHECK = '/api/core/bag/unqualified/process',
  NONCONFORMITY_PLASMA_RESTFUL = '/api/core/bag/unqualified',
  NONCONFORMITY_PMS = '/api/core/bank/deliver/unqualified/pms-out',
}

export const nonconformityPick = (
  params: PostApiCoreBagUnqualifiedPickRequest,
  errOkCb?: () => void,
) =>
  defHttp.post({ url: Api.NONCONFORMITY_PLASMA_PICK, params }, { errorMessageModeOkCb: errOkCb });

export const nonconformityPlasmaPickByBatch = (params: PostApiCoreBagUnqualifiedPickBatchRequest) =>
  defHttp.post({ url: Api.NONCONFORMITY_PLASMA_PICK_BATCH, params });

export const nonconformityInStore = (
  params: PostApiCoreBagUnqualifiedInStoreRequest,
  errOkCb?: () => void,
) =>
  defHttp.post(
    { url: Api.NONCONFORMITY_PLASMA_IN_STORE, params },
    { errorMessageModeOkCb: errOkCb },
  );

export const nonconformityCheck = (params: PostApiCoreBagUnqualifiedProcessBagNoRequest['bagNo']) =>
  defHttp.post({ url: Api.NONCONFORMITY_PLASMA_CHECK + '/' + params });

export const nonconformityPMS = (params: PostApiCoreBankDeliverUnqualifiedPmsOutRequest) =>
  defHttp.post({ url: Api.NONCONFORMITY_PMS, params });

export const nonconformityRedoCheck = (params: DeleteApiCoreBagUnqualifiedProcessRequest) =>
  defHttp.delete({ url: Api.NONCONFORMITY_PLASMA_CHECK, params });

export const nonconformityPlasmaDetail = (params: GetApiCoreBagUnqualifiedBagNoRequest['bagNo']) =>
  defHttp.get<GetApiCoreBagUnqualifiedBagNoResponse>({
    url: Api.NONCONFORMITY_PLASMA_RESTFUL + '/' + params,
  });

export const nonconformityPlasmaList = (params: GetApiCoreBagUnqualifiedRequest) =>
  defHttp.get<GetApiCoreBagUnqualifiedResponse>(
    { url: Api.NONCONFORMITY_PLASMA_RESTFUL, params },
    { joinParamsToUrl: true },
  );
