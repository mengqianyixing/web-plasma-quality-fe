import { defHttp } from '@/utils/http/axios';
import { GetApiSysEnumsResponse } from '@/api/type/systemParamsManage';

enum Api {
  ENUMS = '/api/sys/enums',
}

/**
 * @description: Get user menu based on id
 */

export const getServerEnumsApi = () => {
  return defHttp.get<GetApiSysEnumsResponse>({
    url: Api.ENUMS,
  });
};
