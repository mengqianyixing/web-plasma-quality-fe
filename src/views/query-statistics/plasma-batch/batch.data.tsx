import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { FormItem, FormItemRest } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    customCell: (record) => {
      return {
        rowSpan: record.rowSpan,
      };
    },
  },
  {
    title: '来浆类型',
    dataIndex: 'plasmaType',
  },
  {
    title: '血浆编号（起止）',
    dataIndex: 'batchNoRange',
    width: 350,
  },
  {
    title: '浆站不合格',
    dataIndex: 'lackNos',
  },
  {
    title: '血浆数量',
    dataIndex: 'totalNum',
  },
  {
    title: '验收净重（kg）',
    dataIndex: 'verifyWeight',
  },
  {
    title: '验收血浆不合格编号',
    dataIndex: 'verifyUnqNos',
  },
];

export const columnsByQuarantine: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    customCell: (record) => {
      return {
        rowSpan: record.rowSpan,
      };
    },
  },
  {
    title: '检疫期类型',
    dataIndex: 'quarantineType',
    customCell: (record) => {
      return {
        colSpan: record.titerType ? 1 : 2,
        rowSpan: record.quarantineSpan,
      };
    },
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
    customCell: (record) => {
      return {
        colSpan: record.titerType ? 1 : 0,
      };
    },
  },
  {
    title: '批检疫期报告情况',
    children: [
      {
        title: '血浆数量',
        dataIndex: 'batchStatusTotal',
      },
      {
        title: '验收净重(kg)',
        dataIndex: 'batchStatusWeight',
      },
    ],
  },
  {
    title: '当前检疫期状态',
    children: [
      {
        title: '血浆数量',
        dataIndex: 'nowStatusTotal',
      },
      {
        title: '验收净重(kg)',
        dataIndex: 'nowStatusWeight',
      },
    ],
  },
  {
    title: '库存状态',
    children: [
      {
        title: '在库数量',
        dataIndex: 'stockTotal',
      },
      {
        title: '在库净重(kg)',
        dataIndex: 'stockWeight',
      },
      {
        title: '出库数量',
        dataIndex: 'outTotal',
      },
      {
        title: '出库净重(kg)',
        dataIndex: 'outWeight',
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
    colProps: {
      span: 5,
    },
  },
  {
    field: 'batchStartNo',
    fields: ['batchEndNo'],
    component: 'Input',
    label: '血浆批号起止',
    labelWidth: 120,
    colProps: {
      span: 8,
      push: 2,
    },
    render({ model, field }) {
      return (
        <div class="flex gap-2 items-center justify-center">
          <FormItem name="batchEndNo">
            <FormItemRest>
              <a-input class="w-200px" v-model:value={model[field]} />
            </FormItemRest>
          </FormItem>
          <span>-</span>
          <FormItem name="batchEndNo">
            <FormItemRest>
              <a-input class="w-200px" v-model:value={model['batchEndNo']} />
            </FormItemRest>
          </FormItem>
        </div>
      );
    },
  },
];
