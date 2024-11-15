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
import { BaseSettingButtonEnum, ReCheckButtonEnum } from '@/enums/authCodeEnum';

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
      path: 'station',
      name: 'Station',
      id: 100070,
      meta: {
        title: '采浆公司',
      },
      authElements: [
        {
          id: BaseSettingButtonEnum.StationAdd,
          title: '新增',
        },
        {
          id: BaseSettingButtonEnum.StationEdit,
          title: '编辑',
        },
        {
          id: BaseSettingButtonEnum.StationEnable,
          name: 'stationEnable',
          title: '启用按钮权限',
        },
        {
          id: BaseSettingButtonEnum.StationDisable,
          name: 'stationDisable',
          title: '禁用按钮权限',
        },
        {
          id: BaseSettingButtonEnum.StationDisableCheck,
          title: '禁用复核人登录',
        },
      ],
      component: () => import('@/views/base-settings/station/index.vue'),
    },
    {
      path: `plasmaImmType`,
      name: 'PlasmaImmType',
      authElements: [
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonAdd,
          title: '新增',
        },
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonEdit,
          title: '编辑',
        },

        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonEnable,
          title: '启用',
        },
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonDisEnable,
          title: '禁用',
        },
        {
          id: BaseSettingButtonEnum.PlasmaImmTypeLogin,
          title: '血浆类型复核人登陆',
        },
      ],
      meta: {
        title: '血浆类型',
        dictId: '100009',
        systemLevel: 0,
      },
      id: 100090,
      component: () => import('@/views/system/dictionary/itemList.vue'),
    },

    {
      path: 'TiterType',
      name: 'TiterType',
      meta: {
        title: '效价类型',
      },
      authElements: [
        {
          id: BaseSettingButtonEnum.TiterTypeAdd,
          title: '新增',
        },
        {
          id: BaseSettingButtonEnum.TiterTypeUpdate,
          title: '编辑',
        },

        {
          id: BaseSettingButtonEnum.TiterTypeEnable,
          title: '启用',
        },
        {
          id: BaseSettingButtonEnum.TiterTypeDisable,
          title: '禁用',
        },
      ],
      id: 100010,
      component: () => import('@/views/inspect/titerType/index.vue'),
    },
    {
      path: 'InspectMethod',
      name: 'InspectMethod',
      id: 100020,
      authElements: [
        {
          id: BaseSettingButtonEnum.InspectMethodAdd,
          title: '新增',
        },
        {
          id: BaseSettingButtonEnum.InspectMethodUpdate,
          title: '编辑',
        },

        {
          id: BaseSettingButtonEnum.InspectMethodEnable,
          title: '启用',
        },
        {
          id: BaseSettingButtonEnum.InspectMethodDisable,
          title: '禁用',
        },
      ],
      meta: {
        title: '检测方法',
      },
      component: () => import('@/views/inspect/inspectMethod/index.vue'),
    },
    {
      path: 'ItemSetting',
      name: 'ItemSetting',
      meta: {
        title: '检测项目',
      },
      authElements: [
        {
          id: BaseSettingButtonEnum.ItemSettingAdd,
          title: '新增',
        },
        {
          id: BaseSettingButtonEnum.ItemSettingUpdate,
          title: '编辑',
        },
        {
          id: BaseSettingButtonEnum.ItemSettingDelete,
          title: '删除',
        },
        {
          id: BaseSettingButtonEnum.ItemSettingEnable,
          title: '启用',
        },
        {
          id: BaseSettingButtonEnum.ItemSettingDisable,
          title: '禁用',
        },
      ],
      id: 100030,
      component: () => import('@/views/inspect/itemSetting/index.vue'),
    },
    {
      path: 'requiredItem',
      name: 'RequiredItem',
      id: 100080,
      meta: {
        title: '必检项目设置',
      },
      authElements: [
        {
          id: ReCheckButtonEnum.RequiredItemCheck,
          name: 'requiredItemCheck',
          title: '必检项复核人登录',
        },
        {
          id: BaseSettingButtonEnum.RequiredItemAdd,
          title: '新增',
        },
        {
          id: BaseSettingButtonEnum.RequiredItemUpdate,
          title: '编辑',
        },
        {
          id: BaseSettingButtonEnum.RequiredItemDelete,
          title: '删除',
        },
      ],
      component: () => import('@/views/base-settings/requiredItem/index.vue'),
    },
    {
      path: `plasmaFailedReason`,
      name: 'PlasmaFailedReason',
      meta: {
        title: '血浆不合格原因',
        dictId: '110001',
        systemLevel: 0,
      },
      authElements: [
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonAdd,
          title: '新增',
        },
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonEdit,
          title: '编辑',
        },
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonEnable,
          title: '启用',
        },
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonDisEnable,
          title: '禁用',
        },
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonLogin,
          title: '血浆不合格复核人登陆',
        },
      ],
      id: 1000100,
      component: () => import('@/views/system/dictionary/itemList.vue'),
    },
    {
      path: `sampleFailedReason`,
      name: 'SampleFailedReason',
      meta: {
        title: '样本不合格原因',
        dictId: '110003',
        systemLevel: 0,
      },
      authElements: [
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonAdd,
          title: '新增',
        },
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonEdit,
          title: '编辑',
        },
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonEnable,
          title: '启用',
        },
        {
          id: BaseSettingButtonEnum.PlasmaFailedReasonDisEnable,
          title: '禁用',
        },
        {
          id: BaseSettingButtonEnum.SampleFailedReasonLogin,
          title: '样本不合格复核人登陆',
        },
      ],
      id: 1000110,
      component: () => import('@/views/system/dictionary/itemList.vue'),
    },
    {
      path: 'report',
      name: 'Report',
      id: 100050,
      authElements: [
        {
          id: BaseSettingButtonEnum.ReportAdd,
          title: '上传',
        },
        {
          id: BaseSettingButtonEnum.ReportUpdate,
          title: '编辑',
        },
      ],
      meta: {
        title: '报表设置',
      },
      component: () => import('@/views/system/report/index.vue'),
    },
    {
      path: 'params',
      name: 'Params',
      id: 100060,
      authElements: [
        {
          id: BaseSettingButtonEnum.SystemSettingEdit,
          title: '编辑',
        },
      ],
      meta: {
        title: '系统参数',
      },
      component: () => import('@/views/system/params/index.vue'),
    },
    // {
    //   path: 'encoding',
    //   name: 'TagEncoding',
    //   meta: {
    //     title: '系统编码管理',
    //   },
    //   id: 890020,
    //   component: () => import('@/views/tag-manage/encoding/index.vue'),
    // },
    {
      path: 'dictionary',
      name: 'Dictionary',
      meta: {
        title: '字典管理',
      },
      id: 100040,
      authElements: [
        // {
        //   id: BaseSettingButtonEnum.DictionaryAdd,
        //   title: '新增',
        // },
        // {
        //   id: BaseSettingButtonEnum.DictionaryUpdate,
        //   title: '编辑',
        // },
        // {
        //   id: BaseSettingButtonEnum.DictionaryDelete,
        //   title: '删除',
        // },
        {
          id: BaseSettingButtonEnum.DictionaryItemAdd,
          title: '字典项配置',
        },
      ],
      component: () => import('@/views/system/dictionary/index.vue'),
    },
  ],
};
export default callManager;
