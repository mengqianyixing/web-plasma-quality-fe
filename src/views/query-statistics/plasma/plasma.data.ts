import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import dayjs from 'dayjs';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { SERVER_ENUM } from '@/enums/serverEnum';

const serverEnumStore = useServerEnumStoreWithOut();

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 150,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    width: 150,
  },
  {
    title: '浆站箱号',
    dataIndex: 'stationBoxNo',
    width: 150,
  },
  {
    title: '现存箱号',
    dataIndex: 'currBoxNo',
    width: 150,
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
    width: 150,
  },
  {
    title: '采集日期',
    dataIndex: 'collectAt',
    width: 150,
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    width: 100,
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
    width: 100,
  },
  {
    title: '浆员状态',
    dataIndex: 'donorStatus',
    width: 100,
  },
  {
    title: '血型',
    dataIndex: 'bloodType',
    width: 100,
  },
  {
    title: '来浆类型',
    dataIndex: 'plasmaTypeFromStation',
    width: 100,
    format: (text) => {
      return `${text}, ${serverEnumStore.getServerEnumText(SERVER_ENUM.ImmType)(text)}`;
    },
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
    width: 100,
    format: (text) => {
      return `${text}, ${serverEnumStore.getServerEnumText(SERVER_ENUM.ImmType)(text)}`;
    },
  },
  {
    title: '浆站净重(g)',
    dataIndex: 'stationNetweight',
    width: 100,
  },
  {
    title: '验收净重(g)',
    dataIndex: 'verifyNetweight',
    width: 100,
  },
  {
    title: '血浆过程状态',
    dataIndex: 'plasmaStatus',
    width: 200,
  },
  {
    title: '检疫期类型',
    dataIndex: 'trackedType',
    width: 100,
  },
  {
    title: '血浆不合格原因',
    dataIndex: 'plasmaUnqualifiedReason',
    slots: { customRender: 'plasmaUnqualifiedReason' },
    width: 150,
  },
  {
    title: '血浆复检信息',
    children: [
      {
        title: '结果发布日期',
        dataIndex: ['reCheckInfo', 'issueAt'],
        width: 150,
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
      },
      {
        title: '复检结果',
        dataIndex: ['reCheckInfo', 'reCheckResult'],
        width: 150,
      },
      {
        title: '不合格项目',
        dataIndex: ['reCheckInfo', 'unqualifiedItems'],
        width: 150,
      },
      {
        title: '血浆类型',
        dataIndex: ['reCheckInfo', 'immunityType'],
        format: (text) => {
          return `${text}, ${serverEnumStore.getServerEnumText(SERVER_ENUM.ImmType)(text)}`;
        },
        width: 150,
      },
      {
        title: '效价结果值',
        dataIndex: ['reCheckInfo', 'titer'],
        width: 150,
      },
    ],
  },
  {
    title: '检疫期参考信息',
    dataIndex: 'trackedSeeInfo',
    children: [
      {
        title: '满足日期',
        dataIndex: ['trackedSeeInfo', 'qualifiedDate'],
        width: 150,
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
      },
      {
        title: '样本批号',
        dataIndex: ['trackedSeeInfo', 'batchSampleNo'],
        width: 150,
      },
      {
        title: '样本编号',
        dataIndex: ['trackedSeeInfo', 'sampleNo'],
        width: 150,
      },
      {
        title: '采集日期',
        dataIndex: ['trackedSeeInfo', 'collectAt'],
        width: 150,
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
      },
      {
        title: '浆站检验日期',
        dataIndex: ['trackedSeeInfo', 'stationCheckDate'],
        width: 150,
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
      },
      {
        title: '厂家复检日期',
        dataIndex: ['trackedSeeInfo', 'reCheckDate'],
        width: 150,
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
      },
      {
        title: '样本结果',
        dataIndex: ['trackedSeeInfo', 'reCheckResult'],
        width: 150,
      },
      {
        title: '不合格项目',
        dataIndex: ['trackedSeeInfo', 'unqualifiedItems'],
        width: 150,
      },
    ],
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationOutboundStatus',
    label: '浆站出库状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '已出库', value: '1' },
        { label: '未出库', value: '0' },
      ],
    },
  },
  {
    field: '[collectBeginAt, collectEndAt]',
    label: '采集日期',
    component: 'RangePicker',
  },
  {
    field: 'currBoxNo',
    label: '现存箱号',
    component: 'Input',
  },
  {
    field: 'donorNo',
    label: '浆员编号',
    component: 'Input',
  },
  {
    field: 'donorName',
    label: '浆员姓名',
    component: 'Input',
  },
  {
    field: 'donorStatus',
    label: '浆员状态',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.DonorStatus),
    },
  },
  {
    field: 'bloodType',
    label: '血型',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BloodType),
    },
  },
  {
    field: 'bagNo',
    label: '血浆编号',
    component: 'Input',
  },
  {
    field: 'plasmaTypeFromStation',
    label: '来浆类型',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: 'minStationNetweight',
    label: '最小浆站净重',
    component: 'Input',
  },
  {
    field: 'maxStationNetweight',
    label: '最大浆站净重',
    component: 'Input',
  },
  {
    field: '[seeSampleCollectBeginAt, seeSampleCollectEndAt]',
    label: '参考样本采集日期',
    component: 'RangePicker',
  },
  {
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
  },
  {
    field: 'warehousingStatus',
    label: '入库状态',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.WarehousingStatusEnum),
    },
  },
  {
    field: 'minVerifyNetweight',
    label: '最小验收净重',
    component: 'Input',
  },
  {
    field: 'maxVerifyNetweight',
    label: '最大验收净重',
    component: 'Input',
  },
  {
    field: '[trackedQualifiedBeginAt, trackedQualifiedEndAt]',
    label: '检疫期满足日期',
    component: 'RangePicker',
  },
  {
    field: 'plasmaStatus',
    label: '血浆过程状态',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BagFlow),
    },
  },
  {
    field: 'plasmaType',
    label: '血浆类型',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: 'minTiter',
    label: '最小效价结果值',
    component: 'Input',
  },
  {
    field: 'maxTiter',
    label: '最大效价结果值',
    component: 'Input',
  },
  {
    field: 'seeSampleType',
    label: '参考样本类型',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleType),
    },
  },
  {
    field: 'trackedStatus',
    label: '检疫期状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '不满足', value: '0' },
        { label: '满足', value: '1' },
      ],
    },
  },
  {
    field: 'seeBatchNo',
    label: '参考批号',
    component: 'Input',
  },
  {
    field: 'seeSampleNo',
    label: '参考样本',
    component: 'Input',
  },
  {
    field: 'trackedType',
    label: '检疫期类型',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BagTrackedType),
    },
  },
  {
    field: 'reCheckResult',
    label: '复检结果',
    component: 'Select',
    componentProps: {
      options: [
        { label: '不合格', value: '0' },
        { label: '合格', value: '1' },
      ],
    },
  },
  {
    field: 'plasmaUnqualifiedReason',
    label: '血浆不合格原因',
    component: 'Select',
  },
  {
    field: 'seeSampleResult',
    label: '参考样本结果',
    component: 'Select',
    componentProps: {
      options: [
        { label: '不合格', value: '0' },
        { label: '合格', value: '1' },
      ],
    },
  },
];
