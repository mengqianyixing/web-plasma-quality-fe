/*
 * @Author: HxB
 * @Date: 2023-12-29 16:47:29
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:31:17
 * @Description: 检验管理
 * @FilePath: \psms-fe\src\router\routes\modules\checkManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const checkManager: AppRouteModule = {
  path: '/inspect',
  name: 'Inspect',
  id: 96,
  menuWeight: 960,
  component: LAYOUT,
  meta: {
    title: '检验管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: '/inspect/resultRegistration',
      name: 'resultRegistration',
      meta: {
        title: '检验结果录入',
      },
      id: 960010,
      component: () => import('/@/views/inspect/resultRegistration/index.vue'),
    },
    {
      path: '/inspect/reportRelease',
      name: 'reportRelease',
      meta: {
        title: '检验报告生成',
      },
      id: 960020,
      component: () => import('/@/views/inspect/reportRelease/index.vue'),
    },
  ],
};

export default checkManager;
