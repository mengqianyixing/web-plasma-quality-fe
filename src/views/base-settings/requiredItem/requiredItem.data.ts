import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { getListApi } from '@/api/inspect/itemSetting';
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
  },
];

export const formListSchema: FormSchema[] = [
  {
    label: '样本类型',
    field: 'sampleType',
    component: 'Select',
    required: true,
  },

  {
    label: '血浆类型',
    field: 'rawImm',
    component: 'Select',
    required: true,
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
