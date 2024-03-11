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
    title: '检疫期管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: '/quarantine/computed',
      name: 'Computed',
      id: 950010,
      meta: { title: '检疫期计算' },
      component: () => import('@/views/quarantine/computed/index.vue'),
    },
    {
      path: '/quarantine/plasma-batch',
      name: 'PlasmaBatchReport',
      id: 950030,
      meta: {
        title: '血浆批检疫期报告',
      },
      component: () => import('@/views/quarantine/plasma-batch/index.vue'),
      authElements: [
        {
          id: QuarantineButtonEnum.CreateQuarantine,
          name: 'create',
          title: '新增',
        },
        {
          id: QuarantineButtonEnum.ResetQuarantine,
          name: 'reset',
          title: '撤销',
        },
        {
          id: QuarantineButtonEnum.ReCheckQuarantine,
          name: 'recheck',
          title: '复核',
        },
        {
          id: QuarantineButtonEnum.PrintQuarantine,
          name: 'print',
          title: '打印',
        },
      ],
    },
    {
      path: 'stationRefuse',
      name: 'StationRefuse',
      meta: {
        title: '浆站永拒查询',
      },
      id: 9000220,
      component: () => import('@/views/query-statistics/stationRefuse/index.vue'),
    },
    {
      path: 'factoryCheckFail',
      name: 'FactoryCheckFail',
      meta: {
        title: '厂家检测不合格查询',
      },
      id: 9000110,
      component: () => import('@/views/query-statistics/factoryCheckFail/index.vue'),
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
  ],
};

export default quarantineManager;
