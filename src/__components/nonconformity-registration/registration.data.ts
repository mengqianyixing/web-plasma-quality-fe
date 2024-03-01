import { FormSchema } from '@/components/Form';
import {
  DictionaryItemKeyEnum,
  DictionaryReasonEnum,
  getSysSecondaryDictionary,
} from '@/api/_dictionary';

export const schemas: FormSchema[] = [
  {
    field: 'checker',
    component: 'InputSearch',
    label: '复核人',
    colProps: { span: 14 },
    required: true,
  },
  {
    field: 'fkFailedCode',
    component: 'ApiSelect',
    label: '不合格原因',
    colProps: { span: 14 },
    componentProps: {
      api: getSysSecondaryDictionary,
      params: {
        dataKey: DictionaryReasonEnum.PlasmaFailedReason,
        dictItemTypes: [DictionaryItemKeyEnum.PlasmaFailed],
      },
      valueField: 'dictItemId',
    },
    required: true,
  },
  {
    field: 'fkBagNo',
    component: 'Input',
    label: '血浆编号',
    colProps: { span: 14 },
    required: true,
  },
];
