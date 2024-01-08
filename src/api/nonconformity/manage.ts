import { defHttp } from '@/utils/http/axios';
import {
  DeleteApiCoreBankUnqualifiedBoxBoxNoRequest,
  GetApiCoreBankUnqualifiedBoxesRequest,
  GetApiCoreBankUnqualifiedBoxesResponse,
  PostApiCoreBagUnqualifiedRequest,
  PostApiCoreBankUnqualifiedBoxRequest,
  PutApiCoreBankUnqualifiedBoxRequest,
} from '@/api/type/nonconformityManage';
import { GetApiCoreBankWarehousesNameRequest } from '@/api/type/plasmaStoreManage';

enum Api {
  NONCONFORMITY_REGISTRATION = '/api/core/bag/unqualified',
  NONCONFORMITY_BOX_LIST = '/api/core/bank/unqualified/boxes',
  BOX_RESTFUL = '/api/core/bank/unqualified/box',
  NONCONFORMITY_BANK = '/api/core/bank/warehouses/name',
}

export const nonconformityRegistration = (params: PostApiCoreBagUnqualifiedRequest) => {
  return defHttp.post({
    url: Api.NONCONFORMITY_REGISTRATION,
    params,
  });
};

export const nonconformityBoxList = (params: GetApiCoreBankUnqualifiedBoxesRequest) =>
  defHttp.get<GetApiCoreBankUnqualifiedBoxesResponse>(
    { url: Api.NONCONFORMITY_BOX_LIST, params },
    {
      joinParamsToUrl: true,
    },
  );

export const addBox = (params: PostApiCoreBankUnqualifiedBoxRequest) =>
  defHttp.post({ url: Api.BOX_RESTFUL, params });

export const editBoxDetail = (params: PutApiCoreBankUnqualifiedBoxRequest) =>
  defHttp.put({ url: Api.BOX_RESTFUL, params });

export const deleteBox = (params: DeleteApiCoreBankUnqualifiedBoxBoxNoRequest['boxNo']) =>
  defHttp.delete({ url: Api.BOX_RESTFUL + '/' + params });

export const getBankName = (params: GetApiCoreBankWarehousesNameRequest) =>
  defHttp.get({ url: Api.NONCONFORMITY_BANK, params }, { joinParamsToUrl: true });
