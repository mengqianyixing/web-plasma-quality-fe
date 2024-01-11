/*
 * @Author: HxB
 * @Date: 2023-12-29 16:47:29
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-10 18:23:50
 * @Description: 检验管理
 * @FilePath: \psms-fe\src\router\routes\modules\checkManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const checkManager: AppRouteModule = {
  path: '/inspect',
  name: 'Inspect',
  id: 91,
  component: LAYOUT,
  meta: {
    title: '检验管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: '/inspect/inspectMethod',
      name: 'inspectMethod',
      id: 9101,
      meta: {
        title: '检测方法',
      },
      component: () => import('/@/views/inspect/inspectMethod/index.vue'),
    },
    {
      path: '/inspect/itemSetting',
      name: 'itemSetting',
      meta: {
        title: '检验项目设置',
      },
      id: 9102,
      component: () => import('/@/views/inspect/itemSetting/index.vue'),
    },
    {
      path: '/inspect/titerImport',
      name: 'titerImport',
      meta: {
        title: '效价导入',
      },
      id: 9103,
      component: () => import('/@/views/inspect/titerImport/index.vue'),
    },
    {
      path: '/inspect/titerType',
      name: 'titerType',
      meta: {
        title: '效价类型',
      },
      id: 9104,
      component: () => import('/@/views/inspect/titerType/index.vue'),
    },
    {
      path: '/inspect/reportRelease',
      name: 'reportRelease',
      meta: {
        title: '检验报告生成',
      },
      id: 9106,
      component: () => import('/@/views/inspect/reportRelease/index.vue'),
    },
    {
      path: '/inspect/resultRegistration',
      name: 'resultRegistration',
      meta: {
        title: '检验结果登记',
      },
      id: 9105,
      component: () => import('/@/views/inspect/resultRegistration/index.vue'),
    },
  ],
};

export default checkManager;
