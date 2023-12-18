/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-12 13:52:49
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-14 18:01:17
 */
import { defHttp } from '/@/utils/http/axios';
import {
  GetApiCoreBankLocationsRequest,
  GetApiCoreBankLocationsResponse,
  GetApiCoreBankWarehousesRequest,
  GetApiCoreBankWarehousesResponse,
  PostApiCoreBankWarehouseRequest,
  PostApiCoreBankWarehouseResponse,
  PutApiCoreBankLocationUseRequest,
  PutApiCoreBankLocationUseResponse,
  PutApiCoreBankWarehouseRequest,
  PutApiCoreBankWarehouseResponse,
  PutApiCoreBankWarehouseUseRequest,
  PutApiCoreBankWarehouseUseResponse,
} from '@/api/type/plasmaStoreManage';

enum Api {
  SETTING_LIST = `/api/core/bank/warehouses`,
  ADD_HOUSE = '/api/core/bank/warehouse',
  CHECK_HOUSE = '/api/core/bank/warehouse-use',
  AREA_LIST = '/api/core/bank/warehouse/',
  LOCATION_LIST = '/api/core/bank/locations',
  CHECK_LOCATION = '/api/core/bank/location-use',
  // ADD_CAPACITY = '/api/core/bank/warehouse',

  INVENTORY_DETAIL = ' /api/core/bank/stock',
}

export const settingListApi = (params: GetApiCoreBankWarehousesRequest) =>
  defHttp.get<GetApiCoreBankWarehousesResponse>({ url: Api.SETTING_LIST, params });

export const addHouseApi = (params: PostApiCoreBankWarehouseRequest) =>
  defHttp.post<PostApiCoreBankWarehouseResponse>({ url: Api.ADD_HOUSE, params });

export const checkHouseApi = (data: PutApiCoreBankWarehouseUseRequest) =>
  defHttp.put<PutApiCoreBankWarehouseUseResponse>({ url: Api.CHECK_HOUSE, data });

export const areaListApi = ({ houseNo }) => defHttp.get({ url: Api.AREA_LIST + houseNo });

export const locationListApi = (params: GetApiCoreBankLocationsRequest) =>
  defHttp.get<GetApiCoreBankLocationsResponse>({ url: Api.LOCATION_LIST, params });

export const checkLoactionApi = (data: PutApiCoreBankLocationUseRequest) =>
  defHttp.put<PutApiCoreBankLocationUseResponse>({ url: Api.CHECK_LOCATION, data });

export const addCapacityApi = (data: PutApiCoreBankWarehouseRequest) =>
  defHttp.put<PutApiCoreBankWarehouseResponse>({ url: Api.ADD_HOUSE, data });
