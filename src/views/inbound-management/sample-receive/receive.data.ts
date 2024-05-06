import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Form';
import { sampleReceiveStatusMap, sampleReceiveStatusValueEnum } from '@/enums/sampleEnum';
import { useStation } from '@/hooks/common/useStation';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();

export const sampleAcceptColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样本批号',
    dataIndex: 'batchSampleNo',
  },
  {
    title: '样本类型',
    dataIndex: 'sampleType',
    slots: { customRender: 'sampleType' },
  },
  {
    title: '样本数量',
    dataIndex: 'totalCount',
  },
  {
    title: '状态',
    dataIndex: 'acceptState',
    format: (text) => {
      return sampleReceiveStatusMap.get(<sampleReceiveStatusValueEnum>text) as string;
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'batchSampleNo',
    label: '样本批号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      options: stationOptions,
    },
  },
  {
    field: 'sampleType',
    label: '样本类型',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleType),
    },
  },
  {
    field: 'acceptState',
    label: '接收状态',
    component: 'Select',
    defaultValue: ['W', 'R'],
    componentProps: {
      mode: 'multiple',
      options: [...sampleReceiveStatusMap].map(([value, label]) => ({ value, label })),
    },
  },
  {
    field: '[acceptBeginAt, acceptEndAt]',
    label: '接收时间',
    component: 'RangePicker',
  },
];
