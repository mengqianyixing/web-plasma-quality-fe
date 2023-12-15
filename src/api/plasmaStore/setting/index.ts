/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-12 13:52:49
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-14 18:01:17
 */
import { defHttp } from '/@/utils/http/axios';
import { List, SettingResp, settingRes, House } from './type';

enum Api {
  SETTING_LIST = `/api/core/bank/warehouses`,
  ADD_HOUSE = '/api/core/bank/warehouse',
  CHECK_HOUSE = '/api/core/bank/warehouse-use',
  AREA_LIST = '/api/core/bank/warehouse/',
  LOCATION_LIST = '/api/core/bank/locations',
  CHECK_LOCATION = '/api/core/bank/location-use',
  // ADD_CAPACITY = '/api/core/bank/warehouse',
}

export const settingListApi = (params: settingRes) =>
  defHttp.get<List<SettingResp>>({ url: Api.SETTING_LIST, params });

export const addHouseApi = (params: House) => defHttp.post<unknown>({ url: Api.ADD_HOUSE, params });

export const checkHouseApi = (data: { houseNo: string; closed: string }) =>
  defHttp.put<unknown>({ url: Api.CHECK_HOUSE, data });

export const areaListApi = ({ houseNo }) => defHttp.get({ url: Api.AREA_LIST + houseNo });

export const locationListApi = (params) => defHttp.get({ url: Api.LOCATION_LIST, params });

export const checkLoactionApi = (data: { locationNo: string; closed: string }) =>
  defHttp.put<unknown>({ url: Api.CHECK_LOCATION, data });

export const addCapacityApi = (data: { houseNo: string; expansion: number }) =>
  defHttp.put<unknown>({ url: Api.ADD_HOUSE, data });
// export const addHouseApi = (params: House) => defHttp.post<unknown>({ url: '', params })
