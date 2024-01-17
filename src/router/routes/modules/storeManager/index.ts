/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-17 15:42:58
 * @Description: 库房管理
 * @FilePath: \psms-fe\src\router\routes\modules\storeManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const storeManager: AppRouteModule = {
  path: '/plasma-store',
  name: 'PlasmaStore',
  component: LAYOUT,
  menuWeight: 89,
  id: 97,
  meta: {
    title: '库房管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'site',
      name: 'PlasmaSite',
      meta: {
        title: '站点管理',
      },
      id: 9701,
      component: () => import('/@/views/plasma-store/site/index.vue'),
    },
    {
      path: 'inventory',
      name: 'StoreInventory',
      meta: {
        title: '库存查询',
      },
      id: 9702,
      component: () => import('/@/views/plasma-store/inventory/index.vue'),
    },
    {
      path: 'setting',
      name: 'StoreSetting',
      meta: {
        title: '库房设置',
      },
      id: 9703,
      component: () => import('/@/views/plasma-store/setting/index.vue'),
    },
    {
      path: 'entry-plasma',
      name: 'EntryPlasma',
      meta: {
        title: '入库查询',
      },
      id: 9704,
      component: () => import('/@/views/plasma-store/entry-plasma/index.vue'),
    },
  ],
};

export default storeManager;
