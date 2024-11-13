/*
 * @Author: HxB
 * @Date: 2023-12-25 16:00:06
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:37:59
 * @Description: 入库管理
 * @FilePath: \psms-fe\src\router\routes\modules\inbound-management\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { PlasmaInboundRecordButtonEnum, ReCheckButtonEnum } from '@/enums/authCodeEnum';
import { COMPANY } from '@/enums/company';

const inboundmanagement: AppRouteModule = {
  path: '/inboundmanagement',
  name: 'Inboundmanagement',
  component: LAYOUT,
  id: 98,
  menuWeight: 980,
  meta: {
    orderNo: 10001,
    title: '入库管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'ReceivePlasma',
      name: 'ReceivePlasma',
      id: 980010,
      meta: {
        title: '血浆接收',
      },
      component: () => import('@/views/inbound-management/receive-plasma/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.PlasmaReceiveSuspend,
          title: '暂停接收',
        },
        {
          id: ReCheckButtonEnum.PlasmaReceiveTray,
          title: '托盘入库',
          company: COMPANY.RS,
        },
        {
          id: ReCheckButtonEnum.PlasmaReceiveBatch,
          title: '接收(整批)',
        },
      ],
    },
    {
      path: 'AcceptPlasma',
      name: 'AcceptPlasma',
      id: 980020,
      meta: {
        title: '血浆验收',
      },
      company: COMPANY.RS,
      component: () => import('@/views/inbound-management/accept-plasma/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.PlasmaVerifyReCheckLogin,
          name: 'reCheckLogin',
          title: '复核人登录',
        },
        {
          id: ReCheckButtonEnum.UnqualifiedPlasmaCheck,
          name: 'plasmaRecheck',
          title: '不合格血浆登记复核人权限',
        },
        {
          id: ReCheckButtonEnum.UnqualifiedPlasma,
          title: '不合格血浆登记',
        },
        {
          id: ReCheckButtonEnum.UnqualifiedSampleCheck,
          name: 'sampleRecheck',
          title: '不合格样本登记复核人权限',
        },
        {
          id: ReCheckButtonEnum.UnqualifiedSample,
          title: '不合格样本登记',
        },
        {
          id: ReCheckButtonEnum.MissNumCheck,
          name: 'missRecheck',
          title: '缺浆登记复核人权限',
        },
        {
          id: ReCheckButtonEnum.MissNum,
          title: '缺浆登记',
        },
        {
          id: ReCheckButtonEnum.RevokeVerifyCheck,
          name: 'revokeRecheck',
          title: '撤销验收复核人权限',
        },
        {
          id: ReCheckButtonEnum.PlasmaSuspendBox,
          title: '箱暂停',
        },
        {
          id: ReCheckButtonEnum.PlasmaSuspendBatch,
          title: '批暂停',
        },
        {
          id: ReCheckButtonEnum.PlasmaSuspendCheck,
          name: 'suspendRecheck',
          title: '批暂停复核人权限',
        },
        {
          id: ReCheckButtonEnum.PlasmaVerifyComplete,
          title: '完成验收',
        },
        {
          id: ReCheckButtonEnum.PlasmaVerifyTrayIn,
          title: '托盘入库',
        },
        {
          id: ReCheckButtonEnum.PlasmaVerifyTrayOut,
          title: '托盘出库',
        },
      ],
    },

    {
      path: 'plasma-inbound-record',
      name: 'PlasmaInboundRecord',
      meta: {
        title: '血浆入库记录',
      },
      id: 980030,
      component: () => import('@/views/inbound-management/plasma-inbound-record/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.PMSAccept,
          name: 'pmsAccept',
          title: 'PMS验收',
        },
        {
          id: ReCheckButtonEnum.PMSAcceptCancel,
          name: 'pmsAcceptCancel',
          title: 'PMS验收撤销',
          company: COMPANY.RS,
        },
        {
          id: ReCheckButtonEnum.PlasmaInboundRecordCheck,
          name: 'reCheckRecordLogin',
          title: '不合格暂存复核人登录',
        },
        {
          id: ReCheckButtonEnum.RegisterWeightCheck,
          name: 'registerWeight',
          title: '重量登记复核人登录',
          company: COMPANY.RS,
        },
        {
          id: ReCheckButtonEnum.UnqualifiedStage,
          name: 'unqualifiedStage',
          title: '不合格暂存',
        },
        {
          id: ReCheckButtonEnum.WeightRegister,
          name: 'weightRegister',
          title: '重量登记',
          company: COMPANY.RS,
        },
        {
          id: ReCheckButtonEnum.VerifyRelease,
          name: 'verifyRelease',
          title: '验收发布',
        },
        {
          id: PlasmaInboundRecordButtonEnum.VerifyReport,
          name: 'verifyReport',
          title: '验收报告',
          company: [COMPANY.KM],
        },
      ],
    },
  ],
};

export default inboundmanagement;
