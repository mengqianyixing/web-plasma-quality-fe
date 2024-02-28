import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBatchErpInboundQueryRequest,
  GetApiCoreBatchErpInboundQueryResponse,
  GetApiCoreLabErpTestReportQueryRequest,
  GetApiCoreLabErpTestReportQueryResponse,
} from '@/api/type/queryStatistics';

enum Api {
  ERP_INBOUND = '/api/core/batch/erp/inbound/query',
  ERP_INSPECTION_REPORT = '/api/core/lab/erp/test-report/query',
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
