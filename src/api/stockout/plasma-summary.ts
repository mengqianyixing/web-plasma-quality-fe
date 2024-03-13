/*
 * @Author: chiyifan chiyf@stpass.com
 * @Date: 2024-03-11 14:20:37
 * @LastEditors: chiyifan chiyf@stpass.com
 * @LastEditTime: 2024-03-12 20:01:42
 * @FilePath: \psms-fe\src\api\stockout\plasma-summary.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '@/utils/http/axios';

import {
  GetApiReportPlasmaSummaryRequest,
  GetApiReportPlasmaSummaryResponse,
} from '@/api/type/queryStatistics';

enum Api {
  PLASMA_SUMMARY = `/api/report/plasma/summary`,
}

export const getPlasmaSummary = (params: GetApiReportPlasmaSummaryRequest) =>
  defHttp.get<GetApiReportPlasmaSummaryResponse>({
    url: Api.PLASMA_SUMMARY,
    params: params,
  });