import { defHttp } from '@/utils/http/axios';
import {
  PostApiCoreBatchSampleUnqualifiedPlasmaRequest,
  PostApiCoreBatchSampleUnqualifiedPlasmaResponse,
} from '@/api/type/batchManage';

enum Api {
  NONCONFORMITY_PLASMA_SAMPLE = '/api/core/batch/sample/unqualified/plasma',
}

export const nonconformityPlasmaReceiveSampleRegister = (
  params: PostApiCoreBatchSampleUnqualifiedPlasmaRequest,
) =>
  defHttp.post<PostApiCoreBatchSampleUnqualifiedPlasmaResponse>({
    url: Api.NONCONFORMITY_PLASMA_SAMPLE,
    params,
  });
