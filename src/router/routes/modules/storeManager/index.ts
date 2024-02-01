/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:35:52
 * @Description: 库房管理
 * @FilePath: \psms-fe\src\router\routes\modules\storeManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const storeManager: AppRouteModule = {
  path: '/plasma-store',
  name: 'PlasmaStore',
  component: LAYOUT,
  menuWeight: 990,
  id: 99,
  meta: {
    title: '库房管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'setting',
      name: 'StoreSetting',
      meta: {
        title: '库房设置',
      },
      id: 990010,
      component: () => import('/@/views/plasma-store/setting/index.vue'),
    },
    {
      path: 'manage',
      name: 'TrayList',
      meta: {
        title: '托盘管理',
      },
      id: 990020,
      component: () => import('/@/views/tray/manage/index.vue'),
    },
    {
      path: 'relocation',
      name: 'TrayRelocation',
      meta: {
        title: '托盘移库',
      },
      id: 990030,
      component: () => import('/@/views/tray/relocation/index.vue'),
    },
    {
      path: 'outInStore',
      name: 'TrayOutInStore',
      meta: {
        title: '托盘出入库',
      },
      id: 990040,
      component: () => import('/@/views/tray/outInStore/index.vue'),
    },
    {
      path: 'site',
      name: 'PlasmaSite',
      meta: {
        title: '站点管理',
      },
      id: 990050,
      component: () => import('/@/views/plasma-store/site/index.vue'),
    },
    {
      path: 'entry-plasma',
      name: 'EntryPlasma',
      meta: {
        title: '入库查询',
      },
      id: 990060,
      component: () => import('/@/views/plasma-store/entry-plasma/index.vue'),
    },
  ],
};

export default storeManager;
