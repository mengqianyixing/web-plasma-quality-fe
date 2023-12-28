import { defHttp, printHttp } from '@/utils/http/axios';
import {
  GetApiSysPrintingRecordCreatorsResponse,
  GetApiSysPrintingRecordPreviewPrtNoRequest,
  PostApiSysPrintingRecordsRequest,
  PostApiSysPrintingRecordsResponse,
  PutApiSysPrintingRecordPrtNoReasonRequest,
  PutApiSysPrintingRecordPrtNoReasonResponse,
} from '@/api/type/printRecordManage';

enum Api {
  PRINT_RECORD = '/api/sys/printingRecords',
  RESTFUL_PRINT_RECORD = '/api/sys/printingRecord',
  GET_PRINTER = '/api/sys/printingRecord/creators',
}

export const getPrintRecords = (params: PostApiSysPrintingRecordsRequest) =>
  defHttp.post<PostApiSysPrintingRecordsResponse>({ url: Api.PRINT_RECORD, params });

export const previewPrintRecord = (params: GetApiSysPrintingRecordPreviewPrtNoRequest['prtNo']) =>
  defHttp.get({ url: Api.RESTFUL_PRINT_RECORD + '/preview/' + params });

export const replayPrintRecord = (params: PutApiSysPrintingRecordPrtNoReasonRequest) =>
  defHttp.put<PutApiSysPrintingRecordPrtNoReasonResponse>({
    url: Api.RESTFUL_PRINT_RECORD,
    params,
  });

export const getPrinter = () =>
  defHttp.get<GetApiSysPrintingRecordCreatorsResponse>({ url: Api.GET_PRINTER });

export const printRecord = (params) =>
  printHttp.post({ url: '/printer/print/direct/label', params });