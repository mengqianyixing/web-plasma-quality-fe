import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { getCasDoorAllUsers } from '@/api/oauth/auth';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
export const columns: BasicColumn[] = [
  {
    title: '操作时间',
    dataIndex: 'optTime',
    width: 150,
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    width: 130,
  },

  {
    title: '操作用户',
    dataIndex: 'operator',
    width: 120,
  },
  {
    title: '功能',
    dataIndex: 'moduleName',
    width: 120,
  },
  {
    title: '操作类型',
    dataIndex: 'optName',
    width: 220,
  },
  {
    title: '操作内容',
    dataIndex: 'optContent',
    ellipsis: false,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: '[createBeginAt,createEndAt]',
    component: 'RangePicker',
    label: '操作日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'userId',
    component: 'ApiSelect',
    label: '操作用户',
    componentProps: {
      api: getCasDoorAllUsers,
      labelField: 'displayName',
      valueField: 'name',
      optionFilterProp: 'label',
      showSearch: true,
    },
  },
  {
    field: 'moduleName',
    component: 'Select',
    label: '功能',
    componentProps: {
      options: (serverEnumStore.getServerEnum(SERVER_ENUM.BizModule) || []).map((it) => ({
        value: it.label,
        label: it.label,
      })),
      showSearch: true,
    },
  },
  {
    field: 'optName',
    component: 'Select',
    label: '操作类型',
    componentProps: {
      showSearch: true,
    },
  },
  {
    field: 'optContent',
    component: 'Input',
    label: '操作内容',
    componentProps: {},
  },
];
