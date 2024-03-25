import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);
const TiterLevel = serverEnumStore.getServerEnumText(SERVER_ENUM.TiterLevel);

export const columns: BasicColumn[] = [
  {
    title: '血浆类型',
    dataIndex: 'plasmaType',
    customRender: ({ record }) => {
      return PlasmaType(record.plasmaType);
    },
  },
  {
    title: '代码',
    dataIndex: 'itemValue',
    slots: { customRender: 'itemValue' },
  },
  {
    title: 'ERP物料编码',
    dataIndex: 'materialCode',
  },
  {
    title: '名称',
    dataIndex: 'itemKey',
  },
  {
    title: '效价结果',
    dataIndex: 'titerType',
    format: (text) => TiterLevel(text),
  },

  {
    title: '排序号',
    dataIndex: 'sort',
  },
  {
    title: '优先级',
    dataIndex: 'priority',
  },

  {
    title: '默认标记',
    dataIndex: 'defaultTag',
    customRender: ({ record }) => {
      return record.defaultTag ? '是' : '否';
    },
  },
  {
    title: '是否启用',
    dataIndex: 'enable',
    customRender: ({ record }) => {
      return record.enable ? '是' : '否';
    },
  },
];

export const searchFormschema: FormSchema[] = [
  {
    field: 'plasmaType',
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    field: 'itemValue',
    component: 'Input',
    label: '代码',
  },
  {
    field: 'itemKey',
    component: 'Input',
    label: '名称',
  },
];
export const formListSchema: FormSchema[] = [
  {
    field: 'itemValue',
    component: 'Input',
    label: '代码',
    required: true,
    rules: [
      {
        trigger: 'blur',
        validator: (rule, value) => {
          if (!value) return Promise.resolve();
          if (!/^[a-zA-Z0-9]*$/.test(value)) return Promise.reject('只能输入字母、数字');
          return Promise.resolve();
        },
      },
    ],
  },
  {
    field: 'plasmaType',
    component: 'Select',
    label: '血浆类型',
    required: true,
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },

  {
    field: 'itemKey',
    component: 'Input',
    label: '名称',
    required: true,
  },
  {
    field: 'materialCode',
    component: 'Input',
    label: 'ERP物料编码',
  },
  {
    field: 'titerType',
    component: 'Select',
    label: '效价结果',
    required: true,
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.TiterLevel),
    },
  },
  {
    field: 'min',
    component: 'InputNumber',
    label: '效价最小值(大于等于)',
    defaultValue: null,
    componentProps: {
      min: 0,
      formatter: (n: string) => {
        if (/\.[0-9]{2}/.test(n)) return n.replace(/([0-9]+\.[0-9]{1,1})[0-9]+/, '$1');
        return n;
      },
    },
  },
  {
    field: 'max',
    component: 'InputNumber',
    label: '效价最大值(小于)',
    defaultValue: null,
    componentProps: {
      min: 0,
      formatter: (n: string) => {
        if (/\.[0-9]{2}/.test(n)) return n.replace(/([0-9]+\.[0-9]{1,1})[0-9]+/, '$1');
        return n;
      },
    },
  },
  {
    field: 'sort',
    component: 'InputNumber',
    label: '排序号',
    required: true,
  },
  {
    field: 'priority',
    component: 'InputNumber',
    label: '优先级',
    required: true,
  },
  {
    field: 'defaultTag',
    component: 'Select',
    label: '默认标记',
    required: true,
    defaultValue: false,
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        { label: '否', value: false },
      ],
    },
  },
  {
    field: 'enable',
    component: 'Select',
    label: '是否启用',
    required: true,
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        { label: '否', value: false },
      ],
    },
  },
];
