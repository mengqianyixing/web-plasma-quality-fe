/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 15:55:34
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
      path: 'inventory',
      name: 'StoreInventory',
      meta: {
        title: '库存查询',
      },
      id: 900010,
      component: () => import('/@/views/plasma-store/inventory/index.vue'),
    },
    {
      path: 'plasma',
      name: 'PlasmaQuery',
      meta: {
        title: '血浆查询',
      },
      id: 900020,
      component: () => import('/@/views/query-statistics/plasma/index.vue'),
    },
    {
      path: 'PlasmaBatch',
      name: 'PlasmaBatchQueryStatistics',
      meta: {
        title: '血浆批号查询',
      },
      id: 900030,
      component: () => import('/@/views/query-statistics/plasma-batch/index.vue'),
    },
    {
      path: 'checkResult',
      name: 'CheckResult',
      meta: {
        title: '检测结果查询',
      },
      id: 9000100,
      component: () => import('/@/views/query-statistics/checkResult/index.vue'),
    },
    {
      path: 'factoryCheckFail',
      name: 'FactoryCheckFail',
      meta: {
        title: '厂家检测不合格查询',
      },
      id: 9000110,
      component: () => import('/@/views/query-statistics/factoryCheckFail/index.vue'),
    },
    {
      path: 'sampleCheck',
      name: 'SampleCheck',
      meta: {
        title: '样本检测查询',
      },
      id: 9000120,
      component: () => import('/@/views/query-statistics/sampleCheck/index.vue'),
    },
    {
      path: 'sampleStat',
      name: 'sampleStat',
      meta: {
        title: '样本统计查询',
      },
      id: 9000100,
      component: () => import('/@/views/query-statistics/sampleStat/index.vue'),
    },
    {
      path: 'sampleQuery',
      name: 'sampleQuery',
      meta: {
        title: '样本查询',
      },
      id: 9000130,
      component: () => import('/@/views/query-statistics/sampleQuery/index.vue'),
    },
    {
      path: 'donorState',
      name: 'DonorState',
      meta: {
        title: '浆员状态查询',
      },
      id: 9000140,
      component: () => import('/@/views/query-statistics/donorState/index.vue'),
    },
    {
      path: 'titerPlasmaStat',
      name: 'TiterPlasmaStat',
      meta: {
        title: '特免血浆统计',
      },
      id: 9000150,
      component: () => import('/@/views/query-statistics/titerPlasmaStat/index.vue'),
    },
    {
      path: 'titerPlasmaQuery',
      name: 'TiterPlasmaQuery',
      meta: {
        title: '特免血浆查询',
      },
      id: 9000160,
      component: () => import('/@/views/query-statistics/titerPlasmaQuery/index.vue'),
    },
    {
      path: 'relocation',
      name: 'Relocation',
      meta: {
        title: '货位查询',
      },
      id: 9000170,
      component: () => import('/@/views/query-statistics/relocation/index.vue'),
    },
    {
      path: 'stereoWarehouse',
      name: 'stereoWarehouse',
      meta: {
        title: '立体库血浆量查询',
      },
      id: 9000180,
      component: () => import('/@/views/query-statistics/stereoWarehouse/index.vue'),
    },
    {
      path: 'plasmaCheck',
      name: 'PlasmaCheck',
      meta: {
        title: '血浆检测查询',
      },
      id: 9000190,
      component: () => import('/@/views/query-statistics/plasmaCheck/index.vue'),
    },
    {
      path: 'stationBox',
      name: 'StationBox',
      meta: {
        title: '浆站箱号查询',
      },
      id: 9000200,
      component: () => import('/@/views/query-statistics/stationBox/index.vue'),
    },
    {
      path: 'prepareNo',
      name: 'PrepareNo',
      meta: {
        title: '投产准备号查询',
      },
      id: 9000210,
      component: () => import('/@/views/query-statistics/prepareNo/index.vue'),
    },
    {
      path: 'stationRefuse',
      name: 'StationRefuse',
      meta: {
        title: '浆站永拒查询',
      },
      id: 9000220,
      component: () => import('/@/views/query-statistics/stationRefuse/index.vue'),
    },
    {
      path: 'ERPEntryStore',
      name: 'ERPEntryStore',
      meta: {
        title: 'ERP-入库查询',
      },
      id: 9000230,
      component: () => import('/@/views/query-statistics/ERPEntryStore/index.vue'),
    },
    {
      path: 'ERPInspectionReport',
      name: 'ERPInspectionReport',
      meta: {
        title: 'ERP-检验报告查询',
      },
      id: 9000240,
      component: () => import('/@/views/query-statistics/ERPEntryStore/index.vue'),
    },
    {
      path: 'CallbackStatistics',
      name: 'CallbackStatistics',
      meta: {
        title: '回访统计',
      },
      id: 9000250,
      component: () => import('/@/views/query-statistics/callback/index.vue'),
    },
    {
      path: 'donor',
      name: 'DonorQuery',
      meta: {
        title: '浆员查询',
      },
      id: 9000260,
      component: () => import('/@/views/query-statistics/donor/index.vue'),
    },
  ],
};
export default trayManager;
