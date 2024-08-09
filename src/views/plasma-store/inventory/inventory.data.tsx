import { VxeGridPropTypes } from '@/components/VxeTable';
import { FormSchema } from '@/components/Form';
import { PlasmaOutboundTypeMap, PlasmaOutboundTypeValueEnum } from '@/enums/plasmaEnum';
import { getDilutionTypeApi } from '@/api/plasmaStore/inventory';
import { Select, RangePicker, FormItem, FormItemRest } from 'ant-design-vue';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { SERVER_ENUM } from '@/enums/serverEnum';

const serverEnumStore = useServerEnumStoreWithOut();

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
  },

  {
    label: '血浆批号',
    field: 'batchNo',
    component: 'Input',
  },
  {
    label: '血浆过程状态',
    field: 'state',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BagFlow),
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
  },
  {
    field: 'dateKey',
    defaultValue: 'receipt',
    fields: ['date'],
    component: 'Input',
    label: '日期',
    labelWidth: '30',
    colProps: { flex: '0 0 440px' },
    render({ model, field }, { disabled }) {
      return (
        <div class="flex gap-2 ">
          <Select
            disabled={disabled}
            dropdownMatchSelectWidth={false}
            allowClear={false}
            style="width: 130px;"
            v-model:value={model[field]}
          >
            <Select.Option value="receipt">接收日期</Select.Option>
            <Select.Option value="verify">验收发布日期</Select.Option>
          </Select>
          <FormItem name="date">
            <FormItemRest>
              <RangePicker v-model:value={model['date']} />
            </FormItemRest>
          </FormItem>
        </div>
      );
    },
  },
];
