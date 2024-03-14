import { defHttp } from '@/utils/http/axios';

enum Api {
  NonconformityTrackingList = '/api/core/donor/unqualified/track',
  BlockSource = '/api/sys/enums/BlockSource',
}

export const getNonconformityTrackingList = (params) =>
  defHttp.get({ url: Api.NonconformityTrackingList, params });

export const getBlockSource = (params) => defHttp.get({ url: Api.BlockSource, params });
