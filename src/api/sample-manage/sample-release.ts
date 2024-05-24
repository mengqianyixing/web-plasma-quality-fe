import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreSampleBatchsRequest,
  GetApiCoreSampleBatchsResponse,
  GetApiCoreSampleUnqualifiedRequest,
  GetApiCoreSampleUnqualifiedResponse,
  PutApiCoreSampleReleaseRequest,
  PutApiCoreSampleReleaseResponse,
  PostApiCoreLabPreviewRequest,
  PostApiCoreLabPreviewResponse,
} from '@/api/type/sampleManage';
import {
  GetApiCoreLabRegistrationLabRequestProjectsBsNoRequest,
  GetApiCoreLabRegistrationLabRequestProjectsBsNoResponse,
} from '@/api/type/inspectManage';

enum Api {
  SAMPLE_BATCHES = '/api/core/sample/batchs',
  SAMPLE_UNQUALIFIED = '/api/core/sample/unqualified',
  SAMPLE_RELEASE = '/api/core/sample/release',
  CHECK_ITEM_LIST = '/api/core/lab/registration/labRequestProjects/',
  ADD_ITEM = '/api/core/lab/preview',
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

export const getCheckItemListApi = ({
  bsNo,
}: GetApiCoreLabRegistrationLabRequestProjectsBsNoRequest) =>
  defHttp.get<GetApiCoreLabRegistrationLabRequestProjectsBsNoResponse>({
    url: Api.CHECK_ITEM_LIST + bsNo,
  });

export const addItemApi = (data: PostApiCoreLabPreviewRequest) =>
  defHttp.post<PostApiCoreLabPreviewResponse>({ url: Api.ADD_ITEM, data });
