/*
 * @Author: HxB
 * @Date: 2023-12-29 16:47:29
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:32:23
 * @Description: 检疫管理
 * @FilePath: \psms-fe\src\router\routes\modules\QuarantineManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';
import { QuarantineButtonEnum } from '@/enums/authCodeEnum';

import { LAYOUT } from '@/router/constant';

const quarantineManager: AppRouteModule = {
  path: '/quarantine',
  name: 'Quarantine',
  id: 95,
  menuWeight: 950,
  component: LAYOUT,
  meta: {
    title: '检疫管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: '/quarantine/computed',
      name: 'computed',
      id: 950010,
      meta: { title: '检疫期计算' },
      component: () => import('/@/views/quarantine/computed/index.vue'),
    },
    {
      path: '/quarantine/overdue-confirmation',
      name: 'OverdueConfirmation',
      id: 950020,
      authElements: [
        {
          id: QuarantineButtonEnum.OverdueConfirmationConfim,
          title: '确认',
        },
      ],
      meta: { title: '超一年期确认' },
      component: () => import('@/views/quarantine/overdue-confirmation/index.vue'),
    },
    {
      path: '/quarantine/plasma-batch',
      name: 'PlasmaBatch',
      id: 950030,
      meta: {
        title: '血浆批检疫期报告',
      },
      component: () => import('/@/views/quarantine/plasma-batch/index.vue'),
    },
  ],
};

export default quarantineManager;
