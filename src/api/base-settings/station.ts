import { defHttp } from '@/utils/http/axios';
import {
  DeleteApiSysStationRequest,
  GetApiSysStationResponse,
  PostApiSysStationRequest,
  PostApiSysStationStationNoRequest,
  PutApiSysStationRequest,
} from '@/api/type/stationManage';

enum Api {
  STATION_RESTFUL = '/api/sys/station',
}

export const getStationList = () =>
  defHttp.get<GetApiSysStationResponse[]>(
    { url: Api.STATION_RESTFUL },
    {
      joinParamsToUrl: true,
    },
  );

export const addStation = (params: PostApiSysStationRequest) =>
  defHttp.post({
    url: Api.STATION_RESTFUL,
    params,
  });

export const editStation = (params: PutApiSysStationRequest) =>
  defHttp.put({ url: Api.STATION_RESTFUL, params });

export const disableStation = (params: DeleteApiSysStationRequest) =>
  defHttp.delete({ url: Api.STATION_RESTFUL, params });

export const enableStation = (params: PostApiSysStationStationNoRequest['stationNo']) =>
  defHttp.post({ url: Api.STATION_RESTFUL + '/' + params });
