import { defHttp } from '@/utils/http/axios';

enum Api {
  GetPlasmaVerify = '/api/core/batch/plasma/verify',
  GetPlasmaBag = '/api/core/batch/plasma/verify/bag',
  GetPlasmaBox = '/api/core/batch/plasma/verify/box',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  PlasmaVerifyBag = '/api/core/batch/plasma/verify/bag',
  PlasmaPauseBox = '/api/core/batch/plasma/verify/box/pause',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  PlasmaPauseBoxList = '/api/core/batch/plasma/verify/pause',
  PlasmaPauseBatch = '/api/core/batch/plasma/verify/batch/pause',
  PlasmaRevokeBag = '/api/core/batch/plasma/verify/revoke/bag',
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

// 血浆验收-暂停/继续箱
export const plasmaPauseBox = (params: any) => {
  return defHttp.post({ url: Api.PlasmaPauseBox, params });
};

// 血浆验收-暂停/继续批
export const plasmaPauseBatch = (params: any) => {
  return defHttp.post({ url: Api.PlasmaPauseBatch, params });
};

// 血浆验收-暂停箱/批列表
// export const plasmaPauseBoxList = (batchNo: any, pattern: any, pauseType = 'ACC') => {
export const plasmaPauseBoxList = (params: any) => {
  return defHttp.get<any>({
    url: `${Api.PlasmaPauseBoxList}/${params.batchNo}/${params.pattern}/${
      params.pauseType || 'ACC'
    }`,
  });
};

// 血浆验收-撤销验收
export const plasmaRevokeBag = (params: any) => {
  return defHttp.post({ url: Api.PlasmaRevokeBag, params });
};
