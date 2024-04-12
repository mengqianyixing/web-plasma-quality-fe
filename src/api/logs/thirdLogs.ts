import { defHttp } from '@/utils/http/axios';
import { GetApiConnectLogsRequest, GetApiConnectLogsResponse } from '@/api/type/dockingLogManage';

enum Api {
  Conn_Logs = '/api/connect/logs',
}

export const getThirdLogsList = (params: GetApiConnectLogsRequest) =>
  defHttp.get<GetApiConnectLogsResponse>(
    { url: Api.Conn_Logs, params },
    {
      joinParamsToUrl: true,
    },
  );
