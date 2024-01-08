import { defHttp } from '@/utils/http/axios';
import {
  PostApiSysDictionaryItemsRequest,
  PostApiSysDictionaryItemsResponse,
} from '@/api/type/dictionary';

enum Api {
  DICTIONARY = '/api/sys/dictionaryItems',
}

export enum DictionaryEnum {
  SampleUnqualifiedReason = 'checkUnqualifiedReason',
}

export const geSampleUnqualifiedReasonDictionary = (params: PostApiSysDictionaryItemsRequest) =>
  defHttp.post<PostApiSysDictionaryItemsResponse>({ url: Api.DICTIONARY, params });
