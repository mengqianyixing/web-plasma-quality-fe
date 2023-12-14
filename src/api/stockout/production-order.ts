import { defHttp } from '/@/utils/http/axios';
import {
  DeleteApiProductOrderCheckOrderNoRequest,
  DeleteApiProductOrderReviewOrderNoRequest,
  GetApiProductOrderOrderNoRequest,
  GetApiProductOrderOrderNoResponse,
  PostApiProductOrderCheckRequest,
  PostApiProductOrderRequest,
  PostApiProductOrderReviewRequest,
  PostApiProductOrdersRequest,
  PostApiProductOrdersResponse,
  PutApiProductOrderRequest,
} from '@/api/type/productionOrder';

enum Api {
  GetOrders = '/api/product/orders',
  AddOrder = '/api/product/order',
  CheckOrder = '/api/product/order/check',
  ReCheckOrder = '/api/product/order/review',
}

export const getProOrders = (params: PostApiProductOrdersRequest) => {
  return defHttp.post<PostApiProductOrdersResponse>({
    url: Api.GetOrders,
    params,
  });
};

export const addProOrder = (params: PostApiProductOrderRequest) => {
  return defHttp.post({ url: Api.AddOrder, params });
};

export const editProOrder = (params: PutApiProductOrderRequest) => {
  return defHttp.put({ url: Api.AddOrder, params });
};

export const getProOrderDetail = (params: GetApiProductOrderOrderNoRequest['orderNo']) => {
  return defHttp.get<GetApiProductOrderOrderNoResponse>({ url: `${Api.AddOrder}/${params}` });
};

export const delProOrder = (params: GetApiProductOrderOrderNoRequest['orderNo']) => {
  return defHttp.delete({ url: `${Api.AddOrder}/${params}` });
};

export const checkProOrder = (params: PostApiProductOrderCheckRequest) => {
  return defHttp.post({ url: Api.CheckOrder, params });
};

export const cancelCheckProOrder = (
  params: DeleteApiProductOrderCheckOrderNoRequest['orderNo'],
) => {
  return defHttp.delete({ url: `${Api.CheckOrder}/${params}` });
};

export const reCheckProOrder = (params: PostApiProductOrderReviewRequest) => {
  return defHttp.post({ url: Api.ReCheckOrder, params });
};

export const cancelReCheckProOrder = (
  params: DeleteApiProductOrderReviewOrderNoRequest['orderNo'],
) => {
  return defHttp.delete({ url: `${Api.ReCheckOrder}/${params}` });
};
