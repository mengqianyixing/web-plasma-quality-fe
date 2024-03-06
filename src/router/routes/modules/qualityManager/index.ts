/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-31 18:59:35
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:32:57
 */
import type { AppRouteModule } from '@/router/types';
import { QualityButtonEnum } from '@/enums/authCodeEnum';

import { LAYOUT } from '@/router/constant';

const checkManager: AppRouteModule = {
  path: '/quality',
  name: 'Quality',
  id: 94,
  menuWeight: 940,
  component: LAYOUT,
  meta: {
    title: '质量管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'plasma-restriction',
      name: 'PlasmaRestriction',
      id: 940010,
      authElements: [
        {
          id: QualityButtonEnum.PlasmaRestrictionAdd,
          title: '新增',
        },
        {
          id: QualityButtonEnum.PlasmaRestrictionRemove,
          title: '撤销',
        },
        {
          id: QualityButtonEnum.PlasmaRestrictionReview,
          title: '复核',
        },
      ],
      meta: {
        title: '血浆限制',
      },
      component: () => import('@/views/quality-manage/plasma-restriction/index.vue'),
    },
    {
      path: '/quality/plasma-check',
      name: 'PlasmaCheck',
      id: 940020,
      meta: {
        title: '血浆审核',
      },
      component: () => import('@/views/quality-manage/plasma-check/index.vue'),
    },

    {
      path: 'batch-release',
      name: 'BatchRelease',
      id: 940030,
      authElements: [
        {
          id: QualityButtonEnum.BatchReleaseAdd,
          title: '新增',
        },
        {
          id: QualityButtonEnum.BatchReleaseUpdate,
          title: '编辑',
        },
        {
          id: QualityButtonEnum.BatchReleaseReview,
          title: '复核',
        },
        {
          id: QualityButtonEnum.BatchReleaseRelease,
          title: '放行',
        },
        {
          id: QualityButtonEnum.BatchReleaseUnRelease,
          title: '取消放行',
        },
        {
          id: QualityButtonEnum.BatchReleasePrint,
          title: '打印',
        },
      ],
      meta: {
        title: '血浆批放行',
      },
      component: () => import('@/views/quality-manage/batch-release/index.vue'),
    },
  ],
};

export default checkManager;
