import { defHttp } from '@/utils/http/axios';
import {
  GetApiSysTagHisPreviewHisNoRequest,
  GetApiSysTagHisReuseHisNoRequest,
  GetApiSysTagTagNoRequest,
  GetApiSysTagTagNoResponse,
  PostApiSysTagPreviewRequest,
  PostApiSysTagRequest,
  PostApiSysTagsHisRequest,
  PostApiSysTagsHisResponse,
  PostApiSysTagsRequest,
  PostApiSysTagsResponse,
  PutApiSysTagRequest,
  PutApiSysTagResponse,
} from '@/api/type/tagManage';

enum Api {
  TAGS_LIST = '/api/sys/tags',
  TAG_RESTFUL = '/api/sys/tag/',
  ENABLE_STYLE = '/api/sys/tag/enable',
  DISABLE_STYLE = '/api/sys/tag/disable',
  COPY_STYLE = '/api/sys/tag/copy',
  HISTORY_STYLE = '/api/sys/tags/his',
  PREVIEW_HISTORY_STYLE = '/api/sys/tag/his/preview',
  REUSE_STYLE = '/api/sys/tag/his/reuse',
}

export const getTagsList = (params: PostApiSysTagsRequest) =>
  defHttp.post<PostApiSysTagsResponse>({ url: Api.TAGS_LIST, params });

export const getTagDetail = (params: GetApiSysTagTagNoRequest['tagNo']) =>
  defHttp.get<GetApiSysTagTagNoResponse>(
    { url: Api.TAG_RESTFUL, params },
    {
      joinParamsToUrl: true,
    },
  );

export const getStylePreview = (params: PostApiSysTagPreviewRequest) =>
  defHttp.post({ url: Api.TAG_RESTFUL + 'preview', params });

export const editStyle = (params: PutApiSysTagRequest) =>
  defHttp.put<PutApiSysTagResponse>({ url: Api.TAG_RESTFUL.slice(0, -1), params });

export const addStyle = (params: PostApiSysTagRequest) =>
  defHttp.post({ url: Api.TAG_RESTFUL.slice(0, -1), params });

export const enableStyle = (params: string) =>
  defHttp.put({ url: Api.ENABLE_STYLE + '/' + params });

export const disableStyle = (params: string) =>
  defHttp.put({ url: Api.DISABLE_STYLE + '/' + params });

export const copyStyle = (params: string) => defHttp.get({ url: Api.COPY_STYLE + '/' + params });

export const deleteStyle = (params: string) => defHttp.delete({ url: Api.TAG_RESTFUL + params });

export const historyStyle = (params: PostApiSysTagsHisRequest) =>
  defHttp.post<PostApiSysTagsHisResponse>({ url: Api.HISTORY_STYLE, params });

export const historyStylePreview = (params: GetApiSysTagHisPreviewHisNoRequest['hisNo']) =>
  defHttp.get({ url: Api.PREVIEW_HISTORY_STYLE + '/' + params });

export const reuseStyle = (params: GetApiSysTagHisReuseHisNoRequest['hisNo']) =>
  defHttp.get({ url: Api.REUSE_STYLE + '/' + params });
