import { FormSchema } from '@/components/Form';
import { DictionaryEnum, getSysDictionary } from '@/api/_dictionary';

export const schemas: FormSchema[] = [
  {
    field: 'checker',
    component: 'InputGroup',
    slot: 'check',
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
      api: getSysDictionary,
      params: [DictionaryEnum.PlasmaUnqualifiedReason],
      resultField: '[0].dictImtes',
      labelField: 'label',
      valueField: 'value',
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
