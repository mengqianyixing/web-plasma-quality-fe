/*
 * @Author: HxB
 * @Date: 2024-01-11 09:17:02
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 14:30:41
 * @Description: 样本管理
 * @FilePath: \psms-fe\src\router\routes\modules\sampleManager\index.ts
 */
import type { AppRouteModule } from '@/router/types';
import { COMPANY } from '@/enums/company';

import { LAYOUT } from '@/router/constant';
import { ReCheckButtonEnum, SampleManageButtonEnum } from '@/enums/authCodeEnum';

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
      component: () => import('@/views/sample-manage/sample-receive/index.vue'),
      authElements: [
        {
          id: SampleManageButtonEnum.SampleAccept,
          title: '接收',
        },
      ],
    },
    {
      path: 'sample-verify',
      name: 'SampleVerify',
      meta: {
        title: '样本验收',
      },
      id: 970020,
      component: () => import('@/views/sample-manage/sample-verify/index.vue'),
      authElements: [
        {
          id: ReCheckButtonEnum.NonconformitySampleCheck,
          name: 'reCheckSampleVerifyLogin',
          title: '样本不合格复核人登录',
        },
        {
          id: ReCheckButtonEnum.NonconformitySampleRevokeRegisterCheck,
          name: 'reCheckSampleVerify',
          title: '撤销登记复核人登录',
        },
        {
          id: SampleManageButtonEnum.NonconformitySampleRevokeRegister,
          title: '不合格登记',
        },
        {
          id: SampleManageButtonEnum.CompleteSampleVerify,
          title: '完成验收',
        },
        {
          id: SampleManageButtonEnum.RevokeSampleVerify,
          title: '撤销验收',
        },
        {
          id: ReCheckButtonEnum.SampleRevokeVerifyCheck,
          title: '撤销验收复核人登录',
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
      authElements: [
        {
          id: SampleManageButtonEnum.SampleRelease,
          title: '发布',
        },
        {
          id: SampleManageButtonEnum.SampleArrange,
          title: '查看试管架',
        },
      ],
    },
    {
      path: 'reserve-sample-warehouse',
      name: 'ReserveSampleWarehouse',
      id: 970110,
      meta: {
        title: '保留样本入库',
      },
      company: COMPANY.RS,

      component: () => import('@/views/sample-manage/reserve-sample-warehouse/index.vue'),
      authElements: [
        {
          id: SampleManageButtonEnum.ReserveSampleWarehouseIn,
          title: '入库',
        },
        {
          id: SampleManageButtonEnum.ReserveSampleWarehouseAccept,
          title: '接收完成',
        },
      ],
    },
    {
      path: 'reserve-sample-destroy-outbound-single',
      name: 'ReserveSampleDestroyOutboundSingle',
      id: 970200,
      meta: {
        title: '保留样本单个出库',
      },
      authElements: [
        {
          id: SampleManageButtonEnum.SampleWarehouseAdd,
          title: '新增',
        },
        {
          id: SampleManageButtonEnum.SampleWarehouseEdit,
          title: '编辑',
        },
        {
          id: SampleManageButtonEnum.SampleWarehouseSubmit,
          title: '提交申请',
        },
        {
          id: SampleManageButtonEnum.SampleWarehouseCancelApply,
          title: '撤销申请',
        },
        {
          id: SampleManageButtonEnum.SampleWarehouseCheck,
          title: '审核',
        },
        {
          id: SampleManageButtonEnum.SampleWarehouseCancelCheck,
          title: '撤销审核',
        },
        {
          id: SampleManageButtonEnum.SampleWarehouseOutBand,
          title: '出库',
          company: COMPANY.RS,
        },
        {
          id: SampleManageButtonEnum.SampleWarehouseOutBandWMS,
          title: 'WMS出库',
          company: COMPANY.KM,
        },
        {
          id: SampleManageButtonEnum.SampleWarehouseExport,
          title: '导出',
        },
      ],
      component: () =>
        import('@/views/sample-manage/reserve-sample-destroy-outbound-single/index.vue'),
    },
    {
      path: 'reserve-sample-destroy-outbound',
      name: 'ReserveSampleDestroyOutbound',
      id: 970100,
      meta: {
        title: '保留样本销毁出库',
      },
      authElements: [
        {
          id: SampleManageButtonEnum.SampleDestroyAdd,
          title: '新增',
        },
        {
          id: SampleManageButtonEnum.SampleDestroyEdit,
          title: '编辑',
        },
        {
          id: SampleManageButtonEnum.SampleDestroySubmit,
          title: '提交申请',
        },
        {
          id: SampleManageButtonEnum.SampleDestroyCancelApply,
          title: '撤销申请',
        },
        {
          id: SampleManageButtonEnum.SampleDestroyCheck,
          title: '审核',
        },
        {
          id: SampleManageButtonEnum.SampleDestroyCancelCheck,
          title: '撤销审核',
        },
        {
          id: SampleManageButtonEnum.SampleDestroyOutBand,
          title: '出库',
          company: COMPANY.RS,
        },
        {
          id: SampleManageButtonEnum.SampleDestroyOutBandWMS,
          title: 'WMS出库',
          company: COMPANY.KM,
        },
        {
          id: SampleManageButtonEnum.SampleDestroyPrint,
          title: '打印',
        },
      ],
      component: () => import('@/views/sample-manage/reserve-sample-destroy-outbound/index.vue'),
    },

    // {
    //   path: 'test-plan',
    //   name: 'TestPlan',
    //   id: 970040,
    //   company: COMPANY.RS,
    //   meta: { title: '检测计划' },
    //   component: () => import('@/views/sample-manage/testPlan/index.vue'),
    //   authElements: [
    //     {
    //       id: SampleManageButtonEnum.TestPlanAdd,
    //       title: '新增',
    //     },
    //     {
    //       id: SampleManageButtonEnum.TestPlanUpdate,
    //       title: '编辑',
    //     },
    //   ],
    // },
  ],
};

export default sampleManager;
