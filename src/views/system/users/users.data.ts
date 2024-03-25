/*
 * @Author: HxB
 * @Date: 2024-01-16 17:21:07
 * @LastEditors: Ding 1326587277@qq.com
 * @LastEditTime: 2024-02-26 13:42:15
 * @Description: 用户管理数据源
 * @FilePath: \psms-fe\src\views\system\users\users.data.ts
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Select, Tag } from 'ant-design-vue';
import { customRenderDate } from '@/utils/tableHelpRender';

export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'name',
  },
  {
    title: '姓名',
    dataIndex: 'displayName',
    className: 'empty-value',
  },

  {
    title: '状态',
    dataIndex: 'isForbidden',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customRender: ({ record }) => {
      return h(Tag, { color: record.isForbidden ? 'red' : 'green' }, () => {
        return record.isForbidden ? '停用' : '启用';
      });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    customRender: ({ record }) => customRenderDate(record.createdTime),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '账号',
    component: 'Input',
  },
  {
    field: 'displayName',
    label: '姓名',
    component: 'Input',
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '姓名',
    required: true,
    field: 'displayName',
    component: 'Input',
  },
  {
    field: 'forbidden',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '停用', value: true },
        { label: '启用', value: false },
      ],
    },
  },
];

export const addFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '账号',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'roles',
    label: '角色',
    slot: 'users',
    component: 'Select',
  },
  ...formSchema,
];

export const userDetailFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '账号',
    component: 'Input',
    componentProps: {
      readonly: true,
    },
  },
  {
    label: '姓名',
    field: 'displayName',
    component: 'Input',
    componentProps: {
      readonly: true,
    },
  },
  {
    field: 'forbidden',
    label: '状态',
    component: 'Select',
    defaultValue: false,
    componentProps: {
      disabled: true,
      options: [
        { label: '停用', value: true },
        { label: '启用', value: false },
      ],
    },
  },
  {
    field: 'roles',
    label: '角色',
    component: 'Select',
    render: ({ model, field }) => {
      return h(Select, {
        value: model[field]?.map((item) => item.name),
        mode: 'multiple',
        options: model.roles?.map((item) => ({
          label: `${item.displayName}(${item.name})`,
          value: item.name,
        })),
        placeholder: '-',
        disabled: true,
      });
    },
  },
  // {
  //   field: 'menuIds',
  //   label: '权限',
  //   component: 'Select',
  //   render: ({ model, field }) => {
  //     return h(Select, {
  //       value: model[field]
  //         ?.filter((item) => routeIdMap[item])
  //         ?.map((item) => routeIdMap[item]?.title ?? item),
  //       mode: 'multiple',
  //       options: model.roles
  //         ?.filter((item) => routeIdMap[item])
  //         ?.map((item) => ({
  //           label: routeIdMap[item]?.title ?? item,
  //           value: routeIdMap[item]?.title ?? item,
  //         })),
  //       placeholder: '-',
  //       disabled: true,
  //     });
  //   },
  // },
];

export const passwordFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '账号',
    component: 'Input',
    required: true,
    componentProps: {
      readonly: true,
    },
  },
  {
    field: 'newPassword',
    label: '密码',
    component: 'InputPassword',
    required: true,
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
            if (!value) {
              return Promise.reject('密码不能为空');
            }
            if (!regex.test(value)) {
              return Promise.reject(
                '密码必须包含大写字母、小写字母、特殊字符、数字中的三种且不小于8位!',
              );
            }
            if (value === values.userName) {
              return Promise.reject('禁止使用用户名作为登录密码!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'reNewPassword',
    label: '重复密码',
    component: 'InputPassword',
    required: true,
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('密码不能为空');
            }
            if (value !== values.newPassword) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];

export const updateFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '账号',
    component: 'Input',
    required: true,
    componentProps: {
      readonly: true,
    },
  },
  {
    field: 'roles',
    label: '角色',
    slot: 'users',
    component: 'Select',
  },
  ...formSchema,
];
