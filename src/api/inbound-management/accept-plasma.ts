import { defHttp } from '@/utils/http/axios';

enum Api {
  GetPlasmaVerify = '/api/core/batch/plasma/verify',
  GetPlasmaBag = '/api/core/batch/plasma/verify/bag',
  GetPlasmaBox = '/api/core/batch/plasma/verify/box',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  PlasmaVerifyBag = '/api/core/batch/plasma/verify/bag',
}

// 获取血浆验收记录信息
export const getPlasmaVerify = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetPlasmaVerify}/${params}` });
};

// 查询血浆验收袋记录信息
export const getPlasmaBag = (params: any) => {
  return defHttp.get<any>({ url: Api.GetPlasmaBag, params });
};

// 查询血浆验收箱记录信息
export const getPlasmaBox = (params: any) => {
  return defHttp.get<any>({ url: Api.GetPlasmaBox, params });
};

// 血浆验收
export const plasmaVerifyBag = (params: any) => {
  return defHttp.post({ url: Api.PlasmaVerifyBag, params });
};
