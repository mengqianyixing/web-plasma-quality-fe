import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBatchSampleAcceptBatchSampleNoRequest,
  GetApiCoreBatchSampleAcceptBatchSampleNoResponse,
  GetApiCoreBatchSampleAcceptRequest,
  GetApiCoreBatchSampleAcceptResponse,
  PostApiCoreBatchSampleAcceptRequest,
} from '@/api/type/batchManage';
import {
  PostApiSysDictionaryItemsRequest,
  PostApiSysDictionaryItemsResponse,
} from '@/api/type/dictionary';

enum Api {
  SAMPLE_ACCEPT_RESTFUL = '/api/core/batch/sample/accept',
  DICTIONARY = '/api/sys/dictionaryItems',
}

export const getSampleReceiveList = (params: GetApiCoreBatchSampleAcceptRequest) =>
  defHttp.get<GetApiCoreBatchSampleAcceptResponse>(
    { url: Api.SAMPLE_ACCEPT_RESTFUL, params },
    { joinParamsToUrl: true },
  );

export const getSampleReceiveDetail = (
  params: GetApiCoreBatchSampleAcceptBatchSampleNoRequest['batchSampleNo'],
) =>
  defHttp.get<GetApiCoreBatchSampleAcceptBatchSampleNoResponse>({
    url: Api.SAMPLE_ACCEPT_RESTFUL + '/' + params,
  });

export const receiveSample = (params: PostApiCoreBatchSampleAcceptRequest) =>
  defHttp.post({ url: Api.SAMPLE_ACCEPT_RESTFUL, params });

export const getSampleDictionary = (params: PostApiSysDictionaryItemsRequest) =>
  defHttp.post<PostApiSysDictionaryItemsResponse>({ url: Api.DICTIONARY, params });
