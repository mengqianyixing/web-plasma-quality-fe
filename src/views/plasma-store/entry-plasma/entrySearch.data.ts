import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';
import dayjs from 'dayjs';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();
const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

export const entryColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    className: 'empty-value',
    width: 80,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    slots: { customRender: 'batchNo' },
    className: 'empty-value',
    width: 80,
  },
  {
    title: '血浆情况',
    children: [
      {
        title: '采集开始日期',
        dataIndex: 'collectStartDate',
        className: 'empty-value',
        width: 110,
      },
      {
        title: '采集结束日期',
        dataIndex: 'collectEndDate',
        className: 'empty-value',
        width: 110,
      },
      {
        title: '浆站出库日期',
        dataIndex: 'stationOutDate',
        className: 'empty-value',
        width: 110,
      },
      {
        title: '出库数量(袋)',
        dataIndex: 'outNum',
        className: 'empty-value',
        width: 90,
      },
      {
        title: '出库总净重(kg)',
        dataIndex: 'outWeight',
        className: 'empty-value',
        width: 80,
      },
    ],
  },
  {
    title: '入库情况',
    children: [
      {
        title: '接收日期',
        dataIndex: 'acceptDate',
        className: 'empty-value',
        width: 110,
      },
      {
        title: '验收发布人',
        dataIndex: 'verifyPublisher',
        className: 'empty-value',
        width: 80,
      },
      {
        title: '验收发布日期',
        dataIndex: 'verifyPubDate',
        className: 'empty-value',
        width: 100,
      },
      {
        title: '验收数量(袋)',
        dataIndex: 'verifyNum',
        slots: { customRender: 'verifyNum' },
        className: 'empty-value',
        width: 80,
      },
      {
        title: '验收总净重(kg)',
        dataIndex: 'verifyWeight',
        className: 'empty-value',
        width: 80,
      },
      {
        title: '差异数量(袋)',
        dataIndex: 'diffNum',
        className: 'empty-value',
        width: 100,
      },
      {
        title: '差异总净重(kg)',
        dataIndex: 'diffWeight',
        className: 'empty-value',
        width: 80,
      },
      {
        title: '验收合格数量(袋)',
        dataIndex: 'verifyPassNum',
        className: 'empty-value',
        width: 80,
      },
      {
        title: '验收不合格数量(袋)',
        dataIndex: 'verifyNoPassNum',
        slots: { customRender: 'verifyNoPassNum' },
        className: 'empty-value',
        width: 80,
      },
      {
        title: '不足量数量(袋)',
        dataIndex: 'shortFallNum',
        slots: { customRender: 'shortFallNum' },
        className: 'empty-value',
        width: 80,
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '采浆公司',
    component: 'Select',
    field: 'stationNo',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    label: '血浆批号',
    component: 'Input',
    field: 'batchNo',
  },
  {
    label: '接收日期',
    component: 'RangePicker',
    field: '[acceptStartDate, acceptEndDate]',
  },
  {
    label: '验收日期',
    component: 'RangePicker',
    field: '[verifyPubStartDate, verifyPubEndDate]',
  },
];

export const entryDetailModalColumns: BasicColumn[] = [
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
    dataIndex: 'cardNo',
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
      return `${text}, ${serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType)(text)}`;
    },
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
    width: 200,
    format: (text) => {
      return `${text ?? '--'}`;
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
        format(text: any) {
          if (text === 1) {
            return '合格';
          } else if (text === 0) {
            return '不合格';
          } else {
            return '-';
          }
        },
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
        format(text: any) {
          if (text === 1) {
            return '合格';
          } else if (text === 0) {
            return '不合格';
          } else {
            return '-';
          }
        },
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

export const verifyDetailColumns: BasicColumn[] = [
  {
    title: '血浆类型',
    dataIndex: 'immType',
    format: (text) => {
      return PlasmaType(text);
    },
    width: 90,
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
    width: 100,
  },
  {
    title: '血浆总数',
    dataIndex: 'plasmaNum',
    width: 100,
  },
  {
    title: '血浆总净重(kg)',
    dataIndex: 'plasmaWeight',
    width: 100,
  },
];

export const verifySumColumns: BasicColumn[] = [
  {
    title: '血浆类型',
    dataIndex: 'immType',
    format: (text) => {
      return PlasmaType(text);
    },
    width: 100,
  },
  {
    title: '血浆总数',
    dataIndex: 'plasmaNum',
    width: 100,
  },
  {
    title: '血浆总净重(kg)',
    dataIndex: 'plasmaWeight',
    width: 100,
  },
];

export const noPassSearchFormSchema: FormSchema[] = [
  {
    label: '浆站箱号',
    component: 'Input',
    field: 'boxNo',
  },
  {
    label: '血浆编号',
    component: 'Input',
    field: 'bagNo',
  },
  {
    label: '验收人',
    component: 'Input',
    field: 'receiver',
  },
];

export const noPassModalColumns: BasicColumn[] = [
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '浆员编号',
    dataIndex: 'cardNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
  },
  {
    title: '浆站箱号',
    dataIndex: 'boxNo',
  },
  {
    title: '采集日期',
    dataIndex: 'collectAt',
  },
  {
    title: '验收人',
    dataIndex: 'verifyBy',
  },
  {
    title: '复核人',
    dataIndex: 'verifyReviewer',
  },
  {
    title: '验收日期',
    dataIndex: 'verifyAt',
  },
  {
    title: '血浆净重(g)',
    dataIndex: 'verifyWeight',
  },
  {
    title: '不合格原因',
    dataIndex: 'unqReason',
  },
];

export const hortFallNumModalColumns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'name',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '来浆日期',
    dataIndex: 'collectDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '浆站净重',
    dataIndex: 'rawWeight',
  },
];
