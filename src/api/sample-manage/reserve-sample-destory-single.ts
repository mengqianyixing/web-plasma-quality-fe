import { defHttp } from '@/utils/http/axios';
import {
  DeleteApiCoreBankDeliverSamplePickSingleRequest,
  DeleteApiCoreBankDeliverSamplePickSingleResponse,
  GetApiCoreBankDeliverSampleDetailSingleRequest,
  GetApiCoreBankDeliverSampleDetailSingleResponse,
  GetApiCoreBankDeliverSamplePickSingleRequest,
  GetApiCoreBankDeliverSamplePickSingleResponse,
  GetApiCoreBankDeliverSampleScanSingleRequest,
  GetApiCoreBankDeliverSampleScanSingleResponse,
  GetApiSearchBankSampleTraySingleRequest,
  GetApiSearchBankSampleTraySingleResponse,
  PostApiCoreBankDeliverSamplePickSingleRequest,
  PostApiCoreBankDeliverSamplePickSingleResponse,
  PostApiCoreBankDeliverSampleScanSingleRequest,
  PostApiCoreBankDeliverSampleScanSingleResponse,
} from '@/api/type/sampleManage';

enum Api {
  DELIVER_SAMPLE_DETAIL = '/api/core/bank/deliver/sample/detail-single',
  PICK_SAMPLE_LIST = '/api/core/bank/deliver/sample-pick-single',
  SCAN_LIST = '/api/core/bank/deliver/sample/scan-single',
  KEEP_PACK_OUT_BAND_TRAY_LIST = '/api/search/bank/sample/tray-single',
}

export const getDeliverSampleSingleDetail = (
  params: GetApiCoreBankDeliverSampleDetailSingleRequest,
) =>
  defHttp.get<GetApiCoreBankDeliverSampleDetailSingleResponse>(
    {
      url: Api.DELIVER_SAMPLE_DETAIL,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const getPickSampleSingleList = (params: GetApiCoreBankDeliverSamplePickSingleRequest) =>
  defHttp.get<GetApiCoreBankDeliverSamplePickSingleResponse>({
    url: Api.PICK_SAMPLE_LIST,
    params,
  });

export const deleteDeliverSingleSample = (
  params: DeleteApiCoreBankDeliverSamplePickSingleRequest,
) =>
  defHttp.delete<DeleteApiCoreBankDeliverSamplePickSingleResponse>({
    url: Api.PICK_SAMPLE_LIST,
    params,
  });

export const pickDeliverSingleSample = (params: PostApiCoreBankDeliverSamplePickSingleRequest) =>
  defHttp.post<PostApiCoreBankDeliverSamplePickSingleResponse>({
    url: Api.PICK_SAMPLE_LIST,
    params,
  });

export const keepPackOutBandSingleList = (params: GetApiCoreBankDeliverSampleScanSingleRequest) =>
  defHttp.get<GetApiCoreBankDeliverSampleScanSingleResponse>(
    {
      url: Api.SCAN_LIST,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const keepPackSingleScan = (params: PostApiCoreBankDeliverSampleScanSingleRequest) =>
  defHttp.post<PostApiCoreBankDeliverSampleScanSingleResponse>({
    url: Api.SCAN_LIST,
    params,
  });

export const keepPackOutBandTrayList = (params: GetApiSearchBankSampleTraySingleRequest) =>
  defHttp.get<GetApiSearchBankSampleTraySingleResponse>(
    {
      url: Api.KEEP_PACK_OUT_BAND_TRAY_LIST,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );
