import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBankErpOutDetailRequest,
  GetApiCoreBankErpOutDetailResponse,
  GetApiCoreBankErpOutNonProdRequest,
  GetApiCoreBankErpOutNonProdResponse,
  GetApiCoreBatchErpInboundQueryRequest,
  GetApiCoreBatchErpInboundQueryResponse,
  GetApiCoreLabErpTestReportQueryRequest,
  GetApiCoreLabErpTestReportQueryResponse,
  GetApiProductPrepareErpOutProdRequest,
  GetApiProductPrepareErpOutProdResponse,
} from '@/api/type/queryStatistics';

enum Api {
  ERP_INBOUND = '/api/core/batch/erp/inbound/query',
  ERP_INSPECTION_REPORT = '/api/core/lab/erp/test-report/query',
  ERP_OUT_PROD = '/api/product/prepare/erp-out/prod',
  ERP_OUT_NOT_PROD = '/api/core/bank/erp-out/non-prod',
  ERP_OUT_DETAIL = '/api/core/bank/erp-out/detail',
}

export const getERPInboundList = (params: GetApiCoreBatchErpInboundQueryRequest) =>
  defHttp.get<GetApiCoreBatchErpInboundQueryResponse>(
    { url: Api.ERP_INBOUND, params },
    { joinParamsToUrl: true },
  );

export const getERPInspectionReportList = (params: GetApiCoreLabErpTestReportQueryRequest) =>
  defHttp.get<GetApiCoreLabErpTestReportQueryResponse>(
    { url: Api.ERP_INSPECTION_REPORT, params },
    { joinParamsToUrl: true },
  );

export const getERPOutProdList = (params: GetApiProductPrepareErpOutProdRequest) =>
  defHttp.get<GetApiProductPrepareErpOutProdResponse>(
    {
      url: Api.ERP_OUT_PROD,
      params,
    },
    { joinParamsToUrl: true },
  );

export const getERPOutNotProdList = (params: GetApiCoreBankErpOutNonProdRequest) =>
  defHttp.get<GetApiCoreBankErpOutNonProdResponse>(
    {
      url: Api.ERP_OUT_NOT_PROD,
      params,
    },
    { joinParamsToUrl: true },
  );

export const getERPOutDetail = (params: GetApiCoreBankErpOutDetailRequest) =>
  defHttp.get<GetApiCoreBankErpOutDetailResponse>(
    {
      url: Api.ERP_OUT_DETAIL,
      params,
    },
    { joinParamsToUrl: true },
  );
