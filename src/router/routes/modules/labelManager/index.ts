/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 15:56:07
 * @Description: 标签管理
 * @FilePath: \psms-fe\src\router\routes\modules\labelManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { TagManageButtonEnum } from '@/enums/authCodeEnum';

const labelManager: AppRouteModule = {
  path: '/tag-manage',
  name: 'TagManager',
  component: LAYOUT,
  menuWeight: 890,
  id: 89,
  meta: {
    title: '标签管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'style',
      name: 'TagStyle',
      meta: {
        title: '标签样式管理',
      },
      id: 890010,
      component: () => import('@/views/tag-manage/style/index.vue'),
      authElements: [
        {
          id: TagManageButtonEnum.TagStyleAdd,
          title: '新增',
        },
        {
          id: TagManageButtonEnum.TagStyleEdit,
          title: '编辑',
        },
        {
          id: TagManageButtonEnum.TagStyleDelete,
          title: '撤销',
        },
        {
          id: TagManageButtonEnum.TagStyleCopy,
          title: '复制',
        },
        {
          id: TagManageButtonEnum.TagStyleHistory,
          title: '历史',
        },
        {
          id: TagManageButtonEnum.TagStylePreview,
          title: '预览',
        },
        {
          id: TagManageButtonEnum.TagStyleOpen,
          title: '启用',
        },
        {
          id: TagManageButtonEnum.TagStyleClose,
          title: '禁用',
        },
      ],
    },
    {
      path: 'print-record',
      name: 'TagPrintRecord',
      meta: {
        title: '标签打印记录',
      },
      id: 890030,
      component: () => import('@/views/tag-manage/print-record/index.vue'),
    },
    {
      path: 'replay',
      name: 'TagReplay',
      meta: {
        title: '标签补打',
      },
      id: 890040,
      component: () => import('@/views/tag-manage/replay/index.vue'),
    },
  ],
};
export default labelManager;
