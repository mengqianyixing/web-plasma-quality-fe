import {
  GetApiCoreBagUnqualifiedBagNoRequest,
  GetApiCoreBagUnqualifiedBagNoResponse,
  GetApiCoreBagUnqualifiedRequest,
  PostApiCoreBagUnqualifiedInStoreRequest,
  PostApiCoreBagUnqualifiedPickRequest,
  PostApiCoreBagUnqualifiedProcessBagNoRequest,
} from '@/api/type/nonconformityManage';
import { defHttp } from '@/utils/http/axios';

enum Api {
  NONCONFORMITY_PLASMA_PICK = '/api/core/bag/unqualified/pick',
  NONCONFORMITY_PLASMA_IN_STORE = '/api/core/bag/unqualified/in-store',
  NONCONFORMITY_PLASMA_CHECK = '/api/core/bag/unqualified/process',
  NONCONFORMITY_PLASMA_RESTFUL = '/api/core/bag/unqualified',
}

export const nonconformityPick = (params: PostApiCoreBagUnqualifiedPickRequest) =>
  defHttp.post({ url: Api.NONCONFORMITY_PLASMA_PICK, params });

export const nonconformityInStore = (params: PostApiCoreBagUnqualifiedInStoreRequest) =>
  defHttp.post({ url: Api.NONCONFORMITY_PLASMA_IN_STORE, params });

export const nonconformityCheck = (params: PostApiCoreBagUnqualifiedProcessBagNoRequest['bagNo']) =>
  defHttp.post({ url: Api.NONCONFORMITY_PLASMA_CHECK + '/' + params });

export const nonconformityRedoCheck = (
  params: PostApiCoreBagUnqualifiedProcessBagNoRequest['bagNo'],
) => defHttp.delete({ url: Api.NONCONFORMITY_PLASMA_CHECK + '/' + params });

export const nonconformityPlasmaDetail = (params: GetApiCoreBagUnqualifiedBagNoRequest['bagNo']) =>
  defHttp.get<GetApiCoreBagUnqualifiedBagNoResponse>({
    url: Api.NONCONFORMITY_PLASMA_RESTFUL + '/' + params,
  });

export const nonconformityPlasmaList = (params: GetApiCoreBagUnqualifiedRequest) =>
  defHttp.get({ url: Api.NONCONFORMITY_PLASMA_RESTFUL, params }, { joinParamsToUrl: true });
