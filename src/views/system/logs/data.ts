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
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
  },

  {
    title: '操作用户',
    dataIndex: 'operator',
  },
  {
    title: '功能',
    dataIndex: 'moduleName',
  },
  {
    title: '操作类型',
    dataIndex: 'optName',
  },
  {
    title: '操作内容',
    dataIndex: 'optContent',
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
    },
  },
  {
    field: 'optName',
    component: 'Select',
    label: '操作类型',
    componentProps: {},
  },
  {
    field: 'optContent',
    component: 'Input',
    label: '操作内容',
    componentProps: {},
  },
];
