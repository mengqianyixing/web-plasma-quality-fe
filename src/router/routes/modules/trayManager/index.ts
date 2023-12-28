/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-12-28 18:20:20
 * @Description: 新建文件
 * @FilePath: \psms-fe\src\router\routes\modules\trayManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const trayManager: AppRouteModule = {
  path: '/tray',
  name: '托盘管理',
  component: LAYOUT,
  meta: {
    title: '托盘管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'manage',
      name: '托盘列表',
      meta: {
        title: '托盘列表',
      },
      id: 9900,
      component: () => import('/@/views/tray/manage/index.vue'),
    },
    {
      path: 'outInStore',
      name: '托盘出入库',
      meta: {
        title: '托盘出入库',
      },
      id: 9900,
      component: () => import('/@/views/tray/outInStore/index.vue'),
    },
    {
      path: 'relocation',
      name: '托盘移库',
      meta: {
        title: '托盘移库',
      },
      id: 9900,
      component: () => import('/@/views/tray/relocation/index.vue'),
    },
  ],
};
export default trayManager;
