import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreLabReportsRequest,
  PostApiCoreLabReportsResponse,
  PostApiCoreLabReportMadeReportNoRequest,
  PostApiCoreLabReportMadeReportNoResponse,
  PutApiCoreLabReportMadeRevokeRequest,
  PutApiCoreLabReportMadeRevokeResponse,
  PutApiCoreLabReportReviewReportNoRequest,
  PutApiCoreLabReportReviewReportNoResponse,
  PutApiCoreLabReportReviewRevokeRequest,
  PutApiCoreLabReportReviewRevokeResponse,
  PutApiCoreLabReportReviewReleaseReportNoRequest,
  PutApiCoreLabReportReviewReleaseReportNoResponse,
  PostApiCoreLabReportUnqualifiedRequest,
  PostApiCoreLabReportUnqualifiedResponse,
} from '@/api/type/inspectManage';

enum Api {
  LIST = `/api/core/lab/reports`,
  CREATE_REPORT = '/api/core/lab/report/made/',
  REVOKE_REPORT = '/api/core/lab/report/made/revoke',
  PROCESS_REPROT = '/api/core/lab/report/review/',
  PROCESS_REVOKE = '/api/core/lab/report/review/revoke',
  RELEASE_REPORT = '/api/core/lab/report/review/release/',
  UNQUALIFIED_LIST = '/api/core/lab/report/unqualified',
}

export const getUnqualifiedApi = (data: PostApiCoreLabReportUnqualifiedRequest) =>
  defHttp.post<PostApiCoreLabReportUnqualifiedResponse>({
    url: Api.UNQUALIFIED_LIST,
    data,
  });

export const getListApi = (data: PostApiCoreLabReportsRequest) =>
  defHttp.post<PostApiCoreLabReportsResponse>({
    url: Api.LIST,
    data,
  });

export const createReportApi = ({ reportNo }: PostApiCoreLabReportMadeReportNoRequest) =>
  defHttp.post<PostApiCoreLabReportMadeReportNoResponse>({ url: Api.CREATE_REPORT + reportNo });

export const revokeReportApi = (data: PutApiCoreLabReportMadeRevokeRequest) =>
  defHttp.put<PutApiCoreLabReportMadeRevokeResponse>({ url: Api.REVOKE_REPORT, data });

export const processReportApi = ({ reportNo }: PutApiCoreLabReportReviewReportNoRequest) =>
  defHttp.put<PutApiCoreLabReportReviewReportNoResponse>({ url: Api.PROCESS_REPROT + reportNo });

export const precessRevokeApi = (data: PutApiCoreLabReportReviewRevokeRequest) =>
  defHttp.put<PutApiCoreLabReportReviewRevokeResponse>({ url: Api.PROCESS_REVOKE, data });

export const releaseReportApi = ({ reportNo }: PutApiCoreLabReportReviewReleaseReportNoRequest) =>
  defHttp.put<PutApiCoreLabReportReviewReleaseReportNoResponse>({
    url: Api.RELEASE_REPORT + reportNo,
  });
