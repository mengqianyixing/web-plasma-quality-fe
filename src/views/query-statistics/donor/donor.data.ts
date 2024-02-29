import { DescItem } from '@/components/Description';
import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { SERVER_ENUM } from '@/enums/serverEnum';

const serverEnumStore = useServerEnumStoreWithOut();
const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

// 查询条件：浆员编号、临时编号、浆员姓名
export const searchFormSchema: FormSchema[] = [
  {
    field: 'donorNo',
    label: '浆员编号',
    component: 'Input',
  },
  // {
  //   field: '',
  //   label: '临时编号',
  //   component: 'Input',
  // },
  {
    field: 'name',
    label: '浆员姓名',
    component: 'Input',
  },
];
// 查询结果1————浆员信息
export const donorSchema: DescItem[] = [
  {
    label: '采浆公司:',
    field: 'stationName',
  },
  {
    label: '浆员姓名:',
    field: 'name',
  },
  {
    label: '浆员编号:',
    field: 'donorNo',
  },
  {
    label: '性别:',
    field: 'gender',
  },
  {
    label: '身份证号:',
    field: 'idcardId',
  },
  {
    label: '建档日期:',
    field: 'createAt',
    render(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    label: '民族:',
    field: 'nation',
  },
  {
    label: '血型:',
    field: 'bloodType',
  },
  {
    label: '工作:',
    field: 'profession',
  },
  {
    label: '年龄:',
    field: 'age',
  },
  {
    label: '浆员状态:',
    field: 'donorStatus',
  },
  {
    label: '不合格依据日期:',
    field: 'blockCreateAt',
    render(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    label: '暂拒/淘汰原因:',
    field: 'failedCause',
  },
  {
    label: '淘汰系统:',
    field: 'blockSys',
  },
  {
    label: '身份证地址:',
    field: 'idcardAddress',
  },
  {
    label: '现居地址:',
    field: 'currentAddress',
  },
];
// 查询结果2————血浆明细
export const batchColumns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'fkBatchNo',
    width: 150,
  },
  {
    title: '浆站箱号',
    dataIndex: 'stationBoxNo',
    width: 150,
  },
  {
    title: '现存箱号',
    dataIndex: 'boxNo',
    width: 120,
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
    width: 150,
  },
  {
    title: '采集日期',
    dataIndex: 'collectAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
    width: 120,
  },
  {
    title: '来浆类型',
    dataIndex: 'rawImm',
    width: 120,
  },
  {
    title: '浆站净重 g',
    dataIndex: 'rawWeight',
    width: 100,
  },
  {
    title: '验收净重 g',
    dataIndex: 'netWeight',
    width: 100,
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
    width: 120,
    customRender: ({ record }) => {
      return PlasmaType(record.type);
    },
  },
  {
    title: '血浆过程状态',
    dataIndex: 'processState',
    width: 120,
  },
  {
    title: '血浆不合格原因',
    dataIndex: 'failed',
    width: 120,
  },
  {
    title: '血浆复检信息',
    dataIndex: 'reCheckInfo',
    children: [
      {
        title: '结果发布日期',
        dataIndex: 'issueAt',
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
        width: 150,
      },
      {
        title: '复检结果',
        dataIndex: 'reCheckResult',
        width: 100,
      },
      {
        title: '不合格项目',
        dataIndex: 'unqualifiedItems',
        width: 100,
      },
      {
        title: '血浆类型',
        dataIndex: 'immunityType',
        width: 100,
      },
      {
        title: '效价结果值',
        dataIndex: 'titer',
        width: 100,
      },
    ],
  },
  {
    title: '检疫期参考信息',
    dataIndex: 'trackedSeeInfo',
    children: [
      {
        title: '满足日期',
        dataIndex: 'qualifiedDate',
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
        width: 100,
      },
      {
        title: '样本批号',
        dataIndex: 'batchSampleNo',
        width: 100,
      },
      {
        title: '样本编号',
        dataIndex: 'sampleNo',
        width: 100,
      },
      {
        title: '采集日期',
        dataIndex: 'collectAt',
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
        width: 100,
      },
      {
        title: '浆站检验日期',
        dataIndex: 'stationCheckDate',
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
        width: 120,
      },
      {
        title: '厂家复检日期',
        dataIndex: 'reCheckDate',
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
        width: 120,
      },
      {
        title: '样本结果',
        dataIndex: 'reCheckResult',
        width: 100,
      },
      {
        title: '不合格项目',
        dataIndex: 'unqualifiedItems',
        width: 120,
      },
    ],
  },
];
// 查询结果3————回访明细
export const callbackColumns: BasicColumn[] = [
  {
    title: '样本批号',
    dataIndex: 'bsNo',
  },
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
  },
  {
    title: '采集日期',
    dataIndex: 'collectAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '结果发布日期',
    dataIndex: 'releaseAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '样本状态',
    dataIndex: 'state',
  },
  {
    title: '样本结果',
    dataIndex: 'reslut',
  },
  {
    title: '不合格项目',
    dataIndex: 'faild',
  },
];
// 查询结果4————效价趋势图
