import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreSampleBatchsRequest,
  GetApiCoreSampleBatchsResponse,
  GetApiCoreSampleUnqualifiedRequest,
  GetApiCoreSampleUnqualifiedResponse,
  PutApiCoreSampleReleaseRequest,
  PutApiCoreSampleReleaseResponse,
} from '@/api/type/sampleManage';

enum Api {
  SAMPLE_BATCHES = '/api/core/sample/batchs',
  SAMPLE_UNQUALIFIED = '/api/core/sample/unqualified',
  SAMPLE_RELEASE = '/api/core/sample/release',
}

export const getSampleBatchesList = (params: GetApiCoreSampleBatchsRequest) =>
  defHttp.get<GetApiCoreSampleBatchsResponse>(
    { url: Api.SAMPLE_BATCHES, params },
    { joinParamsToUrl: true },
  );

export const getSampleUnqualifiedList = (params: GetApiCoreSampleUnqualifiedRequest) =>
  defHttp.get<GetApiCoreSampleUnqualifiedResponse>(
    { url: Api.SAMPLE_UNQUALIFIED, params },
    { joinParamsToUrl: true },
  );

export const sampleRelease = (params: PutApiCoreSampleReleaseRequest) =>
  defHttp.put<PutApiCoreSampleReleaseResponse>({ url: Api.SAMPLE_RELEASE, params });
