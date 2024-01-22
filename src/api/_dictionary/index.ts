import { defHttp } from '@/utils/http/axios';
import { PostApiSysDictionaryItemsResponse } from '@/api/type/dictionary';

enum Api {
  DICTIONARY = '/api/sys/dictionaryItems',
}

export enum DictionaryEnum {
  PlasmaUnqualifiedReason = 'bagUnqualifiedReason',
  SampleUnqualifiedReason = 'sampleUnqualifiedReason',
  PlasmaRelease = 'plasmaRelease',
  UnqualifiedBoxReason = 'warehouseUnqualified',
  SampleType = 'sampleType',
  PlasmaUnqualifiedItem = 'plasmaUnqualifiedItem',
}

export const getSysDictionary = (params: DictionaryEnum[]) =>
  defHttp.post<PostApiSysDictionaryItemsResponse>({ url: Api.DICTIONARY, params });
