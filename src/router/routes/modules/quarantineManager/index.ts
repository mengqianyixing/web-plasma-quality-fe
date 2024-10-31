/*
 * @Author: HxB
 * @Date: 2023-12-29 16:47:29
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:32:23
 * @Description: 检疫管理
 * @FilePath: \psms-fe\src\router\routes\modules\QuarantineManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';
import { QuarantineButtonEnum, ReCheckButtonEnum } from '@/enums/authCodeEnum';
import { COMPANY } from '@/enums/company';

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
          company: [COMPANY.RS, COMPANY.KM],
        },
        {
          id: QuarantineButtonEnum.ExportQuarantine,
          name: 'print',
          title: '导出',
        },
      ],
    },
    {
      path: 'nonconformityTracking',
      name: 'NonconformityTracking',
      meta: {
        title: '检疫期追踪',
      },
      id: 950040,
      authElements: [
        {
          id: QuarantineButtonEnum.NonconformityTrackingReport,
          title: '追踪记录/报告',
          company: [COMPANY.RS, COMPANY.KM],
        },
      ],
      component: () => import('@/views/query-statistics/nonconformityTracking/index.vue'),
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
        {
          id: ReCheckButtonEnum.OverdueConfirmationCheck,
          title: '确认复核人',
        },
      ],
      meta: { title: '超一年期确认' },
      component: () => import('@/views/quarantine/overdue-confirmation/index.vue'),
    },
    {
      path: 'stationRefuseKm',
      name: 'StationRefuseKm',
      meta: {
        title: '浆站永拒查询',
      },
      company: COMPANY.KM,
      id: 950050,
      component: () => import('@/views/query-statistics/stationRefuse/km.vue'),
      authElements: [
        {
          id: QuarantineButtonEnum.StationRefuseExport,
          title: '导出',
        },
      ],
    },
    {
      path: 'factoryCheckFailKm',
      name: 'FactoryCheckFailKm',
      meta: {
        title: '厂家检测不合格查询',
      },
      id: 950060,
      company: COMPANY.KM,
      component: () => import('@/views/query-statistics/factoryCheckFail/km.vue'),
      authElements: [
        {
          id: QuarantineButtonEnum.FactoryCheckFailExcel,
          title: '导出',
        },
      ],
    },
  ],
};

export default quarantineManager;
