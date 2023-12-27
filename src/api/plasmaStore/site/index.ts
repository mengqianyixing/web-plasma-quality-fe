/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-20 10:13:00
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-23 16:41:08
 */
import { defHttp } from '@/utils/http/axios';
import {
  PostApiCoreBankSitesRequest,
  PostApiCoreBankSitesResponse,
  PostApiCoreBankSiteRequest,
  PostApiCoreBankSiteResponse,
  PutApiCoreBankSiteRequest,
  PutApiCoreBankSiteResponse,
  GetApiCoreBankSiteSiteNoRequest,
  GetApiCoreBankSiteSiteNoResponse,
  GetApiCoreBankSiteHouseHouseNoRequest,
  GetApiCoreBankSiteHouseHouseNoResponse,
} from '@/api/type/plasmaStoreManage';

enum Api {
  LIST = `/api/core/bank/sites`,
  FORM = '/api/core/bank/site',
  FORM_DT = '/api/core/bank/site/',
  HOUSE_SITE = '/api/core/bank/site/house/',
}

export const getListApi = (data: PostApiCoreBankSitesRequest) =>
  defHttp.post<PostApiCoreBankSitesResponse>({ url: Api.LIST, data });

export const addSiteApi = (data: PostApiCoreBankSiteRequest) =>
  defHttp.post<PostApiCoreBankSiteResponse>({ url: Api.FORM, data });

export const updateSiteApi = (data: PutApiCoreBankSiteRequest) =>
  defHttp.put<PutApiCoreBankSiteResponse>({ url: Api.FORM, data });

export const getSiteDtApi = ({ siteNo }: GetApiCoreBankSiteSiteNoRequest) =>
  defHttp.get<GetApiCoreBankSiteSiteNoResponse>({ url: Api.FORM_DT + siteNo });

export const getHouseSiteApi = ({ houseNo }: GetApiCoreBankSiteHouseHouseNoRequest) =>
  defHttp.get<GetApiCoreBankSiteHouseHouseNoResponse>({ url: Api.HOUSE_SITE + houseNo });
