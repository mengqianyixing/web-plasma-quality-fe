import { BasicColumn, FormSchema } from '@/components/Table';
import { getListApi } from '@/api/inspect/itemSetting';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();

export const columns: BasicColumn[] = [
  {
    title: '样本类型',
    dataIndex: 'sampleType',
  },

  {
    title: '血浆类型',
    dataIndex: 'rawImm',
  },
  {
    title: '必检项目',
    dataIndex: 'projectCodes',
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
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    label: '必检项目',
    field: 'projectIds',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      mode: 'multiple',
      api: () =>
        new Promise((rs) => {
          getListApi({ currPage: 1, pageSize: 100 }).then((res) => {
            rs(res.result);
          });
        }),
      labelField: 'projectAbbr',
      valueField: 'projectId',
    },
  },
];
