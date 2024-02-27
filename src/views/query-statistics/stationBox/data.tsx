import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { FormItem, FormItemRest } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆批号',
    dataIndex: 'stationName',
  },
  {
    title: '浆站箱号',
    dataIndex: 'stationBoxNo',
  },
  {
    title: '来浆类型',
    dataIndex: 'currBoxNo',
  },
  {
    title: '最小血浆编号',
    dataIndex: 'currBoxNo',
  },
  {
    title: '最大血浆编号',
    dataIndex: 'currBoxNo',
  },
  {
    title: '数量',
    dataIndex: 'currBoxNo',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: '',
    component: 'Input',
    label: '采浆公司',
  },
  {
    field: 'batchStartNo',
    fields: ['batchEndNo'],
    component: 'Input',
    label: '血浆批号起止',
    render({ model, field }) {
      return (
        <div class="flex gap-2 items-center justify-center ">
          <FormItem name="batchEndNo">
            <FormItemRest>
              <a-input v-model:value={model[field]} />
            </FormItemRest>
          </FormItem>
          <span>-</span>
          <FormItem name="batchEndNo">
            <FormItemRest>
              <a-input v-model:value={model['batchEndNo']} />
            </FormItemRest>
          </FormItem>
        </div>
      );
    },
  },
  {
    field: '',
    component: 'Input',
    label: '浆站箱号',
  },
  {
    field: '',
    component: 'Input',
    label: '来浆类型',
  },
  {
    field: '',
    component: 'Input',
    label: '血浆类型',
  },
  {
    field: '',
    component: 'Input',
    label: '效价类型',
  },
];
