/*
 * @Author: HxB
 * @Date: 2023-12-25 16:00:06
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 15:54:43
 * @Description: 出库管理
 * @FilePath: \psms-fe\src\router\routes\modules\stockout\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const nonconformity: AppRouteModule = {
  path: '/stockout',
  name: 'StockOut',
  id: 91,
  menuWeight: 910,
  component: LAYOUT,
  meta: {
    orderNo: 10000,
    title: '出库管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'pp',
      name: 'ProductionPreparation',
      id: 910010,
      meta: {
        title: '投产准备',
      },
      component: () => import('/@/views/stockout/production-preparation/index.vue'),
    },
    {
      path: 'ps',
      name: 'ProductionSorting',
      id: 910020,
      meta: {
        title: '血浆分拣',
      },
      component: () => import('/@/views/stockout/production-sorting/index.vue'),
    },
    {
      path: 'po',
      name: 'ProductionOrder',
      id: 910030,
      meta: {
        title: '生产指令',
      },
      component: () => import('/@/views/stockout/production-order/index.vue'),
    },
    {
      path: 'productionPlan',
      name: 'ProductionPlan',
      id: 910040,
      meta: {
        title: '投产计划',
      },
      component: () => import('/@/views/stockout/production-plan/index.vue'),
    },

    {
      path: 'productionPutInto',
      name: 'ProductionPutInto',
      id: 910050,
      meta: {
        title: '投产出库',
      },
      component: () => import('/@/views/stockout/production-put-into/index.vue'),
    },
  ],
};

export default nonconformity;
