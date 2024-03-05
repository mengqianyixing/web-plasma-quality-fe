/*
 * @Author: HxB
 * @Date: 2024-01-11 09:17:02
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:30:41
 * @Description: 样本管理
 * @FilePath: \psms-fe\src\router\routes\modules\sampleManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

const sampleManager: AppRouteModule = {
  path: '/sample-manage',
  name: 'SampleManage',
  component: LAYOUT,
  redirect: '/sample-manage/sample-release',
  id: 97,
  menuWeight: 970,
  meta: {
    orderNo: 30001,
    title: '样本管理',
    icon: 'ant-design:windows-outlined',
  },
  children: [
    {
      path: 'sample-accept',
      name: 'SampleAccept',
      meta: {
        title: '样本接收',
      },
      id: 970010,
      component: () => import('@/views/inbound-management/sample-receive/index.vue'),
    },
    {
      path: 'sample-verify',
      name: 'SampleVerify',
      meta: {
        title: '样本验收',
      },
      id: 970020,
      component: () => import('@/views/inbound-management/sample-verify/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.NonconformitySampleCheck,
          name: 'reCheckSampleVerifyLogin',
          title: '样本不合格复核人登录',
        },
        {
          id: ReCheckButtonEnum.NonconformitySampleRevokeRegisterCheck,
          name: 'reCheckSampleVerify',
          title: '撤销登记登录',
        },
      ],
    },
    {
      path: 'sample-release',
      name: 'SampleRelease',
      id: 970030,
      meta: {
        title: '样本发布',
      },
      component: () => import('@/views/sample-manage/sample-release/index.vue'),
    },
  ],
};

export default sampleManager;
