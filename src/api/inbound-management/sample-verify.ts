import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBatchSampleVerifyBatchSampleNoRequest,
  GetApiCoreBatchSampleVerifyBatchSampleNoResponse,
  GetApiCoreBatchSampleVerifyRequest,
  GetApiCoreBatchSampleVerifyResponse,
  PostApiCoreBatchSampleVerifyNonConformanceRequest,
  PostApiCoreBatchSampleVerifyRequest,
  PutApiCoreBatchSampleVerifyRevokeRequest,
} from '@/api/type/batchManage';
import {
  PostApiSysDictionaryItemsRequest,
  PostApiSysDictionaryItemsResponse,
} from '@/api/type/dictionary';

enum Api {
  SAMPLE_VERIFY_RESTFUL = '/api/core/batch/sample/verify',
  DICTIONARY = '/api/sys/dictionaryItems',
  CONFIRM_NONCONFORMITY = '/api/core/batch/sample/verify/non-conformance',
  REVOKE_SAMPLE_VERIFY = '/api/core/batch/sample/verify/revoke',
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

export const receiveSample = (params: PostApiCoreBatchSampleVerifyRequest['batchSampleNo']) =>
  defHttp.post({ url: Api.SAMPLE_VERIFY_RESTFUL, params });

export const confirmNonconformity = (
  params: PostApiCoreBatchSampleVerifyNonConformanceRequest['sampleNo'],
) => defHttp.post({ url: Api.CONFIRM_NONCONFORMITY, params });

export const revokeSampleVerify = (params: PutApiCoreBatchSampleVerifyRevokeRequest) =>
  defHttp.put({ url: Api.REVOKE_SAMPLE_VERIFY, params });

export const getSampleDictionary = (params: PostApiSysDictionaryItemsRequest) =>
  defHttp.post<PostApiSysDictionaryItemsResponse>({ url: Api.DICTIONARY, params });
