import { defHttp } from '@/utils/http/axios';
import {
  PostApiProductReleaseRequest,
  PostApiProductReleaseResponse,
  GetApiProductReleasePrNoRequest,
  GetApiProductReleasePrNoResponse,
  PutApiProductReleaseReviewPrNoRequest,
  PutApiProductReleaseReviewPrNoResponse,
  PutApiProductReleasePrNoRequest,
  PutApiProductReleasePrNoResponse,
  PutApiProductReleaseCancelRequest,
  PutApiProductReleaseCancelResponse,
  PostApiProductReleasesRequest,
  PostApiProductReleasesResponse,
  GetApiProductReleaseUnqualifiedOrderNoRequest,
  GetApiProductReleaseUnqualifiedOrderNoResponse,
  PutApiProductReleaseRequest,
  PutApiProductReleaseResponse,
  GetApiProductReleaseDetailResponse,
} from '@/api/type/qualityMange';

enum Api {
  LIST = '/api/product/releases',
  FORM = '/api/product/release',
  REVIEW = '/api/product/release/review/',
  RELEASE = '/api/product/release/',
  CANCEL_RELEASE = '/api/product/release/cancel',
  NONCONFORMITY_LIST = '/api/product/release/unqualified/',
  PRESETS = '/api/product/release/detail',
}

export const getListApi = (params: PostApiProductReleasesRequest) =>
  defHttp.post<PostApiProductReleasesResponse>({ url: Api.LIST, params });

export const submitCreateFormApi = (params: PostApiProductReleaseRequest) =>
  defHttp.post<PostApiProductReleaseResponse>({ url: Api.FORM, params });

export const submitUpdateFormApi = (params: PutApiProductReleaseRequest) =>
  defHttp.put<PutApiProductReleaseResponse>({ url: Api.FORM, params });

export const getFormApi = (params: GetApiProductReleasePrNoRequest) =>
  defHttp.get<GetApiProductReleasePrNoResponse>({ url: '/api/product/release/' + params.prNo });

export const submitReleaseApi = (params: PutApiProductReleasePrNoRequest) =>
  defHttp.put<PutApiProductReleasePrNoResponse>({ url: Api.RELEASE + params.prNo });

export const submitCancelReleaseApi = (params: PutApiProductReleaseCancelRequest) =>
  defHttp.put<PutApiProductReleaseCancelResponse>({ url: Api.CANCEL_RELEASE, params });

export const submitReviewApi = (params: PutApiProductReleaseReviewPrNoRequest) =>
  defHttp.put<PutApiProductReleaseReviewPrNoResponse>({ url: Api.REVIEW + params.prNo });

export const getNonconformityListApi = (params: GetApiProductReleaseUnqualifiedOrderNoRequest) =>
  defHttp.get<GetApiProductReleaseUnqualifiedOrderNoResponse>({
    url: Api.NONCONFORMITY_LIST + params.orderNo,
  });

export const getPresetsApi = () =>
  defHttp.get<GetApiProductReleaseDetailResponse>({ url: Api.PRESETS });
