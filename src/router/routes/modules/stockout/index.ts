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
      component: () => import('@/views/stockout/production-preparation/index.vue'),
      authElements: [
        {
          id: StockOutButtonEnum.ProductionPreparationAdd,
          name: 'add',
          title: '新增',
        },
        {
          id: StockOutButtonEnum.ProductionPreparationEdit,
          name: 'edit',
          title: '修改',
        },
        {
          id: StockOutButtonEnum.ProductionPreparationDelete,
          name: 'delete',
          title: '撤销',
        },
        {
          id: StockOutButtonEnum.ProductionPreparationSelect,
          name: 'select',
          title: '挑选血浆',
        },
        {
          id: StockOutButtonEnum.ProductionPreparationFinish,
          name: 'finish',
          title: '完成准备',
        },
        {
          id: StockOutButtonEnum.ProductionPreparationReset,
          name: 'reset',
          title: '撤销准备',
        },
        {
          id: StockOutButtonEnum.ProductionPreparationReCheck,
          name: 'recheck',
          title: '复核',
        },
        {
          id: StockOutButtonEnum.ProductionPreparationResetReCheck,
          name: 'resetReCheck',
          title: '撤销复核',
        },
      ],
    },
    {
      path: 'ps',
      name: 'ProductionSorting',
      id: 910020,
      meta: {
        title: '血浆分拣',
      },
      component: () => import('@/views/stockout/production-sorting/index.vue'),
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
      component: () => import('@/views/stockout/production-order/index.vue'),
      authElements: [
        {
          id: StockOutButtonEnum.ProductionOrderAdd,
          name: 'add',
          title: '新增',
        },
        {
          id: StockOutButtonEnum.ProductionOrderEdit,
          name: 'edit',
          title: '编辑',
        },
        {
          id: StockOutButtonEnum.ProductionOrderDelete,
          name: 'delete',
          title: '撤销',
        },
        {
          id: StockOutButtonEnum.ProductionOrderRecheck,
          name: 'recheck',
          title: '复核',
        },
        {
          id: StockOutButtonEnum.ProductionOrderCancelRecheck,
          name: 'cancelRecheck',
          title: '取消复核',
        },
        {
          id: StockOutButtonEnum.ProductionOrderExamine,
          name: 'exam',
          title: '审核',
        },
        {
          id: StockOutButtonEnum.ProductionOrderCancelExamine,
          name: 'cancelExam',
          title: '取消审核',
        },
      ],
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
        {
          id: StockOutButtonEnum.ProductionPlanCheckListReport,
          title: '投产清单',
        },
        {
          id: StockOutButtonEnum.ProductionPlanTransferReport,
          title: '转移记录',
        },
        {
          id: StockOutButtonEnum.ProductionPlanMaterialReport,
          title: '试剂统计表',
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
      component: () => import('@/views/stockout/production-put-into/index.vue'),
      authElements: [
        {
          id: StockOutButtonEnum.PutIntoTrayStockOut,
          name: 'trayStockOut',
          title: '托盘出库',
        },
        {
          id: StockOutButtonEnum.PutIntoBoxStockOut,
          name: 'boxStockOut',
          title: '逐箱出库',
        },
        {
          id: StockOutButtonEnum.PutIntoBatchStockOut,
          name: 'batchStockOut',
          title: '整批出库',
        },
        {
          id: StockOutButtonEnum.PutIntoPickPlasmaSystem,
          name: 'pickPlasmaSystem',
          title: '挑浆系统',
        },
        {
          id: StockOutButtonEnum.PutIntoCancelStockOut,
          name: 'cancelStockOut',
          title: '撤销出库',
        },
        {
          id: StockOutButtonEnum.PutIntoBoxReceive,
          name: 'boxReceive',
          title: '逐箱接收',
        },
        {
          id: StockOutButtonEnum.PutIntoBatchReceive,
          name: 'batchReceive',
          title: '整批接收',
        },
        {
          id: StockOutButtonEnum.PutIntoCancelExamine,
          name: 'cancelExamine',
          title: '撤销接收',
        },
      ],
    },
    {
      path: 'NonProductionPutInto',
      name: 'NonProductionPutInto',
      id: 910060,
      meta: {
        title: '非生产出库',
      },
      component: () => import('@/views/stockout/non-production-put-into/index.vue'),
      authElements: [
        {
          id: StockOutButtonEnum.NonPutIntoAdd,
          name: 'add',
          title: '新增',
        },
        {
          id: StockOutButtonEnum.NonPutIntoEdit,
          name: 'edit',
          title: '编辑',
        },
        {
          id: StockOutButtonEnum.NonPutIntoCancel,
          name: 'cancel',
          title: '撤销',
        },
        {
          id: StockOutButtonEnum.NonPutIntoCompletePrepare,
          name: 'completePrepare',
          title: '完成准备',
        },
        {
          id: StockOutButtonEnum.NonPutIntoCancelPrepare,
          name: 'cancelPrepare',
          title: '撤销准备',
        },
        {
          id: StockOutButtonEnum.NonPutIntoReCheck,
          name: 'recheck',
          title: '复核',
        },
        {
          id: StockOutButtonEnum.NonPutIntoCancelReCheck,
          name: 'cancelReCheck',
          title: '撤销复核',
        },
        {
          id: StockOutButtonEnum.NonPutIntoCheck,
          name: 'check',
          title: '审核',
        },
        {
          id: StockOutButtonEnum.NonPutIntoCancelCheck,
          name: 'cancelCheck',
          title: '撤销审核',
        },
        {
          id: StockOutButtonEnum.NonPutIntoScan,
          name: 'scan',
          title: '扫描出库',
        },
      ],
    },
    {
      path: 'plasmaSummary',
      name: 'PlasmaSummary',
      id: 910070,
      meta: {
        title: '血浆汇总',
      },
      component: () => import('@/views/stockout/plasma-summary/index.vue'),
      authElements: [
        {
          id: StockOutButtonEnum.PlasmaSummaryPlasmaSummaryReport,
          title: '血浆汇总表',
        },
        {
          id: StockOutButtonEnum.PlasmaSummaryPlasmaTrackUnqReport,
          title: '续追踪不合格记录',
        },
      ],
    },
  ],
};

export default nonconformity;
