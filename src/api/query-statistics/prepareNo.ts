import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchProdPrepareRequest,
  GetApiSearchProdPrepareResponse,
} from '@/api/type/queryStatistics';

enum Api {
  Prepare_Query = '/api/search/prod/prepare',
}

export const getPrepareQuery = (params: GetApiSearchProdPrepareRequest) =>
  defHttp.get<GetApiSearchProdPrepareResponse>(
    { url: Api.Prepare_Query, params },
    { joinParamsToUrl: true },
  );
