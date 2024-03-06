import { BasicColumn, FormSchema } from '@/components/Table';
import { getInspectMethodListApi } from '@/api/inspect/inspectMethod';
import {
  DictionaryItemKeyEnum,
  DictionaryReasonEnum,
  getSysSecondaryDictionary,
} from '@/api/_dictionary';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();

export const columns: BasicColumn[] = [
  {
    title: '项目代码',
    dataIndex: 'projectCode',
    slots: { customRender: 'projectCode' },
  },
  {
    title: '简称',
    dataIndex: 'projectAbbr',
  },
  {
    title: '全称',
    dataIndex: 'projectName',
  },
  {
    title: '检测方法',
    dataIndex: 'method',
  },

  {
    title: '判断标准',
    dataIndex: 'standard',
  },
  {
    title: '排序号',
    dataIndex: 'sort',
  },
  {
    title: '是否启用',
    dataIndex: 'state',
    customRender: ({ record }) => {
      return record.state ? '否' : '是';
    },
  },
  {
    title: '记录人',
    dataIndex: 'creator',
  },
  {
    title: '记录时间',
    dataIndex: 'createAt',
  },
];

export const searchFormschema: FormSchema[] = [
  {
    field: 'projectCode',
    component: 'Input',
    label: '项目代码',
  },
  {
    field: 'projectName',
    component: 'Input',
    label: '全称',
  },
  {
    field: 'projectAbbr',
    component: 'Input',
    label: '简称',
  },
];
export const formListSchema: FormSchema[] = [
  {
    field: 'projectCode',
    component: 'Input',
    label: '项目代码',
    required: true,
    rules: [
      {
        trigger: 'blur',
        validator: (rule, value) => {
          if (!value) return Promise.resolve();
          if (!/^[a-zA-Z0-9-]*$/.test(value)) return Promise.reject('只能输入字母、数字、中划线');
          return Promise.resolve();
        },
      },
    ],
  },
  {
    field: 'projectName',
    component: 'Input',
    label: '全称',
    required: true,
  },
  {
    field: 'projectAbbr',
    component: 'Input',
    label: '简称',
    required: true,
  },
  {
    field: 'plasmaType',
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    field: 'refuse',
    component: 'Select',
    label: '永拒浆员',
    required: true,
    componentProps: {
      options: [
        {
          label: '是',
          value: 0,
        },
        { label: '否', value: 1 },
      ],
    },
  },
  {
    field: 'sort',
    component: 'InputNumber',
    label: '排序号',
    required: true,
  },
  {
    field: 'state',
    component: 'Select',
    label: '是否启用',
    required: true,
    componentProps: {
      options: [
        {
          label: '是',
          value: 0,
        },
        { label: '否', value: 1 },
      ],
    },
  },
  {
    field: 'standard',
    component: 'Select',
    label: '判断标准',
    required: true,
    componentProps: {
      options: [
        { value: '阴性', label: '阴性' },
        { value: '效价', label: '效价' },
        { value: '≤50U/L', label: '≤50U/L' },
        { value: '≥50g/L', label: '≥50g/L' },
      ],
    },
  },
  {
    field: 'requiredMaterials',
    component: 'CheckboxGroup',
    label: '检测必须物料',
    required: true,
    defaultValue: ['试剂'],
    componentProps: {
      options: [
        { label: '试剂', value: '试剂', disabled: true },
        { label: '质控物', value: '质控物' },
        { label: '标准品', value: '标准品' },
      ],
    },
  },
  {
    field: 'method',
    component: 'ApiSelect',
    label: '检测方法',
    required: true,
    componentProps: {
      api: getInspectMethodListApi,
    },
  },
  {
    field: 'priceValidBit',
    component: 'InputNumber',
    label: '结果值有效位数',
    required: true,
    componentProps: {
      min: 0,
      formatter: (n: number) => n && parseInt(n),
    },
  },
  {
    field: 'checkNature',
    component: 'Select',
    label: '检测性质',
    componentProps: {
      options: [
        { label: '定量', value: '定量' },
        { label: '定性', value: '定性' },
      ],
    },
  },
  {
    field: 'checkUnqualifiedReason',
    component: 'ApiSelect',
    label: '检测不合格',
    componentProps: {
      api: getSysSecondaryDictionary,
      params: {
        dataKey: DictionaryReasonEnum.PlasmaFailedReason,
        dictItemTypes: [DictionaryItemKeyEnum.Test],
      },
      valueField: 'dictItemId',
    },
  },
  {
    field: 'periodUnqualifiedReason',
    component: 'ApiSelect',
    label: '检疫期不合格',
    componentProps: {
      api: getSysSecondaryDictionary,
      params: {
        dataKey: DictionaryReasonEnum.PlasmaFailedReason,
        dictItemTypes: [DictionaryItemKeyEnum.Quarantine],
      },
      valueField: 'dictItemId',
    },
  },
  {
    field: 'traceUnqualifiedReason',
    component: 'ApiSelect',
    label: '续追踪不合格',
    componentProps: {
      api: getSysSecondaryDictionary,
      params: {
        dataKey: DictionaryReasonEnum.PlasmaFailedReason,
        dictItemTypes: [DictionaryItemKeyEnum.Track],
      },
      valueField: 'dictItemId',
    },
  },
  {
    field: 'traceBack',
    component: 'Select',
    label: '追溯检疫期',
    required: true,
    componentProps: {
      options: [
        {
          label: '是',
          value: 0,
        },
        { label: '否', value: 1 },
      ],
    },
  },
  {
    field: 'recheck',
    component: 'Select',
    label: '进入复检',
    required: true,
    componentProps: {
      options: [
        {
          label: '是',
          value: 0,
        },
        { label: '否', value: 1 },
      ],
    },
  },
];
