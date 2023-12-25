import { defHttp } from '@/utils/http/axios';
import { PostApiCoreBagUnqualifiedRequest } from '@/api/type/nonconformityManage';

enum Api {
  NonconformityRegistration = '/api/core/bag/unqualified',
}

export const nonconformityRegistration = (params: PostApiCoreBagUnqualifiedRequest) => {
  return defHttp.post({
    url: Api.NonconformityRegistration,
    params,
  });
};
