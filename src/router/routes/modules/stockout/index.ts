/*
 * @Author: HxB
 * @Date: 2023-12-25 16:00:06
 * @LastEditors: chiyifan chiyf@stpass.com
 * @LastEditTime: 2024-07-31 16:45:05
 * @Description: 出库管理
 * @FilePath: \psms-fe\src\router\routes\modules\stockout\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { ReCheckButtonEnum, StockOutButtonEnum } from '@/enums/authCodeEnum';
import { COMPANY } from '@/enums/company';

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
          title: '编辑',
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
        {
          id: StockOutButtonEnum.ProductionPreparationSortTask,
          name: 'sortTask',
          title: 'PMS分拣',
          company: COMPANY.KM,
        },
        {
          id: StockOutButtonEnum.ProductionPreparationDetailExport,
          name: 'export',
          title: '导出明细',
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
      company: COMPANY.RS,
      component: () => import('@/views/stockout/production-sorting/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.ProductionSortingReCheck,
          name: 'reCheckLogin',
          title: '不合格登记复核人登录',
        },
        {
          id: StockOutButtonEnum.AutomaticSorting,
          name: 'automaticSorting',
          title: '自动分拣',
        },
        {
          id: StockOutButtonEnum.SwitchToManualSorting,
          name: 'switchToManualSorting',
          title: '转人工分拣',
        },
        {
          id: StockOutButtonEnum.ProductionSortingBatch,
          name: 'switchToManualSorting',
          title: '批次暂停',
        },
        {
          id: StockOutButtonEnum.ProductionSortingPP,
          name: 'switchToManualSorting',
          title: '准备号暂停',
        },
        {
          id: StockOutButtonEnum.ProductionSortingBox,
          name: 'switchToManualSorting',
          title: '装箱信息',
        },
        {
          id: StockOutButtonEnum.ProductionSortingTrayIn,
          name: 'switchToManualSorting',
          title: '托盘出库',
        },
        {
          id: StockOutButtonEnum.ProductionSortingTrayOut,
          name: 'switchToManualSorting',
          title: '托盘入库',
        },
        {
          id: StockOutButtonEnum.ProductionSortingTrayComplete,
          name: 'switchToManualSorting',
          title: '分拣完成',
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
          title: '撤销复核',
        },
        {
          id: StockOutButtonEnum.ProductionOrderExamine,
          name: 'exam',
          title: '审核',
        },
        {
          id: StockOutButtonEnum.ProductionOrderCancelExamine,
          name: 'cancelExam',
          title: '撤销审核',
        },
        {
          id: StockOutButtonEnum.ProductionOrderPrint,
          name: 'print',
          title: '打印',
          company: COMPANY.RS,
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
          id: StockOutButtonEnum.ProductionPlanPMS,
          title: 'PMS组垛',
          company: COMPANY.KM,
        },
        {
          id: StockOutButtonEnum.PlasmaProductionPrint,
          title: '打印',
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.ProductionPlanCheckListReport,
          title: '原料血浆投产清单',
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.ProductionPlanTransferReport,
          title: '原料血浆转移记录',
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.ProductionPlanMaterialReport,
          title: '原料血浆复检试剂统计报表',
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.ProductionPlanPlasmaReport,
          title: '原料血浆投产计划',
          company: [COMPANY.RS, COMPANY.KM],
        },
        {
          id: StockOutButtonEnum.ProductionPlanSummary,
          title: '下载原料血浆摘要',
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.KMPlasmaProductionPrint,
          title: '打印',
          company: COMPANY.KM,
        },
        {
          id: StockOutButtonEnum.ProductionPlanSummaryKunMing,
          title: '下载原料血浆摘要-昆明',
          company: COMPANY.KM,
        },
        {
          id: StockOutButtonEnum.PlasmaProductionApplication,
          title: '原料血浆投产申报表-昆明',
          company: COMPANY.KM,
        },
        {
          id: StockOutButtonEnum.PlasmaProductionRecordsOfQualified,
          title: '检疫期合格血浆投产记录',
          company: COMPANY.KM,
        },
        {
          id: StockOutButtonEnum.PlasmaProductionRecordsOfQualifiedSummary,
          title: '检疫期合格血浆投产交接汇总表',
          company: COMPANY.KM,
        },
        {
          id: StockOutButtonEnum.PlasmaProductionPutIntoSummary,
          title: '投产血浆检验汇总表',
          company: COMPANY.KM,
        },
        {
          id: StockOutButtonEnum.PlasmaProductionPutIntoSummaryOfQualified,
          title: '检疫期合格原料血浆投产汇总表',
          company: COMPANY.KM,
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
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.PutIntoBoxStockOut,
          name: 'boxStockOut',
          title: '逐箱出库',
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.PutIntoBatchStockOut,
          name: 'batchStockOut',
          title: '整批出库',
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.PutIntoPickPlasmaSystem,
          name: 'pickPlasmaSystem',
          title: 'PMS出库',
          company: COMPANY.KM,
        },
        {
          id: StockOutButtonEnum.PutIntoCancelStockOut,
          name: 'cancelStockOut',
          title: '撤销出库',
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.PutIntoBoxReceive,
          name: 'boxReceive',
          title: '逐箱接收',
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.PutIntoBatchReceive,
          name: 'batchReceive',
          title: '整批接收',
          company: COMPANY.RS,
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
          id: StockOutButtonEnum.NonPutIntoPickPlasmaSystem,
          title: 'PMS出库',
          company: COMPANY.KM,
        },
        {
          id: StockOutButtonEnum.NonPutIntoScan,
          name: 'scan',
          title: '扫描出库',
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.NonPlasmaTransferRecordReport,
          name: 'nonPlasmaTransferRecord',
          title: '非生产用血浆转移记录',
          company: [COMPANY.RS, COMPANY.KM],
        },
        {
          id: StockOutButtonEnum.PlasmaTransferApplyReport,
          name: 'plasmaTransferApply',
          title: '原料血浆转移申请表',
          company: [COMPANY.RS, COMPANY.KM],
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
          id: StockOutButtonEnum.PlasmaSummaryReport,
          title: '打印',
          company: COMPANY.RS,
        },
        {
          id: StockOutButtonEnum.KMPlasmaSummaryReport,
          title: '原料血浆汇总表',
          company: COMPANY.KM,
        },
        {
          id: StockOutButtonEnum.QuarantineTrackUnqualifiedPlasmaRecords,
          title: '检疫期续追踪不合格血浆记录',
          company: COMPANY.KM,
        },
      ],
    },
  ],
};

export default nonconformity;
