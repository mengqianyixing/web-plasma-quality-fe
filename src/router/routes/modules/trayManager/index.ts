/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-03 09:52:54
 * @Description: 托盘管理
 * @FilePath: \psms-fe\src\router\routes\modules\trayManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const trayManager: AppRouteModule = {
  path: '/tray',
  name: 'TrayManager',
  component: LAYOUT,
  id: 98,
  meta: {
    title: '托盘管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'manage',
      name: 'TrayList',
      meta: {
        title: '托盘列表',
      },
      id: 9801,
      component: () => import('/@/views/tray/manage/index.vue'),
    },
    {
      path: 'outInStore',
      name: 'TrayOutInStore',
      meta: {
        title: '托盘出入库',
      },
      id: 9802,
      component: () => import('/@/views/tray/outInStore/index.vue'),
    },
    {
      path: 'relocation',
      name: 'TrayRelocation',
      meta: {
        title: '托盘移库',
      },
      id: 9803,
      component: () => import('/@/views/tray/relocation/index.vue'),
    },
  ],
};
export default trayManager;
