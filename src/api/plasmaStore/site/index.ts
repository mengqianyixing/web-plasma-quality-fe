/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-20 10:13:00
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-20 10:44:03
 */
import { defHttp } from '@/utils/http/axios';

enum Api {
  SITE_LIST = `/api/core/bank/warehouses`,
  SITE_FORM = '/api/core/bank/warehouse',
  SITE_SWITCH = '/api/core/bank/warehouse-use',
}

export const getSiteList = (data) => defHttp.get({ url: Api.SITE_LIST, data });

export const pushSiteForm = (data) => defHttp.get({ url: Api.SITE_FORM, data });

export const switchSite = (data) => defHttp.get({ url: Api.SITE_SWITCH, data });
