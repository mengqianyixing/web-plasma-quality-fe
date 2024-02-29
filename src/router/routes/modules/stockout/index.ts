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
import { ReCheckButtonEnum, StockOutButtonEnum } from '@/enums/authCodeEnum';

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
      authElements: [
        {
          id: ReCheckButtonEnum.ProductionSortingReCheck,
          name: 'reCheckLogin',
          title: '复核人登录',
        },
      ],
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
      authElements: [
        {
          id: StockOutButtonEnum.ProductionPlanPick,
          title: '挑选血浆',
        },
        {
          id: StockOutButtonEnum.ProductionPlanComplate,
          title: '完成计划',
        },
        {
          id: StockOutButtonEnum.ProductionPlanReComplate,
          title: '撤销计划',
        },
        {
          id: StockOutButtonEnum.ProductionPlanReview,
          title: '复核',
        },
        {
          id: StockOutButtonEnum.ProductionPlanReReview,
          title: '撤销复核',
        },
        {
          id: StockOutButtonEnum.ProductionPlanCheck,
          title: '审核',
        },
        {
          id: StockOutButtonEnum.ProductionPlanReCheck,
          title: '撤销审核',
        },
      ],
      component: () => import('@/views/stockout/production-plan/index.vue'),
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
    {
      path: 'NonProductionPutInto',
      name: 'NonProductionPutInto',
      id: 910060,
      meta: {
        title: '非生产出库',
      },
      component: () => import('/@/views/stockout/non-production-put-into/index.vue'),
    },
    {
      path: 'plasmaSummary',
      name: 'PlasmaSummary',
      id: 910070,
      meta: {
        title: '血浆汇总',
      },
      component: () => import('/@/views/stockout/plasma-summary/index.vue'),
    },
  ],
};

export default nonconformity;
