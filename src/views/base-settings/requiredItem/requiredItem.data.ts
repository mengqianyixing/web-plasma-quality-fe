import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();

export const columns: BasicColumn[] = [
  {
    title: '样本类型',
    dataIndex: 'sampleType',
    width: 150,
  },

  {
    title: '血浆类型',
    dataIndex: 'rawImm',
    width: 150,
  },
  {
    title: '必检项目',
    dataIndex: 'projectCodes',
    ellipsis: false,
    format: (text: any) => (text || []).join('、'),
  },
  {
    title: '默认检测项目',
    ellipsis: false,
    dataIndex: 'defaultProjectCodes',
    format: (text: any) => (text || []).join('、'),
  },
];
export const sampleTypeSchema: FormSchema = {
  label: '样本类型',
  field: 'sampleType',
  component: 'Select',
  required: true,
  componentProps: {
    options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleType),
  },
};
export const formListSchema: FormSchema[] = [
  sampleTypeSchema,
  {
    label: '血浆类型',
    field: 'rawImm',
    component: 'Select',
    ifShow: false,
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    label: '必检项目',
    field: 'projectIds',
    component: 'Select',
    required: true,
    componentProps: {
      mode: 'multiple',
    },
  },
  {
    label: '默认检测项目',
    field: 'defaultProjectIds',
    component: 'Select',
    componentProps: {
      mode: 'multiple',
      labelField: 'projectAbbr',
      valueField: 'projectId',
    },
  },
];
