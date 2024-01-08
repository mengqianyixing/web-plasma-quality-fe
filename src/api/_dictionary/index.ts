import { defHttp } from '@/utils/http/axios';
import { PostApiSysDictionaryItemsResponse } from '@/api/type/dictionary';

enum Api {
  DICTIONARY = '/api/sys/dictionaryItems',
}

export enum DictionaryEnum {
  SampleUnqualifiedReason = 'checkUnqualifiedReason',
  SampleType = 'sampleType',
}

export const getSysDictionary = (params: DictionaryEnum[]) =>
  defHttp.post<PostApiSysDictionaryItemsResponse>({ url: Api.DICTIONARY, params });
