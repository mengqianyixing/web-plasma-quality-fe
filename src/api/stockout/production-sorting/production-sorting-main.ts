import { defHttp } from '@/utils/http/axios';
import {
  GetApiProductPrepareSortingBatchInfoRequest,
  GetApiProductPrepareSortingBatchInfoResponse,
  GetApiProductPrepareSortingBoxsRequest,
  GetApiProductPrepareSortingBoxsResponse,
  GetApiProductPrepareSortingBoxBoxNoRequest,
  GetApiProductPrepareSortingBoxBoxNoResponse,
  PutApiProductPrepareSortingBoxCheckRequest,
  PutApiProductPrepareSortingBoxCheckResponse,
  GetApiProductPrepareSortingBatchPrepareNoRequest,
  GetApiProductPrepareSortingBatchPrepareNoResponse,
  GetApiProductPrepareSortingPrepareNoRequest,
  GetApiProductPrepareSortingPrepareNoResponse,
  PostApiProductPrepareSortingBagRequest,
  PostApiProductPrepareSortingBagResponse,
  PostApiProductPrepareSortingMouldAssemblingRequest,
  PostApiProductPrepareSortingMouldAssemblingResponse,
  PostApiProductPrepareSortingBoxSealingRequest,
  PostApiProductPrepareSortingBoxSealingResponse,
  PostApiProductPrepareSortingAllQuaBoxRequest,
  PostApiProductPrepareSortingAllQuaBoxResponse,
  PostApiProductPrepareCommitSortingPrepareNoRequest,
  PostApiProductPrepareCommitSortingPrepareNoResponse,
} from '@/api/type/productionSortingMangeMain';

enum Api {
  GET_BATCH_INFO = '/api/product/prepare/sorting/batch',
  GET_SORT_BOXS = '/api/product/prepare/sorting/boxs',
  GET_SORT_BOXS_LIST = '/api/product/prepare/sorting/box',
  CHECK_BOX = '/api/product/prepare/sorting/box/check',
  GET_PREPARE_SORTING = '/api/product/prepare/sorting',
  GET_SORT_BAGS = '/api/product/prepare/sorting/bags',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  GET_SORTING_BATCH = '/api/product/prepare/sorting/batch',
  PICK_SORTING_BAG = '/api/product/prepare/sorting/bag',
  SORTING_MOULD_ASSEMBLING = '/api/product/prepare/sorting/mould-assembling',
  SORTING_BOX_SEALING = '/api/product/prepare/sorting/box-sealing',
  SORTING_ALL_QUA = '/api/product/prepare/sorting/all-qua/box',
  COMPLETE_SORTING = '/api/product/prepare/commit/sorting',
}

// 分拣批次信息
export const getBatchInfo = (params: GetApiProductPrepareSortingBatchInfoRequest) => {
  return defHttp.get<GetApiProductPrepareSortingBatchInfoResponse>({
    url: Api.GET_BATCH_INFO,
    params,
  });
};

// 获取分拣装箱信息列表
export const getSortBoxs = (params: GetApiProductPrepareSortingBoxsRequest) => {
  return defHttp.get<GetApiProductPrepareSortingBoxsResponse>({ url: Api.GET_SORT_BOXS, params });
};

// 获取分拣装箱核对袋信息列表
export const getSortBoxsList = (params: GetApiProductPrepareSortingBoxBoxNoRequest) => {
  return defHttp.get<GetApiProductPrepareSortingBoxBoxNoResponse>({
    url: `${Api.GET_SORT_BOXS_LIST}/${params.boxNo}`,
  });
};

// 装箱核对
export const checkBox = (params: PutApiProductPrepareSortingBoxCheckRequest) => {
  return defHttp.put<PutApiProductPrepareSortingBoxCheckResponse>({
    url: Api.CHECK_BOX,
    params,
  });
};

// 获取血浆分拣信息总览
export const getPrepareSorting = (params: GetApiProductPrepareSortingPrepareNoRequest) => {
  return defHttp.get<GetApiProductPrepareSortingPrepareNoResponse>({
    url: `${Api.GET_PREPARE_SORTING}/${params.prepareNo}`,
  });
};

// 获取血浆明细列表
export const getSortBags = (params: any) => {
  return defHttp.get<any>({ url: Api.GET_SORT_BAGS, params });
};

// 查询准备号内的批次号
export const getSortingBatch = (params: GetApiProductPrepareSortingBatchPrepareNoRequest) => {
  return defHttp.get<GetApiProductPrepareSortingBatchPrepareNoResponse>({
    url: `${Api.GET_SORTING_BATCH}/${params.prepareNo}`,
  });
};

// 血浆分拣
export const pickSortingBag = (params: PostApiProductPrepareSortingBagRequest) => {
  return defHttp.post<PostApiProductPrepareSortingBagResponse>(
    {
      url: Api.PICK_SORTING_BAG,
      params,
    },
    { isReturnNativeResponse: true },
  );
};

// 血浆分拣-合箱
export const sortingMouldAssembling = (
  params: PostApiProductPrepareSortingMouldAssemblingRequest,
) => {
  return defHttp.post<PostApiProductPrepareSortingMouldAssemblingResponse>({
    url: Api.SORTING_MOULD_ASSEMBLING,
    params,
  });
};

// 血浆分拣-封箱
export const sortingBoxSealing = (params: PostApiProductPrepareSortingBoxSealingRequest) => {
  return defHttp.post<PostApiProductPrepareSortingBoxSealingResponse>({
    url: Api.SORTING_BOX_SEALING,
    params,
  });
};

// 血浆分拣-整箱合格分拣
export const sortingAllQua = (params: PostApiProductPrepareSortingAllQuaBoxRequest) => {
  return defHttp.post<PostApiProductPrepareSortingAllQuaBoxResponse>({
    url: Api.SORTING_ALL_QUA,
    params,
  });
};

// 血浆分拣-完成分拣
export const completeSorting = (params: PostApiProductPrepareCommitSortingPrepareNoRequest) => {
  return defHttp.post<PostApiProductPrepareCommitSortingPrepareNoResponse>({
    url: `${Api.COMPLETE_SORTING}/${params.prepareNo}`,
  });
};
