/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: Ding 1326587277@qq.com
 * @LastEditTime: 2024-03-04 14:05:54
 * @Description: 托盘管理
 * @FilePath: \psms-fe\src\router\routes\modules\trayManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const trayManager: AppRouteModule = {
  path: '/search',
  name: 'SearchManager',
  component: LAYOUT,
  menuWeight: 900,
  id: 90,
  meta: {
    title: '查询统计',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'plasma',
      name: 'PlasmaQuery',
      meta: {
        title: '血浆查询',
      },
      id: 900020,
      component: () => import('@/views/query-statistics/plasma/index.vue'),
    },
    {
      path: 'PlasmaTest',
      name: 'PlasmaTest',
      meta: {
        title: '血浆检测',
      },
      id: 9000190,
      component: () => import('@/views/query-statistics/plasmaCheck/index.vue'),
    },
    {
      path: 'inventory',
      name: 'StoreInventory',
      meta: {
        title: '库存查询',
      },
      id: 900010,
      component: () => import('@/views/plasma-store/inventory/index.vue'),
    },
    {
      path: 'InventoryStatistics',
      name: 'InventoryStatistics',
      meta: {
        title: '库存统计',
      },
      id: 9000310,
      component: () => import('@/views/query-statistics/inventory-statistics/index.vue'),
    },
    {
      path: 'stereoWarehouse',
      name: 'StereoWarehouse',
      meta: {
        title: '立体库血浆量查询',
      },
      id: 9000180,
      component: () => import('@/views/query-statistics/stereoWarehouse/index.vue'),
    },
    {
      path: 'location',
      name: 'Location',
      meta: {
        title: '货位查询',
      },
      id: 9000170,
      component: () => import('@/views/query-statistics/location/index.vue'),
    },
    {
      path: 'prepareNo',
      name: 'PrepareNo',
      meta: {
        title: '投产准备号查询',
      },
      id: 9000210,
      component: () => import('@/views/query-statistics/prepareNo/index.vue'),
    },
    {
      path: 'quarantinePeriodUnqualifiedStatistics',
      name: 'QuarantinePeriodUnqualifiedStatistics',
      meta: {
        title: '检疫期不合格统计',
      },
      id: 9000280,
      component: () =>
        import('@/views/query-statistics/quarantinePeriodUnqualifiedStatistics/index.vue'),
    },
    {
      path: 'titerPlasmaQuery',
      name: 'TiterPlasmaQuery',
      meta: {
        title: '特免血浆查询',
      },
      id: 9000160,
      component: () => import('@/views/query-statistics/titerPlasmaQuery/index.vue'),
    },
    {
      path: 'titerPlasmaStat',
      name: 'TiterPlasmaStat',
      meta: {
        title: '特免血浆统计',
      },
      id: 9000150,
      component: () => import('@/views/query-statistics/titerPlasmaStat/index.vue'),
    },
    {
      path: 'UnqualifiedPlasmaByBatch',
      name: 'UnqualifiedPlasmaByBatch',
      meta: {
        title: '不合格血浆按批查询',
      },
      id: 9000291,
      component: () => import('@/views/query-statistics/unqualified-plasma-batch/index.vue'),
    },
    {
      path: 'UnqualifiedPlasmaByStation',
      name: 'UnqualifiedPlasmaByStation',
      meta: {
        title: '不合格血浆按站查询',
      },
      id: 9000290,
      component: () => import('@/views/query-statistics/unqualified-plasma-station/index.vue'),
    },
    {
      path: 'followDisqualificationStatistics',
      name: 'FollowDisqualificationStatistics',
      meta: {
        title: '续追踪不合格统计',
      },
      id: 9000270,
      component: () =>
        import('@/views/query-statistics/followDisqualificationStatistics/index.vue'),
    },
    {
      path: 'entry-plasma',
      name: 'EntryPlasma',
      meta: {
        title: '入库查询',
      },
      id: 990060,
      component: () => import('@/views/plasma-store/entry-plasma/index.vue'),
    },
    {
      path: 'stationBox',
      name: 'StationBox',
      meta: {
        title: '箱号查询',
      },
      id: 9000200,
      component: () => import('@/views/query-statistics/stationBox/index.vue'),
    },
    {
      path: 'BatchStatistics',
      name: 'BatchStatistics',
      meta: {
        title: '批号查询',
      },
      id: 9000280,
      component: () => import('@/views/query-statistics/batch-statistics/index.vue'),
    },
    {
      path: 'PlasmaBatch',
      name: 'PlasmaBatchQueryStatistics',
      meta: {
        title: '血浆批号查询',
      },
      id: 900030,
      component: () => import('@/views/query-statistics/plasma-batch/index.vue'),
    },
    {
      path: 'ERPInspectionReport',
      name: 'ERPInspectionReport',
      meta: {
        title: 'ERP-检验报告查询',
      },
      id: 9000240,
      component: () => import('@/views/query-statistics/ERPInspectionReport/index.vue'),
    },
    {
      path: 'ERPEntryStore',
      name: 'ERPEntryStore',
      meta: {
        title: 'ERP-入库查询',
      },
      id: 9000230,
      component: () => import('@/views/query-statistics/ERPEntryStore/index.vue'),
    },
    {
      path: 'donor',
      name: 'DonorQuery',
      meta: {
        title: '浆员查询',
      },
      id: 9000270,
      component: () => import('@/views/query-statistics/donor/index.vue'),
    },
    {
      path: 'donorState',
      name: 'DonorState',
      meta: {
        title: '浆员状态查询',
      },
      id: 9000140,
      component: () => import('@/views/query-statistics/donorState/index.vue'),
    },
    {
      path: 'sampleStatistics',
      name: 'SampleStatistics',
      meta: {
        title: '样本统计',
      },
      id: 9000100,
      component: () => import('@/views/query-statistics/sampleStat/index.vue'),
    },
    {
      path: 'SampleQuery',
      name: 'SampleQuery',
      meta: {
        title: '样本查询',
      },
      id: 9000130,
      component: () => import('@/views/query-statistics/sampleQuery/index.vue'),
    },
    {
      path: 'sampleCheck',
      name: 'SampleCheck',
      meta: {
        title: '样本检测',
      },
      id: 9000120,
      component: () => import('@/views/query-statistics/sampleCheck/index.vue'),
    },
    {
      path: 'ProductionInquiry',
      name: 'ProductionInquiry',
      meta: {
        title: '投产查询',
      },
      id: 9000300,
      component: () => import('@/views/query-statistics/production-inquiry/index.vue'),
    },
    {
      path: 'CallbackStatistics',
      name: 'CallbackStatistics',
      meta: {
        title: '回访统计',
      },
      id: 9000250,
      component: () => import('@/views/query-statistics/callback/index.vue'),
    },
    {
      path: 'CallbackBatchStatistics',
      name: 'CallbackBatchStatistics',
      meta: {
        title: '回访批号查询',
      },
      id: 9000260,
      component: () => import('@/views/query-statistics/callback-batch/index.vue'),
    },
    {
      path: 'checkResult',
      name: 'CheckResult',
      meta: {
        title: '检测结果查询',
      },
      id: 9000100,
      component: () => import('@/views/query-statistics/checkResult/index.vue'),
    },
  ],
};
export default trayManager;
