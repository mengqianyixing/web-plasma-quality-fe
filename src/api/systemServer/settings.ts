import { defHttp } from '@/utils/http/axios';
import { PostApiSysCasdoorApplicationConfigRequest } from '@/api/type/systemSettings';

enum Api {
  Casdoor_Application = '/api/sys/casdoor/application/config',
}

export const getCasdoorApplicationConfig = () => defHttp.get({ url: Api.Casdoor_Application });

export const setCasdoorApplication = (params?: PostApiSysCasdoorApplicationConfigRequest) =>
  defHttp.post({ url: Api.Casdoor_Application, params });
