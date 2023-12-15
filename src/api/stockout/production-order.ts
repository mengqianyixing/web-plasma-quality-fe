import { defHttp } from '/@/utils/http/axios';
import {
  GetApiProductOrderOrderNoRequest,
  GetApiProductOrderOrderNoResponse,
  PostApiProductOrderRequest,
  PostApiProductOrdersRequest,
  PostApiProductOrdersResponse,
  PutApiProductOrderCheckOrderNoRequest,
  PutApiProductOrderCheckRequest,
  PutApiProductOrderRequest,
  PutApiProductOrderReviewOrderNoRequest,
  PutApiProductOrderReviewRequest,
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

export const checkProOrder = (params: PutApiProductOrderCheckOrderNoRequest['orderNo']) => {
  return defHttp.put({ url: `${Api.CheckOrder}/${params}` });
};

export const cancelCheckProOrder = (params: PutApiProductOrderCheckRequest) => {
  return defHttp.put({ url: Api.CheckOrder, params });
};

export const reCheckProOrder = (params: PutApiProductOrderReviewOrderNoRequest['orderNo']) => {
  return defHttp.put({ url: `${Api.ReCheckOrder}/${params}` });
};

export const cancelReCheckProOrder = (params: PutApiProductOrderReviewRequest) => {
  return defHttp.put({ url: Api.ReCheckOrder, params });
};
