/*
 * @Author: HxB
 * @Date: 2023-12-25 16:00:06
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-03 09:51:57
 * @Description: 首页
 * @FilePath: \psms-fe\src\router\routes\modules\dashboard.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  menuWeight: 99,
  name: 'Dashboard',
  id: 99,
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'bx:bx-home',
    title: '首页',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      id: 9901,
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: '分析看板',
      },
    },
  ],
};

export default dashboard;
