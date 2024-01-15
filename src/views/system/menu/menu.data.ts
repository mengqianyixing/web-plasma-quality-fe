import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import Icon from '@/components/Icon/Icon.vue';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'iconType',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.iconType });
    },
  },
  {
    title: '权限标识',
    dataIndex: 'menuCode',
    width: 180,
  },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '排序',
    dataIndex: 'menuOrder',
    width: 50,
  },
  {
    title: '路由路径',
    dataIndex: 'menuPath',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

// const isDir = (type: string) => type === '0';
const isMenu = (type: number) => type !== 2;
const isButton = (type: number) => type === 2;

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'menuType',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'menuName',
        key: 'menuId',
        value: 'menuId',
      },
      getPopupContainer: () => document.body,
    },
  },

  {
    field: 'menuOrder',
    label: '排序',
    component: 'Input',
    required: true,
  },
  {
    field: 'iconType',
    label: '图标',
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'menuPath',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'menuCode',
    label: '权限标识',
    component: 'Input',
    required: true,
  },
];
