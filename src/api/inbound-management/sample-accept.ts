import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBatchSampleAcceptBatchSampleNoRequest,
  GetApiCoreBatchSampleAcceptRequest,
  GetApiCoreBatchSampleAcceptResponse,
  PostApiCoreBatchSampleAcceptRequest,
} from '@/api/type/batchManage';

enum Api {
  SAMPLE_ACCEPT_RESTFUL = '/api/core/batch/sample/accept',
}

export const getSampleAcceptList = (params: GetApiCoreBatchSampleAcceptRequest) =>
  defHttp.get<GetApiCoreBatchSampleAcceptResponse>(
    { url: Api.SAMPLE_ACCEPT_RESTFUL, params },
    { joinParamsToUrl: true },
  );

export const getSampleAcceptDetail = (
  params: GetApiCoreBatchSampleAcceptBatchSampleNoRequest['batchSampleNo'],
) => defHttp.get({ url: Api.SAMPLE_ACCEPT_RESTFUL + '/' + params });

export const acceptSample = (params: PostApiCoreBatchSampleAcceptRequest) =>
  defHttp.post({ url: Api.SAMPLE_ACCEPT_RESTFUL, params });
