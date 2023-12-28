/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-12-28 18:15:36
 * @Description: 新建文件
 * @FilePath: \psms-fe\src\router\routes\modules\labelManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const labelManager: AppRouteModule = {
  path: '/tag-manage',
  name: '标签管理',
  component: LAYOUT,
  meta: {
    title: '标签管理',
    icon: 'ant-design:appstore-filled',
  },
  children: [
    {
      path: 'style',
      name: '标签样式管理',
      meta: {
        title: '标签样式管理',
      },
      id: 9900,
      component: () => import('/@/views/tag-manage/style/index.vue'),
    },
    {
      path: 'encoding',
      name: '标签编码管理',
      meta: {
        title: '标签编码管理',
      },
      id: 9900,
      component: () => import('/@/views/tag-manage/encoding/index.vue'),
    },
    {
      path: 'print-record',
      name: '标签打印记录',
      meta: {
        title: '标签打印记录',
      },
      id: 9900,
      component: () => import('/@/views/tag-manage/print-record/index.vue'),
    },
  ],
};
export default labelManager;
