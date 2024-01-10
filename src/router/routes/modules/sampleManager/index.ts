import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const sampleManager: AppRouteModule = {
  path: '/sample-manage',
  name: 'SampleManage',
  component: LAYOUT,
  redirect: '/sample-manage/sample-release',
  id: 89,
  meta: {
    orderNo: 30001,
    title: '样本管理',
    icon: 'ant-design:close-outlined',
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
