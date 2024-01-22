import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBatchPlasmaAuditIdRequest,
  GetApiCoreBatchPlasmaAuditIdResponse,
  GetApiCoreBatchPlasmaAuditsRequest,
  GetApiCoreBatchPlasmaAuditsResponse,
  PostApiCoreBatchPlasmaAuditRequest,
  PutApiCoreBatchPlasmaAuditApprovalRequest,
  PutApiCoreBatchPlasmaAuditRecheckCancelRequest,
  PutApiCoreBatchPlasmaAuditRecheckRequest,
  PutApiCoreBatchPlasmaAuditRequest,
  PutApiCoreBatchPlasmaAuditRevokeRequest,
} from '@/api/type/plasmaCheckManage';

enum Api {
  PLASMA_CHECK_LIST = '/api/core/batch/plasma/audits',
  PLASMA_CHECK_RESTFUL = '/api/core/batch/plasma/audit',
  PLASMA_CHECK_REVOKE = '/api/core/batch/plasma/audit/revoke',
  PLASMA_CHECK_RECHECK = '/api/core/batch/plasma/audit/recheck',
  PLASMA_RECHECK_CANCEL = '/api/core/batch/plasma/audit/recheck-cancel',
  PLASMA_CHECK_APPROVAL = '/api/core/batch/plasma/audit/approval',
}

export const getPlasmaCheckList = (params: GetApiCoreBatchPlasmaAuditsRequest) =>
  defHttp.get<GetApiCoreBatchPlasmaAuditsResponse>(
    { url: Api.PLASMA_CHECK_LIST, params },
    { joinParamsToUrl: true },
  );

export const getPlasmaCheckDetail = (params: GetApiCoreBatchPlasmaAuditIdRequest['id']) =>
  defHttp.get<GetApiCoreBatchPlasmaAuditIdResponse>({
    url: `${Api.PLASMA_CHECK_RESTFUL}/${params}`,
  });

export const addPlasmaCheck = (params: PostApiCoreBatchPlasmaAuditRequest) =>
  defHttp.post({ url: Api.PLASMA_CHECK_RESTFUL, params });

export const editPlasmaCheck = (params: PutApiCoreBatchPlasmaAuditRequest) =>
  defHttp.put({ url: Api.PLASMA_CHECK_RESTFUL, params });

export const revokePlasmaCheck = (params: PutApiCoreBatchPlasmaAuditRevokeRequest) =>
  defHttp.put({ url: Api.PLASMA_CHECK_REVOKE, params });

export const recheckPlasmaCheck = (params: PutApiCoreBatchPlasmaAuditRecheckRequest) =>
  defHttp.put({ url: Api.PLASMA_CHECK_RECHECK, params });

export const recheckCancelPlasmaCheck = (params: PutApiCoreBatchPlasmaAuditRecheckCancelRequest) =>
  defHttp.put({ url: Api.PLASMA_RECHECK_CANCEL, params });

export const approvalPlasmaCheck = (params: PutApiCoreBatchPlasmaAuditApprovalRequest) =>
  defHttp.put({ url: Api.PLASMA_CHECK_APPROVAL, params });
