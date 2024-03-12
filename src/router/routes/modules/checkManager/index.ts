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
import { ReCheckButtonEnum, InspectButtonEnum } from '@/enums/authCodeEnum';

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
      path: 'materialPreRegistration',
      name: 'MaterialPreRegistration',
      id: 960030,
      authElements: [
        {
          id: InspectButtonEnum.MaterialPreRegistrationUpdateDate,
          title: '登记使用截止日期',
        },
        {
          id: InspectButtonEnum.MaterialPreRegistrationAdd,
          title: '新增',
        },
        {
          id: InspectButtonEnum.MaterialPreRegistrationUpdate,
          title: '编辑',
        },
        {
          id: InspectButtonEnum.MaterialPreRegistrationReview,
          title: '复核',
        },
        {
          id: InspectButtonEnum.MaterialPreRegistrationUnReview,
          title: '取消复核',
        },
        {
          id: InspectButtonEnum.MaterialPreRegistrationDisable,
          title: '停用',
        },
        {
          id: InspectButtonEnum.MaterialPreRegistrationEnable,
          title: '启用',
        },
      ],
      meta: {
        title: '检测物料登记',
      },
      component: () => import('@/views/inspect/materialPreRegistration/index.vue'),
    },
    {
      path: 'resultRegistration',
      name: 'ResultRegistration',
      meta: {
        title: '检验结果录入',
      },
      id: 960010,
      component: () => import('@/views/inspect/resultRegistration/index.vue'),
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
        {
          id: InspectButtonEnum.ResultRegistrationSelect,
          title: '选择',
        },
        {
          id: InspectButtonEnum.ResultRegistrationItemAdd,
          title: '新增检测项目',
        },
        {
          id: InspectButtonEnum.ResultRegistrationRegist,
          title: '登记完成',
        },
        {
          id: InspectButtonEnum.ResultRegistrationReRegist,
          title: '撤销登记',
        },
        {
          id: InspectButtonEnum.ResultRegistrationItemDelete,
          title: '删除检测项目',
        },
        {
          id: InspectButtonEnum.ResultRegistrationItemUnq,
          title: '检测不合格登记',
        },
        {
          id: InspectButtonEnum.ResultRegistrationItemNotCheck,
          title: '检测不合格未登记',
        },
        {
          id: InspectButtonEnum.ResultRegistrationSqImport,
          title: '思桥效价导入',
        },
        {
          id: InspectButtonEnum.ResultRegistrationTiterImport,
          title: '效价导入',
        },
        {
          id: InspectButtonEnum.ResultRegistrationTiterRegist,
          title: '效价结果录入',
        },
        {
          id: InspectButtonEnum.ResultRegistrationTiterNotCheck,
          title: '效价未检测登记',
        },
        {
          id: InspectButtonEnum.ResultRegistrationMaterialRegist,
          title: '物料新增',
        },
        {
          id: InspectButtonEnum.ResultRegistrationMaterialReRegist,
          title: '物料撤销',
        },
      ],
    },
    {
      path: 'reportRelease',
      name: 'ReportRelease',
      meta: {
        title: '检验报告发布',
      },
      id: 960020,
      authElements: [
        {
          id: InspectButtonEnum.ReportReleaseCreate,
          title: '报告生成',
        },
        {
          id: InspectButtonEnum.ReportReleaseUnCreate,
          title: '撤销生成',
        },
        {
          id: InspectButtonEnum.ReportReleaseProcess,
          title: '复核',
        },
        {
          id: InspectButtonEnum.ReportReleaseUnProcess,
          title: '撤销复核',
        },
        {
          id: InspectButtonEnum.ReportReleaseRelease,
          title: '发布',
        },
        {
          id: InspectButtonEnum.ReportReleasePrintBack,
          title: '打印回访样本检检验报告',
        },
        {
          id: InspectButtonEnum.ReportReleasePrintCheck,
          title: '打印原料血浆检验报告',
        },
      ],
      component: () => import('@/views/inspect/reportRelease/index.vue'),
    },
  ],
};

export default checkManager;
