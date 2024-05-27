import { defHttp } from '@/utils/http/axios';
import {
  DeleteApiCoreBankDeliverSamplePickRequest,
  DeleteApiCoreBankDeliverSamplePickResponse,
  DeleteApiCoreBankDeliverSampleProcessDlvNoRequest,
  DeleteApiCoreBankDeliverSampleProcessDlvNoResponse,
  DeleteApiCoreBankDeliverSampleReadyDlvNoRequest,
  DeleteApiCoreBankDeliverSampleReadyDlvNoResponse,
  GetApiCoreBankDeliverSampleDetailBagRequest,
  GetApiCoreBankDeliverSampleDetailBagResponse,
  GetApiCoreBankDeliverSampleDetailRequest,
  GetApiCoreBankDeliverSampleDetailResponse,
  GetApiCoreBankDeliverSamplePickRequest,
  GetApiCoreBankDeliverSamplePickResponse,
  GetApiCoreBankDeliverSampleRequest,
  GetApiCoreBankDeliverSampleResponse,
  GetApiCoreBankDeliverSampleScanRequest,
  GetApiCoreBankDeliverSampleScanResponse,
  GetApiCoreBankDeliverSampleTrayRequest,
  GetApiCoreBankDeliverSampleTrayResponse,
  GetApiCoreBatchSampleAcceptKeepPackBoxesRequest,
  GetApiCoreBatchSampleAcceptKeepPackBoxesResponse,
  GetApiCoreBatchSampleAcceptKeepPackDetailRequest,
  GetApiCoreBatchSampleAcceptKeepPackDetailResponse,
  GetApiCoreBatchSampleAcceptKeepPackPackesRequest,
  GetApiCoreBatchSampleAcceptKeepPackPackesResponse,
  GetApiCoreBatchSampleAcceptKeepPackTraiesRequest,
  GetApiCoreBatchSampleAcceptKeepPackTraiesResponse,
  PostApiCoreBankDeliverSamplePickRequest,
  PostApiCoreBankDeliverSamplePickResponse,
  PostApiCoreBankDeliverSampleRequest,
  PostApiCoreBankDeliverSampleResponse,
  PostApiCoreBankDeliverSampleScanRequest,
  PostApiCoreBankDeliverSampleScanResponse,
  PostApiCoreBatchSampleAcceptKeepPackRequest,
  PostApiCoreBatchSampleAcceptKeepPackResponse,
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
  SAMPLE_ACCEPT = '/api/core/batch/sample/accept/keep-pack',
  SCAN_LIST = '/api/core/bank/deliver/sample/scan',
  KEEP_PACK_OUT_BAND_TRAY_LIST = '/api/core/bank/deliver/sample/tray',
  KEEP_PACK_OUT_BAND_DETAIL = '/api/core/batch/sample/accept/keep-pack/detail',
  TRAY_LIST = '/api/core/batch/sample/accept/keep-pack/traies',
  BOX_DETAIL = '/api/core/batch/sample/accept/keep-pack/boxes',
  BAG_DETAIL = '/api/core/batch/sample/accept/keep-pack/packes',
  DELIVER_DETAIL = '/api/core/bank/deliver/sample/detail-bag',
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

export const getDeliverSampleDetailByBag = (params: GetApiCoreBankDeliverSampleDetailBagRequest) =>
  defHttp.get<GetApiCoreBankDeliverSampleDetailBagResponse>(
    {
      url: Api.DELIVER_DETAIL,
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

export const keepPackAccept = (params: PostApiCoreBatchSampleAcceptKeepPackRequest) =>
  defHttp.post<PostApiCoreBatchSampleAcceptKeepPackResponse>({
    url: Api.SAMPLE_ACCEPT,
    params,
  });

export const keepPackOutBandList = (params: GetApiCoreBankDeliverSampleScanRequest) =>
  defHttp.get<GetApiCoreBankDeliverSampleScanResponse>(
    {
      url: Api.SCAN_LIST,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const keepPackScan = (params: PostApiCoreBankDeliverSampleScanRequest) =>
  defHttp.post<PostApiCoreBankDeliverSampleScanResponse>({
    url: Api.SCAN_LIST,
    params,
  });

export const keepPackOutBandTrayList = (params: GetApiCoreBankDeliverSampleTrayRequest) =>
  defHttp.get<GetApiCoreBankDeliverSampleTrayResponse>(
    {
      url: Api.KEEP_PACK_OUT_BAND_TRAY_LIST,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const keepPackDetail = (params: GetApiCoreBatchSampleAcceptKeepPackDetailRequest) =>
  defHttp.get<GetApiCoreBatchSampleAcceptKeepPackDetailResponse>(
    {
      url: Api.KEEP_PACK_OUT_BAND_DETAIL,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const getTrayList = (params: GetApiCoreBatchSampleAcceptKeepPackTraiesRequest) =>
  defHttp.get<GetApiCoreBatchSampleAcceptKeepPackTraiesResponse>(
    {
      url: Api.TRAY_LIST,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const getBoxDetail = (params: GetApiCoreBatchSampleAcceptKeepPackBoxesRequest) =>
  defHttp.get<GetApiCoreBatchSampleAcceptKeepPackBoxesResponse>(
    {
      url: Api.BOX_DETAIL,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const getBagDetail = (params: GetApiCoreBatchSampleAcceptKeepPackPackesRequest) =>
  defHttp.get<GetApiCoreBatchSampleAcceptKeepPackPackesResponse>(
    {
      url: Api.BAG_DETAIL,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );
