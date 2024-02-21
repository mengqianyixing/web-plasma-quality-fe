/*
 * @Author: HxB
 * @Date: 2024-01-08 10:30:41
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-24 14:53:35
 * @Description: 字典
 * @FilePath: \psms-fe\src\api\_dictionary\index.ts
 */
import { defHttp } from '@/utils/http/axios';
import {
  PostApiSysDictionaryItemsResponse,
  PostApiSysItemItemKeyResponse,
} from '@/api/type/dictionary';

enum Api {
  DICTIONARY = '/api/sys/dictionaryItems',
  DICTIONARY_ITEM_KEY = '/api/sys/item/itemKey',
}

export enum DictionaryEnum {
  SampleUnqualifiedReason = 'sampleUnqualifiedReason',
  PlasmaRelease = 'plasmaRelease',
  SampleType = 'sampleType',
  unProdReason = 'unProdReason',
  PlasmaFailedItem = 'plasmaFailedItem',
  StockPlasmaProcessStatus = 'stockPlasmaProcessStatus',
  ProvinceCode = 'provinceCode',
}
export enum DictionaryItemKeyEnum {
  Accept = 'accept',
  Track = 'track',
  Test = 'test',
  Quarantine = 'quarantine',
  Sample = 'sample',
  Other = 'other',
}
export enum UnqualifiedEnum {
  MissNum = 'bagMiss',
}

export const getSysDictionary = (params: DictionaryEnum[]) =>
  defHttp.post<PostApiSysDictionaryItemsResponse>({ url: Api.DICTIONARY, params });

export const getSysSecondaryDictionary = (params: {
  dataKey: DictionaryEnum;
  dictNos: DictionaryItemKeyEnum[];
}) => defHttp.post<PostApiSysItemItemKeyResponse>({ url: Api.DICTIONARY_ITEM_KEY, params });
