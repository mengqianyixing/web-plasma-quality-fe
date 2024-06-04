import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchProdInquiryRequest,
  GetApiSearchProdInquiryResponse,
} from '@/api/type/queryStatistics';

enum Api {
  PRODUCTION_INQUIRY = '/api/search/prod/inquiry',
}

export const getProductionInquiry = (params: GetApiSearchProdInquiryRequest) =>
  defHttp.get<GetApiSearchProdInquiryResponse>({ url: Api.PRODUCTION_INQUIRY, params });
