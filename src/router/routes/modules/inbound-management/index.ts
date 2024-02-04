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
import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

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
      path: 'receiveplasma',
      name: 'Receiveplasma',
      id: 980010,
      meta: {
        title: '血浆接收',
      },
      component: () => import('@/views/inbound-management/receive-plasma/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.PlasmaReceiveSuspendCheck,
          name: 'reCheckLogin',
          title: '暂停接收复核人登录',
        },
      ],
    },
    {
      path: 'acceptplasma',
      name: 'Acceptplasma',
      id: 980020,
      meta: {
        title: '血浆验收',
      },
      component: () => import('@/views/inbound-management/accept-plasma/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.MissNumCheck,
          name: 'missRecheck',
          title: '缺号登记复核人权限',
        },
        {
          id: ReCheckButtonEnum.UnqualifiedPlasmaCheck,
          name: 'plasmaRecheck',
          title: '不合格血浆登记复核人权限',
        },
        {
          id: ReCheckButtonEnum.UnqualifiedSampleCheck,
          name: 'sampleRecheck',
          title: '不合格样本登记复核人权限',
        },
        {
          id: ReCheckButtonEnum.RevokeVerifyCheck,
          name: 'revokeRecheck',
          title: '撤销验收复核人权限',
        },
        {
          id: ReCheckButtonEnum.PlasmaVerifyReCheckLogin,
          name: 'reCheckLogin',
          title: '复核人登录',
        },
        {
          id: ReCheckButtonEnum.PlasmaSuspendCheck,
          name: 'suspendRecheck',
          title: '暂停验收复核人权限',
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
          id: ReCheckButtonEnum.PlasmaInboundRecordCheck,
          name: 'reCheckRecordLogin',
          title: '不合格暂存复核人登录',
        },
        {
          id: ReCheckButtonEnum.RegisterWeightCheck,
          name: 'registerWeight',
          title: '登记称重复核人',
        },
      ],
    },
  ],
};

export default inboundmanagement;
