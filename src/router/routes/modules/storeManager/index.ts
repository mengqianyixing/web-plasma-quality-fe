/*
 * @Author: HxB
 * @Date: 2023-12-28 18:11:32
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:35:52
 * @Description: 库房管理
 * @FilePath: \psms-fe\src\router\routes\modules\storeManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { ReCheckButtonEnum, StoreButtonEnum } from '@/enums/authCodeEnum';
import { COMPANY } from '@/enums/company';

const storeManager: AppRouteModule = {
  path: '/plasma-store',
  name: 'PlasmaStore',
  component: LAYOUT,
  menuWeight: 990,
  id: 99,
  meta: {
    title: '库房管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'setting',
      name: 'StoreSetting',
      meta: {
        title: '库房设置',
      },
      id: 990010,
      authElements: [
        {
          id: StoreButtonEnum.StoreSettingAdd,
          title: '新增',
        },

        {
          id: StoreButtonEnum.StoreSettingEnable,
          title: '启用',
        },
        {
          id: StoreButtonEnum.StoreSettingDisable,
          title: '禁用',
        },
      ],
      component: () => import('@/views/plasma-store/setting/index.vue'),
    },
    {
      path: 'manage',
      name: 'TrayList',
      meta: {
        title: '托盘管理',
      },
      company: COMPANY.RS,
      id: 990020,
      component: () => import('@/views/tray/manage/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.TrayManageCheck,
          name: 'reRecheck',
          title: '复核权限',
        },
        {
          id: StoreButtonEnum.TrayListPrint,
          title: '打印',
        },
        {
          id: StoreButtonEnum.TrayListRePrint,
          title: '补打',
        },
        {
          id: StoreButtonEnum.TrayListDisable,
          title: '停用',
        },
      ],
    },
    {
      path: 'relocation',
      name: 'TrayRelocation',
      meta: {
        title: '托盘移库',
      },
      company: COMPANY.RS,

      id: 990030,
      component: () => import('@/views/tray/relocation/index.vue'),
    },
    {
      path: 'outInStore',
      name: 'TrayOutInStore',
      meta: {
        title: '托盘出入库',
      },
      company: COMPANY.RS,

      authElements: [
        {
          id: StoreButtonEnum.TrayOutStore,
          title: '出库',
        },
        {
          id: StoreButtonEnum.TrayInStore,
          title: '入库',
        },
      ],
      id: 990040,
      component: () => import('@/views/tray/outInStore/index.vue'),
    },
    {
      path: 'ferry',
      name: 'Ferry',
      meta: {
        title: '托盘越库',
      },
      company: COMPANY.RS,

      id: 990060,
      component: () => import('@/views/tray/ferry/index.vue'),
    },
    {
      path: 'site',
      name: 'PlasmaSite',
      company: COMPANY.RS,

      meta: {
        title: '站点管理',
      },
      authElements: [
        {
          id: StoreButtonEnum.PlasmaSiteAdd,
          title: '新增',
        },
        {
          id: StoreButtonEnum.PlasmaSiteUpdate,
          title: '编辑',
        },

        {
          id: StoreButtonEnum.PlasmaSiteDisable,
          title: '禁用',
        },
        {
          id: StoreButtonEnum.PlasmaSiteEnable,
          title: '启用',
        },
      ],
      id: 990050,
      component: () => import('@/views/plasma-store/site/index.vue'),
    },
    {
      path: 'locationLayout',
      name: 'LocationLayout',
      meta: {
        title: '平面图',
      },
      company: COMPANY.RS,

      id: 990070,
      component: () => import('@/views/plasma-store/location-layout/index.vue'),
    },
  ],
};

export default storeManager;
