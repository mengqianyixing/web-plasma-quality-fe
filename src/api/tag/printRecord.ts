import { defHttp, printHttp } from '@/utils/http/axios';
import {
  GetApiSysPrintingRecordCreatorsResponse,
  GetApiSysPrintingRecordPreviewPrtNoRequest,
  PostApiSysPrintingRecordsRequest,
  PostApiSysPrintingRecordsResponse,
  PutApiSysPrintingRecordRequest,
  PutApiSysPrintingRecordResponse,
} from '@/api/type/printRecordManage';
import { PostApiSysTagPrintRequest } from '@/api/type/tagManage';

enum Api {
  PRINT_RECORDS = '/api/sys/printingRecords',
  PRINT_RECORD = '/api/sys/tag/print',
  RESTFUL_PRINT_RECORD = '/api/sys/printingRecord',
  GET_PRINTER = '/api/sys/printingRecord/creators',
}

export const getPrintRecords = (params: PostApiSysPrintingRecordsRequest) =>
  defHttp.post<PostApiSysPrintingRecordsResponse>({ url: Api.PRINT_RECORDS, params });

export const getPrintRecord = (params: PostApiSysTagPrintRequest) =>
  defHttp.post({ url: Api.PRINT_RECORD, params });

export const previewPrintRecord = (params: GetApiSysPrintingRecordPreviewPrtNoRequest['prtNo']) =>
  defHttp.get({ url: Api.RESTFUL_PRINT_RECORD + '/preview/' + params });

export const replayPrintRecord = (params: PutApiSysPrintingRecordRequest) =>
  defHttp.put<PutApiSysPrintingRecordResponse>({
    url: Api.RESTFUL_PRINT_RECORD,
    params,
  });

export const getPrinter = () =>
  defHttp.get<GetApiSysPrintingRecordCreatorsResponse>({ url: Api.GET_PRINTER });

export const printRecord = (params) =>
  printHttp.post({ url: '/printer/print/direct/label', params });
