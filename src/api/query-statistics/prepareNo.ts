import { defHttp } from '@/utils/http/axios';

import {
  GetApiProductPrepareOutStoreListRequest,
  GetApiProductPrepareOutStoreListResponse,
} from '@/api/type/queryStatistics';

enum Api {
  Prepare_Query = '/api/product/prepare/out-store/list',
}

export const getPrepareQuery = (params: GetApiProductPrepareOutStoreListRequest) =>
  defHttp.get<GetApiProductPrepareOutStoreListResponse>(
    { url: Api.Prepare_Query, params },
    { joinParamsToUrl: true },
  );
