import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBatchSampleVerifyBatchSampleNoRequest,
  GetApiCoreBatchSampleVerifyBatchSampleNoResponse,
  GetApiCoreBatchSampleVerifyLackBatchSampleNoRequest,
  GetApiCoreBatchSampleVerifyLackBatchSampleNoResponse,
  GetApiCoreBatchSampleVerifyNonConformanceBatchSampleNoRequest,
  GetApiCoreBatchSampleVerifyNonConformanceBatchSampleNoResponse,
  GetApiCoreBatchSampleVerifyRequest,
  GetApiCoreBatchSampleVerifyResponse,
  GetApiCoreBatchSampleVerifyUnqualifiedBatchSampleNoRequest,
  GetApiCoreBatchSampleVerifyUnqualifiedBatchSampleNoResponse,
  PostApiCoreBatchSampleUnqualifiedRequest,
  PostApiCoreBatchSampleVerifyNonConformanceRequest,
  PostApiCoreBatchSampleVerifyRequest,
  PutApiCoreBatchSampleVerifyRequest,
  PutApiCoreBatchSampleVerifyRevokeRequest,
} from '@/api/type/batchManage';

enum Api {
  SAMPLE_VERIFY_RESTFUL = '/api/core/batch/sample/verify',
  CONFIRM_NONCONFORMITY = '/api/core/batch/sample/verify/non-conformance',
  REVOKE_SAMPLE_VERIFY = '/api/core/batch/sample/verify/revoke',
  MISSING_NUMBER = '/api/core/batch/sample/verify/lack/',
  VERIFY_UNQUALIFIED = '/api/core/batch/sample/verify/unqualified/',
  REGISTER_NONCONFORMITY = '/api/core/batch/sample/unqualified',
}

export const getSampleVerifyList = (params: GetApiCoreBatchSampleVerifyRequest) =>
  defHttp.get<GetApiCoreBatchSampleVerifyResponse>(
    { url: Api.SAMPLE_VERIFY_RESTFUL, params },
    { joinParamsToUrl: true },
  );

export const getSampleVerifyDetail = (
  params: GetApiCoreBatchSampleVerifyBatchSampleNoRequest['batchSampleNo'],
) =>
  defHttp.get<GetApiCoreBatchSampleVerifyBatchSampleNoResponse>({
    url: Api.SAMPLE_VERIFY_RESTFUL + '/' + params,
  });

export const receiveSample = (params: PutApiCoreBatchSampleVerifyRequest) =>
  defHttp.put({ url: Api.SAMPLE_VERIFY_RESTFUL, params });

export const confirmNonconformity = (params: PostApiCoreBatchSampleVerifyNonConformanceRequest) =>
  defHttp.post({ url: Api.CONFIRM_NONCONFORMITY, params });

export const createAcceptanceForm = (params: PostApiCoreBatchSampleVerifyRequest) =>
  defHttp.post({ url: Api.SAMPLE_VERIFY_RESTFUL, params });

export const revokeSampleVerify = (params: PutApiCoreBatchSampleVerifyRevokeRequest) =>
  defHttp.put({ url: Api.REVOKE_SAMPLE_VERIFY, params });

export const getMissingNumberList = (
  params: GetApiCoreBatchSampleVerifyLackBatchSampleNoRequest['batchSampleNo'],
) =>
  defHttp.get<GetApiCoreBatchSampleVerifyLackBatchSampleNoResponse>(
    {
      url: Api.MISSING_NUMBER,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const getVerifyUnqualified = (
  params: GetApiCoreBatchSampleVerifyUnqualifiedBatchSampleNoRequest['batchSampleNo'],
) =>
  defHttp.get<GetApiCoreBatchSampleVerifyUnqualifiedBatchSampleNoResponse>(
    {
      url: Api.VERIFY_UNQUALIFIED,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const getVerifyNonconformity = (
  params: GetApiCoreBatchSampleVerifyNonConformanceBatchSampleNoRequest['batchSampleNo'],
) =>
  defHttp.get<GetApiCoreBatchSampleVerifyNonConformanceBatchSampleNoResponse>({
    url: Api.CONFIRM_NONCONFORMITY + '/',
    params,
  });

export const registerNonconformity = (params: PostApiCoreBatchSampleUnqualifiedRequest) =>
  defHttp.post({ url: Api.REGISTER_NONCONFORMITY, params });
