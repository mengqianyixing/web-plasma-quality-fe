import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreDonorUnqualifiedTrackRequest,
  GetApiCoreDonorUnqualifiedTrackResponse,
} from '@/api/type/queryStatistics';
import { GetApiCoreLabProjectTraceBackDictItemsResponse } from '@/api/type/inspectManage';
enum Api {
  NonconformityTrackingList = '/api/core/donor/unqualified/track',
  NON_REASON = '/api/core/lab/project/traceBack/dictItems',
}

export const getNonconformityTrackingList = (params: GetApiCoreDonorUnqualifiedTrackRequest) =>
  defHttp.get<GetApiCoreDonorUnqualifiedTrackResponse>({
    url: Api.NonconformityTrackingList,
    params,
  });

export const getNonReasonListApi = () =>
  defHttp.get<GetApiCoreLabProjectTraceBackDictItemsResponse>({ url: Api.NON_REASON });
