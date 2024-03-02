import { defHttp } from '@/utils/http/axios';

import {
  PostApiProductInquiryRequest,
  PostApiProductInquiryResponse,
} from '@/api/type/queryStatistics';

enum Api {
  PRODUCTION_INQUIRY = '/api/product/inquiry',
}

export const getProductionInquiry = (params: PostApiProductInquiryRequest) =>
  defHttp.post<PostApiProductInquiryResponse>({ url: Api.PRODUCTION_INQUIRY, params });
