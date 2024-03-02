import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreLabBagTiterRequest,
  PostApiCoreLabBagTiterResponse,
  PostApiCoreLabBagTrackRequest,
  PostApiCoreLabBagTrackResponse,
  PostApiCoreLabBagCheckResponse,
  PostApiCoreLabBagCheckRequest,
} from '@/api/type/queryStatistics';

enum Api {
  CHECK_LIST = '/api/core/lab/bag/check',
  TITER_LIST = '/api/core/lab/bag/titer',
  FOLLOW_UP_LIST = '/api/core/lab/bag/track',
}

export const getCheckListApi = (params: PostApiCoreLabBagCheckRequest) =>
  defHttp.post<PostApiCoreLabBagCheckResponse>({ url: Api.CHECK_LIST, params });

export const getTiterListApi = (params: PostApiCoreLabBagTiterRequest) =>
  defHttp.post<PostApiCoreLabBagTiterResponse>({ url: Api.TITER_LIST, params });

export const getFollowUpListApi = (params: PostApiCoreLabBagTrackRequest) =>
  defHttp.post<PostApiCoreLabBagTrackResponse>({ url: Api.FOLLOW_UP_LIST, params });
