import { defHttp } from '@/utils/http/axios';

enum Api {
  GetAccepts = '/api/core/batch/plasma/accept',
  GetBatchSummary = '/api/core/batch/summary',
  AcceptPlasma = '/api/core/batch/plasma/accept/box',
  CommitAcceptation = '/api/core/batch/commit/acceptation',
  GetAcceptationList = '/api/core/batch/acceptation',
}

// 获取血浆接收详情
export const getAccepts = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetAccepts}/${params}` });
};

// 获取批次列表
export const getBatchSummary = (params: any) => {
  return defHttp.get<any>({ url: Api.GetBatchSummary, params });
};

// 血浆接收
export const acceptPlasma = (params: any) => {
  return defHttp.post({ url: Api.AcceptPlasma, params });
};

// 血浆接收-提交申请单
export const commitAcceptation = (params: any) => {
  return defHttp.put<any>({ url: `${Api.CommitAcceptation}/${params}` });
};

// 血浆接收-获取申请单列表
export const getAcceptationList = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetAcceptationList}/${params}` });
};
