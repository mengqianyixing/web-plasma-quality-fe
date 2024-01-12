import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import {
  expirationMap,
  expirationValueEnum,
  operationMap,
  operationValueEnum,
  statusMap,
  statusValueEnum,
} from '@/enums/stockoutEnum';
import dayjs, { Dayjs } from 'dayjs';
import { h } from 'vue';
import { InputNumber } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '制造批号',
    dataIndex: 'mesId',
    align: 'left',
    slots: { customRender: 'mesId' },
  },
  {
    title: '投产类型',
    dataIndex: 'orderType',
    width: 100,
    format(text) {
      return `${text}，${operationMap.get(<operationValueEnum>text)}`;
    },
  },
  {
    title: '投浆重量(t)',
    dataIndex: 'orderWeight',
    width: 100,
  },
  {
    title: '血浆效期',
    dataIndex: 'expiration',
    width: 100,
    format(text) {
      return expirationMap.get(<expirationValueEnum>text) as string;
    },
  },
  {
    title: '计划出库日期',
    dataIndex: 'planOut',
    width: 100,
    format(text) {
      return dayjs(text).format('YYYY-MM-DD');
    },
  },
  {
    title: '计划投产日期',
    dataIndex: 'planTask',
    width: 100,
    format(text) {
      return dayjs(text).format('YYYY-MM-DD');
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: 80,
    format(text) {
      return statusMap.get(<statusValueEnum>text) as string;
    },
  },
  {
    title: '申请人',
    dataIndex: 'creator',
  },
  {
    title: '申请日期',
    dataIndex: 'createAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '';
    },
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
  },
  {
    title: '复核日期',
    dataIndex: 'reviewAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '';
    },
  },
  {
    title: '审核人',
    dataIndex: 'checker',
  },
  {
    title: '审核日期',
    dataIndex: 'checkAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'mesId',
    label: '制造批号',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'orderType',
    label: '投产类型',
    component: 'Select',
    colProps: { span: 4 },
    componentProps: {
      options: [...operationMap.entries()].map(([key, value]) => ({
        value: key,
        label: `${key}，${value}`,
      })),
    },
  },
  {
    field: 'expiration',
    label: '血浆效期',
    component: 'Select',
    colProps: { span: 4 },
    componentProps: {
      options: [...expirationMap.entries()].map(([key, value]) => ({
        value: key,
        label: value,
      })),
    },
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    colProps: { span: 4 },
    componentProps: {
      options: [...statusMap.entries()].map(([key, value]) => ({
        value: key,
        label: value,
      })),
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'mesId',
    label: '制造批号',
    component: 'Input',
    colProps: { span: 12 },
    required: true,
  },
  {
    field: 'orderType',
    label: '投产类型',
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      options: [...operationMap.entries()].map(([key, value]) => ({
        value: key,
        label: `${key}，${value}`,
      })),
    },
    required: true,
  },
  {
    field: 'orderWeight',
    component: 'InputNumber',
    label: '投浆重量(t)',
    colProps: { span: 12 },
    rules: [{ required: true }],
    helpMessage: '投浆重量支持两位小数',
    render: ({ model, field }) => {
      return h(InputNumber, {
        placeholder: '请输入',
        value: model[field],
        onChange: (e) => {
          if (e && e.toString().includes('.')) {
            model[field] = Number(e.toString().match(/^\d+(?:\.\d{0,2})?/));
          } else {
            model[field] = e;
          }
        },
      });
    },
  },
  {
    field: 'expiration',
    label: '血浆效期',
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      options: [...expirationMap.entries()].map(([key, value]) => ({
        value: key,
        label: value,
      })),
    },
    required: true,
  },
  {
    field: 'planOut',
    label: '计划出库日期',
    component: 'DatePicker',
    colProps: { span: 12 },
    defaultValue: dayjs(),
    componentProps: ({ formModel, formActionType }) => {
      return {
        // 计划出库日期自动显示当天，计划投产日期自动显示当天+1
        disabledDate: (current: Dayjs) => current < dayjs().startOf('day'),
        //能选择今天以及往后的日期
        onChange: (e: any) => {
          if (!e) return;
          formModel.planTask = undefined;
          const { updateSchema } = formActionType;
          if (!updateSchema) return;
          updateSchema({
            field: 'planTask',
            defaultValue: dayjs(e).add(1, 'day').format('YYYY-MM-DD'),
            componentProps: {
              disabledDate: (current: any) => current && current < dayjs().startOf('day'),
            },
          });
        },
      };
    },
    required: true,
  },
  {
    field: 'planTask',
    label: '计划投产日期',
    component: 'DatePicker',
    colProps: { span: 12 },
    defaultValue: dayjs().add(1, 'day'),
    required: true,
  },
];

export const checkFormSchema: FormSchema[] = [
  {
    field: 'idea',
    label: '意见',
    component: 'InputTextArea',
    colProps: { span: 20 },
    componentProps: {
      rows: 6,
    },
  },
];
