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
import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

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
      path: 'resultRegistration',
      name: 'resultRegistration',
      meta: {
        title: '检验结果录入',
      },
      id: 960010,
      component: () => import('/@/views/inspect/resultRegistration/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.ResultRegistrationCheck,
          name: 'reCheckResultRegistrationCheck',
          title: '不合格登记复核权限',
        },
        {
          id: ReCheckButtonEnum.ResultRegistrationTiter,
          name: 'reCheckResultRegistrationTiter',
          title: '效价登记复核权限',
        },
      ],
    },
    {
      path: 'reportRelease',
      name: 'reportRelease',
      meta: {
        title: '检验报告生成',
      },
      id: 960020,
      component: () => import('/@/views/inspect/reportRelease/index.vue'),
    },
    {
      path: 'materialPreRegistration',
      name: 'materialPreRegistration',
      id: 960030,
      meta: {
        title: '物料预登记',
      },
      component: () => import('@/views/inspect/materialPreRegistration/index.vue'),
    },
  ],
};

export default checkManager;
