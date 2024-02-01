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
  ],
};
export default trayManager;
