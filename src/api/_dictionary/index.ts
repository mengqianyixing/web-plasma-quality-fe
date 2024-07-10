import { defHttp } from '@/utils/http/axios';
import {
  PostApiSysDictionaryItemsResponse,
  PostApiSysItemItemKeyResponse,
} from '@/api/type/dictionary';

enum Api {
  DICTIONARY = '/api/sys/dictionaryItems',
  DICTIONARY_ITEM_KEY = '/api/sys/dictItems',
}

export enum DictionaryEnum {
  SampleUnqualifiedReason = 'sampleUnqualifiedReason',
  PlasmaRelease = 'plasmaRelease',
  SampleType = 'sampleType',
  unProdReason = 'unProdReason',
  PlasmaFailedItem = 'plasmaFailedItem',
  PlasmaFailedReason = 'plasmaFailedReason',
  StockPlasmaProcessStatus = 'stockPlasmaProcessStatus',
  ProvinceCode = 'provinceCode',
}

export enum DictionaryReasonEnum {
  PlasmaFailedReason = 'plasmaFailedReason',
  SampleFailedReason = 'sampleFailedReason',
}

export enum DictionaryItemKeyEnum {
  PlasmaAccept = 'plasmaAccept',
  SampleAccept = 'sampleAccept',
  Track = 'track',
  Test = 'test',
  Quarantine = 'quarantine',
  PlasmaFailed = 'plasmaFailed',
  SampleFailed = 'sampleFailed',
  Sample = 'sample',
  Other = 'other',
}
export enum UnqualifiedEnum {
  MissNum = 'bagMiss',
}

export const getSysDictionary = (params: DictionaryEnum[]) =>
  defHttp.post<PostApiSysDictionaryItemsResponse>({ url: Api.DICTIONARY, params });

export const getSysSecondaryDictionary = (params: {
  dataKey: DictionaryReasonEnum;
  dictItemTypes: DictionaryItemKeyEnum[];
  show?: Number;
}) => defHttp.post<PostApiSysItemItemKeyResponse>({ url: Api.DICTIONARY_ITEM_KEY, params });
