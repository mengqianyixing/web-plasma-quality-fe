import { defHttp } from '@/utils/http/axios';
import {
  GetApiSysTagTagNoRequest,
  GetApiSysTagTagNoResponse,
  PostApiSysTagPreviewRequest,
  PostApiSysTagRequest,
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
