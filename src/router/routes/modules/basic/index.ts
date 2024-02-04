/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-02-01 10:44:30
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:40:09
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const callManager: AppRouteModule = {
  path: '/basic',
  name: 'Basic',
  id: 100,
  menuWeight: 1000,
  component: LAYOUT,
  meta: {
    title: '基础设置',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'titerType',
      name: 'titerType',
      meta: {
        title: '效价类型',
      },
      id: 100010,
      component: () => import('/@/views/inspect/titerType/index.vue'),
    },
    {
      path: 'inspectMethod',
      name: 'inspectMethod',
      id: 100020,
      meta: {
        title: '检测方法',
      },
      component: () => import('/@/views/inspect/inspectMethod/index.vue'),
    },
    {
      path: 'itemSetting',
      name: 'itemSetting',
      meta: {
        title: '检验项目设置',
      },
      id: 100030,
      component: () => import('/@/views/inspect/itemSetting/index.vue'),
    },
    {
      path: 'dictionary',
      name: 'Dictionary',
      meta: {
        title: '字典管理',
      },
      id: 100040,
      component: () => import('@/views/system/dictionary/index.vue'),
    },
    {
      path: 'report',
      name: 'report',
      id: 100050,
      meta: {
        title: '报表设置',
      },
      component: () => import('@/views/system/report/index.vue'),
    },
    {
      path: 'params',
      name: 'Params',
      id: 100060,
      meta: {
        title: '系统参数',
      },
      component: () => import('@/views/system/params/index.vue'),
    },
  ],
};
export default callManager;