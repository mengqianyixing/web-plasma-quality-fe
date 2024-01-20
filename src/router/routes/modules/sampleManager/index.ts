/*
 * @Author: HxB
 * @Date: 2024-01-11 09:17:02
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-17 15:55:58
 * @Description: 样本管理
 * @FilePath: \psms-fe\src\router\routes\modules\sampleManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const sampleManager: AppRouteModule = {
  path: '/sample-manage',
  name: 'SampleManage',
  component: LAYOUT,
  redirect: '/sample-manage/sample-release',
  id: 89,
  menuWeight: 94,
  meta: {
    orderNo: 30001,
    title: '样本管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'sample-release',
      name: 'SampleRelease',
      id: 8901,
      meta: {
        title: '样本发布',
      },
      component: () => import('/@/views/sample-manage/sample-release/index.vue'),
    },
  ],
};

export default sampleManager;
