/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-30 10:13:31
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-30 11:44:36
 */
import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBagPlasmaExpiredRequest,
  GetApiCoreBagPlasmaExpiredResponse,
  PostApiCoreBagPlasmaExpiredRequest,
  PostApiCoreBagPlasmaExpiredResponse,
} from '@/api/type/quarantineMange';

export const getListApi = (params: GetApiCoreBagPlasmaExpiredRequest) =>
  defHttp.get<GetApiCoreBagPlasmaExpiredResponse>({ url: '/api/core/bag/plasma/expired', params });

export const submitConfirmApi = (data: PostApiCoreBagPlasmaExpiredRequest) =>
  defHttp.post<PostApiCoreBagPlasmaExpiredResponse>({
    url: '/api/core/bag/plasma/expired',
    data,
  });
