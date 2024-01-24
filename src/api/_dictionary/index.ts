/*
 * @Author: HxB
 * @Date: 2024-01-08 10:30:41
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-24 14:53:35
 * @Description: 字典
 * @FilePath: \psms-fe\src\api\_dictionary\index.ts
 */
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
  unProdReason = 'unProdReason',
}

export const getSysDictionary = (params: DictionaryEnum[]) =>
  defHttp.post<PostApiSysDictionaryItemsResponse>({ url: Api.DICTIONARY, params });
