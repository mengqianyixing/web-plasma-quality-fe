import { defHttp } from '@/utils/http/axios';
import {
  DeleteApiCoreBankDeliverSamplePickRequest,
  DeleteApiCoreBankDeliverSamplePickResponse,
  DeleteApiCoreBankDeliverSampleProcessDlvNoRequest,
  DeleteApiCoreBankDeliverSampleProcessDlvNoResponse,
  DeleteApiCoreBankDeliverSampleReadyDlvNoRequest,
  DeleteApiCoreBankDeliverSampleReadyDlvNoResponse,
  GetApiCoreBankDeliverSampleDetailRequest,
  GetApiCoreBankDeliverSampleDetailResponse,
  GetApiCoreBankDeliverSamplePickRequest,
  GetApiCoreBankDeliverSamplePickResponse,
  GetApiCoreBankDeliverSampleRequest,
  GetApiCoreBankDeliverSampleResponse,
  PostApiCoreBankDeliverSamplePickRequest,
  PostApiCoreBankDeliverSamplePickResponse,
  PostApiCoreBankDeliverSampleRequest,
  PostApiCoreBankDeliverSampleResponse,
  PutApiCoreBankDeliverSampleProcessDlvNoRequest,
  PutApiCoreBankDeliverSampleProcessDlvNoResponse,
  PutApiCoreBankDeliverSampleReadyDlvNoRequest,
  PutApiCoreBankDeliverSampleReadyDlvNoResponse,
} from '@/api/type/sampleManage';

enum Api {
  RESERVE_SAMPLE_DESTROY_LIST = '/api/core/bank/deliver/sample',
  DELIVER_SAMPLE_DETAIL = '/api/core/bank/deliver/sample/detail',
  PICK_SAMPLE_LIST = '/api/core/bank/deliver/sample-pick',
  SUBMIT_APPLICATION = '/api/core/bank/deliver/sample/ready',
  CHECK_APPLICATION = '/api/core/bank/deliver/sample/process',
}

export const getReserveSampleList = (params: GetApiCoreBankDeliverSampleRequest) =>
  defHttp.get<GetApiCoreBankDeliverSampleResponse>({
    url: Api.RESERVE_SAMPLE_DESTROY_LIST,
    params,
  });

export const saveDeliverSample = (params: PostApiCoreBankDeliverSampleRequest) =>
  defHttp.post<PostApiCoreBankDeliverSampleResponse>({
    url: Api.RESERVE_SAMPLE_DESTROY_LIST,
    params,
  });

export const getDeliverSampleDetail = (params: GetApiCoreBankDeliverSampleDetailRequest) =>
  defHttp.get<GetApiCoreBankDeliverSampleDetailResponse>(
    {
      url: Api.DELIVER_SAMPLE_DETAIL,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const getPickSampleList = (params: GetApiCoreBankDeliverSamplePickRequest) =>
  defHttp.get<GetApiCoreBankDeliverSamplePickResponse>({
    url: Api.PICK_SAMPLE_LIST,
    params,
  });

export const deleteDeliverSample = (params: DeleteApiCoreBankDeliverSamplePickRequest) =>
  defHttp.delete<DeleteApiCoreBankDeliverSamplePickResponse>({
    url: Api.PICK_SAMPLE_LIST,
    params,
  });

export const pickDeliverSample = (params: PostApiCoreBankDeliverSamplePickRequest) =>
  defHttp.post<PostApiCoreBankDeliverSamplePickResponse>({
    url: Api.PICK_SAMPLE_LIST,
    params,
  });

export const submitApplication = (params: PutApiCoreBankDeliverSampleReadyDlvNoRequest['dlvNo']) =>
  defHttp.put<PutApiCoreBankDeliverSampleReadyDlvNoResponse>({
    url: Api.SUBMIT_APPLICATION + '/' + params,
  });

export const cancelApplication = (
  params: DeleteApiCoreBankDeliverSampleReadyDlvNoRequest['dlvNo'],
) =>
  defHttp.delete<DeleteApiCoreBankDeliverSampleReadyDlvNoResponse>({
    url: Api.SUBMIT_APPLICATION + '/' + params,
  });

export const checkApplication = (params: PutApiCoreBankDeliverSampleProcessDlvNoRequest['dlvNo']) =>
  defHttp.put<PutApiCoreBankDeliverSampleProcessDlvNoResponse>({
    url: Api.CHECK_APPLICATION + '/' + params,
  });

export const cancelCheckApplication = (
  params: DeleteApiCoreBankDeliverSampleProcessDlvNoRequest['dlvNo'],
) =>
  defHttp.delete<DeleteApiCoreBankDeliverSampleProcessDlvNoResponse>({
    url: Api.CHECK_APPLICATION + '/' + params,
  });
