/*
 * @Author: HxB
 * @Date: 2023-12-29 16:47:29
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-26 14:00:59
 * @Description: 检疫管理
 * @FilePath: \psms-fe\src\router\routes\modules\QuarantineManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const quarantineManager: AppRouteModule = {
  path: '/quarantine',
  name: 'Quarantine',
  id: 88,
  menuWeight: 91,
  component: LAYOUT,
  meta: {
    title: '检疫管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: '/quarantine/plasma-batch',
      name: 'PlasmaBatch',
      id: 8801,
      meta: {
        title: '血浆批检疫期报告',
      },
      component: () => import('/@/views/quarantine/plasma-batch/index.vue'),
    },
    {
      path: '/quarantine/computed',
      name: 'computed',
      id: 8802,
      meta: { title: '检疫期计算' },
      component: () => import('/@/views/quarantine/computed/index.vue'),
    },
    {
      path: '/quarantine/overdue-confirmation',
      name: 'OverdueConfirmation',
      id: 8803,
      meta: { title: '超一年期确认' },
      component: () => import('/@/views/quarantine/overdue-confirmation/index.vue'),
    },
  ],
};

export default quarantineManager;
