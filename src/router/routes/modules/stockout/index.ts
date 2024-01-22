/*
 * @Author: HxB
 * @Date: 2023-12-25 16:00:06
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-19 11:06:19
 * @Description: 出库管理
 * @FilePath: \psms-fe\src\router\routes\modules\stockout\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const nonconformity: AppRouteModule = {
  path: '/stockout',
  name: 'StockOut',
  id: 96,
  menuWeight: 90,
  component: LAYOUT,
  meta: {
    orderNo: 10000,
    title: '出库管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'po',
      name: 'ProductionOrder',
      id: 9601,
      meta: {
        title: '生产指令',
      },
      component: () => import('/@/views/stockout/production-order/index.vue'),
    },
    {
      path: 'productionPlan',
      name: 'ProductionPlan',
      id: 9602,
      meta: {
        title: '投产计划',
      },
      component: () => import('/@/views/stockout/production-plan/index.vue'),
    },
    {
      path: 'productionPutInto',
      name: 'ProductionPutInto',
      id: 9603,
      meta: {
        title: '投产出库',
      },
      component: () => import('/@/views/stockout/production-put-into/index.vue'),
    },
  ],
};

export default nonconformity;
