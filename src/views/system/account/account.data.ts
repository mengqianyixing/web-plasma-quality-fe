import { getDeptList, isAccountExist } from '/@/api/systemServer/system';
import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'account',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 200,
    customRender: ({ record }) => {
      return record.roles.length > 0 ? record.roles.map((it) => it.roleName).join('，') : '-';
    },
  },
  {
    title: '所属部门',
    dataIndex: 'deptName',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'username',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '账号',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        trigger: 'blur',
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (!value) return resolve();
            isAccountExist(value)
              .then(resolve)
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'username',
    label: '昵称',
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
    field: 'sex',
    label: '性别',
    component: 'RadioButtonGroup',
    defaultValue: '男',
    componentProps: {
      options: [
        { label: '男', value: '男' },
        { label: '女', value: '女' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '禁用', value: 0 },
        { label: '正常', value: 1 },
        { label: '人工锁定', value: 2 },
        { label: '密码过期自动锁定', value: 3 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    label: '角色',
    field: 'roles',
    component: 'ApiSelect',
    slot: 'roleSelect',
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getDeptList,
      labelField: 'deptName',
      valueField: 'deptId',
    },
    required: true,
  },
  {
    field: 'multiClientLoginEnable',
    label: '多端登录',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
