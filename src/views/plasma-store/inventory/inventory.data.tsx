import { VxeGridPropTypes } from '@/components/VxeTable';
import { FormSchema } from '@/components/Form';
import { DictionaryEnum, getSysDictionary } from '@/api/_dictionary';
import { PlasmaOutboundTypeMap, PlasmaOutboundTypeValueEnum } from '@/enums/plasmaEnum';
import { getDilutionTypeApi } from '@/api/plasmaStore/inventory';
import { Select, RangePicker, FormItem, FormItemRest } from 'ant-design-vue';

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    type: 'seq',
    title: '序号',
    width: 80,
  },
  {
    title: '采浆公司',
    field: 'stationNo',
    width: 150,
    align: 'center',
  },
  {
    title: '入库数量(袋)',
    field: 'inNum',
    width: 150,
    showOverflow: 'tooltip',
  },
  {
    title: '入库重量(kg)',
    field: 'inWeight',
  },
  {
    title: '出库数量(袋)',
    field: 'outNum',
  },
  {
    title: '出库重量(kg)',
    field: 'outWeight',
  },
  {
    title: '结存数量(袋)',
    field: 'surplusNum',
  },
  {
    title: '结存重量(kg)',
    field: 'surplusWeight',
  },
  {
    title: '库房',
    field: 'bankNames',
    showOverflow: false,
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '采浆公司',
    field: 'stationNo',
    component: 'Select',
    colProps: {
      span: 5,
    },
  },
  {
    label: '血浆出库类型',
    field: 'dlvType',
    component: 'Select',
    componentProps: {
      options: [...PlasmaOutboundTypeMap.entries()]
        .map(([value, label]) => ({
          label,
          value,
        }))
        .filter((it) =>
          [
            PlasmaOutboundTypeValueEnum.PRO,
            PlasmaOutboundTypeValueEnum.RMT,
            PlasmaOutboundTypeValueEnum.DST,
            PlasmaOutboundTypeValueEnum.NPD,
          ].includes(it.value),
        ),
    },
    colProps: {
      span: 5,
    },
  },
  {
    required: true,
    field: 'dateKey',
    defaultValue: 'receipt',
    fields: ['date'],
    component: 'Input',
    label: '日期',
    render({ model, field }, { disabled }) {
      return (
        <div class="flex gap-2">
          <Select disabled={disabled} style="width: 120px;" allowClear v-model:value={model[field]}>
            <Select.Option value="receipt">接收日期</Select.Option>
            <Select.Option value="verify">发布验收日期</Select.Option>
          </Select>
          <FormItem name="date">
            <FormItemRest>
              <RangePicker v-model:value={model['date']} />
            </FormItemRest>
          </FormItem>
        </div>
      );
    },
    colProps: {
      span: 8,
    },
  },
  {
    label: '血浆批号',
    field: 'batchNo',
    component: 'Input',
    colProps: {
      span: 5,
    },
  },
  {
    label: '血浆过程状态',
    field: 'state',
    component: 'ApiSelect',
    componentProps: {
      api: getSysDictionary,
      params: [DictionaryEnum.StockPlasmaProcessStatus],
      resultField: '[0].dictImtes',
    },
    colProps: {
      span: 5,
    },
  },
  {
    label: '效价类型',
    field: 'immType',
    component: 'ApiSelect',
    componentProps: {
      api: getDilutionTypeApi,
      labelField: 'key',
      valueField: 'value',
    },
    colProps: {
      span: 5,
    },
  },
];
