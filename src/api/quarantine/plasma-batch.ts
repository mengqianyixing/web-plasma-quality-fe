import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreBatchPlasmaReleasesRequest,
  GetApiCoreBatchPlasmaReleasesResponse,
  GetApiCoreBatchPlasmaUnReleasesRequest,
  GetApiCoreBatchPlasmaUnReleasesResponse,
  PostApiCoreBatchPlasmaReleaseRequest,
  PutApiCoreBatchPlasmaReleaseRequest,
} from '@/api/type/batchManage';

import {
  GetApiCoreBatchPlasmaReleaseBagsRequest,
  GetApiCoreBatchPlasmaReleaseBagsResponse,
} from '@/api/type/qualityMange';

export const getPlasmaBatchUnReleases = (params?: GetApiCoreBatchPlasmaUnReleasesRequest) =>
  defHttp.get<GetApiCoreBatchPlasmaUnReleasesResponse>(
    { url: '/api/core/batch/plasma/un-releases', params },
    {
      joinParamsToUrl: true,
    },
  );

export const getPlasmaBatchReleases = (params?: GetApiCoreBatchPlasmaReleasesRequest) =>
  defHttp.get<GetApiCoreBatchPlasmaReleasesResponse>(
    { url: '/api/core/batch/plasma/releases', params },
    {
      joinParamsToUrl: true,
    },
  );

export const getPlasmaBatchReleaseBags = (params?: GetApiCoreBatchPlasmaReleaseBagsRequest) =>
  defHttp.get<GetApiCoreBatchPlasmaReleaseBagsResponse>(
    { url: '/api/core/batch/plasma/release/bags', params },
    {
      joinParamsToUrl: true,
    },
  );

export const addPlasmaBatchRelease = (data: PostApiCoreBatchPlasmaReleaseRequest) =>
  defHttp.post({ url: '/api/core/batch/plasma/release', data });

export const setPlasmaBatchRelease = (params: PutApiCoreBatchPlasmaReleaseRequest) =>
  defHttp.put({ url: '/api/core/batch/plasma/release', params });
