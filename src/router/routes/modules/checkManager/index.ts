import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const checkManager: AppRouteModule = {
  path: '/inspect',
  name: 'Inspect',
  component: LAYOUT,
  meta: {
    title: '检验管理',
    icon: 'ant-design:phone-twotone',
  },
  children: [
    {
      path: '/inspect/inspectMethod',
      name: '检测方法',
      id: 9900,
      meta: {
        title: '检测方法',
        icon: 'ant-design:alert-filled',
      },
      component: () => import('/@/views/inspect/inspectMethod/index.vue'),
    },
    {
      path: '/inspect/itemSetting',
      name: '检验项目设置',
      meta: {
        title: '检验项目设置',
        icon: 'ant-design:pull-request-outlined',
      },
      id: 9900,
      component: () => import('/@/views/inspect/itemSetting/index.vue'),
    },
    {
      path: '/inspect/titerImport',
      name: '效价导入',
      meta: {
        title: '效价导入',
        icon: 'ant-design:check-outlined',
      },
      id: 9900,
      component: () => import('/@/views/inspect/titerImport/index.vue'),
    },
    {
      path: '/inspect/titerType',
      name: '效价类型',
      meta: {
        title: '效价类型',
        icon: 'ant-design:clock-circle-outlined',
      },
      id: 9900,
      component: () => import('/@/views/inspect/titerType/index.vue'),
    },
    {
      path: '/inspect/resultRegistration',
      name: '检验结果登记',
      meta: {
        title: '检验结果登记',
        icon: 'ant-design:taobao-outlined',
      },
      id: 9900,
      component: () => import('/@/views/inspect/resultRegistration/index.vue'),
    },
  ],
};

export default checkManager;
